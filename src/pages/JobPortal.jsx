import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard.jsx';

function JobPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState('All');

  // --- Mock Student Data ---
  const studentProfile = {
    dept: 'CSE',
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Git', 'SQL'],
    backlogs: 3, // Change to 0 to see "Premium" jobs
    interests: ['Web Development', 'AI'],
  };

  const jobs = [
    {
      id: 1,
      role: 'Frontend Developer',
      company: 'TechFlow Solutions',
      dept: 'CSE',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      tier: 'Standard',
      interest: 'Web Development',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'TypeScript'],
      description: 'We are looking for a creative frontend developer to build stunning user interfaces.'
    },
    {
      id: 2,
      role: 'Backend Engineer',
      company: 'DataCore Systems',
      dept: 'CSE',
      location: 'Bangalore, IN',
      type: 'On-site',
      tier: 'Standard',
      salary: '₹12L - ₹24L',
      interest: 'Web Development',
      requiredSkills: ['Python', 'Django', 'SQL', 'Docker', 'AWS', 'Redis'],
      description: 'Scale our backend infrastructure and optimize database performance.'
    },
    {
      id: 3,
      role: 'Full Stack Developer',
      company: 'CloudNine Startup',
      dept: 'CSE',
      location: 'New York, US',
      type: 'Hybrid',
      tier: 'Premium',
      salary: '$110k - $160k',
      interest: 'Web Development',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'AWS'],
      description: 'Join our fast-paced team to build the future of cloud computing.'
    },
    {
      id: 4,
      role: 'Data Analyst',
      company: 'InsightEdge',
      dept: 'IT',
      location: 'Remote',
      type: 'Contract',
      tier: 'Standard',
      salary: '$60/hr',
      interest: 'Data Science',
      requiredSkills: ['SQL', 'Python', 'PowerBI', 'Excel', 'Statistics'],
      description: 'Transform raw data into actionable business insights.'
    },
    {
      id: 5,
      role: 'DevOps Engineer',
      company: 'SecurityFirst',
      dept: 'CSE',
      location: 'Austin, TX',
      type: 'Full-time',
      tier: 'Standard',
      salary: '$130k - $180k',
      interest: 'DevOps',
      requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Linux', 'Git'],
      description: 'Automate our infrastructure and ensure 99.9% uptime.'
    },
    {
      id: 6,
      role: 'AI Researcher',
      company: 'OpenMinds AI',
      dept: 'CSE',
      location: 'San Francisco, CA',
      type: 'Full-time',
      tier: 'Premium',
      salary: '$180k - $250k',
      interest: 'AI',
      requiredSkills: ['Python', 'PyTorch', 'Mathematics', 'Statistics', 'C++'],
      description: 'Push the boundaries of Artificial Intelligence with our core research team.'
    },
    {
      id: 7,
      role: 'Embedded Systems Intern',
      company: 'MicroChip Tech',
      dept: 'ECE',
      location: 'Chennai, IN',
      type: 'Internship',
      tier: 'Standard',
      salary: '₹40k/mo',
      interest: 'Core Electronics',
      requiredSkills: ['C', 'Microcontrollers', 'Embedded C', 'Electronics'],
      description: 'Gain hands-on experience in low-level embedded programming.'
    }
  ];

  // --- Recommendation Engine Logic ---
  const jobAnalyses = useMemo(() => {
    return jobs.map(job => {
      // 1. Skill Match Calculation
      const matchingSkills = job.requiredSkills.filter(s => studentProfile.skills.includes(s));
      const missingSkills = job.requiredSkills.filter(s => !studentProfile.skills.includes(s));
      const matchPercentage = Math.round((matchingSkills.length / job.requiredSkills.length) * 100);
      
      // 2. Department Recommendation
      const deptMatch = job.dept === studentProfile.dept;

      // 3. Backlog Filtering
      // If student has > 2 backlogs, Premium jobs are locked
      const isLocked = studentProfile.backlogs > 2 && job.tier === 'Premium';

      // 4. Recommendation Category
      let recommendationLevel = 'Not Recommended';
      if (matchPercentage >= 70 && !isLocked) recommendationLevel = 'Highly Recommended';
      else if (matchPercentage >= 40 && !isLocked) recommendationLevel = 'Recommended';
      else if (isLocked) recommendationLevel = 'Locked';

      return {
        ...job,
        matchingSkills,
        missingSkills,
        matchPercentage,
        deptMatch,
        isLocked,
        recommendationLevel
      };
    });
  }, [studentProfile]);

  const filteredJobs = jobAnalyses.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterest = selectedInterest === 'All' || job.interest === selectedInterest;
    return matchesSearch && matchesInterest;
  });

  const interestsList = ['All', ...new Set(jobs.map(j => j.interest))];

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="glass rounded-[2.5rem] p-10 relative overflow-hidden bg-gradient-to-br from-slate-900 to-sky-900/20 border-sky-500/10 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sky-500/10 blur-[100px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="gradient-text text-5xl font-black tracking-tight">AI Job Recommendation Engine 💼</h1>
            <p className="mt-3 text-slate-300 text-lg font-medium">Smart matching based on skills, department, and academic records.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="text-center bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">My Backlogs</p>
                <p className={`text-2xl font-black ${studentProfile.backlogs === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{studentProfile.backlogs}</p>
             </div>
             <div className="text-center bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">My Branch</p>
                <p className="text-2xl font-black text-sky-400">{studentProfile.dept}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search roles or companies..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:border-sky-500 outline-none transition-all pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {interestsList.map(interest => (
                <button 
                  key={interest} 
                  onClick={() => setSelectedInterest(interest)}
                  className={`px-6 py-3.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${
                    selectedInterest === interest 
                      ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                    {interest}
                </button>
            ))}
        </div>
      </div>

      {/* Status Alert for Backlogs */}
      {studentProfile.backlogs > 0 && (
          <div className="card border-rose-500/20 bg-rose-500/5 flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                  <span className="text-3xl">🛡️</span>
                  <div>
                      <h3 className="text-lg font-bold text-rose-400">Backlog Alert: High-Tier Jobs Locked</h3>
                      <p className="text-sm text-slate-400">Clear your <span className="font-bold text-white">{studentProfile.backlogs} backlogs</span> to unlock Premium opportunities from FAANG and top research labs.</p>
                  </div>
              </div>
              <button className="btn-primary !bg-rose-500 !text-white !px-6 !py-2 !rounded-xl text-xs uppercase tracking-widest whitespace-nowrap">View Remedials</button>
          </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Job Listings Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
             <span className="h-10 w-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-xl">📄</span>
             Personalized Recommendations
          </h2>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className={`group p-6 rounded-3xl border transition-all cursor-pointer shadow-xl relative overflow-hidden ${
                  selectedJob?.id === job.id 
                    ? 'bg-sky-500/10 border-sky-500' 
                    : job.isLocked ? 'bg-slate-950/60 border-slate-900 opacity-60' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
                onClick={() => !job.isLocked && setSelectedJob(job)}
              >
                {job.isLocked && (
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <div className="bg-slate-900 border border-slate-700 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                            <span className="text-xl">🔒</span>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Locked: Clear Backlogs</p>
                        </div>
                    </div>
                )}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex gap-5 items-center">
                    <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700">{job.role[0]}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">{job.role}</h3>
                          {job.tier === 'Premium' && <span className="text-[10px] font-black bg-amber-500 text-slate-950 px-2 py-0.5 rounded uppercase">Premium</span>}
                      </div>
                      <p className="text-sm text-slate-400 font-medium">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block ${
                        job.recommendationLevel === 'Highly Recommended' ? 'bg-emerald-500 text-slate-950' : 
                        job.recommendationLevel === 'Recommended' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-slate-800 text-slate-500'
                    }`}>
                        {job.recommendationLevel}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Match Score</span>
                      <span className={`text-xl font-black ${
                        job.matchPercentage > 75 ? 'text-emerald-400' : job.matchPercentage > 40 ? 'text-amber-400' : 'text-rose-400'
                      }`}>{job.matchPercentage}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${job.deptMatch ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                      {job.dept} Department {job.deptMatch && '✓'}
                  </span>
                  {job.requiredSkills.slice(0, 4).map(skill => (
                    <span 
                      key={skill} 
                      className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                        studentProfile.skills.includes(skill) 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 4 && <span className="text-[10px] text-slate-600 font-bold">+{job.requiredSkills.length - 4} more</span>}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center card border-dashed border-slate-800">
               <span className="text-5xl opacity-20">🔍</span>
               <p className="text-slate-500 mt-4 font-bold">No jobs matching your search.</p>
            </div>
          )}
        </div>

        {/* Industry Gap Analysis Sidebar */}
        <div className="space-y-8">
          <div className="card sticky top-8 border-sky-500/20 bg-slate-900/80 shadow-2xl overflow-hidden relative min-h-[400px]">
            {selectedJob ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl"></div>
                <h3 className="text-2xl font-black text-white mb-2">Recommendation Profile</h3>
                <p className="text-sm text-slate-400 mb-8">Matching for: <span className="text-sky-400 font-bold">{selectedJob.role}</span></p>

                <div className="space-y-8">
                  {/* Matching Skills */}
                  <div>
                    <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Matching Skills ({selectedJob.matchingSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.matchingSkills.map(s => (
                        <span key={s} className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-500/20">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <h4 className="text-xs font-black text-rose-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                      Missing Skills ({selectedJob.missingSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.missingSkills.length > 0 ? (
                        selectedJob.missingSkills.map(s => (
                          <span key={s} className="bg-rose-500/10 text-rose-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-500/20">{s}</span>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic">No skills missing. You are a perfect match!</p>
                      )}
                    </div>
                  </div>

                  {/* Smart Suggestions */}
                  <div className="p-6 rounded-[2rem] bg-slate-950/60 border border-slate-800 shadow-inner">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span>🤖</span> Smart AI Suggestions
                    </h4>
                    <div className="space-y-4">
                      {selectedJob.missingSkills.length > 0 ? (
                        <>
                          <p className="text-sm text-slate-300 leading-relaxed italic">
                            "To clear the interview for this role, we recommend mastering <span className="text-white font-bold">{selectedJob.missingSkills[0]}</span> and building <span className="text-white font-bold">2 projects</span> using <span className="text-white font-bold">{selectedJob.missingSkills[1] || 'modern frameworks'}</span>."
                          </p>
                          <div className="pt-4 border-t border-slate-800">
                             <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Recommended Course</p>
                             <p className="text-xs text-sky-400 font-bold hover:underline cursor-pointer">Advanced {selectedJob.missingSkills[0]} Masterclass →</p>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-slate-300 leading-relaxed italic">"You have all the required skills! Apply now to increase your chances of being shortlisted."</p>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl shadow-sky-500/20 uppercase tracking-[0.2em] text-sm">
                     Apply to {selectedJob.company}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center opacity-50 h-full flex flex-col justify-center">
                 <span className="text-6xl mb-6">👈</span>
                 <p className="text-slate-400 font-bold">Select a job to view your<br/>Recommendation Analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center pt-20 pb-20">
          <p className="text-slate-700 font-black text-[12px] uppercase tracking-[0.5em]">Industry Recommendation Engine • 2026 Core Infrastructure</p>
      </div>
    </section>
  );
}

export default JobPortal;
