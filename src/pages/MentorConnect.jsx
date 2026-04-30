import React, { useState } from 'react';

const mentors = [
  { id: 1, name: 'Dr. Sarah Smith', role: 'Faculty', expertise: ['AI', 'Python', 'Research'], rating: 4.9, image: '👩‍🏫' },
  { id: 2, name: 'Alex Johnson', role: 'Senior Student', expertise: ['Cloud', 'DevOps', 'AWS'], rating: 4.7, image: '👨‍🎓' },
  { id: 3, name: 'John Doe', role: 'Industry Expert', expertise: ['Full Stack', 'React', 'Node.js'], rating: 4.8, image: '👨‍💻' },
  { id: 4, name: 'Maria Garcia', role: 'Faculty', expertise: ['Data Science', 'Statistics', 'R'], rating: 4.6, image: '👩‍🔬' },
];

const MentorConnect = () => {
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  
  const allExpertise = ['All', ...new Set(mentors.flatMap(m => m.expertise))];
  
  const filteredMentors = selectedExpertise === 'All' 
    ? mentors 
    : mentors.filter(m => m.expertise.includes(selectedExpertise));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight">Mentor Connect</h1>
        <p className="mt-4 text-lg text-slate-400">Get guidance from faculty, industry experts, and peers.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {allExpertise.map(exp => (
          <button 
            key={exp}
            onClick={() => setSelectedExpertise(exp)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              selectedExpertise === exp 
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {exp}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="card bg-slate-900/50 backdrop-blur-xl border-slate-800 p-8 rounded-[2.5rem] hover:border-sky-500/30 transition-all group">
            <div className="flex items-center gap-6 mb-6">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-4xl shadow-xl shadow-sky-500/20">
                {mentor.image}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{mentor.name}</h3>
                <p className="text-sky-400 font-bold text-sm uppercase tracking-widest">{mentor.role}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map(exp => (
                  <span key={exp} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-xs font-medium border border-slate-700">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-lg">★</span>
                <span className="text-white font-bold">{mentor.rating}</span>
                <span className="text-slate-500 text-xs font-medium">(24 reviews)</span>
              </div>
            </div>

            <button className="w-full btn-primary !rounded-2xl !py-4 font-black shadow-xl shadow-sky-500/20 group-hover:scale-[1.02] transition-transform">
              Request Mentorship
            </button>
          </div>
        ))}
      </div>

      {/* Peer Matching Section */}
      <div className="mt-20 card bg-gradient-to-br from-emerald-500/10 to-slate-900 border-emerald-500/20 p-12 rounded-[3rem]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl font-black text-white">Find a Study Buddy</h2>
            <p className="mt-4 text-lg text-slate-300">We've matched you with 3 peers who are working on the same skill gaps as you.</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-xl">
                    {i === 1 ? '👤' : i === 2 ? '👥' : '👤'}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 font-medium">Join 240 others learning <span className="text-emerald-400 font-bold">AWS Cloud</span> today.</p>
            </div>
          </div>
          <button className="btn-primary !bg-emerald-500 !text-slate-950 !px-12 !py-5 !rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20">
            Start Collaborative Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorConnect;
