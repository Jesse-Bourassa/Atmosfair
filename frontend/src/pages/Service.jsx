import React from "react";
import { Box, Typography, Container, Grid, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
import { useLanguage } from "../context/LanguageContext";
const MotionBox = motion(Box);

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const handleServiceClick = (path) => () => {
    navigate(path);
  };

  const services = [
    {
      title: t("serviceRepairTitle"),
      subtitle: t("serviceRepairSubtitle"),
      desc: t("serviceRepairDesc"),
      image: "/atmo.jpeg",
      link: "/repairs",
      icon: <Build sx={{ color: "#7fb3ff", fontSize: 30 }} />,
    },
    {
      title: t("serviceMaintenanceTitle"),
      subtitle: t("serviceMaintenanceSubtitle"),
      desc: t("serviceMaintenanceDesc"),
      image: "/atmo.jpeg",
      link: "/maintenance",
      icon: <Tune sx={{ color: "#7fb3ff", fontSize: 30 }} />,
    },
    {
      title: t("serviceInstallationTitle"),
      subtitle: t("serviceInstallationSubtitle"),
      desc: t("serviceInstallationDesc"),
      image: "/atmo.jpeg",
      link: "/installation",
      icon: <Engineering sx={{ color: "#7fb3ff", fontSize: 30 }} />,
    },
  ];

  const commonProblems = [
    {
      title: t("problemAcNotCoolingTitle"),
      desc: t("problemAcNotCoolingDesc"),
      icon: <AcUnit sx={{ color: "#7fb3ff", fontSize: 30 }} />,
      link: "/repairs",
    },
    {
      title: t("problemFurnaceNotHeatingTitle"),
      desc: t("problemFurnaceNotHeatingDesc"),
      icon: <Whatshot sx={{ color: "#7fb3ff", fontSize: 30 }} />,
      link: "/repairs",
    },
    {
      title: t("problemStrangeNoisesTitle"),
      desc: t("problemStrangeNoisesDesc"),
      icon: <VolumeUp sx={{ color: "#7fb3ff", fontSize: 30 }} />,
      link: "/repairs",
    },
    {
      title: t("problemPoorAirflowTitle"),
      desc: t("problemPoorAirflowDesc"),
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
            {t("ourServices")}
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
            {t("howCanWeHelp")}
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
            {t("servicesIntro")}
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
                      {t("selectService")}
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
              t("licensedInsured"),
              t("residentialCommercial"),
              t("reliableScheduling"),
              t("professionalService"),
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
              {t("notSureWhichService")}
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
              {t("commonHvacProblems")}
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
              {t("commonHvacProblems")}
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
                      {t("getHelp")}
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
