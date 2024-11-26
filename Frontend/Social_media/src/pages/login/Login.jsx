import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.css';
import {  useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    Password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/users/login',
        {
          username: formData.username,
          Password: formData.Password,
        },
      );
      const { accessToken, refreshToken, user } = response.data;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("User Data:", user);
  

      // Save the access token in a cookie
      Cookies.set('accessToken', accessToken, {
        expires: 1, // 1 day expiration
        secure: false, // Set to true for HTTPS // Helps prevent CSRF attacks
      });

      console.log('Access token saved in cookies:', accessToken);
      navigate('/');
      setSuccess(true);
      setError(null);
      
    } catch (err) {
      console.error('Error during login:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialMediaMP88</h3>
          <span className="loginDesc">Connect with friends and the world around you.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              name="Password"
              type="Password"
              value={formData.Password}
              onChange={handleChange}
              className="loginInput"
              required
            />
            <button type="submit" className="loginButton">Log In</button>
            {error && <p className="errorMessage">{error}</p>}
            {success && <p className="successMessage">Login Successful!</p>}
            <span className="loginForgot">Forgot Password?</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
