import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Stack, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Login
      </Typography>
      
      {/* Error message */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogin} 
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
      
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Don't have an account? <Button sx={{ textTransform: 'none' }} color="primary">Sign up</Button>
        </Typography>
      </Stack>
    </Container>
  );
};

export default Login;
