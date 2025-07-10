import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role;

  const baseLinks = [
    { label: 'Dashboard', icon: <DashboardIcon />, visibleTo: ['student', 'instructor', 'admin'] },
  ];

  const studentLinks = [
    { label: 'My Courses', icon: <BookIcon /> },
    { label: 'Certificates', icon: <VerifiedIcon /> },
  ];

  const instructorLinks = [
    { label: 'Manage Courses', icon: <BookIcon /> },
    { label: 'Enrollments', icon: <GroupIcon /> },
  ];

  const adminLinks = [
    { label: 'All Users', icon: <GroupIcon /> },
    { label: 'Role Manager', icon: <SettingsIcon /> },
  ];

  const getLinks = () => {
    if (role === 'student') return [...baseLinks, ...studentLinks];
    if (role === 'instructor') return [...baseLinks, ...instructorLinks];
    if (role === 'admin') return [...baseLinks, ...studentLinks, ...instructorLinks, ...adminLinks];
    return baseLinks;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-6 text-black">MOOC Platform</h2>
      <ul className="space-y-3">
        {getLinks().map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
