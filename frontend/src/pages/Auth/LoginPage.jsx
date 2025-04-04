// src/pages/Auth/LoginPage.jsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useAuth();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Add this
      localStorage.setItem('token', data.token);   
      setUser(data.user);
      alert('Login successful!');
      navigate('/'); // 👈 Redirect to home page
    } catch (err) {
      alert(err.message);
      console.error('Login error:', err);
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
<Typography
  variant="body2"
  align="right"
  sx={{
    mt: 1,
    color: 'gray',
    '& a': {
      color: '#90caf9',
      textDecoration: 'none',
      fontWeight: 'bold',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }}
>
  <Link to="/forgot-password">Forgot password?</Link>
</Typography>

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