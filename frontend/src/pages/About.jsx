// src/pages/Home.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <nav>
          <Link to="/">Home</Link>
        </nav>
      <h1>About Page</h1>
      <p>Welcome to the About page!</p>
    </div>
  );
};

export default Home;
