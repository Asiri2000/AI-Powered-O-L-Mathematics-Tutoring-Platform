import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircleQuestion, 
  GraduationCap, 
  Languages, 
  Presentation, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

const questionGenerator = () => {
  // --- STATE MANAGEMENT ---
  const [isGenerated, setIsGenerated] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('idle'); // 'idle', 'correct', 'incorrect'

  // Selection States
  const [selectedGrade, setSelectedGrade] = useState('10');
  const [selectedLanguage, setSelectedLanguage] = useState('sinhala');
  const [selectedLesson, setSelectedLesson] = useState('algebraic_expression');

  // Ref to scroll to the question section automatically
  const questionCardRef = useRef(null);

  // --- HANDLERS ---
  const handleGenerateClick = () => {
    setIsGenerated(true);
    setFeedback('idle'); 
    setUserAnswer('');
  };

  useEffect(() => {
    if (isGenerated && questionCardRef.current) {
      questionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isGenerated]);

  const handleCheckAnswer = () => {
    if (userAnswer.toLowerCase().includes('wrong')) {
      setFeedback('incorrect');
    } else {
      setFeedback('correct');
    }
  };

  // --- STYLES ---
  const getButtonStyle = (isActive) => {
    return `flex-1 py-2.5 px-4 rounded-lg font-bold text-lg transition-all duration-200 ${
      isActive
        ? 'bg-[#1b7a39] text-white shadow-sm' 
        : 'bg-gray-200 text-black border-b-4 border-gray-300 hover:bg-gray-300 hover:border-gray-400' 
    }`;
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4 min-h-screen bg-[#F3FBF6]">
      
      {/* =========================================
          CARD 1: SELECTION FORM 
         ========================================= */}
      <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-4xl mb-6">

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="bg-green-100 p-2 rounded-lg transform -rotate-6 shadow-sm">
            <MessageCircleQuestion className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-black">Question generator</h2>
            <p className="text-gray-600 text-lg">Create you own personalize questions</p>
          </div>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
          {/* Grade */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg font-medium text-black">
              <GraduationCap className="w-6 h-6 text-green-700 fill-current" />
              Select your grade
            </div>
            <div className="flex gap-4">
              <button onClick={() => setSelectedGrade('10')} className={getButtonStyle(selectedGrade === '10')}>Grade 10</button>
              <button onClick={() => setSelectedGrade('11')} className={getButtonStyle(selectedGrade !== '10')}>Grade 11</button>
            </div>
          </div>

          {/* Language */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg font-medium text-black">
              <Languages className="w-6 h-6 text-green-700" />
              Select Language
            </div>
            <div className="flex gap-4">
              <button onClick={() => setSelectedLanguage('sinhala')} className={getButtonStyle(selectedLanguage === 'sinhala')}>Sinhala</button>
              <button onClick={() => setSelectedLanguage('english')} className={getButtonStyle(selectedLanguage !== 'sinhala')}>English</button>
            </div>
          </div>
        </div>

        {/* Lesson Dropdown */}
        <div className="mb-8 max-w-2xl">
          <div className="flex items-center gap-3 mb-3 text-lg font-medium text-black">
            <Presentation className="w-6 h-6 text-black" />
            Select your lesson
          </div>
          <div className="relative">
            <select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              className="w-full p-3 pl-4 pr-10 bg-white border-2 border-black rounded-lg text-lg font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`}}
            >
              <option value="algebraic_expression">algebraic expression</option>
              <option value="quadratic_equations">Quadratic equations</option>
              <option value="geometry">Geometry</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerateClick}
            className="bg-[#1b7a39] hover:bg-[#145c2b] text-white text-xl font-bold py-3 px-20 rounded-lg shadow-md transition-colors duration-200"
          >
            Generate Questions
          </button>
        </div>

      </div>


      {/* =========================================
          CARD 2: QUESTION INTERFACE (Conditionally Rendered)
         ========================================= */}
      
      {isGenerated && (
        <div 
          ref={questionCardRef} 
          className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-4xl animate-fade-in-up"
        >
          {/* Question Display Box */}
          <div className="bg-[#F4FBF7] rounded-xl p-6 mb-6 border border-green-50/50">
            <h4 className="text-lg font-medium text-black mb-2">1. Simplify the following expression:</h4>
            <p className="text-xl font-mono text-gray-800 ml-4 font-semibold">3(2x-4)-2(x+5)</p>
          </div>

          {/* Answer Input Area */}
          <div className="mb-8">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Think carefully and type your answer here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none placeholder-gray-400"
            />
          </div>

          {/* Check Answer Button */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={handleCheckAnswer}
              className="bg-[#1b7a39] hover:bg-[#145c2b] text-white text-lg font-bold py-3 px-24 rounded-lg shadow-md transition-colors"
            >
              Check Answer
            </button>
          </div>

          {/* Feedback Section */}
          <div className="space-y-4">
            {feedback === 'correct' && (
              <div className="bg-[#DCFCE7] border border-green-500 rounded-xl p-4 flex items-center gap-3 animate-slide-up shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-600 fill-current bg-white rounded-full" />
                <span className="text-green-800 font-bold text-lg">Your answer is correct</span>
              </div>
            )}

            {feedback === 'incorrect' && (
              <div className="bg-[#FEE2E2] border border-red-500 rounded-xl p-4 flex items-center gap-3 animate-slide-up shadow-sm">
                <XCircle className="w-6 h-6 text-red-600 fill-current bg-white rounded-full" />
                <span className="text-red-800 font-bold text-lg">Your answer is incorrect</span>
              </div>
            )}
          </div>
          
        </div>
      )}

    </div>
  );
};

export default questionGenerator;