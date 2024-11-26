import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import Navbar from '../Nav';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null); // State for file
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formDataToSend = new FormData(); // Create FormData object
    formDataToSend.append('username', formData.username);
    formDataToSend.append('FirstName', formData.FirstName);
    formDataToSend.append('LastName', formData.LastName);
    formDataToSend.append('Email', formData.Email);
    formDataToSend.append('Password', formData.Password);
    if (profilePhoto) {
      formDataToSend.append('Profilephoto', profilePhoto); // Append file
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      console.log('Registration successful:', response.data);
      setSuccess(true);
      setError(null);
      navigate('/Login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error('Error during registration:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="register-container">
      <div className="register-left">
        {/* <div className="image-placeholder">
       
        </div> */}
        <h2 className="slogan">Let’s Make it Happen Together!</h2>
      </div>
      <div className="register-right">
        <header className="header">
          <h1 className="logo">MP88</h1>
          <p className="login-link">
            Already have an account?{' '}
            {/* <a href="#" onClick={() => navigate('/Login')}>
              Sign in here
            </a> */}
          </p>
        </header>
        <h2 className="form-title">Create An Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Profile Photo:</label>
            <input
              type="file"
              name="Profilephoto"
              onChange={handleFileChange}
              accept="image/*" // Restrict to image files
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="Password"
              placeholder="Create Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="terms">
            <input type="checkbox" required />
            <label>
              By creating your account, you accept{' '}
              {/* <a href="#">Terms & Conditions</a>. */}
            </label>
          </div>
          <button type="submit" className="create-account-btn">
            Create Account
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Account created successfully!</p>}
        </form>
        <footer className="footer">
          &copy; 2024, Company Inc. All rights reserved.
        </footer>
      </div>
    </div>
    </>
  );
};

export default Register;
