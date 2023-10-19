import React, { useState } from 'react';
import './CreateChallenge.css'

function CreateChallenge() {
  const [challengeName, setChallengeName] = useState('');

  const handleChallengeNameChange = (e) => {
    setChallengeName(e.target.value);
  };

  const handleCreateChallenge = () => {
    // Handle the creation of the challenge with the challengeName
    console.log(`Creating a challenge with the name: ${challengeName}`);
  };

  return (
    <div className="create-challenge-container">
      <h1 className="codewars-heading">CodeWars</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Challenge Name"
          value={challengeName}
          onChange={handleChallengeNameChange}
        />
        <button className="create-button" onClick={handleCreateChallenge}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateChallenge;
