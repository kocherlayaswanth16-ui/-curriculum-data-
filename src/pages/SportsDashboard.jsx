import { useState } from 'react';
import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';

// Sample data for demonstration purposes
const sportsList = [
  'Cricket',
  'Football',
  'Volleyball',
  'Basketball',
  'Athletics',
  'Badminton',
];

const scheduleData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Practice Hours',
      data: [2, 1.5, 2, 2, 1, 0],
      backgroundColor: '#38bdf8',
    },
  ],
};

const fitnessData = {
  labels: ['BMI', 'Weight (kg)', 'Strength'],
  datasets: [
    {
      label: 'Current',
      data: [22, 68, 75],
      backgroundColor: '#22c55e',
    },
    {
      label: 'Target',
      data: [20, 70, 85],
      backgroundColor: '#f97316',
    },
  ],
};

function SportsDashboard() {
  const [selectedSport, setSelectedSport] = useState(sportsList[0]);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSportSelect = (sport) => setSelectedSport(sport);

  const generateCertificate = () => setShowCertificate(true);

  // Mock performance stats – in a real app these would be fetched from a backend
  const performance = {
    matchesPlayed: 12,
    wins: 8,
    skillRating: 78,
    improvement: 12, // % improvement over last term
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">Sports Curriculum Management 🏅</h1>
        <p className="mt-2 text-slate-400">Track training, fitness, performance, and tournaments for your chosen sport.</p>
      </div>

      {/* Sport Selection */}
      <div className="card">
        <h2 className="mb-4 text-2xl font-semibold text-white">Select Your Sport</h2>
        <div className="flex flex-wrap gap-3">
          {sportsList.map((sport) => (
            <button
              key={sport}
              onClick={() => handleSportSelect(sport)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedSport === sport ? 'bg-sky-500 text-slate-950' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'}
              `}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Training Schedule */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartBox title="Weekly Practice Schedule" type="bar" data={scheduleData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        <ChartBox title="Fitness Tracking" type="bar" data={fitnessData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>

      {/* Performance Dashboard */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <StatCard value={performance.matchesPlayed} label="Matches Played" accent="text-sky-400" />
        <StatCard value={performance.wins} label="Wins" accent="text-emerald-400" />
        <StatCard value={`${performance.skillRating}%`} label="Skill Rating" accent="text-amber-400" />
        <StatCard value={`${performance.improvement}%`} label="Improvement" accent="text-rose-400" />
      </div>

      {/* Tournament Management */}
      <div className="card mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">Upcoming Tournament</h2>
        <p className="text-slate-300">Inter‑College {selectedSport} Championship – 15th Oct 2026</p>
        <button className="mt-4 btn-primary !rounded-xl">Register Team</button>
      </div>

      {/* Certificate Generation */}
      <div className="card mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">Participation Certificate</h2>
        <p className="text-slate-300 mb-4">Generate a PDF certificate for your sport participation.</p>
        <button onClick={generateCertificate} className="btn-secondary !rounded-xl">Generate Certificate</button>
        {showCertificate && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-xl text-center">
            <p className="text-slate-200">✅ Certificate generated! (mock)</p>
          </div>
        )}
      </div>

      {/* Injury & Health Report */}
      <div className="card mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">Injury & Health Report</h2>
        <p className="text-slate-300">No injuries reported for the current term.</p>
      </div>
    </section>
  );
}

export default SportsDashboard;
