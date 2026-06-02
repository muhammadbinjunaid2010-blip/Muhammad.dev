import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  X, 
  Plus, 
  Trash2, 
  Layout, 
  Sparkles, 
  Check, 
  Tag, 
  Sun, 
  Moon, 
  ChevronDown
} from 'lucide-react';

type City = 'Sydney' | 'Melbourne' | 'Perth' | 'Brisbane' | 'Adelaide';
type BusinessType = 'Hospitality / Cafe' | 'Trade / Plumbing' | 'Tech & Innovation' | 'Retail & Commerce' | 'Creative Agency' | 'Corporate / Professional' | 'Health & Wellness' | 'Other';

interface Feature {
  id: string;
  name: string;
  costAUD: number;
  description: string;
}

const BUSINESS_TYPES: BusinessType[] = [
  'Hospitality / Cafe', 'Trade / Plumbing', 'Tech & Innovation', 'Retail & Commerce', 
  'Creative Agency', 'Corporate / Professional', 'Health & Wellness', 'Other'
];

const CITIES: City[] = ['Sydney', 'Melbourne', 'Perth', 'Brisbane', 'Adelaide'];

const PAGE_OPTIONS = [
  { name: 'Contact', description: 'Lead capture and location map integration' },
  { name: 'Blogs', description: 'Content engine with SEO optimized structure' },
  { name: 'About', description: 'Brand story and team profiles' },
  { name: 'Services', description: 'Deep dive into your core offerings' },
  { name: 'Order/Booking', description: 'Transactional flow for services' },
  { name: 'Gallery', description: 'High-performance visual showcase' },
  { name: 'FAQ', description: 'Interactive knowledge base' },
  { name: 'Testimonials', description: 'Social proof and review aggregation' },
  { name: 'Portfolio', description: 'Detailed project case studies' },
  { name: 'Privacy/Terms', description: 'Essential legal compliance layers' }
];

const FEATURE_OPTIONS: Feature[] = [
  { id: 'chatbot', name: 'AI Chatbot', costAUD: 180, description: '24/7 automated customer interaction' },
  { id: 'ecommerce', name: 'E-commerce', costAUD: 350, description: 'Full cart and secure payment processing' },
  { id: 'seo', name: 'Elite SEO', costAUD: 120, description: 'Search engine dominant optimization' },
  { id: 'auth', name: 'Member Portal', costAUD: 220, description: 'Secure user login and dashboard' },
  { id: 'crm', name: 'CRM Connect', costAUD: 200, description: 'Direct sync with SalesForce/Hubspot' },
  { id: 'multilang', name: 'Global Suite', costAUD: 150, description: 'Multi-lingual adaptive interface' }
];

