import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ProblemList from './ProblemList';

import './Lobby.css'
import { useAuth } from '../../Context/AuthContext';

function Lobby() {
    const [problems, setProblems] = useState([]);
    const user = useAuth();
    const { state } = useLocation();
    const room = state.room
    const [selectedProblem, setSelectedProblem] = useState();
    const navigate = useNavigate();

    const handleProblemClicked = (id) => {
        navigate(`/details/${id}`);
    }

    const handleProblemSelect = (id) => {
        // Now Once owner selects a problem it wont reflect to other users websocket required here
        setSelectedProblem(problems.find((problem) => id === problem._id));
        console.log(selectedProblem)
    }

    useEffect(() => {
        // console.log(user)
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
        fetchData();
    }, [user.user.token]);

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
                            <FontAwesomeIcon icon={faUser} className='icon' />
                            <h4 className="name">{user.user.name}</h4>
                        </div>
                        <div className='player'>
                            <FontAwesomeIcon icon={faUser} className='icon' />
                            <h4 className="name">{user.user.name}</h4>
                        </div>
                    </div>
                </div>

                <ProblemList user = {user.user} room={room} problems={problems} handleProblemClicked={handleProblemClicked} handleProblemSelect={handleProblemSelect} />
            </div>
            <div className="selected">
                {selectedProblem ?
                    <div className='selected-content'>
                        <div>
                            <h3>{selectedProblem.name}</h3>
                        </div>
                        <div>
                            {room.created_by === user.user.id ?
                                <button className="state">Start</button> :
                                <button className='state'>Ready</button>
                            }
                        </div>
                    </div> :
                    <div>
                        <h3>No Problem Selected</h3>
                    </div>
                }
            </div>

        </div>
    );
}

export default Lobby;
