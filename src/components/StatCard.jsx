function StatCard({ value, label, accent }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/10">
      <p className={`text-4xl font-semibold ${accent} mb-2`}>{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export default StatCard;
