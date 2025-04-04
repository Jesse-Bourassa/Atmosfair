// src/pages/Auth/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    // Later: call your backend endpoint to send reset email or token
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
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Send Reset Link
          </Button>
        </form>
        <Box
                      component={Link}
                      to="/login"
                      sx={{
                        color: '#90caf9',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        '&:hover': { color: 'primary' },
                        display: 'inline',
                      }}
                    >
                      Back to login
                    </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;