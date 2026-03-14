import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const NAVBAR_HEIGHT = { xs: 68, md: 74 };

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navLinks = useMemo(() => {
    const links = [
      { label: t("home"), path: "/" },
      { label: t("about"), path: "/about" },
      { label: t("services"), path: "/service" },
    ];

    if (user?.role === "admin") {
      links.push({ label: t("dashboard"), path: "/admin/dashboard" });
    }

    return links;
  }, [user, t]);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    handleMenuClose();
    setMobileOpen(false);
    navigate("/");
  };

  const handleProfile = () => {
    handleMenuClose();
    setMobileOpen(false);
    navigate("/profile");
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const desktopLinkSx = (path) => ({
    color: "#eaf2ff",
    textTransform: "none",
    fontSize: "0.98rem",
    fontWeight: 700,
    px: 2.1,
    py: 0.9,
    borderRadius: "12px",
    background: isActive(path)
      ? "linear-gradient(90deg, rgba(58,123,213,0.95), rgba(79,163,255,0.95))"
      : "transparent",
    boxShadow: isActive(path) ? "0 0 18px rgba(79,163,255,0.22)" : "none",
    border: isActive(path)
      ? "1px solid rgba(255,255,255,0.10)"
      : "1px solid transparent",
    "&:hover": {
      background: isActive(path)
        ? "linear-gradient(90deg, rgba(58,123,213,1), rgba(79,163,255,1))"
        : "rgba(255,255,255,0.06)",
    },
  });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          background: "rgba(9, 18, 30, 0.78)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: NAVBAR_HEIGHT,
            px: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                color: "#f8fafc",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                whiteSpace: "nowrap",
              }}
            >
              Atmosfair
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.2,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={desktopLinkSx(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Button
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              sx={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.15)",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "10px",
                px: 1.6,
                py: 0.6,
                minWidth: 60,
                "&:hover": {
                  background: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {language === "en" ? "FR" : "EN"}
            </Button>
            {user ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(230,240,255,0.95))",
                    color: theme.palette.primary.main,
                    fontWeight: 800,
                    fontSize: "1rem",
                    border: "1px solid rgba(255,255,255,0.55)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,1), rgba(238,245,255,1))",
                    },
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: "16px",
                      minWidth: 180,
                      background: "rgba(15, 23, 36, 0.96)",
                      color: "#fff",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <MenuItem onClick={handleProfile}>{t("profile")}</MenuItem>
                  <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.14)",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "12px",
                  px: 2.2,
                  py: 0.85,
                  background: "rgba(255,255,255,0.02)",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.22)",
                    background: "rgba(255,255,255,0.05)",
                  },
                }}
                startIcon={<AccountCircleIcon />}
              >
                {t("login")}
              </Button>
            )}
          </Box>

          <IconButton
            edge="end"
            aria-label="open menu"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: "#f8fafc",
              width: 42,
              height: 42,
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              "&:hover": {
                background: "rgba(255,255,255,0.06)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: "82%",
            maxWidth: 340,
            background: "rgba(8, 14, 24, 0.98)",
            color: "#fff",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 68,
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>
            {t("menu")}
          </Typography>

          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: "#fff",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

        <Box sx={{ px: 1.5, py: 1.5 }}>
          <Button
            fullWidth
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            sx={{
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "14px",
              py: 1.2,
              background: "rgba(255,255,255,0.03)",
              "&:hover": {
                background: "rgba(255,255,255,0.06)",
              },
            }}
          >
            {language === "en" ? "Français" : "English"}
          </Button>
        </Box>

        <List sx={{ px: 1.5, py: 1.5 }}>
          {navLinks.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                mb: 1,
                borderRadius: "14px",
                py: 1.35,
                px: 1.8,
                background: isActive(item.path)
                  ? "linear-gradient(90deg, rgba(58,123,213,0.95), rgba(79,163,255,0.95))"
                  : "transparent",
                border: isActive(item.path)
                  ? "1px solid rgba(255,255,255,0.10)"
                  : "1px solid transparent",
                "&:hover": {
                  background: isActive(item.path)
                    ? "linear-gradient(90deg, rgba(58,123,213,1), rgba(79,163,255,1))"
                    : "rgba(255,255,255,0.05)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 700,
                  color: "#f8fafc",
                }}
              />
            </ListItemButton>
          ))}

          <Divider
            sx={{
              my: 1.5,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          />

          {user ? (
            <>
              <ListItemButton
                onClick={handleProfile}
                sx={{
                  mb: 1,
                  borderRadius: "14px",
                  py: 1.35,
                  px: 1.8,
                  "&:hover": {
                    background: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <ListItemText
                  primary={t("profile")}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "#f8fafc",
                  }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: "14px",
                  py: 1.35,
                  px: 1.8,
                  "&:hover": {
                    background: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <ListItemText
                  primary={t("logout")}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "#f8fafc",
                  }}
                />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: "14px",
                py: 1.35,
                px: 1.8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                "&:hover": {
                  background: "rgba(255,255,255,0.06)",
                },
              }}
            >
              <ListItemText
                primary={t("login")}
                primaryTypographyProps={{
                  fontWeight: 700,
                  color: "#f8fafc",
                }}
              />
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
