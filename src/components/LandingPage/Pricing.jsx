import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const subscriptions = [
  {
    name: "Free Plan",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started with basic features.",
    features: ["Basic Chat", "Group Chat", "100 Welcome Credits"],
    buttonText: "Start Free",
    popular: false
  },
  {
    name: "Pro Plan",
    price: "₹299",
    period: "per user / month",
    description: "Ideal for power users needing advanced tools.",
    features: ["Unlimited AI Usage", "Voice Calls", "Video Calls", "5 GB Storage", "Premium Support"],
    buttonText: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Team Plan",
    price: "₹999",
    period: "per user / month",
    description: "For small to medium teams collaborating daily.",
    features: ["Team Workspace", "Admin Controls", "Analytics Dashboard", "Team AI Assistant", "100 GB Storage"],
    buttonText: "Start Team Trial",
    popular: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "billed annually",
    description: "Enterprise-grade security and unlimited scalability.",
    features: ["Unlimited Usage", "SSO Authentication", "Dedicated Server", "API Access", "Dedicated Support"],
    buttonText: "Contact Sales",
    popular: false
  }
];

const creditPacks = [
  { name: "Starter Pack", price: "₹99", credits: "100 Credits", popular: false },
  { name: "Pro Pack", price: "₹299", credits: "500 Credits", popular: true },
  { name: "Business Pack", price: "₹999", credits: "2,500 Credits", popular: false },
  { name: "Enterprise Pack", price: "₹2999", credits: "10,000 Credits", popular: false }
];

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('subscriptions'); // 'subscriptions' or 'credits'

  return (
    <section id="pricing" className="py-24 relative z-10 bg-bg-card/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Flexible Plans for <span className="text-brand-primary">Every Need</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-8"
          >
            Choose a subscription plan that fits your team, or buy credit packs on-demand to power your AI and calling features.
          </motion.p>
          
          {/* Toggle Switch */}
          <div className="inline-flex bg-black/40 border border-white/10 p-1 rounded-full relative">
            <div 
              className={`absolute top-1 bottom-1 w-1/2 bg-brand-primary rounded-full transition-transform duration-300 ease-out`}
              style={{ transform: activeTab === 'credits' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            <button 
              onClick={() => setActiveTab('subscriptions')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors ${activeTab === 'subscriptions' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Subscriptions
            </button>
            <button 
              onClick={() => setActiveTab('credits')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors ${activeTab === 'credits' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Credit Packs
            </button>
          </div>
        </div>

        {/* Dynamic Content area */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'subscriptions' ? (
              <motion.div
                key="subs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {subscriptions.map((plan, index) => (
                  <div key={index} className={`relative bg-white/5 border rounded-3xl p-6 flex flex-col ${plan.popular ? 'border-brand-primary shadow-purple' : 'border-white/10 hover:border-white/30'} transition-colors`}>
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-primary to-brand-indigo text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-gray-400 text-sm">/{plan.period}</span>}
                    </div>
                    <div className="space-y-4 flex-1 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/signup" className={`w-full py-3 rounded-xl font-medium text-center transition-all ${plan.popular ? 'bg-gradient-to-r from-brand-primary to-brand-indigo text-white hover:shadow-purple-sm' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      {plan.buttonText}
                    </Link>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="credits"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
              >
                {creditPacks.map((pack, index) => (
                  <div key={index} className={`bg-white/5 border ${pack.popular ? 'border-brand-primary/50 bg-brand-primary/10' : 'border-white/10'} rounded-3xl p-6 flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform`}>
                    {pack.popular && (
                      <div className="absolute top-4 right-4 flex gap-1 items-center bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold">
                        🔥 Popular
                      </div>
                    )}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(250,204,21,0.3)] mt-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{pack.name}</h3>
                    <p className="text-3xl font-extrabold text-white mb-6">{pack.credits}</p>
                    <p className="text-2xl font-bold text-gray-300 mb-8">{pack.price}</p>
                    <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-brand-primary hover:text-white transition-colors font-medium flex items-center justify-center gap-2">
                      Buy Credits <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
