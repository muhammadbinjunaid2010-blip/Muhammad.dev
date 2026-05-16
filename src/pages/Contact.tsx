import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, MapPin, Linkedin, Twitter, Calculator } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import CostCalculator from '../components/CostCalculator';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    objective: 'New Project',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', objective: 'New Project', message: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
      setStatus('idle');
    }
  };

  return (
    <main className="pt-32 pb-40 px-6 sm:px-12 max-w-7xl mx-auto">
      <CostCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h1 className="text-6xl sm:text-[90px] font-display font-extrabold tracking-tighter uppercase leading-[0.85] text-slate-900 dark:text-white">
              Let's build <br /> <span className="text-blue-600 italic">the future.</span>
            </h1>
            <p className="text-slate-600 dark:text-gray-400 text-xl max-w-md">
              Available for high-stakes projects, architecture consulting, and design-led engineering.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center gap-4 px-8 py-5 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20 group"
            >
              <Calculator size={20} className="group-hover:rotate-12 transition-transform" />
              Estimate Project Cost
            </motion.button>
          </motion.div>

          <div className="space-y-8">
            <a href="mailto:muhammadbinjunaid2010@gmail.com" className="flex items-center gap-6 group cursor-pointer">
              <div className="p-4 glass rounded-3xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all">
                <Mail className="text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-widest font-bold">Inquiries</p>
                <p className="text-lg font-medium break-all sm:break-normal group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">muhammadbinjunaid2010@gmail.com</p>
              </div>
            </a>
            <a href="https://wa.me/923330034535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
              <div className="p-4 glass rounded-3xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all">
                <Mail className="text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-widest font-bold">WhatsApp</p>
                <p className="text-lg font-medium group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">+923330034535</p>
              </div>
            </a>
            <div className="flex items-center gap-6 group">
              <div className="p-4 glass rounded-3xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all">
                <MapPin className="text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-widest font-bold">Base</p>
                <p className="text-lg font-medium text-slate-900 dark:text-white">The Digital Void (Remote)</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {[Linkedin, Twitter].map((Icon, i) => (
              <div key={i} className="relative group">
                <motion.button
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    const el = document.getElementById(`social-tip-${i}`);
                    if (el) {
                      el.style.opacity = '1';
                      setTimeout(() => el.style.opacity = '0', 2000);
                    }
                  }}
                  className="p-4 glass rounded-full text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
                >
                  <Icon size={20} />
                </motion.button>
                <div 
                  id={`social-tip-${i}`}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 transition-opacity pointer-events-none whitespace-nowrap"
                >
                  Under Construction
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-10 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-[#0A0A0B]/95 backdrop-blur-md z-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                >
                  <CheckCircle2 size={80} className="text-blue-500" />
                </motion.div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter">Message Transmitted</h3>
                  <p className="text-white/50 mt-2">I'll respond within 24 light-hours.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-colors uppercase font-bold tracking-widest text-[10px]"
                >
                  Send another
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 dark:text-white/40 ml-1 font-bold">Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 transition-all text-slate-900 dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 dark:text-white/40 ml-1 font-bold">Origin</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com" 
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-400 dark:text-white/40 ml-1 font-bold">Objective</label>
              <select 
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer text-slate-900 dark:text-white"
              >
                <option className="bg-white dark:bg-[#0A0A0B]">New Project</option>
                <option className="bg-white dark:bg-[#0A0A0B]">Consultation</option>
                <option className="bg-white dark:bg-[#0A0A0B]">Full-time Role</option>
                <option className="bg-white dark:bg-[#0A0A0B]">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-400 dark:text-white/40 ml-1 font-bold">Transmission</label>
              <textarea 
                required 
                rows={5} 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 transition-all resize-none text-slate-900 dark:text-white" 
              />
            </div>
            
            <button
              disabled={status === 'sending'}
              type="submit"
              className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-black font-bold rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all disabled:opacity-50 shadow-lg dark:shadow-none"
            >
              {status === 'sending' ? 'Transmitting...' : 'Send Signal'}
              <Send size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
