import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { useState, useEffect } from 'react';

// Common Components
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';

// Normal Version Components
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';

// Portfolio Version Components
import NavbarEnhanced from './components/NavbarEnhanced.jsx';
import LoginEnhanced from './pages/LoginEnhanced.jsx';

// Shared Pages
import Launcher from './pages/Launcher.jsx';
import Home from './pages/Home.jsx';
import MarketIntelligence from './pages/MarketIntelligence.jsx';
import SportsDashboard from './pages/SportsDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import FacultyDashboard from './pages/FacultyDashboard.jsx';
import HODDashboard from './pages/HODDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import JobTracerDashboard from './pages/JobTracerDashboard.jsx';
import StudentLookup from './pages/StudentLookup.jsx';
import JobPortal from './pages/JobPortal.jsx';
import SyllabusAnalysisPage from './pages/SyllabusAnalysisPage.jsx';
import SkillsGapAnalysis from './pages/SkillsGapAnalysis.jsx';
import Roadmap from './pages/Roadmap.jsx';
import Analytics from './pages/Analytics.jsx';
import Upload from './pages/Upload.jsx';
import Dashboard from './pages/Dashboard.jsx';
import JobApplicationTracker from './pages/JobApplicationTracker.jsx';
import MentorConnect from './pages/MentorConnect.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import CareerPrediction from './pages/CareerPrediction.jsx';
import ResumeOptimizer from './pages/ResumeOptimizer.jsx';
import Support from './pages/Support.jsx';
import CurriculumPlanner from './pages/CurriculumPlanner.jsx';

