import React from 'react';
import { Box, Typography, Container, Grid, Divider, Button } from '@mui/material';
import { Build, Bolt, Favorite, Speed } from '@mui/icons-material';

const About = () => {
  const features = [
    { icon: <Build sx={{ color: '#90caf9', fontSize: 40 }} />, title: 'Expertise', desc: 'Skilled team delivering installations, repairs, and maintenance you can count on.' },
    { icon: <Bolt sx={{ color: '#90caf9', fontSize: 40 }} />, title: 'Reliability', desc: 'We ensure energy-efficient and dependable HVAC service all year round.' },
    { icon: <Favorite sx={{ color: '#90caf9', fontSize: 40 }} />, title: 'Customer Care', desc: 'We care about your comfort and satisfaction from start to finish.' },
    { icon: <Speed sx={{ color: '#90caf9', fontSize: 40 }} />, title: 'Fast Response', desc: 'We respond quickly to all inquiries and service requests, ensuring minimal downtime.' },
  ];

  return (
    <Box sx={{ backgroundColor: '#1e1e1e', color: '#fff', py: 10 }}>
      <Container maxWidth="lg">

        {/* mission */}
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#90caf9' }}>
          Bringing Comfort Back Home
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 6 }}>
          We're on a mission to make your home the most comfortable place on earth.
        </Typography>

        {/* why */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              backgroundColor: '#2c2c2c',
              p: 5,
              borderRadius: 3,
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
            }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#90caf9' }}>
                Why Atmosfair?
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: '#90caf9' }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                We know there’s already enough to keep you up at night — unexpected breakdowns, rising energy bills, restless sleep from a faulty AC.
              </Typography>
              <Typography variant="body1">
                That’s why at Atmosfair, we put people first. From minor tune-ups to complete installations, we bring expertise and a personal touch that ensures your home stays worry-free and perfectly cozy, season after season.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              backgroundColor: '#2c2c2c',
              p: 5,
              borderRadius: 3,
              boxShadow: '0 6px 25px rgba(0,0,0,0.4)'
            }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#90caf9' }}>
                Our Story
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: '#90caf9' }} />
              <Typography variant="body1">
                Atmosfair started as a small family-run HVAC service determined to raise the standard. We went through countless projects and refined every detail of our process — from fast diagnostics to spotless installations.
                <br /><br />
                Today, we’re proud to be the team homeowners turn to when they want it done right the first time.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* current & future */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              backgroundColor: '#2c2c2c',
              p: 5,
              borderRadius: 3,
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
            }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#90caf9' }}>
                Where We Are Now
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: '#90caf9' }} />
              <Typography variant="body1">
                Hundreds of homeowners trust Atmosfair to keep their systems running at peak performance. Whether it’s a chilly Quebec winter or a scorching summer, they know we’ve got them covered with dependable, friendly service.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              backgroundColor: '#2c2c2c',
              p: 5,
              borderRadius: 3,
              boxShadow: '0 6px 25px rgba(0,0,0,0.4)'
            }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#90caf9' }}>
                Looking Ahead
              </Typography>
              <Divider sx={{ mb: 3, backgroundColor: '#90caf9' }} />
              <Typography variant="body1">
                As we grow, we’re committed to investing in the latest HVAC technologies, eco-friendly solutions, and ongoing training. Because your comfort deserves the very best — today, tomorrow, and for years to come.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* icons features */}
        <Grid container spacing={4}>
          {features.map((feature, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box sx={{
                backgroundColor: '#2c2c2c',
                p: 4,
                borderRadius: 3,
                textAlign: 'center',
                boxShadow: '0 6px 25px rgba(0,0,0,0.4)',
                height: '100%'
              }}>
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                <Typography variant="body2">{feature.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
