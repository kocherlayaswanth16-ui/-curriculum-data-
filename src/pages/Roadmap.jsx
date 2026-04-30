import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard.jsx';

const roadmapSteps = [
  {
    month: 'Month 1',
    title: 'Foundations & Automation',
    description: 'Master Python fundamentals and basic scripting to automate repetitive curriculum tasks.',
    skills: ['Python 3.x', 'Git/GitHub', 'CLI Basics'],
    status: 'completed',
    icon: '🚀'
  },
  {
    month: 'Month 2',
    title: 'Data Analysis Core',
    description: 'Deep dive into data processing to identify patterns in syllabus relevance scores.',
    skills: ['Pandas', 'NumPy', 'Data Cleaning'],
    status: 'current',
    icon: '📊'
  },
  {
    month: 'Month 3',
    title: 'AI & Industry Mapping',
    description: 'Leverage LLMs to map syllabus topics directly to current job market requirements.',
    skills: ['OpenAI API', 'NLP Basics', 'Vector DBs'],
    status: 'upcoming',
    icon: '🧠'
  },
  {
    month: 'Month 4',
    title: 'Modern Frontend Patterns',
    description: 'Build interactive dashboards to visualize skill gaps for different departments.',
    skills: ['React 18', 'Tailwind CSS', 'Chart.js'],
    status: 'upcoming',
    icon: '💻'
  },
  {
    month: 'Month 5',
    title: 'Cloud & Scale',
    description: 'Deploy analytics engines to the cloud and ensure high availability for institutions.',
    skills: ['AWS Lambda', 'Docker', 'CI/CD'],
    status: 'upcoming',
    icon: '☁️'
  },
  {
    month: 'Month 6',
    title: 'Professional Capstone',
    description: 'Finalize the Curriculum Analytics Engine and present industry-readiness reports.',
    skills: ['System Design', 'Security', 'Testing'],
    status: 'upcoming',
    icon: '🎯'
  }
];

function Roadmap() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsGenerating(false), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  if (isGenerating) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-sky-500/20 border-t-sky-500"></div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">AI Engine Processing...</h2>
          <p className="mt-2 text-slate-400">Analyzing your skill gaps and job market trends to build your custom roadmap.</p>
        </div>
        <div className="w-full max-w-md space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-xs font-mono text-sky-400">{progress}% Optimized</p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-12 py-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          AI Generated Personalized Path
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Your Learning <span className="gradient-text">Roadmap</span>
        </h1>
        <p className="mx-auto max-w-2xl text-slate-400 text-lg">
          We've mapped out your next 6 months based on your current subjects and the top skills demanded by tech leaders today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest">Est. Duration</p>
          <p className="mt-1 text-2xl font-bold text-white">6 Months</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest">Target Skills</p>
          <p className="mt-1 text-2xl font-bold text-white">18 Total</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest">Job Readiness</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">+35% Boost</p>
        </div>
      </div>

      {/* Adaptive Recalibration Section */}
      <div className="card bg-gradient-to-br from-purple-500/10 to-slate-900 border-purple-500/20 p-8 rounded-[2.5rem]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
                    <h3 className="text-xl font-bold text-white">Adaptive Learning Engine</h3>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Your current learning speed is <span className="text-purple-400 font-bold">15% faster</span> than average. 
                    The engine has automatically adjusted your Month 3 difficulty to <span className="text-white font-bold">Advanced</span>.
                  </p>
              </div>
              <button 
                onClick={() => {
                  setIsGenerating(true);
                  setProgress(0);
                }}
                className="btn-secondary !bg-purple-500/10 !text-purple-400 !border-purple-500/30 hover:!bg-purple-500/20 !rounded-xl"
              >
                🔄 Recalibrate Path
              </button>
          </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-emerald-500 before:via-sky-500 before:to-transparent sm:before:ml-[2.25rem]">
        {roadmapSteps.map((step, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Dot */}
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-slate-950 shadow transition-all duration-300 sm:h-12 sm:w-12 z-10 ${
              step.status === 'completed' ? 'bg-emerald-500' : 
              step.status === 'current' ? 'bg-sky-500 animate-pulse' : 'bg-slate-800'
            }`}>
              <span className="text-lg">{step.icon}</span>
            </div>

            {/* Content Card */}
            <div className="ml-6 w-[calc(100%-4rem)] rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl transition-all hover:border-slate-700 hover:bg-slate-900 sm:ml-12 md:ml-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    step.status === 'completed' ? 'text-emerald-400' : 
                    step.status === 'current' ? 'text-sky-400' : 'text-slate-500'
                  }`}>
                    {step.month}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{step.title}</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {step.skills.map(skill => (
                    <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-semibold text-slate-300 border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
              </p>
              
              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                <button className={`text-xs font-bold transition-all ${
                  step.status === 'completed' ? 'text-emerald-400' : 'text-sky-400 hover:text-sky-300'
                }`}>
                  {step.status === 'completed' ? '✓ DONE' : step.status === 'current' ? 'START LEARNING →' : 'LOCKED'}
                </button>
                {step.status === 'current' && (
                  <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping"></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="rounded-[3rem] bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-slate-800 p-12 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to boost your career?</h2>
        <p className="mt-4 text-slate-400">Download your roadmap as a PDF or sync it with your calendar.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-slate-950 hover:bg-slate-200">
            Download PDF
          </button>
          <button className="rounded-full border border-slate-700 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800">
            Sync with Calendar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Roadmap;
