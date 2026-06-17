import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Showcase = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            A Dashboard Built for <span className="text-brand-primary">Speed</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Everything you need is just a click away. No clutter, no distractions, just a beautiful workspace for your team.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Dashboard Image / Representation */}
          <div className="rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-brand-primary/90 text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-purple">
                <Play className="w-8 h-8 ml-2" />
              </button>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1200" 
              alt="Dashboard Preview" 
              className="w-full h-auto object-cover opacity-80"
            />
            
            {/* Overlay UI elements to make it look like a chat app */}
            <div className="absolute top-0 left-0 w-64 h-full bg-bg-secondary/90 border-r border-white/10 p-4 hidden md:block">
              <div className="h-8 w-full bg-white/10 rounded mb-8" />
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                    <div className="h-2 w-full bg-white/20 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
