import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

const CourseManager = ({ courses, onAdd }) => {
  return (
    <div>
      <Typography variant="h5" className="text-black font-bold mb-4">
        Manage Courses
      </Typography>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {courses.map((course) => (
          <Paper key={course.id} className="p-6 space-y-3">
            <Typography variant="h6" className="text-black">
              {course.title}
            </Typography>
            <p className="text-sm text-gray-600">{course.description}</p>
            <p className="text-sm text-gray-500">
              Lessons: {course.lessons?.length || 0} | Enrollments: {course.students?.length || 0}
            </p>
            <div className="flex gap-3 mt-2">
              <Button variant="outlined" size="small" color="primary">
                Edit
              </Button>
              <Button variant="outlined" size="small" color="secondary">
                Manage Lessons
              </Button>
              <Button variant="outlined" size="small" color="error">
                Delete
              </Button>
            </div>
          </Paper>
        ))}
      </div>

      <Button variant="contained" color="primary" onClick={onAdd}>
        Add New Course
      </Button>
    </div>
  );
};

export default CourseManager;
