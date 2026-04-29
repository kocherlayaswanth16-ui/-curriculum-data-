import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Emerging Skills Demand',
      data: [35, 42, 50, 60, 68, 74],
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.15)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const barData = {
  labels: ['Python', 'AI', 'Cloud', 'Cybersecurity', 'Data Science'],
  datasets: [
    {
      label: 'Skill relevance score',
      data: [82, 78, 74, 63, 69],
      backgroundColor: ['#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985'],
    },
  ],
};

const pieData = {
  labels: ['Outdated', 'Relevant', 'Emerging'],
  datasets: [
    {
      data: [22, 48, 30],
      backgroundColor: ['#0f172a', '#2563eb', '#22c55e'],
    },
  ],
};

function Dashboard() {
  return (
    <section className="mx-auto max-w-7xl space-y-10 py-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <StatCard value="18" label="Outdated subjects" accent="text-rose-400" />
        <StatCard value="65" label="Industry alignment" accent="text-sky-400" />
        <StatCard value="9" label="New skills to add" accent="text-emerald-400" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <ChartBox title="Skill Trend Prediction" type="line" data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        <ChartBox title="Curriculum Relevance Breakdown" type="pie" data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="mb-4 text-xl font-semibold text-white">Recommended focus areas</h3>
          <ul className="space-y-4 text-slate-300">
            <li className="rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-4">Generative AI integration in project-based courses</li>
            <li className="rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-4">Cloud-native architecture and DevOps automation</li>
            <li className="rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-4">Data analytics and skill-based assessments</li>
          </ul>
        </div>
        <ChartBox title="Top skill relevance" type="bar" data={barData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } }} />
      </div>
    </section>
  );
}

export default Dashboard;
