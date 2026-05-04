import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');
  const HH = format(time.getHours());
  const MM = format(time.getMinutes());
  const SS = format(time.getSeconds());

  // Simple hand positions for segments: 
  // 0: [90, 180] (top-left corner), 1: [270, 180] (top-right), 2: [0, 90] (bottom-left), 3: [0, 270] (bottom-right)
  // 4: [0, 180] (vertical), 5: [90, 270] (horizontal)
  // 6: [225, 225] (hidden/neutral)
  const DIGITS: Record<string, number[][]> = {
    '0': [[180, 90], [180, 270], [180, 0], [180, 0], [0, 90], [0, 270]],
    '1': [[225, 225], [180, 180], [225, 225], [180, 0], [225, 225], [0, 0]],
    '2': [[90, 90], [180, 270], [90, 180], [0, 270], [180, 90], [270, 270]],
    '3': [[90, 90], [180, 270], [90, 90], [180, 0], [90, 90], [0, 270]],
    '4': [[180, 180], [180, 180], [0, 90], [180, 0], [225, 225], [0, 0]],
    '5': [[180, 90], [270, 270], [180, 0], [90, 90], [0, 90], [0, 270]],
    '6': [[180, 90], [270, 270], [180, 0], [180, 90], [0, 90], [0, 270]],
    '7': [[90, 90], [180, 270], [225, 225], [180, 0], [225, 225], [0, 0]],
    '8': [[180, 90], [180, 270], [90, 0], [270, 180], [0, 90], [0, 270]],
    '9': [[180, 90], [180, 270], [0, 90], [180, 0], [225, 225], [0, 0]],
  };

  const renderDigit = (digit: string) => {
    const config = DIGITS[digit] || [[225, 225], [225, 225], [225, 225], [225, 225], [225, 225], [225, 225]];
    return (
      <div className="grid grid-cols-2 grid-rows-3 gap-1">
        {config.map((angles, i) => (
          <div key={i} className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border border-slate-200 dark:border-white/10 relative bg-white/5 shadow-inner">
            <motion.div 
              animate={{ rotate: angles[0] }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              className="absolute top-1/2 left-1/2 w-px h-[40%] bg-slate-900 dark:bg-white origin-bottom -translate-x-1/2 -translate-y-full" 
            />
            <motion.div 
              animate={{ rotate: angles[1] }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              className="absolute top-1/2 left-1/2 w-px h-[40%] bg-slate-900 dark:bg-white origin-bottom -translate-x-1/2 -translate-y-full" 
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 sm:p-10 bg-slate-50 dark:bg-slate-900 rounded-[32px] overflow-hidden">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-12 transition-all duration-500 scale-[0.8] sm:scale-95 lg:scale-100">
        <div className="flex gap-2 sm:gap-4">
          {renderDigit(HH[0])}
          {renderDigit(HH[1])}
        </div>
        
        <div className="flex flex-row sm:flex-col gap-4 py-2 sm:py-0">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>

        <div className="flex gap-2 sm:gap-4">
          {renderDigit(MM[0])}
          {renderDigit(MM[1])}
        </div>

        <div className="hidden sm:flex flex-col gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 animate-pulse" />
        </div>

        <div className="hidden sm:flex gap-2 sm:gap-4">
          {renderDigit(SS[0])}
          {renderDigit(SS[1])}
        </div>
      </div>
    </div>
  );
};

const NewYearDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-[#0c0c14] rounded-[32px] h-full w-full relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', x: Math.random() * 100 + '%' }}
            animate={{ y: '-10%' }}
            transition={{ 
              duration: 8 + Math.random() * 12, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear" 
            }}
            className="absolute w-px h-24 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center transition-transform duration-500 scale-[0.7] sm:scale-100">
        <motion.div 
          animate={{ y: [0, -350] }}
          transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatDelay: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-18 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-[0_0_40px_rgba(245,158,11,0.3)] relative">
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-white/30 rounded-full blur-[1px]" />
          </div>
          <div className="w-px h-32 bg-white/10 relative">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-8xl font-display font-black text-blue-500">
                5
             </div>
          </div>
        </motion.div>

        <div className="text-6xl sm:text-[100px] lg:text-[140px] font-display font-black tracking-tighter flex items-center leading-none mt-[-60px] sm:mt-[-80px]">
          <span className="text-white">202</span>
          <div className="relative w-[1ch] inline-block h-[100px] lg:h-[140px] overflow-hidden">
             <motion.span 
               animate={{ y: [0, 0, -140] }}
               transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatDelay: 1 }}
               className="absolute inset-0 text-blue-500/20"
             >5</motion.span>
             <motion.span 
               animate={{ y: [140, 140, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatDelay: 1 }}
               className="absolute inset-0 text-blue-500"
             >6</motion.span>
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          className="mt-12 text-blue-400/50 font-mono text-[10px] uppercase tracking-[0.8em]"
        >
          Temporal Shift Detected
        </motion.p>
      </div>
    </div>
  );
};

const HoloCardDemo = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  return (
    <div className="p-4 sm:p-10 h-full w-full flex items-center justify-center bg-slate-900 rounded-[32px] overflow-hidden group/card relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)] opacity-50" />
      
      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          setRotation({ x: (y - 0.5) * 40, y: -(x - 0.5) * 40 });
          setMousePos({ x: x * 100, y: y * 100 });
        }}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
        animate={{ 
          rotateX: rotation.x === 0 ? [0, 5, -5, 0] : rotation.x, 
          rotateY: rotation.y === 0 ? [0, -5, 5, 0] : rotation.y,
          scale: rotation.x !== 0 ? 1.05 : 1
        }}
        transition={{ 
          rotateX: rotation.x === 0 ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { type: 'spring', stiffness: 200, damping: 20 },
          rotateY: rotation.y === 0 ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { type: 'spring', stiffness: 200, damping: 20 },
          scale: { type: 'spring', stiffness: 200, damping: 20 }
        }}
        className="relative w-[260px] sm:w-[280px] h-[380px] sm:h-[420px] rounded-2xl shadow-2xl p-[1px] overflow-hidden bg-white/10 transition-transform scale-90 sm:scale-100"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-full bg-[#0a0a0c] rounded-2xl relative overflow-hidden flex flex-col p-6 border border-white/10">
           {/* Holo Shine Overlay */}
           <motion.div 
             className="absolute inset-0 pointer-events-none z-10"
             style={{
               background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%), 
                           linear-gradient(${mousePos.x + mousePos.y}deg, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 55%, transparent 100%)`,
               backgroundBlendMode: 'overlay',
               mixBlendMode: 'color-dodge'
             }}
           />

           <div className="relative z-20 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20" />
                 <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Type: Legendary</div>
              </div>
              <div className="h-44 w-full bg-slate-800/50 rounded-xl mb-4 border border-white/5 overflow-hidden">
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-full h-full bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1afcdd146?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" 
                 />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-white/20 rounded-full" />
                <div className="h-4 w-1/2 bg-white/10 rounded-full" />
              </div>
              <div className="mt-auto pt-6 border-t border-white/5">
                 <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <div className="h-2 w-16 bg-blue-500/50 rounded-full" />
                       <div className="h-2 w-24 bg-white/5 rounded-full" />
                    </div>
                    <div className="text-3xl font-display font-black text-white/10 tracking-widest">001</div>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const ValentineDemo = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();

  const moveNo = () => {
    if (isAccepted) return;
    const range = 180;
    setNoPos({
      x: (Math.random() - 0.5) * range,
      y: (Math.random() - 0.5) * range
    });
  };

  if (isAccepted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-10 h-full w-full flex flex-col items-center justify-center bg-rose-50 rounded-[32px] gap-6 text-center"
      >
        <motion.div
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ duration: 1, repeat: Infinity }}
           className="text-8xl"
        >
          💖
        </motion.div>
        <div className="space-y-4">
          <h3 className="text-4xl font-display font-black text-rose-600 uppercase tracking-tighter">I knew it!</h3>
          <p className="text-rose-800 dark:text-rose-400 font-medium max-w-xs leading-relaxed">Your resistance was futile. Logic always bows to the heart.</p>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-xs mt-6">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-rose-500 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:bg-rose-600 transition-all active:scale-95"
          >
            Go Back to Reality
          </button>
          <button 
            onClick={() => setIsAccepted(false)}
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-300 hover:text-rose-500 transition-colors"
          >
            Try again?
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 sm:p-10 h-full w-full flex flex-col items-center justify-center bg-white rounded-[32px] gap-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#fff1f2,transparent)]" />
      
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 bg-rose-50 rounded-full flex items-center justify-center shadow-inner"
      >
        <Heart fill="#e11d48" className="text-rose-600 drop-shadow-lg" size={60} />
      </motion.div>

      <div className="relative z-10 text-center space-y-3 px-4 max-w-xs transition-transform duration-500 scale-[0.85] sm:scale-100">
        <h3 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase tracking-tighter leading-none">Do you love me?</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">System prompt: Emotional confirmation required.</p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center w-full justify-center px-6">
         <button 
           onClick={() => setIsAccepted(true)}
           className="w-48 sm:w-auto px-10 py-4 bg-rose-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-all shadow-[0_10px_20px_rgba(225,29,72,0.3)] active:scale-95 shrink-0"
         >
           Yes
         </button>
         <motion.button 
           onMouseEnter={moveNo}
           onDrag={moveNo}
           onClick={moveNo}
           animate={{ x: noPos.x, y: noPos.y }}
           transition={{ type: 'spring', stiffness: 500, damping: 30 }}
           className="w-48 sm:w-auto px-10 py-4 bg-slate-100 text-slate-400 rounded-full font-black uppercase tracking-widest text-xs border border-slate-200 shrink-0"
         >
           No
         </motion.button>
      </div>
    </div>
  );
};

const GalaxyDemo = () => {
  const [rot, setRot] = useState({ x: -20, y: 0 });

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#050508] rounded-[32px] overflow-hidden relative group/galaxy p-4">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(150)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 1.5 + 'px',
              height: Math.random() * 1.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.4 + 0.1
            }}
          />
        ))}
      </div>

      <motion.div 
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          setRot({ x: -20 + y * 20, y: x * 30 });
        }}
        onMouseLeave={() => setRot({ x: -20, y: 0 })}
        className="relative flex items-center justify-center transition-transform duration-700 scale-[0.4] sm:scale-75 md:scale-90 lg:scale-100"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <motion.div
           animate={{ rotateX: rot.x, rotateY: rot.y }}
           transition={{ type: 'spring', stiffness: 100, damping: 30 }}
           className="relative flex items-center justify-center"
           style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 3D Accretion Rings */}
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ rotateZ: 360 }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border-[1.5px]"
              style={{
                width: `${300 + i * 60}px`,
                height: `${300 + i * 60}px`,
                borderColor: `rgba(${139 - i * 20}, ${92 + i * 10}, ${246}, ${0.15 - i * 0.03})`,
                boxShadow: `0 0 40px rgba(139, 92, 246, ${0.05 - i * 0.01})`,
                transform: `rotateX(75deg) translateZ(${i * 15}px)`
              }}
            >
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-400 rounded-full blur-[2px] opacity-40 shadow-[0_0_10px_#60a5fa]" />
            </motion.div>
          ))}
          
          {/* Event Horizon Depth */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-r from-purple-600/30 via-blue-500/10 to-purple-400/30 blur-3xl animate-pulse" style={{ transform: 'translateZ(-20px)' }} />
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="relative w-44 h-44 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 rounded-full border-[3px] border-white/10 blur-[1px]" />
            <div className="absolute inset-4 rounded-full border-t-[3px] border-white/30" />
            
            {/* The Singularity - Pure Void */}
            <div className="w-32 h-32 bg-black rounded-full shadow-[0_0_100px_rgba(139,92,246,0.3)] relative z-10 overflow-hidden ring-1 ring-white/5">
               <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]" />
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,1),rgba(139,92,246,0.1))]" 
               />
            </div>
          </motion.div>

          {/* Distant Particle Clouds */}
          <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full" style={{ transform: 'rotateX(80deg) translateZ(-40px)' }} />
        </motion.div>

        <div className="absolute z-30 text-center pointer-events-none -bottom-24 transition-opacity group-hover/galaxy:opacity-100 opacity-60">
           <div className="text-white/40 text-[10px] font-mono tracking-[1.2em] uppercase ml-[1.2em] font-black">Digital Singularity</div>
           <div className="text-white/10 text-[8px] font-mono tracking-[2em] uppercase mt-3 ml-[2em]">Holographic Engine Active</div>
        </div>
      </motion.div>
    </div>
  );
};

const BB8Demo = () => {
  const [demoTheme, setDemoTheme] = useState< 'dark' | 'light'>('dark');
  
  const toggleTheme = () => {
    const newTheme = demoTheme === 'dark' ? 'light' : 'dark';
    setDemoTheme(newTheme);
    // Toggle global theme
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center rounded-[32px] transition-all duration-1000 relative overflow-hidden ${demoTheme === 'dark' ? 'bg-[#0f0f1a]' : 'bg-[#fceabb]'}`}>
       {/* Background Elements */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          {demoTheme === 'dark' ? (
             <div className="w-full h-full">
                {[...Array(40)].map((_, i) => (
                   <div 
                     key={i} 
                     className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-20"
                     style={{ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%' }}
                   />
                ))}
                <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-slate-200/10 blur-xl" />
             </div>
          ) : (
             <div className="w-full h-full">
                <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[150%] bg-orange-400/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 w-full h-24 bg-orange-800/10 shadow-[0_-20px_40px_rgba(154,52,18,0.1)] opacity-20" />
             </div>
          )}
       </div>

       <div className="relative z-10 flex flex-col items-center gap-12 transition-transform duration-500 scale-[0.6] sm:scale-[0.8] md:scale-100">
          <div 
            onClick={toggleTheme}
            className="group relative w-64 h-32 rounded-full bg-black/20 backdrop-blur-md flex items-center p-3 border border-white/5 cursor-pointer shadow-2xl active:scale-95 transition-transform"
          >
             <motion.div
               animate={{ x: demoTheme === 'dark' ? 148 : 0 }}
               transition={{ type: 'spring', stiffness: 80, damping: 20 }}
               className="w-24 h-24 relative"
             >
                {/* BB-8 Head */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-10 bg-white rounded-t-full border-b-[6px] border-slate-300 overflow-hidden shadow-md">
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full border-2 border-slate-400" />
                   <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-slate-900 rounded-full" />
                </div>
                {/* BB-8 Body */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "loop", playState: demoTheme === 'dark' ? "running" : "running" }}
                  className="w-full h-full bg-white rounded-full border-4 border-slate-200 shadow-xl flex items-center justify-center p-2"
                >
                   <div className="w-full h-full rounded-full border-[6px] border-orange-500 relative">
                      <div className="absolute inset-0 border-r-[6px] border-orange-500 rotate-45" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-full border-2 border-slate-300" />
                   </div>
                </motion.div>
             </motion.div>

             <div className="absolute inset-0 flex justify-between items-center px-10 pointer-events-none">
                <Moon className={`transition-opacity duration-500 ${demoTheme === 'dark' ? 'opacity-100 text-blue-400' : 'opacity-0'}`} />
                <Sparkles className={`transition-opacity duration-500 ${demoTheme === 'light' ? 'opacity-100 text-orange-500' : 'opacity-0'}`} />
             </div>
          </div>
          
          <div className="text-center group cursor-default">
             <h4 className={`text-xl font-display font-black uppercase tracking-widest transition-colors duration-500 ${demoTheme === 'dark' ? 'text-white' : 'text-orange-900'}`}>
                {demoTheme === 'dark' ? 'Digital Night' : 'Golden Hour'}
             </h4>
             <p className={`text-[10px] font-mono uppercase tracking-[0.4em] font-bold mt-3 transition-colors duration-500 ${demoTheme === 'dark' ? 'text-blue-400/40' : 'text-orange-700/40'}`}>
                Droid Protocol Activated
             </p>
          </div>
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
      case 'bb8-toggle': return <BB8Demo />;
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
