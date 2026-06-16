import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, ArrowLeft, Home, Terminal } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100 font-sans relative overflow-hidden px-4 py-12 select-none">
      {/* Absolute Ambient Background Shimmers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a,transparent)] opacity-65" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative Network Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        {/* Floating Icon Wrapper */}
        <div className="flex justify-center">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              y: [0, -8, 0]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-[0_0_50px_rgba(37,99,235,0.25)]"
          >
            <div className="w-full h-full bg-[#0a0a14] rounded-3xl flex items-center justify-center">
              <Compass className="text-blue-400" size={38} />
            </div>
          </motion.div>
        </div>

        {/* Dynamic Display Typography */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-8xl sm:text-9xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-700 select-none"
          >
            404
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200"
          >
            Route Not Compiled
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-400 font-medium font-mono leading-relaxed max-w-md mx-auto"
          >
            Requested absolute path does not exist in local router context. Force-directed cleanups required to resolve navigation.
          </motion.p>
        </div>

        {/* Inline Terminal Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-black/45 backdrop-blur-md rounded-2xl border border-white/5 p-4 text-left font-mono text-[10px] sm:text-xs text-slate-400 leading-normal shadow-2xl"
        >
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest ml-1">Terminal Session</span>
          </div>
          <div className="space-y-1">
            <p className="flex gap-2">
              <span className="text-blue-500">➜</span>
              <span>resolve --path <span className="text-indigo-400">"{window.location.pathname}"</span></span>
            </p>
            <p className="text-rose-400 font-bold select-none flex gap-2">
              <span>[CRITICAL]</span>
              <span>404: NO ROUTE IDENTIFIED FOR ADDRESS</span>
            </p>
            <p className="text-emerald-400/80 flex gap-2">
              <span>[ADVICE]</span>
              <span>Re-route to master navigation controls below.</span>
            </p>
          </div>
        </motion.div>

        {/* Option action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-200 font-bold uppercase tracking-widest text-xs rounded-xl border border-white/5 shadow-md flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={14} />
            Step Backward
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Home size={14} />
            Return Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
