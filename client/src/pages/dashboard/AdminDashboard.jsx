import React, { useState } from 'react';
import usersData from '../../dummy/users';
import Paper from '@mui/material/Paper';
import { Typography, MenuItem, Select, FormControl } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const AdminDashboard = () => {
  const [users, setUsers] = useState(usersData);

  const roleData = [
    { name: 'Student', value: users.filter(u => u.role === 'student').length },
    { name: 'Instructor', value: users.filter(u => u.role === 'instructor').length },
    { name: 'Admin', value: users.filter(u => u.role === 'admin').length },
  ];

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
      {/* Analytics Block */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-black mb-4">Platform Overview</h2>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-5 border">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border">
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="text-2xl font-bold text-blue-600">6</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border">
            <p className="text-sm text-gray-500">Total Enrollments</p>
            <p className="text-2xl font-bold text-blue-600">20</p>
          </div>
        </div>

        {/* Pie Chart for User Roles */}
        <div className="bg-white rounded-lg shadow p-5 border">
          <h3 className="text-lg font-semibold text-black mb-4">Users by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

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
