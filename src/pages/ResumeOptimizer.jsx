import React, { useState } from 'react';

const ResumeOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [score, setScore] = useState(72);
  const [results, setResults] = useState(null);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setScore(94);
      setResults({
        improvements: [
          "Added keywords: 'Cloud Native', 'Kubernetes', 'CI/CD Pipelines'",
          "Restructured 'Projects' section for higher ATS readability",
          "Quantified achievements: 'Improved performance by 40%'",
        ],
        missingSkills: ["Terraform", "GoLang (Emerging trend)"],
        newResumeUrl: "#"
      });
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight">🤖 Resume Intelligence <span className="gradient-text">Optimizer</span></h1>
        <p className="mt-4 text-slate-400">Our AI scans your resume against thousands of job descriptions to maximize your ATS score.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card p-10 border-amber-500/20 bg-slate-900/50 flex flex-col justify-center items-center text-center">
            <div className="h-24 w-24 rounded-full border-4 border-slate-800 flex items-center justify-center text-4xl mb-6 relative">
                📄
                <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-xs border-4 border-slate-900 shadow-lg">
                    {score}%
                </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Current ATS Score</h3>
            <p className="text-slate-400 text-sm mb-8">Based on your recent upload: <span className="text-white font-bold italic">Yaswanth_Resume_v2.pdf</span></p>
            
            <button 
                onClick={handleOptimize}
                disabled={isOptimizing}
                className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm transition-all ${
                    isOptimizing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20 hover:scale-[1.02]'
                }`}
            >
                {isOptimizing ? '🤖 AI Optimizing...' : '🚀 Boost ATS Score'}
            </button>
        </div>

        <div className="space-y-6">
            {!results ? (
                <div className="h-full flex flex-col items-center justify-center p-12 rounded-[3rem] border-2 border-dashed border-slate-800 bg-slate-950/20">
                    <p className="text-slate-500 font-bold text-center">Click "Boost ATS Score" to see AI recommendations and generate an optimized version.</p>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20">
                        <h4 className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-6">AI Optimization Results</h4>
                        <ul className="space-y-4">
                            {results.improvements.map((imp, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300">
                                    <span className="text-emerald-400">✅</span> {imp}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20">
                        <h4 className="text-rose-400 font-black uppercase tracking-widest text-xs mb-6">Missing Skills for Top Roles</h4>
                        <div className="flex flex-wrap gap-2">
                            {results.missingSkills.map((skill, i) => (
                                <span key={i} className="px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-xs font-bold text-slate-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="w-full py-5 rounded-[2rem] bg-white text-slate-950 font-black uppercase tracking-widest text-sm shadow-2xl shadow-white/10 hover:scale-[1.02] transition-all">
                        ⬇️ Download Optimized Resume
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResumeOptimizer;
