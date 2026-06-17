import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-bg-card border-t border-white/5">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden shadow-2xl"
          >
            {/* Decorative animated elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-brand-primary to-brand-indigo rounded-full blur-[80px] opacity-40 pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-pink-500 to-brand-secondary rounded-full blur-[80px] opacity-30 pointer-events-none"
            />

            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 relative z-10">
              Ready to Start <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-pink-500">Chatting?</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10">
              Join thousands of users already using NexChat to streamline their communication and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link to="/signup" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-indigo text-white font-bold text-lg shadow-purple transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Create Free Account
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </motion.button>
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 backdrop-blur-md transition-all duration-300"
              >
                Book a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Area */}
      <footer className="bg-bg-secondary pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">NexChat</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The modern platform for seamless communication, combining the best of messaging, voice, and AI tools into one unified experience.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-primary transition-all">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500 transition-all">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-sky-500 transition-all">
                  <FaTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Features</a></li>
                <li><a href="#ai" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">AI Assistant</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NexChat. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-gray-500 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 block"></span> Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
