import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginEnhanced() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    setTimeout(() => navigate(`/dashboard/${role}`), 600);
  };

  const roleOptions = [
    { value: 'student', label: 'Student', icon: '👨‍🎓' },
    { value: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { value: 'hod', label: 'HOD', icon: '👨‍💼' },
    { value: 'admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-sky-500/20">
          <div className="mb-8 text-center">
            <h1 className="gradient-text text-4xl font-bold">Curriculum</h1>
            <p className="mt-2 text-slate-400">Analytics Engine</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Select Your Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={`rounded-xl border-2 p-3 text-center transition-all ${
                      role === opt.value
                        ? 'border-sky-500 bg-sky-500/15 text-sky-300'
                        : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <p className="mt-1 text-xs font-semibold">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Demo credentials: Use any email + password
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginEnhanced;
