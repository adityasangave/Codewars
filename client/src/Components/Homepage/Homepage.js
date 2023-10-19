import React from 'react';
import './Homepage.css'; // Import the CSS file

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="auth-buttons">
        <button className="auth-button">Sign Up</button>
        <button className="auth-button">Sign In</button>
      </div>
      <h1 className="codewars-heading">CodeWars</h1>
      <div className="button-container">
        <button className="create-button">Create a Challenge</button>
        <button className="join-button">Join a Challenge</button>
      </div>
    </div>
  );
}

export default Homepage;
