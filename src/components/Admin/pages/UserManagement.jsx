import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Search, MoreVertical, ShieldAlert, CheckCircle2, XCircle, 
  Settings, Loader2, UserX, Crown, Shield, Wallet
} from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Edit form state
  const [editPlan, setEditPlan] = useState('');
  const [editCredits, setEditCredits] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      await axios.put(`/api/admin/users/${editingUser._id}`, {
        plan: editPlan,
        credits: editCredits,
        action: 'set'
      });
      setEditingUser(null);
      fetchUsers(); // Refresh data
    } catch (error) {
      alert("Failed to update user");
      console.error(error);
    }
  };

  const filteredUsers = users.filter(u => 
    u.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPlanBadge = (plan) => {
    switch(plan) {
      case 'Enterprise': return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/30">Enterprise</span>;
      case 'Team': return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">Team</span>;
      case 'Pro': return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-green-500/20 text-green-400 border border-green-500/30">Pro</span>;
      default: return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-white/5 text-white/50 border border-white/10">Free</span>;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-sm text-white/50 mt-1">View, search, and manage all registered accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary/50 w-[300px]"
            />
          </div>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="text-xs text-white/40 uppercase bg-[#16161e] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">User</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Plan</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Credits</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-primary mx-auto mb-2" />
                    <p className="text-white/50">Loading users...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-white/50">
                    No users found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.profilePhoto || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} alt="" className="w-10 h-10 rounded-full bg-white/10 object-cover" />
                        <div>
                          <p className="font-semibold text-white">{user.fullname}</p>
                          <p className="text-xs text-white/40">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? (
                        <span className="flex items-center gap-1 text-[11px] text-amber-400"><Crown className="w-3 h-3" /> Admin</span>
                      ) : (
                        <span className="text-white/40 text-[11px]">User</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getPlanBadge(user.plan)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                        {user.credits || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => {
                          setEditingUser(user);
                          setEditPlan(user.plan || 'Free');
                          setEditCredits(user.credits || 0);
                        }}
                        className="text-brand-primary hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">Edit User Profile</h3>
            <p className="text-sm text-white/40 mb-6">Modify plan and wallet balance for {editingUser.fullname}.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Subscription Plan</label>
                <select 
                  value={editPlan}
                  onChange={(e) => setEditPlan(e.target.value)}
                  className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary"
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Team">Team</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Credit Balance</label>
                <input 
                  type="number" 
                  value={editCredits}
                  onChange={(e) => setEditCredits(e.target.value)}
                  className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setEditingUser(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateUser}
                className="flex-1 bg-brand-primary hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
