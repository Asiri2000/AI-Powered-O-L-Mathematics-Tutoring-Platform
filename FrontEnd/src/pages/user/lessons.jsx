import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Simple mapping for icons based on theme
const themeIcons = {
  geometry: '📐',
  algebra: '∑',
  numbers: '🔢',
  stats: '📊',
  logic: '🧩',
  default: '📝'
};

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 1. Fetch Data
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Ensure this URL matches your backend
        const res = await axios.get('http://127.0.0.1:5080/api/lessons/');
        setLessons(res.data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  // 2. Filter Logic (Search)
  const filteredLessons = lessons.filter((lesson) => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Loading State
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
      Loading Syllabus...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">O/L Mathematics Syllabus</h1>
            <p className="text-gray-600">Select a topic to begin your theory & practice session.</p>
          </div>

          {/* --- SEARCH BAR --- */}
          <div className="relative w-full md:w-72">
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search lessons..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* --- LESSONS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[50vh]">
          <AnimatePresence>
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson, index) => (
                <motion.div
                  layout // Enables smooth shuffle animation when filtering
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={lesson.id}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer flex flex-col items-center text-center transition-all"
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                >
                  {/* Icon Circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${
                    index % 2 === 0 ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
                  }`}>
                    {themeIcons[lesson.theme_slug] || themeIcons.default}
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                    {lesson.description || "Start learning concepts"}
                  </p>

                  <button className="mt-auto px-4 py-2 bg-green-700 text-white text-sm font-bold rounded-lg w-full hover:bg-green-800 transition-colors">
                    START
                  </button>
                </motion.div>
              ))
            ) : (
              // Empty State (If search matches nothing)
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center text-gray-400 py-20"
              >
                <div className="text-4xl mb-2">😕</div>
                <p>No lessons found for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-green-600 underline hover:text-green-800"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}