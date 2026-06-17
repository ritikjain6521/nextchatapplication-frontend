import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, TrendingUp, CreditCard, Users, Zap, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const PLAN_COLORS = ['#94a3b8', '#7c6af7', '#3b82f6', '#f59e0b'];

const RevenueAnalytics = () => {
  const [data, setData] = useState({ monthlyData: [], planDist: [], totalRevenue: 0, mrr: 0, arr: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/admin/revenue');
        setData(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: `₹${data.totalRevenue.toLocaleString('en-IN')}`, icon: Activity, trend: '+14.2%' },
    { label: 'Monthly Rec. (MRR)', value: `₹${data.mrr.toLocaleString('en-IN')}`, icon: TrendingUp, trend: '+5.8%' },
    { label: 'Annual Rec. (ARR)', value: `₹${data.arr.toLocaleString('en-IN')}`, icon: Zap, trend: '+5.8%' },
    { label: 'Avg Revenue / User', value: `₹${data.totalRevenue > 0 && data.planDist.length > 0 ? Math.round(data.totalRevenue / data.planDist.reduce((a, b) => a + b.value, 0)) : 0}`, icon: Users, trend: '+2.1%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Revenue Analytics</h1>
        <p className="text-sm text-white/50 mt-1">Live financial metrics and MRR tracking from MongoDB.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-brand-primary/20 text-brand-primary rounded-xl"><stat.icon className="w-5 h-5" /></div>
              <p className="text-sm font-semibold text-white/60">{stat.label}</p>
            </div>
            <p className="text-3xl font-black text-white">{loading ? '...' : stat.value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <TrendingUp className="w-3 h-3" /> {stat.trend} <span className="text-white/30 font-normal ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-base font-bold text-white flex items-center gap-2"><Activity className="w-4 h-4 text-brand-primary" /> Revenue Trend</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-white px-3 py-1.5 focus:outline-none focus:border-brand-primary [&>option]:bg-[#12121a]">
              <option>Year to Date</option>
              <option>Last 12 Months</option>
              <option>All Time</option>
            </select>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-primary" /></div>
          ) : data.monthlyData.length === 0 ? (
            <div className="flex items-center justify-center h-[320px] text-white/30 text-sm">No revenue data available yet.</div>
          ) : (
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `₹${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(18,18,26,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col">
          <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2"><CreditCard className="w-4 h-4 text-brand-primary" /> MRR by Plan</h3>
          
          {loading ? (
            <div className="flex-1 flex justify-center items-center"><Loader2 className="w-6 h-6 animate-spin text-brand-primary" /></div>
          ) : (
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.planDist} cx="50%" cy="45%"
                    innerRadius={70} outerRadius={100}
                    paddingAngle={5} dataKey="value"
                  >
                    {data.planDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PLAN_COLORS[index % PLAN_COLORS.length]} stroke="rgba(0,0,0,0.2)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(18,18,26,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
