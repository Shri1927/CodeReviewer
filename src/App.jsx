import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CodeReviewer from './components/CodeReviewer';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={
            <>
              <Navbar />
              <CodeReviewer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App