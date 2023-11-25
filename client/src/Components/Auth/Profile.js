import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';


function Profile() {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.get('http://localhost:8000/auth/logout');
            localStorage.removeItem('user')
            console.log('Logout Successfull', response);
            navigate('/login')
        }
        catch {
            console.log("Something went wrong");
        }
    }

    const renderIfAuthenticated = (
        <div className="auth-buttons">
            Welcome {isAuthenticated.user ? isAuthenticated.user.name : 'Guest'}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );

    const normalRender = (
        <div className="auth-buttons">
            <Link to="/register">
                <button className="auth-button">Sign Up</button>
            </Link>
            <Link to="/login">
                <button className="auth-button">Sign In</button>
            </Link>
        </div>
    );
    
    return isAuthenticated.isAuthenticated ? renderIfAuthenticated : normalRender;
}

export default Profile