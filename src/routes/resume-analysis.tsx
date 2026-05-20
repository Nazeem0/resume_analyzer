import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export const Route = createFileRoute("/resume-analysis")({
  head: () => ({
    meta: [
      { title: "Resume Analysis | CareerAI" },
      { name: "description", content: "Upload your resume and let our AI extract your expertise to match executive roles." },
    ],
  }),
  component: ResumeAnalysisPage,
});

function ResumeAnalysisPage() {
  return (
    <div className="bg-gradient-to-b from-[#0b1326] to-[#060e20] min-h-screen flex text-[#dae2fd]">
      <DashboardSidebar />

      <main className="flex-1 ml-72 flex flex-col min-h-screen">
        <header className="w-full sticky top-0 z-30 bg-[#060e20]/80 backdrop-blur">
          <div className="flex justify-between items-center h-16 px-6 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4">
              <Link to="/" className="material-symbols-outlined text-[#7bd0ff] hover:text-[#b4c5ff]">arrow_back</Link>
              <h1 className="text-2xl font-semibold text-[#b4c5ff]">Resume Analysis</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center px-3 py-1 bg-[#00a6e0] text-[#00374d] rounded-full text-xs font-bold uppercase tracking-wider">
                Premium Member
              </div>
              <div className="w-8 h-8 rounded-full border border-[#8d90a0] overflow-hidden">
                <img alt="Alex" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcKWqYyUSy5hVpQz3OZJT3jl6dmRYDNehcvFBrHw6izrI2GNz8tiu8EIjn8lwz6FsSM9cyNfCV165r6o5e6TtXtfrvtgN7O_WWerwf1vq4UtaV7kEGxFwFJch-QuoBD_ihfvGYaofbu7XQ1K4oDowgtPyHS5PoBxRklD2QqrKSH6fw4gVPqGLyA9F2tUiX_h8YRsvyXYU8D0ykEyKV2MVmQ7gQq54P2vVfWv8NTc6-bLVh5hYJLLTpXkVm2aNGiBY-Ic5IAoUycdE" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 max-w-[1200px] mx-auto w-full grid grid-cols-12 gap-6">
          {/* Left: Upload */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <section className="glass-card rounded-xl p-8 flex flex-col items-center text-center">
              <div className="w-full max-w-md space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold">Upload Your Resume</h2>
                  <p className="text-[#c3c6d7]">Our AI will extract your expertise and match you with executive roles.</p>
                </div>
                <div className="rounded-xl p-12 border-2 border-dashed border-[#434655] hover:border-[#b4c5ff] transition-all cursor-pointer group">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#b4c5ff]/10 flex items-center justify-center text-[#b4c5ff] group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined" style={{ fontSize: 36 }}>cloud_upload</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-semibold">Drag &amp; Drop Resume</p>
                      <p className="text-sm text-[#c3c6d7]">PDF, DOCX, or RTF (Max 10MB)</p>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-[#b4c5ff] text-[#002a78] font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all">
                      Select File
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#8d90a0] py-4">
                  <div className="flex-1 h-px bg-[#434655]"></div>
                  <span className="text-xs uppercase tracking-widest font-bold">Safe &amp; Secure</span>
                  <div className="flex-1 h-px bg-[#434655]"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-[#131b2e] border border-[#434655] rounded-lg space-y-2">
                    <span className="material-symbols-outlined text-[#7bd0ff]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <h3 className="text-sm font-bold">Privacy First</h3>
                    <p className="text-xs text-[#c3c6d7]">Your data is encrypted and never sold to third parties.</p>
                  </div>
                  <div className="p-4 bg-[#131b2e] border border-[#434655] rounded-lg space-y-2">
                    <span className="material-symbols-outlined text-[#7bd0ff]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    <h3 className="text-sm font-bold">AI Matching</h3>
                    <p className="text-xs text-[#c3c6d7]">Advanced extraction for precision career mapping.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Preview */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <section className="glass-card rounded-xl p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Extraction Preview</h2>
                <span className="px-3 py-1 bg-[#222a3d] text-[#8d90a0] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#434655]">
                  Waiting for upload
                </span>
              </div>
              <div className="space-y-8 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#2d3449] animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 bg-[#2d3449] rounded animate-pulse" />
                    <div className="h-3 w-1/3 bg-[#2d3449]/50 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#8d90a0] uppercase tracking-wider">Top Skills Detected</h3>
                  <div className="flex flex-wrap gap-2">
                    {[24, 32, 20, 28].map((w, i) => (
                      <div key={i} className="h-8 bg-[#2d3449] rounded-full border border-[#434655]/30 animate-pulse" style={{ width: `${w * 4}px` }} />
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#8d90a0] uppercase tracking-wider">Career Timeline</h3>
                  <div className="space-y-6 relative border-l-2 border-[#434655] ml-2 pl-6">
                    {[0, 1].map((i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#434655] border-2 border-[#0b1326]" />
                        <div className="h-4 w-48 bg-[#2d3449] rounded mb-2 animate-pulse" />
                        <div className="h-3 w-64 bg-[#2d3449]/50 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-[#434655]">
                <p className="text-xs text-[#c3c6d7] italic flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>info</span>
                  Real-time extraction will begin immediately upon file selection.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}