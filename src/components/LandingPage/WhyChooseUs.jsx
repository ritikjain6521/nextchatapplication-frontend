import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Lock, Maximize } from 'lucide-react';

const reasons = [
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Ultra Fast",
    description: "Built on WebSockets, NexChat delivers messages in milliseconds. No more refreshing or waiting for messages to arrive.",
    bg: "from-yellow-500/10 to-orange-500/10",
    border: "border-yellow-500/20"
  },
  {
    icon: <Lock className="w-8 h-8 text-green-400" />,
    title: "Secure",
    description: "Advanced JWT authentication and secure, encrypted communication ensures your data remains yours and yours alone.",
    bg: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/20"
  },
  {
    icon: <Maximize className="w-8 h-8 text-blue-400" />,
    title: "Scalable",
    description: "Whether you're a team of 5 or an enterprise of 5,000, our infrastructure scales seamlessly to handle your communication needs.",
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/20"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-indigo">NexChat?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            We've engineered NexChat from the ground up to be the most reliable, fast, and secure communication platform available.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-gradient-to-br ${reason.bg} border ${reason.border} p-8 rounded-3xl backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
            >
              <div className="bg-bg-card/50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border border-white/5 mb-6">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{reason.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {reason.description}
              </p>
              
              <ul className="mt-6 space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                    <span>Industry leading feature point</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
