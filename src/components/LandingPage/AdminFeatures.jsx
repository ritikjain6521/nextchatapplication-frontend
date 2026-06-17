import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, CreditCard, Activity, ArrowUpRight } from 'lucide-react';

const metrics = [
  { label: "Total Revenue", value: "$124,500", icon: <CreditCard className="w-4 h-4" />, trend: "+12.5%" },
  { label: "MRR", value: "$24,200", icon: <TrendingUpIcon />, trend: "+8.2%" },
  { label: "Active Subscribers", value: "1,245", icon: <Users className="w-4 h-4" />, trend: "+15.3%" },
  { label: "Credit Usage (30d)", value: "845K", icon: <Activity className="w-4 h-4" />, trend: "+24.1%" }
];

function TrendingUpIcon() {
  return <ArrowUpRight className="w-4 h-4" />;
}

const adminFeatures = [
  "Create & Manage Custom Plans",
  "Modify User Credit Balances",
  "View Detailed Transaction Logs",
  "One-Click Refund Approvals",
  "Generate Discount Coupons",
  "Offer Free Trial Credits",
  "Monitor Real-time Revenue",
  "Manage Payment Gateways"
];

const AdminFeatures = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
          
          {/* Admin Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="bg-bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl p-6">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" /> SaaS Metrics Dashboard
                </h3>
                <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full border border-indigo-500/30">Admin Only</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {metrics.map((m, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                        {m.icon}
                      </div>
                      <span className="text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-0.5 rounded flex items-center gap-1">
                        {m.trend}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-1">{m.label}</p>
                    <p className="text-white font-bold text-xl">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/5 h-32 flex items-end gap-2">
                 {/* Fake chart bars */}
                 {[40, 60, 45, 80, 55, 90, 70, 100].map((height, i) => (
                   <div key={i} className="flex-1 bg-indigo-500/50 rounded-t-sm hover:bg-indigo-400 transition-colors cursor-pointer" style={{ height: `${height}%` }}></div>
                 ))}
              </div>
            </div>
          </motion.div>

          {/* Left Text Content */}
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Powerful Tools for <span className="text-indigo-400">Workspace Admins</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8"
            >
              Take complete control over your monetization system. Track active subscribers, monitor revenue, manage credit balances, and analyze conversion metrics all from one intuitive dashboard.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {adminFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-gray-300 text-sm">{feat}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminFeatures;
