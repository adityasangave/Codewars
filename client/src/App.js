import './App.css';
import Homepage from './Components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1><BrowserRouter>
        <Routes>
          <Route exact path='/' Component={Homepage} />
          <Route exact path='/create-challenge' Component={Homepage} />
          <Route exact path='/join-challenge' Component={Homepage} />
        </Routes>
      </BrowserRouter>
      </h1>
    </div>
  );
}

export default App;
