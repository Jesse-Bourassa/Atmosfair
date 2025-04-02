import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle mobile menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navbar Links
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Service", path: "/service" },
    { label: "Contact", path: "/contact" },
  ];

  const authLinks = [
    { label: "Login", path: "/login" },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
  {/* Logo (Left) */}
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

  {/* Centered Nav Links */}
  <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, justifyContent: "center", flex: 1 }}>
    {navLinks.map((item) => (
      <Button
      key={item.label}
      component={Link}
      to={item.path}
      sx={{
        color: theme.palette.text.primary,
        textTransform: "none",
        fontSize: "1rem", // Make text more readable
        fontWeight: 500,
        px: 2.5, // Add horizontal padding
        py: .7,   // Add vertical padding
        borderRadius: 2,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
      }}
    >
      {item.label}
    </Button>
    ))}
  </Box>

  {/* Auth Links on the Right */}
  <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, flex: "0 0 auto" }}>
    {authLinks.map((item) => (
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
    ))}
  </Box>

  {/* Mobile Menu Button */}
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

      {/* Mobile Drawer */}
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
