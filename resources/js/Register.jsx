import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Stack, Alert } from '@mui/material';

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('/api/register', form);
      onRegisterSuccess();
    } catch (err) {
      setError('Failed to register. Make sure the email is not already in use.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Sign Up
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>

      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Already have an account?{' '}
          <Button sx={{ textTransform: 'none' }} color="primary" onClick={onSwitchToLogin}>
            Login
          </Button>
        </Typography>
      </Stack>
    </Container>
  );
};

export default Register;
