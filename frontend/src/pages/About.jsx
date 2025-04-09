import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Grid } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ backgroundColor: '#1e1e1e', minHeight: '100vh', color: '#fff', pt: 10 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          About Atmosfair
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: '#90caf9' }}>
          Your trusted HVAC partner
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="stretch" mt={4}>
          <Grid item xs={12} md={10}>
            <Grid container spacing={4} alignItems="stretch">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: '#2c2c2c',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: '0 6px 25px rgba(0,0,0,0.4)',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ color: '#90caf9' }}>
                    What Makes Us Different?
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    At Atmosfair, HVAC service goes beyond technical excellence—it’s about a reliable, human experience.
                    We pride ourselves on responsive service, transparent communication, and a personal touch in every project.
                  </Typography>
                  <Typography variant="body1">
                    Whether it’s a minor repair or a complete system installation, our team ensures quality results with friendly, expert care.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="column" gap={3} height="100%" justifyContent="space-between">
                  {[
                    { title: 'Expertise', desc: 'Skilled team delivering installations, repairs, and maintenance you can count on.' },
                    { title: 'Reliability', desc: 'We ensure energy-efficient and dependable HVAC service all year round.' },
                    { title: 'Customer Care', desc: 'We care about your comfort and satisfaction from start to finish.' },
                    { title: 'Fast Response', desc: 'We respond quickly to all inquiries and service requests, ensuring minimal downtime.' },
                  ].map((feature, i) => (
                    <Box
                      key={i}
                      sx={{
                        backgroundColor: '#2c2c2c',
                        p: 3,
                        borderRadius: 2,
                        width: '100%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                      <Typography variant="body2">{feature.desc}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
