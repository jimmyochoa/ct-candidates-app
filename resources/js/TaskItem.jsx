import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Stack, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onDelete }) => {
    const [taskStatus, setTaskStatus] = useState(task.status);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.checked ? 'completed' : 'pending';

        setTaskStatus(newStatus);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
            setTaskStatus(task.status);
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: '6px',
                paddingY: 1,
                paddingX: 2,
                marginBottom: 1,
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.03)',
                backgroundColor: '#ffffff',
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Checkbox
                        checked={taskStatus === 'completed'}
                        onChange={handleStatusChange}
                        size="small"
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            textDecoration: taskStatus === 'completed' ? 'line-through' : 'none',
                            fontSize: '0.95rem',
                        }}
                    >
                        {task.title}
                    </Typography>
                </Stack>
                <IconButton
                    onClick={() => onDelete(task.id)}
                    color="error"
                    size="small"
                    sx={{
                        padding: 0.5,
                        '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' },
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        </Card>

    );
};

export default TaskItem;
