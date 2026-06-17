import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, History, TrendingUp, Zap, Bot } from 'lucide-react';

const WalletDashboard = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="bg-bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="bg-white/5 p-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Credit Wallet</h3>
                    <p className="text-xs text-gray-400">Pro Plan (Trial expires in 6 days)</p>
                  </div>
                </div>
                <button className="bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-indigo transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Recharge
                </button>
              </div>

              {/* Body */}
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-gray-400 mb-1">Credits Remaining</p>
                      <h2 className="text-5xl font-bold text-white">80 <span className="text-xl text-gray-500 font-normal">/ 100</span></h2>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 text-sm flex items-center gap-1 justify-end">
                        <TrendingUp className="w-4 h-4" /> Healthy
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-brand-indigo to-brand-primary rounded-full"
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-gray-400 text-xs mb-1">AI Usage</p>
                    <p className="text-white font-semibold text-lg">12 Credits</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-gray-400 text-xs mb-1">Voice & Video</p>
                    <p className="text-white font-semibold text-lg">8 Credits</p>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <History className="w-4 h-4 text-gray-400" /> Recent Transactions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm text-white">Welcome Bonus</p>
                          <p className="text-xs text-gray-500">Today, 10:00 AM</p>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-medium text-sm">+100</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm text-white">AI Thread Summary</p>
                          <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                        </div>
                      </div>
                      <span className="text-gray-300 font-medium text-sm">-5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Text Content */}
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Control Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-indigo">Usage & Spending</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8"
            >
              The Credit Wallet Dashboard gives you a bird's-eye view of your current plan, remaining credits, and detailed usage statistics. Never be surprised by hidden charges.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">✓</div>
                Real-time usage tracking
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">✓</div>
                Detailed transaction history
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">✓</div>
                One-click credit recharge
              </li>
            </motion.ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WalletDashboard;
