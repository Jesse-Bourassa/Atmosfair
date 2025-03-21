import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';

// Import Pages
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import About from './pages/About';

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Primary Blue
    },
    secondary: {
      main: '#1976D2', // Darker Blue for accents
    },
    text: {
      primary: '#ffffff', // White text for contrast
      secondary: '#B3E5FC', // Light blue text for softer contrast
    },
    background: {
      default: '#0D47A1', // Deep Blue Background
      paper: '#1565C0', // Slightly lighter blue
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Custom font family
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#ffffff', // Ensures white text on blue background
    },
    h2: {
      fontSize: '2.5rem',
      color: '#ffffff',
    },
    h4: {
      color: '#B3E5FC', // Lighter blue for contrast
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff', // White text
          backgroundColor: '#1E88E5', // Button Blue
          '&:hover': {
            backgroundColor: '#1565C0', // Darker Blue on Hover
          },
        },
      },
    },
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}> {/* Wrap your app with the ThemeProvider */}
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
