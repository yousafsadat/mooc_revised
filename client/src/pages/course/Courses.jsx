import React from 'react';
import courses from '../../dummy/courses';
import { Button } from '@mui/material';

const Courses = () => {
  return (
    <div className="bg-white text-black min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Our Courses</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our professionally designed courses for students, instructors, and lifelong learners.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-50 border rounded-xl shadow-sm hover:shadow-md transition p-6">
              <h2 className="text-xl font-semibold mb-2 text-blue-700">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
              <p className="text-xs text-gray-500 italic mb-1">Instructor: {course.instructor}</p>
              <span className="inline-block text-xs text-white bg-blue-500 px-3 py-1 rounded-full">
                {course.category}
              </span>
              <div className="mt-4">
                <Button variant="contained" size="small" color="primary" fullWidth>
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
