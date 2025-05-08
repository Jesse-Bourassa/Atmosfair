import React from "react";
import { Box, Typography, Container, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import LogoCarousel from "../components/LogoWheel";
import Hero from "../components/Hero";

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      title: "Efficient HVAC Installation",
      description:
        "Experience high-quality installations for maximum comfort and energy savings. Our team ensures every system is perfectly configured for your space.",
      image: "/install.jpeg",
      align: "left",
    },
    {
      title: "Comprehensive Maintenance",
      description:
        "Regular maintenance to extend the life of your HVAC system. Keep your equipment running at peak performance year-round.",
      image: "/maintnace.jpeg",
      align: "right",
    },
    {
      title: "Rapid HVAC Repairs",
      description:
        "Fast, reliable repairs to keep you comfortable, no matter the season. Trust our experts to get your system back up and running quickly.",
      image: "/Repair.jpeg",
      align: "left",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
          mt: 8,
          color: "#e6e8ef",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: theme.palette.primary.main,
            textShadow: "0px 0px 15px rgba(0, 150, 255, 0.7)",
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            mb: 5,
            color: "#ccc",
            lineHeight: 1.6,
            fontSize: "1.5rem",
            textShadow: "0px 0px 6px rgba(255, 255, 255, 0.15)",
          }}
        >
          Welcome to Atmosfair, a trusted name in HVAC solutions. We specialize
          in <strong>heating, cooling, and ventilation systems</strong> for both
          residential and commercial properties. Our mission is to provide{" "}
          <strong>reliable, energy-efficient, and affordable services</strong>{" "}
          to keep your space comfortable all year round.
        </Typography>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {features.map((feature, index) => {
          const isLeft = feature.align === "left";
          return (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                x: isLeft ? -100 : 100, 
                y: 50 
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0 
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Grid
                container
                spacing={4}
                direction={isLeft ? "row" : "row-reverse"}
                alignItems="center"
                sx={{ mb: 6 }}
              >
                <Grid item xs={12} md={6}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{ width: "100%", borderRadius: "12px" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      color: "#00aaff",
                      fontWeight: "bold",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#ccc",
                      lineHeight: 1.6,
                      fontSize: "1.1rem",
                    }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      backgroundColor: "#00aaff",
                      color: "#fff",
                      mt: 3,
                      "&:hover": {
                        backgroundColor: "#0099dd",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          );
        })}
      </Container>

      {/* Brand Carousel */}
      <Box
        sx={{
          py: 5,
                }}
      >
        <LogoCarousel />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          backgroundColor: "#111",
          color: "#aaa",
          mt: 8,
          borderTop: "1px solid #444",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Atmosf'air. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Home;
