import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles, Heart, Orbit, Moon, Play, X, Loader2 } from 'lucide-react';

const experiments = [
  { 
    id: 'clock',
    title: 'Clock Made Of Clocks', 
    icon: <Clock />, 
    tag: 'Mathematics', 
    desc: 'A synchronized array of analog clocks forming a digital display. Precision engineering at sub-pixel levels.',
    color: 'bg-blue-500/10 text-blue-500',
    demo: 'Synchronizing Arrays...'
  },
  { 
    id: 'new-year',
    title: 'Happy New Year 2026', 
    icon: <Sparkles />, 
    tag: 'Animation', 
    desc: 'Celebrating temporal shifts with lifting balloons and state-driven year transitions.',
    color: 'bg-green-500/10 text-green-500',
    demo: 'Lifting Balloons...'
  },
  { 
    id: 'holo-card',
    title: 'Legendary Card Effect', 
    icon: <Sparkles />, 
    tag: 'Shaders', 
    desc: 'Simulating holographic diffraction and metallic reflections using CSS gradients and mouse tracking.',
    color: 'bg-amber-500/10 text-amber-500',
    demo: 'Calculating Diffractions...'
  },
  { 
    id: 'valentine',
    title: 'Love Me Valentine', 
    icon: <Heart />, 
    tag: 'UX Logic', 
    desc: 'An adaptive "No" button escaping interaction. Exploring persistent engagement through physics.',
    color: 'bg-rose-500/10 text-rose-500',
    demo: 'Evading Rejection...'
  },
  { 
    id: 'galaxy',
    title: 'Interactive Galaxy', 
    icon: <Orbit />, 
    tag: 'WebGL', 
    desc: 'A black hole simulation using gravitational lensing concepts and particle flow.',
    color: 'bg-purple-500/10 text-purple-500',
    demo: 'Simulating Singularity...'
  },
  { 
    id: 'bb8-toggle',
    title: 'BB8 Theme Switcher', 
    icon: <Moon />, 
    tag: 'Micro-Interactions', 
    desc: 'A galaxy-themed mode toggle featuring BB8 crossing the Tatooine desert.',
    color: 'bg-orange-500/10 text-orange-500',
    demo: 'Deploying Droid...'
  },
];

