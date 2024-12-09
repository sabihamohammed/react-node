import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { authService } from '../services/authService'; // Check the import path here
import '../styles/login.css';



function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await authService.login(email, password);


      console.log('Login successful:', data);


      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      onLogin(data);

      navigate('/'); // Adjust the navigation path as needed
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage(error.message || 'Incorrect email id or password.');
    }
  };

  return (
    <div>
       <h1 style={{ textAlign: 'center' }}>Login Page</h1>
      <div className="login-container">
   
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          
          <div className="forgot-password">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </div>
          <div className="submit">
          <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
