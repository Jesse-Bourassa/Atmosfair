// src/pages/Auth/LoginPage.jsx

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

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
        backgroundColor: '#121212',
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

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;