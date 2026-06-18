import React, { useState } from 'react';
import axios from 'axios';
import { X, Ticket, Loader2, Send } from 'lucide-react';
import { useAuth } from '../Context/AuthProvider';

function SupportTicketModal({ onClose }) {
    const [authUser] = useAuth();
    const userData = authUser?.user || authUser?.User || authUser || {};

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('General');
    const [priority, setPriority] = useState('Low');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) return;
        setLoading(true);
        try {
            await axios.post('/api/User/ticket', {
                fullname: userData.fullname || 'Unknown User',
                email: userData.email || 'unknown@example.com',
                subject,
                message,
                category,
                priority
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            console.error(err);
            alert('Failed to submit ticket');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
                className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f0f13] shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/3">
                    <h2 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-brand-primary" />
                        Support Ticket
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {success ? (
                    <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                            <Ticket className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Ticket Submitted!</h3>
                        <p className="text-sm text-slate-400">Our support team will get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject</label>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Brief summary of your issue..."
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-primary/60 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-primary/60 transition-all [&>option]:bg-[#0f0f13]"
                                >
                                    <option value="General">General</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Billing">Billing</option>
                                    <option value="Credits">Credits</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-primary/60 transition-all [&>option]:bg-[#0f0f13]"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Describe your issue in detail..."
                                required
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-primary/60 transition-all resize-none"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                {loading ? 'Submitting...' : 'Submit Ticket'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default SupportTicketModal;
