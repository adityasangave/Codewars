import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext';
import { useParams } from 'react-router-dom';

function Details() {
    const [problemData, setProblemData] = useState(null);
    const user = useAuth();
    const { problem_id } = useParams();
    console.log(problem_id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`api/problem/problems/${problem_id}`, {
                    headers: {
                        Authorization: `Bearer ${user.user.token}`,
                    },
                });
                if (response.status === 200) {
                    console.log(response.data)
                    setProblemData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [problem_id, user.user.token]);

    return (
        problemData ? 
        <div className="details-container">
            <h2>{problemData.name}</h2>
            <div className="details-info">
                <div>
                    <p><strong>Difficulty:</strong> {problemData.difficulty}</p>
                    <p><strong>Time to Solve:</strong> {problemData.time_to_solve} minutes</p>
                    <p><strong>Description:</strong> {problemData.description}</p>
                </div>
                <div>
                    <p><strong>Example Input:</strong> {problemData.example_input}</p>
                    <p><strong>Example Output:</strong> {problemData.example_output}</p>
                    <p><strong>Required Testcase Input Type:</strong> {problemData.required_testcase_input}</p>
                    <p><strong>Required Testcase Output Type:</strong> {problemData.required_testcase_output}</p>
                </div>
            </div>

            <div className="testcases">
                <h3>Testcases</h3>
                <ul>
                    {problemData.testcases.map((testcase, index) => (
                        <li key={index}>
                            <strong>Testcase {index + 1}</strong>
                            <p><strong>Input:</strong> {testcase.input}</p>
                            <p><strong>Output:</strong> {testcase.output}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div> 
        : <div>Loading...</div>
    );
}

export default Details