import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  MessageCircle, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import img1 from '../../assets/student.png'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3FBF6]">
      
      {/* =========================================
          HERO SECTION
         ========================================= */}
      {/* ADDED CONTAINER: max-w-7xl mx-auto ensures it aligns with the rest of the page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-12 sm:pb-16">
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          
          {/* Left: Text Content */}
          <div className="flex-1 space-y-6 sm:space-y-8 animate-fade-in-up z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-semibold border border-green-200">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Learning for G.C.E. O/L</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Mathematics with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Intelligent Tutor</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
              A syllabus-integrated platform that adapts to you. Generate exam-style questions, clear doubts in Sinhala & English, and track your path to an 'A' pass.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button 
                onClick={() => navigate('/generator')}
                className="bg-[#1b7a39] hover:bg-[#145c2b] text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Start Practicing Now
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
              <a 
                href="http://localhost:3000/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-50 text-slate-700 text-base sm:text-lg font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border border-gray-200 shadow-sm transition-all flex items-center justify-center"
              >
                Start with Mathematics Tutor
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium pt-2">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-600" /> Grade 10 & 11</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-600" /> Sinhala & English</span>
            </div>
          </div>

          {/* Right: Image Section */}
          <div className="flex-1 w-full relative hidden md:flex justify-center items-center">
             
             {/* Note: I removed 'max-w-2xl' so the image can fill the container space */}
             <img 
              src={img1}
              alt="Student learning mathematics with AI"
              className="relative z-10 w-full h-auto object-contain rounded-3xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-500"
             />

            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-green-300/40 rounded-full blur-3xl -z-0"></div>
          </div>

        </div>
      </div>

      {/* =========================================
          FEATURE GRID
         ========================================= */}
      {/* This container matches the Hero Section width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-4">Everything you need to succeed</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Feature 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-green-50 group cursor-pointer" onClick={() => navigate('/generator')}>
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 sm:w-8 h-6 sm:h-8 text-green-700" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Adaptive Question Generator</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Don't just practice randomly. Get questions tailored to your weak areas in Grade 10 & 11 syllabus topics.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-green-50 group cursor-pointer" onClick={() => navigate('http://localhost:3000/')}>
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 sm:w-8 h-6 sm:h-8 text-blue-700" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Bilingual Learning Companion</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Stuck on a theory? Chat with our AI in Sinhala or English. It guides you step-by-step, just like a private tutor.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-green-50 group cursor-pointer" onClick={() => navigate('/performance')}>
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-purple-700" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Real-time Performance</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Visualize your progress. Identify patterns in your mistakes and watch your average score improve over time.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;