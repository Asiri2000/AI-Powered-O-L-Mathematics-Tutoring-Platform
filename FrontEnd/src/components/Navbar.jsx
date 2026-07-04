import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen, Lightbulb, MessageSquare, Bot,
  BarChart2, LogIn, UserPlus, Home, LogOut, User,
  TrendingUp, ClipboardList, Menu, X
} from 'lucide-react';
import { getOverallSummary } from '../api';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  // --- CHECK LOGIN STATUS ---
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('accessToken');
      const storedName = sessionStorage.getItem('username');
      const storedRole = sessionStorage.getItem('user_role');
      if (token && storedName) {
        setUsername(storedName);
        setUserRole(storedRole);
        try {
          const data = await getOverallSummary();
          if (!data || Number(data.total_attempts) === 0) {
            setPerfPill({
              isNew: true,
              label: 'New Student',
              color: '#334155',
              bg: '#f8fafc',
              border: '#cbd5e1'
            });
          } else {
            const acc = parseFloat(data?.accuracy_percentage || 0);
            setPerfPill(getPerformancePill(acc));
          }
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

  const handleProfileClick = () => {
    navigate(userRole === 'admin' ? '/admin' : '/performance');
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUsername(null);
    window.dispatchEvent(new Event("authChange"));
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

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

  // Reusable navigation links (used in both desktop and mobile)
  const navLinks = [
    { to: '/', end: true, icon: Home, label: 'Home' },
    { to: '/generator', icon: MessageSquare, label: 'Question generator' },
    { to: '/math-tutor', icon: Bot, label: 'Mathematics Tutor' },
    { to: '/lessons', icon: Lightbulb, label: 'Lesson Companion' },
    { to: '/mock-exam', icon: ClipboardList, label: 'Mock Exam' },
  ];

  return (
    <div className="w-full bg-white flex flex-col shadow-sm sticky top-0 z-50">
      {/* --- TOP ROW (Logo + Auth) --- */}
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <BookOpen className="w-8 h-8 text-slate-600" />
            <Lightbulb className="w-4 h-4 text-green-600 absolute -top-1 right-0 fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Learning platform
          </h1>
        </div>

        {/* Right side: hamburger (mobile) + language + auth */}
        <div className="flex items-center gap-3">
          {/* Language Pills (desktop) */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-full p-0.5">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  language === code
                    ? 'bg-[#1b7a39] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Language dropdown (mobile) */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="sm:hidden text-xs font-medium bg-gray-100 border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 max-w-[80px]"
          >
            {LANGUAGES.map(({ code, native }) => (
              <option key={code} value={code}>{native}</option>
            ))}
          </select>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>

          {/* Auth buttons (visible on all screens) */}
          {username ? (
            <>
              <div
                onClick={handleProfileClick}
                className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full border border-green-100 cursor-pointer hover:shadow-sm transition-shadow"
              >
                <div className="p-1 bg-green-200 rounded-full">
                  <User className="w-4 h-4 text-green-800" />
                </div>
                <span className="text-sm font-semibold text-green-900 capitalize hidden sm:inline">
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
            <>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:text-green-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-lg hover:bg-green-200 transition-colors border border-green-200"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Up</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* --- DESKTOP NAVIGATION (hidden on mobile) --- */}
      <div className="hidden md:flex justify-between items-center px-6 border-b border-gray-200 bg-green-50/30">
        <div className="flex gap-8">
          {navLinks.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => getLinkClasses(isActive)}
            >
              {({ isActive }) => (
                <>
                  <div className={getIconClasses(isActive)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Performance Pill (desktop) */}
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

      {/* --- MOBILE MENU (overlay) --- */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40 animate-slide-down">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(({ to, end, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}

            {/* Performance Pill (mobile) */}
            <div className="pt-2 border-t border-gray-100">
              {perfPill ? (
                <button
                  onClick={() => { navigate('/performance'); closeMobileMenu(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 14px', borderRadius: '99px', border: `2px solid ${perfPill.border}`,
                    background: perfPill.bg, color: perfPill.color, cursor: 'pointer',
                    fontWeight: '700', fontSize: '0.82rem', width: 'fit-content',
                  }}
                >
                  <TrendingUp size={14} />
                  Grade {perfPill.grade} · {perfPill.label}
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/performance'); closeMobileMenu(); }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-white hover:shadow-sm transition-all"
                >
                  Your Performance
                  <BarChart2 className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;