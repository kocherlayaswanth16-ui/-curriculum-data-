import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Launcher({ setViewMode }) {
  const navigate = useNavigate();

  const handleSelect = (mode) => {
    setViewMode(mode);
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
          SELECT <span className="text-sky-500">VERSION</span>
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
          Choose how you would like to experience the Curriculum & Job Market Analytics Portal.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Portfolio Version Card */}
          <button 
            onClick={() => handleSelect('portfolio')}
            className="group relative overflow-hidden rounded-[2.5rem] p-1 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-600 to-purple-600"></div>
            <div className="relative h-full w-full bg-slate-900 rounded-[2.4rem] p-10 flex flex-col items-center text-center">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🚀</div>
              <h2 className="text-3xl font-black text-white mb-4">Portfolio Mode</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Experience the high-fidelity prototype with glassmorphic designs, premium animations, and a dark-theme aesthetic.
              </p>
              <span className="mt-auto px-8 py-3 bg-white text-slate-950 font-black rounded-full text-xs uppercase tracking-widest">
                Enter Prototype
              </span>
            </div>
          </button>

          {/* Normal Version Card */}
          <button 
            onClick={() => handleSelect('normal')}
            className="group relative overflow-hidden rounded-[2.5rem] p-1 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-slate-700 group-hover:bg-slate-500 transition-colors"></div>
            <div className="relative h-full w-full bg-slate-900 rounded-[2.4rem] p-10 flex flex-col items-center text-center">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🖥️</div>
              <h2 className="text-3xl font-black text-white mb-4">Normal Web Mode</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Access the standard web application interface. Clean, fast, and optimized for daily curriculum management.
              </p>
              <span className="mt-auto px-8 py-3 border border-slate-700 text-white font-black rounded-full text-xs uppercase tracking-widest group-hover:border-white transition-colors">
                Enter Web App
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Launcher;
