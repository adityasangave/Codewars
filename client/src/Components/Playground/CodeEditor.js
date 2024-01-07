import React from 'react'
import Editor from '@monaco-editor/react';

function CodeEditor({ value, handleOnChange, testcases }) {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '80%', overflow: 'auto' }}>
                <Editor
                    width="100%"
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    onChange={handleOnChange}
                    theme="vs-dark"
                    options={{
                        scrollBeyondLastLine: false
                    }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent:'space-between', padding:'5px 20px' }}>
                <h3>Testcases</h3>
                <div>
                    <button className="run" style={{ margin : '0px 5px'}}>Run</button>
                    <button className="submit" style={{ margin : '0px 5px'}}>Submit</button>
                </div>
            </div>
            <div style={{ flex: '20%', overflow: 'auto' }}>
                <ul>
                    {testcases.slice(0, 2).map((testcase, index) => (
                        <li key={index}>
                            <strong>Testcase {index + 1}</strong>
                            <p><strong>Input:</strong> {testcase.input}</p>
                            <p><strong>Output:</strong> {testcase.output}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CodeEditor