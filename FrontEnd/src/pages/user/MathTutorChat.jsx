import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot, User, Send, Sparkles, Calculator, Loader2,
  Plus, Trash2, MessageSquare, Menu, X,
} from 'lucide-react';
import api from '../../api';
import { formatMessage } from '../../utils/formatMessage';
import { useLanguage, LANGUAGES } from '../../contexts/LanguageContext';

// ---- Constants ----
const GUEST_TOKEN_KEY = 'guestToken';
const GREETING_TEXT =
  "Hello! 👋 I'm your Mathematics Tutor, powered by AI.\n\nI can help you solve math problems step-by-step and explain concepts from the G.C.E. O/L syllabus. Just type your question below!";

const QUICK_QUESTIONS = [
  'Solve x² + 5x + 6 = 0',
  'What is the Pythagorean theorem?',
  'Explain how to find the area of a circle',
  'Study tips for mathematics',
];

// ---- Helpers ----
function getOrCreateGuestToken() {
  let token = localStorage.getItem(GUEST_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(GUEST_TOKEN_KEY, token);
  }
  return token;
}

const MathTutorChat = () => {
  // Chat state
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language, setLanguage } = useLanguage();

  // Session state
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Messages – start with greeting
  const [messages, setMessages] = useState([
    { id: 'greeting', sender: 'bot', text: GREETING_TEXT },
  ]);

  const chatScrollRef = useRef(null);
  const inputRef = useRef(null);

  // Ensure guest token exists
  useEffect(() => {
    getOrCreateGuestToken();
  }, []);

  // ---- Scroll ----
  const scrollToBottom = () => {
    const el = chatScrollRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ---- Load sessions ----
  const loadSessions = useCallback(async () => {
    try {
      const res = await api.get('/chat/sessions');
      setSessions(res.data.sessions || []);
    } catch {
      // Not critical – sessions may be empty
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // ---- Load messages for a session ----
  const loadMessages = async (sessionId) => {
    setLoadingHistory(true);
    setError(null);
    try {
      const res = await api.get(`/chat/sessions/${sessionId}/messages`);
      const { session, messages: msgs } = res.data;
      setMessages(
        msgs.map((m) => ({
          id: m.id,
          sender: m.role,
          text: m.content,
          source: m.source,
        }))
      );
      setLanguage(session.language || 'en');
      setActiveSessionId(sessionId);
      setSidebarOpen(false); // auto-close on mobile/overlay
    } catch {
      setError('Failed to load chat history.');
    } finally {
      setLoadingHistory(false);
    }
  };

  // ---- Create new session ----
  const newSession = async () => {
    try {
      const res = await api.post('/chat/sessions', { language });
      const s = res.data.session;
      setSessions((prev) => [s, ...prev]);
      setActiveSessionId(s.id);
      setMessages([{ id: 'greeting', sender: 'bot', text: GREETING_TEXT }]);
      setSidebarOpen(false);
    } catch {
      setError('Failed to create new session.');
    }
  };

  // ---- Delete session ----
  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/chat/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setMessages([{ id: 'greeting', sender: 'bot', text: GREETING_TEXT }]);
      }
    } catch {
      setError('Failed to delete session.');
    }
  };

  // ---- Send message ----
  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setError(null);

    const userMsg = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Auto-create session if none active
    let sid = activeSessionId;
    if (!sid) {
      try {
        const res = await api.post('/chat/sessions', { language });
        sid = res.data.session.id;
        setSessions((prev) => [res.data.session, ...prev]);
        setActiveSessionId(sid);
      } catch {
        // Proceed without persistence
      }
    }

    try {
      const response = await api.post('/chat', {
        userInput: trimmed,
        language,
        sessionId: sid,
      });
      const data = response.data;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.response,
        source: data.source,
      };
      setMessages((prev) => [...prev, botMsg]);

      loadSessions(); // refresh sidebar titles
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.';
      setError(errorMsg);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Sorry, I encountered an error. Please check your connection and try again.',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputText);
    }
  };

  // ---- Render ----
  return (
   <div className="min-h-screen flex justify-center pt-4 sm:pt-8 bg-gray-100/80">
      {/* ========== CHAT BOX – centered, fixed size ========== */}
       <div className="w-[95%] sm:w-[90%] md:w-[80%] max-w-5xl h-[80vh] bg-white rounded-none md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col relative">
        {/* Sidebar overlay – slides over the chat area */}
        {sidebarOpen && (
          <>
            {/* Backdrop inside the chat box */}
            <div
              className="absolute inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar panel */}
            <div className="absolute top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col animate-slide-in-left">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 text-sm">Chat History</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <button
                onClick={newSession}
                className="mx-3 mt-3 flex items-center gap-2 px-3 py-2.5 bg-[#1b7a39] hover:bg-[#145c2b] text-white rounded-xl text-sm font-medium transition-all"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>

              <div className="flex-1 overflow-y-auto mt-3 px-2">
                {sessions.length === 0 && (
                  <p className="text-gray-400 text-xs text-center mt-8 px-4">
                    No saved chats yet. Start a conversation!
                  </p>
                )}
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => loadMessages(s.id)}
                    className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer mb-1 transition-all ${
                      activeSessionId === s.id
                        ? 'bg-green-50 border border-green-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <MessageSquare
                      className={`w-4 h-4 shrink-0 ${
                        activeSessionId === s.id ? 'text-green-600' : 'text-gray-400'
                      }`}
                    />
                    <span className="flex-1 text-sm text-gray-700 truncate">{s.title}</span>
                    <button
                      onClick={(e) => deleteSession(s.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Header */}
        <div className="bg-white shadow-sm px-4 sm:px-6 py-3 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>

          <div className="bg-green-100 p-2 rounded-full hidden sm:flex">
            <Bot className="w-5 h-5 text-green-700" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">Mathematics Tutor</h1>
            <p className="text-xs text-gray-500 hidden sm:block">G.C.E. O/L AI Assistant</p>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <div className="flex items-center bg-gray-100 rounded-full p-0.5">
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  disabled={isLoading}
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

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 rounded-full border border-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[10px] font-medium text-purple-600">AI</span>
            </div>
          </div>
        </div>

        {/* Messages area – scrollable */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar"
        >
          {loadingHistory && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 sm:gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'bot'
                    ? msg.isError ? 'bg-red-100' : 'bg-[#1b7a39]'
                    : 'bg-gray-700'
                }`}
              >
                {msg.sender === 'bot' ? (
                  msg.isError ? <Bot className="w-4 h-4 text-red-600" /> : <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              <div className="max-w-[85%] md:max-w-[75%]">
                <div
                  className={`p-3 sm:p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'bot'
                      ? msg.isError
                        ? 'bg-red-50 text-red-800 rounded-tl-none border border-red-100'
                        : 'bg-[#dcfce7] text-green-900 rounded-tl-none'
                      : 'bg-[#f3f4f6] text-gray-800 rounded-tr-none'
                  }`}
                >
                  {msg.sender === 'bot' && !msg.isError ? (
                    <div
                      className="chat-formatted [&_strong]:text-green-800 [&_strong]:font-semibold [&_code]:bg-green-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-green-800 [&_hr]:border-green-200"
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                    />
                  ) : (
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                  )}
                </div>

                {msg.source === 'deterministic' && (
                  <div className="flex items-center gap-1 mt-1 ml-1">
                    <Calculator className="w-3 h-3 text-blue-500" />
                    <span className="text-[10px] text-blue-500 font-medium">Solved deterministically</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-[#1b7a39]">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#dcfce7] rounded-2xl rounded-tl-none p-3.5">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                  <span className="text-sm text-green-700">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mx-2 sm:mx-12 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          {messages.length === 1 && !isLoading && !loadingHistory && (
            <div className="mt-8 animate-fade-in">
              <p className="text-gray-500 mb-4 ml-2 sm:ml-12">Quick questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 ml-2 sm:ml-12">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className="text-left p-3 sm:p-4 bg-white hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl text-gray-700 transition-all duration-200 text-sm font-medium shadow-sm disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input – always visible, never hidden */}
        <div className="shrink-0 border-t border-gray-200 bg-white/90 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me a math question..."
              disabled={isLoading}
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-400 shadow-sm placeholder-gray-400 disabled:opacity-50 transition-all"
            />
            <button
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim() || isLoading}
              className="p-3 bg-[#1b7a39] hover:bg-[#145c2b] rounded-2xl shadow-md transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathTutorChat;