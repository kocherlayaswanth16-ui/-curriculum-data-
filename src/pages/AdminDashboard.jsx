import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';
import PredictiveTrendCard from '../components/PredictiveTrendCard.jsx';
import GamificationCard from '../components/GamificationCard.jsx';

const performanceData = {
  labels: ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT'],
  datasets: [
    {
      label: 'Avg Pass Percentage',
      data: [88, 82, 75, 78, 85],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Placement Rate',
      data: [92, 85, 60, 55, 88],
      backgroundColor: '#10b981',
    }
  ],
};

const eventParticipationData = {
  labels: ['Sports', 'Cultural', 'Workshops', 'Hackathons'],
  datasets: [
    {
      data: [450, 300, 600, 250],
      backgroundColor: ['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8'],
    },
  ],
};

const systemPredictiveTrends = [
  { skill: 'Generative AI', current: 75, predicted_1yr: 98, status: 'rising' },
  { skill: 'Rust', current: 40, predicted_1yr: 75, status: 'rising' },
  { skill: 'PHP (Legacy)', current: 35, predicted_1yr: 15, status: 'declining', replacement: 'Next.js' },
  { skill: 'Manual QA', current: 50, predicted_1yr: 20, status: 'declining', replacement: 'AI Agents' },
];

function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // --- Users State ---
  const [users, setUsers] = useState([
    { id: 1, name: 'Ramesh Kumar', role: 'Student', dept: 'CSE', status: 'Active' },
    { id: 2, name: 'Dr. Alan Turing', role: 'Faculty', dept: 'CSE', status: 'Active' },
    { id: 3, name: 'Dr. Sarah Connor', role: 'HOD', dept: 'IT', status: 'Active' },
    { id: 4, name: 'John Doe', role: 'Accountant', dept: 'Admin', status: 'Active' },
    { id: 5, name: 'Priya Patel', role: 'Student', dept: 'IT', status: 'Suspended' },
  ]);

  // --- System Settings State ---
  const [settings, setSettings] = useState({
    academic: {
      semesters: 8,
      grading: 'CGPA',
      passMark: 40,
    },
    curriculum: {
      academic: true,
      sports: true,
      cultural: true,
      aiInsights: true,
    },
    notifications: {
      email: true,
      push: true,
      exams: true,
      results: true,
      events: false,
    },
    security: {
      twoFactor: false,
      minPasswordLength: 8,
      auditLog: true,
    },
    ui: {
      darkMode: true,
      compactLayout: false,
    }
  });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'overview', name: 'Smart Dashboard', icon: '📈' },
    { id: 'users', name: 'User Management', icon: '👤' },
    { id: 'departments', name: 'Departments', icon: '🏢' },
    { id: 'events', name: 'Events & Alerts', icon: '🔔' },
    { id: 'settings', name: 'System Settings', icon: '🛠️' },
    { id: 'ai-insights', name: 'AI Strategy', icon: '💡' },
  ];

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="glass rounded-[2.5rem] p-10 relative overflow-hidden bg-gradient-to-br from-slate-900 to-rose-900/10 border-rose-500/10 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-rose-500/10 blur-[100px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="gradient-text text-5xl font-black tracking-tight">Super Admin Portal 👑</h1>
            <p className="mt-3 text-slate-300 text-lg font-medium">Configure, control, and manage system-wide settings dynamically.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-rose-500/30 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">💾 Save All Changes</button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-8 py-4 rounded-2xl font-black text-sm border border-slate-700 transition-all uppercase tracking-widest">🔄 Reset Defaults</button>
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
                ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/30 scale-[1.02]'
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
              <StatCard value="2,450" label="Active Students" accent="text-sky-400" />
              <StatCard value="94%" label="Attendance" accent="text-emerald-400" />
              <StatCard value="82%" label="Placement" accent="text-amber-400" />
              <StatCard value="15" label="Pending Approvals" accent="text-rose-400" />
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartBox title="Department Analysis" type="bar" data={performanceData} />
              <div className="space-y-6">
                <GamificationCard stats={{ points: '850K', level: 'System Avg: 4', streak: 'Avg: 3', badges: ['top_college', 'innovation_hub'] }} />
                <ChartBox title="Event Engagement" type="doughnut" data={eventParticipationData} />
              </div>
            </div>

            <div className="card border-rose-500/20 bg-rose-500/5 p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-3xl">📜</div>
                    <div>
                        <h3 className="text-2xl font-black text-white">System Audit Log</h3>
                        <p className="text-slate-400 text-sm">Real-time tracking of administrative changes.</p>
                    </div>
                </div>
                <div className="space-y-3">
                    {[
                        { action: 'Updated Grading System', user: 'Admin', time: '5 mins ago', status: 'Success' },
                        { action: 'Disabled Sports Module', user: 'Admin', time: '1 hour ago', status: 'Warning' },
                        { action: 'User "Priya Patel" Suspended', user: 'Admin', time: '2 hours ago', status: 'Info' },
                    ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                            <div className="flex gap-4 items-center">
                                <span className={`h-2 w-2 rounded-full ${log.status === 'Success' ? 'bg-emerald-500' : log.status === 'Warning' ? 'bg-amber-500' : 'bg-sky-500'}`}></span>
                                <p className="font-bold text-slate-200">{log.action}</p>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{log.time} • BY {log.user}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-8">
            <div className="card shadow-2xl border-sky-500/20 bg-slate-900/50">
                <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-white">User Directory</h2>
                    <p className="text-sm text-slate-400 mt-2">Manage Student, Faculty, and HOD accounts campus-wide.</p>
                  </div>
                  <div className="flex gap-4 w-full lg:w-auto">
                      <div className="relative flex-1 lg:w-64">
                          <input type="text" placeholder="Search..." className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:border-sky-500 outline-none transition-all pl-12" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                      </div>
                      <button className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest">+ Add User</button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-[2rem] border border-slate-800">
                    <table className="w-full text-left bg-slate-950/40">
                        <thead>
                            <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-900/80 border-b border-slate-800">
                                <th className="py-5 px-8">User Details</th>
                                <th className="py-5 px-6">Role</th>
                                <th className="py-5 px-6">Department</th>
                                <th className="py-5 px-6">Status</th>
                                <th className="py-5 px-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="py-5 px-8"><p className="font-bold text-white">{user.name}</p></td>
                                    <td className="py-5 px-6"><span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-slate-800 text-slate-400">{user.role}</span></td>
                                    <td className="py-5 px-6 font-bold text-slate-400">{user.dept}</td>
                                    <td className="py-5 px-6"><span className={`text-[10px] font-bold ${user.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}`}>{user.status}</span></td>
                                    <td className="py-5 px-8 text-right">
                                        <button className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-sky-400 transition-colors border border-slate-700">✏️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-8">
            <div className="card shadow-2xl border-purple-500/20 bg-slate-900/50">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white">Department Management</h2>
                <button className="bg-purple-500 hover:bg-purple-400 text-slate-950 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest">+ Create Department</button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {['Computer Science (CSE)', 'Electronics (ECE)', 'Information Tech (IT)', 'Mechanical (MECH)'].map((dept, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all">
                    <h3 className="text-xl font-bold text-white mb-2">{dept}</h3>
                    <p className="text-sm text-slate-400">HOD: Dr. Alan Turing</p>
                    <p className="text-sm text-slate-400">Faculty Count: {12 + i * 2}</p>
                    <button className="mt-6 w-full btn-outline !py-2 !text-xs">Manage Courses & Faculty</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'events' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card shadow-2xl border-sky-500/20 bg-slate-950/40">
                <h3 className="text-2xl font-black text-white mb-8">Activity Approvals</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Inter-College Cricket', type: 'Sports', requester: 'Coach John' },
                        { title: 'AI & Web3 Hackathon', type: 'Academic', requester: 'Dr. Turing' },
                    ].map((ev, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                            <h4 className="font-bold text-white text-xl mb-2">{ev.title}</h4>
                            <p className="text-sm text-slate-400 mb-6">Requested by: {ev.requester} • Type: {ev.type}</p>
                            <div className="flex gap-3">
                                <button className="flex-1 bg-emerald-500 text-slate-950 font-black py-3 rounded-2xl text-xs uppercase tracking-widest">Approve</button>
                                <button className="flex-1 bg-slate-800 text-rose-400 font-black py-3 rounded-2xl text-xs uppercase tracking-widest">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card shadow-2xl border-rose-500/20 bg-slate-950/40">
                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><span>🔔</span> Dispatch Alerts</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Target Role</label>
                        <select className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-rose-500 outline-none">
                            <option>All Users</option>
                            <option>Students Only</option>
                            <option>Faculty Only</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Message Body</label>
                        <textarea rows="5" className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-rose-500 outline-none"></textarea>
                    </div>
                    <button className="w-full bg-rose-500 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm">🚀 Send Notification</button>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Academic & Curriculum Settings */}
                <div className="space-y-8">
                    <div className="card border-sky-500/20 bg-slate-900/50">
                        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><span>🏫</span> Academic Rules</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-200">Total Semesters</p>
                                    <p className="text-xs text-slate-500">Standard course duration</p>
                                </div>
                                <select className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white font-bold" value={settings.academic.semesters} onChange={(e) => setSettings({...settings, academic: {...settings.academic, semesters: parseInt(e.target.value)}})}>
                                    {[2, 4, 6, 8, 10].map(n => <option key={n} value={n}>{n} Semesters</option>)}
                                </select>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                                <div>
                                    <p className="font-bold text-slate-200">Grading System</p>
                                    <p className="text-xs text-slate-500">Method for final results</p>
                                </div>
                                <div className="flex gap-2">
                                    {['CGPA', 'Percentage', 'Grade'].map(m => (
                                        <button key={m} onClick={() => setSettings({...settings, academic: {...settings.academic, grading: m}})} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${settings.academic.grading === m ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>{m}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                                <div>
                                    <p className="font-bold text-slate-200">Pass Mark Threshold</p>
                                    <p className="text-xs text-slate-500">Minimum to clear subject</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input type="range" min="30" max="60" value={settings.academic.passMark} onChange={(e) => setSettings({...settings, academic: {...settings.academic, passMark: parseInt(e.target.value)}})} className="w-32 accent-sky-500" />
                                    <span className="text-xl font-black text-sky-400">{settings.academic.passMark}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-purple-500/20 bg-slate-900/50">
                        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><span>🧩</span> Module Permissions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: 'academic', label: 'Academic Curriculum', icon: '📚' },
                                { id: 'sports', label: 'Sports Module', icon: '🏅' },
                                { id: 'cultural', label: 'Cultural Module', icon: '🎭' },
                                { id: 'aiInsights', label: 'AI Strategy Module', icon: '🤖' },
                            ].map(mod => (
                                <button key={mod.id} onClick={() => handleToggle('curriculum', mod.id)} className={`p-5 rounded-3xl border transition-all flex flex-col items-center gap-3 ${settings.curriculum[mod.id] ? 'bg-purple-500/10 border-purple-500 text-white shadow-lg shadow-purple-500/10' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                                    <span className="text-3xl">{mod.icon}</span>
                                    <p className="text-xs font-black uppercase tracking-widest">{mod.label}</p>
                                    <span className={`text-[10px] font-bold ${settings.curriculum[mod.id] ? 'text-emerald-400' : 'text-rose-500'}`}>{settings.curriculum[mod.id] ? 'ENABLED' : 'DISABLED'}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Security & Notification Settings */}
                <div className="space-y-8">
                    <div className="card border-rose-500/20 bg-slate-900/50">
                        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><span>🛡️</span> Security & Data</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-200">Two-Factor Authentication (OTP)</p>
                                    <p className="text-xs text-slate-500">Require mobile verification for logins</p>
                                </div>
                                <button onClick={() => handleToggle('security', 'twoFactor')} className={`w-14 h-8 rounded-full relative transition-all ${settings.security.twoFactor ? 'bg-rose-500' : 'bg-slate-800'}`}>
                                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${settings.security.twoFactor ? 'right-1' : 'left-1'}`}></div>
                                </button>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                                <div>
                                    <p className="font-bold text-slate-200">System Audit Logging</p>
                                    <p className="text-xs text-slate-500">Track all administrative actions</p>
                                </div>
                                <button onClick={() => handleToggle('security', 'auditLog')} className={`w-14 h-8 rounded-full relative transition-all ${settings.security.auditLog ? 'bg-rose-500' : 'bg-slate-800'}`}>
                                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${settings.security.auditLog ? 'right-1' : 'left-1'}`}></div>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                                <button className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-slate-950 transition-all">☁️ Auto-Backup</button>
                                <button className="bg-sky-500/10 border border-sky-500/30 text-sky-400 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-sky-500 hover:text-slate-950 transition-all">📂 Restore Data</button>
                            </div>
                        </div>
                    </div>

                    <div className="card border-amber-500/20 bg-slate-900/50">
                        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3"><span>🔔</span> Notification Channels</h3>
                        <div className="space-y-6">
                            {Object.entries(settings.notifications).map(([key, val]) => (
                                <div key={key} className="flex items-center justify-between border-b border-slate-800/50 pb-4 last:border-0 last:pb-0">
                                    <p className="font-bold text-slate-200 uppercase text-xs tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <button onClick={() => handleToggle('notifications', key)} className={`w-12 h-6 rounded-full relative transition-all ${val ? 'bg-amber-500' : 'bg-slate-800'}`}>
                                        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${val ? 'right-0.5' : 'left-0.5'}`}></div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Integration Settings */}
            <div className="card border-emerald-500/20 bg-slate-900/50">
                <h3 className="text-2xl font-black text-white mb-8">Third-Party Integrations</h3>
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { name: 'Job Tracer API', status: 'Connected', color: 'text-emerald-400', icon: '💼' },
                        { name: 'AWS Cloud Services', status: 'Active', color: 'text-sky-400', icon: '☁️' },
                        { name: 'SMTP Email Service', status: 'Standby', color: 'text-amber-400', icon: '📧' },
                    ].map((api, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800 flex items-center justify-between group hover:border-white/20 transition-all">
                            <div className="flex gap-4 items-center">
                                <span className="text-3xl group-hover:scale-110 transition-transform">{api.icon}</span>
                                <div>
                                    <p className="font-bold text-white">{api.name}</p>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${api.color}`}>{api.status}</p>
                                </div>
                            </div>
                            <button className="text-slate-600 hover:text-white transition-colors">⚙️</button>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-insights' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card border-purple-500/30 bg-purple-500/5 p-8 shadow-2xl">
                <h3 className="text-2xl font-black text-purple-400 mb-8 flex items-center gap-3"><span>🧠</span> AI Strategy Center</h3>
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-500 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors">Curriculum Evolution: AIoT</h4>
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">Strategic</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">System predicts 200% growth in AIoT sector by Q4 2026. Suggesting integration into 3rd Year electronics curriculum.</p>
                        <button className="mt-6 w-full py-3 rounded-2xl bg-purple-500 text-slate-950 font-black uppercase tracking-widest text-xs shadow-lg shadow-purple-500/20">Analyze Impact Matrix</button>
                    </div>
                </div>
                
                <div className="mt-8">
                    <PredictiveTrendCard trends={systemPredictiveTrends} />
                </div>
            </div>

            <div className="card shadow-2xl border-sky-500/20 bg-slate-950/40 p-8">
                <h3 className="text-2xl font-black text-sky-400 mb-8 flex items-center gap-3"><span>🗣️</span> Sentiment Hub</h3>
                <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                        <h4 className="font-black text-white text-lg mb-4">Course Feedback Sentiment</h4>
                        <div className="space-y-3">
                            <p className="text-sm text-slate-400 italic">"Highly positive (88%) response to new Python labs, but students request more focus on DevOps tools."</p>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '88%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center pt-20 pb-20">
          <p className="text-slate-700 font-black text-[12px] uppercase tracking-[0.5em]">System Governance Protocol • 2026 Core Infrastructure</p>
      </div>
    </section>
  );
}

export default AdminDashboard;
