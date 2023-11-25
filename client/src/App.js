import './App.css';
import Homepage from './Components/Homepage/Homepage';
import CreateChallenge from './Components/Challenge/CreateChallenge';
import JoinChallenge from './Components/Challenge/JoinChallenge';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { AuthProvider } from './Context/AuthContext';
import { useAuth } from './Context/AuthContext';

function App() {
  function RequireAuth({ children }) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated === true ? children : <Navigate to="/login" replace />;
  }
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />

            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Challenge Routes */}
            <Route path="/create-challenge" element={
              <RequireAuth>
                <CreateChallenge />
              </RequireAuth>
            } />
            <Route path="/join-challenge" element={
              <RequireAuth>
                <JoinChallenge/>
              </RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}


export default App;
