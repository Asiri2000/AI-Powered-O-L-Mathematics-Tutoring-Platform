import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuestionGenerator from './pages/user/questionGenerator';
import LearningCompanion from './pages/user/learningCompanion';
import Performance from './pages/user/Performance';
import Home from './pages/user/Home';
import Login from './pages/user/login';
import Signin from './pages/user/signin';
import UserDetails from './pages/admin/UserDetails';
import AdminPage from './pages/admin/adminPage';
import AddContent from './pages/admin/AddContent';
import LessonCompanion from './pages/user/lessonCompanion';
import Lessons from './pages/user/lessons';
import MockExam from './pages/user/MockExam';
function App() {

  return (
    <Router>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/generator" element={<QuestionGenerator />} />
          <Route path="/companion" element={<LearningCompanion />} />
          <Route path="/performance" element={<Performance/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signin />} />
          <Route path="/admin/users" element={<UserDetails />} />
          <Route path="/admin/add-content" element={<AddContent />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/lesson/:id" element={<LessonCompanion />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/mock-exam" element={<MockExam />} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App
