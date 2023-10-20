import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(process.env.REACT_APP_API_URI)
axios.defaults.baseURL = "http://127.0.0.1:8000";
if(localStorage.getItem('token'))
  axios.defaults.headers.common['Authorization'] = `Bearer + ${localStorage.getItem('token')}`

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
