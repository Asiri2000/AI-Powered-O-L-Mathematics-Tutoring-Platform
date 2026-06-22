import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, Calculator, Loader2 } from 'lucide-react';
import api from '../../api'

const MathTutorChat = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! \ud83d\udc4b I'm your Mathematics Tutor, powered by AI.\n\nI can help you solve math problems step-by-step and explain concepts from the G.C.E. O/L syllabus. Just type your question below!",
    },
  ]);

  const quickQuestions = [
    'Solve x\u00b2 + 5x + 6 = 0',
    'What is the Pythagorean theorem?',
    'Explain how to find the area of a circle',
    'Study tips for mathematics',
  ];

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await api.post('/chat', { userInput: trimmed });
      const data = response.data;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.response,
        source: data.source,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || err.message || 'Something went wrong. Please try again.';
      setError(errorMsg);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please check your connection and try again.',
        isError: true,
      };

      setMessages((prev) => [...prev, botMsg]);
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

  return (
    <div className="flex flex-col items-center pt-10 pb-10 px-4 min-h-screen bg-[#F3FBF6]">
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-sm p-6 w-full max-w-4xl mb-6 flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full">
          <Bot className="w-8 h-8 text-green-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">Mathematics Tutor</h1>
          <p className="text-gray-500">AI-powered learning assistant for G.C.E. O/L students</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-medium text-purple-600">AI Powered</span>
        </div>
      </div>

      {/* Chat Interface Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-4xl flex flex-col h-[600px] relative">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'bot'
                    ? msg.isError
                      ? 'bg-red-100'
                      : 'bg-[#1b7a39]'
                    : 'bg-gray-700'
                }`}
              >
                {msg.sender === 'bot' ? (
                  msg.isError ? (
                    <Bot className="w-5 h-5 text-red-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className="max-w-[80%]">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'bot'
                      ? msg.isError
                        ? 'bg-red-50 text-red-800 rounded-tl-none border border-red-100'
                        : 'bg-[#dcfce7] text-green-900 rounded-tl-none'
                      : 'bg-[#f3f4f6] text-gray-800 rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Source badge for deterministic math solver */}
                {msg.source === 'deterministic' && (
                  <div className="flex items-center gap-1 mt-1 ml-1">
                    <Calculator className="w-3 h-3 text-blue-500" />
                    <span className="text-[10px] text-blue-500 font-medium">
                      Solved deterministically
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#1b7a39]">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#dcfce7] rounded-2xl rounded-tl-none p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                  <span className="text-sm text-green-700">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mx-14 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Quick Questions — show only on first load */}
          {messages.length === 1 && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <p className="text-gray-500 mb-4 ml-14">Quick questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                {quickQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className="text-left p-4 bg-[#f3f4f6] hover:bg-green-50 border border-transparent hover:border-green-200 rounded-xl text-gray-700 transition-all duration-200 text-sm font-medium disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative flex items-center gap-3 pt-4 border-t border-gray-100">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me a math question..."
            disabled={isLoading}
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-400 shadow-sm placeholder-gray-400 disabled:opacity-50 transition-all"
          />
          <button
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="p-3.5 bg-[#1b7a39] hover:bg-[#145c2b] rounded-2xl shadow-md transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 group"
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
  );
};

export default MathTutorChat;
