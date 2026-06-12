import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Lightbulb, MessageSquare, Bot, 
  BarChart2, LogIn, UserPlus, Home, LogOut, User, TrendingUp, ClipboardList
} from 'lucide-react';
import { getOverallSummary } from '../api';

/* ── Helper: accuracy → grade letter + colour ── */
const getPerformancePill = (acc = 0) => {
  if (acc >= 75) return { grade: 'A', label: 'Distinction', color: '#16a34a', bg: '#dcfce7', border: '#86efac' };
  if (acc >= 65) return { grade: 'B', label: 'Very Good',   color: '#0284c7', bg: '#dbeafe', border: '#93c5fd' };
  if (acc >= 50) return { grade: 'C', label: 'Credit',      color: '#d97706', bg: '#fef3c7', border: '#fcd34d' };
  if (acc >= 35) return { grade: 'S', label: 'Pass',        color: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd' };
  return          { grade: 'W', label: 'Keep Going',  color: '#dc2626', bg: '#fee2e2', border: '#fca5a5' };
};

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [perfPill, setPerfPill] = useState(null);

  // --- CHECK LOGIN STATUS ---
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('accessToken');
      const storedName = sessionStorage.getItem('username');
      const storedRole = sessionStorage.getItem('user_role');
      if (token && storedName) {
        setUsername(storedName);
        setUserRole(storedRole);
        // Fetch performance pill
        try {
          const data = await getOverallSummary();
          const acc = parseFloat(data?.accuracy_percentage || 0);
          setPerfPill(getPerformancePill(acc));
        } catch (_) {
          setPerfPill(null);
        }
      } else {
        setUsername(null);
        setUserRole(null);
        setPerfPill(null);
      }
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  // --- NEW: Handle Profile Click ---
  const handleProfileClick = () => {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/performance');
    }
  };

  const handleLogout = () => {
    // Clear data
    sessionStorage.clear();
    // Update State
    setUsername(null);
    // Notify other components
    window.dispatchEvent(new Event("authChange"));
    // Redirect
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

          <a 
            href="http://localhost:3000/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 pb-3 pt-2 text-sm font-medium transition-all text-gray-500 hover:text-green-600"
          >
            <div className="p-1 rounded bg-gray-100">
              <Bot className="w-4 h-4" />
            </div>
            Mathematics Tutor
          </a>

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

          <NavLink to="/mock-exam" className={({ isActive }) => getLinkClasses(isActive)}>
            {({ isActive }) => (
              <>
                <div className={getIconClasses(isActive)}>
                  <ClipboardList className="w-4 h-4" />
                </div>
                Mock Exam
              </>
            )}
          </NavLink>
        </div>

        <div className="pb-2">
          {perfPill ? (
            <button
              onClick={() => navigate('/performance')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '5px 14px', borderRadius: '99px', border: `2px solid ${perfPill.border}`,
                background: perfPill.bg, color: perfPill.color, cursor: 'pointer',
                fontWeight: '700', fontSize: '0.82rem', transition: 'all 0.2s',
              }}
            >
              <TrendingUp size={14} />
              Grade {perfPill.grade} · {perfPill.label}
            </button>
          ) : (
            <button
              onClick={() => navigate('/performance')}
              className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-white hover:shadow-sm transition-all"
            >
              Your Performance
              <BarChart2 className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;