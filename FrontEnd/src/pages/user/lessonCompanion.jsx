import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or import your configured api instance if you have one
import LearningSlide from '../../components/slides/LearningSlide';
import CelebrationOverlay from '../../components/CelebrationOverlay';
import { useParams, useNavigate } from 'react-router-dom';

export default function LessonCompanion() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
    const { id } = useParams(); // <--- READ ID FROM URL (e.g., /lesson/5 -> id=5)
  const navigate = useNavigate();
  // 1. FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // Fetching lesson content from backend
        const response = await axios.get(`http://127.0.0.1:5080/api/lessons/${id}/content`);
        setSteps(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading lesson:", error);
        setLoading(false);
      }
    };
    fetchLesson();
  }, []);

  // 2. LOGIC FOR MOVING TO NEXT SLIDE
  const handleNext = (wasCorrect) => {
    let newCount = correctCount;
    
    if (wasCorrect) {
      newCount = correctCount + 1;
      setCorrectCount(newCount);
    }

    // Check: Is it time to celebrate? (Every 5 correct answers)
    if (wasCorrect && newCount > 0 && newCount % 5 === 0) {
      setShowCelebration(true);
    } else {
      advanceSlide();
    }
  };

  const advanceSlide = () => {
    setShowCelebration(false);
    setCurrentIndex(prev => prev + 1);
  };

  // 3. RENDER STATES
  if (loading) return (
    <div className="h-screen flex items-center justify-center text-gray-500">
      Loading Lesson...
    </div>
  );

  if (steps.length === 0) return (
    <div className="h-screen flex items-center justify-center text-red-500">
      No content found for this lesson. (Did you add the data in SQL?)
    </div>
  );

  // 4. COMPLETION STATE
  if (currentIndex >= steps.length) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-green-50 p-4">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">Lesson Complete!</h1>
        <p className="text-green-700 mb-6">You scored {correctCount} correct answers.</p>
        <button 
          onClick={() => navigate('/lessons')} // Navigate back to lessons list
          className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // 5. MAIN INTERFACE
  return (
    <div className="min-h-screen bg-gray-50 pt-16"> {/* pt-16 accounts for Navbar */}
      
      {/* Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-2 bg-gray-200 z-10">
        <div 
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex) / steps.length) * 100}%` }}
        />
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <CelebrationOverlay onComplete={advanceSlide} />
      )}

      {/* The Slide Content */}
      <div className="container mx-auto h-[calc(100vh-80px)]">
        <LearningSlide 
          // Key forces re-render when index changes (crucial for animations)
          key={currentIndex} 
          stepData={steps[currentIndex]} 
          onNext={handleNext}
        />
      </div>
    </div>
  );
}