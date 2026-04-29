import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Upload', to: '/upload' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Login', to: '/login' },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div>
          <span className="text-lg font-semibold text-sky-300">Curriculum Analytics</span>
          <p className="text-sm text-slate-400">Skill relevance engine for colleges</p>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive ? 'bg-sky-500 text-slate-950' : 'hover:bg-slate-800 hover:text-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
