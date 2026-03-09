import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      setUser(data.user);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert(err.message);
      console.error("Login error:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        px: { xs: 1.5, sm: 2 },
        pt: { xs: 2, sm: 3, md: 10 },
        pb: { xs: 3, sm: 4, md: 8 },
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
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 0.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 1, sm: 1.4, md: 1.8 },
          }}
        >
          <Box
            sx={{
              width: { xs: 96, sm: 120, md: 175 },
              height: { xs: 96, sm: 120, md: 175 },
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
                width: { xs: "72%", sm: "74%" },
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
            p: { xs: 2.2, sm: 3, md: 4.5 },
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
              fontSize: { xs: "0.7rem", sm: "0.78rem" },
              textAlign: "center",
              mb: 0.8,
            }}
          >
            Account Access
          </Typography>

          <Typography
            sx={{
              color: "#f8fafc",
              fontWeight: 800,
              textAlign: "center",
              fontSize: { xs: "1.55rem", sm: "1.8rem", md: "2.2rem" },
              lineHeight: 1.1,
              mb: 0.8,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              color: "#cbd5e1",
              textAlign: "center",
              fontSize: { xs: "0.92rem", sm: "0.98rem" },
              lineHeight: { xs: 1.55, sm: 1.7 },
              maxWidth: "460px",
              mx: "auto",
              mb: { xs: 2.2, sm: 3.5 },
              px: { xs: 0.5, sm: 0 },
            }}
          >
            Sign in to access your Atmosfair account and manage your HVAC
            services with ease.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: "#9fb2c8",
                  fontWeight: 600,
                  "&.Mui-focused": {
                    color: "#7fb3ff",
                  },
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: "14px",
                  color: "#fff",
                  background: "rgba(255,255,255,0.08)",
                },
              }}
              sx={{
                mb: 1.1,
                "& .MuiOutlinedInput-root": {
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
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7fb3ff",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.08) inset",
                  WebkitTextFillColor: "#fff",
                  borderRadius: "14px",
                  transition: "background-color 9999s ease-in-out 0s",
                },
              }}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: "#9fb2c8",
                  fontWeight: 600,
                  "&.Mui-focused": {
                    color: "#7fb3ff",
                  },
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: "14px",
                  color: "#fff",
                  background: "rgba(255,255,255,0.08)",
                },
              }}
              sx={{
                mb: 1.1,
                "& .MuiOutlinedInput-root": {
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
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7fb3ff",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.08) inset",
                  WebkitTextFillColor: "#fff",
                  borderRadius: "14px",
                  transition: "background-color 9999s ease-in-out 0s",
                },
              }}
            />

            <Typography
              variant="body2"
              align="right"
              sx={{
                mt: 0.8,
                mb: 2,
                color: "#9fb2c8",
                fontSize: { xs: "0.84rem", sm: "0.95rem" },
                "& a": {
                  color: "#7fb3ff",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "0.2s ease",
                  "&:hover": {
                    color: "#a8ccff",
                    textDecoration: "underline",
                  },
                },
              }}
            >
              <Link to="/forgot-password">Forgot password?</Link>
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: { xs: 1.15, sm: 1.35 },
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
              Log In
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2.2,
                color: "#9fb2c8",
                fontSize: { xs: "0.88rem", sm: "0.96rem" },
                lineHeight: 1.6,
              }}
            >
              Don’t have an account?{" "}
              <Box
                component={Link}
                to="/signup"
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
                Sign up here
              </Box>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
