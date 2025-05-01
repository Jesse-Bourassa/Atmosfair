// frontend/src/components/LogoWheel.jsx
import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTheme } from "@mui/material/styles";

// Add (or remove) filenames as needed – they must exist in /public/logos
const logos = [
  "Carrier.png",
  "Gree.png",
  "Goodman.png",
  "Rinnai.png",
  "York.png",
];

// One size fits all – we just care about a strip of logos
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 0 }, items: 5, slidesToSlide: 1 },
};

const LogoWheel = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 3, bgcolor: "#eaeaea" }}>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay                 /* keep it moving */
        autoPlaySpeed={0}        /* rely on customTransition timing */
        customTransition="transform 30000ms linear" /* 30 s for full loop */
        transitionDuration={30000}
        arrows={false}
        draggable={false}
        swipeable={false}
        pauseOnHover={false}
        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
      >
        {logos.map((logo, idx) => (
          <Box
            key={idx}
            component="img"
            src={`/logos/${logo}`}
            alt={`logo-${idx}`}
            sx={{ height: 80, px: 3, transform: "scale(2)", transformOrigin: "center" }}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default LogoWheel;