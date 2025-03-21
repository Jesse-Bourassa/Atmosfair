import React from "react";
import { Box, Typography, Container, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme

import Hero from "../components/Hero";

const Home = () => {
  const theme = useTheme(); // Use the theme

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
          Welcome to Atmosfair, a trusted name in HVAC solutions.
          We specialize in **heating, cooling, and ventilation systems** for
          both residential and commercial properties. Our mission is to provide
          **reliable, energy-efficient, and affordable services** to keep your
          space comfortable all year round.
        </Typography>
      </Container>

      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "25px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                textAlign: "center",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                🔥 maintaints
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "25px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                textAlign: "center",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                💡 reparation
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "25px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                textAlign: "center",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                ⭐ Installation
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Call-To-Action Section */}
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
          py: 5,
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Ready to Upgrade Your HVAC System?
        </Typography>
        <Button variant="contained" color="secondary" size="large" href="/contact">
          Get a Free Quote
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          backgroundColor: "#222",
          color: "#fff",
          mt: 8,
        }}
      >
        <Typography variant="body2">© {new Date().getFullYear()} [Your HVAC Company]. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default Home;
