import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Container
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mainPhone: '',
    telephone: '',
    address: '',
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
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      alert('Signup successful!');
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
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        px: 2
      }}
    >
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* New Logo Card Design */}
        <Box
          sx={{
            background: "radial-gradient(circle at center, white 20%, #1e1e1e 70%)",
            padding: 4,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 10,
            mb: 4,
            width: { xs: 200, sm: 240, md: 280 },
            height: { xs: 200, sm: 240, md: 280 },
          }}
        >
          <Box
            component="img"
            src="/Logo3.png"
            alt="Atmosfair Logo"
            sx={{
              width: "130%",
              height: "auto",
            }}
          />
        </Box>
        
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 650,
            backgroundColor: '#2c2c2c',
            color: 'white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
            mb: 4
          }}
        >  
          <Typography variant="h5" gutterBottom align="center">
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Main Phone Number"
                  name="mainPhone"
                  value={form.mainPhone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telephone Phone Number"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Sign Up
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2, color: 'gray' }}>
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
    </Box>
  );
};

export default SignUp;
