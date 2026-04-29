import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-xl shadow-slate-950/20">
        <h1 className="text-6xl font-bold text-slate-100">404</h1>
        <p className="mt-4 text-xl text-slate-300">Page not found</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
