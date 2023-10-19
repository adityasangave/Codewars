import './App.css';
import Homepage from './Components/Homepage/Homepage';
import CreateChallenge from './Components/Challenge/CreateChallenge';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Auth/Register';

function App() {
  return (
    <div className="App">
      <h1><BrowserRouter>
        <Routes>
          <Route exact path='/' Component={Homepage} />

          {/* //Auth Routes */}
          <Route exact path='/register' Component={Register} />
          <Route exact path='/create-challenge' Component={CreateChallenge} />

          {/* Challenge Routes */}
          <Route exact path='/create-challenge' Component={CreateChallenge} />
          <Route exact path='/join-challenge' Component={Homepage} />
          
        </Routes>
      </BrowserRouter>
      </h1>
    </div>
  );
}

export default App;
