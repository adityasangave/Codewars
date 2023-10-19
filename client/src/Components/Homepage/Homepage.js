import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Homepage.css';

function Homepage() {
  return (
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
}

export default Homepage;