export default function CostCalculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const setContainerRef = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    setIsHydrated(!!el);
  };
  
  const { scrollYProgress } = useScroll({
    container: isHydrated ? containerRef : undefined
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  
  const [businessType, setBusinessType] = useState<BusinessType>('Tech & Innovation');
  const [city, setCity] = useState<City>('Sydney');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddPage = (name: string) => {
    if (name && !selectedPages.includes(name)) {
      setSelectedPages([...selectedPages, name]);
    }
  };

  const handleRemovePage = (name: string) => {
    setSelectedPages(selectedPages.filter(p => p !== name));
  };

  const handleAddFeature = (id: string) => {
    if (id && !selectedFeatures.includes(id)) {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const handleRemoveFeature = (id: string) => {
    setSelectedFeatures(selectedFeatures.filter(f => f !== id));
  };

  const resetAll = () => {
    setSelectedPages([]);
    setSelectedFeatures([]);
    setDiscountCode('');
    setAppliedDiscount(0);
  };

  const totals = useMemo(() => {
    const homeCost = 300;
    const hostingCost = 150;
    const pagesCost = selectedPages.length * 200;
    const featuresCost = selectedFeatures.reduce((acc, id) => {
      const feat = FEATURE_OPTIONS.find(f => f.id === id);
      return acc + (feat?.costAUD || 0);
    }, 0);

    const projectInvestment = homeCost + pagesCost + featuresCost;
    const isHostingFree = projectInvestment >= 1000;
    const discountAmount = projectInvestment * appliedDiscount;
    const hostingCreditValue = isHostingFree ? hostingCost : 0;
    const total = projectInvestment + hostingCost - discountAmount - hostingCreditValue;

    return {
      home: homeCost,
      hosting: hostingCost,
      pages: pagesCost,
      features: featuresCost,
      subtotal: projectInvestment + hostingCost,
      discount: Math.round(discountAmount),
      hostingCredit: hostingCreditValue,
      total: Math.round(total),
      isHostingFree
    };
  }, [selectedPages, selectedFeatures, appliedDiscount]);

  const hasSelections = selectedPages.length > 0 || selectedFeatures.length > 0;

  if (!isOpen) return null;

  const showCartBar = selectedPages.length > 0 || selectedFeatures.length > 0;

  return (
    <div 
      ref={setContainerRef}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100] bg-slate-50 dark:bg-[#050508] overflow-y-auto selection:bg-blue-200 scroll-smooth text-slate-900 dark:text-white"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[110]"
        style={{ scaleX }}
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-6 py-10"
      >
        {/* Universal Header */}
        <div className="flex items-center justify-between mb-16 px-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { onClose(); }}
              className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform cursor-pointer"
            >
              <span className="text-xl font-black italic">M</span>
            </button>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Estimator</h1>
              <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Version 2.0 AUD</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTheme}
              className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button 
              onClick={resetAll}
              className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm ${hasSelections ? 'bg-red-50 border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' : 'opacity-20 cursor-not-allowed bg-white border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-400'}`}
              disabled={!hasSelections}
            >
              <Trash2 size={20} />
            </button>

            <div className="w-[1px] h-10 bg-slate-200 dark:bg-white/10 mx-2" />

            <button 
              onClick={onClose}
              className="p-4 hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 rounded-2xl transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              aria-label="Close Estimator"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-16 pb-40">
          {/* Context Dropdowns */}
          <section className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 font-black">Business Industry</label>
              <div className="relative group">
                <select 
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full appearance-none bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[28px] px-8 py-5 font-black uppercase tracking-widest text-xs text-slate-800 dark:text-white outline-none focus:border-blue-500 transition-all cursor-pointer shadow-sm"
                >
                  {BUSINESS_TYPES.map(t => <option key={t} value={t} className="bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-white">{t}</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 font-black">Primary Region</label>
              <div className="relative group">
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value as City)}
                  className="w-full appearance-none bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[28px] px-8 py-5 font-black uppercase tracking-widest text-xs text-slate-800 dark:text-white outline-none focus:border-blue-500 transition-all cursor-pointer shadow-sm"
                >
                  {CITIES.map(c => <option key={c} value={c} className="bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-white">{c}</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" size={20} />
              </div>
            </div>
          </section>

          {/* Dynamic Architecture */}
          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <Layout className="text-blue-600" size={28} />
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Site Architecture</h3>
            </div>

            <div className="space-y-4">
              {/* Fixed Home */}
              <div className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                    <Check size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Home / Landing</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">Primary conversion engine and brand hub</p>
                  </div>
                </div>
                <div className="text-sm font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mandatory</div>
              </div>

              {/* Selected Custom Pages */}
              <AnimatePresence mode="popLayout">
                {selectedPages.map(pageName => {
                  const page = PAGE_OPTIONS.find(p => p.name === pageName)!;
                  return (
                    <motion.div 
                      key={pageName}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30 rounded-[40px] flex items-center justify-between shadow-sm group transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-500/10">
                          <Layout size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">{pageName}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">{page.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemovePage(pageName)}
                        className="p-3 bg-slate-50 hover:bg-red-500/10 dark:bg-transparent text-slate-400 hover:text-red-500 rounded-xl transition-all opacity-100 md:opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label={`Remove ${pageName}`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Add Page Dropdown */}
              <div className="relative group">
                <select 
                  value=""
                  onChange={(e) => { if(e.target.value) handleAddPage(e.target.value); }}
                  className="w-full appearance-none bg-white dark:bg-white/2 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-[40px] px-10 py-8 font-black uppercase tracking-widest text-xs text-slate-500 dark:text-slate-400 outline-none hover:border-blue-500/50 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all cursor-pointer text-center"
                >
                  <option value="" className="bg-white dark:bg-[#0a0a0f] text-slate-500 dark:text-slate-400">+ ADD A CUSTOM PAGE MODULE</option>
                  {PAGE_OPTIONS.filter(p => !selectedPages.includes(p.name)).map(p => (
                    <option key={p.name} value={p.name} className="py-2 bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-white">{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Dynamic Features */}
          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <Sparkles className="text-blue-600" size={28} />
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Advanced Logic</h3>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {selectedFeatures.map(featId => {
                  const feat = FEATURE_OPTIONS.find(f => f.id === featId)!;
                  return (
                    <motion.div 
                      key={featId}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-8 bg-blue-50/30 dark:bg-blue-600/5 border border-blue-600/20 rounded-[40px] flex items-center justify-between shadow-sm group transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">{feat.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">{feat.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveFeature(featId)}
                        className="p-3 bg-slate-50 hover:bg-red-500/10 dark:bg-transparent text-slate-400 hover:text-red-500 rounded-xl transition-all opacity-100 md:opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label={`Remove ${feat.name}`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <div className="relative group">
                <select 
                  value=""
                  onChange={(e) => { if(e.target.value) handleAddFeature(e.target.value); }}
                  className="w-full appearance-none bg-white dark:bg-white/2 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-[40px] px-10 py-8 font-black uppercase tracking-widest text-xs text-slate-500 dark:text-slate-400 outline-none hover:border-blue-500/50 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all cursor-pointer text-center"
                >
                  <option value="" className="bg-white dark:bg-[#0a0a0f] text-slate-500 dark:text-slate-400">+ INTEGRATE AN ADVANCED FEATURE</option>
                  {FEATURE_OPTIONS.filter(f => !selectedFeatures.includes(f.id)).map(f => (
                    <option key={f.id} value={f.id} className="bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-white">{f.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        </div>
      </motion.div>

      {/* Floating Bottom Cart Bar */}
      <AnimatePresence>
        {showCartBar && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-slate-900/95 dark:bg-[#12121e]/95 backdrop-blur-md border border-white/10 rounded-3xl md:rounded-[36px] p-5 md:p-6 shadow-2xl z-[115] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-6 text-white w-full sm:w-auto">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] font-bold">Estimated Cost</span>
                <div className="flex items-baseline gap-1.5 text-blue-400 font-black text-2xl md:text-3.5xl">
                  <span className="text-xs font-mono font-black opacity-60 text-slate-300">AUD</span>
                  <span>${totals.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-white/15 hidden sm:block" />
              <div className="hidden sm:flex flex-col">
                <span className="text-[9px] font-mono text-slate-300 uppercase tracking-widest font-black">Structure Appended</span>
                <p className="text-xs text-slate-400 font-medium italic">
                  {selectedPages.length} {selectedPages.length === 1 ? 'Page' : 'Pages'} + {selectedFeatures.length} {selectedFeatures.length === 1 ? 'Feature' : 'Features'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button 
                onClick={() => setIsLedgerOpen(true)}
                className="flex-1 sm:flex-initial px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-2xl cursor-pointer transition-colors whitespace-nowrap"
              >
                View Ledger
              </button>
              <button
                onClick={() => {
                  setIsLedgerOpen(true);
                  setIsSubmitted(true);
                }}
                className="flex-1 sm:flex-initial px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl cursor-pointer shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                Confirm Proposal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Drawer for Investment Ledger */}
      <AnimatePresence>
        {isLedgerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsLedgerOpen(false);
                setIsSubmitted(false);
              }}
              className="fixed inset-0 bg-black/80 z-[120] backdrop-blur-sm"
            />

            {/* Drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 180 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#0c0c12] border-l border-slate-200 dark:border-white/10 z-[130] overflow-y-auto shadow-2xl p-8 md:p-10 flex flex-col justify-between"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center my-auto text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/5">
                    <Check size={36} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Estimate Locked!</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                      Your custom <span className="font-bold text-slate-950 dark:text-white">AUD ${totals.total.toLocaleString()}</span> proposal configuration has been saved. We will review the details shortly!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsLedgerOpen(false);
                      onClose();
                    }}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Return to Projects
                  </button>
                </motion.div>
              ) : (
                <>
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-secondary/10 dark:border-white/10 mb-8">
                      <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                        <Tag className="text-blue-600 animate-pulse" size={20} />
                        Investment Ledger
                      </h3>
                      <button 
                        onClick={() => setIsLedgerOpen(false)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                        aria-label="Close Drawer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6 font-black">Calculation Breakdown</h4>
                    
                    <div className="space-y-6 mb-10 pb-10 border-b border-slate-200 dark:border-white/10">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tight">Core Architecture</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">AUD {totals.home}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tight">Enterprise Hosting</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">AUD {totals.hosting}</span>
                      </div>
                      {selectedPages.length > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tight">{selectedPages.length} Modules</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">AUD {totals.pages}</span>
                        </div>
                      )}
                      {selectedFeatures.length > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tight">Adv. Features</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">AUD {totals.features}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 mb-10 text-right">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mb-1">
                        <span>Gross Subtotal</span>
                        <span className="font-mono">AUD {totals.subtotal}</span>
                      </div>

                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                          placeholder="COUPON (e.g. PERTH20)"
                          className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none text-[10px] font-mono tracking-widest text-slate-900 dark:text-white focus:border-blue-500/50 focus:bg-white transition-all shadow-inner"
                        />
                        <button 
                          onClick={() => { if(discountCode === "PERTH20") setAppliedDiscount(0.2); }}
                          className="px-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase rounded-xl cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors border border-transparent shadow"
                        >
                          Apply
                        </button>
                      </div>

                      {totals.isHostingFree && (
                        <div className="flex justify-between items-center text-[#10b981]">
                          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
                            Free Hosting
                          </span>
                          <span className="font-mono font-black">-AUD {totals.hostingCredit}</span>
                        </div>
                      )}

                      {appliedDiscount > 0 && (
                        <div className="flex justify-between items-center text-[#10b981]">
                          <span className="text-[10px] font-black uppercase tracking-widest">Code Applied (20%)</span>
                          <span className="font-mono font-black">-AUD {totals.discount}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-white/10 mt-auto">
                    <div className="text-center space-y-2">
                      <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] font-black">Engagement Value</p>
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <span className="text-xs font-mono font-black opacity-50">AUD</span>
                        <p className="text-4xl font-black tracking-tighter leading-none">
                          {totals.total.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsSubmitted(true)}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      Confirm Proposal
                    </button>

                    <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase text-center leading-relaxed tracking-wider">
                      * estimates reflect architectural complexity. final quote subject to review.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
