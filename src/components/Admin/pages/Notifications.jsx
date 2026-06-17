import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Users, Megaphone, Calendar, Send, CheckCircle2, Loader2 } from 'lucide-react';

const targets = ['All Users', 'Free Users', 'Pro Users', 'Team Users', 'Enterprise Users'];

const Notifications = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Users');
  const [type, setType] = useState('Push');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => { fetchCampaigns(); }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('/api/admin/notifications');
      setCampaigns(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSend = async () => {
    if (!title || !message) return;
    setSending(true);
    try {
      await axios.post('/api/admin/notifications', { title, message, type, targetAudience });
      setSentSuccess(true);
      setTitle(''); setMessage('');
      fetchCampaigns();
      setTimeout(() => setSentSuccess(false), 3000);
    } catch (err) { alert('Failed to send notification'); }
    finally { setSending(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Notification Management</h1>
        <p className="text-sm text-white/50 mt-1">Send push notifications, email campaigns, and product announcements to your users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2"><Megaphone className="w-4 h-4 text-brand-primary" /> Compose Notification</h3>

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Notification Type</label>
            <div className="flex gap-2">
              {['Push', 'Email', 'Both'].map(t => (
                <button key={t} onClick={() => setType(t)} className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${type === t ? 'bg-brand-primary text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>{t}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Target Audience</label>
            <select value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary [&>option]:bg-[#12121a]">
              {targets.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. 🎉 New Feature Alert!" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your notification message here..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary resize-none h-32" />
          </div>

          <button onClick={handleSend} disabled={sending || !title || !message} className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : sentSuccess ? <><CheckCircle2 className="w-4 h-4" /> Notification Sent!</> : <><Send className="w-4 h-4" /> Send Notification</>}
          </button>
        </div>

        {/* Campaign History */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-brand-primary" /> Campaign History</h3>
          <div className="space-y-3 overflow-y-auto flex-1 pr-2 max-h-[500px]">
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-brand-primary" /></div>
            ) : campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-white/30">
                <p className="font-semibold">No campaigns sent yet.</p>
              </div>
            ) : campaigns.map((c) => (
              <div key={c._id} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white text-sm">{c.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-white/40"><Users className="w-3 h-3" /> {c.targetAudience}</span>
                      <span className="flex items-center gap-1 text-xs text-white/40"><Calendar className="w-3 h-3" /> {new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap ${c.status === 'Sent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>{c.status}</span>
                </div>
                {c.sentCount > 0 && (
                  <p className="text-xs text-white/40 mt-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Delivered to {c.sentCount.toLocaleString()} users</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
