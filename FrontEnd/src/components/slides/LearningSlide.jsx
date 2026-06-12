import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LearningSlide({ stepData, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'wrong'
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleCheck = () => {
    const option = stepData.options.find(opt => opt.id === selectedOption);
    if (option?.is_correct) {
      setStatus('correct');
    } else {
      setStatus('wrong');
    }
  };

  useEffect(() => {
    if (!isImageOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsImageOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isImageOpen]);

  useEffect(() => {
    setIsImageVisible(window.innerWidth >= 768);
  }, []);

  // Find correct option text to show when the user answers incorrectly
  const correctOptionText = stepData?.options?.find(opt => opt.is_correct)?.option_text ?? '';

  return (
    // 1. MAIN CONTAINER: Takes full height of parent, splits into Scrollable Body + Footer
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* 2. SCROLLABLE BODY: Wraps Theory + Question. This part scrolls independently. */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        
        {/* --- THEORY SECTION --- */}
        {stepData.theory_text && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Quick Tip
              </h3>
              {stepData.theory_media_url && (
                <button
                  onClick={() => setIsImageVisible(!isImageVisible)}
                  className="text-xs text-blue-600 underline md:hidden"
                >
                  {isImageVisible ? 'Hide Image' : 'Show Image'}
                </button>
              )}
            </div>

            <div className={`flex flex-col md:flex-row gap-6 ${!isImageVisible ? 'items-start' : ''}`}>
              <div className="flex-1">
                 <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {stepData.theory_text}
                </p>
              </div>

              {stepData.theory_media_url && isImageVisible && (
                <div className="md:w-1/2 flex justify-center">
                  <img
                    onClick={() => setIsImageOpen(true)}
                    src={stepData.theory_media_url}
                    alt="Visual Aid"
                    className="rounded-lg border border-blue-100 shadow-sm cursor-zoom-in max-h-48 md:max-h-64 object-contain bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- QUESTION SECTION --- */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-tight">
            {stepData.question_text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
            {stepData.options.map((option) => (
              <motion.button
                key={option.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => status === 'idle' && setSelectedOption(option.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedOption === option.id
                    ? status === 'correct'
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : status === 'wrong'
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-blue-50 border-blue-500 text-blue-800'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium text-sm md:text-base">{option.option_text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* --- WRONG ANSWER HINT --- */}
      {status === 'wrong' && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md mx-4 md:mx-8 mb-2">
          <p className="text-sm"><strong>Correct answer is:</strong> {correctOptionText}. Please refer the note and try again.</p>
        </div>
      )}

      {/* 3. FIXED FOOTER: Always visible at bottom */}
      <div className="p-4 border-t border-gray-100 bg-white z-10">
        {status === 'idle' ? (
          <button 
            onClick={handleCheck}
            disabled={!selectedOption}
            className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-colors shadow-lg"
          >
            Check Answer
          </button>
        ) : (
          <button 
            onClick={() => {
                if (status === 'correct') {
                  setStatus('idle');
                  setSelectedOption(null);
                  onNext(true);
                } else {
                  // Wrong answer: reset so student can try again; do NOT advance
                  setStatus('idle');
                  setSelectedOption(null);
                }
            }}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg ${
              status === 'correct' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {status === 'correct' ? 'Continue' : 'Got it'}
          </button>
        )} 
      </div>

      {/* --- LIGHTBOX MODAL (Full Screen Image) --- */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}
        >
          <img
            src={stepData.theory_media_url}
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute top-4 right-4 text-white text-4xl">&times;</button>
        </div>
      )}
    </div>
  );
}