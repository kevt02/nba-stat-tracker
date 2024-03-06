import logo from './logo.svg';
import './App.css';
import Graph from './components/Graph';
import Rankings from './components/Rankings';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
      {/* <Rankings /> */}
     {/* < Graph /> */}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
