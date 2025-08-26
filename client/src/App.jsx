// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth
// import { useParams } from "react-router-dom";

// Import your pages/components
import LandingPage from './pages/LandingPage';
import LoginSignupForm from './pages/auth/LoginSignupForm';
import About from './pages/About';
import Courses from './pages/course/Courses'; 
import LectureContent from './pages/course/LectureContent';

// Dashboard components
import StudentDashboard from './pages/dashboard/StudentDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DashboardLayout from './components/layout/DashboardLayout'; // Your layout component

//Registration Form
import StudentRegistration from './pages/dashboard/student/StudentRegistration';

// --- New: Unauthorized Page Component ---
const Unauthorized = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-gray-700 mb-6">You do not have permission to access this page.</p>
      <button
        onClick={() => window.history.back()} // Go back to previous page
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Go Back
      </button>
    </div>
  </div>
);

// --- New: PrivateRoute Component for Protected Routes ---
const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  // Show a loading indicator while authentication status is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading authentication...
      </div>
    );
  }

  // If not logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles are specified, check if the current user's role is among them
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Logged in, but unauthorized role, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // User is logged in and has the required role (or no specific roles required)
  return children;
};

const App = () => {
  // The useAuth() hook is now called inside the component, but it will only work
  // if App is rendered inside AuthProvider. So, we move AuthProvider up.
  // We'll still use currentUser here for the renderDashboard logic.
  const { currentUser } = useAuth(); // This hook call will now correctly get context values

  const renderDashboardComponent = () => {
    switch (currentUser?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'instructor':
        return <InstructorDashboard />;
      case 'student':
      default: // Default to student dashboard if role is student or undefined/other
        return <StudentDashboard />;
    }
  };

  return (
    <Router>
      {/* --- CRITICAL FIX: Wrap your entire Routes with AuthProvider --- */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignupForm />} /> {/* Your login/signup form */}
          <Route path="/courses" element={<Courses />} /> {/* Public courses page, if any */}
          <Route path="/unauthorized" element={<Unauthorized />} /> {/* New Unauthorized page */}
          <Route path="/student/form" element={<StudentRegistration />} />
         <Route path="/courses/:courseId" element={<LectureContent />} />

          {/* Protected Dashboard Route (General) */}
          {/* This route will dynamically render the correct dashboard based on role */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={['student', 'instructor', 'admin']}>
                <DashboardLayout>
                  {renderDashboardComponent()}
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Specific Protected Dashboard Routes (for direct access/deep linking) */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/dashboard"
            element={
              <PrivateRoute allowedRoles={['instructor']}>
                <DashboardLayout>
                  <InstructorDashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <PrivateRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Catch-all for undefined routes - redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;