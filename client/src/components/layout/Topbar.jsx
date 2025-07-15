import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Topbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const roleColorMap = {
    student: 'bg-yellow-500',
    instructor: 'bg-blue-500',
    admin: 'bg-green-500',
  };

  // Ensure currentUser and currentUser.role exist before accessing role
  const roleBadge = roleColorMap[currentUser?.role] || 'bg-gray-400';

  const handleLogout = () => {
    logout();         // Clears auth context (and localStorage via useEffect in context)
    navigate('/');    // Redirects to landing page
  };

  // Add a conditional render check for currentUser
  // If currentUser is null (not logged in), don't render user-specific parts of the Topbar
  if (!currentUser) {
    // You might want to render a different topbar or nothing if not logged in
    // For now, returning null for a simple case, adjust as per your UI/UX needs.
    // Or consider moving this Topbar component inside a protected route or layout.
    return null;
  }

  return (
    <header className="bg-white shadow px-6 py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* Title */}
        <h1 className="text-xl font-semibold text-black">MOOC Platform</h1>

        {/* Right: Notification + User Info */}
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <button className="relative">
            <NotificationsIcon className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              {/* --- CHANGE IS HERE --- */}
              <p className="text-sm font-medium text-black">{currentUser.username}</p>
              {/* --- END CHANGE --- */}
              <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
            </div>
            <span className={`w-3 h-3 rounded-full ${roleBadge}`} />
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;