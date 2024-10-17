import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Stepper from './component/Stepper';
import AllDetails from './component/AllDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Stepper/>} />
          <Route path="/details" element={<AllDetails/>} />
        </Routes>  
      </Router> 
    </div>
  );
}

export default App;
