import React, { useState } from 'react';

const mockLeaderboard = [
  { id: 1, name: 'Yaswanth', points: 2450, level: 5, dept: 'CSE', badges: 8 },
  { id: 2, name: 'Alice Smith', points: 2100, level: 4, dept: 'IT', badges: 6 },
  { id: 3, name: 'Bob Johnson', points: 1950, level: 4, dept: 'CSE', badges: 7 },
  { id: 4, name: 'Charlie Brown', points: 1800, level: 3, dept: 'ECE', badges: 5 },
  { id: 5, name: 'Diana Prince', points: 1650, level: 3, dept: 'IT', badges: 4 },
];

const Leaderboard = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">🏆 Global Leaderboard</h1>
        <p className="mt-4 text-lg text-slate-400">Top performers across all departments for the 2026 Academic Year.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {mockLeaderboard.slice(0, 3).map((user, i) => (
          <div key={user.id} className={`card p-8 text-center relative overflow-hidden ${
            i === 0 ? 'bg-gradient-to-br from-amber-500/20 to-slate-900 border-amber-500/50 scale-110 z-10' : 
            i === 1 ? 'bg-gradient-to-br from-slate-300/10 to-slate-900 border-slate-300/30' : 
            'bg-gradient-to-br from-orange-500/10 to-slate-900 border-orange-500/30'
          }`}>
            <div className="text-5xl mb-4">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
            <h3 className="text-2xl font-bold text-white">{user.name}</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">{user.dept}</p>
            <p className="mt-6 text-4xl font-black text-white">{user.points}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Points</p>
          </div>
        ))}
      </div>

      <div className="card !p-0 overflow-hidden border-slate-800 bg-slate-900/50">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-950/50 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800">
              <th className="py-6 px-8 text-center">Rank</th>
              <th className="py-6 px-8">Learner</th>
              <th className="py-6 px-8">Department</th>
              <th className="py-6 px-8 text-center">Level</th>
              <th className="py-6 px-8 text-right">Total Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {mockLeaderboard.map((user, i) => (
              <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                <td className="py-6 px-8 text-center font-black text-slate-500 group-hover:text-white transition-colors">{i + 1}</td>
                <td className="py-6 px-8 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl">👤</div>
                    <span className="font-bold text-white">{user.name}</span>
                </td>
                <td className="py-6 px-8 font-bold text-slate-400">{user.dept}</td>
                <td className="py-6 px-8 text-center">
                    <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full text-xs font-bold border border-sky-500/20">Lvl {user.level}</span>
                </td>
                <td className="py-6 px-8 text-right font-black text-white">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
