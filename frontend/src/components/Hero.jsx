import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/test.mp4" type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              90deg,
              rgba(8,12,18,0.88) 0%,
              rgba(8,12,18,0.78) 32%,
              rgba(8,12,18,0.48) 58%,
              rgba(8,12,18,0.58) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.18) 26%, rgba(10,10,10,0.04) 100%)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(23,37,55,0.28) 0%, rgba(23,37,55,0.12) 24%, rgba(23,37,55,0) 45%)",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "760px",
            pt: { xs: 10, md: 6 },
            pb: { xs: 8, md: 10 },
          }}
        >
          <Typography
            sx={{
              color: "#7fb3e6",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              mb: 2,
              fontSize: { xs: "0.75rem", md: "0.85rem" },
            }}
          >
            {t("heroBadge")}
          </Typography>

          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              lineHeight: 1.05,
              mb: 3,
              fontSize: { xs: "2.5rem", sm: "3.25rem", md: "5rem" },
              textShadow: "0 4px 24px rgba(0,0,0,0.35)",
            }}
          >
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.82)",
              fontSize: { xs: "1rem", md: "1.18rem" },
              lineHeight: 1.85,
              maxWidth: "620px",
              mb: 4,
            }}
          >
            {t("heroDescription")}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: { xs: "stretch", sm: "center" } }}
          >
            <Button
              component={Link}
              to="/service"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                background: "linear-gradient(90deg, #2f6fb2, #3f8fe3)",
                boxShadow: "0 10px 24px rgba(40, 110, 190, 0.32)",
                "&:hover": {
                  background: "linear-gradient(90deg, #285f98, #377dcc)",
                },
              }}
            >
              {t("exploreServices")}
            </Button>

            <Button
              component={Link}
              to="/about"
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.28)",
                backgroundColor: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.5)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {t("learnMore")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
