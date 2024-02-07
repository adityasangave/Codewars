import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ProblemList from './ProblemList';

import { io } from 'socket.io-client';
import './Lobby.css'
import { useAuth } from '../../Context/AuthContext';

function Lobby() {
    const user = useAuth();

    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState();
    const [socket, setSocket] = useState();
    const [joinedParticipants, setJoinedParticipants] = useState([]);

    const { state } = useLocation();
    const room = state.room;
    const navigate = useNavigate();

    const handleProblemClicked = (id) => {
        navigate(`/details/${id}`);
    };

    const handleProblemSelect = (id) => {
        const selected = problems.find((problem) => id === problem._id);
        console.log(selected);

        if (selectedProblem) {
            setSelectedProblem(null);
            socket.emit('modifyProblem', room.invite_code, null);
        } else {
            console.log(selectedProblem);
            socket.emit('modifyProblem', room.invite_code, selected.name);
        }
    };


    const handleRoomLeave=()=>{
        console.log("Left", room.invite_code)

        const handleUserLeftRoom=(data)=>{
            alert(`${data} Left the room`)
            navigate('/');
        }

        socket.emit('roomLeave', room.invite_code, user.user.id);
        socket.on('userLeft', handleUserLeftRoom);
    }

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
        console.log("Connected ", newSocket)
        newSocket.on('connect', () => {
            console.log('Connected:', newSocket.id);

            // Add joinRoom functionality
            newSocket.emit('joinRoom', room.invite_code, user.user.name);

            const handleNewParticipants = (data) => {
                // show a classy dialogue when this occurs
                alert(`${data} Joined the room`);
            };

            newSocket.on('newParticipants', handleNewParticipants);

            newSocket.emit('getParticipants', room.invite_code);

            const handleGetParticipants = (data) => {
                console.log(data);
                setJoinedParticipants(data);
            };

            const handleGetParticipantsFailed=(data)=>{
                console.log("failed"+data)
            }
            newSocket.on('participants', handleGetParticipants);
            newSocket.on('failed', handleGetParticipantsFailed);

        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [room.invite_code, user.user.name])

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
        fetchData();
    }, [user.user.token]);

    useEffect(() => {
        socket.on('problemUpdated', (data)=>{
            console.log(data);
            setSelectedProblem(data)
        });
    
      return () => {
        socket.off('problemUpdated');
      }
    }, [socket])

  return (
    <div>
            <div className="container">
                <div className="heading">
                    <div className='heading-text'>Codewars</div>
                    <button className="leave" onClick={handleRoomLeave}>Leave</button>
                </div>
                <div className="sub-heading">Choose a Problem Statement</div>
                {/* other components */}

                <div className="room-info">
                    <div className="state-button">
                        <h2>{room.challenge_name}</h2>
                        <p>
                            Invite Code : {room.invite_code}
                        </p>
                    </div>
                    <div className="players">
                        {joinedParticipants.map((participant) => (
                            <div key={participant._id} className='player'>
                                <FontAwesomeIcon icon={faUser} className='icon' />
                                <h4 className="name">{participant.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <ProblemList user={user.user} room={room} problems={problems} selected={selectedProblem} handleProblemClicked={handleProblemClicked} handleProblemSelect={handleProblemSelect} />
            </div>
            <div className="selected">
                {selectedProblem ?
                    <div className='selected-content'>
                        <div>
                            <h3>{selectedProblem}</h3>
                        </div>
                        <div>
                            {room.created_by === user.user.id ?
                                <button className="state" onClick={() => { navigate('/playground', { state: { selectedProblem } }) }}>Start</button> :
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
  )
}

export default Lobby


// function Lobby() {
//     

    
    

    

    

    

//     return (
        
//     );
// }

// export default Lobby;


