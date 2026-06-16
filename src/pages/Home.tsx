import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Cpu, Database, Palette, Sparkles as SparklesIcon } from 'lucide-react';
import * as d3 from 'd3';

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

interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  group: 'frontend' | 'backend' | 'intelligence' | 'core';
  description: string;
  rating: string;
  color: string;
  textColor: string;
  radius: number;
}

interface SkillLink extends d3.SimulationLinkDatum<SkillNode> {
  source: string | SkillNode;
  target: string | SkillNode;
  value: number;
}

const initialNodes: SkillNode[] = [
  { id: '1', name: 'React', group: 'frontend', description: 'Architecting scalable, state-driven user interfaces using modern functional components, hooks, handles, and concurrent render patterns.', rating: '95%', color: '#61dafb', textColor: '#00d8ff', radius: 45 },
  { id: '2', name: 'Tailwind CSS', group: 'frontend', description: 'Crafting highly responsive spacing hierarchies, bespoke visual token structures, and high-velocity layout setups without excess asset bloat.', rating: '98%', color: '#38bdf8', textColor: '#38bdf8', radius: 38 },
  { id: '3', name: 'AI Integration', group: 'intelligence', description: 'Designing secure, low-latency API proxy structures, LLM response streams, and recursive multi-agent background solvers.', rating: '90%', color: '#2563eb', textColor: '#60a5fa', radius: 42 },
  { id: '4', name: 'JavaScript', group: 'core', description: 'Harnessing the speed of modern Web API event loops, asynchronous macro/micro-task queues, and robust engine architectures.', rating: '95%', color: '#eab308', textColor: '#fef08a', radius: 34 },
  { id: '5', name: 'TypeScript', group: 'core', description: 'Guarding compilation stability, structure consistency, and clear interface targets across large structural team codebases.', rating: '92%', color: '#3178c6', textColor: '#93c5fd', radius: 36 },
  { id: '6', name: 'Node.js', group: 'backend', description: 'Powering high-capacity custom express servers, ESM-compatible paths bundling, and reliable asynchronous file streams.', rating: '88%', color: '#22c55e', textColor: '#86efac', radius: 35 },
  { id: '7', name: 'Firebase', group: 'backend', description: 'Integrating Firestore reactive query streaming subscriptions, robust cloud storage, and client analytics tracking.', rating: '85%', color: '#f59e0b', textColor: '#fde047', radius: 34 },
  { id: '8', name: 'D3.js', group: 'intelligence', description: 'Sculpting gorgeous interactive vector maps, complex custom charts, and force-directed mathematical simulations.', rating: '82%', color: '#f97316', textColor: '#fdba74', radius: 35 }
];

const initialLinks: { source: string; target: string; value: number }[] = [
  { source: '4', target: '5', value: 2 }, // JS to TS
  { source: '5', target: '1', value: 2 }, // TS to React
  { source: '1', target: '2', value: 1 }, // React to Tailwind
  { source: '1', target: '8', value: 2 }, // React to D3
  { source: '1', target: '3', value: 3 }, // React to AI
  { source: '3', target: '6', value: 2 }, // AI to Node
  { source: '6', target: '4', value: 1 }, // Node to JS
  { source: '6', target: '7', value: 2 }  // Node to Firebase
];

