import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2, XCircle, Clock, RefreshCcw, Search, Filter, Loader2 } from 'lucide-react';

const statusBadge = (status) => {
  switch (status) {
    case 'Success': return <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold"><CheckCircle2 className="w-3 h-3" /> Success</span>;
    case 'Failed': return <span className="flex items-center gap-1 text-red-400 text-xs font-semibold"><XCircle className="w-3 h-3" /> Failed</span>;
    case 'Refunded': return <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold"><RefreshCcw className="w-3 h-3" /> Refunded</span>;
    case 'Pending': return <span className="flex items-center gap-1 text-blue-400 text-xs font-semibold"><Clock className="w-3 h-3" /> Pending</span>;
    default: return null;
  }
};

const gatewayBadge = (method) => {
  const colors = { Razorpay: 'text-blue-400 bg-blue-500/10', Stripe: 'text-purple-400 bg-purple-500/10', PayPal: 'text-amber-400 bg-amber-500/10', UPI: 'text-green-400 bg-green-500/10', Card: 'text-white/60 bg-white/5' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${colors[method] || colors.Card}`}>{method}</span>;
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refunding, setRefunding] = useState(null);

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('/api/admin/payments');
      setPayments(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleRefund = async (id) => {
    setRefunding(id);
    try {
      await axios.put(`/api/admin/payments/${id}/refund`, { reason: 'Admin initiated refund' });
      fetchPayments();
    } catch (err) { alert('Refund failed'); }
    finally { setRefunding(null); }
  };

  const filtered = payments.filter(t =>
    (t.fullname || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.transactionId || '').includes(search)
  );

  const totalCollected = payments.filter(p => p.status === 'Success').reduce((a, p) => a + p.amount, 0);
  const totalRefunded = payments.filter(p => p.status === 'Refunded').reduce((a, p) => a + p.amount, 0);
  const totalFailed = payments.filter(p => p.status === 'Failed').reduce((a, p) => a + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((a, p) => a + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Payments & Refunds</h1>
          <p className="text-sm text-white/50 mt-1">Live transaction history from your MongoDB database.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="text" placeholder="Search by user or TX ID..." value={search} onChange={e => setSearch(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary/50 w-[260px]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: `₹${totalCollected.toLocaleString('en-IN')}`, color: 'text-emerald-400' },
          { label: 'Refunded', value: `₹${totalRefunded.toLocaleString('en-IN')}`, color: 'text-amber-400' },
          { label: 'Failed', value: `₹${totalFailed.toLocaleString('en-IN')}`, color: 'text-red-400' },
          { label: 'Pending', value: `₹${totalPending.toLocaleString('en-IN')}`, color: 'text-blue-400' },
        ].map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-white/40 uppercase bg-[#16161e] border-b border-white/10">
              <tr>
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Plan</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Gateway</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="8" className="px-5 py-12 text-center"><Loader2 className="w-6 h-6 animate-spin text-brand-primary mx-auto mb-2" /><p className="text-white/40">Loading transactions...</p></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="8" className="px-5 py-12 text-center text-white/30">
                  {payments.length === 0 ? 'No payments recorded yet. Payments will appear here when users subscribe.' : `No results for "${search}"`}
                </td></tr>
              ) : filtered.map((tx, i) => (
                <tr key={tx._id || i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-white/60">{tx.transactionId}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white text-sm">{tx.fullname}</p>
                    <p className="text-xs text-white/40">{tx.email}</p>
                  </td>
                  <td className="px-5 py-4 text-white/70 text-xs">{tx.plan}</td>
                  <td className="px-5 py-4 font-bold text-white">₹{tx.amount?.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4">{gatewayBadge(tx.gateway)}</td>
                  <td className="px-5 py-4 text-white/40 text-xs">{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">{statusBadge(tx.status)}</td>
                  <td className="px-5 py-4 text-right">
                    {tx.status === 'Success' && (
                      <button onClick={() => handleRefund(tx._id)} disabled={refunding === tx._id} className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
                        {refunding === tx._id ? 'Processing...' : 'Refund'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
