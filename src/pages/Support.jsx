import React from 'react';

const Support = () => {
  return (
    <div className="mx-auto max-w-4xl py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white uppercase tracking-tight">Help & <span className="gradient-text">Support</span> 🆘</h1>
        <p className="mt-4 text-lg text-slate-400">Need help navigating the AI Curriculum Engine? We're here to assist you.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="card p-8 bg-slate-900/50 border-sky-500/20">
          <div className="h-12 w-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-2xl mb-6">📖</div>
          <h3 className="text-xl font-bold text-white mb-2">User Documentation</h3>
          <p className="text-slate-400 text-sm mb-6">Learn how to upload syllabi, track skill gaps, and use the AI Mentor effectively.</p>
          <button className="text-sky-400 font-bold text-sm hover:underline">Read Docs →</button>
        </div>

        <div className="card p-8 bg-slate-900/50 border-emerald-500/20">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl mb-6">💬</div>
          <h3 className="text-xl font-bold text-white mb-2">Live Chat Support</h3>
          <p className="text-slate-400 text-sm mb-6">Connect with our support team for real-time assistance with technical issues.</p>
          <button className="text-emerald-400 font-bold text-sm hover:underline">Start Chat →</button>
        </div>
      </div>

      <div className="mt-12 card p-10 bg-slate-950 border-white/5">
        <h3 className="text-2xl font-black text-white mb-8">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {[
            { q: "How does the AI predict my career path?", a: "We use a combination of your current subject performance, historical alumni data, and real-time job market trends from LinkedIn and Indeed." },
            { q: "Can I use the Resume Optimizer for free?", a: "Yes! The basic ATS scan and optimization suggestions are included for all registered students." },
            { q: "What should I do if my syllabus is outdated?", a: "Use the 'Strategic Recommendation' feature in the HOD dashboard to generate a modernized curriculum plan." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
              <h4 className="font-bold text-slate-200 mb-2">Q: {faq.q}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center p-12 rounded-[3rem] bg-gradient-to-r from-sky-500/10 to-blue-500/10 border border-white/5">
        <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
        <p className="text-slate-400 mb-8">Email us at <span className="text-white font-bold">support@skillengine.edu</span></p>
        <button className="btn-primary !px-10 !py-4">Contact Support Team</button>
      </div>
    </div>
  );
};

export default Support;
