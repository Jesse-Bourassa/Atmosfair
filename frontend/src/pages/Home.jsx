import React from "react";
import { Box, Typography, Container, Button, Grid, Paper } from "@mui/material";
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
      image: "atmo.jpeg",
      align: "left",
    },
    {
      title: "Comprehensive Maintenance",
      description:
        "Regular maintenance helps extend the life of your HVAC system and keeps your equipment running at peak performance all year long.",
      image: "/atmo.jpeg",
      align: "right",
    },
    {
      title: "Rapid HVAC Repairs",
      description:
        "Fast, reliable repair services to restore comfort quickly. We diagnose problems efficiently and get your system back up and running.",
      image: "atmo.jpeg",
      align: "left",
    },
  ];

  return (
    <>
      <Hero />


<Box
  sx={{
    py: 2.2,
    background: "rgba(10, 16, 24, 0.78)",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  }}
>
  <Container maxWidth="xl">
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: { xs: 2, md: 5 },
      }}
    >
      {[
        "Licensed & Insured",
        "Residential & Commercial",
        "Energy Efficient Solutions",
        "Reliable Service",
      ].map((item, index) => (
        <Typography
          key={index}
          sx={{
            color: "#d6deea",
            fontWeight: 600,
            fontSize: "0.95rem",
            letterSpacing: ".02em",
          }}
        >
          ✓ {item}
        </Typography>
      ))}
    </Box>
  </Container>
</Box>


      {/* About Section */}
      <Box
  sx={{
    py: { xs: 8, md: 10 },
    
  }}
>
  <Container maxWidth="xl">
    <Grid container spacing={6} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            color: "#88a8c9",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontSize: "0.8rem",
            mb: 1.5,
          }}
        >
          Why Atmosfair
        </Typography>

        <Typography
          sx={{
            color: "#f8fafc",
            fontWeight: 800,
            lineHeight: 1.08,
            mb: 3,
            fontSize: { xs: "2rem", md: "3rem" },
            maxWidth: "700px",
          }}
        >
          Reliable HVAC Service
          <br />
          For Homes & Businesses
        </Typography>

        <Typography
          sx={{
            color: "#cbd5e1",
            lineHeight: 1.9,
            fontSize: { xs: "1rem", md: "1.08rem" },
            mb: 3,
            maxWidth: "620px",
          }}
        >
          Atmosfair provides dependable heating, cooling, and ventilation
          solutions with a focus on quality workmanship, long-term performance,
          and service you can trust.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 4 }}>
          {[
            "Professional installation, maintenance, and repair",
            "Residential and commercial HVAC service",
            "Reliable, energy-conscious solutions",
          ].map((item, index) => (
            <Typography
              key={index}
              sx={{
                color: "#e2e8f0",
                fontSize: "1rem",
              }}
            >
              ✓ {item}
            </Typography>
          ))}
        </Box>

        <Button
          variant="outlined"
          href="/about"
          sx={{
            px: 3.5,
            py: 1.15,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            color: "#fff",
            borderColor: "rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.02)",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.05)",
            },
          }}
        >
          Learn More About Us
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <Box
            component="img"
            src="/atmo.jpeg"
            alt="HVAC technician at work"
            sx={{
              width: "100%",
              height: { xs: "300px", md: "460px" },
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>

      {/* Features Section */}
      <Box
  sx={{
    py: { xs: 6, md: 8 },
    
  }}
>
  <Container maxWidth="xl">
    {features.map((feature, index) => {
      const isLeft = feature.align === "left";

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{
  mb: 5,
  p: { xs: 2, md: 4 },
  borderRadius: "20px",

  background: "rgba(20, 28, 40, 0.62)",
  backdropFilter: "blur(14px)",

  border: "1px solid rgba(255,255,255,0.08)",

  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",

  maxWidth: "1400px",
  mx: "auto",

  transition: "all 0.35s ease",

  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
    border: "1px solid rgba(255,255,255,0.15)"
  }
}}
          >
            <Grid
              container
              spacing={{ xs: 3, md: 4 }}
              direction={isLeft ? "row" : "row-reverse"}
              alignItems="center"
            >
              <Grid item xs={12} md={7}>
                <Box
                  component="img"
                  src={feature.image}
                  alt={feature.title}
                  sx={{
                    width: "100%",
                    height: { xs: "240px", md: "340px" },
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                  }}
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    color: "#7fb3ff",
                    fontWeight: 800,
                    fontSize: { xs: "1.6rem", md: "2rem" },
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#cfcfcf",
                    lineHeight: 1.8,
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    mb: 3,
                  }}
                >
                  {feature.description}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 3,
                    py: 1.2,
                    borderRadius: "10px",
                    background: "linear-gradient(90deg,#3a7bd5,#4fa3ff)",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 0 18px rgba(0,170,255,0.25)",
                    "&:hover": {
                      background: "linear-gradient(90deg,#346ec0,#4597eb)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      );
    })}
  </Container>
</Box>

      {/* Brand Carousel */}
      <Box
        sx={{
          py: { xs: 5, md: 7 },


          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#e5e7eb",
              fontWeight: 700,
              mb: 4,
            }}
          >
            Trusted Brands We Work With
          </Typography>

          <LogoCarousel />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,

          color: "#888",
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