import React, { useState } from "react";
import usersData from "../../dummy/users";
import Paper from "@mui/material/Paper";
import { Typography, MenuItem, Select, FormControl, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import studentLogs (dummy data we made earlier)
import studentLogs from "../../dummy/studentLogs";
import DownloadIcon from "@mui/icons-material/Download";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const AdminDashboard = () => {
  const [users, setUsers] = useState(usersData);

  const roleData = [
    {
      name: "Student",
      value: users.filter((u) => u.role === "student").length,
    },
    {
      name: "Instructor",
      value: users.filter((u) => u.role === "instructor").length,
    },
    { name: "Admin", value: users.filter((u) => u.role === "admin").length },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="text-green-500" />;
      case "rejected":
        return <CancelIcon className="text-red-500" />;
      case "pending":
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

  const handleDownloadLogs = () => {
    // Convert the data to a string format
    const dataStr = JSON.stringify(studentLogs, null, 2);
    
    // Create a blob
    const blob = new Blob([dataStr], { type: "text/plain" });
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `student_logs_${new Date().toLocaleDateString()}.txt`;
    link.href = url;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Analytics Block */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Platform Overview</h2>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 mb-2">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 mb-2">Total Courses</p>
            <p className="text-3xl font-bold text-blue-600">6</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 mb-2">Total Enrollments</p>
            <p className="text-3xl font-bold text-blue-600">20</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Users by Role
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
                className="focus:outline-none"
              >
                {roleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Management Section */}
      <section className="space-y-4">
        <Typography variant="h5" className="text-gray-800 font-bold">
          Manage Users
        </Typography>
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FormControl size="small" fullWidth>
                      <Select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="text-sm"
                      >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="instructor">Instructor</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {getStatusIcon(user.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Student Logs Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <Typography variant="h5" className="text-gray-800 font-bold">
            Student Logs
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadLogs}
            className="bg-blue-600 hover:bg-blue-700"
            size="small"
          >
            Download Logs
          </Button>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Education
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Prev Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Reg Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentLogs.map((s) => (
                <tr key={s.user_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {s.user_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {s.email_add}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {s.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {s.highest_education}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {s.studied_credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {s.prev_grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {s.registration_date}
                  </td>
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
