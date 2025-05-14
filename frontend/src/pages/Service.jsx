import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Services = () => {
  const { user } = useAuth();     // null / undefined when logged‑out
  const navigate = useNavigate();
  const theme = useTheme();

  /* decide where to go on click */
  const handleServiceClick = (path) => () => {
    if (user) {
      navigate(path);
    } else {
      // save the intended route so you can push them back after login (optional)
      navigate("/login", { state: { from: path } });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#1c1c1c", color: "#fff", py: 10 }}>
      {/* Service Overview */}
      <Container maxWidth="lg" sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, color: theme.palette.primary.main }}>
          Our HVAC Services
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto", color: "#ccc" }}>
          We provide a comprehensive range of HVAC services designed to keep your home or business
          comfortable all year round. Explore our offerings below.
        </Typography>
      </Container>

      {/* Service Cards */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: "Repair",       image: "/Repair.jpeg",    desc: "Expert HVAC repairs to ensure optimal performance.", link: "/repairs" },
            { title: "Maintenance",  image: "/maintnace.jpeg", desc: "Regular maintenance to extend system life.",        link: "/maintenance" },
            { title: "Installation", image: "/install.jpeg",   desc: "Professional HVAC installation services.",          link: "/installation" },
          ].map(({ title, image, desc, link }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Card
                sx={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia component="img" height="200" image={image} alt={title} sx={{ borderRadius: "2px 2px 0 0" }} />
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1, color: theme.palette.primary.main }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: "#ccc" }}>
                    {desc}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleServiceClick(link)}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us */}
      <Container maxWidth="lg" sx={{ mb: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: theme.palette.primary.main }}>
          Why Choose Atmosfair?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: "24/7 Emergency Support", desc: "Available whenever you need us." },
            { title: "Expert Technicians",      desc: "Certified and experienced professionals." },
            { title: "Transparent Pricing",     desc: "No hidden fees or unexpected costs." },
          ].map(({ title, desc }) => (
            <Grid item xs={12} sm={4} key={title}>
              <Box sx={{ textAlign: "center", backgroundColor: "#333", p: 4, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, color: "#00aaff" }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  {desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
