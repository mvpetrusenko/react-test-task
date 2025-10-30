import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage'; 
import SecondPage from './pages/SecondPage/SecondPage'; 
import ThirdPage from './pages/ThirdPage/ThirdPage'; 
import './App.css';  


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} /> 
          <Route path="/second" element={<SecondPage />} /> 
          <Route path="/third" element={<ThirdPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;