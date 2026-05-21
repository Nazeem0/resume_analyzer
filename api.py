import os
import io
import re
import pandas as pd
import PyPDF2
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from local_parser import parse_resume_local

app = FastAPI()

# Allow the React frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store dataset
JOBS_DF = None
UNIQUE_DATASET_SKILLS = []

def extract_text_from_pdf_bytes(file_bytes: bytes) -> str:
    text = ""
    try:
        reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        # If it fails, maybe it's a text file
        return file_bytes.decode('utf-8', errors='ignore')

def load_and_clean_jobs():
    global JOBS_DF, UNIQUE_DATASET_SKILLS
    csv_path = "resume_data.csv"
    if not os.path.exists(csv_path):
        print(f"Dataset {csv_path} not found.")
        return
        
    df = pd.read_csv(csv_path)
    job_cols = [
        '﻿job_position_name', 'educationaL_requirements', 
        'experiencere_requirement', 'age_requirement', 
        'responsibilities.1', 'skills_required'
    ]
    df = df.rename(columns={'﻿job_position_name': 'job_position_name'})
    
    jobs_df = df.dropna(subset=['job_position_name']).copy()
    jobs_df = jobs_df.drop_duplicates(subset=['job_position_name', 'skills_required'])
    
    # Extract unique skills from dataset for the local parser
    skills_set = set()
    for skills_str in jobs_df['skills_required'].dropna():
        # Split by comma or newline
        skills = [s.strip() for s in re.split(r'[,\n]', str(skills_str)) if s.strip()]
        skills_set.update(skills)
        
    UNIQUE_DATASET_SKILLS = list(skills_set)
    JOBS_DF = jobs_df
    print(f"Loaded {len(JOBS_DF)} unique jobs and {len(UNIQUE_DATASET_SKILLS)} unique skills.")

def extract_required_years(exp_str):
    if pd.isna(exp_str):
        return 0
    matches = re.findall(r'\d+', str(exp_str))
    if matches:
        return float(matches[0])
    return 0

def calculate_compatibility(candidate, job):
    # candidate['skills'] is a list of {name, skills} dicts — flatten to a flat list
    raw_skills = candidate.get('skills', [])
    if raw_skills and isinstance(raw_skills[0], dict):
        flat_skills = [s for section in raw_skills for s in section.get('skills', [])]
    else:
        flat_skills = raw_skills
    cand_skills = [s.lower() for s in flat_skills]
    job_skills_raw = str(job['skills_required'])
    
    if job_skills_raw.lower() in ['nan', 'none', '']:
        skills_score = 40
        matched_skills_list = []
        skills_matched_pct = 100
        skill_gaps = []
        job_skills = []
    else:
        job_skills = [s.strip() for s in re.split(r'[,\n]', job_skills_raw) if s.strip()]
        if not job_skills:
            skills_score = 40
            matched_skills_list = []
            skills_matched_pct = 100
            skill_gaps = []
        else:
            matches = [s for s in job_skills if any(cs in s.lower() or s.lower() in cs for cs in cand_skills)]
            skills_matched_pct = (len(matches) / len(job_skills)) * 100
            skills_score = (skills_matched_pct / 100) * 40
            matched_skills_list = matches
            skill_gaps = [s for s in job_skills if s not in matches]
            
    req_years = extract_required_years(job['experiencere_requirement'])
    cand_years = candidate.get('total_years_experience', 0)
    
    if req_years == 0 or cand_years >= req_years:
        exp_score = 30
    else:
        exp_score = (cand_years / req_years) * 30
        
    req_edu = str(job['educationaL_requirements']).lower()
    cand_edu = str(candidate.get('highest_degree', '')).lower()
    
    edu_score = 0
    if req_edu in ['nan', 'none', '']:
        edu_score = 15
    else:
        if 'bachelor' in cand_edu:
            if 'master' not in req_edu: edu_score = 15
            else: edu_score = 10
        elif 'master' in cand_edu or 'phd' in cand_edu:
            edu_score = 15
        else:
            edu_score = 10
            
    industry_score = 15
    total_score = skills_score + exp_score + edu_score + industry_score
    
    return {
        'jobTitle': str(job['job_position_name']),
        'company': 'Company N/A', # Missing from jobs side of CSV
        'compatibilityScore': round(total_score),
        'scoreBreakdown': {
            'skillsMatch': round(skills_score),
            'experienceMatch': round(exp_score),
            'educationMatch': round(edu_score),
            'industryMatch': round(industry_score)
        },
        'matchingSkills': matched_skills_list,
        'skillGaps': skill_gaps,
        'whyThisJobFits': f"Matched {round(skills_matched_pct)}% of required skills. " + ("Strong match based on experience." if exp_score == 30 else "Consider gaining more experience."),
        'preparationSteps': [f"Focus on learning: {g}" for g in skill_gaps[:3]] if skill_gaps else ["You are highly qualified for this role!"]
    }

@app.on_event("startup")
def startup_event():
    load_and_clean_jobs()

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    if JOBS_DF is None:
        raise HTTPException(status_code=500, detail="Job dataset not loaded.")
        
    file_bytes = await file.read()
    text = extract_text_from_pdf_bytes(file_bytes)
    
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from file.")
        
    # 1. Parse Resume Locally
    candidate = parse_resume_local(text, UNIQUE_DATASET_SKILLS)
    
    # 2. Score jobs
    scored_jobs = []
    for _, job in JOBS_DF.iterrows():
        score_data = calculate_compatibility(candidate, job)
        scored_jobs.append(score_data)
        
    scored_jobs.sort(key=lambda x: x['compatibilityScore'], reverse=True)
    top_5_jobs = scored_jobs[:5]
    
    # 3. Format as AnalysisResult for the React frontend
    avg_score = sum(j['compatibilityScore'] for j in top_5_jobs) / 5 if top_5_jobs else 0
    
    response = {
        "candidateProfile": {
            "name": candidate['name'],
            "email": candidate['email'],
            "phone": candidate['phone'],
            "education": candidate.get('highest_degree', 'N/A'),
            "extractedText": text,
            "totalExperience": f"{candidate['total_years_experience']} years",
            "primaryDomain": candidate['primary_domain'],
            "seniority": candidate['seniority'],
            "extractedSkills": {
                "sections": candidate['skills'],
                "softSkills": candidate['soft_skills'],
                "languages": candidate.get('languages', []),
                "certifications": candidate['certifications']
            }
        },
        "topMatches": [{"job": {"jobTitle": j['jobTitle'], "company": j['company']}, **j} for j in top_5_jobs],
        "careerInsights": {
            "strongestPath": f"{candidate['primary_domain']} -> {candidate['seniority']} Level",
            "recommendedSkills": (lambda flat: ["Cloud Native", "Advanced Data Analysis", "Leadership"] if not flat else ["Advanced " + flat[0], "Leadership"])(
                [s for section in candidate['skills'] for s in section.get('skills', [])] if candidate['skills'] and isinstance(candidate['skills'][0], dict) else candidate['skills']
            ),
            "uniqueStrengths": [f"Demonstrated experience over {candidate['total_years_experience']} years", "Strong alignment with local market demands"],
            "expectedSalaryRange": "$60K - $120K based on experience"
        },
        "overallAssessment": f"Based on local parsing, the candidate has an average compatibility score of {round(avg_score)}% for the top matched roles in the dataset. Focus on the identified skill gaps to improve matching potential."
    }
    
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
