import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles, Heart, Orbit, Moon, Play, X, Loader2, Sliders, Zap } from 'lucide-react';

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
    id: 'holo-card',
    title: 'Legendary Card Effect', 
    icon: <Sparkles />, 
    tag: 'Foil Card', 
    desc: 'Simulating holographic diffraction and metallic reflections on a detailed Pokémon-style trading card using mouse vectors.',
    color: 'bg-amber-500/10 text-amber-500',
    demo: 'Applying Gilded Foils...'
  },
  { 
    id: 'valentine',
    title: 'Love Me Valentine', 
    icon: <Heart />, 
    tag: 'UX Logic', 
    desc: 'An adaptive "No" button escaping interaction within local card limits, with a clever hijack on clicks.',
    color: 'bg-rose-500/10 text-rose-500',
    demo: 'Evading Rejection...'
  },
  { 
    id: 'spring-physics',
    title: 'CSS Spring Sandbox', 
    icon: <Sliders />, 
    tag: 'Motion Physics', 
    desc: 'Tweak springs, modify physical constants, and copy custom Motion transition configurations instantly.',
    color: 'bg-emerald-500/10 text-emerald-500',
    demo: 'Modeling Dynamics...'
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
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 lg:gap-12 transition-all duration-500 scale-[0.55] xs:scale-[0.75] sm:scale-95 lg:scale-100 origin-center">
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
const HoloCardDemo = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="p-4 sm:p-10 h-full w-full flex items-center justify-center bg-slate-950 rounded-[32px] overflow-hidden group/card relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2e1065,transparent)] opacity-40 animate-pulse" />
      
      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          setRotation({ x: (y - 0.5) * 45, y: -(x - 0.5) * 45 });
          setMousePos({ x: x * 100, y: y * 100 });
          setIsHovered(true);
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => {
          setRotation({ x: 0, y: 0 });
          setIsHovered(false);
        }}
        animate={{ 
          rotateX: rotation.x === 0 ? [0, 5, -5, 0] : rotation.x, 
          rotateY: rotation.y === 0 ? [0, -5, 5, 0] : rotation.y,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ 
          rotateX: rotation.x === 0 ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { type: 'spring', stiffness: 220, damping: 22 },
          rotateY: rotation.y === 0 ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { type: 'spring', stiffness: 220, damping: 22 },
          scale: { type: 'spring', stiffness: 220, damping: 22 }
        }}
        className="relative w-[300px] sm:w-[320px] h-[450px] sm:h-[490px] rounded-[24px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden p-[8px] bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 transition-transform cursor-pointer select-none"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        {/* Holographic foil overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 0.35,
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 60%),
              linear-gradient(${mousePos.x * 2.5}deg, rgba(239,68,68,0.15) 0%, rgba(245,158,11,0.15) 25%, rgba(16,185,129,0.15) 50%, rgba(59,130,246,0.15) 75%, rgba(139,92,246,0.15) 100%)
            `,
            mixBlendMode: 'color-dodge',
          }}
        />

        {/* Diagonal metallic shine line */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 transition-all duration-300"
          style={{
            background: `linear-gradient(${mousePos.x + 135}deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Card Body Interior */}
        <div className="w-full h-full bg-[#12121e] rounded-[18px] relative overflow-hidden flex flex-col p-4 border border-amber-300/30 text-white font-sans">
          
          {/* Card header: Name, Stage, and HP */}
          <div className="flex items-center justify-between border-b border-amber-400/20 pb-1.5 mb-1.5 bg-amber-400/5 px-2 rounded-lg">
            <div className="flex flex-col">
              <span className="text-[7px] text-amber-300 font-mono tracking-widest uppercase font-bold">Stage 2 Evolution</span>
              <h4 className="text-sm font-black uppercase text-amber-200 tracking-tight flex items-center gap-1">
                MO.DEV <span className="text-[9px] font-mono text-slate-400">#001</span>
              </h4>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-amber-400 font-black">999 HP</span>
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-md shadow-amber-500/10 flex items-center justify-center text-[11px] select-none font-bold text-amber-950">⚡</span>
            </div>
          </div>

          {/* Holographic Illustration Window */}
          <div className="h-40 w-full rounded-lg bg-gradient-to-b from-[#1c1c38] to-[#0c0c16] border-[2px] border-amber-400/40 relative overflow-hidden group-hover/card:border-amber-400 transition-colors shadow-inner flex flex-col justify-center items-center">
            
            {/* Holographic starfield simulation */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute w-12 h-12 bg-indigo-500/20 rounded-full filter blur-xl animate-pulse top-5 left-5" />
              <div className="absolute w-16 h-16 bg-pink-500/10 rounded-full filter blur-xl animate-pulse bottom-5 right-5" />
            </div>

            {/* Glowing developer emblem */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ 
                  scale: isHovered ? [1, 1.08, 1] : 1,
                  rotate: isHovered ? [0, 2, -2, 0] : 0
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-500 p-[1.5px] shadow-[0_0_30px_rgba(245,158,11,0.25)]"
              >
                <div className="w-full h-full bg-[#0c0c16] rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">💻</span>
                </div>
              </motion.div>
              <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-amber-300 font-black mt-3 text-center">Lightning Dev Type</div>
            </div>

            {/* Micro details on card window */}
            <div className="absolute bottom-1 right-2 text-[7px] font-mono text-slate-400">Illus. AI Studio build</div>
          </div>

          {/* Attack 1 */}
          <div className="py-2.5 border-b border-white/5 space-y-1 mt-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-500 flex items-center justify-center text-[8px] font-black text-cyan-950 select-none">💧</span>
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 flex items-center justify-center text-[8px] font-black text-amber-950 select-none">⚡</span>
                <h5 className="text-xs font-black uppercase text-amber-100 tracking-wide ml-1">Tailwind Sweep</h5>
              </div>
              <span className="text-xs font-mono font-black text-slate-200">120</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal pl-9 font-medium">
              Sweeps messy CSS. Instantly purges dead styling utilities and returns a highly pristine, fully responsive layout.
            </p>
          </div>

          {/* Attack 2 */}
          <div className="py-2.5 border-b border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] font-black text-white select-none">🔮</span>
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 flex items-center justify-center text-[8px] font-black text-amber-950 select-none">⚡</span>
                <h5 className="text-xs font-black uppercase text-amber-100 tracking-wide ml-1">Agentic Synthesis</h5>
              </div>
              <span className="text-xs font-mono font-black text-slate-200">250</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal pl-9 font-medium">
              Spawns a recursive cluster of cognitive sub-agents that completely refactors the application, resolving all console warnings.
            </p>
          </div>

          {/* Card Footer Info */}
          <div className="mt-auto pt-2 grid grid-cols-3 gap-1 text-[8px] font-mono text-slate-500 text-center uppercase tracking-tight">
            <div>
              <span className="block font-bold">Weakness</span>
              <span className="text-amber-500">☕ Caffeine x2</span>
            </div>
            <div>
              <span className="block font-bold">Resistance</span>
              <span className="text-indigo-400">🛡️ SOAP (-30)</span>
            </div>
            <div>
              <span className="block font-bold">Retreat Cost</span>
              <span className="text-emerald-400">⚡ ⚡</span>
            </div>
          </div>
          
          <div className="text-[8px] text-center italic text-amber-400/40 font-serif mt-1 pt-1.5 border-t border-white/5">
            "Under heavy load, its logic-loops release clean lightning pulses, leaving an impeccably styled screen."
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ValentineDemo = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();

  const moveNo = () => {
    if (isAccepted) return;
    setAttemptCount(prev => prev + 1);
    // Constrained range so it is easy to catch and never runs off-screen/out of container bounds
    const maxOffset = 60; // Max pixels offset
    setNoPos({
      x: (Math.random() - 0.5) * maxOffset,
      y: (Math.random() - 0.5) * maxOffset
    });
  };

  const handleInterceptNo = () => {
    // Cleverly hijacked emotional override so "No" translates to Yes!
    setIsAccepted(true);
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
          <p className="text-rose-800 dark:text-rose-400 font-medium max-w-xs leading-relaxed">
            {attemptCount > 0 
              ? `Emotional intercept success! It took ${attemptCount} attempts, but your resistance was resolved.`
              : 'Your resistance was resolved. Logic always bows to the heart.'}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-xs mt-6">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-rose-500 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:bg-rose-600 transition-all active:scale-95"
          >
            Go Back to Reality
          </button>
          <button 
            onClick={() => {
              setIsAccepted(false);
              setAttemptCount(0);
              setNoPos({ x: 0, y: 0 });
            }}
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-300 hover:text-rose-500 transition-colors cursor-pointer"
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
        className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 bg-rose-50 rounded-full flex items-center justify-center shadow-inner mt-4"
      >
        <Heart fill="#e11d48" className="text-rose-600 drop-shadow-lg" size={60} />
      </motion.div>

      <div className="relative z-10 text-center space-y-3 px-4 max-w-xs transition-transform duration-500 scale-[0.85] sm:scale-100">
        <h3 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase tracking-tighter leading-none">Do you love me?</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">System prompt: Emotional confirmation required.</p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center w-full justify-center px-6 mb-4">
         <button 
           onClick={() => setIsAccepted(true)}
           className="w-48 sm:w-auto px-10 py-4 bg-rose-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-all shadow-[0_10px_20px_rgba(225,29,72,0.3)] active:scale-95 shrink-0 cursor-pointer"
         >
           Yes
         </button>
         <motion.button 
           onMouseEnter={moveNo}
           onDrag={moveNo}
           onClick={handleInterceptNo}
           animate={{ x: noPos.x, y: noPos.y }}
           transition={{ type: 'spring', stiffness: 500, damping: 30 }}
           className="w-48 sm:w-auto px-10 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-black uppercase tracking-widest text-xs border border-slate-200 shrink-0 cursor-pointer"
         >
           No
         </motion.button>
      </div>
    </div>
  );
};

const SpringPhysicsDemo = () => {
  const [stiffness, setStiffness] = useState(180);
  const [damping, setDamping] = useState(12);
  const [mass, setMass] = useState(1.0);
  const [triggerCount, setTriggerCount] = useState(0);

  const triggerBounce = () => {
    setTriggerCount(prev => prev + 1);
  };

  return (
    <div className="p-4 sm:p-8 h-full w-full flex flex-col md:grid md:grid-cols-2 gap-6 items-center justify-center bg-slate-950 rounded-[32px] overflow-hidden text-slate-100 font-sans">
      
      {/* Simulation Side */}
      <div className="w-full flex-grow flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-2xl border border-white/5 relative min-h-[220px]">
        <div className="absolute top-3 left-4 text-[9px] font-mono uppercase tracking-widest text-emerald-400">Tactile Viewport</div>
        
        {/* The Spring-animated element */}
        <div className="relative h-28 flex items-center justify-center w-full">
          <motion.div
            key={triggerCount}
            initial={{ scale: 0.3, y: -70, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: stiffness,
              damping: damping,
              mass: mass
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 shadow-[0_15px_35px_rgba(16,185,129,0.4)] flex items-center justify-center text-xl cursor-pointer"
            onClick={triggerBounce}
            whileTap={{ scale: 0.9 }}
          >
            🥎
          </motion.div>
        </div>

        <button
          onClick={triggerBounce}
          className="mt-4 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest rounded-lg border border-emerald-500/20 transition-all active:scale-95 cursor-pointer"
        >
          Retrigger Release
        </button>
      </div>

      {/* Control sliders & Code Generation Side */}
      <div className="w-full flex flex-col justify-center space-y-4 p-4 sm:p-6 bg-[#0c0c14] rounded-2xl border border-white/5">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Dynamics Control Panel</div>
        
        {/* Stiffness Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Stiffness (Forces)</span>
            <span className="text-emerald-400 font-bold">{stiffness} N/m</span>
          </div>
          <input
            type="range"
            min={10}
            max={600}
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
        </div>

        {/* Damping Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Damping (Friction)</span>
            <span className="text-emerald-400 font-bold">{damping} N·s/m</span>
          </div>
          <input
            type="range"
            min={1}
            max={65}
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
        </div>

        {/* Mass Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Mass (Inertia)</span>
            <span className="text-emerald-400 font-bold">{mass} kg</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
        </div>

        {/* Produced Config Snippet */}
        <div className="pt-2 border-t border-white/5 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Auto-Generated Motion Config</div>
          <pre className="p-3 bg-black/60 rounded-xl font-mono text-[9px] sm:text-xs text-emerald-300 border border-emerald-500/10 overflow-x-auto leading-relaxed">
{`const config = {
  type: "spring",
  stiffness: ${stiffness},
  damping: ${damping},
  mass: ${mass}
};`}
          </pre>
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
      case 'holo-card': return <HoloCardDemo />;
      case 'valentine': return <ValentineDemo />;
      case 'spring-physics': return <SpringPhysicsDemo />;
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 sm:p-8 md:p-12 bg-slate-900/40 dark:bg-[#0A0A0B]/90 backdrop-blur-3xl overflow-y-auto">
              <motion.div
                layoutId={`card-${activeExp}`}
                className="glass w-full max-w-5xl rounded-[24px] xs:rounded-[36px] md:rounded-[48px] overflow-hidden bg-white dark:bg-[#161617] flex flex-col"
              >
                <div className="flex justify-between items-start p-4 xs:p-6 sm:p-8 md:p-10 border-b border-slate-200 dark:border-white/5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-2.5 sm:p-3 rounded-xl ${experiments[activeExp].color}`}>
                        {experiments[activeExp].icon}
                      </div>
                      <div>
                        <span className="text-blue-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold">{experiments[activeExp].tag}</span>
                        <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">{experiments[activeExp].title}</h2>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveExp(null)}
                    className="p-2 sm:p-3 glass rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-slate-900 dark:text-white shrink-0 ml-4"
                  >
                    <X size={18} className="sm:hidden" />
                    <X size={20} className="hidden sm:block" />
                  </button>
                </div>

                <div className="flex-grow p-3 xs:p-5 sm:p-8 flex flex-col">
                  {/* Output Only View */}
                  <div className="flex-grow min-h-[260px] xs:min-h-[320px] sm:min-h-[450px] md:min-h-[500px] rounded-[18px] xs:rounded-[24px] sm:rounded-[32px] overflow-hidden relative">
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
