import React, { useState } from 'react';
import ChartBox from '../components/ChartBox.jsx';

const mockCurriculum = {
  department: 'CSE',
  year: '3rd Year',
  semester: '5th Sem',
  subjects: [
    { 
      id: 1, 
      name: 'Artificial Intelligence', 
      relevance: 82, 
      modules: [
        { name: 'Unit 1: Search Algorithms', skills: ['Logic', 'Problem Solving'] },
        { name: 'Unit 2: Neural Networks', skills: ['Python', 'Calculus', 'PyTorch'] }
      ],
      predictedRoles: ['AI Engineer', 'ML Scientist']
    },
    { 
      id: 2, 
      name: 'Software Engineering', 
      relevance: 65, 
      modules: [
        { name: 'Unit 1: SDLC Models', skills: ['Agile', 'Documentation'] },
        { name: 'Unit 2: Testing', skills: ['Manual Testing', 'Selenium'] }
      ],
      predictedRoles: ['QA Engineer', 'Technical Lead'],
      alert: 'Modernize with Cloud-Native Design'
    }
  ]
};

const CurriculumPlanner = () => {
  const [selectedSubject, setSelectedSubject] = useState(mockCurriculum.subjects[0]);

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">🎓 Curriculum <span className="gradient-text">Optimizer</span></h1>
          <p className="mt-2 text-slate-400">Map your syllabus to industry standards and predictive career paths.</p>
        </div>
        <div className="flex gap-4">
            <span className="bg-slate-800 text-slate-400 px-4 py-2 rounded-xl text-xs font-bold border border-white/5">Dept: {mockCurriculum.department}</span>
            <span className="bg-slate-800 text-slate-400 px-4 py-2 rounded-xl text-xs font-bold border border-white/5">{mockCurriculum.year}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Subject List */}
        <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest px-2">Active Subjects</h3>
            {mockCurriculum.subjects.map(sub => (
                <button 
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub)}
                    className={`w-full text-left p-6 rounded-[2rem] border transition-all ${
                        selectedSubject.id === sub.id ? 'bg-sky-500/10 border-sky-500 shadow-xl shadow-sky-500/10' : 'bg-slate-900 border-white/5 hover:border-white/10'
                    }`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-white">{sub.name}</h4>
                        <span className={`text-xs font-black ${sub.relevance > 75 ? 'text-emerald-400' : 'text-amber-400'}`}>{sub.relevance}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${sub.relevance > 75 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${sub.relevance}%` }}></div>
                    </div>
                </button>
            ))}
            <button className="w-full py-6 rounded-[2rem] border-2 border-dashed border-slate-800 text-slate-500 font-bold hover:border-white/10 transition-all">+ Add New Subject</button>
        </div>

        {/* Detailed Analysis */}
        <div className="lg:col-span-2 space-y-8">
            <div className="card bg-slate-900/50 border-white/5 p-10 rounded-[3rem]">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-white">{selectedSubject.name}</h2>
                        <p className="text-slate-400 mt-1">Skill Extraction & Industry Mapping</p>
                    </div>
                    {selectedSubject.alert && (
                        <div className="bg-amber-500/10 text-amber-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                            Action Required
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Curriculum Hierarchy</h5>
                        <div className="space-y-4">
                            {selectedSubject.modules.map((mod, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-slate-950 border border-white/5">
                                    <p className="font-bold text-slate-200 text-sm mb-3">{mod.name}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {mod.skills.map(s => (
                                            <span key={s} className="px-3 py-1 rounded-lg bg-sky-500/5 text-sky-400 text-[10px] font-bold border border-sky-500/10">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Predicted Career Alignment</h5>
                            <div className="flex flex-wrap gap-3">
                                {selectedSubject.predictedRoles.map(role => (
                                    <div key={role} className="flex items-center gap-3 bg-white/5 p-3 pr-5 rounded-2xl border border-white/5">
                                        <div className="h-8 w-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-sm">💼</div>
                                        <span className="text-sm font-bold text-white">{role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedSubject.alert && (
                            <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20">
                                <h6 className="text-amber-500 font-bold text-xs uppercase mb-2">AI Recommendation</h6>
                                <p className="text-sm text-slate-400">{selectedSubject.alert}</p>
                                <button className="mt-4 text-xs font-black text-white hover:underline">Apply Optimization →</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-8 bg-slate-900 border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4">Industry Relevance Trends</h3>
                    <div className="h-48 flex items-end gap-2 px-2">
                        {[40, 60, 45, 90, 75, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-sky-500/20 rounded-t-lg group relative cursor-pointer hover:bg-sky-500/40 transition-all" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-[8px] font-bold px-2 py-1 rounded">{h}%</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>2023</span>
                        <span>2024</span>
                        <span>2025</span>
                        <span>2026 (Pred)</span>
                    </div>
                </div>

                <div className="card p-8 bg-gradient-to-br from-indigo-500/10 to-slate-900 border-white/5 flex flex-col justify-center items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-indigo-500/20 flex items-center justify-center text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold text-white mb-2">Redesign Syllabus</h3>
                    <p className="text-xs text-slate-400 mb-6">Auto-generate a new curriculum draft based on the latest 2026 market intelligence.</p>
                    <button className="w-full py-3 rounded-2xl bg-indigo-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20">Draft New Version</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPlanner;
