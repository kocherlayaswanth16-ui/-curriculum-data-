import React, { useState, useRef, useEffect } from 'react';

const AI_MENTORS = [
  { id: 'tech', name: 'Tech Mentor', icon: '💻', color: 'sky', bio: 'Expert in Software Architecture & Modern Stacks.' },
  { id: 'career', name: 'Career Coach', icon: '🚀', color: 'emerald', bio: 'Helping you land your dream job at top MNCs.' },
  { id: 'coding', name: 'Algorithm Guru', icon: '🧩', color: 'purple', bio: 'Master of Data Structures & competitive coding.' },
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMentor, setActiveMentor] = useState(AI_MENTORS[0]);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI Mentor. How can I help you accelerate your learning today?", time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let response = "";
      if (input.toLowerCase().includes('python')) {
        response = "Python is a great choice! Focus on Pandas for Data Science or Django/FastAPI for Web. Check Month 2 of your Roadmap.";
      } else if (input.toLowerCase().includes('career') || input.toLowerCase().includes('job')) {
        response = "Market trends show a 40% spike in AI roles. I recommend polishing your portfolio with a Generative AI project.";
      } else {
        response = `As your ${activeMentor.name}, I suggest focusing on building core implementations. Would you like to see a suggested learning path for this topic?`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response, time: new Date().toLocaleTimeString() }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-2xl shadow-sky-500/40 flex items-center justify-center text-3xl z-[100] hover:scale-110 transition-all active:scale-95"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[400px] h-[600px] glass border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-white tracking-tight">AI Expert Mentors</h3>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active</span>
              </div>
            </div>
            <div className="flex gap-2">
              {AI_MENTORS.map(m => (
                <button 
                  key={m.id} 
                  onClick={() => setActiveMentor(m)}
                  className={`flex-1 p-2 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                    activeMentor.id === m.id ? 'bg-sky-500/20 border-sky-500 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest">{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-sky-500 text-slate-950 font-medium rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.content}
                  <div className={`text-[8px] mt-2 font-bold uppercase tracking-widest ${msg.role === 'user' ? 'text-slate-900/60' : 'text-slate-500'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                  <span className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 bg-slate-950/80 border-t border-white/5">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask ${activeMentor.name}...`}
                className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-sky-500 outline-none text-sm transition-all"
              />
              <button 
                onClick={handleSend}
                className="h-14 w-14 rounded-2xl bg-sky-500 flex items-center justify-center text-xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20"
              >
                🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
