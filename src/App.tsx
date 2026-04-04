import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-content">
        <h1>Employees</h1>
        <p>This is the page content area.</p>
      </div>
    </div>
  );
}

export default App;
