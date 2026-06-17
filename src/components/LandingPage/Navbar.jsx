import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.getElementById('root')?.scrollTop || 0;
      setScrolled(scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    const rootEl = document.getElementById('root');
    if (rootEl) rootEl.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rootEl) rootEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-indigo flex items-center justify-center shadow-purple-sm">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              NexChat
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#ai" className="text-gray-300 hover:text-white transition-colors">AI Assistant</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Log in</Link>
            <Link
              to="/admin-login"
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Admin
            </Link>
            <Link to="/signup" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-indigo text-white font-medium hover:shadow-purple-sm transition-all duration-300 hover:scale-105">
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-bg-card border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#ai" className="block px-3 py-2 text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>AI Assistant</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/login" className="block w-full text-center px-3 py-2 text-gray-300 hover:text-white">Log in</Link>
              <Link to="/admin-login" className="block w-full text-center px-3 py-2 text-amber-400 hover:text-amber-300 font-medium text-sm">🛡 Admin Login</Link>
              <Link to="/signup" className="block w-full text-center px-3 py-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-indigo text-white font-medium">
                Get Started Free
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
