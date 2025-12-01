import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // <--- FIX 1: Import useNavigate
import { BookOpen, Lightbulb, MessageSquare, Bot, BarChart2, LogIn, UserPlus,Home } from 'lucide-react';
// Remove: import { Navigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate(); // <--- FIX 2: Use the hook function

  // Helper function for styling classes to keep JSX clean
  const getLinkClasses = (isActive) => {
    return `flex items-center gap-2 pb-3 pt-2 text-sm font-medium transition-all ${
      isActive
        ? 'border-b-2 border-green-600 text-green-700'
        : 'text-gray-500 hover:text-green-600'
    }`;
  };

  const handlePerformanceClick = () => {
    navigate('/performance'); // Now this will work correctly
  };

  const getIconClasses = (isActive) => {
    return `p-1 rounded ${isActive ? 'bg-green-100' : 'bg-gray-100'}`;
  };

  return (
    <div className="w-full bg-white flex flex-col shadow-sm">
      
      {/* --- TOP ROW --- */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <BookOpen className="w-8 h-8 text-slate-600" />
            <Lightbulb className="w-4 h-4 text-green-600 absolute -top-1 right-0 fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Learning platform
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:text-green-700 transition-colors">
            <LogIn className="w-4 h-4" />
            Login
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-lg hover:bg-green-200 transition-colors border border-green-200">
            <UserPlus className="w-4 h-4" />
            Sign Up
          </button>
        </div>
      </div>

      {/* --- BOTTOM ROW --- */}
      <div className="flex justify-between items-center px-6 border-b border-gray-200 bg-green-50/30">
        
        <div className="flex gap-8">
          {/* home*/}
          <NavLink to="/" end className={({ isActive }) => getLinkClasses(isActive)}>
            {({ isActive }) => (
              <>
                <div className={getIconClasses(isActive)}>
                  <Home className="w-4 h-4" />
                </div>
                Home
              </>
            )}
          </NavLink>

          {/* Tab 1: Question Generator */}
          <NavLink to="/generator" className={({ isActive }) => getLinkClasses(isActive)}>
            {({ isActive }) => (
              <>
                <div className={getIconClasses(isActive)}>
                  <MessageSquare className="w-4 h-4" />
                </div>
                Question generator
              </>
            )}
          </NavLink>

          {/* Tab 2: Learning Companion */}
          <NavLink to="/companion" className={({ isActive }) => getLinkClasses(isActive)}>
             {({ isActive }) => (
              <>
                <div className={getIconClasses(isActive)}>
                  <Bot className="w-4 h-4" />
                </div>
                Learning Companion
              </>
            )}
          </NavLink>
        </div>

        <div className="pb-2">
          <button 
            onClick={handlePerformanceClick}
            className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-white hover:shadow-sm transition-all"
          >
            Your Performance
            <BarChart2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Navbar;