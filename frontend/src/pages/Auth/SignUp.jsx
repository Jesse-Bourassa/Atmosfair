import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { apiUrl } from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mainPhone: "",
    telephone: "",
    address: "",
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
      const res = await fetch(apiUrl("/api/auth/signup"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
      console.error("Signup error:", err);
    }
  };

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      color: "#fff",
      background: "rgba(255,255,255,0.08)",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.12)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.22)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4fa3ff",
        boxShadow: "0 0 0 3px rgba(79,163,255,0.10)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#9fb2c8",
      fontWeight: 600,
      fontSize: { xs: "0.92rem", sm: "1rem" },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#7fb3ff",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(255,255,255,0.45)",
      opacity: 1,
      fontSize: { xs: "0.95rem", sm: "1rem" },
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.08) inset",
      WebkitTextFillColor: "#fff",
      borderRadius: "14px",
      transition: "background-color 9999s ease-in-out 0s",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        px: { xs: 1.2, sm: 2 },
        pt: { xs: 1.5, sm: 2.5, md: 4 },
        pb: { xs: 2.5, sm: 4, md: 4 },
        background: `
          radial-gradient(circle at top left, rgba(58,123,213,0.18), transparent 28%),
          radial-gradient(circle at bottom right, rgba(79,163,255,0.14), transparent 30%),
          linear-gradient(180deg, #07111c 0%, #0b1420 45%, #0a1018 100%)
        `,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0))",
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: { xs: 390, sm: 560, md: 900 },
          mx: "auto",
          px: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 0.9, sm: 1.2 },
          }}
        >
          <Box
            sx={{
              width: { xs: 88, sm: 110, md: 175 },
              height: { xs: 88, sm: 110, md: 175 },
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.82) 0%, rgba(220,232,248,0.62) 52%, rgba(160,185,215,0.22) 100%)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
            }}
          >
            <Box
              component="img"
              src="/Logo3.png"
              alt="Atmosfair Logo"
              sx={{
                width: { xs: "70%", sm: "74%" },
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4.5 },
            width: "100%",
            maxWidth: { xs: 340, sm: 520, md: 760 },
            mx: "auto",
            borderRadius: { xs: "18px", sm: "22px", md: "24px" },
            background: "rgba(20, 28, 40, 0.68)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.38)",
            color: "#fff",
          }}
        >
          <Typography
            sx={{
              color: "#88a8c9",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: { xs: "0.68rem", sm: "0.78rem" },
              textAlign: "center",
              mb: 0.8,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              color: "#f8fafc",
              fontWeight: 800,
              textAlign: "center",
              fontSize: { xs: "1.45rem", sm: "1.8rem", md: "2.2rem" },
              lineHeight: 1.08,
              mb: 0.8,
            }}
          >
            Join Atmosfair
          </Typography>

          <Typography
            sx={{
              color: "#cbd5e1",
              textAlign: "center",
              fontSize: { xs: "0.92rem", sm: "0.98rem" },
              lineHeight: { xs: 1.55, sm: 1.7 },
              maxWidth: "560px",
              mx: "auto",
              mb: { xs: 2, sm: 3.2 },
              px: { xs: 0.4, sm: 0 },
            }}
          >
            Create your account to request HVAC services, manage your details,
            and stay connected with Atmosfair.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: 1.4, sm: 2.2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={fieldStyles}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={fieldStyles}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Main Phone Number"
                  name="mainPhone"
                  placeholder="Enter your main phone number"
                  value={form.mainPhone}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={fieldStyles}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telephone Phone Number"
                  name="telephone"
                  placeholder="Enter your telephone number"
                  value={form.telephone}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={fieldStyles}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  placeholder="Enter your address"
                  value={form.address}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={fieldStyles}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={fieldStyles}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={fieldStyles}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: { xs: 2.2, sm: 3 },
                py: { xs: 1.1, sm: 1.35 },
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                background: "linear-gradient(90deg,#3a7bd5,#4fa3ff)",
                boxShadow: "0 0 18px rgba(0,170,255,0.22)",
                "&:hover": {
                  background: "linear-gradient(90deg,#346ec0,#4597eb)",
                },
              }}
            >
              Sign Up
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: { xs: 2, sm: 3 },
                color: "#9fb2c8",
                fontSize: { xs: "0.88rem", sm: "0.96rem" },
                lineHeight: 1.6,
              }}
            >
              Already have an account?{" "}
              <Box
                component={Link}
                to="/login"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline",
                  "&:hover": {
                    color: "#7fb3ff",
                    textDecoration: "underline",
                  },
                }}
              >
                Login here
              </Box>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
