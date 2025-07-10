import React, { useState } from 'react';
import instructorCourses from '../../dummy/instructorCourses';
import CourseManager from '../../components/course/CourseManager';
import CourseForm from '../../components/course/CourseForm';
import LessonManager from '../../components/course/LessonManager';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const InstructorDashboard = () => {
  const [view, setView] = useState('course-manager'); // Defaulting to course-manager for quick testing
  const [courses, setCourses] = useState(instructorCourses);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="space-y-10 px-6 pt-6">
      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 text-sm rounded ${
            view === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => {
            setView('dashboard');
            setShowForm(false);
            setSelectedCourse(null);
          }}
        >
          Dashboard View
        </button>
        <button
          className={`px-4 py-2 text-sm rounded ${
            view === 'course-manager' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => {
            setView('course-manager');
            setShowForm(false);
            setSelectedCourse(null);
          }}
        >
          Course Manager
        </button>
      </div>

      {/* Enhanced Dashboard View with Analytics */}
      {view === 'dashboard' && (
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-black mb-4">Instructor Overview</h2>

          {/* Summary Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-5 border">
              <p className="text-sm text-gray-500">My Courses</p>
              <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5 border">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">
                {courses.reduce((total, course) => total + (course.students?.length || 0), 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-5 border">
              <p className="text-sm text-gray-500">Lessons Created</p>
              <p className="text-2xl font-bold text-blue-600">
                {courses.reduce((total, course) => total + (course.lessons?.length || 0), 0)}
              </p>
            </div>
          </div>

          {/* Bar Chart: Students per Course */}
          <div className="bg-white rounded-lg shadow p-5 border">
            <h3 className="text-lg font-semibold text-black mb-4">Students per Course</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={courses.map(c => ({
                name: c.title,
                students: c.students?.length || 0
              }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* View: Course Manager */}
      {view === 'course-manager' && (
        <>
          {selectedCourse ? (
            <LessonManager
              course={selectedCourse}
              onBack={() => setSelectedCourse(null)}
            />
          ) : (
            <>
              {!showForm && (
                <CourseManager
                  courses={courses}
                  onAdd={() => setShowForm(true)}
                  onManageLessons={(course) => {
                    console.log('Selected course:', course);
                    setSelectedCourse(course);
                  }}
                />
              )}
              {showForm && (
                <CourseForm
                  onSubmit={(newCourse) => {
                    setCourses((prev) => [
                      ...prev,
                      { id: Date.now().toString(), lessons: [], ...newCourse }
                    ]);
                    setShowForm(false);
                  }}
                  onCancel={() => setShowForm(false)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InstructorDashboard;
