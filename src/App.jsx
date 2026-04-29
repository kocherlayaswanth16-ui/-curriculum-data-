import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import NavbarEnhanced from './components/NavbarEnhanced.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public pages
import Home from './pages/Home.jsx';
import LoginEnhanced from './pages/LoginEnhanced.jsx';
import NotFound from './pages/NotFound.jsx';

// Role-based dashboards
import StudentDashboard from './pages/StudentDashboard.jsx';
import FacultyDashboard from './pages/FacultyDashboard.jsx';
import HODDashboard from './pages/HODDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// Other pages
import SyllabusAnalysisPage from './pages/SyllabusAnalysisPage.jsx';
import SkillsGapAnalysis from './pages/SkillsGapAnalysis.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <NavbarEnhanced />
        <main className="px-4 py-6 sm:px-6 lg:px-10">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginEnhanced />} />

            {/* Protected role-based dashboards */}
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute requiredRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/faculty"
              element={
                <ProtectedRoute requiredRoles={['faculty']}>
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/hod"
              element={
                <ProtectedRoute requiredRoles={['hod']}>
                  <HODDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Shared pages */}
            <Route
              path="/upload-syllabus"
              element={
                <ProtectedRoute requiredRoles={['faculty', 'hod', 'admin']}>
                  <SyllabusAnalysisPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skills-gap"
              element={
                <ProtectedRoute requiredRoles={['student']}>
                  <SkillsGapAnalysis />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
