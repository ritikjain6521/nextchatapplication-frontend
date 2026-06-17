import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Users, Mic, Share, Settings } from 'lucide-react';

const Calling = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-bg-card/30 border-y border-white/5">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Talk Face-to-Face <span className="text-brand-primary">Anywhere</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Experience ultra-low latency voice and video calls with HD quality, screen sharing, and noise reduction built-in.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Video Call UI Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-black/40 border border-white/10 rounded-2xl p-2 relative shadow-2xl backdrop-blur-xl"
          >
            <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center group">
              {/* Main Speaker Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                alt="Main speaker" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
              />
              
              {/* Active Speaker Info */}
              <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary p-[2px]">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Sarah Johnson</p>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" /> Speaking
                  </p>
                </div>
              </div>

              {/* Grid of other participants */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <div className="w-32 aspect-video bg-gray-800 rounded-lg border-2 border-white/10 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Participant" className="w-full h-full object-cover opacity-70" />
                  <div className="absolute bottom-1 left-1 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">Michael</div>
                </div>
                <div className="w-32 aspect-video bg-gray-800 rounded-lg border-2 border-brand-primary overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" alt="You" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute bottom-1 left-1 bg-brand-primary px-2 py-0.5 rounded text-[10px] text-white">You</div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <Share className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                  <Phone className="w-5 h-5 rotate-[135deg]" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Features Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">HD Quality</h3>
              <p className="text-gray-400 text-sm">Experience 1080p crystal-clear video with adaptive bitrate streaming for any network.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Noise Reduction</h3>
              <p className="text-gray-400 text-sm">AI-powered background noise cancellation ensures your voice is always heard clearly.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Share className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Screen Sharing</h3>
              <p className="text-gray-400 text-sm">Share your entire screen, specific windows, or tabs with a single click during any call.</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calling;
