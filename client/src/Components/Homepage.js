import React from 'react';
import '../styles/Homepage.css'

function Homepage() {
  return (
    <div className="homepage-container">
      <h1 className="codewars-heading">CodeWars</h1>
      <div className="button-container">
        <button className="create-button">Create a Challenge</button>
        <button className="join-button">Join a Challenge</button>
      </div>
    </div>
  );
}

export default Homepage;
