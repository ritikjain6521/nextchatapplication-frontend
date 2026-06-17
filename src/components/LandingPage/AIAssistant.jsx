import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, MessageSquareText, FileText, Languages, PenTool } from 'lucide-react';

const aiFeatures = [
  {
    icon: <MessageSquareText className="w-5 h-5" />,
    title: "Smart Replies",
    desc: "Context-aware response suggestions that save you typing time."
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Thread Summarization",
    desc: "Instantly catch up on missed group conversations with AI summaries."
  },
  {
    icon: <Languages className="w-5 h-5" />,
    title: "Live Translation",
    desc: "Break down language barriers with real-time message translation."
  },
  {
    icon: <PenTool className="w-5 h-5" />,
    title: "Tone Adjustment",
    desc: "Automatically rewrite messages to sound more professional or casual."
  }
];

const AIAssistant = () => {
  return (
    <section id="ai" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">NexChat AI</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Meet Your Smart <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary to-pink-500">Chat Assistant</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl">
                Supercharge your productivity with our built-in AI assistant. It helps you write better, read faster, and communicate globally without missing a beat.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {aiFeatures.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/20 to-transparent rounded-3xl blur-2xl transform rotate-3" />
              <div className="bg-bg-card border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10 backdrop-blur-sm">
                
                {/* AI Chat Header */}
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-secondary to-pink-500 flex items-center justify-center p-2">
                    <Bot className="w-full h-full text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">NexChat AI</h3>
                    <p className="text-sm text-green-400">Online</p>
                  </div>
                </div>

                {/* Chat Flow */}
                <div className="space-y-4">
                  <div className="flex gap-3 justify-end">
                    <div className="bg-brand-primary/20 text-white p-3 rounded-2xl rounded-tr-sm text-sm border border-brand-primary/20">
                      Can you summarize the marketing thread? I missed the last 50 messages.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-secondary to-pink-500 shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/5 text-gray-300 p-4 rounded-2xl rounded-tl-sm text-sm border border-white/10 space-y-2 w-full">
                      <p>Here is the summary of the marketing thread:</p>
                      <ul className="list-disc pl-4 space-y-1 text-gray-400">
                        <li>The Q3 campaign launches on Oct 15th.</li>
                        <li>Sarah is designing the new banners.</li>
                        <li>Budget was approved for social ads.</li>
                      </ul>
                      <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                        <button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                          Copy
                        </button>
                        <button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
