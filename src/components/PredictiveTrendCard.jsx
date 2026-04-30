import React from 'react';
import ChartBox from './ChartBox.jsx';

const PredictiveTrendCard = ({ trends }) => {
  if (!trends) return null;

  const chartData = {
    labels: trends.map(t => t.skill),
    datasets: [
      {
        label: 'Current Relevance %',
        data: trends.map(t => t.current),
        backgroundColor: '#38bdf8',
        borderRadius: 8,
      },
      {
        label: 'Predicted (1 Year) %',
        data: trends.map(t => t.predicted_1yr),
        backgroundColor: '#22c55e',
        borderRadius: 8,
      }
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card border-sky-500/20 bg-slate-900/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🔮</span> Skill Relevance Forecast
          </h3>
          <ChartBox 
            type="bar" 
            data={chartData} 
            options={{ 
              responsive: true,
              plugins: { legend: { position: 'top', labels: { color: '#94a3b8' } } },
              scales: {
                y: { beginAtZero: true, max: 100, grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
              }
            }} 
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>⚠️</span> Obsolescence Risk Alert
          </h3>
          {trends.filter(t => t.status === 'declining').map((trend, i) => (
            <div key={i} className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex justify-between items-center group hover:bg-rose-500/10 transition-all">
              <div>
                <h4 className="font-bold text-white text-lg">{trend.skill}</h4>
                <p className="text-rose-400 text-sm font-medium">Declining relevance: -{Math.round(trend.current - trend.predicted_1yr)}% expected</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Replacement</p>
                <p className="text-sky-400 font-bold text-sm bg-sky-500/10 px-3 py-1 rounded-lg">{trend.replacement}</p>
              </div>
            </div>
          ))}
          {trends.filter(t => t.status === 'rising').map((trend, i) => (
            <div key={i} className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex justify-between items-center group hover:bg-emerald-500/10 transition-all">
              <div>
                <h4 className="font-bold text-white text-lg">{trend.skill}</h4>
                <p className="text-emerald-400 text-sm font-medium">Rising demand: +{Math.round(trend.predicted_1yr - trend.current)}% expected</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black bg-emerald-500 text-slate-950 px-2 py-1 rounded-md uppercase tracking-widest">High Growth</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card bg-gradient-to-r from-sky-600/20 to-blue-600/20 border-sky-500/30 p-8 rounded-[2.5rem]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-black text-white">Strategic Recommendation</h3>
            <p className="text-slate-300 mt-2 text-lg">
              Based on the 2-year forecast, we recommend shifting focus from <span className="text-rose-400 font-bold">Legacy Web Frameworks</span> to <span className="text-sky-400 font-bold">AI-Integrated Development</span>. 
              Syllabus updates should be initiated for the next academic year.
            </p>
          </div>
          <button className="btn-primary !px-10 !py-4 !rounded-2xl font-black shadow-2xl shadow-sky-500/20 whitespace-nowrap">
            Generate Strategic Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictiveTrendCard;
