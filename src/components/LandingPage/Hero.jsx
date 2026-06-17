import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShieldCheck, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-indigo/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">NexChat 2.0 is now live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Connect. Chat. <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-indigo to-purple-400">
              Collaborate. Instantly.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Experience lightning-fast messaging, crystal-clear voice & video calls, AI-powered conversations, and seamless team collaboration—all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-indigo text-white font-semibold text-lg hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              Get Started Free
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md group">
              <Play className="w-5 h-5 group-hover:text-brand-primary transition-colors" />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-400 font-medium">Trusted by 10,000+ users worldwide</p>
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', bounce: 0.3 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-white/10 bg-bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            {/* Browser Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto bg-white/5 rounded-md px-4 py-1 text-xs text-gray-400 font-mono w-64 text-center">
                app.NexChat.com
              </div>
            </div>
            {/* App Mockup Content */}
            <div className="flex h-[350px] md:h-[500px]">
              {/* Sidebar Mockup */}
              <div className="w-64 border-r border-white/10 bg-black/20 p-4 hidden md:block">
                <div className="h-8 w-full bg-white/5 rounded-md mb-6" />
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-white/10 rounded w-3/4" />
                        <div className="h-2 bg-white/5 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Main Chat Area Mockup */}
              <div className="flex-1 flex flex-col bg-black/10">
                <div className="h-16 border-b border-white/10 flex items-center px-6">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/20 mr-3" />
                  <div className="h-4 bg-white/10 rounded w-32" />
                </div>
                <div className="flex-1 p-6 space-y-6 overflow-hidden">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                    <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 w-48 sm:w-64 border border-white/10">
                      <div className="h-2 bg-white/10 rounded w-full mb-2" />
                      <div className="h-2 bg-white/10 rounded w-4/5" />
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <div className="bg-brand-primary/20 rounded-2xl rounded-tr-none p-4 w-56 sm:w-72 border border-brand-primary/30">
                      <div className="h-2 bg-brand-primary/40 rounded w-full mb-2" />
                      <div className="h-2 bg-brand-primary/40 rounded w-full mb-2" />
                      <div className="h-2 bg-brand-primary/40 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-indigo/30 flex-shrink-0" />
                    <div className="bg-gradient-to-br from-brand-indigo/10 to-brand-primary/10 rounded-2xl rounded-tl-none p-4 w-48 sm:w-56 border border-brand-indigo/20 flex items-center gap-3">
                       <Zap className="text-yellow-400 w-5 h-5" />
                       <div className="h-2 bg-white/20 rounded w-full" />
                    </div>
                  </div>
                </div>
                <div className="h-20 border-t border-white/10 p-4">
                  <div className="h-full bg-white/5 rounded-xl border border-white/10" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-1/4 bg-bg-card border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-xl hidden lg:flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
               <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">End-to-End Encrypted</p>
              <p className="text-xs text-gray-400">Secure connection</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-12 bottom-1/4 bg-bg-card border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-xl hidden lg:flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-bg-card" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 border-2 border-bg-card" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-bg-card" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">+5 Team Members</p>
              <p className="text-xs text-gray-400">Joined the workspace</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
