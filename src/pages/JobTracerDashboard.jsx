import { useState, useRef, useEffect } from 'react';

const DOMAINS = [
  'IT / Software Internships',
  'Education / Student Jobs',
  'Healthcare / Nurse Jobs',
  'Chennai-based Part-Time Jobs'
];

const MOCK_JOBS = [
  { id: 1, title: 'Software Intern', company: 'ABC Tech', location: 'Chennai', domain: 'IT / Software Internships', reqSkills: ['Python', 'React'], type: 'Internship' },
  { id: 2, title: 'Data Analyst Trainee', company: 'XYZ Inc', location: 'Remote', domain: 'IT / Software Internships', reqSkills: ['SQL', 'Python'], type: 'Full-time' },
  { id: 3, title: 'Junior Web Developer', company: 'TechNova', location: 'Chennai', domain: 'IT / Software Internships', reqSkills: ['HTML', 'JavaScript'], type: 'Part-time' },
  
  { id: 4, title: 'Primary School Teacher', company: 'Global Edu', location: 'Hyderabad', domain: 'Education / Student Jobs', reqSkills: ['B.Ed', 'English'], type: 'Full-time' },
  { id: 5, title: 'Campus Ambassador', company: 'EdTech Startup', location: 'Remote', domain: 'Education / Student Jobs', reqSkills: ['Communication', 'Marketing'], type: 'Internship' },
  
  { id: 6, title: 'Staff Nurse', company: 'Apollo Care', location: 'Chennai', domain: 'Healthcare / Nurse Jobs', reqSkills: ['B.Sc Nursing', 'Patient Care'], type: 'Full-time' },
  
  { id: 7, title: 'Data Entry Operator', company: 'DataSys', location: 'Chennai', domain: 'Chennai-based Part-Time Jobs', reqSkills: ['Excel', 'Typing'], type: 'Part-time' },
];

