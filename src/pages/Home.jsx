import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';

const features = [
  { title: 'Industry Trend Analyzer', description: 'Visualize the skills employers demand and spot opportunities for curriculum updates.' },
  { title: 'Syllabus Gap Detection', description: 'Compare current subjects with emerging job skills and quantify missing areas.' },
  { title: 'Student Roadmaps', description: 'Suggest learning paths, certifications, and career-ready skills.' },
  { title: 'Admin Analytics', description: 'Department-level dashboards for placement readiness and syllabus relevance.' },
];

function Home() {
  return (
    <section className="mx-auto max-w-7xl space-y-12 py-10">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-sky-500/15 px-4 py-1 text-sm font-semibold text-sky-300">College curriculum analytics</span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Skill Obsolescence & Curriculum Relevance Analytics Engine
          </h1>
          <p className="max-w-xl text-slate-300">
            Build a modern portal for colleges to measure syllabus relevance, uncover skill gaps, and recommend emerging industry competencies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              View Dashboard
            </Link>
            <Link to="/upload" className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-slate-500">
              Upload Syllabus
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">College KPI snapshot</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-3xl font-semibold text-white">72%</p>
                  <p className="mt-2 text-sm text-slate-400">Curriculum relevance</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-3xl font-semibold text-white">28%</p>
                  <p className="mt-2 text-sm text-slate-400">Missing industry skills</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-slate-400">Top trending skill</p>
                <p className="mt-3 text-xl font-semibold text-white">Generative AI</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-slate-400">Fastest rising domain</p>
                <p className="mt-3 text-xl font-semibold text-white">Cloud DevOps</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-white">Why this project matters</h2>
        <p className="max-w-3xl text-slate-300">
          The modern job market evolves faster than most college curricula. This web application helps academic leaders and students track outdated skills, prioritize new technology, and keep graduates job-ready.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {features.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Home;