function App() {
  const location = useLocation();
  // State to toggle between 'normal' and 'portfolio' modes
  const [viewMode, setViewMode] = useState(localStorage.getItem('viewMode') || null);

  useEffect(() => {
    if (viewMode) {
      localStorage.setItem('viewMode', viewMode);
    }
  }, [viewMode]);

  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.startsWith('/jobs') || 
                      location.pathname.startsWith('/market-intelligence') ||
                      location.pathname.startsWith('/sports') ||
                      location.pathname.startsWith('/upload') ||
                      location.pathname.startsWith('/analytics') ||
                      location.pathname.startsWith('/student-lookup') ||
                      location.pathname.startsWith('/skills-gap') ||
                      location.pathname.startsWith('/job-tracker') || 
                      location.pathname.startsWith('/mentor-connect') ||
                      location.pathname.startsWith('/leaderboard') ||
                      location.pathname.startsWith('/support') ||
                      location.pathname.startsWith('/career-prediction') ||
                      location.pathname.startsWith('/curriculum-planner') ||
                      location.pathname.startsWith('/resume-optimizer') ||
                      location.pathname.startsWith('/roadmap');

  const isLoginPage = location.pathname === '/login';
  const isLauncher = location.pathname === '/select-version';

  const toggleMode = () => {
    setViewMode(prev => prev === 'normal' ? 'portfolio' : 'normal');
  };

  return (
    <AuthProvider>
      {!viewMode && location.pathname !== '/select-version' ? (
        <Navigate to="/select-version" replace />
      ) : (
        <div className={`min-h-screen ${viewMode === 'portfolio' ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} flex flex-col transition-colors duration-500`}>
          
          {/* Universal Mode Switcher Button (Floating) - Only show if mode selected and not on launcher */}
          {viewMode && !isLauncher && (
            <button 
              onClick={toggleMode}
              className="fixed bottom-6 right-6 z-[100] px-6 py-3 rounded-full font-bold shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white"
            >
              {viewMode === 'normal' ? '🚀 Switch to Portfolio Mode' : '🖥️ Switch to Normal Mode'}
            </button>
          )}

          {/* Dynamic Navbar based on mode */}
          {!isDashboard && !isLoginPage && !isLauncher && (
            viewMode === 'portfolio' ? <NavbarEnhanced /> : <Navbar />
          )}
          
          <main className={`flex-1 ${!isDashboard && !isLoginPage && !isLauncher ? 'px-4 py-6 sm:px-6 lg:px-10' : ''}`}>
            <Routes>
              {/* Launcher Route */}
              <Route path="/select-version" element={<Launcher setViewMode={setViewMode} />} />

              {/* Dynamic Login based on mode */}
              <Route path="/login" element={viewMode === 'portfolio' ? <LoginEnhanced /> : <Login />} />
              
              {/* Common routes */}
              <Route path="/" element={<Home />} />

              {/* Protected role-based dashboards */}
              <Route path="/dashboard/student" element={<ProtectedRoute requiredRoles={['student']}><DashboardLayout role="student"><StudentDashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/dashboard/faculty" element={<ProtectedRoute requiredRoles={['faculty']}><DashboardLayout role="faculty"><FacultyDashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/dashboard/hod" element={<ProtectedRoute requiredRoles={['hod']}><DashboardLayout role="hod"><HODDashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/dashboard/admin" element={<ProtectedRoute requiredRoles={['admin']}><DashboardLayout role="admin"><AdminDashboard /></DashboardLayout></ProtectedRoute>} />
              
              {/* Modules */}
              <Route path="/jobs" element={<ProtectedRoute><DashboardLayout role="student"><JobPortal /></DashboardLayout></ProtectedRoute>} />
              <Route path="/market-intelligence" element={<ProtectedRoute><DashboardLayout role="student"><MarketIntelligence /></DashboardLayout></ProtectedRoute>} />
              <Route path="/sports" element={<ProtectedRoute><DashboardLayout role="student"><SportsDashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/student-lookup" element={<ProtectedRoute requiredRoles={['admin', 'faculty', 'hod']}><DashboardLayout role="faculty"><StudentLookup /></DashboardLayout></ProtectedRoute>} />
              <Route path="/upload-syllabus" element={<ProtectedRoute requiredRoles={['faculty', 'hod', 'admin']}><DashboardLayout role="hod"><SyllabusAnalysisPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/upload" element={<ProtectedRoute><DashboardLayout role="faculty"><Upload /></DashboardLayout></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><DashboardLayout role="admin"><Analytics /></DashboardLayout></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/skills-gap" element={<ProtectedRoute requiredRoles={['student']}><DashboardLayout role="student"><SkillsGapAnalysis /></DashboardLayout></ProtectedRoute>} />
              <Route path="/job-tracker" element={<ProtectedRoute requiredRoles={['student', 'job-tracer']}><DashboardLayout role="student"><JobApplicationTracker /></DashboardLayout></ProtectedRoute>} />
              <Route path="/roadmap" element={<ProtectedRoute requiredRoles={['student']}><DashboardLayout role="student"><Roadmap /></DashboardLayout></ProtectedRoute>} />
              <Route path="/mentor-connect" element={<ProtectedRoute requiredRoles={['student']}><DashboardLayout role="student"><MentorConnect /></DashboardLayout></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute requiredRoles={['student']}><DashboardLayout role="student"><Leaderboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/career-prediction" element={<ProtectedRoute requiredRoles={['student']}><DashboardLayout role="student"><CareerPrediction /></DashboardLayout></ProtectedRoute>} />
               <Route path="/resume-optimizer" element={<ProtectedRoute requiredRoles={['student']}><DashboardLayout role="student"><ResumeOptimizer /></DashboardLayout></ProtectedRoute>} />
              <Route path="/curriculum-planner" element={<ProtectedRoute requiredRoles={['faculty', 'hod', 'admin']}><DashboardLayout role="faculty"><CurriculumPlanner /></DashboardLayout></ProtectedRoute>} />
              <Route path="/support" element={<ProtectedRoute requiredRoles={['student', 'faculty', 'hod', 'admin']}><DashboardLayout role="student"><Support /></DashboardLayout></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {!isDashboard && !isLoginPage && !isLauncher && <Footer />}
        </div>
      )}
    </AuthProvider>
  );
}

export default App;
