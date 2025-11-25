import './App.css';
import Navbar from './components/Navbar';
import Employees from './components/Employee';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-content">
        <h1>Employees</h1>
        <Employees />
      </div>
    </div>
  );
}

export default App;


