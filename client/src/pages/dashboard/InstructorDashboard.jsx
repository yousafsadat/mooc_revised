import React from 'react';
import instructorCourses from '../../dummy/instructorCourses';
import { Button, Typography, Paper } from '@mui/material';

const InstructorDashboard = () => {
  return (
    <div className="space-y-10">
      <section>
        <Typography variant="h5" className="text-black font-bold mb-4">
          My Created Courses
        </Typography>
        <div className="grid md:grid-cols-2 gap-6">
          {instructorCourses.map((course) => (
            <Paper key={course.id} elevation={3} className="p-6 space-y-3">
              <Typography variant="h6" className="text-black">
                {course.title}
              </Typography>
              <p className="text-sm text-gray-600">{course.description}</p>
              <p className="text-sm text-gray-400">
                Enrolled Students: {course.students.length}
              </p>
              <div className="flex gap-3 mt-2">
                <Button variant="outlined" color="primary" size="small">
                  View Lessons
                </Button>
                <Button variant="contained" color="primary" size="small">
                  Edit
                </Button>
                <Button variant="outlined" color="error" size="small">
                  Delete
                </Button>
              </div>
            </Paper>
          ))}
        </div>
      </section>

      <section>
        <Typography variant="h5" className="text-black font-bold mb-4">
          Add New Course (UI only)
        </Typography>
        <div className="bg-white p-6 rounded-lg shadow border">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Course Title"
              className="w-full px-4 py-2 border rounded text-gray-700"
            />
            <textarea
              rows={3}
              placeholder="Course Description"
              className="w-full px-4 py-2 border rounded text-gray-700"
            />
            <Button variant="contained" color="primary">
              Add Course
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboard;
