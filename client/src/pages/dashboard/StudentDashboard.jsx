import React, { useState } from 'react';
import courses from '../../dummy/courses';
import enrollmentsData from '../../dummy/enrollments';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis
} from 'recharts';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState(enrollmentsData);

  // Analytics setup
  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter((e) => e.progress === 100).length;
  const certificateData = [
    {
      name: 'Approved',
      value: enrollments.filter((e) => e.certificateStatus === 'approved').length,
    },
    {
      name: 'Pending',
      value: enrollments.filter((e) => e.certificateStatus === 'pending').length,
    },
    {
      name: 'Rejected',
      value: enrollments.filter((e) => e.certificateStatus === 'rejected').length,
    },
  ];
  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const isEnrolled = (courseId) => enrollments.some((e) => e.courseId === courseId);

  const handleEnroll = (courseId) => {
    if (!isEnrolled(courseId)) {
      setEnrollments((prev) => [
        ...prev,
        { courseId, progress: 0, certificateStatus: 'pending' },
      ]);
    }
  };

  const getCertificateIcon = (status) => {
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

  return (
    <div className="space-y-10">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 border">
          <p className="text-sm text-gray-500">Enrolled Courses</p>
          <p className="text-2xl font-bold text-blue-600">{totalCourses}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5 border">
          <p className="text-sm text-gray-500">Completed Courses</p>
          <p className="text-2xl font-bold text-green-600">{completedCourses}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5 border">
          <p className="text-sm text-gray-500">Certificates</p>
          <p className="text-2xl font-bold text-yellow-600">{enrollments.length}</p>
        </div>
      </div>

      {/* Certificates Pie Chart */}
      <section>
        <h2 className="text-2xl font-bold text-black mb-4">Certificate Status</h2>
        <div className="bg-white p-5 rounded-lg border shadow">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={certificateData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {certificateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Course Progress Chart */}
      <section>
        <h2 className="text-2xl font-bold text-black mb-4">My Course Progress</h2>
        <div className="bg-white p-5 rounded-lg border shadow">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={enrollments.map((e) => {
                const course = courses.find((c) => c.id === e.courseId);
                return {
                  name: course?.title || 'Course',
                  progress: e.progress,
                };
              })}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Available Courses */}
      <section>
        <h2 className="text-2xl font-bold text-black mb-4">Available Courses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const enrolled = isEnrolled(course.id);
            return (
              <div key={course.id} className="bg-white rounded-lg shadow p-6 border">
                <h3 className="text-lg font-semibold text-black">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                <p className="text-sm text-gray-400 mb-4">Instructor: {course.instructor}</p>
                <button
                  disabled={enrolled}
                  onClick={() => handleEnroll(course.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    enrolled
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {enrolled ? 'Enrolled' : 'Enroll'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enrolled Courses with Progress */}
      <section>
        <h2 className="text-2xl font-bold text-black mb-4">My Enrolled Courses</h2>
        <div className="space-y-6">
          {enrollments.map((enroll) => {
            const course = courses.find((c) => c.id === enroll.courseId);
            if (!course) return null;
            return (
              <div
                key={enroll.courseId}
                className="bg-white p-4 rounded-lg shadow border flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black">{course.title}</h3>
                  <span className="text-sm text-gray-500">
                    {enroll.progress}% complete
                  </span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={enroll.progress}
                  color="primary"
                  className="rounded h-3"
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
