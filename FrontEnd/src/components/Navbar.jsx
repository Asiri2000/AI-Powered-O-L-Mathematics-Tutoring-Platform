import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Lightbulb, MessageSquare, Bot, 
  BarChart2, LogIn, UserPlus, Home, LogOut, User 
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);
  
  // 1. State for Logout Popup
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // --- CHECK LOGIN STATUS ---
  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('accessToken');
      const storedName = sessionStorage.getItem('username');
      const storedRole = sessionStorage.getItem('user_role'); 
      if (token && storedName) {
        setUsername(storedName);
        setUserRole(storedRole);
      } else {
        setUsername(null);
        setUserRole(null);
      }
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleProfileClick = () => {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/performance');
    }
  };

  // 2. Button Click: Only opens the popup
  const initiateLogout = () => {
    setShowLogoutConfirm(true);
  };

  // 3. Popup Confirmation: Actually logs out
  const confirmLogout = () => {
    sessionStorage.clear();
    setUsername(null);
    window.dispatchEvent(new Event("authChange"));
    setShowLogoutConfirm(false); // Close popup
    navigate('/login');
  };

  const getLinkClasses = (isActive) => {
    return `flex items-center gap-2 pb-3 pt-2 text-sm font-medium transition-all ${
      isActive
        ? 'border-b-2 border-green-600 text-green-700'
        : 'text-gray-500 hover:text-green-600'
    }`;
  };

  const getIconClasses = (isActive) => {
    return `p-1 rounded ${isActive ? 'bg-green-100' : 'bg-gray-100'}`;
  };

  return (
<<<<<<< Updated upstream
    <>
      <div className="w-full bg-white flex flex-col shadow-sm sticky top-0 z-50">
        
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
=======
    <div className="w-full bg-white flex flex-col shadow-sm sticky top-0 z-50">
      
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

        {/* --- AUTH BUTTONS SECTION --- */}
        <div className="flex items-center gap-3">
          {username ? (
            // --- IF LOGGED IN: Show Name + Logout ---
            <>
              <div onClick={handleProfileClick}
               className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full border border-green-100">
                <div className="p-1 bg-green-200 rounded-full">
                   <User className="w-4 h-4 text-green-800" />
                </div>
                <span className="text-sm font-semibold text-green-900 capitalize">
                  {username}
                </span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-500 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            // --- IF LOGGED OUT: Show Login + Sign Up ---
            <>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:text-green-700 transition-colors">
                <LogIn className="w-4 h-4" />
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-lg hover:bg-green-200 transition-colors border border-green-200">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* --- BOTTOM ROW (Links) --- */}
      <div className="flex justify-between items-center px-6 border-b border-gray-200 bg-green-50/30">
        <div className="flex gap-8">
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

          <NavLink to="/math-tutor" className={({ isActive }) => getLinkClasses(isActive)}>
            {({ isActive }) => (
              <>
                <div className={getIconClasses(isActive)}>
                  <Bot className="w-4 h-4" />
                </div>
                Mathematics Tutor
              </>
            )}
          </NavLink>
>>>>>>> Stashed changes

          {/* --- AUTH BUTTONS SECTION --- */}
          <div className="flex items-center gap-3">
            {username ? (
              <>
                {/* Profile Badge */}
                <div onClick={handleProfileClick} className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full border border-green-100 cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="p-1 bg-green-200 rounded-full">
                     <User className="w-4 h-4 text-green-800" />
                  </div>
                  <span className="text-sm font-semibold text-green-900 capitalize">
                    {username}
                  </span>
                </div>
                
                {/* Logout Button (Triggers Popup) */}
                <button 
                  onClick={initiateLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-500 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:text-green-700 transition-colors">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-lg hover:bg-green-200 transition-colors border border-green-200">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* --- BOTTOM ROW (Links) --- */}
        <div className="flex justify-between items-center px-6 border-b border-gray-200 bg-green-50/30">
          <div className="flex gap-8">
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

            <NavLink to="/lessons" className={({ isActive }) => getLinkClasses(isActive)}>
               {({ isActive }) => (
                <>
                  <div className={getIconClasses(isActive)}>
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  Lesson Companion
                </>
              )}
            </NavLink>
          </div>

          <div className="pb-2">
            <button 
              onClick={() => navigate('/performance')}
              className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-white hover:shadow-sm transition-all"
            >
              Your Performance
              <BarChart2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* --- 4. LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
                <p className="text-gray-500">
                  Do you need to log out? You will need to sign in again to access your account.
                </p>
              </div>

              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-md shadow-red-200 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;