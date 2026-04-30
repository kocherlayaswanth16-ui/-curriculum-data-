import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AIChatbot from './AIChatbot.jsx';

function DashboardLayout({ children, role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = {
    student: [
      { id: 'overview', name: 'Dashboard', path: '/dashboard/student', icon: '👤' },
      { id: 'skills', name: 'Skills Analysis', path: '/dashboard/student?tab=career', icon: '📈' },
      { id: 'academics', name: 'Academic Record', path: '/dashboard/student?tab=academics', icon: '📝' },
      { id: 'sports', name: 'Sports Hub', path: '/dashboard/student?tab=activities', icon: '⚽' },
      { id: 'cultural', name: 'Cultural Events', path: '/dashboard/student?tab=activities', icon: '🎨' },
      { id: 'jobs', name: 'Career Portal', path: '/jobs', icon: '🚀' },
      { id: 'market', name: 'Market Intel', path: '/market-intelligence', icon: '💡' },
      { id: 'mentors', name: 'AI Mentorship', path: '/mentor-connect', icon: '🧠' },
      { id: 'leaderboard', name: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
      { id: 'prediction', name: 'Future Roles', path: '/career-prediction', icon: '✨' },
      { id: 'resume', name: 'Resume AI', path: '/resume-optimizer', icon: '📄' },
    ],
    faculty: [
      { id: 'overview', name: 'Faculty Dashboard', path: '/dashboard/faculty', icon: '📊' },
      { id: 'curriculum', name: 'Curriculum Planner', path: '/curriculum-planner', icon: '📝' },
      { id: 'syllabus', name: 'Syllabus Analysis', path: '/upload-syllabus', icon: '📂' },
      { id: 'students', name: 'Student Directory', path: '/student-lookup', icon: '🔍' },
    ],
    hod: [
      { id: 'overview', name: 'HOD Dashboard', path: '/dashboard/hod', icon: '🏛️' },
      { id: 'curriculum_planning', name: 'Curriculum Planner', path: '/curriculum-planner', icon: '🛠️' },
      { id: 'curriculum', name: 'Curriculum Flow', path: '/dashboard/hod?tab=curriculum', icon: '📋' },
      { id: 'analysis', name: 'Dept Analytics', path: '/dashboard/hod?tab=analysis', icon: '📈' },
      { id: 'syllabus', name: 'Syllabus Lab', path: '/upload-syllabus', icon: '⚙️' },
    ],
    admin: [
      { id: 'overview', name: 'System Overview', path: '/dashboard/admin', icon: '👑' },
      { id: 'users', name: 'User Management', icon: '👥', path: '/dashboard/admin?tab=users' },
      { id: 'events', name: 'Events & Alerts', icon: '🔔', path: '/dashboard/admin?tab=events' },
      { id: 'settings', name: 'System Settings', icon: '⚙️', path: '/dashboard/admin?tab=settings' },
      { id: 'ai', name: 'AI Strategy', icon: '💡', path: '/dashboard/admin?tab=ai-insights' },
    ]
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } transition-all duration-500 glass border-r border-white/5 flex flex-col z-40 sticky top-0 h-screen`}
      >
        <div className="p-6 flex items-center gap-4 border-b border-white/5">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-sky-500/20">
            🎓
          </div>
          {isSidebarOpen && (
            <span className="font-black text-lg tracking-tight whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-4">
              Smart<span className="text-sky-400">Portal</span>
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
          {currentMenu.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                location.pathname + location.search === item.path
                  ? 'bg-sky-500 text-slate-950 shadow-xl shadow-sky-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              {isSidebarOpen && (
                <span className="font-bold text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-4">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            to="/support"
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
              location.pathname === '/support'
                ? 'bg-slate-800 text-white shadow-xl'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🆘</span>
            {isSidebarOpen && <span className="text-sm font-bold">Support</span>}
          </Link>

          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold group`}
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
            {isSidebarOpen && <span className="text-sm">Sign Out</span>}
          </button>
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mt-4 w-full h-10 flex items-center justify-center rounded-xl bg-slate-900/50 text-slate-500 hover:text-white transition-colors"
          >
            {isSidebarOpen ? '← Collapse' : '→'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-300">
               {currentMenu.find(m => location.pathname + location.search === m.path)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
               <input type="text" placeholder="Search system..." className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-sm w-64 focus:border-sky-500 outline-none transition-all pl-10" />
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-xl relative cursor-pointer hover:bg-slate-800 transition-colors">
                  <span>🔔</span>
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full text-[10px] flex items-center justify-center font-black border-2 border-slate-950">3</span>
               </div>
               <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 p-0.5 cursor-pointer">
                  <div className="h-full w-full rounded-[0.55rem] bg-slate-950 flex items-center justify-center">👨‍🎓</div>
               </div>
            </div>
          </div>
        </header>

        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
        
        {/* Floating AI Mentor */}
        <AIChatbot />
      </main>
    </div>
  );
}

export default DashboardLayout;
