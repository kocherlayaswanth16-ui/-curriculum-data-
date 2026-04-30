import React, { useState, useEffect } from 'react';

const GamificationCard = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="card bg-slate-900/50 backdrop-blur-xl border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <span className="mr-2 text-2xl">🏆</span> Achievements
          </h3>
          <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold border border-emerald-500/30">
            Level {stats.level}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Total Points</p>
            <p className="text-3xl font-bold text-white">{stats.points}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-emerald-400">{stats.streak}🔥</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-slate-400 text-sm font-medium mb-3">Recent Badges</p>
          <div className="flex flex-wrap gap-2">
            {stats.badges && stats.badges.length > 0 ? (
              stats.badges.map((badge, index) => (
                <div key={index} className="bg-sky-500/10 text-sky-400 p-2 rounded-xl border border-sky-500/20 flex items-center group/badge hover:bg-sky-500/20 transition-all">
                  <span className="mr-1">⭐</span>
                  <span className="text-xs font-bold uppercase">{badge.replace('_', ' ')}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-xs italic">Complete activities to earn badges!</p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>Progress to Level {stats.level + 1}</span>
            <span>{stats.points % 500} / 500</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-500" 
              style={{ width: `${(stats.points % 500) / 5}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationCard;
