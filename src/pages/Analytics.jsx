import FeatureCard from '../components/FeatureCard.jsx';
import PredictiveTrendCard from '../components/PredictiveTrendCard.jsx';
import ChartBox from '../components/ChartBox.jsx';

const insights = [
  { title: 'Skill Gap Score', description: 'Your current syllabus matches 55% of trending job requirements.' },
  { title: 'Suggested new skills', description: 'Add Cloud DevOps, Data Engineering, AI Ethics, and Cybersecurity fundamentals.' },
  { title: 'Outdated topics', description: 'Legacy programming languages and older web frameworks should be reviewed.' },
];

const analyticTrends = [
  { skill: 'Python / ML', current: 80, predicted_1yr: 95, status: 'rising' },
  { skill: 'Cloud Native', current: 65, predicted_1yr: 88, status: 'rising' },
  { skill: 'Monolithic Arch', current: 40, predicted_1yr: 15, status: 'declining', replacement: 'Microservices' },
];

const comparisonData = {
  labels: ['2023', '2024', '2025', '2026'],
  datasets: [
    {
      label: 'Curriculum Relevance %',
      data: [85, 78, 65, 55],
      borderColor: '#f43f5e',
      backgroundColor: 'rgba(244, 63, 94, 0.1)',
      fill: true,
    },
    {
      label: 'Industry Growth %',
      data: [70, 80, 95, 110],
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      fill: true,
    }
  ]
};

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

      <div className="grid lg:grid-cols-2 gap-8">
          <ChartBox title="The Curriculum Gap Trend" type="line" data={comparisonData} />
          <div className="card">
              <h3 className="text-2xl font-bold text-white mb-6">Actionable Insights</h3>
              <div className="grid gap-4">
                {insights.map((item) => (
                    <div key={item.title} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                        <h4 className="font-bold text-sky-400">{item.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                    </div>
                ))}
              </div>
          </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Predictive Skill Analysis</h3>
        <PredictiveTrendCard trends={analyticTrends} />
      </div>

      <div className="card bg-slate-900/50 border-white/5 p-10">
          <div className="flex justify-between items-center mb-8">
              <div>
                  <h3 className="text-2xl font-black text-white">📉 Skill Decay Tracker</h3>
                  <p className="text-sm text-slate-400 mt-1">AI-predicted obsolescence rate for your core technologies.</p>
              </div>
              <span className="bg-rose-500/10 text-rose-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-rose-500/20">Critical Alert</span>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
              {[
                  { name: 'Python 3.x', decay: 'Slow', rate: 10, color: 'text-emerald-400', suggestion: 'Safe for 2+ years' },
                  { name: 'React 18', decay: 'Medium', rate: 45, color: 'text-amber-400', suggestion: 'Revise every 6 months' },
                  { name: 'Legacy PHP', decay: 'High', rate: 85, color: 'text-rose-400', suggestion: 'Replace immediately' },
              ].map(skill => (
                  <div key={skill.name} className="p-6 rounded-[2rem] bg-slate-950/40 border border-white/5 group hover:border-white/10 transition-all">
                      <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-white">{skill.name}</h4>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${skill.color}`}>{skill.decay} Decay</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                          <div className={`h-full transition-all duration-1000 ${
                              skill.rate > 70 ? 'bg-rose-500' : skill.rate > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`} style={{ width: `${skill.rate}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium italic">" {skill.suggestion} "</p>
                  </div>
              ))}
          </div>
      </div>
    </section>
  );
}

export default Analytics;
