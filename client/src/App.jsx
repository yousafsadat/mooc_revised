import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginSignupForm from './pages/auth/LoginSignupForm';
import { useAuth } from './context/AuthContext';

import StudentDashboard from './pages/dashboard/StudentDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DashboardLayout from './components/layout/DashboardLayout';

const App = () => {
  const { currentUser } = useAuth();

  const renderDashboard = () => {
    switch (currentUser?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'instructor':
        return <InstructorDashboard />;
      case 'student':
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginSignupForm />} />
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <DashboardLayout>{renderDashboard()}</DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