function JobTracerDashboard() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Career Agent. Please select your target domain to see available jobs and get personalized matches.' }
  ]);
  const [input, setInput] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `I want to look for jobs in: ${domain}` }
    ]);
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: `Great! I've loaded the jobs for ${domain} on the right panel.\n\nNow, tell me about your profile (e.g., "I am a CSE student with Python and React skills looking for an intern role in Chennai").` }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const textLower = userText.toLowerCase();
      
      // Pattern Matching Logic for Demo
      if (textLower.includes('python') || textLower.includes('react') || textLower.includes('intern')) {
        setUserProfile({ role: 'Software Intern', skills: ['Python', 'React'], location: 'Chennai' });
        aiResponse = `Based on your profile (knowledge of Python/React, wants Intern role), suitable jobs are:\n\n💻 Software Intern – ABC Tech, Chennai\n📊 Data Analyst Trainee – XYZ Inc\n\n(You can use the Quick Apply buttons on the right panel).\n\nDo you want me to turn on notifications for new matching jobs in this domain?`;
      } else if (textLower.includes('yes') || textLower.includes('notify') || textLower.includes('sure')) {
        aiResponse = `✅ Notifications turned on! I will alert you via email/in-app when new roles appear.\n\n💡 Skill Gap Hint: To improve your chances for the 'Software Intern' role, consider adding 'Node.js' to your skills. I can suggest courses if you'd like.`;
      } else if (textLower.includes('excel') || textLower.includes('data entry')) {
        setUserProfile({ role: 'Data Entry', skills: ['Excel', 'Typing'], location: 'Chennai' });
        aiResponse = `I see you have Excel skills. The best match in our database is:\n\n⌨️ Data Entry Operator - DataSys, Chennai\n\nWould you like me to save this profile and notify you when similar part-time jobs open?`;
      } else {
        aiResponse = `I noted your details. To find the best match, could you specify your key skills (like Java, Python, Excel) and what kind of role you are looking for?`;
      }
      
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const currentDomainJobs = selectedDomain ? MOCK_JOBS.filter(j => j.domain === selectedDomain) : [];

  return (
    <section className="mx-auto max-w-7xl space-y-6 py-6 h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="glass rounded-2xl p-6 flex-shrink-0 flex justify-between items-center border border-sky-500/20 shadow-lg shadow-sky-500/5">
        <div>
          <h1 className="gradient-text text-3xl font-bold">AI Career Agent & Job Tracer 🤖💼</h1>
          <p className="mt-1 text-slate-400">Find personalized job matches, bridge skill gaps, and apply directly via AI.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full text-xs font-bold border border-sky-500/30">Active Domain Tracking</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left: AI Chatboard */}
        <div className="flex-1 flex flex-col glass rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl relative">
          {/* Chat Header */}
          <div className="bg-slate-900/80 p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-xl shadow-lg">🤖</div>
              <div>
                <h2 className="text-lg font-bold text-white">CareerAI Assistant</h2>
                <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors" onClick={() => {setMessages([messages[0]]); setSelectedDomain(''); setUserProfile(null);}}>
              🔄 Reset Chat
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Domain Selection Buttons */}
            {!selectedDomain && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                <div className="max-w-[85%] md:max-w-[75%] space-y-2">
                  {DOMAINS.map(domain => (
                    <button 
                      key={domain}
                      onClick={() => handleDomainSelect(domain)}
                      className="block w-full text-left p-3 rounded-xl bg-slate-800/80 border border-sky-500/30 hover:bg-sky-500/20 hover:border-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] text-sky-400 text-sm transition-all"
                    >
                      👉 {domain}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-bl-none flex gap-1 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-slate-900/90 border-t border-slate-700/50">
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={!selectedDomain || isTyping}
                placeholder={selectedDomain ? "Type your profile or skills here..." : "Please select a domain first..."} 
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!selectedDomain || isTyping || !input.trim()}
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl px-6 py-3 font-bold transition-colors shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Data Dashboard */}
        <div className="lg:w-[400px] xl:w-[450px] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Active Profile Match */}
          {userProfile && (
            <div className="card border-emerald-500/30 bg-emerald-500/5 shadow-lg shadow-emerald-500/5 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2"><span>🎯</span> Active Profile Match</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-700/50 pb-2">
                  <span className="text-slate-400">Target Role</span>
                  <span className="text-white font-bold">{userProfile.role}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/50 pb-2">
                  <span className="text-slate-400">Primary Skills</span>
                  <span className="text-white font-medium">{userProfile.skills.join(', ')}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-400">AI Match Accuracy</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">94%</span>
                </div>
              </div>
            </div>
          )}

          {/* Job Listings Panel */}
          <div className="card border-slate-700 bg-slate-900/60 shadow-xl flex-1 flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Available Jobs</h3>
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-1 rounded-lg">
                {selectedDomain ? selectedDomain : 'Select a domain'}
              </span>
            </div>
            
            {selectedDomain ? (
              <div className="space-y-4 overflow-y-auto pr-1">
                {currentDomainJobs.length > 0 ? currentDomainJobs.map(job => (
                  <div key={job.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-500/50 hover:bg-slate-800 transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-white group-hover:text-sky-400 transition-colors text-base">{job.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-1 bg-slate-900 text-slate-300 rounded-lg border border-slate-700 whitespace-nowrap ml-2">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4 flex items-center gap-1"><span>🏢</span> {job.company} <span className="mx-1">•</span> <span>📍</span> {job.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.reqSkills.map(skill => (
                        <span key={skill} className="text-[10px] font-semibold bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-700/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button className="w-full text-sm font-bold bg-sky-500 hover:bg-sky-400 text-white py-2.5 rounded-xl transition-colors shadow-lg shadow-sky-500/20">
                      Quick Apply via AI
                    </button>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 text-center py-8">No jobs found for this domain currently.</p>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 space-y-4 py-12">
                <span className="text-6xl">🔍</span>
                <p className="text-sm text-slate-400 max-w-[200px]">Please select a domain in the chat to view available opportunities.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default JobTracerDashboard;
