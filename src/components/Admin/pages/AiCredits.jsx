import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Plus, TrendingUp, Zap, BarChart2, Loader2, Edit2, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AiCredits = () => {
  const [data, setData] = useState({ totalCredits: 0, topUsers: [], totalUsers: 0 });
  const [creditPacks, setCreditPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPack, setEditingPack] = useState(null);
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('from-gray-500 to-gray-600');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resData, resPacks] = await Promise.all([
        axios.get('/api/admin/credits'),
        axios.get('/api/admin/credit-packs')
      ]);
      setData(resData.data);
      setCreditPacks(resPacks.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenModal = (pack = null) => {
    if (pack) {
      setEditingPack(pack);
      setName(pack.name);
      setCredits(pack.credits);
      setPrice(pack.price);
      setColor(pack.color);
    } else {
      setEditingPack(null);
      setName('');
      setCredits('');
      setPrice('');
      setColor('from-gray-500 to-gray-600');
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!name || !credits || !price) return;
    setSaving(true);
    try {
      const payload = { name, credits, price, color };
      if (editingPack) {
        await axios.put(`/api/admin/credit-packs/${editingPack._id}`, payload);
      } else {
        await axios.post('/api/admin/credit-packs', payload);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save pack');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this credit pack?')) return;
    try {
      await axios.delete(`/api/admin/credit-packs/${id}`);
      fetchData();
    } catch (err) { alert('Failed to delete pack'); }
  };

  const maxCredits = data.topUsers.length > 0 ? Math.max(...data.topUsers.map(u => u.credits || 0)) : 1;
  const chartData = data.topUsers.slice(0, 7).map(u => ({
    name: u.fullname?.split(' ')[0] || 'User',
    credits: u.credits || 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Credit Management</h1>
          <p className="text-sm text-white/50 mt-1">Live credit balances from your MongoDB users collection.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-brand-primary hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Create Credit Pack
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Credits (DB)', value: loading ? '...' : data.totalCredits.toLocaleString('en-IN'), icon: Sparkles, color: 'text-brand-primary' },
          { label: 'Total Users', value: loading ? '...' : data.totalUsers, icon: BarChart2, color: 'text-emerald-400' },
          { label: 'Avg Credits/User', value: loading || data.totalUsers === 0 ? '...' : Math.round(data.totalCredits / data.totalUsers), icon: Zap, color: 'text-amber-400' },
          { label: 'Top User Credits', value: loading || data.topUsers.length === 0 ? '...' : (data.topUsers[0]?.credits || 0).toLocaleString('en-IN'), icon: TrendingUp, color: 'text-blue-400' },
        ].map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <p className="text-xs text-white/40 uppercase tracking-wider">{s.label}</p>
            </div>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-4">Credits by Top Users</h3>
          {loading ? (
            <div className="flex justify-center items-center h-[240px]"><Loader2 className="w-6 h-6 animate-spin text-brand-primary" /></div>
          ) : (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#12121a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="credits" name="Credits" fill="#7c6af7" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-4">Top Users by Credits</h3>
          {loading ? (
            <div className="flex justify-center items-center h-[240px]"><Loader2 className="w-6 h-6 animate-spin text-brand-primary" /></div>
          ) : data.topUsers.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-12">No user data yet.</p>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
              {data.topUsers.map((u, i) => (
                <div key={u._id} className="flex items-center gap-3">
                  <span className="text-white/30 text-xs w-4 font-mono">#{i + 1}</span>
                  <img src={u.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 bg-white/10" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-semibold text-white truncate">{u.fullname}</p>
                      <span className="text-xs font-bold text-amber-400 shrink-0">{(u.credits || 0).toLocaleString()} cr</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full">
                      <div className="h-full bg-gradient-to-r from-brand-primary to-indigo-500 rounded-full" style={{ width: `${maxCredits > 0 ? ((u.credits || 0) / maxCredits) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-white mb-4">Credit Packs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {loading ? (
             <div className="col-span-full flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-brand-primary" /></div>
          ) : creditPacks.length === 0 ? (
             <div className="col-span-full text-center text-white/30 py-8">No credit packs found.</div>
          ) : creditPacks.map((pack) => (
            <div key={pack._id} className={`bg-gradient-to-br ${pack.color} p-0.5 rounded-2xl`}>
              <div className="bg-[#12121a] rounded-[14px] p-5 h-full relative group">
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(pack)} className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(pack._id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <Sparkles className="w-5 h-5 text-white mb-3" />
                <h4 className="font-bold text-white">{pack.name}</h4>
                <p className="text-2xl font-black text-white mt-1">₹{pack.price}</p>
                <p className="text-white/50 text-sm mt-0.5">{pack.credits.toLocaleString()} credits</p>
                <button onClick={() => handleOpenModal(pack)} className="mt-4 w-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors">Edit Pack</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">{editingPack ? 'Edit Credit Pack' : 'Create Credit Pack'}</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Pack Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Starter Pack" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Credits Amount</label>
                  <input value={credits} onChange={e => setCredits(e.target.value)} type="number" placeholder="e.g. 100" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Price (₹)</label>
                  <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="e.g. 49" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Gradient Color (Tailwind)</label>
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
            </div>
            <div className="p-5 border-t border-white/10 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold text-sm transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-brand-primary hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Pack'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiCredits;
