import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';

const features = [
  { title: 'Industry Trend Analyzer', description: 'Visualize the skills employers demand and spot opportunities for curriculum updates.' },
  { title: 'Syllabus Gap Detection', description: 'Compare current subjects with emerging job skills and quantify missing areas.' },
  { title: 'Student Roadmaps', description: 'Suggest learning paths, certifications, and career-ready skills.' },
  { title: 'Job Market Insights', description: 'Real-time tracking of job market requirements vs curriculum standards.' },
];

function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-sky-500/10 px-6 py-2 text-sm font-bold text-sky-400 ring-1 ring-inset ring-sky-500/20 animate-fade-in shadow-[0_0_15px_rgba(14,165,233,0.2)]">
              🚀 Smarter Learning Starts Here
            </span>
            <h1 className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-7xl leading-tight">
              Build Skills Today for <br />
              <span className="gradient-text">Tomorrow's Careers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-emerald-400">
              Learn Smart. Stay Relevant.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Bridge the Gap Between Education and Industry. Powered by AI and driven by data, we empower students with industry-ready skills.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Link to="/login" className="btn-primary !px-10 !py-4 text-lg">
                Enter Portal Now
              </Link>
              <button onClick={() => window.location.href='/login?auto=true'} className="btn-secondary !bg-slate-900/50 backdrop-blur-md !border-white/10 !px-10 !py-4 text-lg hover:!border-emerald-500/50 group">
                <span className="mr-2">✨</span> Magic Demo Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Selection Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Student Portal Card */}
          <Link 
            to="/login?role=student" 
            className="group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/50 p-10 transition-all hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-sky-500/10"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl transition-all group-hover:bg-sky-500/20"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/20 text-3xl shadow-lg">
                👨‍🎓
              </div>
              <h2 className="text-3xl font-bold text-white">Student User</h2>
              <p className="mt-4 text-slate-400 font-medium">
                Learn Beyond the Classroom.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Access your personalized skill gap analysis, learning roadmaps, and industry readiness reports.
              </p>
              <div className="mt-8 flex items-center text-sm font-bold text-sky-400 uppercase tracking-wide">
                Enter Student Portal 
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Job Tracer Portal Card */}
          <Link 
            to="/login?role=job-tracer" 
            className="group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/50 p-10 transition-all hover:border-emerald-500/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl transition-all group-hover:bg-emerald-500/20"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-3xl shadow-lg">
                🔍
              </div>
              <h2 className="text-3xl font-bold text-white">Job Tracer / HR</h2>
              <p className="mt-4 text-emerald-400 font-medium">
                Data-Driven Learning Platform.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Analyze market trends, track emerging technologies, and provide curriculum update recommendations.
              </p>
              <div className="mt-8 flex items-center text-sm font-bold text-emerald-400 uppercase tracking-wide">
                Enter Market Intelligence 
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* KPI Section with Promo Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] border border-slate-800 bg-gradient-to-r from-slate-900/80 to-slate-900/40 p-8 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Modern Curriculum for Modern Careers</h3>
            <p className="text-sky-400 font-semibold mt-2">Update Curriculum. Upgrade Futures.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4 relative z-10 border-t border-slate-800/50 pt-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">85%</p>
              <p className="mt-2 text-sm text-slate-400 uppercase tracking-widest font-bold">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">12k+</p>
              <p className="mt-2 text-sm text-slate-400 uppercase tracking-widest font-bold">Jobs Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">500+</p>
              <p className="mt-2 text-sm text-slate-400 uppercase tracking-widest font-bold">Syllabi Scanned</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">24/7</p>
              <p className="mt-2 text-sm text-slate-400 uppercase tracking-widest font-bold">Real-time Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white">Intelligence Meets Education</h2>
          <p className="mt-4 text-emerald-400 font-semibold">Closing the Skill Gap in Education</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {features.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

