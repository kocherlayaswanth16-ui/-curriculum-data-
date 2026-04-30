import { useState } from 'react';
import ChartBox from '../components/ChartBox.jsx';

const syllabusComparisonData = {
  labels: ['Programming', 'Databases', 'Web Tech', 'Cloud', 'AI/ML', 'DevOps', 'Security'],
  datasets: [
    {
      label: 'Current Syllabus %',
      data: [85, 70, 45, 20, 15, 5, 10],
      backgroundColor: '#64748b',
    },
    {
      label: 'Industry Demand (2026) %',
      data: [90, 85, 85, 90, 85, 80, 75],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Critical Gap %',
      data: [5, 15, 40, 70, 70, 75, 65],
      backgroundColor: '#ef4444',
    },
  ],
};

function SyllabusAnalysisPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);

  const steps = [
    "Initializing AI Analysis Engine...",
    "Extracting text & NLP tokens from document...",
    "Cross-referencing against 2026 Global Tech Demand...",
    "Identifying obsolete frameworks & legacy tools...",
    "Structuring AI Recommendation Matrix..."
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setAnalysisResults(null);
    }
  };

  const startAnalysis = () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    
    // Simulate AI thinking steps
    setTimeout(() => setAnalysisStep(1), 1000);
    setTimeout(() => setAnalysisStep(2), 2500);
    setTimeout(() => setAnalysisStep(3), 4000);
    setTimeout(() => setAnalysisStep(4), 5500);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResults({
        relevanceScore: 62,
        outdatedTopics: 12,
        missingSkills: 18,
        recommendedUpdates: [
          { skill: 'Cloud Computing (AWS/Azure)', frequency: 'Critical', reason: 'Industry standard for deployment' },
          { skill: 'Agentic AI Frameworks', frequency: 'Critical', reason: '240% growth in 2026 recruiter demand' },
          { skill: 'DevOps & Docker', frequency: 'High', reason: 'Required for all full-stack roles' },
          { skill: 'Vector Databases', frequency: 'High', reason: 'Replaces standard DBs for AI workloads' },
          { skill: 'Microservices Architecture', frequency: 'Medium', reason: 'Modern system design approach' },
        ],
        outdatedContent: [
          { topic: 'Vanilla PHP & jQuery', replacement: 'React, Next.js, or Vue ecosystem' },
          { topic: 'File-based Storage', replacement: 'Cloud Object Storage (S3)' },
          { topic: 'Monolithic Architecture', replacement: 'Microservices & Serverless' },
          { topic: 'Basic HTML/CSS layouts', replacement: 'Tailwind CSS & Component-driven UI' },
        ],
      });
    }, 7000);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
      
      {/* Header */}
      <div className="glass rounded-2xl p-8 border border-sky-500/20 bg-sky-500/5">
        <h1 className="gradient-text text-4xl font-bold">AI Syllabus Analysis Engine 🤖</h1>
        <p className="mt-2 text-slate-300 text-lg">Upload your curriculum to instantly identify skill gaps against 2026 industry requirements.</p>
      </div>

      {/* Upload & Analysis Section */}
      {!analysisResults && (
        <div className="card border-slate-700 bg-slate-900/60 shadow-xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">Upload Syllabus Document</h2>

          <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all p-12 text-center ${
            uploadedFile ? 'border-sky-500 bg-sky-500/5' : 'border-slate-700 bg-slate-950/50 hover:border-sky-500/50'
          }`}>
            
            {/* The Scanner Animation Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-900/80 z-10 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-500">
                <div className="w-full max-w-md z-20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sky-400 font-bold font-mono text-sm">{steps[analysisStep]}</span>
                    <span className="text-sky-400 font-bold">{Math.round((analysisStep / 4) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-sky-500 transition-all duration-500 ease-out shadow-[0_0_10px_#0ea5e9]"
                      style={{ width: `${(analysisStep / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {/* Laser scanner effect */}
                <div 
                  className="absolute left-0 w-full h-[2px] bg-sky-400 shadow-[0_0_20px_4px_#38bdf8] pointer-events-none"
                  style={{ animation: 'scan 2s ease-in-out infinite alternate' }}
                ></div>
              </div>
            )}

            <div className={`transition-opacity duration-300 ${isAnalyzing ? 'opacity-20' : 'opacity-100'}`}>
              <div className="mb-4 text-6xl">{uploadedFile ? '📄' : '📁'}</div>
              <p className="mb-2 text-lg font-semibold text-slate-100">
                {uploadedFile ? uploadedFile : 'Drag and drop your syllabus here'}
              </p>
              <p className="text-sm text-slate-400">
                {uploadedFile ? 'Ready for AI processing' : 'or click to select PDF / DOCX file (Max 10MB)'}
              </p>

              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-input"
                disabled={isAnalyzing}
              />

              {!uploadedFile && (
                <label htmlFor="file-input" className="btn-primary mt-6 cursor-pointer inline-block">
                  Browse Files
                </label>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            {uploadedFile && (
              <button 
                onClick={() => setUploadedFile(null)} 
                className="btn-outline"
                disabled={isAnalyzing}
              >
                Remove File
              </button>
            )}
            <button 
              onClick={startAnalysis}
              disabled={!uploadedFile || isAnalyzing}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                uploadedFile && !isAnalyzing 
                  ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
            </button>
          </div>
        </div>
      )}

      {/* Analysis Results Dashboard */}
      {analysisResults && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Analysis Report</h2>
              <p className="text-slate-400">Document: <span className="text-sky-400">{uploadedFile}</span></p>
            </div>
            <button onClick={() => setAnalysisResults(null)} className="btn-outline !py-2">
              Analyze Another Syllabus
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="card relative overflow-hidden group border-emerald-500/20 bg-emerald-500/5">
              <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <p className="text-sm font-semibold text-slate-400">Curriculum Relevance Score</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-6xl font-bold text-emerald-400">{analysisResults.relevanceScore}%</span>
                <span className="text-sm text-emerald-500 mb-2 font-bold flex items-center">▼ -15% vs avg</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-700">Severely lacking in Cloud and AI methodologies.</p>
            </div>

            <div className="card relative overflow-hidden group border-amber-500/20 bg-amber-500/5">
              <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <p className="text-sm font-semibold text-slate-400">Outdated Topics Found</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-6xl font-bold text-amber-400">{analysisResults.outdatedTopics}</span>
                <span className="text-sm text-amber-500 mb-2 font-bold">topics</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-700">Immediate removal recommended to save 45 teaching hours.</p>
            </div>

            <div className="card relative overflow-hidden group border-rose-500/20 bg-rose-500/5">
              <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <p className="text-sm font-semibold text-slate-400">Critical Skill Gaps</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-6xl font-bold text-rose-400">{analysisResults.missingSkills}</span>
                <span className="text-sm text-rose-500 mb-2 font-bold">skills</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-700">Creates a 60% hiring disadvantage for current students.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Comparison Chart */}
            <div className="lg:col-span-7 card">
              <ChartBox
                title="Curriculum vs Industry Demand (2026)"
                type="bar"
                data={syllabusComparisonData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: 'top' } },
                  scales: { y: { beginAtZero: true, max: 100 } },
                }}
              />
            </div>

            {/* Outdated Content */}
            <div className="lg:col-span-5 card border-rose-500/20 bg-rose-500/5">
              <h3 className="mb-6 text-xl font-bold text-rose-400 flex items-center gap-2"><span>⚠️</span> Required Replacements</h3>
              <div className="space-y-4">
                {analysisResults.outdatedContent.map((item, idx) => (
                  <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-rose-500 before:rounded-full">
                    <p className="line-through text-slate-400 text-sm">{item.topic}</p>
                    <p className="mt-1 font-bold text-emerald-400 text-sm">→ {item.replacement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Skills Matrix */}
          <div className="card">
            <h3 className="mb-6 text-2xl font-bold text-white flex items-center gap-2"><span>💡</span> AI Recommended Additions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {analysisResults.recommendedUpdates.map((update, idx) => (
                <div key={idx} className="rounded-xl border border-slate-700 bg-slate-800/80 p-5 flex items-start justify-between hover:border-sky-500/50 transition-colors">
                  <div>
                    <h4 className="font-bold text-white text-lg">{update.skill}</h4>
                    <p className="text-sm text-slate-400 mt-1">{update.reason}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border whitespace-nowrap ml-2 ${
                      update.frequency === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      update.frequency === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-sky-500/10 text-sky-400 border-sky-500/30'
                    }`}>
                    {update.frequency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="card flex flex-col sm:flex-row items-center justify-between gap-4 border-sky-500/20 bg-sky-500/5">
            <div>
              <h3 className="text-xl font-bold text-white">Generate Action Plan</h3>
              <p className="text-sm text-slate-400">Download the complete AI report for HOD review.</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2">📄 Export PDF</button>
              <button className="flex-1 sm:flex-none btn-secondary flex items-center justify-center gap-2">📧 Email to HOD</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SyllabusAnalysisPage;
