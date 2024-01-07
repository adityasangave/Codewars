import React from 'react'
import Editor from '@monaco-editor/react';

function CodeEditor({ value, handleOnChange }) {
    return (
        <div style={{ height: '100%', overflow: 'hidden' }}>
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
    )
}

export default CodeEditor