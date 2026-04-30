import React from 'react';

const CareerPrediction = () => {
  const predictions = [
    { 
      role: 'ML Engineering Lead', 
      timeline: '3-5 Years', 
      match: 92, 
      path: ['Current: Python Student', 'Year 1: Data Engineer', 'Year 3: ML Specialist'],
      risk: 'Low (Skills highly aligned)',
      pivot: 'AI Product Manager'
    },
    { 
      role: 'Full Stack Architect', 
      timeline: '2-4 Years', 
      match: 78, 
      path: ['Current: React Basics', 'Year 1: Backend Dev', 'Year 2: Cloud Architect'],
      risk: 'Medium (Requires System Design depth)',
      pivot: 'Solutions Engineer'
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12 py-10 px-4">
      <div className="text-center space-y-4">
        <span className="inline-flex rounded-full bg-purple-500/10 px-4 py-1 text-xs font-black text-purple-400 uppercase tracking-widest ring-1 ring-inset ring-purple-500/20">
          Future-Proofing Your Career
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          AI Career <span className="gradient-text">Forecasting</span> 🔮
        </h1>
        <p className="mx-auto max-w-2xl text-slate-400 text-lg">
          We analyzed your current skills, interests, and academic history to predict your best-fit roles for the year 2029.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {predictions.map((pred, i) => (
          <div key={i} className="glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="text-8xl">💼</span>
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-white">{pred.role}</h2>
                        <p className="text-purple-400 font-bold uppercase tracking-widest text-xs mt-1">Timeline: {pred.timeline}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-4xl font-black text-emerald-400">{pred.match}%</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Match Score</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Target Pathway</h3>
                        <div className="space-y-3">
                            {pred.path.map((step, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                    <p className="text-slate-300 font-medium">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Mismatch Risk</p>
                            <p className="text-sm font-bold text-white">{pred.risk}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Alternative Pivot</p>
                            <p className="text-sm font-bold text-sky-400">{pred.pivot}</p>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-10 py-5 rounded-[2rem] bg-purple-500 text-slate-950 font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Unlock Training Roadmap
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-slate-900 to-slate-950 border-white/5 p-10 rounded-[3rem] text-center">
          <h3 className="text-2xl font-black text-white">How this works? 🤖</h3>
          <p className="text-slate-400 mt-4 max-w-3xl mx-auto">
            Our **Career Intelligence Engine** uses a transformer-based model trained on 10 million+ job profiles and career trajectories. 
            It identifies subtle patterns in your learning behavior and maps them to high-growth industry demand.
          </p>
      </div>
    </div>
  );
};

export default CareerPrediction;
