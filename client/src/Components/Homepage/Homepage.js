import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const history = useNavigate();
  const isAuthenticated = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.get('http://localhost:8000/auth/logout');
      localStorage.removeItem('user')
      console.log('Logout Successfull', response);
      window.location.reload();
    }
    catch {
      console.log("Something went wrong");
    }
  }

  const renderIfAuthenticated = (
    <div className="homepage-container">
      <div className="auth-buttons">
        Welcome {isAuthenticated.user ? isAuthenticated.user.name : 'Guest'}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h1 className="codewars-heading">CodeWars</h1>
      <div className="button-container">
        <Link to="/create-challenge">
          <button className="create-button">Create a Challenge</button>
        </Link>
        <Link to="/join-challenge">
          <button className="join-button">Join a Challenge</button>
        </Link>
      </div>
    </div>
  );

  const normalRender = (
    <div className="homepage-container">
      <div className="auth-buttons">
        <Link to="/register">
          <button className="auth-button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="auth-button">Sign In</button>
        </Link>
      </div>
      <h1 className="codewars-heading">CodeWars</h1>
      <div className="button-container">
        <Link to="/create-challenge">
          <button className="create-button">Create a Challenge</button>
        </Link>
        <Link to="/join-challenge">
          <button className="join-button">Join a Challenge</button>
        </Link>
      </div>
    </div>
  );
  return isAuthenticated.isAuthenticated ? renderIfAuthenticated : normalRender;
}

export default Homepage;
