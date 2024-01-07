import React, { useState } from 'react'
import CodeEditor from './CodeEditor'
import { useLocation } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import './Style.css'

function Playground() {
    const [code, setCode] = useState();
    const { state } = useLocation()
    const problem = state.selectedProblem;

    const handleCodeChange = (newCode) => {
        console.log(newCode)
        setCode(newCode);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '35%', height: '100%', overflow: 'auto' }}>
                <ProblemDescription problem={problem} />
            </div>
            <div style={{ width: '65%', height: '100%' }}>
                <CodeEditor value={code} handleOnChange={handleCodeChange} testcases={problem.testcases}/>
            </div>
        </div>
    );
}

export default Playground