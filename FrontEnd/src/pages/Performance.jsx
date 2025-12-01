import React from 'react';
import { TrendingUp, Award, BookOpen, Target, CheckCircle2 } from 'lucide-react';

const Performance = () => {
  // Mock Data (matching your 0% state)
  const stats = [
    {
      title: "Overall Average",
      value: "0%",
      subtext: "0 attempts",
      icon: <CheckCircle2 className="w-10 h-10 text-black" />,
    },
    {
      title: "Best Score",
      value: "0%",
      subtext: "Your highest achievement",
      icon: <Award className="w-10 h-10 text-black" />,
    },
    {
      title: "Total Subjects",
      value: "0%",
      subtext: "Learning areas",
      icon: <BookOpen className="w-10 h-10 text-black" />,
    },
  ];

  return (
    <div className="flex justify-center items-start pt-10 pb-20 px-4 min-h-screen bg-[#ffffff]">
      
      {/* Main Container Card */}
      <div className=" rounded-xl shadow-sm p-8 w-full max-w-3xl bg-[#e5fee6ff]">

        {/* --- Header --- */}
        <div className="flex items-center gap-4 mb-8">
          {/* Icon Box */}
          <div className="bg-green-100 p-3 rounded-xl">
            <TrendingUp className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">Your Performance</h1>
            <p className="text-gray-500 font-medium">Track your academic progress</p>
          </div>
        </div>

        {/* --- Metrics Cards Stack --- */}
        <div className="space-y-5">
          
          {stats.map((stat, index) => (
            <div 
              key={index}
              className='relative overflow-hidden group
                        rounded-2xl p-6 flex items-center justify-between
                        border border-white/20 shadow-xl
                        bg-white/50 backdrop-blur-xl
                        transition-transform duration-300 hover:scale-[1.01]
                        before:absolute before:inset-0
                        before:bg-gradient-to-br before:from-white/30 before:to-white/5
                        before:opacity-40 before:pointer-events-none
                        after:absolute after:top-0 after:left-0 after:w-full after:h-10
                        after:bg-black/10 after:blur-md after:opacity-20 after:pointer-events-none'
              
            >
              {/* Glossy Reflection Overlay (Optional for extra shine) */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 blur-[2px] pointer-events-none"></div>

              <div>
                <h3 className="text-gray-600 font-semibold text-sm mb-1">{stat.title}</h3>
                <div className="text-5xl font-bold text-black mb-1">{stat.value}</div>
                <p className="text-green-600 text-sm font-medium">{stat.subtext}</p>
              </div>

              <div className="bg-white/50 p-3 rounded-full shadow-sm backdrop-blur-sm">
                {stat.icon}
              </div>
            </div>
          ))}

        </div>

        {/* --- Achievement / Footer Card --- */}
        <div className="mt-5 bg-gradient-to-r from-[#6bd188] to-[#4ade80] rounded-2xl p-6 flex items-center justify-between shadow-md text-white relative overflow-hidden">
           {/* Background Pattern effect */}
           <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
             <Target className="w-64 h-64" />
           </div>

           <div className="relative z-10">
             <h3 className="text-green-900 font-bold text-sm uppercase mb-1 opacity-80">achievement</h3>
             <h2 className="text-2xl font-bold mb-2">Keep Practicing !</h2>
             <p className="text-green-50 font-medium max-w-md">
               You're making great progress. Continue learning to improve your scores!
             </p>
           </div>

           <div className="relative z-10 bg-white/20 p-3 rounded-full backdrop-blur-md">
             <Target className="w-10 h-10 text-black" />
           </div>
        </div>

      </div>
    </div>
  );
};

export default Performance;