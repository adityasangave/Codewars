import React from 'react'
import Editor from '@monaco-editor/react';

function CodeEditor({ value, handleOnChange, testcases, handleCodeRun }) {
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
        </div>
    )
}

export default CodeEditor