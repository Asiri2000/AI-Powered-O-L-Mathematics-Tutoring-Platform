import React from 'react';
import { motion } from 'framer-motion';

export default function CelebrationOverlay({ onComplete }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Amazing Job!</h2>
        <p className="text-gray-600 mb-6">You've completed 5 questions in a row. Keep the streak alive!</p>
        
        <button 
          onClick={onComplete}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 rounded-xl transition-colors"
        >
          KEEP GOING
        </button>
      </motion.div>
    </div>
  );
}