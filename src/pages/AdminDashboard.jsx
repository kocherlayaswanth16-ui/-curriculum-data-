import ChartBox from '../components/ChartBox.jsx';
import StatCard from '../components/StatCard.jsx';
import { useState } from 'react';

const systemStatsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Active Users',
      data: [120, 150, 200, 280, 350, 420],
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const roleDistributionData = {
  labels: ['Students', 'Faculty', 'HOD', 'Admin'],
  datasets: [
    {
      data: [1250, 150, 18, 5],
      backgroundColor: ['#38bdf8', '#8b5cf6', '#f59e0b', '#ef4444'],
    },
  ],
};

function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Student', email: 'john@college.edu', role: 'student', status: 'active' },
    { id: 2, name: 'Prof. Jane', email: 'jane@college.edu', role: 'faculty', status: 'active' },
    { id: 3, name: 'Dr. Smith', email: 'smith@college.edu', role: 'hod', status: 'active' },
    { id: 4, name: 'Admin User', email: 'admin@college.edu', role: 'admin', status: 'active' },
  ]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <h1 className="gradient-text text-4xl font-bold">Admin Dashboard ⚙️</h1>
        <p className="mt-2 text-slate-400">System management, user administration, and configuration</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="1,423" label="Total Users" accent="text-sky-400" />
        <StatCard value="32" label="Departments" accent="text-emerald-400" />
        <StatCard value="158" label="Subjects" accent="text-amber-400" />
        <StatCard value="99.9%" label="System Uptime" accent="text-rose-400" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartBox
          title="System Activity (6 months)"
          type="line"
          data={systemStatsData}
          options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
        />
        <ChartBox
          title="User Distribution by Role"
          type="pie"
          data={roleDistributionData}
          options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
        />
      </div>

      {/* User Management */}
      <div className="card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">User Management</h2>
          <button className="btn-primary text-sm">+ Add User</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700">
              <tr className="text-slate-400">
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Role</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-900/40 transition-all">
                  <td className="px-4 py-4 text-white font-medium">{user.name}</td>
                  <td className="px-4 py-4 text-slate-400">{user.email}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`badge ${
                        user.role === 'student'
                          ? 'bg-blue-500/15 text-blue-300'
                          : user.role === 'faculty'
                            ? 'bg-purple-500/15 text-purple-300'
                            : user.role === 'hod'
                              ? 'bg-amber-500/15 text-amber-300'
                              : 'bg-rose-500/15 text-rose-300'
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="badge-success">Active</span>
                  </td>
                  <td className="px-4 py-4 flex gap-2">
                    <button className="text-sky-400 hover:text-sky-300 text-xs font-semibold">Edit</button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Settings */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 text-xl font-semibold text-white">Configuration</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-slate-300">Enable user registration</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-slate-300">Allow syllabus uploads</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-slate-300">Send email notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-300">Maintenance mode</span>
            </label>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4 text-xl font-semibold text-white">Database Backup</h3>
          <div className="space-y-3">
            <div className="rounded-xl bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Last backup</p>
              <p className="mt-1 font-semibold text-white">April 28, 2026 - 02:30 AM</p>
            </div>
            <button className="btn-outline w-full justify-center text-sm">Run Backup Now</button>
            <button className="btn-secondary w-full justify-center text-sm">Restore from Backup</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
