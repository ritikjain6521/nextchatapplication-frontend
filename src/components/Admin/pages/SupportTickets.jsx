import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket, Clock, CheckCircle2, AlertCircle, XCircle, Search, MessageSquare, Loader2 } from 'lucide-react';

const statusConfig = {
  'Open': { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: AlertCircle },
  'In Progress': { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Clock },
  'Resolved': { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
  'Closed': { color: 'text-white/40 bg-white/5 border-white/10', icon: XCircle },
};
const priorityColor = { High: 'text-red-400', Medium: 'text-amber-400', Low: 'text-blue-400' };

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchTickets(); }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('/api/admin/tickets');
      setTickets(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, newStatus) => {
    setSaving(true);
    try {
      const res = await axios.put(`/api/admin/tickets/${id}`, { status: newStatus });
      setTickets(prev => prev.map(t => t._id === id ? res.data.ticket : t));
      setSelected(prev => prev?._id === id ? res.data.ticket : prev);
    } catch (err) { alert('Failed to update status'); }
    finally { setSaving(false); }
  };

  const sendReply = async () => {
    if (!reply.trim() || !selected) return;
    setSaving(true);
    try {
      const res = await axios.put(`/api/admin/tickets/${selected._id}`, { reply });
      setTickets(prev => prev.map(t => t._id === selected._id ? res.data.ticket : t));
      setSelected(res.data.ticket);
      setReply('');
    } catch (err) { alert('Failed to send reply'); }
    finally { setSaving(false); }
  };

  const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const filtered = tickets.filter(t => {
    const matchSearch = t.fullname?.toLowerCase().includes(search.toLowerCase()) || t.subject?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Support Tickets</h1>
        <p className="text-sm text-white/50 mt-1">Live tickets from your MongoDB database — fully manageable.</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-wrap">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${filterStatus === s ? 'bg-brand-primary text-white' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}>
            {s} <span className="ml-1 text-xs opacity-60">{s === 'All' ? tickets.length : tickets.filter(t => t.status === s).length}</span>
          </button>
        ))}
        <div className="ml-auto relative shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary/50 w-[200px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-3">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-brand-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-white/30">
              <Ticket className="w-10 h-10 mb-3" />
              <p className="font-semibold">{tickets.length === 0 ? 'No tickets yet. Tickets submitted by users will appear here.' : 'No tickets match your filter.'}</p>
            </div>
          ) : filtered.map((ticket) => {
            const cfg = statusConfig[ticket.status] || statusConfig['Open'];
            const StatusIcon = cfg.icon;
            return (
              <div key={ticket._id} onClick={() => setSelected(ticket)} className={`bg-white/5 border border-white/10 hover:border-brand-primary/30 rounded-2xl p-4 cursor-pointer transition-all ${selected?._id === ticket._id ? 'border-brand-primary/50 bg-brand-primary/5' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-xs text-white/40">#{ticket._id?.slice(-6)}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${cfg.color}`}>{ticket.status}</span>
                      <span className={`text-[10px] font-semibold ${priorityColor[ticket.priority] || 'text-white/40'}`}>{ticket.priority}</span>
                    </div>
                    <p className="font-semibold text-white text-sm truncate">{ticket.subject}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <p className="text-xs text-white/40">{ticket.fullname}</p>
                      <span className="text-white/20 text-xs">·</span>
                      <p className="text-xs text-white/40">{ticket.category}</p>
                      <span className="text-white/20 text-xs">·</span>
                      <p className="text-xs text-white/40">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-xs text-white/40">
                    <MessageSquare className="w-3 h-3" /> {ticket.replies?.length || 0}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          {selected ? (
            <div className="space-y-4">
              <div>
                <p className="font-mono text-xs text-white/40 mb-1">#{selected._id?.slice(-6)}</p>
                <h3 className="font-bold text-white text-base leading-snug">{selected.subject}</h3>
                <p className="text-sm text-white/50 mt-2">{selected.message}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/40">User:</span><span className="text-white font-medium">{selected.fullname}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Email:</span><span className="text-white/70 text-xs">{selected.email}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Category:</span><span className="text-white">{selected.category}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Priority:</span><span className={priorityColor[selected.priority]}>{selected.priority}</span></div>
              </div>

              {selected.replies?.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <p className="text-xs text-white/40 uppercase font-semibold">Replies</p>
                  {selected.replies.map((r, i) => (
                    <div key={i} className={`p-2.5 rounded-lg text-xs ${r.from === 'Admin' ? 'bg-brand-primary/10 text-white' : 'bg-white/5 text-white/70'}`}>
                      <p className="font-bold mb-0.5 text-[10px] text-white/40">{r.from}</p>
                      {r.message}
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-white/5">
                <p className="text-xs text-white/40 uppercase font-semibold mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => (
                    <button key={s} onClick={() => updateStatus(selected._id, s)} disabled={saving} className={`py-2 rounded-xl text-xs font-semibold transition-colors ${selected.status === s ? 'bg-brand-primary text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5">
                <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type a reply..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary resize-none h-24" />
                <button onClick={sendReply} disabled={saving || !reply.trim()} className="mt-2 w-full bg-brand-primary hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  {saving ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-white/30 text-center">
              <Ticket className="w-10 h-10 mb-3" />
              <p className="font-semibold">Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
