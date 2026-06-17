import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket, Plus, Copy, CheckCircle2, Trash2, Loader2, Play, Square } from 'lucide-react';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(null);
  
  // Form state
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [usageLimit, setUsageLimit] = useState(100);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchCoupons(); }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get('/api/admin/coupons');
      setCoupons(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCreate = async () => {
    if (!code || !discountValue) return;
    setSaving(true);
    try {
      await axios.post('/api/admin/coupons', {
        code, discountType, discountValue, usageLimit
      });
      setShowModal(false);
      setCode(''); setDiscountValue(''); setUsageLimit(100);
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create coupon');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (id, isActive) => {
    try {
      await axios.put(`/api/admin/coupons/${id}`, { isActive: !isActive });
      fetchCoupons();
    } catch (err) { alert('Failed to update status'); }
  };

  const deleteCoupon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await axios.delete(`/api/admin/coupons/${id}`);
      fetchCoupons();
    } catch (err) { alert('Failed to delete coupon'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Coupons & Promos</h1>
          <p className="text-sm text-white/50 mt-1">Live coupon codes from your MongoDB database.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-brand-primary hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-brand-primary" /></div>
        ) : coupons.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-white/30">
            <Ticket className="w-10 h-10 mb-3" />
            <p className="font-semibold">No coupons created yet.</p>
          </div>
        ) : coupons.map((c) => (
          <div key={c._id} className={`bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden ${!c.isActive ? 'opacity-60' : ''}`}>
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${c.isActive ? 'from-emerald-500/20 to-transparent' : 'from-red-500/20 to-transparent'} rounded-bl-full pointer-events-none`} />
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-brand-primary" />
                <span className="font-bold text-white tracking-widest text-lg">{c.code}</span>
              </div>
              <button onClick={() => handleCopy(c.code)} className="text-white/40 hover:text-white transition-colors">
                {copied === c.code ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="mb-4">
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-indigo-400">
                {c.discountType === 'Percentage' ? `${c.discountValue}% OFF` : 
                 c.discountType === 'Flat' ? `₹${c.discountValue} OFF` : 
                 `${c.discountValue} Credits`}
              </p>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/40">Usage</span>
                  <span className="font-bold text-white">{c.usageCount} / {c.usageLimit}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: `${(c.usageCount / c.usageLimit) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-white/10">
              <button onClick={() => toggleStatus(c._id, c.isActive)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-colors ${c.isActive ? 'bg-white/5 text-amber-400 hover:bg-amber-500/10' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
                {c.isActive ? <><Square className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Activate</>}
              </button>
              <button onClick={() => deleteCoupon(c._id)} className="px-3 py-2 bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 rounded-xl transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">Create New Coupon</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Coupon Code</label>
                <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="e.g. SUMMER50" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Discount Type</label>
                  <select value={discountType} onChange={e => setDiscountType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary [&>option]:bg-[#12121a]">
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat Amount</option>
                    <option value="Credits">Free Credits</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Value</label>
                  <input value={discountValue} onChange={e => setDiscountValue(e.target.value)} placeholder={discountType === 'Percentage' ? 'e.g. 20' : 'e.g. 500'} type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Usage Limit</label>
                <input value={usageLimit} onChange={e => setUsageLimit(e.target.value)} type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
              </div>
            </div>
            <div className="p-5 border-t border-white/10 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold text-sm transition-colors">Cancel</button>
              <button onClick={handleCreate} disabled={saving} className="flex-1 py-3 bg-brand-primary hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Coupon'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
