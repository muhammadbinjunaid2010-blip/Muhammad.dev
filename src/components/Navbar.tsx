import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Code2, Briefcase, Sparkles, Send, Sun, Moon } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: <Code2 size={18} /> },
  { path: '/work', label: 'Work', icon: <Briefcase size={18} /> },
  { path: '/playground', label: 'Playground', icon: <Sparkles size={18} /> },
  { path: '/contact', label: 'Contact', icon: <Send size={18} /> },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
        className="glass rounded-full px-6 py-3 flex items-center gap-6"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-2 text-sm font-medium transition-colors
              ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white/70'}
            `}
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute -inset-x-4 -inset-y-2 bg-blue-600/10 rounded-full blur-sm border border-blue-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
        
        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2" />
        
        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all overflow-hidden group border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <motion.div
            animate={{ y: theme === 'dark' ? -20 : 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col items-center gap-0"
          >
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Moon size={18} />
            </div>
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Sun size={18} />
            </div>
          </motion.div>
        </button>
      </motion.div>
    </nav>
  );
}
