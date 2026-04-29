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
      label: 'Industry Demand %',
      data: [90, 85, 85, 90, 85, 80, 75],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Gap %',
      data: [5, 15, 40, 70, 70, 75, 65],
      backgroundColor: '#ef4444',
    },
  ],
};

function SyllabusAnalysisPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      // Simulate analysis
      setTimeout(() => {
        setAnalysisResults({
          relevanceScore: 62,
          outdatedTopics: 12,
          missingSkills: 18,
          recommendedUpdates: [
            { skill: 'Cloud Computing (AWS)', frequency: 'High', reason: 'Missing from curriculum' },
            { skill: 'Machine Learning', frequency: 'High', reason: 'Limited coverage' },
            { skill: 'DevOps Practices', frequency: 'Medium', reason: 'Not covered' },
            { skill: 'Cybersecurity', frequency: 'Medium', reason: 'Basic level needed' },
            { skill: 'Microservices Architecture', frequency: 'Medium', reason: 'Modern approach' },
          ],
          outdatedContent: [
            { topic: 'Legacy Database Systems', replacement: 'Modern NoSQL & Graph Databases' },
            { topic: 'Monolithic Architecture', replacement: 'Microservices & Distributed Systems' },
            { topic: 'Waterfall Model', replacement: 'Agile & DevOps Methodologies' },
            { topic: 'Traditional Web Technologies', replacement: 'Modern Web Frameworks & APIs' },
          ],
        });
      }, 2000);
    }
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">Syllabus Analysis & Comparison 📊</h1>
        <p className="mt-2 text-slate-400">Upload your syllabus PDF to analyze relevance and get industry-aligned recommendations</p>
      </div>

      {/* Upload Section */}
      <div className="card">
        <h2 className="mb-6 text-2xl font-semibold text-white">Upload Syllabus Document</h2>

        <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/50 p-12 text-center transition-all hover:border-sky-500">
          <div className="mb-4 text-5xl">📄</div>
          <p className="mb-2 text-lg font-semibold text-slate-100">Drag and drop your syllabus</p>
          <p className="text-sm text-slate-400">or click to select PDF / DOCX file</p>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-input"
          />

          <label htmlFor="file-input" className="btn-primary mt-6 cursor-pointer">
            Choose File
          </label>

          {uploadedFile && (
            <p className="mt-4 text-sm text-emerald-400 font-semibold">✓ File selected: {uploadedFile}</p>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button className="btn-primary">Analyze Syllabus</button>
          <button className="btn-secondary">Cancel</button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <>
          {/* Summary Stats */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-500/20 to-slate-900/60 p-6">
              <p className="text-sm text-slate-400">Overall Relevance Score</p>
              <p className="mt-3 text-5xl font-bold text-emerald-400">{analysisResults.relevanceScore}%</p>
              <p className="mt-2 text-xs text-slate-400">Industry aligned content</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-amber-500/20 to-slate-900/60 p-6">
              <p className="text-sm text-slate-400">Outdated Topics</p>
              <p className="mt-3 text-5xl font-bold text-amber-400">{analysisResults.outdatedTopics}</p>
              <p className="mt-2 text-xs text-slate-400">Requires updating</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-rose-500/20 to-slate-900/60 p-6">
              <p className="text-sm text-slate-400">Skill Gaps</p>
              <p className="mt-3 text-5xl font-bold text-rose-400">{analysisResults.missingSkills}</p>
              <p className="mt-2 text-xs text-slate-400">Missing from curriculum</p>
            </div>
          </div>

          {/* Comparison Chart */}
          <ChartBox
            title="Curriculum vs Industry Standards"
            type="bar"
            data={syllabusComparisonData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true, max: 100 } },
            }}
          />

          {/* Recommended Skills */}
          <div className="card">
            <h3 className="mb-6 text-2xl font-semibold text-white">Recommended Skills to Add</h3>
            <div className="space-y-3">
              {analysisResults.recommendedUpdates.map((update, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{update.skill}</p>
                    <p className="text-sm text-slate-400">{update.reason}</p>
                  </div>
                  <span
                    className={`badge ${
                      update.frequency === 'High'
                        ? 'bg-rose-500/15 text-rose-300'
                        : 'bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    {update.frequency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Outdated Content */}
          <div className="card">
            <h3 className="mb-6 text-2xl font-semibold text-white">Outdated Topics & Replacements</h3>
            <div className="space-y-3">
              {analysisResults.outdatedContent.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <p className="line-through text-rose-400">{item.topic}</p>
                      <p className="mt-2 font-semibold text-white">→ Replace with: {item.replacement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="card">
            <h3 className="mb-4 text-2xl font-semibold text-white">Export Report</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">📄 Export as PDF</button>
              <button className="btn-secondary">📊 Export as Excel</button>
              <button className="btn-outline">📋 Copy Recommendations</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SyllabusAnalysisPage;
