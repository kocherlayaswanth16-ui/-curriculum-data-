function FeatureCard({ title, description }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-500 sm:p-7">
      <h3 className="mb-3 text-xl font-semibold text-slate-100">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </article>
  );
}

export default FeatureCard;
