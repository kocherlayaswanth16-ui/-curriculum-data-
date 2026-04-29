import FeatureCard from '../components/FeatureCard.jsx';

const insights = [
  { title: 'Skill Gap Score', description: 'Your current syllabus matches 55% of trending job requirements.' },
  { title: 'Suggested new skills', description: 'Add Cloud DevOps, Data Engineering, AI Ethics, and Cybersecurity fundamentals.' },
  { title: 'Outdated topics', description: 'Legacy programming languages and older web frameworks should be reviewed.' },
];

function Analytics() {
  return (
    <section className="mx-auto max-w-7xl space-y-10 py-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h2 className="text-3xl font-semibold text-white">Curriculum Analytics</h2>
        <p className="mt-3 text-slate-300">Compare your syllabus against job trends and generate actionable recommendations.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Current matching</p>
            <p className="mt-4 text-5xl font-semibold text-white">55%</p>
            <p className="mt-3 text-slate-400">Syllabus vs market demand</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Future trend</p>
            <p className="mt-4 text-5xl font-semibold text-white">+32%</p>
            <p className="mt-3 text-slate-400">Rise in AI / Cloud roles</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-300">Gap reduction</p>
            <p className="mt-4 text-5xl font-semibold text-white">42%</p>
            <p className="mt-3 text-slate-400">Potential reduction with core updates</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {insights.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Analytics;
