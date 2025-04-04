// src/pages/Auth/SignUp.jsx

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword, 
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }
  
      alert('Signup successful!');
      // Optionally redirect user to login page:
      navigate('/login');
    } catch (err) {
      alert(err.message);
      console.error('Signup error:', err);
    }
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
          backgroundColor: '#2c2c2c',
          color: 'white',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
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
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
           <Typography
                       variant="body2"
                       align="center"
                       sx={{ mt: 2, color: 'gray' }}
                     >
                       Already have an account?{' '}
                       <Box
              component={Link}
              to="/login"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': { color: '#90caf9' },
                display: 'inline',
              }}
            >
              Login here
            </Box>
                     </Typography>
        </form>
        
      </Paper>
      
    </Box>
  );
};

export default SignUp;