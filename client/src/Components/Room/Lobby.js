import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

import './Lobby.css'

function Lobby() {
    const [problems, setProblems] = useState([]);
    const [user, setUser] = useState({});
    const { state } = useLocation();
    const [room, setRoom] = useState(state.room);

    const handleProblemClicked = (id) => {
        // console.log("Problem with id clicked" + id)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/problem/problems');
                if (response.status === 200) {
                    setProblems(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const updateRoomAndUser = () => {
            setUser(JSON.parse(localStorage.getItem('user')) || {});
        };
        
        fetchData();
        updateRoomAndUser();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="heading">Codewars</div>
                <div className="sub-heading">Choose a Problem Statement</div>
                {/* other components */}

                <div className="room-info">
                    <div className="state-button">
                        <button>{room.challenge_name}</button>
                    </div>
                    <div className="players">

                    </div>
                </div>

                <div className="problem-section">
                    {problems.map((problem) => (
                        <div key={problem._id} className="problem" onClick={handleProblemClicked(problem._id)}>
                            <div className="problem-info">
                                <div className='problem-name'>{problem.name}</div>
                                <div className='problem-description'>{problem.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Lobby;
