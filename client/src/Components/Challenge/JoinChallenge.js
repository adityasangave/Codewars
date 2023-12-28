import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../Auth/Profile';

function JoinChallenge() {
    const navigate = useNavigate();
    const [inviteCode, setInviteCode] = useState('');
    const [room, setRoom] = useState();

    const handleInviteCodeChange = (e) => {
        setInviteCode(e.target.value);
    };

    const handleJoinChallenge = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        try {
            const response = await axios.post(
                'http://localhost:8000/api/join-challenge',
                { invite_code: inviteCode },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((response) => {
                if (response.status === 200) {
                    setRoom(response.data.challenge);
                    localStorage.setItem('room', JSON.stringify(response.data.challenge));
                    // navigate(`/room/:${room._id}`)
                } else {
                    console.error('Failed to create challenge:', response.data.message);
                }
            }).catch((error) => {
                console.error('Failed to join challenge:', error);
            });
        } catch (error) {
            console.log(error);
            console.error('Error joining challenge:', error);
        }
    };

    useEffect(() => {
        // Navigate to the room page once the room state is updated
        if (room) {
            navigate(`/room/${room._id}`, {state : {room}});
        }
    }, [room, navigate]);

    return (
        <div className="join-challenge-container">
            <Profile />
            <h1 className="codewars-heading">CodeWars</h1>
            <h3>Join Challenge</h3>
            <form onSubmit={handleJoinChallenge}>
                <input
                    type="text"
                    placeholder="Enter Invite Code"
                    value={inviteCode}
                    onChange={handleInviteCodeChange}
                />
                <button type="submit">Join</button>
            </form>
        </div>
    );
}

export default JoinChallenge;
