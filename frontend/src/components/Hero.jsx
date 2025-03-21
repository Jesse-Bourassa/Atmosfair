import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Hero() {
  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Video as Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src="/test1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay to blend video with the background */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, #242424 100%)",
          zIndex: 0,
        }}
      />

      {/* Foreground Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          p: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Atmosfair
        </Typography>
        <Typography variant="h6" paragraph>
          Experience reliable, professional HVAC services tailored to your needs.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Explore Our Services
        </Button>
      </Box>
    </Box>
  );
}
