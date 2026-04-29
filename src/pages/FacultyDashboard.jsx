import { useState } from 'react';
import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';

const relevanceData = {
  labels: ['Python', 'Web Dev', 'Databases', 'Cloud', 'AI/ML', 'DevOps'],
  datasets: [
    {
      label: 'Current Curriculum',
      data: [70, 65, 75, 40, 20, 10],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Industry Demand',
      data: [90, 85, 85, 90, 85, 80],
      backgroundColor: '#22c55e',
    },
  ],
};

const topicsChart = {
  labels: ['Web Tech', 'Databases', 'Programming', 'Cloud', 'AI/ML', 'Security'],
  datasets: [
    {
      data: [35, 20, 25, 10, 5, 5],
      backgroundColor: ['#38bdf8', '#0284c7', '#0369a1', '#075985', '#22c55e', '#ef4444'],
    },
  ],
};

function FacultyDashboard() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Data Structures',
      year: '1st',
      semester: '2',
      relevance: 78,
      lastUpdated: '6 months ago',
    },
    {
      id: 2,
      name: 'Web Development',
      year: '2nd',
      semester: '3',
      relevance: 65,
      lastUpdated: '1 year ago',
    },
    {
      id: 3,
      name: 'Database Systems',
      year: '2nd',
      semester: '4',
      relevance: 72,
      lastUpdated: '8 months ago',
    },
  ]);

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">Faculty Portal 👨‍🏫</h1>
        <p className="mt-2 text-slate-400">Manage syllabi, upload resources, and track curriculum relevance</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="3" label="Subjects Taught" accent="text-sky-400" />
        <StatCard value="72%" label="Avg Relevance Score" accent="text-emerald-400" />
        <StatCard value="5" label="Outdated Topics" accent="text-amber-400" />
        <StatCard value="12" label="Industry Gaps" accent="text-rose-400" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartBox
          title="Curriculum vs Industry Skills"
          type="bar"
          data={relevanceData}
          options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, max: 100 } },
          }}
        />
        <ChartBox
          title="Topic Distribution"
          type="pie"
          data={topicsChart}
          options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
        />
      </div>

      {/* Manage Subjects */}
      <div className="card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">My Subjects</h2>
          <button className="btn-primary text-sm">+ Add New Subject</button>
        </div>

        <div className="space-y-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{subject.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">Year {subject.year} | Semester {subject.semester}</p>
                  <p className="text-xs text-slate-500">Last updated: {subject.lastUpdated}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Relevance Score</p>
                  <p className={`text-2xl font-bold ${subject.relevance >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {subject.relevance}%
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn-secondary text-xs">Edit Syllabus</button>
                <button className="btn-outline text-xs">View Analytics</button>
                <button className="btn-secondary text-xs">See Recommendations</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="mb-4 text-2xl font-semibold text-white">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button className="card-interactive group">
            <span className="text-3xl">📤</span>
            <p className="mt-3 font-semibold text-white group-hover:text-sky-300">Upload Syllabus</p>
            <p className="text-sm text-slate-400">Add or update course PDF</p>
          </button>
          <button className="card-interactive group">
            <span className="text-3xl">📊</span>
            <p className="mt-3 font-semibold text-white group-hover:text-sky-300">View Analytics</p>
            <p className="text-sm text-slate-400">Check curriculum gaps</p>
          </button>
          <button className="card-interactive group">
            <span className="text-3xl">💡</span>
            <p className="mt-3 font-semibold text-white group-hover:text-sky-300">Get Recommendations</p>
            <p className="text-sm text-slate-400">Suggested updates</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FacultyDashboard;
