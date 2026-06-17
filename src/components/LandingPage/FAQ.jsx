import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Is the platform free?",
    answer: "Yes, we offer a robust Free Plan that includes unlimited one-on-one chats and basic voice/video calling. For advanced features like AI Assistant and large group meetings, you can upgrade to our Pro Plan."
  },
  {
    question: "Can I make video calls?",
    answer: "Absolutely. NexChat supports high-definition video calling for both one-on-one conversations and group meetings. You can also share your screen during calls."
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. All messages are encrypted, and we use advanced JWT authentication to ensure that only authorized users can access your workspace."
  },
  {
    question: "Does it support AI features?",
    answer: "Yes, our Pro and Enterprise plans include NexChat AI, which can summarize long threads, suggest smart replies, translate messages in real-time, and help adjust the tone of your writing."
  },
  {
    question: "Can I use NexChat on my phone?",
    answer: "Yes! NexChat is fully responsive and works beautifully on your mobile browser. We also provide native apps for iOS and Android for the best mobile experience."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked <span className="text-brand-primary">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Got questions? We've got answers. If you don't see your question here, feel free to reach out to our support team.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-primary' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
