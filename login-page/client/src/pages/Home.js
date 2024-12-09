// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Home = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout function passed from the parent
    onLogout();
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
