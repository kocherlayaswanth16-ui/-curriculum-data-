import { useSearchParams } from 'react-router-dom';
import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';

// --- Mock Data ---
const relevanceData = {
  labels: ['Python', 'Web Dev', 'Databases', 'Cloud', 'AI/ML', 'DevOps'],
  datasets: [
    {
      label: 'Current Curriculum',
      data: [70, 65, 75, 40, 20, 10],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Industry Demand',
      data: [90, 85, 85, 90, 85, 80],
      backgroundColor: '#22c55e',
    },
  ],
};

const topicsChart = {
  labels: ['Web Tech', 'Databases', 'Programming', 'Cloud', 'AI/ML', 'Security'],
  datasets: [
    {
      data: [35, 20, 25, 10, 5, 5],
      backgroundColor: ['#38bdf8', '#0284c7', '#0369a1', '#075985', '#22c55e', '#ef4444'],
    },
  ],
};

const scheduleData = [
  { time: '09:00 AM', type: 'Lecture', subject: 'Data Structures', class: 'CSE 2A', room: 'Room 301' },
  { time: '10:00 AM', type: 'Lecture', subject: 'Web Development', class: 'CSE 3B', room: 'Room 304' },
  { time: '11:15 AM', type: 'Lab', subject: 'Database Systems Lab', class: 'CSE 2A', room: 'Lab 2' },
  { time: '02:00 PM', type: 'Meeting', subject: 'Curriculum Review', class: 'Faculty', room: 'Conf Room A' },
];

const interventionStudents = [
  { name: 'Rahul Sharma', id: '10293', subject: 'Data Structures', issue: 'Low Attendance (65%)', status: 'Action Needed' },
  { name: 'Priya Patel', id: '10295', subject: 'Web Development', issue: 'Failed Mid-term (35%)', status: 'Remedial Scheduled' },
  { name: 'Arjun Kumar', id: '10301', subject: 'Database Systems', issue: 'Missing Assignments', status: 'Action Needed' },
];

function FacultyDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'subjects', label: 'My Subjects', icon: '📖' },
    { id: 'attendance', label: 'Attendance', icon: '📝' },
    { id: 'marks', label: 'Marks & Evaluation', icon: '🏆' },
    { id: 'assignments', label: 'Assignments', icon: '📁' },
    { id: 'interaction', label: 'Interaction', icon: '💬' },
    { id: 'activities', label: 'Activities', icon: '🏅' },
    { id: 'syllabus', label: 'AI Syllabus Updater', icon: '🤖' },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="gradient-text text-4xl font-bold">Advanced Faculty Portal 👨‍🏫</h1>
          <p className="mt-2 text-slate-400">Manage syllabi, track student progress, and monitor your daily schedule.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <span>📤</span> Upload New Syllabus
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-900/50 p-2 border border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchParams({ tab: tab.id });
            }}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all min-w-[150px] flex items-center justify-center gap-2 ${
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
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard value="3" label="Subjects Taught" accent="text-sky-400" />
              <StatCard value="72%" label="Avg Relevance Score" accent="text-emerald-400" />
              <StatCard value="5" label="Outdated Topics" accent="text-amber-400" />
              <StatCard value="12" label="Industry Gaps" accent="text-rose-400" />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartBox title="Curriculum vs Industry Skills" type="bar" data={relevanceData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              <ChartBox title="Topic Distribution" type="pie" data={topicsChart} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
            </div>
          </div>
        )}

        {/* SUBJECTS TAB */}
        {activeTab === 'subjects' && (
          <div className="grid gap-6 md:grid-cols-2">
            {['Data Structures', 'Web Development', 'Operating Systems'].map((sub, i) => (
              <div key={i} className="card group hover:border-sky-500/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{sub}</h3>
                    <p className="text-slate-400">Class: CSE 3rd Year • Section A</p>
                  </div>
                  <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-lg text-xs font-bold">Active</span>
                </div>
                <div className="space-y-4">
                  <button className="w-full btn-outline !py-2.5 !text-sm flex items-center justify-center gap-2"><span>📂</span> View Syllabus</button>
                  <button className="w-full btn-outline !py-2.5 !text-sm flex items-center justify-center gap-2"><span>📝</span> View Lesson Plan</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <div className="card">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Mark Attendance</h2>
              <div className="flex gap-4">
                <select className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none">
                  <option>Data Structures</option>
                  <option>Web Dev</option>
                </select>
                <button className="btn-primary !py-2 !px-6">Submit Report</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 text-left">Student</th>
                    <th className="px-6 py-4 text-center">Current %</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {['Yaswanth', 'Jaipal', 'Yogesh', 'Balaji', 'Satish'].map((name, i) => (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{name}</td>
                      <td className="px-6 py-4 text-center text-emerald-400 font-bold">92%</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs">PRESENT</button>
                          <button className="px-4 py-1.5 rounded-lg bg-slate-800 text-rose-400 font-bold text-xs">ABSENT</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MARKS TAB */}
        {activeTab === 'marks' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Enter Marks & Evaluation</h2>
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Assessment Type</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  <option>Mid-Term 1</option>
                  <option>Mid-Term 2</option>
                  <option>Internal Assessment</option>
                </select>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Subject</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  <option>Data Structures</option>
                  <option>Web Development</option>
                </select>
              </div>
              <button className="btn-primary flex items-center justify-center gap-2"><span>💾</span> Bulk Upload CSV</button>
            </div>
            <div className="space-y-3">
              {['Yaswanth', 'Jaipal', 'Yogesh', 'Balaji', 'Satish'].map((name, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-white">{name}</span>
                  <input type="number" placeholder="Marks" className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-center" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ASSIGNMENTS TAB */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="card border-sky-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Assignment</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <input className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white" placeholder="Assignment Title" />
                <input className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white" type="date" />
                <textarea className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white h-32" placeholder="Instructions..."></textarea>
                <button className="btn-primary !w-full">Post Assignment</button>
                <button className="btn-outline !w-full">Attach Materials (PDF/Video)</button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTION TAB */}
        {activeTab === 'interaction' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">Announcements</h2>
              <textarea className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white mb-4 h-32" placeholder="Send update to students..."></textarea>
              <button className="btn-primary !w-full">Broadcast Notice</button>
            </div>
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">Student Queries</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <p className="font-bold text-sky-400 text-sm">Yaswanth:</p>
                  <p className="text-sm text-slate-300 mt-1">Sir, when is the deadline for the React project?</p>
                  <button className="mt-3 text-xs font-bold text-white bg-sky-600 px-3 py-1 rounded">Reply</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === 'activities' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Extracurricular Tracking</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <h3 className="text-lg font-bold text-amber-400 mb-4">🏆 Sports Participation</h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-300">Balaji - Cricket Team Selection</p>
                  <p className="text-sm text-slate-300">Satish - Football Tournament</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                <h3 className="text-lg font-bold text-purple-400 mb-4">🎭 Cultural & Workshops</h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-300">Yogesh - Tech Workshop (AIoT)</p>
                  <p className="text-sm text-slate-300">Jaipal - Drama Club Lead</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default FacultyDashboard;
