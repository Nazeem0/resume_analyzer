import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerAI | Your Career, Powered by Intelligence" },
      { name: "description", content: "Executive-grade AI platform analyzing your professional DNA to find matches others miss." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd]">
      <header className="w-full sticky top-0 z-50 bg-[#0b1326]/90 backdrop-blur border-b border-[#434655]/30">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
          <span className="text-2xl font-bold text-[#b4c5ff]">CareerAI</span>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-[#b4c5ff]">Home</Link>
            <a href="#features" className="text-sm font-medium text-[#7bd0ff] hover:text-[#2563eb]">Features</a>
            <Link to="/resume-analysis" className="text-sm font-medium text-[#7bd0ff] hover:text-[#2563eb]">Resume</Link>
            <Link to="/job-matches" className="text-sm font-medium text-[#7bd0ff] hover:text-[#2563eb]">Jobs</Link>
            <Link to="/resume-analysis" className="bg-[#2563eb] text-white px-6 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform">Get Started</Link>
          </nav>
          <span className="material-symbols-outlined md:hidden text-[#b4c5ff]">menu</span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-[870px] flex flex-col justify-center hero-gradient px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto overflow-hidden">
          <div className="z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20">
                <span className="text-[#b4c5ff] text-xs font-semibold uppercase tracking-wider">Now Powered by GPT-4o</span>
              </div>
              <h1 className="text-5xl md:text-[48px] leading-[1.1] font-bold tracking-tight">
                Your Career, <br />
                <span className="text-[#2563eb]">Powered by Intelligence</span>
              </h1>
              <p className="text-lg text-[#c3c6d7] max-w-lg leading-7">
                The executive-grade platform that analyzes your professional DNA to find matches that others miss. Move beyond job boards into intelligent career steering.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/resume-analysis" className="bg-[#2563eb] text-white px-8 py-4 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#b4c5ff] hover:text-[#002a78] transition-all active:scale-95">
                  Get Started Free
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link to="/resume-analysis" className="border border-[#434655] text-[#dae2fd] px-8 py-4 rounded-lg text-sm font-medium hover:bg-[#171f33] transition-all">
                  Analyze My Resume
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="glass-card rounded-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img className="w-full rounded-lg shadow-2xl" alt="CareerAI executive dashboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDchL-Q82ZmJIJ7aVhKByq4RlvuhA1ln7ISpRWPauKWGbQI3jXMf3IOjeJYZex-xGfeoOQ7OBbL6TqJK8IXpvEVuUuG7dZAVFf6D_tgTvm02s3LLuVD117YKbhN-Pdv6VJALf7o1k6WPWb0qPajQ6eprm93DaYMnrv6SOFqw30jYI6L3SADGrPri_KuuDocJsISBhwDKHHqowBn5UwHvkF-0FL4j0HVBnefijm2mpYU8rEsJFD8gZ6RwxsxgrdAkoYvqCMubuaGN0Q" />
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#2563eb]/20 blur-[100px] rounded-full -z-10"></div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-[#131b2e] border-y border-[#434655]/30">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                ["98%", "Match Accuracy"],
                ["50k+", "Top-tier Roles"],
                ["12ms", "Analysis Speed"],
                ["4.9/5", "User Satisfaction"],
              ].map(([v, l]) => (
                <div key={l} className="space-y-2">
                  <div className="text-3xl font-semibold text-[#b4c5ff]">{v}</div>
                  <div className="text-sm text-[#c3c6d7]">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">Intelligence in Every Step</h2>
            <p className="text-[#c3c6d7] max-w-2xl mx-auto">Our proprietary engine deconstructs your experience and maps it to the future of industry requirements.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "upload_file", title: "Seamless Upload", desc: "Import LinkedIn profiles or PDFs. Our parser handles complex layouts with 100% data retention." },
              { icon: "psychology", title: "Deep Analysis", desc: "Semantic extraction of soft skills, project impact, and leadership trajectory using advanced LLMs.", featured: true },
              { icon: "join_inner", title: "Precision Matching", desc: "Connect with opportunities that align with your 5-year career goals, not just your last job title." },
            ].map((f) => (
              <div key={f.title} className={`glass-card p-8 rounded-xl flex flex-col items-start gap-6 hover:border-[#b4c5ff] transition-colors ${f.featured ? "border-[#b4c5ff] !bg-[#222a3d] scale-105 shadow-xl" : ""}`}>
                <div className="w-12 h-12 rounded-lg bg-[#2563eb]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#b4c5ff]" style={f.featured ? { fontVariationSettings: "'FILL' 1" } : undefined}>{f.icon}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">{f.title}</h3>
                  <p className="text-[#c3c6d7]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 bg-[#060e20]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="glass-card rounded-2xl overflow-hidden grid lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto">
                <img className="absolute inset-0 w-full h-full object-cover" alt="Executive portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8WITWGF6eUkeOsxIQm3IxQRLQ3jQG11k-gf5b1ECX7jFaubPixkCf5RVWcq59p72bSF7SqhE9ugfdGUk0xcEOHLsnQPXCVkDi_8yEPo9d3kHvQ2hubPU1sTeuTL5N54hwBwDeS8Fz5-bWQSSd_MEwG_cIRfGS5QOEgnwy5RGZaLYy_bSRbZvbdA3zb0hhs26MCVZgE858x_9qR0SNWsvaMEtC3TeM63h7bdggXHDssjuiwTeQOEaDn-0hBTt-C7QfCJ6EWnj_Lzc" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0b1326]"></div>
              </div>
              <div className="p-12 flex flex-col justify-center space-y-8 relative">
                <span className="material-symbols-outlined text-[#dbe1ff] opacity-20 absolute top-8 left-8" style={{ fontSize: "60px" }}>format_quote</span>
                <blockquote className="text-2xl italic leading-relaxed font-semibold">
                  "CareerAI didn't just find me a new role; it identified a career pivot I hadn't considered. The accuracy of their matching engine is superior to any headhunter I've worked with in my 20-year career."
                </blockquote>
                <div>
                  <div className="text-sm font-bold text-[#dae2fd]">Alex Rivers</div>
                  <div className="text-xs text-[#b4c5ff] font-semibold">Senior Product Designer &amp; Premium Member</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto text-center">
          <div className="glass-card p-16 rounded-3xl space-y-8 border-[#b4c5ff]/20 bg-gradient-to-br from-[#222a3d] to-[#0b1326]">
            <h2 className="text-3xl font-semibold">Ready for the Next Level?</h2>
            <p className="text-lg text-[#c3c6d7] max-w-xl mx-auto">Join 10,000+ high-level professionals who have unlocked their true market value.</p>
            <div className="flex justify-center gap-4">
              <Link to="/resume-analysis" className="inline-block bg-[#2563eb] text-white px-10 py-5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#2563eb]/30 transition-all">Start Your Free Analysis</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#434655] bg-[#060e20]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
          <div className="space-y-6">
            <div className="text-xl font-bold text-[#b4c5ff]">CareerAI</div>
            <p className="text-[#7bd0ff] max-w-sm">© 2024 CareerAI Consultancy. Empowering professional transitions through intelligent matching.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-sm font-bold">Company</div>
              <ul className="space-y-2 text-xs text-[#7bd0ff]">
                <li><a href="#" className="hover:text-[#b4c5ff]">About Us</a></li>
                <li><a href="#" className="hover:text-[#b4c5ff]">AI Ethics</a></li>
                <li><a href="#" className="hover:text-[#b4c5ff]">Career Blog</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-sm font-bold">Legal</div>
              <ul className="space-y-2 text-xs text-[#7bd0ff]">
                <li><a href="#" className="hover:text-[#b4c5ff]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#b4c5ff]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#b4c5ff]">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
