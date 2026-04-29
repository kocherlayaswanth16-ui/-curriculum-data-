import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';

const departmentComparisonData = {
  labels: ['CSE', 'ECE', 'Mechanical', 'Civil'],
  datasets: [
    {
      label: 'Avg Curriculum Relevance %',
      data: [72, 65, 58, 52],
      backgroundColor: ['#38bdf8', '#0284c7', '#0369a1', '#075985'],
    },
  ],
};

const skillTrendData = {
  labels: ['AI/ML', 'Cloud', 'DevOps', 'Blockchain', 'IoT', 'Cybersecurity'],
  datasets: [
    {
      label: 'Industry Growth %',
      data: [45, 38, 35, 22, 28, 32],
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

function HODDashboard() {
  const departments = [
    { name: 'Computer Science', relevance: 72, students: 450, faculty: 25, outdated: 8 },
    { name: 'Electronics', relevance: 65, students: 380, faculty: 18, outdated: 12 },
    { name: 'Mechanical', relevance: 58, students: 420, faculty: 22, outdated: 15 },
    { name: 'Civil', relevance: 52, students: 390, faculty: 20, outdated: 18 },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">Department Head Portal 👨‍💼</h1>
        <p className="mt-2 text-slate-400">Manage curriculum across your entire department</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="4" label="Total Departments" accent="text-sky-400" />
        <StatCard value="65%" label="Avg Curriculum Match" accent="text-emerald-400" />
        <StatCard value="1,640" label="Total Students" accent="text-amber-400" />
        <StatCard value="53" label="Outdated Topics" accent="text-rose-400" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartBox
          title="Department Comparison"
          type="bar"
          data={departmentComparisonData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } },
          }}
        />
        <ChartBox
          title="Industry Skill Trends"
          type="line"
          data={skillTrendData}
          options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
        />
      </div>

      {/* Department Overview */}
      <div className="card">
        <h2 className="mb-6 text-2xl font-semibold text-white">Department Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700">
              <tr className="text-slate-400">
                <th className="px-4 py-3 text-left font-semibold">Department</th>
                <th className="px-4 py-3 text-left font-semibold">Relevance Score</th>
                <th className="px-4 py-3 text-left font-semibold">Students</th>
                <th className="px-4 py-3 text-left font-semibold">Faculty</th>
                <th className="px-4 py-3 text-left font-semibold">Outdated Topics</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {departments.map((dept) => (
                <tr key={dept.name} className="hover:bg-slate-900/40 transition-all">
                  <td className="px-4 py-4 text-white font-medium">{dept.name}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-16">
                        <div className="progress-fill" style={{ width: `${dept.relevance}%` }} />
                      </div>
                      <span className={dept.relevance >= 70 ? 'text-emerald-400' : 'text-amber-400'}>
                        {dept.relevance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{dept.students}</td>
                  <td className="px-4 py-4 text-slate-300">{dept.faculty}</td>
                  <td className="px-4 py-4">
                    <span className="badge-warning">{dept.outdated} topics</span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-sky-400 hover:text-sky-300 font-semibold text-sm">View Details →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2 className="mb-6 text-2xl font-semibold text-white">Department-wide Recommendations</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border-l-4 border-rose-500 bg-rose-500/10 p-5">
            <h3 className="font-semibold text-white">Priority 1: Update Cloud Computing</h3>
            <p className="mt-2 text-sm text-slate-300">
              Add AWS, Azure, and GCP to all 2nd year curriculum. Affects 2 departments.
            </p>
            <button className="mt-3 text-sm font-semibold text-rose-400 hover:text-rose-300">
              Start Planning →
            </button>
          </div>
          <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-500/10 p-5">
            <h3 className="font-semibold text-white">Priority 2: AI/ML Integration</h3>
            <p className="mt-2 text-sm text-slate-300">
              Introduce AI fundamentals in 1st year. Timeline: Next academic year.
            </p>
            <button className="mt-3 text-sm font-semibold text-amber-400 hover:text-amber-300">
              View Plan →
            </button>
          </div>
          <div className="rounded-2xl border-l-4 border-sky-500 bg-sky-500/10 p-5">
            <h3 className="font-semibold text-white">Priority 3: DevOps & Docker</h3>
            <p className="mt-2 text-sm text-slate-300">
              Add containerization concepts to software engineering courses.
            </p>
            <button className="mt-3 text-sm font-semibold text-sky-400 hover:text-sky-300">
              Explore →
            </button>
          </div>
          <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-500/10 p-5">
            <h3 className="font-semibold text-white">Priority 4: Data Science</h3>
            <p className="mt-2 text-sm text-slate-300">
              Expand data analytics in computer science curriculum.
            </p>
            <button className="mt-3 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HODDashboard;
