import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function NavbarEnhanced() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleIcon = (role) => {
    const icons = { student: '👨‍🎓', faculty: '👨‍🏫', hod: '👨‍💼', admin: '⚙️' };
    return icons[role] || '👤';
  };

  const getRoleColor = (role) => {
    const colors = {
      student: 'text-blue-300',
      faculty: 'text-purple-300',
      hod: 'text-amber-300',
      admin: 'text-rose-300',
    };
    return colors[role] || 'text-slate-300';
  };

  const navLinks = user
    ? user.role === 'student'
      ? [
          { label: 'Dashboard', to: '/dashboard/student' },
          { label: 'My Roadmap', to: '/roadmap' },
          { label: 'Skills Gap', to: '/skills-gap' },
        ]
      : user.role === 'faculty'
        ? [
            { label: 'Dashboard', to: '/dashboard/faculty' },
            { label: 'Manage Subjects', to: '/manage-subjects' },
            { label: 'Upload Syllabus', to: '/upload-syllabus' },
          ]
        : user.role === 'hod'
          ? [
              { label: 'Dashboard', to: '/dashboard/hod' },
              { label: 'Department Analytics', to: '/department-analytics' },
              { label: 'Curriculum Planning', to: '/curriculum-planning' },
            ]
          : [
              { label: 'Dashboard', to: '/dashboard/admin' },
              { label: 'Users', to: '/manage-users' },
              { label: 'System Settings', to: '/settings' },
            ]
    : [];

  return (
    <header className="sticky top-0 z-20 glass border-b border-slate-800 shadow-lg shadow-slate-950/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 p-2">
            <span className="text-xl font-bold text-white">📚</span>
          </div>
          <div>
            <p className="text-sm font-bold text-sky-300">Curriculum</p>
            <p className="text-xs text-slate-500">Analytics</p>
          </div>
        </NavLink>

        {user && (
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-300 sm:gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition-all ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-semibold'
                      : 'hover:bg-slate-800 hover:text-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-lg">{getRoleIcon(user.role)}</span>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Logged in as</p>
                  <p className={`text-sm font-semibold capitalize ${getRoleColor(user.role)}`}>{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-500/30"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn-primary text-xs">
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavbarEnhanced;
