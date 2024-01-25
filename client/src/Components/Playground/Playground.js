import React, { useState } from 'react'
import CodeEditor from './CodeEditor'
import { useLocation } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import './Style.css'
import axios from 'axios'

function Playground() {
    const [selectedLanguage, setSelectedLanguage] = useState({});

    const [code, setCode] = useState();
    const { state } = useLocation()
    const problem = state.selectedProblem;
    let token = ''

    const [activeTab, setActiveTab] = useState('input');

    const languageIds = {
        'python': "71",
        'c++': "53",
        'java': "91"
    }

    const options = {
        url: 'https://judge0-ce.p.rapidapi.com',
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '75f48a60ebmsh8400fc7d428e7a0p148edcjsn140669f418db',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    const reqBody = {
        "source_code": `${code}`,
        "language_id": "71",
        "stdin": "Judge0",
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSelectChange = (event) => {
        const lang = event.target.value;;
        setSelectedLanguage({ 'lang': lang, 'id': languageIds[lang] });
    };

    const handleCodeChange = (newCode) => {
        console.log(newCode)
        setCode(newCode);
    };

    function waitFor5Seconds(callbackFunc) {
        setTimeout(() => {
            console.log('wait 5 seconds');
            callbackFunc(); // Invoke the callback function here.
        }, 5000);
    }

    const handleCodeRun = () => {
        console.log("Code Run")
        axios(`${options.url}/submissions`, {
            method: 'POST',
            headers: options.headers,
            data: reqBody
        }).then(response => {
            console.log(response.data);
            token = response.data.token
        }).catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });

        waitFor5Seconds(function () {
            axios(`${options.url}/submissions/${token}`, {
                method: "GET",
                headers: options.headers
            })
                .then((response) => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        });
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '35%', height: '100%', overflow: 'auto' }}>
                <ProblemDescription problem={problem} />
            </div>
            <div style={{ width: '65%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div>
                    <select id="languages" value={selectedLanguage['lang']} onChange={handleSelectChange} style={{ border: 'none', borderRadius: '7px', fontFamily: 'Poppins', padding: '5px', margin: '3px' }}>
                        <option value="c++">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                </div>
                <div style={{ flex: '70%', overflow: 'auto' }}>
                    <CodeEditor value={code} handleOnChange={handleCodeChange} testcases={problem.testcases} handleCodeRun={handleCodeRun} />
                </div>

                <div style={{ flex: '30%' }}>
                    <div className="select-console" style={{ display: 'flex', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: '1', margin: '0px 5px' }}>
                            <div style={{ margin: '3px' }}>
                                Input
                            </div>
                            <div className="input">
                                <textarea name="input" rows="10" placeholder="Enter input" style={{ width: '100%', boxSizing: 'border-box', margin: 0, padding: '5px', border: '2px solid black', resize: 'none' }}></textarea>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: '1', margin: '0px 5px' }}>
                            <div style={{ margin: '3px' }}>
                                Output
                            </div>
                            <div className="input">
                                <textarea name="input" rows="10" placeholder="Output" style={{ width: '100%', boxSizing: 'border-box', margin: 0, padding: '5px', border: '2px solid black', resize: 'none' }}></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0px' }}>
                    <div>
                        <button className="run" style={{ margin: '0px 5px' }} onClick={handleCodeRun}>Run</button>
                        <button className="submit" style={{ margin: '0px 5px' }}>Submit</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Playground