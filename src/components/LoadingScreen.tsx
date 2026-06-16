import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const statusLogs = [
  'Loading featured projects...',
  'Presenting UI experiments...',
  'Resolving creative coordinates...',
  'Polishing structural layouts...',
  'Synchronizing digital assets...'
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Smooth random progression steps
        const leap = Math.floor(Math.random() * 8) + 4;
        const next = prevProgress + leap;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setLogIndex(statusLogs.length - 1);
      const exitTimeout = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(exitTimeout);
    }

    const currentIdx = Math.min(
      Math.floor((progress / 100) * statusLogs.length),
      statusLogs.length - 1
    );
    setLogIndex(currentIdx);
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center p-6 text-slate-100 overflow-hidden select-none"
    >
      <div className="w-64 space-y-4 flex flex-col items-center">
        {/* Rotating label list */}
        <div className="h-6 flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={logIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-xs font-mono tracking-widest uppercase text-slate-300 font-bold"
            >
              {statusLogs[logIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Minimal thin progress bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-blue-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Small percentage reader */}
        <span className="text-[10px] font-mono tracking-widest text-slate-500 font-medium">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
