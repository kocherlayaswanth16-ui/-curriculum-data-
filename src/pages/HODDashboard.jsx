import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';
import PredictiveTrendCard from '../components/PredictiveTrendCard.jsx';

// --- Mock Data ---
const performanceData = {
  labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
  datasets: [
    {
      label: 'Pass Percentage',
      data: [85, 82, 88, 75, 80, 85, 90, 92],
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const deptComparisonData = {
  labels: ['CSE', 'ECE', 'MECH', 'IT'],
  datasets: [
    {
      label: 'Pass Percentage',
      data: [85, 70, 78, 88],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Placement Rate',
      data: [92, 65, 55, 89],
      backgroundColor: '#22c55e',
    }
  ],
};

const participationData = {
  labels: ['Sports', 'Cultural', 'Workshops'],
  datasets: [
    {
      data: [45, 30, 80],
      backgroundColor: ['#f59e0b', '#ec4899', '#8b5cf6'],
    },
  ],
};

const subjectResultsData = {
  labels: ['Data Structures', 'OS', 'Database', 'Networks', 'AI/ML'],
  datasets: [
    {
      label: 'Average Marks %',
      data: [78, 65, 82, 70, 85],
      backgroundColor: ['#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'],
    },
  ],
};

const facultyList = [
  { id: 1, name: 'Dr. Alan Turing', role: 'Professor', workload: '12 hrs/week', progress: 85, subjects: ['AI/ML', 'Data Science'] },
  { id: 2, name: 'Dr. Ada Lovelace', role: 'Assoc. Professor', workload: '14 hrs/week', progress: 92, subjects: ['Algorithms', 'Data Structures'] },
  { id: 3, name: 'Grace Hopper', role: 'Asst. Professor', workload: '16 hrs/week', progress: 78, subjects: ['Operating Systems', 'Compilers'] },
];

const approvalsList = [
  { id: 101, type: 'Leave Request', applicant: 'Dr. Alan Turing', date: 'Oct 15 - Oct 17', status: 'Pending' },
  { id: 102, type: 'Event Approval', applicant: 'Tech Club', date: 'Nov 5', status: 'Pending' },
  { id: 103, type: 'Syllabus Change', applicant: 'Curriculum Comm.', date: 'Spring 2027', status: 'Pending' },
];

// --- Component ---
function HODDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };
  
  // --- Curriculum State ---
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', semester: '', credits: '' });
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Advanced Cloud Computing', semester: 'Semester 6', credits: '4 Credits', faculty: 'Unassigned' },
    { id: 2, name: 'AIoT Architecture', semester: 'Semester 6', credits: '4 Credits', faculty: 'Dr. Alan Turing' },
    { id: 3, name: 'Full Stack MERN', semester: 'Semester 5', credits: '3 Credits', faculty: 'Unassigned' },
    { id: 4, name: 'Cyber Security Basics', semester: 'Semester 4', credits: '3 Credits', faculty: 'Unassigned' },
  ]);

  const [industryUpdates, setIndustryUpdates] = useState([
    { id: 1, subject: 'Database Management', requirement: 'Needs Vector DB concepts', resolved: false },
    { id: 2, subject: 'Software Engineering', requirement: 'Needs DevOps/Docker integration', resolved: false },
    { id: 3, subject: 'Web Technologies', requirement: 'Needs React/Next.js replacement for PHP', resolved: false },
  ]);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.name && newSubject.semester && newSubject.credits) {
      setSubjects([{ id: Date.now(), ...newSubject, faculty: 'Unassigned' }, ...subjects]);
      setNewSubject({ name: '', semester: '', credits: '' });
      setShowAddSubjectModal(false);
    }
  };

  const resolveUpdate = (id) => {
    setIndustryUpdates(updates => updates.map(u => u.id === id ? { ...u, resolved: true } : u));
  };

  const [predictiveTrends, setPredictiveTrends] = useState([
    { skill: 'PHP (Legacy)', current: 45, predicted_1yr: 20, status: 'declining', replacement: 'Node.js / Next.js' },
    { skill: 'Manual QA', current: 55, predicted_1yr: 30, status: 'declining', replacement: 'AI Automation' },
    { skill: 'Generative AI', current: 70, predicted_1yr: 95, status: 'rising' },
    { skill: 'Cloud Native', current: 60, predicted_1yr: 85, status: 'rising' },
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'curriculum', label: 'Curriculum & Skills', icon: '📚' },
    { id: 'faculty', label: 'Faculty Control', icon: '👨‍🏫' },
    { id: 'students', label: 'Student Monitoring', icon: '🎓' },
    { id: 'timetable', label: 'Timetable Mgt', icon: '📅' },
    { id: 'approvals', label: 'Approvals', icon: '✅' },
    { id: 'trends', label: 'Predictive Trends', icon: '🔮' },
    { id: 'placements', label: 'Placement Hub', icon: '💼' },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8 relative">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">HOD Curriculum Management System 👨‍💼</h1>
        <p className="mt-2 text-slate-400">Manage department academics, faculty, students, and approvals.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-900/50 p-2 border border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 rounded-2xl px-6 py-4 text-sm font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard value="88%" label="Avg Pass Percentage" accent="text-emerald-400" />
              <StatCard value="92%" label="Placement Rate" accent="text-sky-400" />
              <StatCard value="24" label="Active Faculty" accent="text-amber-400" />
              <StatCard value="5" label="Pending Approvals" accent="text-rose-400" />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartBox title="Department Performance Trend" type="line" data={performanceData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              <ChartBox title="Subject-wise Results" type="bar" data={subjectResultsData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="card shadow-xl border-sky-500/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Syllabus & Subject Allocation</h2>
                  <p className="text-sm text-slate-400 mt-1">Manage current semester subjects and assign faculty.</p>
                </div>
                <button 
                  onClick={() => setShowAddSubjectModal(true)} 
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-sky-500/20 transition-colors flex items-center gap-2"
                >
                  <span>+</span> Add New Subject
                </button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {subjects.map((sub) => (
                  <div key={sub.id} className="rounded-xl border border-slate-700 bg-slate-900/50 p-5 hover:border-sky-500/50 transition-colors group">
                    <h3 className="font-bold text-sky-400 text-lg group-hover:text-sky-300 transition-colors">{sub.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded font-semibold">{sub.semester}</span>
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded font-semibold">{sub.credits}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                        <span className={`text-sm font-semibold ${sub.faculty === 'Unassigned' ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {sub.faculty === 'Unassigned' ? '⚠️ ' + sub.faculty : '👨‍🏫 ' + sub.faculty}
                        </span>
                        <button className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded transition-colors">Assign</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-amber-500/30 bg-amber-500/5 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⚠️</span>
                <h2 className="text-xl font-bold text-amber-400">Industry Skill Updates Needed</h2>
              </div>
              <p className="text-slate-300 text-sm mb-6 bg-slate-900/50 p-3 rounded-lg border border-slate-800">The following subjects require curriculum updates to meet 2026 industry standards based on Job Tracer analytics.</p>
              
              <div className="space-y-3">
                {industryUpdates.map((update) => (
                  <div key={update.id} className={`flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl border transition-all ${
                      update.resolved ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' : 'bg-slate-900/80 border-slate-700 hover:border-amber-500/50'
                  }`}>
                    <div>
                        <h4 className={`font-bold ${update.resolved ? 'text-emerald-400 line-through' : 'text-white'}`}>{update.subject}</h4>
                        <p className={`text-sm mt-1 ${update.resolved ? 'text-slate-500' : 'text-amber-400 font-medium'}`}>Required: {update.requirement}</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        {update.resolved ? (
                            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">✓ Resolved</span>
                        ) : (
                            <button onClick={() => resolveUpdate(update.id)} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/20">Mark as Implemented</button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ... Faculty, Students, Approvals tabs remain the same visually but are preserved below ... */}
        {activeTab === 'faculty' && (
          <div className="card">
            <h2 className="mb-6 text-2xl font-semibold text-white">Faculty Workload & Progress</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {facultyList.map((faculty) => (
                <div key={faculty.id} className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 relative overflow-hidden group hover:border-sky-500/50 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-xl font-bold text-white">{faculty.name}</h3>
                  <p className="text-sm text-sky-400 font-medium mb-4">{faculty.role}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Workload</span>
                      <span className="text-slate-200 font-medium">{faculty.workload}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Subjects</span>
                      <span className="text-slate-200 font-medium text-right">{faculty.subjects.join(', ')}</span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Teaching Progress</span>
                        <span className="text-emerald-400 font-bold">{faculty.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${faculty.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <button className="mt-5 w-full btn-outline !py-2 !text-sm">View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Department-wide Backlog Summary */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="card border-emerald-500/20 bg-emerald-500/5 shadow-lg">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">Clean Academic Record</h3>
                <p className="text-4xl font-black text-white">452 Students</p>
                <div className="mt-3 flex items-center justify-between">
                   <span className="text-xs text-slate-400">78% of Department</span>
                   <span className="text-xs font-bold text-emerald-400">+2.4% ↑</span>
                </div>
              </div>
              <div className="card border-amber-500/20 bg-amber-500/5 shadow-lg">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2">Active Arrears (1-2)</h3>
                <p className="text-4xl font-black text-white">84 Students</p>
                <div className="mt-3 flex items-center justify-between">
                   <span className="text-xs text-slate-400">15% of Department</span>
                   <span className="text-xs font-bold text-amber-400">-1.2% ↓</span>
                </div>
              </div>
              <div className="card border-rose-500/20 bg-rose-500/5 shadow-lg">
                <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-2">High Risk (3+)</h3>
                <p className="text-4xl font-black text-white">42 Students</p>
                <div className="mt-3 flex items-center justify-between">
                   <span className="text-xs text-slate-400">7% of Department</span>
                   <span className="text-xs font-bold text-rose-400">+0.5% ↑</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-white flex items-center gap-3">
                  <span className="h-10 w-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-xl">🎓</span>
                  Academic Monitoring Hub
                </h2>
                <div className="space-y-4">
                  <button className="w-full text-left p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-sky-500 transition-all flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                       <span className="text-2xl">📑</span>
                       <div>
                         <h3 className="font-bold text-slate-200 text-lg">Detailed Backlog Tracker</h3>
                         <p className="text-xs text-slate-400 mt-1">Search student by roll number to view individual backlog history.</p>
                       </div>
                    </div>
                    <span className="text-sky-400 group-hover:translate-x-1 transition-transform text-2xl">→</span>
                  </button>
                  <button className="w-full text-left p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-sky-500 transition-all flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                       <span className="text-2xl">📉</span>
                       <div>
                         <h3 className="font-bold text-slate-200 text-lg">Attendance Reports</h3>
                         <p className="text-xs text-slate-400 mt-1">View class-wise and student-wise attendance trends.</p>
                       </div>
                    </div>
                    <span className="text-sky-400 group-hover:translate-x-1 transition-transform text-2xl">→</span>
                  </button>
                  <button className="w-full text-left p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-sky-500 transition-all flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                       <span className="text-2xl">📊</span>
                       <div>
                         <h3 className="font-bold text-slate-200 text-lg">Internal Marks Analysis</h3>
                         <p className="text-xs text-slate-400 mt-1">Identify early performance dips in mid-term assessments.</p>
                       </div>
                    </div>
                    <span className="text-sky-400 group-hover:translate-x-1 transition-transform text-2xl">→</span>
                  </button>
                </div>
              </div>
              
              <div className="card border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-slate-900/50 relative overflow-hidden shadow-2xl">
                <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-3xl">🤖</div>
                  <h2 className="text-2xl font-black text-rose-400 tracking-tight">AI Risk Prediction</h2>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/20 mb-8 shadow-inner">
                   <p className="text-base text-slate-300 leading-relaxed">
                     <span className="font-black text-white uppercase tracking-wider text-xs bg-rose-500 px-2 py-0.5 rounded mr-2">Critical Warning</span> 
                     42 students in the department have crossed the threshold of <span className="text-rose-400 font-bold">3+ backlogs</span>. 
                   </p>
                   <p className="text-sm text-slate-400 mt-3">
                     Based on historical patterns, 65% of these students are at <span className="text-white font-bold underline">Extreme Risk</span> of academic detention this year.
                   </p>
                   <div className="mt-6 pt-4 border-t border-slate-800">
                     <p className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                       <span>💡</span> Recommended Action: Schedule Mandatory Remedial Classes
                     </p>
                   </div>
                </div>
                <button className="btn-secondary !w-full !bg-rose-500 !text-white hover:!bg-rose-600 border-none font-black py-5 rounded-2xl shadow-xl shadow-rose-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm">
                  Notify Parents & Schedule Remedials
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h2 className="mb-6 text-2xl font-semibold text-white flex items-center gap-2">
                Pending Approvals
                <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">{approvalsList.length}</span>
              </h2>
              <div className="space-y-4">
                {approvalsList.map((app) => (
                  <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div>
                      <h3 className="font-semibold text-white">{app.type}</h3>
                      <p className="text-sm text-slate-400 mt-1">{app.applicant} • <span className="text-sky-400">{app.date}</span></p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-bold transition-colors">Approve</button>
                      <button className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-xs font-bold transition-colors">Reject</button>
                    </div>
                  </div>
                ))}
                {approvalsList.length === 0 && <p className="text-slate-400 text-sm">No pending approvals.</p>}
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Department Activities</h2>
                <button className="btn-outline !py-1 !px-3 !text-xs">+ New Event</button>
              </div>
              <div className="space-y-6 border-l-2 border-slate-700 ml-3 pl-6 mt-4">
                {[
                  { title: 'AI Workshop', date: 'Next Week', type: 'Workshop', icon: '🤖' },
                  { title: 'TCS Industry Visit', date: 'In 2 Weeks', type: 'Industrial Visit', icon: '🏢' },
                  { title: 'Alumni Guest Lecture', date: 'Next Month', type: 'Seminar', icon: '🎤' },
                ].map((event, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[41px] -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm border-2 border-slate-700 shadow-lg">
                      {event.icon}
                    </span>
                    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 hover:border-sky-500/50 transition-colors">
                      <h4 className="font-bold text-white">{event.title}</h4>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-sky-400 font-medium px-2 py-1 rounded bg-sky-500/10">{event.type}</span>
                        <span className="text-slate-400 flex items-center gap-1">⏱️ {event.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TIMETABLE TAB */}
        {activeTab === 'timetable' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Department Timetable</h2>
                <button className="btn-primary !py-2 !text-xs">+ Generate Automated Schedule</button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <h3 className="font-bold text-sky-400 mb-4">Class Schedule (Theory)</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-300">CSE 3A: 9:00 AM - 4:00 PM</p>
                    <p className="text-sm text-slate-300">CSE 2B: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <h3 className="font-bold text-purple-400 mb-4">Laboratory Schedule</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-300">Lab 1: Web Dev (3rd Year)</p>
                    <p className="text-sm text-slate-300">Lab 2: DS (2nd Year)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PLACEMENTS TAB */}
        {activeTab === 'placements' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <StatCard value="92%" label="Current Placement Rate" accent="text-emerald-400" />
              <StatCard value="142" label="Students Placed" accent="text-sky-400" />
              <StatCard value="$85k" label="Avg Package" accent="text-purple-400" />
            </div>
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">Top Recruiters & Statistics</h2>
              <div className="grid gap-4">
                {['Google', 'Amazon', 'Microsoft', 'TCS', 'Infosys'].map((comp, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white">{comp}</span>
                    <span className="text-sm text-slate-400">Offers: {Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <PredictiveTrendCard trends={predictiveTrends} />
        )}
      </div>

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Subject</h2>
                <button onClick={() => setShowAddSubjectModal(false)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-1">Subject Name</label>
                <input 
                  type="text" 
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none" 
                  placeholder="e.g. Distributed Systems"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Semester</label>
                  <select 
                    value={newSubject.semester}
                    onChange={(e) => setNewSubject({...newSubject, semester: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none"
                    required
                  >
                    <option value="" disabled>Select</option>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={`Semester ${n}`}>Semester {n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Credits</label>
                  <select 
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject({...newSubject, credits: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none"
                    required
                  >
                    <option value="" disabled>Select</option>
                    {[1,2,3,4].map(n => <option key={n} value={`${n} Credits`}>{n} Credits</option>)}
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddSubjectModal(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-sky-500/20">Add Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default HODDashboard;
