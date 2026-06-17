import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Phone, Video, Database } from 'lucide-react';

const creditUsage = [
  {
    category: "AI Assistant",
    icon: <Bot className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    items: [
      { name: "Basic Prompt", cost: "1 Credit" },
      { name: "AI Reply Suggestion", cost: "2 Credits" },
      { name: "AI Translation", cost: "2 Credits" },
      { name: "AI Chat Summary", cost: "5 Credits" }
    ]
  },
  {
    category: "Voice Calling",
    icon: <Phone className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "1 Minute Voice Call", cost: "1 Credit" }
    ]
  },
  {
    category: "Video Calling",
    icon: <Video className="w-6 h-6" />,
    color: "from-purple-500 to-fuchsia-500",
    items: [
      { name: "1 Minute Video Call", cost: "3 Credits" }
    ]
  },
  {
    category: "File Storage",
    icon: <Database className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "Premium Storage Usage", cost: "Credit Based" }
    ]
  }
];

const CreditModel = () => {
  return (
    <section className="py-24 relative z-10 bg-bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Transparent <span className="text-brand-primary">Credit Usage</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Pay only for what you use. Our credit system makes it easy to track your premium feature usage across the platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creditUsage.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-6">{section.category}</h3>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-gray-400 text-sm">{item.name}</span>
                    <span className="text-white font-medium text-sm bg-white/10 px-2 py-1 rounded">{item.cost}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreditModel;
