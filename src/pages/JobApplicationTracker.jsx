import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const MOCK_APPLICATIONS = [
  {
    id: 1,
    role: 'Frontend Developer Intern',
    company: 'TechNova Solutions',
    dateApplied: '2026-04-15',
    status: 'Interview',
    timeline: [
      { step: 'Applied', date: '2026-04-15', completed: true },
      { step: 'Aptitude Test', date: '2026-04-20', completed: true },
      { step: 'Technical Interview', date: '2026-04-28', completed: true },
      { step: 'HR Round', date: 'Pending', completed: false },
    ],
    suggestions: ['Focus on system design for the next round', 'Review React performance optimization'],
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Innovate AI',
    dateApplied: '2026-04-10',
    status: 'Rejected',
    timeline: [
      { step: 'Applied', date: '2026-04-10', completed: true },
      { step: 'Resume Shortlisted', date: '2026-04-12', completed: true },
      { step: 'Technical Round', date: '2026-04-18', completed: true },
      { step: 'Rejected', date: '2026-04-20', completed: true },
    ],
    suggestions: ['Improve knowledge of SQL indexing', 'Practice coding on LeetCode Medium level'],
  },
  {
    id: 3,
    role: 'UI/UX Designer',
    company: 'Creative Studio',
    dateApplied: '2026-04-25',
    status: 'Applied',
    timeline: [
      { step: 'Applied', date: '2026-04-25', completed: true },
      { step: 'Portfolio Review', date: 'Pending', completed: false },
    ],
    suggestions: ['Add more case studies to your portfolio', 'Explore Figma prototyping animations'],
  },
  {
    id: 4,
    role: 'Data Science Intern',
    company: 'DataMax',
    dateApplied: '2026-04-05',
    status: 'Selected',
    timeline: [
      { step: 'Applied', date: '2026-04-05', completed: true },
      { step: 'Data Challenge', date: '2026-04-08', completed: true },
      { step: 'Final Interview', date: '2026-04-15', completed: true },
      { step: 'Selected', date: '2026-04-18', completed: true },
    ],
    suggestions: ['Congratulations! Review the company culture onboarding', 'Brush up on PyTorch basics for the project'],
  },
];

function JobApplicationTracker() {
  const { user } = useAuth();
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState(MOCK_APPLICATIONS[0]);

  const stats = {
    total: applications.length,
    selected: applications.filter((app) => app.status === 'Selected').length,
    rejected: applications.filter((app) => app.status === 'Rejected').length,
    pending: applications.filter((app) => ['Applied', 'Interview', 'Shortlisted'].includes(app.status)).length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Rejected': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'Interview': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'Shortlisted': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Job Application Tracker 🚀</h1>
          <p className="mt-2 text-slate-400">Monitor your career progress and get AI-powered improvement suggestions.</p>
        </div>
        <button className="btn-primary !py-3 !px-6 flex items-center gap-2 shadow-xl shadow-sky-500/20">
          <span>➕</span> Add New Application
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Apps', value: stats.total, color: 'text-white', icon: '📊' },
          { label: 'Selected', value: stats.selected, color: 'text-emerald-400', icon: '✅' },
          { label: 'Rejected', value: stats.rejected, color: 'text-rose-400', icon: '❌' },
          { label: 'In Progress', value: stats.pending, color: 'text-sky-400', icon: '⏳' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-4xl opacity-10 group-hover:scale-125 transition-transform">{stat.icon}</div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-4xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Applications List */}
        <div className="space-y-6">
          <div className="glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-white/5 px-8 py-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Recent Applications</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-bold bg-slate-800 rounded-full border border-white/5 text-slate-400 hover:text-white">All</button>
                <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-white">Active</button>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {applications.map((app) => (
                <div 
                  key={app.id} 
                  onClick={() => setSelectedApp(app)}
                  className={`p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all hover:bg-white/5 ${selectedApp?.id === app.id ? 'bg-sky-500/5 border-l-4 border-sky-500' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl shadow-inner">
                      {app.company[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{app.role}</h3>
                      <p className="text-slate-400 text-sm flex items-center gap-2">
                        <span>🏢</span> {app.company} 
                        <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                        <span>📅</span> {app.dateApplied}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Suggestions Based on Selection */}
          {selectedApp && (
            <div className="glass rounded-[2.5rem] p-8 border border-sky-500/20 bg-sky-500/5 shadow-2xl shadow-sky-500/10 animate-in slide-in-from-bottom-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white text-lg shadow-lg shadow-sky-500/40">🤖</span>
                AI Smart Suggestions for {selectedApp.role}
              </h3>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {selectedApp.suggestions.map((suggestion, i) => (
                  <div key={i} className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 flex items-start gap-4 group hover:border-sky-500/30 transition-all">
                    <span className="mt-1 text-sky-400 group-hover:scale-125 transition-transform">💡</span>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">{suggestion}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Skill Gap Detected</p>
                <button className="text-sky-400 text-xs font-bold hover:underline">View Roadmap →</button>
              </div>
            </div>
          )}
        </div>

        {/* Timeline Tracking Sidebar */}
        <div className="space-y-6">
          <div className="glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl sticky top-24">
            <h3 className="text-xl font-bold text-white mb-8">Application Timeline</h3>
            {selectedApp ? (
              <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-800"></div>
                
                {selectedApp.timeline.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-6">
                    <div className={`mt-1.5 z-10 h-6 w-6 rounded-full border-4 ${step.completed ? 'bg-sky-500 border-sky-900/50 shadow-[0_0_15px_rgba(14,165,233,0.5)]' : 'bg-slate-900 border-slate-800'}`}></div>
                    <div>
                      <h4 className={`text-sm font-bold ${step.completed ? 'text-white' : 'text-slate-500'}`}>{step.step}</h4>
                      <p className="text-xs text-slate-500 mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center opacity-30">
                <span className="text-6xl block mb-4">📍</span>
                <p className="text-sm font-bold">Select an application to see progress</p>
              </div>
            )}

            <div className="mt-10 p-6 rounded-3xl bg-slate-950/50 border border-white/5">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Quick Links</p>
              <div className="space-y-3">
                <button className="w-full py-3 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-all text-left px-4 flex justify-between items-center">
                  <span>📄 Prepare Resume</span>
                  <span>↗️</span>
                </button>
                <button className="w-full py-3 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-all text-left px-4 flex justify-between items-center">
                  <span>💻 Coding Practice</span>
                  <span>↗️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplicationTracker;
