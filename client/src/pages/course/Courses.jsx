import React, { useState } from 'react';
import courses from '../../dummy/courses';
import { Button, Chip } from '@mui/material';
import { Star } from '@mui/icons-material';
import Navbar from '../../components/common/Navbar'; // Add this import

const statusColors = {
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-blue-100 text-blue-700',
  Dropped: 'bg-red-100 text-red-700',
};

const Courses = () => {
  const [filter, setFilter] = useState('All');

  const filteredCourses =
    filter === 'All'
      ? courses
      : courses.filter((course) => course.status === filter);

  const filters = ['All', 'Active', 'Completed', 'Dropped'];

  return (
    <div className="bg-white text-black px-6 py-20 min-h-screen">
      <Navbar /> {/* Add Navbar at the top */}
      <div className="max-w-7xl mx-auto">
        {/* Heading + Filters + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
            <div className="flex gap-3 flex-wrap">
              {filters.map((status) => (
                <Chip
                  key={status}
                  label={status + ' Courses'}
                  onClick={() => setFilter(status)}
                  color={filter === status ? 'primary' : 'default'}
                  variant={filter === status ? 'filled' : 'outlined'}
                />
              ))}
            </div>
          </div>

          {/* Search (placeholder only) */}
          <input
            type="text"
            placeholder="Search courses..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`rounded-xl shadow-sm hover:shadow-md transition overflow-hidden`}
            >
              {/* Gradient Header */}
              <div
                className={`h-28 flex items-center justify-center text-white text-lg font-semibold ${
                  course.color || 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}
              >
                {course.title}
              </div>

              {/* Content */}
              <div className="p-5 bg-white flex flex-col justify-between h-[260px]">
                {/* Status */}
                <div className="mb-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[course.status] || 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-semibold mb-1 text-gray-900">{course.title}</h2>

                {/* Progress Bar */}
                <div className="mb-2">
                  <p className="text-xs text-gray-500 mb-1">Progress</p>
                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div
                      className={`h-2 rounded ${
                        course.status === 'Completed'
                          ? 'bg-green-500'
                          : course.status === 'Dropped'
                          ? 'bg-red-400'
                          : 'bg-blue-400'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>
                    👥 {course.students.toLocaleString()} students
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500" fontSize="small" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4">
                  <Button
                    variant="text"
                    color="primary"
                    size="small"
                    fullWidth
                  >
                    {course.status === 'Completed' ? 'View Certificate' : 'Continue'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
