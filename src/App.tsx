import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {EmployeeContainer } from './components/Employee/EmployeeContainer';
import Map from './components/Map';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeContainer  />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
