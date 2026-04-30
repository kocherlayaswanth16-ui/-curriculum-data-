import { useState } from 'react';
import StatCard from '../components/StatCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function StudentLookup() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock student database
  // Mock student database
  const generateSems = (baseMarks) => {
    const sems = {};
    for (let i = 1; i <= 8; i++) {
      sems[`sem${i}`] = [
        { name: 'Core Subject 1', marks: baseMarks + Math.floor(Math.random() * 15), total: 100 },
        { name: 'Core Subject 2', marks: baseMarks + Math.floor(Math.random() * 10), total: 100 },
        { name: 'Practical Lab', marks: baseMarks + 10 + Math.floor(Math.random() * 5), total: 100 },
        { name: 'Soft Skills', marks: 85, total: 100 }
      ];
    }
    return sems;
  };

  const studentsDB = [
    { id: '2026BTECH001', name: 'Jaipal', branch: 'B.Tech CSE', year: '4th', semesters: generateSems(75) },
    { id: '2026BTECH002', name: 'Yogesh', branch: 'B.Tech ECE', year: '4th', semesters: generateSems(70) },
    { id: '2026BTECH003', name: 'Balaji', branch: 'B.Tech IT', year: '4th', semesters: generateSems(80) },
    { id: '2026BTECH004', name: 'Yaswanth', branch: 'B.Tech AI&DS', year: '4th', semesters: generateSems(85) },
    { id: '2026BTECH005', name: 'Satish', branch: 'B.Tech CSE', year: '4th', semesters: generateSems(65) }
  ];

  const handleSearch = () => {
    const student = studentsDB.find(s => 
      s.id.toLowerCase() === searchQuery.toLowerCase() || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSelectedStudent(student);
  };

  const calculateOverallPercentage = (semesters) => {
    let totalMarks = 0;
    let totalMax = 0;
    Object.values(semesters).forEach(sem => {
      sem.forEach(subj => {
        totalMarks += subj.marks;
        totalMax += subj.total;
      });
    });
    return totalMax > 0 ? ((totalMarks / totalMax) * 100).toFixed(1) : 0;
  };

  // Permission logic based on user role
  const canPromote = ['admin', 'hod'].includes(user?.role);
  const canEdit = ['admin', 'faculty'].includes(user?.role);

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">Student Academic Lookup 🔍</h1>
        <p className="mt-2 text-slate-400">Search and verify student performance across all semesters.</p>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter Student ID or Name..." 
            className="input-field flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="btn-primary !px-8">Search</button>
        </div>
      </div>

      {selectedStudent ? (
        <div className="space-y-8 animate-fade-in">
          {/* Student Profile Card */}
          <div className="card bg-slate-900/80 border-sky-500/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-2xl bg-sky-500/20 flex items-center justify-center text-3xl">👤</div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedStudent.name}</h2>
                  <p className="text-slate-400 font-mono">ID: {selectedStudent.id} | {selectedStudent.branch} | Year {selectedStudent.year}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Overall Performance</p>
                <p className="text-5xl font-black text-sky-400">{calculateOverallPercentage(selectedStudent.semesters)}%</p>
              </div>
            </div>
          </div>

          {/* Semester-wise Data */}
          <div className="grid gap-6 lg:grid-cols-2">
            {Object.entries(selectedStudent.semesters).map(([semKey, subjects]) => {
              const semTotal = subjects.reduce((a, b) => a + b.marks, 0);
              const semMax = subjects.reduce((a, b) => a + b.total, 0);
              const semPerc = ((semTotal / semMax) * 100).toFixed(1);

              return (
                <div key={semKey} className="card">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Semester {semKey.replace('sem', '')}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${parseFloat(semPerc) >= 75 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {semPerc}% Average
                    </span>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <th className="pb-2">Subject</th>
                        <th className="pb-2">Marks</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {subjects.map((subj, i) => (
                        <tr key={i} className="text-sm">
                          <td className="py-3 text-slate-200">{subj.name}</td>
                          <td className="py-3 font-mono text-white">{subj.marks}/{subj.total}</td>
                          <td className="py-3">
                            {subj.marks >= 35 ? (
                              <span className="text-emerald-400 font-bold">PASS</span>
                            ) : (
                              <span className="text-rose-400 font-bold">FAIL</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>

          {/* Role-Based Actions */}
          <div className="card border-slate-700 bg-slate-900/40">
            <h3 className="text-xl font-bold text-white mb-6">Staff Actions (Permissions Based)</h3>
            <div className="flex flex-wrap gap-4">
              {canPromote ? (
                <button className="btn-primary !bg-emerald-600 hover:!bg-emerald-500">Promote to Next Sem</button>
              ) : (
                <button className="btn-secondary opacity-50 cursor-not-allowed" title="Permission Denied">Promote (Locked)</button>
              )}
              
              {canEdit ? (
                <button className="btn-outline">Edit Marks</button>
              ) : (
                <button className="btn-secondary opacity-50 cursor-not-allowed">Edit Marks (Locked)</button>
              )}

              <button className="btn-secondary">Print Transcript</button>
              <button className="btn-secondary">Contact Guardian</button>
            </div>
          </div>
        </div>
      ) : searchQuery && (
        <div className="py-20 text-center glass rounded-2xl">
          <p className="text-xl text-slate-400">No student found matching "{searchQuery}"</p>
        </div>
      )}
    </section>
  );
}

export default StudentLookup;
