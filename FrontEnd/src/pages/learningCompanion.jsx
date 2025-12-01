import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles } from 'lucide-react';

const learningCompanion = () => {
  // --- STATE MANAGEMENT ---
  const [inputText, setInputText] = useState('');
  
  // Initial Chat History
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hey there! 👋 I'm your learning buddy. Ask me anything about mathematics",
    }
  ]);

  // Quick Questions Data
  const quickQuestions = [
    "What is the easiest way to understand fractions?",
    "give a note about volume and area",
    "study tips for mathematics",
    "How to use this app?"
  ];

  // Ref for auto-scrolling to bottom of chat
  const messagesEndRef = useRef(null);

  // --- HANDLERS ---

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');

    // 2. Simulate Bot Response (Mocking the Agent)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "This is a sample response from the AI. In the real backend, this will be connected to your RAG framework to provide syllabus-based answers.",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputText);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-10 px-4 min-h-screen bg-[#F3FBF6]">
      
      {/* =========================================
          CARD 1: HEADER
         ========================================= */}
      <div className="bg-white rounded-3xl shadow-sm p-6 w-full max-w-4xl mb-6 flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full">
           <Bot className="w-8 h-8 text-green-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">Learning Companion</h1>
          <p className="text-gray-500">Your personal study assistant</p>
        </div>
      </div>

      {/* =========================================
          CARD 2: CHAT INTERFACE
         ========================================= */}
      <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-4xl flex flex-col h-[600px] relative">
        
        {/* --- Chat History Area --- */}
        <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
          
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 mb-6 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icons */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'bot' ? 'bg-[#1b7a39]' : 'bg-[#1b7a39]'
              }`}>
                {msg.sender === 'bot' ? (
                  <Bot className="w-6 h-6 text-white" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl max-w-[80%] text-lg leading-relaxed shadow-sm ${
                msg.sender === 'bot' 
                  ? 'bg-[#dcfce7] text-green-900 rounded-tl-none' // Bot Style (Green)
                  : 'bg-[#f3f4f6] text-gray-800 rounded-tr-none'   // User Style (Gray)
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* --- Quick Questions (Only show if only 1 message exists) --- */}
          {messages.length === 1 && (
            <div className="mt-8 animate-fade-in">
              <p className="text-gray-500 mb-4 ml-14">Quick questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                {quickQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(q)}
                    className="text-left p-4 bg-[#f3f4f6] hover:bg-green-50 border border-transparent hover:border-green-200 rounded-xl text-gray-700 transition-all duration-200 text-sm font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* --- Input Area --- */}
        <div className="relative flex items-center gap-3 pt-4 border-t border-gray-100">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything .."
            className="flex-1 bg-white border border-gray-300 text-gray-800 text-lg rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-green-500/50 shadow-sm placeholder-gray-300"
          />
          <button
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim()}
            className="p-4 bg-[#1b7a39] hover:bg-[#145c2b] rounded-2xl shadow-md transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Send className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default learningCompanion;