import { useState } from 'react';
import ChartBox from '../components/ChartBox.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const MOCK_STUDENTS = [
  { name: 'Ravi Kumar', dept: 'CSE', skills: ['Python', 'SQL'], match: 70, backlog: 0, resume: 'ravi_resume.pdf' },
  { name: 'Priya Sharma', dept: 'ECE', skills: ['C++', 'Embedded C'], match: 85, backlog: 0, resume: 'priya_resume.pdf' },
  { name: 'Arjun Das', dept: 'IT', skills: ['Java', 'Spring Boot'], match: 65, backlog: 1, resume: 'arjun_resume.pdf' },
];

const MOCK_COLLEGES = [
  { name: 'XYZ Engineering College', placementRate: 85, performance: 'Excellent', topDept: 'CSE', courses: ['AI & ML', 'Cybersecurity'] },
  { name: 'ABC Institute of Tech', placementRate: 78, performance: 'Good', topDept: 'IT', courses: ['Data Science', 'Cloud Computing'] },
];

const MOCK_JOBS = [
  { id: 1, company: 'Infosys', role: 'Software Engineer', skills: ['Java', 'SQL'], link: 'https://infosys.com/careers' },
  { id: 2, company: 'TCS', role: 'Full Stack Developer', skills: ['React', 'Node.js'], link: 'https://tcs.com/careers' },
  { id: 3, company: 'Google', role: 'AI Resident', skills: ['Python', 'TensorFlow'], link: 'https://google.com/about/careers' },
  { id: 4, company: 'Amazon', role: 'Cloud Support', skills: ['AWS', 'Linux'], link: 'https://amazon.jobs' },
];

function MarketIntelligence() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('insights');

  const trendingSkillsData = {
    labels: ['AI/ML', 'Cloud', 'Data Science', 'Cybersecurity', 'Rust', 'DevOps'],
    datasets: [
      {
        label: 'Market Demand Index',
        data: [98, 92, 88, 85, 75, 82],
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        borderColor: '#38bdf8',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const salaryData = {
    labels: ['AI Engineer', 'Cloud Architect', 'Full Stack', 'Data Scientist', 'DevOps'],
    datasets: [
      {
        label: 'Average Salary (LPA)',
        data: [18, 22, 12, 15, 14],
        backgroundColor: ['#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985'],
      },
    ],
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-4 py-1 text-xs font-black text-sky-400 uppercase tracking-widest ring-1 ring-inset ring-sky-500/20 mb-6">
            Real-time Insights
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Market Intelligence <span className="gradient-text">Hub</span> 📊
          </h1>
          <p className="mt-6 text-slate-400 text-lg max-w-2xl leading-relaxed">
            Connecting students, colleges, and industry leaders through data-driven insights and real-time job opportunities.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="glass-secondary inline-flex p-2 rounded-[2.5rem] gap-2 shadow-2xl">
          {[
            { id: 'insights', name: 'Market Insights', icon: '📈' },
            { id: 'students', name: 'Student Directory', icon: '👤' },
            { id: 'colleges', name: 'College Analytics', icon: '🏫' },
            { id: 'companies', name: 'Company & Jobs', icon: '🏢' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xl shadow-sky-500/30 scale-105' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden md:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        
        {/* Market Insights Tab */}
        {activeTab === 'insights' && (
          <div className="grid lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
            <ChartBox title="Trending Skills Demand (2026)" type="radar" data={trendingSkillsData} />
            <ChartBox title="Average Salary Benchmarks (LPA)" type="bar" data={salaryData} />
            
            <div className="glass rounded-[2.5rem] p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Smart Suggestions 🤖</h3>
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-sky-500/5 border border-sky-500/20 group hover:bg-sky-500/10 transition-all">
                  <p className="text-xs font-black text-sky-500 uppercase tracking-widest mb-2">For Students</p>
                  <p className="text-slate-300 font-medium leading-relaxed">"Learn **React and Node.js** to match top frontend jobs. Improve resume formatting to increase your visibility by **35%**."</p>
                </div>
                <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 group hover:bg-emerald-500/10 transition-all">
                  <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2">For Colleges</p>
                  <p className="text-slate-300 font-medium leading-relaxed">"Integrate **Data Science and AI** courses into the main curriculum. Focus on placement training for the **IT department**."</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-[2.5rem] p-8 border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950">
              <h3 className="text-2xl font-bold text-white mb-6">Market Trends Today</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Trending', value: 'AI, Cloud, Data Science', color: 'text-sky-400' },
                  { label: 'Top Hiring', value: 'Google, TCS, Infosys', color: 'text-emerald-400' },
                  { label: 'Job Demand', value: 'Surging in Remote Roles', color: 'text-amber-400' },
                  { label: 'Skill Premium', value: '+25% for Rust Devs', color: 'text-rose-400' },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{item.label}</span>
                    <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Student Directory Tab */}
        {activeTab === 'students' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
            {MOCK_STUDENTS.map((student, i) => (
              <div key={i} className="glass rounded-[2.5rem] p-8 border border-white/10 hover:border-sky-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-3xl shadow-inner border border-white/5">
                    👤
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{student.name}</h4>
                    <p className="text-sky-500 text-xs font-black uppercase tracking-widest">{student.dept} Department</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Skills</span>
                    <span className="text-slate-300">{student.skills.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Skill Match %</span>
                    <span className="text-emerald-400 font-black">{student.match}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Backlogs</span>
                    <span className={`${student.backlog > 0 ? 'text-rose-400' : 'text-slate-400'}`}>{student.backlog}</span>
                  </div>
                </div>
                <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                  View Resume 📄
                </button>
              </div>
            ))}
          </div>
        )}

        {/* College Analytics Tab */}
        {activeTab === 'colleges' && (
          <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
            {MOCK_COLLEGES.map((college, i) => (
              <div key={i} className="glass rounded-[2.5rem] p-10 border border-white/10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-20 w-20 rounded-3xl bg-sky-500/20 flex items-center justify-center text-4xl shadow-lg shadow-sky-500/10">
                    🏫
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white">{college.name}</h4>
                    <p className="text-slate-400 font-bold">Performance: <span className="text-emerald-400">{college.performance}</span></p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Placement Rate</p>
                    <p className="text-3xl font-black text-white">{college.placementRate}%</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Top Dept</p>
                    <p className="text-3xl font-black text-sky-400">{college.topDept}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Available Modern Courses</p>
                  <div className="flex flex-wrap gap-2">
                    {college.courses.map((course, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-full bg-slate-900 border border-white/10 text-xs font-bold text-slate-300">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Company & Jobs Tab */}
        {activeTab === 'companies' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4">
            {MOCK_JOBS.map((job) => (
              <div key={job.id} className="glass rounded-[2.5rem] p-8 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <span className="text-4xl">🏢</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white mb-2">{job.company}</h4>
                  <p className="text-emerald-400 font-bold text-sm mb-6">{job.role}</p>
                  <div className="space-y-4 mb-8">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-[10px] font-bold text-slate-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <a 
                  href={job.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest text-center shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                >
                  Apply Now 🔗
                </a>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Live Data Integration Banner */}
      <div className="glass rounded-[2rem] p-6 border-sky-500/20 bg-sky-500/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-sky-500 flex items-center justify-center text-2xl animate-pulse">📡</div>
          <div>
            <p className="text-white font-bold">Live Job API Connected</p>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Scanning global career portals every 15 mins</p>
          </div>
        </div>
        <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all">
          Force Refresh Data
        </button>
      </div>
    </section>
  );
}

export default MarketIntelligence;
