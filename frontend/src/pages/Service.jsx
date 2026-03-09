import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  Build,
  Tune,
  Engineering,
  AcUnit,
  Whatshot,
  VolumeUp,
  Air,
} from "@mui/icons-material";

const MotionBox = motion(Box);

const Services = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleServiceClick = (path) => () => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login", { state: { from: path } });
    }
  };

  const services = [
    {
      title: "Repair",
      subtitle: "Fix issues quickly",
      desc: "Fast diagnostics and dependable HVAC repairs to restore comfort and performance.",
      image: "/atmo.jpeg",
      link: "/repairs",
      icon: <Build sx={{ color: "#7fb3ff", fontSize: 30 }} />,
    },
    {
      title: "Maintenance",
      subtitle: "Protect your system",
      desc: "Routine service that helps extend equipment life and keep everything running efficiently.",
      image: "/atmo.jpeg",
      link: "/maintenance",
      icon: <Tune sx={{ color: "#7fb3ff", fontSize: 30 }} />,
    },
    {
      title: "Installation",
      subtitle: "New system setup",
      desc: "Professional HVAC installation for new systems or replacements done with care.",
      image: "/atmo.jpeg",
      link: "/installation",
      icon: <Engineering sx={{ color: "#7fb3ff", fontSize: 30 }} />,
    },
  ];

  const commonProblems = [
    {
      title: "AC Not Cooling",
      desc: "Your system is running but the air is not cold enough.",
      icon: <AcUnit sx={{ color: "#7fb3ff", fontSize: 30 }} />,
      link: "/repairs",
    },
    {
      title: "Furnace Not Heating",
      desc: "Your home is not warming up properly during colder days.",
      icon: <Whatshot sx={{ color: "#7fb3ff", fontSize: 30 }} />,
      link: "/repairs",
    },
    {
      title: "Strange Noises",
      desc: "Buzzing, rattling, or banging sounds coming from the unit.",
      icon: <VolumeUp sx={{ color: "#7fb3ff", fontSize: 30 }} />,
      link: "/repairs",
    },
    {
      title: "Poor Airflow",
      desc: "Some rooms feel weak airflow or uneven comfort levels.",
      icon: <Air sx={{ color: "#7fb3ff", fontSize: 30 }} />,
      link: "/repairs",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        background:
          "radial-gradient(circle at top, rgba(36,74,120,0.16), transparent 28%), linear-gradient(180deg, #08111c 0%, #0b1420 45%, #091018 100%)",
        py: { xs: 10, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              color: "#88a8c9",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              mb: 1.5,
            }}
          >
            Our Services
          </Typography>

          <Typography
            sx={{
              color: "#f8fafc",
              fontWeight: 800,
              lineHeight: 1.08,
              fontSize: { xs: "2rem", md: "3.2rem" },
              mb: 2,
            }}
          >
            How Can We Help?
          </Typography>

          <Typography
            sx={{
              color: "#cbd5e1",
              maxWidth: "760px",
              mx: "auto",
              lineHeight: 1.9,
              fontSize: { xs: "1rem", md: "1.05rem" },
            }}
          >
            Select the HVAC service that best matches your needs. We make it
            easy to get the right help for your home or business.
          </Typography>
        </Box>

        {/* Service cards */}
        <Grid container spacing={3.5} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={service.title}>
              <MotionBox
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "22px",
                    background: "rgba(20, 28, 40, 0.62)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow:
                        "0 22px 55px rgba(0,0,0,0.55), 0 0 30px rgba(79,163,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.title}
                    sx={{
                      width: "100%",
                      height: 240,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Box sx={{ p: 3.2 }}>
                    <Box sx={{ mb: 2 }}>{service.icon}</Box>

                    <Typography
                      sx={{
                        color: "#f8fafc",
                        fontWeight: 800,
                        fontSize: "1.45rem",
                        mb: 1,
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#7fb3ff",
                        fontWeight: 600,
                        fontSize: "0.96rem",
                        mb: 1.4,
                      }}
                    >
                      {service.subtitle}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#cbd5e1",
                        lineHeight: 1.8,
                        fontSize: "0.97rem",
                        mb: 3,
                      }}
                    >
                      {service.desc}
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={handleServiceClick(service.link)}
                      sx={{
                        px: 3,
                        py: 1.1,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 700,
                        background: "linear-gradient(90deg,#3a7bd5,#4fa3ff)",
                        boxShadow: "0 0 18px rgba(0,170,255,0.25)",
                        "&:hover": {
                          background: "linear-gradient(90deg,#346ec0,#4597eb)",
                        },
                      }}
                    >
                      Select Service
                    </Button>
                  </Box>
                </Paper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        {/* Small trust strip */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            py: 2.2,
            background: "rgba(10, 16, 24, 0.65)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "18px",
          }}
        >
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
              "Reliable Scheduling",
              "Professional Service",
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
        </Box>

        {/* Problem section */}
        <Box sx={{ mt: { xs: 8, md: 10 } }}>
          <Box sx={{ textAlign: "center", mb: 4.5 }}>
            <Typography
              sx={{
                color: "#88a8c9",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                mb: 1.5,
              }}
            >
              Not Sure Which Service?
            </Typography>

            <Typography
              sx={{
                color: "#f8fafc",
                fontWeight: 800,
                lineHeight: 1.08,
                fontSize: { xs: "1.8rem", md: "2.6rem" },
                mb: 2,
              }}
            >
              Common HVAC Problems
            </Typography>

            <Typography
              sx={{
                color: "#cbd5e1",
                maxWidth: "760px",
                mx: "auto",
                lineHeight: 1.9,
                fontSize: { xs: "1rem", md: "1.03rem" },
              }}
            >
              If you are not sure which service to choose, start with the issue
              you are experiencing and we’ll guide you in the right direction.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {commonProblems.map((problem, index) => (
              <Grid item xs={12} sm={6} md={3} key={problem.title}>
                <MotionBox
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: "20px",
                      background: "rgba(20, 28, 40, 0.62)",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 10px 35px rgba(0,0,0,0.28)",
                      transition: "all 0.35s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow:
                          "0 18px 45px rgba(0,0,0,0.45), 0 0 24px rgba(79,163,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    <Box>
                      <Box sx={{ mb: 2 }}>{problem.icon}</Box>

                      <Typography
                        sx={{
                          color: "#f8fafc",
                          fontWeight: 700,
                          fontSize: "1.12rem",
                          mb: 1.2,
                        }}
                      >
                        {problem.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#cbd5e1",
                          lineHeight: 1.8,
                          fontSize: "0.95rem",
                          mb: 2.5,
                        }}
                      >
                        {problem.desc}
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      onClick={handleServiceClick(problem.link)}
                      sx={{
                        alignSelf: "flex-start",
                        px: 2.4,
                        py: 0.95,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 700,
                        color: "#fff",
                        borderColor: "rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.02)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.22)",
                          background: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      Get Help
                    </Button>
                  </Paper>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;