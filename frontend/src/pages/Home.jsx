import React from "react";
import { Box, Typography, Container, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme
import LogoCarousel from "../components/LogoWheel";

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

      <LogoCarousel />

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
