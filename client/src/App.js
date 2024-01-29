import './App.css';
import Homepage from './Components/Homepage/Homepage';
import CreateChallenge from './Components/Challenge/CreateChallenge';
import JoinChallenge from './Components/Challenge/JoinChallenge';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { AuthProvider } from './Context/AuthContext';
import { SocketProvider } from './Context/SocketContext';
import { useAuth } from './Context/AuthContext';
import Lobby from './Components/Room/Lobby';
import Details from './Components/Room/Details';
import Playground from './Components/Playground/Playground';

function App() {
  function RequireAuth({ children }) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated === true ? children : <Navigate to="/login" replace />;
  }
  return (
    <AuthProvider>
      <SocketProvider>
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

            
            <Route path="/room/:room_id" element={
              <RequireAuth>
                <Lobby/>
              </RequireAuth>} />

              <Route path="/details/:problem_id" element={
              <RequireAuth>
                <Details/>
              </RequireAuth>} />

              <Route path="/playground"  element={
              <RequireAuth>
                <Playground/>
              </RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </div>
      </SocketProvider>
    </AuthProvider>
  );
}


export default App;
