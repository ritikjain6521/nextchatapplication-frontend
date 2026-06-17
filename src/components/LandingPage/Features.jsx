import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Video, Mic, Bot, Users, FolderOpen, Shield, Smartphone } from 'lucide-react';

const featureList = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Real-Time Messaging",
    description: "Instant message delivery, read receipts, and typing indicators.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "HD Video Calling",
    description: "One-to-one video calls, group meetings, and screen sharing.",
    color: "from-purple-500 to-brand-indigo"
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Crystal-Clear Voice",
    description: "Low latency, high-quality audio, and dedicated voice rooms.",
    color: "from-green-500 to-emerald-400"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Assistant",
    description: "Smart replies, message summarization, and translation support.",
    color: "from-orange-500 to-yellow-400"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Group Chats",
    description: "Team collaboration, community channels, and robust admin controls.",
    color: "from-pink-500 to-rose-400"
  },
  {
    icon: <FolderOpen className="w-6 h-6" />,
    title: "File Sharing",
    description: "Share images, videos, documents with drag & drop upload.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "End-to-End Security",
    description: "Secure authentication, JWT protection, and encrypted communication.",
    color: "from-emerald-500 to-teal-400"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Cross Platform",
    description: "Seamlessly syncs across your Desktop, Tablet, and Mobile devices.",
    color: "from-brand-primary to-purple-500"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Everything You Need in One <span className="text-brand-primary">Chat Platform</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Powerful features designed to keep your team connected, productive, and secure, no matter where they are.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.06] transition-all duration-300 hover:border-white/10 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
