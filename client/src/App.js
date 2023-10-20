import './App.css';
import Homepage from './Components/Homepage/Homepage';
import CreateChallenge from './Components/Challenge/CreateChallenge';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { AuthProvider } from './Context/AuthContext';

function App() {
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
            <Route path="/create-challenge" element={<CreateChallenge />} />
            <Route path="/join-challenge" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
