import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Cpu, Database, Palette, Sparkles as SparklesIcon } from 'lucide-react';

const arsenal = [
  { name: 'Tailwind CSS', icon: <Palette size={24} />, size: 'large', color: 'hover:bg-cyan-500/10 hover:border-cyan-500/50', description: 'Styling at speed without leaving your HTML.' },
  { name: 'AI Integration', icon: <SparklesIcon size={24} />, size: 'medium', color: 'hover:bg-blue-600/10 hover:border-blue-600/50', description: 'Deploying LLMs and custom AI agents for business logic.' },
  { name: 'JavaScript', icon: <Cpu size={24} />, size: 'medium', color: 'hover:bg-yellow-500/10 hover:border-yellow-500/50', description: 'Powering interactivity and logic.' },
  { name: 'TypeScript', icon: <Terminal size={24} />, size: 'medium', color: 'hover:bg-blue-500/10 hover:border-blue-500/50', description: 'Type-safe codebase management.' },
  { name: 'React', icon: <Database size={24} />, size: 'small', color: 'hover:bg-indigo-500/10 hover:border-indigo-500/50', description: 'Architecting scalable UI.' },
];

export default function Home() {
  return (
    <main className="pt-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-32 pb-40">
      <Hero />
      <ArsenalGrid />
      <FeaturedWork />
    </main>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [style, setStyle] = useState({ rounded: 'rounded-lg', bg: 'bg-neutral-800' });
  
  const fullCode = `<div className="\${style.bg} \${style.rounded} p-8 shadow-xl transition-all duration-700">
  <h1 className="text-2xl font-bold">The Magic of Tailwind</h1>
  <p className="text-white/60">Logic translates to UI in real-time.</p>
</div>`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCode(fullCode.slice(0, index));
      index++;
      
      // Real-time updates based on specific code insertion
      if (index > 20) setStyle(prev => ({ ...prev, bg: 'bg-blue-600' }));
      if (index > 40) setStyle(prev => ({ ...prev, rounded: 'rounded-full' }));
      
      if (index > fullCode.length) {
        setTimeout(() => {
          index = 0;
          setStyle({ rounded: 'rounded-lg', bg: 'bg-neutral-800' });
        }, 3000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center min-h-[70vh]">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-6">
            Senior Frontend Developer
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-display font-extrabold leading-[0.85] tracking-tighter uppercase text-slate-900 dark:text-white">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              MO<span className="text-blue-600">.dev</span>
            </motion.span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-blue-500" />
            <p className="text-sm font-mono uppercase tracking-widest text-blue-400 font-bold">Crafting Digital Experiences</p>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-md mt-4 leading-relaxed">
            Architecting high-performance digital ecosystems through strategic engineering and distinctive aesthetic precision. Delivering logic at scale.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <button 
            onClick={() => navigate('/work')}
            className="px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-blue-600 transition-all cursor-pointer"
          >
            View Work
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 border border-slate-200 dark:border-white/10 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer text-slate-900 dark:text-white"
          >
            Schedule Demo
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative"
      >
        <div className="bg-[#1E1E1E] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="flex items-center gap-1.5 p-4 bg-[#2D2D2D] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <div className="ml-4 text-[10px] text-gray-500 font-mono">Hero.tsx — Portfolio</div>
          </div>
          <div className="p-6 h-64 overflow-hidden font-mono text-xs leading-relaxed flex gap-6">
            <div className="text-gray-600 text-right select-none pr-4 border-r border-white/5">
              1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9
            </div>
            <pre className="text-blue-400 whitespace-pre-wrap">{code}</pre>
          </div>
          <div className="p-12 flex items-center justify-center bg-[#0a0a0b] relative min-h-[220px]">
            <motion.div 
              className={`p-8 ${style.bg} ${style.rounded} shadow-2xl shadow-blue-500/20 text-center md:text-left transition-all duration-700 relative z-10 border border-white/5 min-w-[280px] min-h-[140px] flex flex-col justify-center`}
              layout
            >
              <AnimatePresence mode="wait">
                {code.includes('The Magic') ? (
                  <motion.h3 
                    key="header-real"
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="text-2xl font-bold text-white leading-tight tracking-tight"
                  >
                    The Magic of Tailwind
                  </motion.h3>
                ) : (
                  <motion.div 
                    key="header-skeleton"
                    exit={{ opacity: 0 }}
                    className="h-6 w-32 bg-white/10 animate-pulse rounded mx-auto md:mx-0" 
                  />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {code.includes('Logic translates') ? (
                  <motion.p 
                    key="para-real"
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="text-xs text-white/70 mt-3 font-medium leading-relaxed"
                  >
                    Logic translates to UI in real-time.
                  </motion.p>
                ) : (
                  <motion.div 
                    key="para-skeleton"
                    exit={{ opacity: 0 }}
                    className="h-4 w-48 bg-white/5 animate-pulse rounded mx-auto md:mx-0 mt-3" 
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/5 blur-3xl" />
          </div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/20 blur-3xl"
        />
      </motion.div>
    </section>
  );
}

function ArsenalGrid() {
  return (
    <section className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.3em] mb-2">Technical Core</h2>
          <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white">My Arsenal</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">40+</div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-gray-500">Projects Completed</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {arsenal.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 0.98 }}
            className={`
              glass rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 group cursor-default
              ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
              ${item.size === 'medium' ? 'md:col-span-2 md:row-span-1' : ''}
              ${item.color}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-100/50 dark:bg-white/5 rounded-xl text-blue-600 dark:text-white group-hover:text-blue-500 transition-colors border border-blue-200/50 dark:border-white/10 shadow-sm dark:shadow-none">
                {item.icon}
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-white/20 uppercase tracking-widest">{item.name.split(' ')[0]}</div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.name}</h3>
              <p className="text-xs text-slate-600 dark:text-gray-500 mt-2 line-clamp-2 leading-relaxed font-medium dark:font-normal">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork() {
  const navigate = useNavigate();
  return (
    <section className="space-y-16">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.3em] mb-2">Our Portfolio</h2>
          <h3 className="text-4xl font-display font-bold uppercase text-slate-900 dark:text-white">Featured Work</h3>
        </div>
        <button 
          onClick={() => navigate('/work')}
          className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          Observe All →
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            id: 1, 
            name: 'Pizza al Volo', 
            desc: 'Redefining Roman street food through an elite digital portal. A study in high-contrast typography and wood-fired performance engineering.',
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
            preview: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop',
            liveLink: 'https://pizzaalvolo.vercel.app'
          },
          { 
            id: 2, 
            name: 'Aurelius Citadel', 
            desc: 'Architecting a prestigious physical-meets-digital hub. A case study in luxury branding and high-stakes user flow optimization.',
            img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
            preview: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
            liveLink: 'https://aurelius-academy-official.vercel.app/'
          },
          { 
            id: 3, 
            name: 'Palo Drive Thru Cafe', 
            desc: 'A lightning-fast specialty coffee drive-thru portal set in Melton, Victoria. Maximizing velocity for commuters without sacrificing artisanal warmth.',
            img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
            preview: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
            liveLink: 'https://palo-drivethru.vercel.app'
          }
        ].map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any; key?: React.Key }) {
  const navigate = useNavigate();
  const [trail, setTrail] = useState<{ x: number; y: number; time: number; id: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const newPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
      id: Math.random(),
    };
    
    // Throttled point addition: only add if cursor moved or every 30ms
    setTrail(prev => {
      const last = prev[prev.length - 1];
      if (last && Math.abs(last.x - newPoint.x) < 3 && Math.abs(last.y - newPoint.y) < 3) return prev;
      return [...prev, newPoint].slice(-120); // Increased limit for smoother long tail
    });
  };

  useEffect(() => {
    const updateTrail = () => {
      const now = Date.now();
      setTrail(prev => prev.filter(p => now - p.time < 2400));
      rafRef.current = requestAnimationFrame(updateTrail);
    };
    rafRef.current = requestAnimationFrame(updateTrail);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const maskImage = trail.length > 0 
    ? trail.map((p) => {
        const age = Date.now() - p.time;
        const progress = Math.max(0, 1 - age / 2400);
        const radius = 120 * progress;
        return `radial-gradient(circle ${radius}px at ${p.x}px ${p.y}px, black 100%, transparent 100%)`;
      }).join(', ')
    : 'none';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/work#project-${project.id}`)}
      className="group relative h-[400px] sm:h-[500px] rounded-[40px] overflow-hidden glass hover:border-blue-500/50 transition-all duration-700 cursor-pointer"
    >
      {/* Background Image (Primary) */}
      <img 
        src={project.img} 
        alt={project.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      
      {/* Reveal Overlay (Trailing Tail Preview) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: trail.length > 0 ? 1 : 0,
          transition: 'opacity 0.5s ease',
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <img 
          src={project.preview} 
          alt="Preview" 
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay" />
      </div>

      {/* Structured Gradient for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent z-20 opacity-90" />
      
      {/* Content */}
      <div className="absolute bottom-12 left-12 z-30 space-y-3 font-display">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-blue-500 text-[10px] font-mono uppercase tracking-widest font-bold">Case Study / 0{project.id}</span>
        </div>
        <h3 className="text-3xl font-bold uppercase tracking-tighter text-white drop-shadow-md">{project.name}</h3>
        <p className="text-gray-200 dark:text-gray-300 text-sm max-w-xs leading-relaxed font-medium dark:font-normal drop-shadow-sm">{project.desc}</p>
        <div className="pt-4 flex gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors">
            View Project <span className="text-blue-500">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
