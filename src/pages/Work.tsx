import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Pizza al Volo',
    tagline: 'Authentic Roman Craft & High-Performance Culinary Architecture',
    challenge: 'A legendary Roman pizzeria needed a digital presence that matched the intensity of their 450°C wood-fired ovens. The existing interface was cold and lacked the "Authentic Craft" required to capture their high-end artisanal positioning in a competitive European market.',
    solution: 'I architected a high-contrast editorial experience that mirrors the precision of Roman pizza prep. By leveraging fluid motion transitions and sharp serif typography, I captured the heat and heritage of the wood-fired process. The result is a high-performance portal that saw a 300% increase in international reservations and digital engagement.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    wireframe: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=800&auto=format&fit=crop',
    color: 'from-red-600/20 to-orange-900/20',
    liveLink: 'https://pizzaalvolo.vercel.app'
  },
  {
    id: 2,
    title: 'Aurelius Citadel',
    tagline: 'High-Stakes Institutional Branding & User Ecosystems',
    challenge: 'A prestigious physical institution that lacked a digital counterpart capable of reflecting its elite standards. The fragmented digital experience resulted in friction for stakeholders and a dilution of the academy\'s prestigious identity.',
    solution: 'I engineered a unified "Digital Citadel"—a high-performance ecosystem that manages complex user flows while maintaining architectural rigor. Using advanced CSS variables for dynamic theming and high-end motion transitions, the platform serves as a benchmarks for modern educational systems.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    wireframe: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    color: 'from-indigo-600/20 to-blue-900/20',
    liveLink: 'https://aurelius-academy-official.vercel.app/'
  },
  {
    id: 3,
    title: 'Palo Drive Thru Cafe',
    tagline: 'Drive-Thru Specialty Coffee & High-Velocity Transit Architecture',
    challenge: 'Based in Melton, Victoria, this premier drive-thru cafe needed an elegant, streamlined online ordering interface that matched the quick transit speed of coffee enthusiasts. The challenge lay in creating a layout that maintains warmth and rich aesthetic identity while delivering ultra-fast loading times and effortless navigation on mobile devices.',
    solution: 'I engineered a lightning-fast, highly intuitive digital portal for high-velocity commuters. Combining robust, high-performance responsive frameworks with elegant beverage photography and fluid ordering layout motions, the portal maximizes transit efficiency without sacrificing the artisanal warmth of specialty coffee.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    wireframe: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    color: 'from-amber-650/20 to-orange-950/20',
    liveLink: 'https://palo-drivethru.vercel.app'
  }
];

export default function Work() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ show: boolean; projectTitle: string } | null>(null);

  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Add a slight delay to ensure the page has rendered and layout is stable
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <main className="relative pt-32 pb-40 px-6 sm:px-12 max-w-7xl mx-auto space-y-40">
      <header className="max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl sm:text-[100px] font-display font-extrabold tracking-tighter uppercase leading-[0.85]"
        >
          Selected <span className="text-blue-600 block sm:inline">Masterpieces.</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-gray-400 mt-6 text-lg max-w-xl">
          A deep dive into the challenges I've solved and the technical logic that brought them to life.
        </p>
      </header>

      <div className="space-y-60">
        {projects.map((project, index) => (
          <div key={project.id} id={`project-${project.id}`}>
            <ProjectSection 
              project={project} 
              index={index} 
              onGithubClick={() => setToast({ show: true, projectTitle: project.title })}
            />
          </div>
        ))}
      </div>

      {/* Toast Notification (LinkedIn style, elegant blue slide-in) */}
      <AnimatePresence>
        {toast?.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed bottom-24 right-6 sm:right-12 z-[100] max-w-sm w-[90%] bg-[#0a66c2] text-white p-5 rounded-2xl shadow-2xl border border-blue-400/30 flex flex-col gap-4 font-sans"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="bg-white/10 p-2 rounded-xl mt-0.5 shrink-0 flex items-center justify-center">
                  <Github size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide text-white">Secure Codebase Restricted</h4>
                  <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                    The code for <span className="font-semibold text-white">{toast.projectTitle}</span> is currently stored in a protected vault. Request Mo for temporary workspace access.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setToast(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-2 justify-end items-center text-xs">
              <button 
                onClick={() => setToast(null)}
                className="px-3 py-1.5 font-bold uppercase tracking-widest text-[10px] text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                Dismiss
              </button>
              <button 
                onClick={() => {
                  setToast(null);
                  navigate('/contact');
                }}
                className="px-4 py-2 bg-white text-[#0a66c2] hover:bg-blue-50 hover:text-blue-800 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow shadow-black/10 cursor-pointer"
              >
                Request Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

interface ProjectSectionProps {
  project: any;
  index: number;
  onGithubClick: () => void;
}

interface ScrollRevealBoxProps {
  index: number;
  color: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, index, onGithubClick }) => {
  const container = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <section ref={container} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <motion.div 
        style={{ scale, opacity, y }}
        className="space-y-8 lg:space-y-12 lg:sticky lg:top-32"
      >
        <div className="space-y-4">
          <span className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase">Project 0{index + 1}</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tighter leading-tight text-slate-900 dark:text-white">{project.title}</h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg sm:text-xl italic">{project.tagline}</p>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-blue-500/50 mb-3 border-l-2 border-blue-600 dark:border-blue-600 pl-4 font-bold">The Challenge</h4>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">{project.challenge}</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-gray-600 mb-3 border-l-2 border-slate-200 dark:border-white/10 pl-4 font-bold">The Solution</h4>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">{project.solution}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-slate-900 text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] rounded-full px-8 py-4 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all shadow-lg dark:shadow-none"
          >
            View Live <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <button 
            onClick={onGithubClick}
            className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Source Code <Github size={14} />
          </button>
        </div>
      </motion.div>

      <div className="space-y-20">
        <div className="space-y-6">
           <h4 className="text-xs text-center uppercase tracking-widest text-white/20">Wireframe vs Final</h4>
           <div className="relative group cursor-ew-resize">
              <div className="glass rounded-3xl overflow-hidden aspect-video">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <motion.div 
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 opacity-0 transition-opacity flex items-center justify-center backdrop-blur-sm"
              >
                 <div className="text-center p-8">
                   <img src={project.wireframe} alt="Wireframe" className="max-w-[200px] rounded-lg opacity-40 mix-blend-screen" />
                   <p className="text-sm mt-4 font-mono">Structural Logic</p>
                 </div>
              </motion.div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {[1, 2, 3, 4].map((i) => (
             <ScrollRevealBox key={i} index={i} color={project.color} />
           ))}
        </div>
      </div>
    </section>
  );
};

const ScrollRevealBox: React.FC<ScrollRevealBoxProps> = ({ index, color }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 100 : -100, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index * 10, 0]);
  const opa = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, rotate, opacity: opa }}
      className={`glass h-40 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center border-dashed border-white/5`}
    >
      <div className="opacity-10 text-4xl font-bold font-mono">0{index}</div>
    </motion.div>
  );
}
