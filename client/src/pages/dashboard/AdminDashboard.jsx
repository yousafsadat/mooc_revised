import React, { useState } from 'react';
import usersData from '../../dummy/users';
import Paper from '@mui/material/Paper';
import { Typography, MenuItem, Select, FormControl } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const AdminDashboard = () => {
  const [users, setUsers] = useState(usersData);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="text-green-500" />;
      case 'rejected':
        return <CancelIcon className="text-red-500" />;
      case 'pending':
      default:
        return <HourglassBottomIcon className="text-yellow-500" />;
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="space-y-10">
      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Paper className="p-6">
          <Typography variant="h6" className="text-black">
            Total Users
          </Typography>
          <p className="text-2xl font-bold text-blue-600">{users.length}</p>
        </Paper>
        <Paper className="p-6">
          <Typography variant="h6" className="text-black">
            Total Courses
          </Typography>
          <p className="text-2xl font-bold text-blue-600">6</p>
        </Paper>
        <Paper className="p-6">
          <Typography variant="h6" className="text-black">
            Total Enrollments
          </Typography>
          <p className="text-2xl font-bold text-blue-600">20</p>
        </Paper>
      </section>

      {/* User Management */}
      <section>
        <Typography variant="h5" className="text-black font-bold mb-4">
          Manage Users
        </Typography>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow text-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Role</th>
                <th className="px-4 py-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white hover:bg-gray-50 border">
                  <td className="px-4 py-2 border text-black">{user.name}</td>
                  <td className="px-4 py-2 border text-gray-600">{user.email}</td>
                  <td className="px-4 py-2 border">
                    <FormControl size="small" fullWidth>
                      <Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="instructor">Instructor</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                  <td className="px-4 py-2 border text-center">{getStatusIcon(user.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
