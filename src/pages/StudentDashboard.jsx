import { useState } from 'react';
import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';

const skillGapData = {
  labels: ['Python', 'Cloud', 'AI/ML', 'DevOps', 'Databases', 'Web Dev'],
  datasets: [
    {
      label: 'Your Skills %',
      data: [60, 40, 30, 20, 50, 70],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Industry Need %',
      data: [85, 90, 85, 80, 80, 90],
      backgroundColor: '#f97316',
    },
  ],
};

const roadmapData = {
  labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
  datasets: [
    {
      label: 'Skill Development Progress',
      data: [10, 25, 45, 60, 80, 95],
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

function StudentDashboard() {
  const [selectedSemester, setSelectedSemester] = useState('sem1');

  const subjects = {
    sem1: [
      { name: 'Mathematics', relevance: 65, outdated: 20, missing: 15 },
      { name: 'Basic Programming', relevance: 75, outdated: 10, missing: 15 },
      { name: 'Digital Electronics', relevance: 55, outdated: 30, missing: 15 },
      { name: 'Engineering Graphics', relevance: 45, outdated: 40, missing: 15 },
    ],
    sem2: [
      { name: 'Data Structures', relevance: 80, outdated: 5, missing: 15 },
      { name: 'Web Development', relevance: 70, outdated: 15, missing: 15 },
      { name: 'Database Systems', relevance: 75, outdated: 10, missing: 15 },
    ],
  };

  const recommendations = [
    { skill: 'Python & Django', priority: 'High', timeline: '2 months' },
    { skill: 'Cloud Computing (AWS)', priority: 'High', timeline: '3 months' },
    { skill: 'Machine Learning Basics', priority: 'Medium', timeline: '4 months' },
    { skill: 'DevOps & Docker', priority: 'Medium', timeline: '3 months' },
    { skill: 'Git & Version Control', priority: 'High', timeline: '1 month' },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="gradient-text text-4xl font-bold">Welcome Back, Student! 👨‍🎓</h1>
            <p className="mt-2 text-slate-400">Year: 1st | Branch: Computer Science | Semester: 1</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Overall Skill Match</p>
            <p className="text-4xl font-bold text-emerald-300">64%</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="4" label="Current Subjects" accent="text-sky-400" />
        <StatCard value="64%" label="Average Relevance" accent="text-emerald-400" />
        <StatCard value="15%" label="Avg Missing Skills" accent="text-amber-400" />
        <StatCard value="12" label="Recommended Skills" accent="text-rose-400" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartBox
          title="Your Skills vs Industry Need"
          type="bar"
          data={skillGapData}
          options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, max: 100 } },
          }}
        />
        <ChartBox
          title="Your Learning Roadmap (6 months)"
          type="line"
          data={roadmapData}
          options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
        />
      </div>

      {/* Subjects */}
      <div className="card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Current Semester Subjects</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSemester('sem1')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                selectedSemester === 'sem1'
                  ? 'bg-sky-500 text-slate-950'
                  : 'border border-slate-700 text-slate-300 hover:border-sky-500'
              }`}
            >
              Sem 1
            </button>
            <button
              onClick={() => setSelectedSemester('sem2')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                selectedSemester === 'sem2'
                  ? 'bg-sky-500 text-slate-950'
                  : 'border border-slate-700 text-slate-300 hover:border-sky-500'
              }`}
            >
              Sem 2
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {subjects[selectedSemester].map((subject) => (
            <div key={subject.name} className="topic-item">
              <div className="flex-1">
                <p className="font-semibold text-white">{subject.name}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="progress-bar w-20">
                    <div className="progress-fill" style={{ width: `${subject.relevance}%` }} />
                  </div>
                  <span className="text-emerald-300">{subject.relevance}%</span>
                </div>
                <span className="badge-warning">Old: {subject.outdated}%</span>
                <span className="badge-danger">Gap: {subject.missing}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2 className="mb-6 text-2xl font-semibold text-white">Personalized Skill Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{rec.skill}</p>
                <p className="text-sm text-slate-400">Timeline: {rec.timeline}</p>
              </div>
              <span
                className={`badge ${
                  rec.priority === 'High'
                    ? 'badge-danger'
                    : rec.priority === 'Medium'
                      ? 'badge-warning'
                      : 'badge-info'
                }`}
              >
                {rec.priority} Priority
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentDashboard;
