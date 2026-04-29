import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';

const skillsGapChartData = {
  labels: ['Python', 'Cloud', 'AI/ML', 'DevOps', 'Databases', 'Web Dev', 'Security'],
  datasets: [
    {
      label: 'Your Current Level %',
      data: [70, 30, 20, 15, 50, 65, 25],
      backgroundColor: 'rgba(56, 189, 248, 0.6)',
    },
    {
      label: 'Required Level %',
      data: [90, 85, 80, 75, 85, 90, 80],
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
    },
  ],
};

const careerPathChart = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Skill Proficiency Growth',
      data: [20, 45, 70, 95],
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

function SkillsGapAnalysis() {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Python', current: 70, required: 90, gap: 20 },
        { name: 'JavaScript', current: 60, required: 85, gap: 25 },
        { name: 'Java', current: 75, required: 80, gap: 5 },
      ],
    },
    {
      category: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', current: 10, required: 85, gap: 75 },
        { name: 'Docker', current: 15, required: 80, gap: 65 },
        { name: 'Kubernetes', current: 5, required: 70, gap: 65 },
      ],
    },
    {
      category: 'Data & AI',
      skills: [
        { name: 'Machine Learning', current: 20, required: 80, gap: 60 },
        { name: 'Data Analysis', current: 35, required: 75, gap: 40 },
        { name: 'Big Data', current: 10, required: 65, gap: 55 },
      ],
    },
  ];

  const learningRoadmap = [
    { quarter: 'Q1', focus: 'Python & Git', progress: 100 },
    { quarter: 'Q2', focus: 'Web Development', progress: 100 },
    { quarter: 'Q3', focus: 'Cloud Computing', progress: 60 },
    { quarter: 'Q4', focus: 'AI/ML Basics', progress: 0 },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">Your Skills Gap Analysis 🎯</h1>
        <p className="mt-2 text-slate-400">Personalized skill development recommendations based on industry demand</p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="7" label="Critical Skill Gaps" accent="text-rose-400" />
        <StatCard value="15" label="Avg Gap %" accent="text-amber-400" />
        <StatCard value="6" label="Months to Close" accent="text-sky-400" />
        <StatCard value="12" label="Priority Skills" accent="text-emerald-400" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartBox
          title="Your Skills vs Industry Requirement"
          type="bar"
          data={skillsGapChartData}
          options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, max: 100 } },
          }}
        />
        <ChartBox
          title="6-Month Learning Roadmap"
          type="line"
          data={careerPathChart}
          options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
        />
      </div>

      {/* Detailed Skills */}
      <div className="space-y-6">
        {skillCategories.map((category) => (
          <div key={category.category} className="card">
            <h3 className="mb-4 text-xl font-semibold text-white">{category.category}</h3>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.name} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{skill.name}</p>
                      <div className="mt-2 flex gap-6 text-sm">
                        <span className="text-slate-400">Your Level: <span className="text-sky-400 font-semibold">{skill.current}%</span></span>
                        <span className="text-slate-400">Required: <span className="text-emerald-400 font-semibold">{skill.required}%</span></span>
                      </div>
                    </div>
                    <span className={`badge ${skill.gap > 50 ? 'badge-danger' : skill.gap > 25 ? 'badge-warning' : 'badge-success'}`}>
                      Gap: {skill.gap}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${skill.current}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning Roadmap */}
      <div className="card">
        <h3 className="mb-6 text-2xl font-semibold text-white">Your Learning Roadmap</h3>
        <div className="space-y-4">
          {learningRoadmap.map((item) => (
            <div key={item.quarter} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-white">{item.quarter}: {item.focus}</p>
                </div>
                <span className="text-sm font-semibold text-slate-400">{item.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${item.progress}%`,
                    background: item.progress === 100 ? '#22c55e' : '#38bdf8',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 className="mb-4 text-2xl font-semibold text-white">Top Recommendations</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border-l-4 border-rose-500 bg-rose-500/10 p-4">
            <p className="font-semibold text-white">🔴 Critical Priority</p>
            <p className="mt-2 text-sm text-slate-300">Master Cloud Computing (AWS, Azure) - 75% gap, 65% industry demand</p>
            <button className="mt-3 text-sm font-semibold text-rose-400 hover:text-rose-300">Start Learning →</button>
          </div>
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-500/10 p-4">
            <p className="font-semibold text-white">🟠 High Priority</p>
            <p className="mt-2 text-sm text-slate-300">Learn Machine Learning & AI - 60% gap, 60% industry demand</p>
            <button className="mt-3 text-sm font-semibold text-amber-400 hover:text-amber-300">Explore Courses →</button>
          </div>
          <div className="rounded-xl border-l-4 border-sky-500 bg-sky-500/10 p-4">
            <p className="font-semibold text-white">🔵 Medium Priority</p>
            <p className="mt-2 text-sm text-slate-300">Advanced Web Development - 30% gap, 55% industry demand</p>
            <button className="mt-3 text-sm font-semibold text-sky-400 hover:text-sky-300">View Resources →</button>
          </div>
          <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-500/10 p-4">
            <p className="font-semibold text-white">🟢 Trending Skills</p>
            <p className="mt-2 text-sm text-slate-300">DevOps & Containerization - Rapidly growing demand</p>
            <button className="mt-3 text-sm font-semibold text-emerald-400 hover:text-emerald-300">Certifications →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsGapAnalysis;
