import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import Work from './pages/Work';
import Playground from './pages/Playground';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

import { ThemeProvider } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen transition-colors duration-500">
          <ScrollToTop />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}
