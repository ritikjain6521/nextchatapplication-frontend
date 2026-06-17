import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, CreditCard, Lock } from 'lucide-react';

const PaymentGateway = () => {
  return (
    <section className="py-24 relative z-10 bg-black/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-6"
          >
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">100% Secure Checkout</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Flexible & Secure <span className="text-green-400">Payments</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Recharge your wallet or upgrade your subscription seamlessly. We support all major payment methods locally and globally.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm max-w-md w-full"
          >
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">256-bit Secure Payments</h4>
                  <p className="text-gray-400 text-sm">Bank-grade encryption for all transactions.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Instant Activation</h4>
                  <p className="text-gray-400 text-sm">Credits are added to your wallet instantly upon payment.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Multiple Payment Methods</h4>
                  <p className="text-gray-400 text-sm">Cards, UPI, Net Banking, and Global Wallets supported.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {['Razorpay', 'Stripe', 'PayPal', 'UPI', 'Google Pay', 'PhonePe', 'Paytm', 'Debit/Credit Cards', 'Net Banking'].map((method, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-center text-center hover:bg-white/10 transition-colors h-24">
                <span className="text-gray-300 font-medium text-sm">{method}</span>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default PaymentGateway;
