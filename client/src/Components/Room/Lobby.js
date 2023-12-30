import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


import './Lobby.css'
import { useAuth } from '../../Context/AuthContext';

function Lobby() {
    const [problems, setProblems] = useState([]);
    const user = useAuth();
    const { state } = useLocation();
    const [room, setRoom] = useState(state.room);

    const handleProblemClicked = (id) => {
        // console.log("Problem with id clicked" + id)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/problem/problems', {
                    headers: {
                        Authorization: `Bearer ${user.user.token}`,
                    },
                });
                if (response.status === 200) {
                    setProblems(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // const updateRoomAndUser = () => {
        //     setUser(JSON.parse(localStorage.getItem('user')) || {});
        // };

        fetchData();
        // updateRoomAndUser();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="heading">Codewars</div>
                <div className="sub-heading">Choose a Problem Statement</div>
                {/* other components */}

                <div className="room-info">
                    <div className="state-button">
                        <h2>{room.challenge_name}</h2>
                    </div>
                    <div className="players">
                        <div className='player'>
                            <FontAwesomeIcon icon={faUser} className='icon'/>
                            <h4 className="name">{user.user.name}</h4>
                        </div>
                        <div className='player'>
                            <FontAwesomeIcon icon={faUser} className='icon'/>
                            <h4 className="name">{user.user.name}</h4>
                        </div>
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
