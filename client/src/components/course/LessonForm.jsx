import React, { useState } from 'react';
import { Button, TextField, Paper } from '@mui/material';

const LessonForm = ({ onSubmit, onCancel, defaultValues = {} }) => {
  const [lesson, setLesson] = useState({
    title: defaultValues.title || '',
    content: defaultValues.content || '',
  });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lesson.title && lesson.content) {
      onSubmit(lesson);
    }
  };

  return (
    <Paper className="p-4 mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Lesson Title"
          name="title"
          fullWidth
          required
          value={lesson.title}
          onChange={handleChange}
        />
        <TextField
          label="Lesson Content"
          name="content"
          fullWidth
          multiline
          rows={4}
          required
          value={lesson.content}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-3">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default LessonForm;
