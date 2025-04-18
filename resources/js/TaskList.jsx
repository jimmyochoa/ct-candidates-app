import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import {
  Button,
  Stack,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Card,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const loadTasks = async () => {
    setInitialLoading(true);
    const res = await axios.get('/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTasks(res.data);
    setInitialLoading(false);
  };

  const deleteTask = async (id) => {
    setSubmitting(true);
    await axios.delete(`/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    await loadTasks();
    setSubmitting(false);
  };

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === '') return;
    setSubmitting(true);
    await axios.post(
      '/api/tasks',
      { title: newTaskTitle },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    await loadTasks();
    setNewTaskTitle('');
    setSubmitting(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        maxHeight: '100vh',
        paddingTop: 4,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 480,
          padding: 2,
          borderRadius: '12px',
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.06),
            0 4px 8px rgba(0,0,0,0.06),
            0 8px 16px rgba(0,0,0,0.05)
          `,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
          Task List
        </Typography>

        {/* Input para agregar tareas */}
        <Stack direction="row" spacing={1} alignItems="center" marginBottom={2}>
          <TextField
            placeholder="Add task..."
            variant="outlined"
            fullWidth
            size="small"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            disabled={submitting}
          />
          <IconButton
            onClick={handleAddTask}
            disabled={submitting}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              '&:hover': { backgroundColor: '#1565c0' },
              borderRadius: '50%',
              padding: 1,
            }}
          >
            {submitting ? (
              <CircularProgress size={20} sx={{ color: 'white' }} />
            ) : (
              <AddIcon fontSize="small" />
            )}
          </IconButton>
        </Stack>

        {/* Loading al iniciar */}
        {initialLoading ? (
          <Box display="flex" justifyContent="center" padding={2}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <Stack spacing={1}>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
};


export default TaskList;