function ArsenalGrid() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('1');
  const svgRef = React.useRef<SVGSVGElement>(null);
  
  const activeSkill = initialNodes.find(n => n.id === selectedNodeId) || initialNodes[0];

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous runs to avoid duplication
    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll('*').remove();

    const width = 800;
    const height = 500;

    // Deep copy data for D3 use
    const nodes: SkillNode[] = initialNodes.map(n => ({ ...n }));
    const links: SkillLink[] = initialLinks.map(l => ({
      source: l.source,
      target: l.target,
      value: l.value
    }));

    // Setup force simulation
    const simulation = d3.forceSimulation<SkillNode>(nodes)
      .force('link', d3.forceLink<SkillNode, SkillLink>(links)
        .id(d => d.id)
        .distance(120)
      )
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<SkillNode>().radius(d => d.radius + 14));

    // Draw links
    const link = svgElement.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.08)')
      .attr('stroke-width', d => Math.max(1.5, d.value * 1.5))
      .attr('stroke-dasharray', d => d.value > 2 ? '4,4' : 'none');

    // Draw node groups
    const node = svgElement.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group cursor-pointer')
      .on('click', (event, d) => {
        setSelectedNodeId(d.id);
        // Gentle kinetic resonance bounce
        simulation.alphaTarget(0.12).restart();
        setTimeout(() => simulation.alphaTarget(0), 400);
      });

    // Outer orbiting selection track
    node.append('circle')
      .attr('r', d => d.radius + 8)
      .attr('fill', 'transparent')
      .attr('stroke', d => d.color)
      .attr('stroke-width', d => d.id === selectedNodeId ? 2 : 0)
      .attr('stroke-opacity', 0.45)
      .attr('stroke-dasharray', '5,3')
      .attr('style', 'transform-origin: center;');

    // Main brand node
    node.append('circle')
      .attr('r', d => d.id === selectedNodeId ? d.radius + 4 : d.radius)
      .attr('fill', d => document.documentElement.classList.contains('dark') ? '#0b0f19' : '#1e293b')
      .attr('stroke', d => d.color)
      .attr('stroke-width', d => d.id === selectedNodeId ? 3.5 : 1.5)
      .attr('style', 'transition: r 0.3s ease, stroke-width 0.3s ease;')
      .style('filter', d => d.id === selectedNodeId ? `drop-shadow(0 0 12px ${d.color}35)` : 'none');

    // Energy core badge offset
    node.append('circle')
      .attr('cx', 0)
      .attr('cy', d => d.id === selectedNodeId ? -(d.radius + 4) : -d.radius)
      .attr('r', 4.5)
      .attr('fill', d => d.color);

    // Node Name Tag
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', d => d.textColor)
      .attr('font-size', d => d.id === selectedNodeId ? '11px' : '9px')
      .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .attr('font-weight', 'bold')
      .attr('style', 'pointer-events: none; transition: font-size 0.3s ease;');

    // Drag constraints binding
    const drag = d3.drag<SVGGElement, SkillNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.25).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Force step tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as SkillNode).x!)
        .attr('y1', d => (d.source as SkillNode).y!)
        .attr('x2', d => (d.target as SkillNode).x!)
        .attr('y2', d => (d.target as SkillNode).y!);

      node.attr('transform', d => `translate(${d.x!}, ${d.y!})`);
    });

    return () => {
      simulation.stop();
    };
  }, [selectedNodeId]);

  return (
    <section className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.3em] mb-2">Technical Core</h2>
          <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white">My Arsenal</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">Active</div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-gray-500">Skill Graph Simulation</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive D3 canvas frame */}
        <div className="lg:col-span-7 xl:col-span-8 glass rounded-[36px] overflow-hidden bg-slate-100/5 dark:bg-[#07070a]/40 border border-slate-200/40 dark:border-white/5 relative min-h-[350px] sm:min-h-[420px] lg:min-h-[500px] flex items-center justify-center">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-white/30 uppercase">Interactive D3 Network</span>
          </div>
          
          <div className="absolute top-4 right-6 text-[8px] font-mono text-slate-500 dark:text-white/20 uppercase">
            Drag bubbles to disrupt forces • Tap to inspect
          </div>

          <svg 
            ref={svgRef} 
            viewBox="0 0 800 500" 
            className="w-full h-full max-h-[500px]"
          />
        </div>

        {/* Dynamic description info card sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-[36px] glass bg-white dark:bg-[#0d0d12] border border-slate-200/50 dark:border-white/5 shadow-2xl relative min-h-[340px]">
          
          <div className="absolute top-0 right-10 w-px h-full bg-slate-100 dark:bg-white/5 pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-blue-500 font-bold block mb-1">
                  Category: {activeSkill.group}
                </span>
                <h4 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {activeSkill.name}
                </h4>
              </div>
              
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner"
                style={{ backgroundColor: `${activeSkill.color}20`, border: `1.5px solid ${activeSkill.color}`, color: activeSkill.color }}
              >
                ⚡
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-gray-400 font-medium dark:font-normal leading-relaxed">
              {activeSkill.description}
            </p>

            {/* Proficiency visual gauge */}
            <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-500">
                  <span>Knowledge Depth</span>
                  <span className="font-bold text-slate-800 dark:text-white">{activeSkill.rating}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-[1px] border border-slate-200/20 dark:border-white/15">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: activeSkill.rating }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: activeSkill.color }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50/50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                  <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-wider mb-1">Status Target</span>
                  <span className="text-xs font-bold font-mono text-slate-800 dark:text-white">PRODUCTION-READY</span>
                </div>
                <div className="bg-slate-50/50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                  <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-wider mb-1">Scale Tier</span>
                  <span className="text-xs font-bold font-mono text-slate-800 dark:text-white">ENTERPRISE CLOUD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 dark:border-white/5 text-[10px] font-mono text-slate-400 dark:text-white/20 flex items-center justify-between">
            <span>D3 Simulator Active</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              60 FPS LOCAL
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState<any[]>([
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
      preview: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=1200&auto=format&fit=crop',
      liveLink: 'https://palo-drivethru.vercel.app'
    },
    { 
      id: 4, 
      name: 'Jays Roofing', 
      desc: 'A premium digital branding portal for elite roofing craftsmen in Melton, Victoria. Engineered for resilience and sharp architectural display.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      preview: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      liveLink: 'https://jays-roofing.vercel.app'
    },
    { 
      id: 5, 
      name: 'Melton Barber House', 
      desc: 'A premium grooming sanctuary set in Melton, Victoria. Integrating anatomical hair diagnostics, dedicated schedule buffers, and luxury hospitality.',
      img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1600&auto=format&fit=crop',
      preview: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1600&auto=format&fit=crop',
      liveLink: 'https://melton-barber-house.vercel.app/'
    }
  ]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Fallback logic active');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((proj, idx) => ({
            ...proj,
            id: typeof proj.id === 'number' ? proj.id : (idx + 1),
            name: proj.name || proj.title,
            img: proj.img || proj.image,
            preview: proj.preview || proj.wireframe,
            desc: proj.desc || proj.tagline
          }));
          setProjectsList(mapped);
        }
      })
      .catch(err => {
        console.log('Using local featured list', err);
      });
  }, []);

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsList.map((project, index) => (
          <div key={project.id} className={index === 4 ? "md:col-span-2" : ""}>
            <ProjectCard project={project} isLarge={index === 4} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, isLarge }: { project: any; isLarge?: boolean; key?: React.Key }) {
  const navigate = useNavigate();
  const [trail, setTrail] = useState<{ x: number; y: number; time: number; id: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [lastUserInteraction, setLastUserInteraction] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    setLastUserInteraction(Date.now());
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

  const handleTouch = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    setIsTouchDevice(true);
    setLastUserInteraction(Date.now());
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    const newPoint = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      time: Date.now(),
      id: Math.random(),
    };
    
    setTrail(prev => {
      const last = prev[prev.length - 1];
      if (last && Math.abs(last.x - newPoint.x) < 3 && Math.abs(last.y - newPoint.y) < 3) return prev;
      return [...prev, newPoint].slice(-120);
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

  // Ambient Sweep effect for touch devices so they get free, elegant visual peek action
  useEffect(() => {
    if (!isTouchDevice) return;
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastUserInteraction < 2000) return; // Wait 2 seconds after user touch
      
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const timeFactor = now / 1500;
      // Gentle floating sine sweep coordinates
      const x = rect.width / 2 + Math.cos(timeFactor) * (rect.width * 0.35);
      const y = rect.height / 2 + Math.sin(timeFactor * 1.5) * (rect.height * 0.25);
      
      setTrail(prev => {
        const filtered = prev.filter(p => now - p.time < 2400);
        return [...filtered, { x, y, time: now, id: Math.random() }].slice(-120);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isTouchDevice, lastUserInteraction]);

  const maskImage = trail.length > 0 
    ? trail.map((p) => {
        const age = Date.now() - p.time;
        const progress = Math.max(0, 1 - age / 2400);
        const radius = (isTouchDevice ? 150 : 120) * progress;
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
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/work#project-${project.id}`)}
      className={`group relative ${isLarge ? 'h-[320px] sm:h-[380px] md:h-[400px]' : 'h-[400px] sm:h-[500px]'} rounded-[40px] overflow-hidden glass hover:border-blue-500/50 transition-all duration-700 cursor-pointer`}
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
        <p className={`text-gray-200 dark:text-gray-300 text-sm ${isLarge ? 'max-w-2xl' : 'max-w-xs'} leading-relaxed font-medium dark:font-normal drop-shadow-sm`}>{project.desc}</p>
        <div className="pt-4 flex gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors">
            View Project <span className="text-blue-500">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
