import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login';
import Home from './pages/Home';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  function LoginPageWrapper() {
    const handleLoginSuccess = () => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    };

    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  const AuthenticatedLayout = () => (
    <div className="main-container">
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home onLogout={handleLogout} />} />
          {/* Add other routes for authenticated users here */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPageWrapper />} />
        {isAuthenticated ? (
          <Route path="/*" element={<AuthenticatedLayout />} />
        ) : (
          <Route path="*" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
