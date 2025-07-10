import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';

const CourseForm = ({ onSubmit, onCancel, defaultValues = {} }) => {
  const [form, setForm] = useState({
    title: defaultValues.title || '',
    description: defaultValues.description || '',
    instructor: defaultValues.instructor || '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.description) {
      onSubmit(form);
    }
  };

  return (
    <Paper className="p-6 max-w-xl mx-auto mt-4">
      <Typography variant="h6" className="text-black font-semibold mb-4">
        {defaultValues.title ? 'Edit Course' : 'Add New Course'}
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Course Title"
          name="title"
          fullWidth
          required
          value={form.title}
          onChange={handleChange}
        />

        <TextField
          label="Course Description"
          name="description"
          fullWidth
          multiline
          rows={3}
          required
          value={form.description}
          onChange={handleChange}
        />

        <TextField
          label="Instructor Name"
          name="instructor"
          fullWidth
          required
          value={form.instructor}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default CourseForm;
