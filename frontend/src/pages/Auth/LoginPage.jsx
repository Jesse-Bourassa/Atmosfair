// src/pages/Auth/LoginPage.jsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: validate + call backend here
    console.log('Login form submitted:', form);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1e1e1e',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#1e1e1e',
          color: 'white',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Welcome Back
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>

          {/* Link to Sign Up */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: 'gray' }}
          >
            Don’t have an account?{' '}
            <Box
              component={Link}
              to="/signup"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': { color: '#90caf9' },
                display: 'inline',
              }}
            >
              Sign up here
            </Box>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;