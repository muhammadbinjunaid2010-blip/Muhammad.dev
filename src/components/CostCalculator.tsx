import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  
  const [businessType, setBusinessType] = useState<BusinessType>('Tech & Innovation');
  const [city, setCity] = useState<City>('Sydney');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

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

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-[#050508] overflow-y-auto selection:bg-blue-200">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-6 py-10"
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
              <h1 className="text-2xl font-black uppercase tracking-tighter dark:text-white">Estimator</h1>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Version 2.0 AUD</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTheme}
              className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-600 dark:text-white/60 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button 
              onClick={resetAll}
              className={`p-4 rounded-2xl transition-all cursor-pointer ${hasSelections ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'opacity-20 cursor-not-allowed bg-slate-100 dark:bg-white/5 text-slate-400'}`}
              disabled={!hasSelections}
            >
              <Trash2 size={20} />
            </button>

            <div className="w-[1px] h-10 bg-slate-200 dark:bg-white/10 mx-2" />

            <button 
              onClick={onClose}
              className="p-4 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors text-slate-400 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            {/* Context Dropdowns */}
            <section className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 font-black">Business Industry</label>
                <div className="relative group">
                  <select 
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                    className="w-full appearance-none bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[28px] px-8 py-5 font-black uppercase tracking-widest text-xs dark:text-white outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {BUSINESS_TYPES.map(t => <option key={t} value={t} className="bg-white dark:bg-slate-900">{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" size={20} />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 font-black">Primary Region</label>
                <div className="relative group">
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value as City)}
                    className="w-full appearance-none bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[28px] px-8 py-5 font-black uppercase tracking-widest text-xs dark:text-white outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {CITIES.map(c => <option key={c} value={c} className="bg-white dark:bg-slate-900 text-black dark:text-white">{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" size={20} />
                </div>
              </div>
            </section>

            {/* Dynamic Architecture */}
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <Layout className="text-blue-600" size={28} />
                <h3 className="text-2xl font-black uppercase tracking-tighter dark:text-white">Site Architecture</h3>
              </div>

              <div className="space-y-4">
                {/* Fixed Home */}
                <div className="p-8 bg-slate-100 dark:bg-white/5 rounded-[40px] flex items-center justify-between border-2 border-transparent">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                      <Check size={24} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight dark:text-white">Home / Landing</h4>
                      <p className="text-sm text-slate-500 font-medium italic">Primary conversion engine and brand hub</p>
                    </div>
                  </div>
                  <div className="text-sm font-mono font-black text-slate-400 uppercase tracking-widest">Mandatory</div>
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
                        className="p-8 bg-white dark:bg-white/2 border border-blue-500/20 rounded-[40px] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                            <Layout size={20} />
                          </div>
                          <div>
                            <h4 className="text-lg font-black uppercase tracking-tight dark:text-white">{pageName}</h4>
                            <p className="text-sm text-slate-500 font-medium italic">{page.description}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemovePage(pageName)}
                          className="p-3 hover:bg-red-500/10 text-slate-300 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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
                    className="w-full appearance-none bg-slate-50 dark:bg-white/2 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[40px] px-10 py-8 font-black uppercase tracking-widest text-xs text-slate-400 outline-none hover:border-blue-500/50 hover:bg-slate-100/50 transition-all cursor-pointer text-center"
                  >
                    <option value="">+ ADD A CUSTOM PAGE MODULE</option>
                    {PAGE_OPTIONS.filter(p => !selectedPages.includes(p.name)).map(p => (
                      <option key={p.name} value={p.name} className="py-2">{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Dynamic Features */}
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <Sparkles className="text-blue-600" size={28} />
                <h3 className="text-2xl font-black uppercase tracking-tighter dark:text-white">Advanced Logic</h3>
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
                        className="p-8 bg-blue-600/5 dark:bg-white/2 border border-blue-600/30 rounded-[40px] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                            <Sparkles size={20} />
                          </div>
                          <div>
                            <h4 className="text-lg font-black uppercase tracking-tight dark:text-white">{feat.name}</h4>
                            <p className="text-sm text-slate-500 font-medium italic">{feat.description}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveFeature(featId)}
                          className="p-3 hover:bg-red-500/10 text-slate-300 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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
                    className="w-full appearance-none bg-slate-50 dark:bg-white/2 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[40px] px-10 py-8 font-black uppercase tracking-widest text-xs text-slate-400 outline-none hover:border-blue-500/50 hover:bg-slate-100/50 transition-all cursor-pointer text-center"
                  >
                    <option value="">+ INTEGRATE AN ADVANCED FEATURE</option>
                    {FEATURE_OPTIONS.filter(f => !selectedFeatures.includes(f.id)).map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Engagement Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-10 h-fit">
            <div className="bg-slate-100 dark:bg-white/5 rounded-[48px] p-10 border border-slate-200 dark:border-white/10 shadow-2xl">
              <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-slate-400 mb-10 font-black">Investment Ledger</h3>
              
              <div className="space-y-6 mb-10 pb-10 border-b border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium uppercase tracking-tight">Core Architecture</span>
                  <span className="font-mono font-bold dark:text-white">AUD {totals.home}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium uppercase tracking-tight">Enterprise Hosting</span>
                  <span className="font-mono font-bold dark:text-white">AUD {totals.hosting}</span>
                </div>
                {selectedPages.length > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium uppercase tracking-tight">{selectedPages.length} Modules</span>
                    <span className="font-mono font-bold dark:text-white">AUD {totals.pages}</span>
                  </div>
                )}
                {selectedFeatures.length > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium uppercase tracking-tight">Adv. Features</span>
                    <span className="font-mono font-bold dark:text-white">AUD {totals.features}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-10 px-2 text-right">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span className="uppercase tracking-widest">Gross Subtotal</span>
                  <span className="font-mono font-black">AUD {totals.subtotal}</span>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="COUPON"
                    className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none text-[10px] font-mono tracking-widest dark:text-white focus:border-blue-500/50"
                  />
                  <button 
                    onClick={() => { if(discountCode === "PERTH20") setAppliedDiscount(0.2); }}
                    className="px-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {totals.isHostingFree && (
                  <div className="flex justify-between items-center text-[#10b981]">
                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
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

              <div className="text-center space-y-2 mb-10">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-black">Engagement Value</p>
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <span className="text-xs font-mono font-black opacity-50">AUD</span>
                  <p className="text-4xl font-black tracking-tighter leading-none">
                    {totals.total}
                  </p>
                </div>
              </div>

              <button className="w-full py-5 bg-blue-600 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
                Confirm Proposal
              </button>

              <p className="mt-8 text-[9px] font-mono text-slate-400 uppercase text-center leading-relaxed tracking-wider">
                * estimates reflect architectural complexity. final quote subject to content review.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
