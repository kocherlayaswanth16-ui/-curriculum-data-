import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  return (
    <section className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="text-3xl font-semibold text-white">Sign in to your dashboard</h2>
      <p className="mt-2 text-slate-400">Use your faculty, student, or admin credentials to access reports.</p>
      <form className="mt-8 space-y-6">
        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500"
            placeholder="you@example.com"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Password
          <input
            type="password"
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500"
            placeholder="Enter password"
          />
        </label>
        <button className="w-full rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
          Sign in
        </button>
      </form>
    </section>
  );
}

export default Login;
