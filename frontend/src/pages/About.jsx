import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { Build, Bolt, Favorite, Speed } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const About = () => {
  const values = [
    {
      icon: <Build sx={{ color: "#7fb3ff", fontSize: 38 }} />,
      title: "Experienced Workmanship",
      desc: "We focus on quality installations, dependable repairs, and maintenance done with attention to detail.",
    },
    {
      icon: <Bolt sx={{ color: "#7fb3ff", fontSize: 38 }} />,
      title: "Reliable Solutions",
      desc: "Our goal is to provide efficient HVAC systems and service you can rely on in every season.",
    },
    {
      icon: <Favorite sx={{ color: "#7fb3ff", fontSize: 38 }} />,
      title: "Customer First",
      desc: "We believe great service means clear communication, honest work, and real care for your comfort.",
    },
    {
      icon: <Speed sx={{ color: "#7fb3ff", fontSize: 38 }} />,
      title: "Fast Response",
      desc: "When service is needed, we move quickly to help restore comfort and reduce unnecessary downtime.",
    },
  ];

  const stats = [
    { number: "Residential", label: "Home comfort solutions" },
    { number: "Commercial", label: "Business HVAC support" },
    { number: "Service", label: "Installation, repair & maintenance" },
    { number: "Quality", label: "Work built to last" },
  ];

  return (
    <Box
      sx={{
        color: "#fff",
        background:
          "radial-gradient(circle at top, rgba(36,74,120,0.18), transparent 30%), linear-gradient(180deg, #08111c 0%, #0b1420 45%, #091018 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 10 },
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionBox
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Typography
                  sx={{
                    color: "#88a8c9",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                    mb: 2,
                  }}
                >
                  About Atmosf&apos;air
                </Typography>

                <Typography
                  sx={{
                    color: "#f8fafc",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    fontSize: { xs: "2.4rem", md: "4rem" },
                    maxWidth: "850px",
                    mb: 3,
                  }}
                >
                  Built on Trust,
                  <br />
                  Driven by Comfort
                </Typography>

                <Typography
                  sx={{
                    color: "#cbd5e1",
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    lineHeight: 1.9,
                    maxWidth: "720px",
                    mb: 4,
                  }}
                >
                  Atmosf&apos;air delivers professional heating, cooling, and
                  ventilation services with a focus on quality workmanship,
                  reliable solutions, and long-term comfort for homes and
                  businesses.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Button
                    variant="contained"
                    href="/service"
                    sx={{
                      px: 3.5,
                      py: 1.3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      background:
                        "linear-gradient(90deg,#3a7bd5 0%, #4fa3ff 100%)",
                      boxShadow: "0 0 20px rgba(79,163,255,0.22)",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg,#346ec0 0%, #4597eb 100%)",
                      },
                    }}
                  >
                    Explore Our Services
                  </Button>

                  <Button
                    variant="outlined"
                    href="/contact"
                    sx={{
                      px: 3.5,
                      py: 1.3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.14)",
                      background: "rgba(255,255,255,0.02)",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.24)",
                        background: "rgba(255,255,255,0.05)",
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>

            <Grid item xs={12} md={5}>
              <MotionBox
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  }}
                >
                  <Box
                    component="img"
                    src="/atmo.jpeg"
                    alt="Atmosf'air HVAC service"
                    sx={{
                      width: "100%",
                      height: { xs: "300px", md: "500px" },
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(7,12,18,0.7), rgba(7,12,18,0.08))",
                    }}
                  />
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trust Bar */}
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
              "Professional HVAC Service",
              "Quality-Focused Work",
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

      {/* Story / Why Us */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    borderRadius: "22px",
                    background: "rgba(20, 28, 40, 0.62)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                  }}
                >

                    <Box
    sx={{
      width: "64px",
      height: "4px",
      borderRadius: "999px",
      mb: 2.2,
      background: "linear-gradient(90deg, #4fa3ff, rgba(79,163,255,0.15))",
    }}
  />

                  <Typography
                    sx={{
                      color: "#7fb3ff",
                      fontWeight: 800,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      mb: 2,
                    }}
                  >
                    Why Atmosf&apos;air
                  </Typography>

                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      lineHeight: 1.9,
                      fontSize: "1rem",
                    }}
                  >
                    We understand how important dependable heating and cooling is
                    to your daily comfort. Whether it’s keeping your home warm
                    through winter or making sure your AC performs in summer,
                    our mission is simple: provide service that is professional,
                    honest, and built around long-term peace of mind.
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 6 },
                    height: "100%",
                    borderRadius: "22px",
                    background: "rgba(20, 28, 40, 0.62)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                  }}
                >

                    <Box
    sx={{
      width: "64px",
      height: "4px",
      borderRadius: "999px",
      mb: 2.2,
      background: "linear-gradient(90deg, #4fa3ff, rgba(79,163,255,0.15))",
    }}
  />

                  <Typography
                    sx={{
                      color: "#7fb3ff",
                      fontWeight: 800,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      mb: 2,
                    }}
                  >
                    Our Approach
                  </Typography>

                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      lineHeight: 1.9,
                      fontSize: "1rem",
                    }}
                  >
                    We combine strong workmanship with responsive service and
                    practical solutions. From installation to maintenance and
                    repairs, every job is handled with care, attention to
                    detail, and a commitment to doing the work properly the
                    first time.
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats / highlights */}
      <Box sx={{ pb: { xs: 8, md: 10 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {stats.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3.2,
                      textAlign: "center",
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#f8fafc",
                        fontWeight: 800,
                        fontSize: "1.55rem",
                        mb: 1,
                      }}
                    >
                      {item.number}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#aebdcd",
                        fontSize: "0.98rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Paper>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(8, 14, 22, 0.45)",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            sx={{
              textAlign: "center",
              color: "#88a8c9",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              mb: 1.5,
            }}
          >
            What Sets Us Apart
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#f8fafc",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.08,
              mb: 6,
            }}
          >
            Service Built Around Quality
          </Typography>

          <Grid container spacing={3.5}>
            {values.map((feature, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3.5,
                      borderRadius: "20px",
                      textAlign: "center",
                      height: "100%",
                      background: "rgba(20, 28, 40, 0.62)",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                      transition: "all 0.35s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    <Box mb={2}>{feature.icon}</Box>

                    <Typography
                      sx={{
                        color: "#f1f5f9",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        mb: 1.2,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#b9c6d3",
                        fontSize: "0.97rem",
                        lineHeight: 1.8,
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </Paper>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
         <Paper
  elevation={0}
  sx={{
    p: { xs: 4, md: 6 },
    borderRadius: "26px",
    textAlign: "center",
    background:
      "radial-gradient(circle at top left, rgba(79,163,255,0.12), transparent 35%), linear-gradient(135deg, rgba(28,43,63,0.95), rgba(15,24,36,0.94))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
    position: "relative",
    overflow: "hidden",
  }}
>
  <Box
    sx={{
      position: "absolute",
      top: -80,
      right: -80,
      width: 220,
      height: 220,
      borderRadius: "50%",
      background: "rgba(79,163,255,0.08)",
      filter: "blur(60px)",
      pointerEvents: "none",
    }}
  />

  <Typography
    sx={{
      color: "#f8fafc",
      fontWeight: 800,
      fontSize: { xs: "1.8rem", md: "2.6rem" },
      mb: 2,
      position: "relative",
      zIndex: 1,
    }}
  >
    Let&apos;s Improve Your Comfort
  </Typography>

  <Typography
    sx={{
      color: "#cbd5e1",
      maxWidth: "760px",
      mx: "auto",
      lineHeight: 1.9,
      mb: 4,
      fontSize: { xs: "1rem", md: "1.05rem" },
      position: "relative",
      zIndex: 1,
    }}
  >
    Whether you need a new installation, routine maintenance, or
    service for an existing system, Atmosf&apos;air is here to help
    with dependable HVAC solutions tailored to your needs.
  </Typography>

  <Button
    variant="contained"
    href="/contact"
    sx={{
      px: 4,
      py: 1.3,
      borderRadius: "12px",
      textTransform: "none",
      fontWeight: 700,
      background: "linear-gradient(90deg,#3a7bd5,#4fa3ff)",
      boxShadow: "0 0 18px rgba(0,170,255,0.25)",
      position: "relative",
      zIndex: 1,
      "&:hover": {
        background: "linear-gradient(90deg,#346ec0,#4597eb)",
      },
    }}
  >
    Request a Service
  </Button>
</Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default About;