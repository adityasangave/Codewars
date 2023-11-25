import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = process.env.REACT_APP_API_URI;
if (JSON.parse(localStorage.getItem('user'))) {
  let user = JSON.parse(localStorage.getItem('user'))
  let token = user.token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
