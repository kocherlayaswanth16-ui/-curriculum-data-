import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';

function LoginEnhanced() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('any@email.com');
  const [password, setPassword] = useState('any');
  const [role, setRole] = useState('student');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuto = searchParams.get('auto') === 'true';
    const paramRole = searchParams.get('role');
    
    if (paramRole) {
      setRole(paramRole);
    }

    if (isAuto) {
      setEmail('kocherlayaswanth16@gmail.com');
      setPassword('demo123'); // Providing a demo password
      // Use setTimeout to ensure state updates before submit
      setTimeout(() => {
        handleSubmit({ preventDefault: () => {} });
      }, 100);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    
    // Redirect based on role
    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'hod') navigate('/dashboard/hod');
    else if (role === 'faculty') navigate('/dashboard/faculty');
    else navigate('/dashboard/student');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-white/10 relative overflow-hidden">
          {/* Top Branding */}
          <div className="text-center mb-10">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 p-1 shadow-xl shadow-sky-500/20 mb-6">
              <div className="flex h-full w-full items-center justify-center rounded-[1.4rem] bg-slate-950 text-4xl">🎓</div>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 mt-2 text-sm">Smart Curriculum & Job Market Insight Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 text-white outline-none transition-all focus:border-sky-500 focus:bg-slate-900/80 pl-12"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-500 transition-colors">✉️</span>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Password</label>
                <Link to="#" className="text-[10px] font-bold text-sky-500 hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 text-white outline-none transition-all focus:border-sky-500 focus:bg-slate-900/80 pl-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-500 transition-colors">🔒</span>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Login As</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'student', label: 'Student', icon: '👨‍🎓' },
                  { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
                  { id: 'hod', label: 'HOD', icon: '🏛️' },
                  { id: 'admin', label: 'Admin', icon: '👑' }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${
                      role === r.id 
                      ? 'bg-sky-500/10 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/10' 
                      : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <span>{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 ml-1">
                <button 
                  type="button" 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${rememberMe ? 'bg-sky-500 border-sky-500' : 'bg-slate-900 border-slate-700'}`}
                >
                    {rememberMe && <span className="text-slate-950 text-[10px] font-black">✓</span>}
                </button>
                <span className="text-xs font-bold text-slate-400">Remember me on this device</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-slate-950 font-black py-5 rounded-2xl shadow-xl shadow-sky-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] text-sm mt-4"
            >
              Sign In to Portal
            </button>

            {/* Demo Credentials Hint */}
            <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Demo Credentials</p>
              <div className="inline-flex gap-4 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/5">
                <span>user: any@email.com</span>
                <span className="opacity-30">|</span>
                <span>pass: any</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginEnhanced;
