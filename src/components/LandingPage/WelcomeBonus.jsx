import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Phone, Video, HardDrive, Clock } from 'lucide-react';

const rewards = [
  { icon: <Sparkles className="w-6 h-6" />, title: "100 Free AI Credits", desc: "Test our smart assistant" },
  { icon: <Phone className="w-6 h-6" />, title: "30 Mins Voice", desc: "Crystal clear audio calling" },
  { icon: <Video className="w-6 h-6" />, title: "15 Mins Video", desc: "HD video meetings" },
  { icon: <HardDrive className="w-6 h-6" />, title: "500 MB Storage", desc: "Premium file sharing" },
  { icon: <Clock className="w-6 h-6" />, title: "7 Days Pro", desc: "Full feature access" }
];

const WelcomeBonus = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-violet/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-md relative overflow-hidden">
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-brand-primary/30 to-brand-violet/30 rounded-full blur-[60px]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary mb-6"
              >
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">New User Rewards</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Start Free. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-violet">Upgrade When Ready.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg mb-8 leading-relaxed"
              >
                Every new user receives free credits to explore premium features including our AI Assistant, HD Voice & Video Calls, and advanced collaboration tools. No credit card required.
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-brand-primary font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
              >
                Claim Your Welcome Bonus
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewards.map((reward, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className={`bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-3 hover:bg-white/10 transition-colors ${i === 4 ? 'sm:col-span-2 text-center items-center' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center">
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{reward.title}</h3>
                    <p className="text-gray-400 text-sm">{reward.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WelcomeBonus;
