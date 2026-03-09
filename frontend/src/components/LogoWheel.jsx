// frontend/src/components/LogoWheel.jsx
import React from "react";
import { Box } from "@mui/material";

const logos = [
  "Carrier.png",
  "Gree.png",
  "Goodman.png",
  "Rinnai.png",
  "York.png",
];

// duplicate the array so the loop is seamless
const loopLogos = [...logos, ...logos];

const LogoWheel = () => {
  return (
    <Box
       sx={{
        py: 6,
        px: 2,
        background: "linear-gradient(to bottom, #1f2c3d, #162231)",
        borderRadius: "20px",
        boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: "logoTicker 28s linear infinite",
          "@keyframes logoTicker": {
            "0%": {
              transform: "translateX(0)",
            },
            "100%": {
              transform: "translateX(-50%)",
            },
          },
        }}
      >
        {loopLogos.map((logo, idx) => (
          <Box
            key={idx}
            sx={{
              flex: "0 0 auto",
              width: { xs: 160, md: 300 },
              height: { xs: 40, md: 70 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
            }}
          >
            <Box
              component="img"
              src={`/logos/${logo}`}
              alt={`logo-${idx}`}
              sx={{
                maxHeight: { xs: 100, md: 160  },
                maxWidth: "100%",
                width: "auto",
                objectFit: "contain",
                opacity: 0.9,
                transition: "transform 0.25s ease, opacity 0.25s ease",
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.08)",
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LogoWheel;