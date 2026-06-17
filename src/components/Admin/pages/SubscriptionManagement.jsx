import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreditCard, Plus, CheckCircle2, MoreVertical, Edit2, Pause, Play, Trash2, Users, Loader2 } from 'lucide-react';

const SubscriptionManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [features, setFeatures] = useState('');
  const [color, setColor] = useState('from-gray-500 to-gray-600');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get('/api/admin/plans');
      setPlans(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setName(plan.name);
      setPrice(plan.price);
      setBillingCycle(plan.billingCycle);
      setFeatures(plan.features.join('\n'));
      setColor(plan.color);
    } else {
      setEditingPlan(null);
      setName('');
      setPrice('');
      setBillingCycle('Monthly');
      setFeatures('');
      setColor('from-gray-500 to-gray-600');
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!name || price === '') return;
    setSaving(true);
    try {
      const payload = {
        name,
        price: Number(price),
        billingCycle,
        features: features.split('\n').filter(f => f.trim() !== ''),
        color
      };

      if (editingPlan) {
        await axios.put(`/api/admin/plans/${editingPlan._id}`, payload);
      } else {
        await axios.post('/api/admin/plans', payload);
      }
      setShowModal(false);
      fetchPlans();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save plan');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (plan) => {
    try {
      await axios.put(`/api/admin/plans/${plan._id}`, { isActive: !plan.isActive });
      fetchPlans();
    } catch (err) { alert('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan? Active users on this plan will not be able to renew.')) return;
    try {
      await axios.delete(`/api/admin/plans/${id}`);
      fetchPlans();
    } catch (err) { alert('Failed to delete plan'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Subscription Management</h1>
          <p className="text-sm text-white/50 mt-1">Manage pricing plans, features, and billing cycles directly from MongoDB.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-brand-primary hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Create Plan
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-primary" /></div>
      ) : plans.length === 0 ? (
        <div className="text-center py-20 text-white/40">No plans found. Create one to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan._id} className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col ${!plan.isActive ? 'opacity-60 grayscale-[50%]' : ''}`}>
              {/* Header */}
              <div className={`p-5 bg-gradient-to-br ${plan.color} relative group`}>
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(plan)} className="p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-md transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(plan._id)} className="p-1.5 bg-red-500/20 hover:bg-red-500/40 text-white rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white text-lg tracking-wide">{plan.name}</h3>
                  {!plan.isActive && <span className="text-[10px] bg-black/30 text-white px-2 py-0.5 rounded-full font-bold">PAUSED</span>}
                </div>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-3xl font-black">{plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString()}`}</span>
                  {plan.price > 0 && <span className="text-white/70 text-sm font-medium">/{plan.billingCycle === 'Monthly' ? 'mo' : 'yr'}</span>}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs font-semibold text-white/50 mb-4 pb-4 border-b border-white/5">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Active Users</span>
                  <span className="text-white">{plan.activeUsers?.toLocaleString()}</span>
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button onClick={() => handleToggleStatus(plan)} className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors ${plan.isActive ? 'bg-white/5 text-amber-400 hover:bg-amber-500/10' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
                    {plan.isActive ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Resume</>}
                  </button>
                  <button onClick={() => handleOpenModal(plan)} className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl text-xs font-semibold transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden my-8">
            <div className="p-5 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">{editingPlan ? 'Edit Plan' : 'Create Subscription Plan'}</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Plan Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Pro Plan" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Price (₹)</label>
                  <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="e.g. 299" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Billing Cycle</label>
                  <select value={billingCycle} onChange={e => setBillingCycle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary [&>option]:bg-[#12121a]">
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="One-Time">One-Time</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Gradient Theme</label>
                <select value={color} onChange={e => setColor(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary [&>option]:bg-[#12121a]">
                  <option value="from-gray-500 to-gray-600">Gray</option>
                  <option value="from-purple-600 to-brand-primary">Purple</option>
                  <option value="from-blue-600 to-cyan-500">Blue</option>
                  <option value="from-amber-500 to-orange-500">Amber</option>
                  <option value="from-emerald-500 to-green-500">Green</option>
                  <option value="from-rose-500 to-red-500">Red</option>
                </select>
                <div className={`mt-2 h-2 rounded-full w-full bg-gradient-to-r ${color}`}></div>
              </div>
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Features (One per line)</label>
                <textarea value={features} onChange={e => setFeatures(e.target.value)} placeholder="Unlimited Chat&#10;Priority Support&#10;Custom Setup" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary resize-none h-32" />
              </div>
            </div>
            <div className="p-5 border-t border-white/10 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold text-sm transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-brand-primary hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