const ClockOfClocksDemo = () => {
  return (
    <div className="flex gap-2 p-10 bg-white dark:bg-slate-900 rounded-3xl items-center justify-center scale-75 sm:scale-100">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="grid grid-cols-2 grid-rows-3 gap-1">
          {[...Array(6)].map((_, j) => (
            <div key={j} className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 relative">
              <div className="absolute top-1/2 left-1/2 w-px h-3 bg-slate-400 dark:bg-white/30 origin-bottom -translate-x-1/2 -translate-y-full rotate-[150deg]" />
              <div className="absolute top-1/2 left-1/2 w-px h-3 bg-slate-400 dark:bg-white/30 origin-bottom -translate-x-1/2 -translate-y-full rotate-[210deg]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const NewYearDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-slate-900 rounded-3xl h-full relative overflow-hidden">
      <motion.div 
        animate={{ y: [0, -200], opacity: [1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeIn" }}
        className="absolute bottom-20 flex flex-col items-center"
      >
        <div className="w-12 h-16 bg-yellow-500 rounded-full" />
        <div className="w-px h-20 bg-white/20" />
      </motion.div>
      <div className="text-6xl sm:text-8xl font-display font-bold text-blue-400 flex">
        <span>202</span>
        <div className="relative">
          <motion.span 
            animate={{ y: [0, -100], opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            className="absolute"
          >5</motion.span>
          <motion.span 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
          >6</motion.span>
        </div>
      </div>
      <p className="text-blue-500/50 uppercase tracking-widest text-xs mt-4">Lifting Innovation</p>
    </div>
  );
};

const HoloCardDemo = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  return (
    <div className="p-10 h-full flex items-center justify-center bg-slate-800 rounded-3xl overflow-hidden">
      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          setRotation({ x: y * 30, y: -x * 30 });
        }}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        className="relative w-64 h-96 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl p-1 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-full bg-slate-900 rounded-xl relative overflow-hidden flex flex-col p-4">
           <motion.div 
             animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
             transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
             className="absolute inset-0 opacity-20 bg-[linear-gradient(110deg,#fff,transparent,transparent,#fff)] bg-[length:200%_200%]"
           />
           <div className="h-40 w-full bg-slate-800 rounded-lg mb-4" />
           <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
           <div className="h-4 w-1/2 bg-white/10 rounded" />
           <div className="mt-auto h-24 w-full bg-white/5 rounded-lg border border-white/10" />
        </div>
      </motion.div>
    </div>
  );
};

const ValentineDemo = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const moveNo = () => {
    setNoPos({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200
    });
  };
  return (
    <div className="p-10 h-full flex flex-col items-center justify-center bg-white rounded-3xl gap-8">
      <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center">
        <Heart fill="#e11d48" className="text-rose-600" size={60} />
      </div>
      <h3 className="text-3xl font-display font-bold text-slate-800 text-center">Do you love me?</h3>
      <div className="flex gap-4 items-center">
         <button className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold hover:scale-110 transition-transform shadow-lg shadow-rose-200">Yes</button>
         <motion.button 
           onMouseEnter={moveNo}
           animate={{ x: noPos.x, y: noPos.y }}
           className="px-8 py-3 bg-slate-200 text-slate-600 rounded-full font-bold"
         >No</motion.button>
      </div>
    </div>
  );
};

const GalaxyDemo = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black rounded-3xl overflow-hidden relative">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-[300px] h-[300px] rounded-full relative"
      >
        <div className="absolute inset-0 rounded-full border-[20px] border-purple-500/20 blur-xl" />
        <div className="absolute inset-2 rounded-full border-[10px] border-blue-500/30 blur-lg" />
        <div className="absolute inset-4 rounded-full border-[5px] border-pink-500/40 blur-md" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(255,255,255,0.1)]" />
      </motion.div>
      <div className="absolute flex flex-col items-center">
         <div className="text-white/50 text-[10px] font-mono tracking-[0.5em] uppercase">Interactive</div>
         <div className="text-white/20 text-[10px] font-mono tracking-[0.5em] uppercase mt-1">Singularity</div>
      </div>
    </div>
  );
};

const BB8Demo = ({ theme }: { theme: string }) => {
  return (
    <div className={`w-full h-full flex items-center justify-center rounded-3xl transition-colors duration-700 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f4d03f]'}`}>
       <div className="relative w-48 h-24 rounded-full bg-black/20 flex items-center p-2 overflow-hidden">
          <div className="absolute inset-0 flex items-center gap-1 opacity-40 px-4">
             {theme === 'dark' ? (
                <div className="flex gap-2">
                   <div className="w-1 h-1 bg-white rounded-full" />
                   <div className="w-1 h-1 bg-white rounded-full opacity-50" />
                   <div className="w-2 h-2 bg-slate-400 rounded-full" />
                </div>
             ) : (
                <div className="w-full h-1/2 bg-orange-700/20 absolute bottom-0 left-0" />
             )}
          </div>

          <motion.div
            animate={{ x: theme === 'dark' ? 120 : 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="w-16 h-16 bg-white rounded-full border-4 border-orange-500 relative flex flex-col items-center pt-2"
          >
             <div className="w-8 h-8 rounded-full border-4 border-orange-500 flex flex-col items-center pt-1">
                <div className="w-4 h-4 bg-slate-800 rounded-full" />
             </div>
          </motion.div>
       </div>
    </div>
  );
};

export default function Playground() {
  const [activeExp, setActiveExp] = useState<number | null>(null);
  const isDark = document.documentElement.classList.contains('dark');
  const theme = isDark ? 'dark' : 'light';

  const renderDemo = (id: string) => {
    switch(id) {
      case 'clock': return <ClockOfClocksDemo />;
      case 'new-year': return <NewYearDemo />;
      case 'holo-card': return <HoloCardDemo />;
      case 'valentine': return <ValentineDemo />;
      case 'galaxy': return <GalaxyDemo />;
      case 'bb8-toggle': return <BB8Demo theme={theme} />;
      default: return null;
    }
  };

  return (
    <main className="pt-32 pb-40 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      <header className="max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl sm:text-[90px] font-display font-extrabold tracking-tighter uppercase leading-[0.85] text-slate-900 dark:text-white"
        >
          Research & <span className="text-blue-600 italic block sm:inline">Play.</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-gray-400 text-xl mt-6">
          A collection of creative coding experiments and UI architectural prototypes. Focus on simulation over presentation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {experiments.map((item, i) => (
          <motion.div
            key={item.title}
            layoutId={`card-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveExp(i)}
            className="glass p-8 rounded-[32px] space-y-6 group cursor-pointer hover:border-blue-500/30 transition-all relative overflow-hidden h-full flex flex-col"
          >
            <div className={`p-4 rounded-2xl w-fit ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            
            <div className="space-y-3 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
                <span className="text-[10px] bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full uppercase tracking-widest text-slate-500 dark:text-white/40 font-mono">{item.tag}</span>
              </div>
              <p className="text-slate-500 dark:text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
            
            <div className="pt-4 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-white/20 group-hover:text-blue-500 transition-colors">
              <Play size={10} fill="currentColor" />
              <span>Launch Experiment</span>
            </div>

            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-colors" />
          </motion.div>
        ))}

        <AnimatePresence>
          {activeExp !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-12 bg-slate-900/40 dark:bg-[#0A0A0B]/90 backdrop-blur-3xl overflow-y-auto">
              <motion.div
                layoutId={`card-${activeExp}`}
                className="glass w-full max-w-6xl rounded-[48px] overflow-hidden bg-white dark:bg-[#161617] flex flex-col"
              >
                <div className="flex justify-between items-start p-8 sm:p-12 border-b border-slate-200 dark:border-white/5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${experiments[activeExp].color}`}>
                        {experiments[activeExp].icon}
                      </div>
                      <div>
                        <span className="text-blue-500 font-mono text-xs tracking-widest uppercase font-bold">{experiments[activeExp].tag}</span>
                        <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tighter text-slate-900 dark:text-white">{experiments[activeExp].title}</h2>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveExp(null)}
                    className="p-3 glass rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-slate-900 dark:text-white shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-grow p-4 sm:p-8 flex flex-col">
                  {/* Output Only View */}
                  <div className="flex-grow min-h-[400px] sm:min-h-[500px] rounded-[32px] overflow-hidden relative">
                    {renderDemo(experiments[activeExp].id)}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-12 items-center justify-between pb-8">
                     <div className="space-y-4 max-w-md">
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-blue-500 font-bold flex items-center gap-2">
                          <Loader2 className="animate-spin" size={12} />
                          Research Metadata
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed italic">
                          "{experiments[activeExp].desc}"
                        </p>
                     </div>
                     
                     <div className="flex gap-8">
                        <div className="text-center">
                           <div className="text-xl font-bold dark:text-white">Active</div>
                           <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Node State</div>
                        </div>
                        <div className="text-center">
                           <div className="text-xl font-bold dark:text-white">60FPS</div>
                           <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Perf Target</div>
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveExp(null)}
                className="absolute inset-0 -z-10"
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
