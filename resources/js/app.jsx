import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import TaskList from './TaskList';
import Login from './Login';
import { Container, IconButton, Box } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ maxHeight: '100vh'}}>
      {isAuthenticated && (
        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <IconButton onClick={handleLogout} color="primary">
            <ExitToAppIcon />
          </IconButton>
        </Box>
      )}

      {isAuthenticated ? (
        <TaskList />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Container>

  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
