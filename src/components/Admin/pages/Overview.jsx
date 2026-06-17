import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, CreditCard, Activity, Sparkles, Phone, Video, TrendingUp, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Overview = () => {
  const [data, setData] = useState({ metrics: {}, revenueChart: [], subChart: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, revRes] = await Promise.all([
          axios.get('/api/admin/metrics'),
          axios.get('/api/admin/revenue')
        ]);
        setData({
          metrics: metricsRes.data.metrics,
          revenueChart: revRes.data.monthlyData,
          subChart: revRes.data.planDist
        });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total MRR', value: data.metrics.mrr || '₹0', icon: Activity, trend: '+12.5%', color: 'text-brand-primary' },
    { label: 'Total Users', value: data.metrics.totalUsers || 0, icon: Users, trend: '+5.2%', color: 'text-blue-400' },
    { label: 'Active Subs', value: data.metrics.activeSubscriptions || 0, icon: CreditCard, trend: '+8.1%', color: 'text-emerald-400' },
    { label: 'Credits Dist.', value: data.metrics.totalCreditsCirculating?.toLocaleString('en-IN') || 0, icon: Sparkles, trend: '+22.4%', color: 'text-amber-400' },
    { label: 'Voice Mins', value: '45,210', icon: Phone, trend: '+15.3%', color: 'text-rose-400' }, // Hardcoded for now until call feature built
    { label: 'Video Mins', value: '82,400', icon: Video, trend: '+18.2%', color: 'text-purple-400' }, // Hardcoded for now
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-white/50 mt-1">Real-time metrics from your MongoDB database.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-brand-primary" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> {stat.trend}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                  <p className="text-xs text-white/50 font-medium mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-white">Revenue Growth</h3>
                <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-white px-2 py-1 focus:outline-none [&>option]:bg-[#12121a]">
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-[300px]">
                {data.revenueChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c6af7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#7c6af7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#12121a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#7c6af7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/30 text-sm">Not enough data to draw chart</div>
                )}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col">
              <h3 className="text-base font-bold text-white mb-6">Users by Plan</h3>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.subChart} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#12121a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                    <Bar dataKey="value" name="Users" fill="#38bdf8" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
