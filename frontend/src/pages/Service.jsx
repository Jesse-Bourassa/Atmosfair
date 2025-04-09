import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Services = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 18,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 5, color: theme.palette.text.secondary }}>
          Our Services
        </Typography>
        <Typography variant="body1" sx={{ mb: 5, maxWidth: "800px", mx: "auto", color: "white" }}>
          We provide top-notch HVAC services to keep your home and business comfortable year-round. Whether you need repairs, regular maintenance, or a full installation, we've got you covered.
        </Typography>
        
        {/* Service Cards */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: "30px",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
                textAlign: "center",
                border: `2px solid ${theme.palette.primary.main}`,
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <img src="/Repair.jpeg" alt="Repair service" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "20px" }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
              Repair 
              </Typography>
              <Typography variant="body1" sx={{ my: 2, color: "black" }}>
                Expert repairs to keep your HVAC system running smoothly.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/repairs" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: "30px",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
                textAlign: "center",
                border: `2px solid ${theme.palette.secondary.main}`,
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <img src="/maintnace.jpeg" alt="Maintenance service" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "20px" }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
              Maintenance
              </Typography>
              <Typography variant="body1" sx={{ my: 2, color: "black" }}>
                Regular servicing to ensure top performance of your HVAC.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/maintenance" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: "30px",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
                textAlign: "center",
                border: `2px solid ${theme.palette.secondary.main}`,
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <img src="/install.jpeg" alt="Installation service" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "20px" }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
              Installation
              </Typography>
              <Typography variant="body1" sx={{ my: 2, color: "black" }}>
                Professional HVAC system installation for your space.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/installation" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Call-To-Action Section */}
        
      </Container>
    </Box>
  );
};

export default Services;