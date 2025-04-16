import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer,
  List, ListItem, ListItemText, Box, Menu, MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContext"; // 👈


const Navbar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // ✅ for dropdown
  const { user, setUser } = useAuth();
  const navigate = useNavigate(); // ✅ navigation for logout/profile

 

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    handleMenuClose();
    navigate("/");
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Service", path: "/service" },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              fontWeight: "bold",
              flex: "0 0 auto",
            }}
          >
            Atmosfair
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, justifyContent: "center", flex: 1 }}>

            {navLinks.map((item) => (
              
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: theme.palette.text.primary,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  px: 2.5,
                  py: .7,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            
            {user?.role === "admin" && (
  <Button
    component={Link}
    to="/admin/dashboard"
    sx={{
      color: theme.palette.text.primary,
      textTransform: "none",
      fontSize: "1rem",
      fontWeight: 500,
      px: 2.5,
      py: 0.7,
      borderRadius: 2,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    }}
  >
    Dashboard
  </Button>
)}

          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, flex: "0 0 auto" }}>
            {user ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    backgroundColor: "white",
                    color: theme.palette.primary.main,
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[200],
                    },
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "white",
                  color: theme.palette.primary.main,
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                  },
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            )}
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {navLinks.map((item) => (
            <ListItem button key={item.label} component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem button component={Link} to="/contact" onClick={handleDrawerToggle}>
            <ListItemText primary="Get a Quote" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
