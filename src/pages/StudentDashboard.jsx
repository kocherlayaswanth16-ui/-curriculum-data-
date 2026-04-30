import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import GamificationCard from '../components/GamificationCard.jsx';

const skillGapData = {
  labels: ['Python', 'Cloud', 'AI/ML', 'DevOps', 'Databases', 'Web Dev'],
  datasets: [
    {
      label: 'Your Skills %',
      data: [60, 40, 30, 20, 50, 70],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Industry Need %',
      data: [85, 90, 85, 80, 80, 90],
      backgroundColor: '#f97316',
    },
  ],
};

const roadmapData = {
  labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
  datasets: [
    {
      label: 'Skill Development Progress',
      data: [10, 25, 45, 60, 80, 95],
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

function StudentDashboard() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [academicSem, setAcademicSem] = useState('sem1');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };
  
  // --- Backlog State ---
  const [backlogs, setBacklogs] = useState([]);

  // --- Skills State ---
  const [mySkills, setMySkills] = useState([
    { name: 'Python', level: 'Advanced', progress: 85 },
    { name: 'Java', level: 'Intermediate', progress: 60 },
    { name: 'React', level: 'Intermediate', progress: 65 },
    { name: 'SQL', level: 'Beginner', progress: 40 },
  ]);

  // --- Jobs State ---
  const [recommendedJobs, setRecommendedJobs] = useState([
    { title: 'Frontend Developer Intern', company: 'Google', tags: ['React', 'CSS'], salary: '$120k' },
    { title: 'Cloud Associate', company: 'Amazon', tags: ['AWS', 'Linux'], salary: '$140k' },
    { title: 'AI Research Assistant', company: 'NVIDIA', tags: ['Python', 'ML'], salary: '$110k' },
  ]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);

  const fetchRealJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const response = await fetch("http://localhost:5000/api/jobs?q=Cloud");
      const data = await response.json();
      if (data.data) {
        // Map backend dummy/real data format to frontend UI format
        const fetchedJobs = data.data.map(job => ({
           title: job.title || job.role,
           company: job.company,
           tags: [job.location || 'Remote', 'Trending'],
           salary: job.salary
        }));
        setRecommendedJobs(fetchedJobs);
      }
    } catch(err) {
      console.error("Failed to fetch jobs", err);
    }
    setIsLoadingJobs(false);
  };

  // --- Activities State ---
  const [activities, setActivities] = useState([
    { id: 1, type: 'Sports', name: 'Cricket Team', role: 'Captain', performance: 'Excellent' },
    { id: 2, type: 'Cultural', name: 'Drama Club', role: 'Lead Actor', performance: 'Good' },
    { id: 3, type: 'Event', name: 'Hackathon 2026', role: 'Team Lead', performance: 'Winner' },
  ]);

  // --- Notifications ---
  const notifications = [
    { id: 1, title: 'Final Exam Schedule Out', date: '2 days ago', type: 'Exam' },
    { id: 2, title: 'New Internship: Google Cloud', date: 'Today', type: 'Job' },
    { id: 3, title: 'Annual Cultural Fest Entry', date: '5 hours ago', type: 'Event' },
  ];

  // --- Gamification Stats ---
  const [gamificationStats, setGamificationStats] = useState({
    points: 1250,
    level: 3,
    streak: 7,
    badges: ['starter', 'consistent_learner', 'code_ninja']
  });

  // Helper to generate marks for all 8 semesters
  const generateSems = () => {
    const sems = {};
    const baseMarks = user?.name === 'Yaswanth' ? 85 : 75;
    for (let i = 1; i <= 8; i++) {
      sems[`sem${i}`] = [
        { name: 'Core Subject 1', relevance: 85, marks: baseMarks + Math.floor(Math.random() * 10), total: 100 },
        { name: 'Core Subject 2', relevance: 80, marks: baseMarks + Math.floor(Math.random() * 5), total: 100 },
        { name: 'Practical Lab', relevance: 90, marks: baseMarks + 12, total: 100 },
        { name: 'Elective', relevance: 70, marks: baseMarks + 8, total: 100 },
      ];
    }
    return sems;
  };

  const subjects = generateSems();

  const totalBacklogs = backlogs.length;
  const backlogStatus = totalBacklogs === 0 
    ? { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', suggestion: 'Great performance! Maintain consistency.' }
    : { label: 'At Risk', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', suggestion: 'Focus on core subjects.' };

  const calculatePercentage = (marks, total) => ((marks / total) * 100).toFixed(1);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '👤' },
    { id: 'academics', name: 'Academics', icon: '📚' },
    { id: 'career', name: 'Skills & Career', icon: '🚀' },
    { id: 'activities', name: 'Activities', icon: '🏅' },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8 animate-in fade-in duration-500">
      {/* Header / Profile Card */}
      <div className="glass rounded-[2.5rem] p-10 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/20 border-sky-500/10 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sky-500/10 blur-[100px]"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative">
                <div className="h-32 w-32 rounded-[2rem] bg-gradient-to-br from-sky-400 to-blue-600 p-1 shadow-2xl shadow-sky-500/30">
                <div className="flex h-full w-full items-center justify-center rounded-[1.8rem] bg-slate-900 text-5xl">👨‍🎓</div>
                </div>
                <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-lg text-white">✓</div>
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter">{user?.name || 'Student'}</h1>
              <p className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-3 text-slate-300 font-medium">
                <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-lg border border-sky-500/20">AI & DS Department</span>
                <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-lg">4th Year</span>
                <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-lg font-mono">2026BTECH004</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                  {['Python', 'Java', 'Cloud', 'AIoT'].map(s => (
                      <span key={s} className="text-[10px] font-bold uppercase tracking-widest bg-slate-800/80 text-slate-400 px-2 py-1 rounded-md border border-slate-700">{s}</span>
                  ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="text-center glass-secondary rounded-3xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">CGPA</p>
              <p className="text-4xl font-black text-emerald-400">8.42</p>
            </div>
            <div className="text-center glass-secondary rounded-3xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Skill Score</p>
              <p className="text-4xl font-black text-sky-400">76%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 rounded-3xl bg-slate-900/50 p-2 border border-slate-800/50 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 rounded-2xl px-6 py-4 text-sm font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-sky-500 text-slate-950 shadow-xl shadow-sky-500/30 scale-[1.02]'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard value="85%" label="Attendance" accent="text-purple-400" />
                <StatCard value={totalBacklogs.toString()} label="Active Backlogs" accent={totalBacklogs > 0 ? "text-rose-400" : "text-emerald-400"} />
                <StatCard value="12" label="Events Joined" accent="text-amber-400" />
                <StatCard value="4" label="Certifications" accent="text-sky-400" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Notifications & Feed */}
                <div className="card h-fit">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span>🔔</span> Recent Notifications</h3>
                    <div className="space-y-4">
                        {notifications.map(n => (
                            <div key={n.id} className="flex gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/30 transition-all cursor-pointer group">
                                <div className={`h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-xl ${
                                    n.type === 'Exam' ? 'bg-rose-500/20 text-rose-400' : 
                                    n.type === 'Job' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                                }`}>
                                    {n.type === 'Exam' ? '📄' : n.type === 'Job' ? '💼' : '🎉'}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{n.title}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">{n.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-sm hover:bg-slate-700 transition-colors">Clear All Notifications</button>
                    
                    <div className="mt-8">
                        <GamificationCard stats={gamificationStats} />
                    </div>
                </div>

                {/* Main Progress Charts */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <ChartBox title="Skill Match vs Industry Need" type="bar" data={skillGapData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                        <ChartBox title="Learning Path Velocity" type="line" data={roadmapData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </div>
                    
                    <div className="card bg-gradient-to-br from-sky-500/10 to-slate-900 border-sky-500/20">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="h-24 w-24 rounded-full border-4 border-sky-500/30 flex items-center justify-center p-2">
                                <div className="h-full w-full rounded-full bg-sky-500 flex items-center justify-center text-slate-950 text-4xl">🤖</div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white">AI Career Insight</h3>
                                <p className="text-slate-300 mt-2">You are <span className="text-sky-400 font-bold underline">64% ready</span> for a Cloud Engineer role. Completing the AWS Certification will boost your match to 82%.</p>
                                <div className="mt-4 flex gap-4">
                                    <Link to="/roadmap" className="btn-primary !rounded-xl !py-2 !px-6">View My Roadmap</Link>
                                    <Link to="/resume-optimizer" className="btn-secondary !rounded-xl !py-2 !px-6">Try Resume Scan</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="space-y-8">
            <div className={`card overflow-hidden relative border-2 ${backlogStatus.border} ${backlogStatus.bg}`}>
                <div className="absolute top-0 right-0 p-8 text-6xl font-black opacity-10 text-white uppercase">{backlogStatus.label}</div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className={`h-32 w-32 rounded-[2.5rem] flex items-center justify-center text-5xl font-black shadow-2xl ${backlogStatus.bg} ${backlogStatus.color} border-4 ${backlogStatus.border}`}>
                        {totalBacklogs}
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Backlog Monitoring</h2>
                        <p className={`text-lg font-bold ${backlogStatus.color} mt-1 uppercase tracking-widest`}>Overall Status: {backlogStatus.label}</p>
                        <div className="mt-4 p-4 rounded-2xl bg-slate-950/40 border border-white/5">
                            <p className="text-sm text-slate-200 italic">" {backlogStatus.suggestion} "</p>
                        </div>
                    </div>
                    <div className="md:ml-auto">
                        <button className="btn-primary !bg-rose-500 hover:!bg-rose-400 !px-8 !py-4 shadow-xl shadow-rose-500/20">Schedule Remedial Classes</button>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card !p-0 overflow-hidden">
                    <div className="p-8 border-b border-slate-800 bg-slate-900/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="text-xl font-bold text-white whitespace-nowrap">Academic Records</h3>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                <button key={n} onClick={() => setAcademicSem(`sem${n}`)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${academicSem === `sem${n}` ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Sem {n}</button>
                            ))}
                        </div>
                    </div>
                    <div className="p-8">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800">
                                    <th className="pb-4 px-2">Subject Name</th>
                                    <th className="pb-4 px-2">Marks</th>
                                    <th className="pb-4 px-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {(subjects[academicSem] || []).map((sub, i) => (
                                    <tr key={i} className="group hover:bg-slate-800/20 transition-colors">
                                        <td className="py-5 px-2 font-bold text-white">{sub.name}</td>
                                        <td className="py-5 px-2"><span className="text-sky-400 font-bold">{sub.marks}</span><span className="text-slate-500 text-xs"> / {sub.total}</span></td>
                                        <td className="py-5 px-2">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${sub.marks >= 40 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                                {sub.marks >= 40 ? '✓ PASS' : '❌ FAIL'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card border-rose-500/20 bg-rose-500/5">
                    <h3 className="text-xl font-bold text-rose-400 mb-6 flex items-center gap-2"><span>⚠️</span> Active Arrears</h3>
                    <div className="space-y-4">
                        {backlogs.map(b => (
                            <div key={b.id} className="p-4 rounded-2xl bg-slate-900 border border-rose-500/20 shadow-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-white">{b.subject}</p>
                                        <p className="text-xs text-slate-500 mt-1">Code: {b.code} • Sem {b.sem}</p>
                                    </div>
                                    <span className="text-[10px] bg-rose-500 text-white px-2 py-1 rounded font-black">FAIL</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">Risk: {b.risk}</span>
                                    <button className="text-[10px] font-bold text-sky-400 hover:underline">Apply for Re-exam →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'career' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Skill Tracking */}
                <div className="lg:col-span-2 card">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-white">Skill Management</h3>
                            <p className="text-sm text-slate-400 mt-1">Track your technical expertise and industry readiness.</p>
                        </div>
                        <button className="btn-primary !px-5 !py-2.5 !text-xs !rounded-xl shadow-lg shadow-sky-500/20">+ Add New Skill</button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {mySkills.map((skill, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">{skill.name}</h4>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded mt-1 inline-block ${
                                            skill.level === 'Advanced' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                                        }`}>{skill.level}</span>
                                    </div>
                                    <span className="text-2xl">💻</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        <span>Progress</span>
                                        <span>{skill.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-1000 ${skill.progress > 75 ? 'bg-emerald-500' : 'bg-sky-500'}`} style={{ width: `${skill.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resume Analyzer */}
                <div className="card border-amber-500/30 bg-amber-500/5 shadow-2xl">
                    <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2"><span>📄</span> AI Resume Analyzer</h3>
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-slate-700 rounded-3xl p-8 text-center bg-slate-900/50 hover:border-amber-500/50 transition-all cursor-pointer group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📤</div>
                            <p className="font-bold text-slate-300">Upload Your Resume</p>
                            <p className="text-xs text-slate-500 mt-1">PDF, DOCX supported</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-slate-200">Current Score</span>
                                <span className="text-2xl font-black text-amber-400">72 / 100</span>
                            </div>
                            <div className="space-y-3">
                                <p className="text-xs text-slate-400 flex gap-2"><span>❌</span> Missing keywords: "AWS", "Docker"</p>
                                <p className="text-xs text-slate-400 flex gap-2"><span>✅</span> Strong summary and projects</p>
                                <p className="text-xs text-slate-400 flex gap-2"><span>⚠️</span> Layout could be more ATS-friendly</p>
                            </div>
                        </div>
                        <button className="w-full btn-primary !bg-amber-500 !text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-amber-500/20">Analyze & Optimize</button>
                    </div>
                </div>
            </div>

            {/* Jobs Section */}
            <div className="card">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h3 className="text-2xl font-black text-white">Recommended Jobs & Internships</h3>
                    <div className="flex gap-4 items-center">
                      <button 
                        onClick={fetchRealJobs}
                        disabled={isLoadingJobs}
                        className="btn-outline !py-1.5 !px-4 !text-xs !rounded-lg border-sky-500/30 text-sky-400 hover:bg-sky-500/10"
                      >
                        {isLoadingJobs ? 'Fetching...' : '🔄 Load Live Jobs'}
                      </button>
                      <Link to="/jobs" className="text-sky-400 text-sm font-bold hover:underline">View Job Portal →</Link>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recommendedJobs.map((job, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl font-bold text-white">{job.company[0]}</div>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">{job.salary}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{job.title}</h4>
                            <p className="text-sm text-slate-400 mb-4">{job.company}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.tags.map(t => <span key={t} className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded uppercase tracking-widest">{t}</span>)}
                            </div>
                            <button className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20">Quick Apply</button>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Sports Module */}
                <div className="card border-sky-500/20 bg-sky-500/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black text-sky-400 flex items-center gap-2"><span>🏅</span> Sports Performance</h3>
                        <Link to="/sports" className="btn-outline !py-1 !px-3 !text-[10px]">Full Dashboard →</Link>
                    </div>
                    <div className="space-y-4">
                        {activities.filter(a => a.type === 'Sports').map(s => (
                            <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 group hover:border-sky-500/50 transition-all">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-4 items-center">
                                        <div className="h-12 w-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-2xl">🏏</div>
                                        <div>
                                            <p className="font-bold text-white">{s.name}</p>
                                            <p className="text-xs text-slate-500">{s.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">{s.performance}</p>
                                        <p className="text-[10px] text-slate-500 mt-1">Status: Active</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-4 rounded-2xl border-2 border-dashed border-slate-800 text-slate-500 font-bold hover:border-sky-500/50 hover:text-sky-400 transition-all">+ Join New Sport</button>
                    </div>
                </div>

                {/* Cultural Activities */}
                <div className="card border-purple-500/20 bg-purple-500/5 shadow-2xl">
                    <h3 className="text-2xl font-black text-purple-400 mb-8 flex items-center gap-2"><span>🎭</span> Cultural & Arts</h3>
                    <div className="space-y-4">
                        {activities.filter(a => a.type === 'Cultural' || a.type === 'Event').map(c => (
                            <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 group hover:border-purple-500/50 transition-all">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-4 items-center">
                                        <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">{c.type === 'Cultural' ? '🎬' : '💻'}</div>
                                        <div>
                                            <p className="font-bold text-white">{c.name}</p>
                                            <p className="text-xs text-slate-500">{c.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-purple-400 uppercase tracking-widest">{c.performance}</p>
                                        <p className="text-[10px] text-slate-500 mt-1">Achievements: 2</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-4 rounded-2xl border-2 border-dashed border-slate-800 text-slate-500 font-bold hover:border-purple-500/50 hover:text-purple-400 transition-all">+ Register for Event</button>
                    </div>
                </div>
            </div>

            {/* Feedback System */}
            <div className="card border-emerald-500/20 bg-emerald-500/5 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-black text-emerald-400">Feedback System</h3>
                        <p className="text-slate-400 mt-1">Help us improve. Provide feedback on faculty, curriculum, or campus facilities.</p>
                    </div>
                    <button className="btn-primary !bg-emerald-500 hover:!bg-emerald-400 !text-slate-950 !px-8 !py-3 !rounded-2xl font-black shadow-lg shadow-emerald-500/20">Give Anonymous Feedback</button>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center pt-10 pb-20">
          <p className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.4em]">Integrated Student Lifecycle Module • 2026 Edition</p>
      </div>
    </section>
  );
}

export default StudentDashboard;
