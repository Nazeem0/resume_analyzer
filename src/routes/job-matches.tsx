import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export const Route = createFileRoute("/job-matches")({
  head: () => ({
    meta: [
      { title: "Job Matches Dashboard | CareerAI" },
      { name: "description", content: "AI-curated executive job matches tailored to your professional profile." },
    ],
  }),
  component: JobMatchesPage,
});

type Match = {
  title: string;
  company: string;
  pct: number;
  expLabel: string;
  expPct: number;
  skillLabel: string;
  skillPct: number;
  posted: string;
  salary: string;
};

const matches: Match[] = [
  { title: "Senior Staff Product Designer", company: "Stripe • Remote, EU", pct: 92, expLabel: "High", expPct: 95, skillLabel: "Optimal", skillPct: 88, posted: "Posted 2h ago", salary: "£110k - £145k" },
  { title: "Lead UX Architect", company: "Revolut • London, UK (Hybrid)", pct: 84, expLabel: "High", expPct: 80, skillLabel: "Expert", skillPct: 92, posted: "Posted 1d ago", salary: "£125k - £160k" },
  { title: "Principal Designer, Platform", company: "Linear • Remote", pct: 78, expLabel: "Strong", expPct: 75, skillLabel: "Strong", skillPct: 82, posted: "Posted 3d ago", salary: "$180k - $220k" },
];

function MatchCard({ m }: { m: Match }) {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference * (1 - m.pct / 100);
  return (
    <article className="bg-[#171f33] p-6 rounded-xl border border-[#434655] hover:border-[#b4c5ff] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-2xl font-semibold mb-1 text-[#dae2fd]">{m.title}</h4>
          <p className="text-sm text-[#b4c5ff] font-semibold">{m.company}</p>
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle className="text-[#434655]/30" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4" />
            <circle className="text-[#7bd0ff] transition-all duration-1000" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={offset} strokeWidth="4" />
          </svg>
          <span className="absolute font-bold text-sm">{m.pct}%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {[
          { label: "Experience Match", val: m.expLabel, pct: m.expPct },
          { label: "Skill Alignment", val: m.skillLabel, pct: m.skillPct },
        ].map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="flex justify-between text-xs text-[#8d90a0]">
              <span>{s.label}</span>
              <span>{s.val}</span>
            </div>
            <div className="w-full bg-[#434655]/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#7bd0ff] h-full" style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-[#434655]/30">
        <div className="flex items-center gap-8 text-sm text-[#c3c6d7]">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span> {m.posted}</span>
          <span className="flex items-center gap-1 font-bold text-[#dae2fd]"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>payments</span> {m.salary}</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-[#b4c5ff] hover:bg-[#b4c5ff]/5 rounded-lg text-sm">View Details</button>
          <button className="px-6 py-2 bg-[#b4c5ff] text-[#002a78] rounded-lg text-sm font-bold active:scale-95 transition-transform">Apply Now</button>
        </div>
      </div>
    </article>
  );
}

function JobMatchesPage() {
  return (
    <div className="bg-gradient-to-br from-[#0b1326] to-[#060e20] min-h-screen flex text-[#dae2fd]">
      <DashboardSidebar />

      <main className="flex-1 ml-72">
        <header className="w-full sticky top-0 z-30 border-b border-[#434655]/30 bg-[#0b1326]/70 backdrop-blur">
          <div className="flex justify-between items-center h-16 px-12 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4">
              <Link to="/" className="material-symbols-outlined text-[#7bd0ff] hover:text-[#b4c5ff]">arrow_back</Link>
              <h2 className="text-2xl font-semibold text-[#b4c5ff]">Job Matches</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-[#222a3d] px-4 py-2 rounded-full border border-[#434655]">
                <span className="material-symbols-outlined text-[#8d90a0]" style={{ fontSize: 16 }}>search</span>
                <input className="bg-transparent border-none focus:outline-none text-sm w-48 placeholder:text-[#8d90a0]" placeholder="Search matches..." />
              </div>
              <button className="relative p-2 text-[#c3c6d7] hover:text-[#b4c5ff]">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#ffb4ab] rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-12 py-8 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Profile */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <section className="bg-[#171f33] p-6 rounded-xl border border-[#434655]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold">Candidate Profile</h3>
                  <span className="material-symbols-outlined text-[#8d90a0] cursor-pointer hover:text-[#b4c5ff]">edit</span>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-[#8d90a0] uppercase tracking-widest font-semibold">Core Profile</span>
                    <p className="text-[#c3c6d7] leading-relaxed">
                      Strategic Product Designer with 8+ years of experience leading cross-functional teams in high-growth FinTech and SaaS environments. Expert in design systems and user-centric architecture.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-[#8d90a0] uppercase tracking-widest font-semibold">Key Strengths</span>
                    <div className="flex flex-wrap gap-1">
                      {["Systems Thinking", "Product Strategy", "Stakeholder Mgmt", "Prototyping"].map((s) => (
                        <span key={s} className="px-3 py-1 bg-[#b4c5ff]/10 text-[#b4c5ff] border border-[#b4c5ff]/20 rounded-full text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#434655]/30 space-y-4">
                    {[
                      ["location_on", "London, UK (Remote)"],
                      ["payments", "£95k - £120k Expected"],
                      ["verified", "Resume Verified"],
                    ].map(([icon, label]) => (
                      <div key={label} className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-[#7bd0ff]" style={{ fontVariationSettings: icon === "verified" ? "'FILL' 1" : undefined }}>{icon}</span>
                        <span className="text-sm text-[#dae2fd]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-[#2563eb]/20 to-[#00a6e0]/20 p-6 rounded-xl border border-[#b4c5ff]/20">
                <div className="flex items-center gap-2 mb-4 text-[#b4c5ff]">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  <h4 className="text-sm font-bold uppercase tracking-wider">AI Recommendation</h4>
                </div>
                <p className="text-[#c3c6d7] italic leading-relaxed">
                  "Consider highlighting your leadership in SaaS to increase visibility for Lead roles."
                </p>
              </section>
            </div>

            {/* Matches */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-semibold">Top Matches</h3>
                  <span className="bg-[#00a6e0]/20 text-[#7bd0ff] px-3 py-1 rounded-full text-xs font-bold">12 New Finds</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-sm text-[#c3c6d7] hover:text-[#b4c5ff]">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span> Filter
                  </button>
                  <button className="flex items-center gap-1 text-sm text-[#c3c6d7] hover:text-[#b4c5ff]">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sort</span> Sort
                  </button>
                </div>
              </div>

              {matches.map((m) => <MatchCard key={m.title} m={m} />)}

              <section className="mt-8 relative overflow-hidden bg-[#2d3449] p-8 rounded-2xl border border-[#b4c5ff]/30 group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined" style={{ fontSize: 120, fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-lg">
                    <h3 className="text-3xl font-semibold text-[#b4c5ff]">Unlock VIP Job Access</h3>
                    <p className="text-[#c3c6d7]">
                      Premium members get early access to "Stealth Mode" roles and 1:1 resume optimization from industry leads.
                    </p>
                  </div>
                  <button className="whitespace-nowrap bg-[#b4c5ff] text-[#002a78] px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-[#b4c5ff]/20 transition-all active:scale-95">
                    Upgrade to Premium
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}