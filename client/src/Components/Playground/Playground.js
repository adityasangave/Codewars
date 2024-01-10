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

    const languageIds = {
        'python' : "71",
        'c++' : "53",
        'java' : "91"
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
        "number_of_runs": null,
        "stdin": "Judge0",
        "expected_output": null,
        "cpu_time_limit": null,
        "cpu_extra_time": null,
        "wall_time_limit": null,
        "memory_limit": null,
        "stack_limit": null,
        "max_processes_and_or_threads": null,
        "enable_per_process_and_thread_time_limit": null,
        "enable_per_process_and_thread_memory_limit": null,
        "max_file_size": null,
        "enable_network": null
    }

    const handleSelectChange = (event) => {
        const lang = event.target.value;;
        setSelectedLanguage({'lang' : lang, 'id' : languageIds[lang]});
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
            <div style={{ width: '65%', height: '100%' }}>
                <div>
                    <select id="languages" value={selectedLanguage} onChange={handleSelectChange} style={{ border:'none' ,borderRadius: '7px', fontFamily: 'Poppins', padding: '5px', margin:'3px' }}>
                        <option value="c++">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>

                    {selectedLanguage['lang'] && (
                        <p>You selected: {selectedLanguage['lang']}</p>
                    )}
                </div>
                <CodeEditor value={code} handleOnChange={handleCodeChange} testcases={problem.testcases} handleCodeRun={handleCodeRun} />
            </div>
        </div>
    );
}

export default Playground