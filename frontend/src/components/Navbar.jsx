import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

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
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: theme.palette.text.primary, fontWeight: "bold" }}>
          Atmosfair
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((item) => (
              <Button key={item.label} component={Link} to={item.path} sx={{ color: theme.palette.text.primary }}>
                {item.label}
              </Button>
            ))}
            <Button variant="contained" color="secondary" component={Link} to="/contact">
              Get a Quote
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { md: "none" } }} onClick={handleDrawerToggle}>
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
