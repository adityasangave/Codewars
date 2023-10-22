import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import Profile from '../Auth/Profile';

function Homepage() {
  return (
    <div className="homepage-container">
      <Profile/>
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
