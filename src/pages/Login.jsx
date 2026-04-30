import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const [email, setEmail] = useState('kocherlayaswanth16@gmail.com');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <section className="mx-auto max-w-md mt-20 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="text-3xl font-semibold text-white text-center">Sign in to your dashboard</h2>
      <p className="mt-2 text-slate-400 text-center">Use your credentials to access the portal.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm text-slate-300">
          Select Role
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500"
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="hod">HOD</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="block text-sm text-slate-300">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500"
            placeholder="Enter password"
            required
          />
        </label>
        <button type="submit" className="w-full rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
          Sign in
        </button>
      </form>
    </section>
  );
}

export default Login;
