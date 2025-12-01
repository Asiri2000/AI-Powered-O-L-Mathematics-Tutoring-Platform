import { useState } from 'react'
import './App.css'
import Navbar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuestionGenerator from './pages/questionGenerator';
import LearningCompanion from './pages/learningCompanion';
import Performance from './pages/Performance';
import Home from './pages/Home';
function App() {

  return (
    <Router>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/generator" element={<QuestionGenerator />} />
          <Route path="/companion" element={<LearningCompanion />} />
          <Route path="/performance" element={<Performance/>} />

        </Routes>
    </Router>
  )
}

export default App
