import React from 'react';

const ProblemList = ({ user, room, problems, handleProblemClicked, handleProblemSelect }) => {
    return (
        <div className="problem-section">
            {problems.map((problem) => (
                <div key={problem._id} className="problem"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor:'pointer' }}>
                    <div className="problem-info" onClick={() => handleProblemClicked(problem._id)}>
                        <div className='problem-name'>{problem.name}</div>
                        <div className='problem-description'>{problem.description}</div>
                        <div className='solve-time'>{problem.time_to_solve} minutes</div>
                    </div>
                    {room.created_by === user.id && <div><button onClick={() => handleProblemSelect(problem._id)}>Select</button></div>}
                </div>
            ))}

        </div>
    );
};

export default ProblemList;
