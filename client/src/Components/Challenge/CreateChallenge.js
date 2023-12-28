import React, { useState } from 'react';
import './CreateChallenge.css';
import Profile from '../Auth/Profile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateChallenge() {
  const navigate = useNavigate();
  const [room, setRoom] = useState();
  const [challenge_name, setChallengeName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteCodeVisible, setInviteCodeVisible] = useState(false);

  const handleChallengeNameChange = (e) => {
    setChallengeName(e.target.value);
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/create-challenge",
        { challenge_name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.challenge)
        
        const newInviteCode = response.data.challenge.invite_code;
        setInviteCode(newInviteCode);
        setInviteCodeVisible(true);
        
        setRoom(response.data.challenge)
        localStorage.setItem('room', JSON.stringify(response.data.challenge)) // Save room to localstorage for recovery purposes
      } else {
        alert(response.data.message);
        setChallengeName('');
      }
    } catch (error) {
      console.log(error);
      console.error('Error creating a challenge:', error);
    }
  };


  return (
    <div className="create-challenge-container">
      <Profile />
      <h1 className="codewars-heading">CodeWars</h1>
      <h3>Create Challenge</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Challenge Name"
          value={challenge_name}
          onChange={handleChallengeNameChange}
        />
        {inviteCodeVisible && (
          <div className="invite_code">Invite Code: {inviteCode}</div>
        )}
        {inviteCodeVisible ? (
          <button className="go-to-room" onClick={() => navigate(`/room/${room._id}`, {state : {room}})}>
            Go to Room
          </button>
        ) : (
          <button className="create-button" onClick={handleCreateChallenge}>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateChallenge;
