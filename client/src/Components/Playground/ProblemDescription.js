import React from 'react';

function ProblemDescription({ problem }) {
    return (
        <div className="leetcode-style-container">
            <h2>{problem.name}</h2>
            <div className="details-info">
                <div>
                    <p><strong>Difficulty:</strong> {problem.difficulty}</p>
                    <p><strong>Time to Solve:</strong> {problem.time_to_solve} minutes</p>
                    <p><strong>Description:</strong> {problem.description}</p>
                </div>
                <div>
                    <p><strong>Example Input:</strong> {problem.example_input}</p>
                    <p><strong>Example Output:</strong> {problem.example_output}</p>
                    <p><strong>Required Testcase Input Type:</strong> {problem.required_testcase_input}</p>
                    <p><strong>Required Testcase Output Type:</strong> {problem.required_testcase_output}</p>
                </div>
            </div>

            <div className="testcases">
                <h3>Testcases</h3>
                <ul>
                    {problem.testcases.map((testcase, index) => (
                        <li key={index}>
                            <strong>Testcase {index + 1}</strong>
                            <p><strong>Input:</strong> {testcase.input}</p>
                            <p><strong>Output:</strong> {testcase.output}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProblemDescription;
