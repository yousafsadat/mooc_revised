import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginSignupForm from './pages/auth/LoginSignupForm';
import DashboardLayout from './components/layout/DashboardLayout';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

const App = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginSignupForm />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'instructor':
        return <InstructorDashboard />;
      case 'student':
      default:
        return <StudentDashboard />;
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
};

export default App;
