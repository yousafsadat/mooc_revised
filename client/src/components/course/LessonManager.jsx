import React, { useState } from 'react';
import { Typography, Paper, Button } from '@mui/material';
import LessonForm from './LessonForm';

const LessonManager = ({ course, onBack }) => {
  const [lessons, setLessons] = useState(course.lessons || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (newLesson) => {
    setLessons([...lessons, newLesson]);
    setShowForm(false);
  };

  const handleEdit = (updatedLesson) => {
    const updated = [...lessons];
    updated[editingIndex] = updatedLesson;
    setLessons(updated);
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleDelete = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <Typography variant="h5" className="text-black font-bold">
        Lessons for: {course.title}
      </Typography>

      <Button variant="outlined" onClick={onBack}>
        Back to Course Manager
      </Button>

      {!showForm && (
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Add Lesson
          </Button>
        </div>
      )}

      {showForm && (
        <LessonForm
          onSubmit={editingIndex !== null ? handleEdit : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          defaultValues={editingIndex !== null ? lessons[editingIndex] : {}}
        />
      )}

      {lessons.length > 0 && (
        <div className="grid gap-4">
          {lessons.map((lesson, index) => (
            <Paper key={index} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Typography className="font-semibold text-black">
                  {lesson.title}
                </Typography>
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => startEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">{lesson.content}</p>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonManager;
