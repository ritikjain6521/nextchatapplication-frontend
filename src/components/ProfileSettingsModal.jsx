import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { X, Camera, User2, Briefcase, Globe, Link2, CheckCircle2, Loader2, Info } from 'lucide-react';

const DEFAULT_PHOTO = "https://img.daisyui.com/images/profile/demo/gordon@192.webp";

function ProfileSettingsModal({ onClose }) {
    const [authUser, setUser] = useAuth();

    // Resolve the nested user object (could be user.user or user.User)
    const userData = authUser?.user || authUser?.User || authUser || {};

    const [customStatus, setCustomStatus] = useState(userData.customStatus || 'Available');
    const [bio, setBio] = useState(userData.bio || '');
    const [website, setWebsite] = useState(userData.website || '');
    const [socialLink, setSocialLink] = useState(userData.socialLink || '');
    const [preview, setPreview] = useState(userData.profilePhoto || DEFAULT_PHOTO);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileRef = useRef();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        setLoading(true);
        setSuccess(false);
        try {
            const formData = new FormData();
            formData.append('customStatus', customStatus);
            formData.append('bio', bio);
            formData.append('website', website);
            formData.append('socialLink', socialLink);
            if (selectedFile) formData.append('profilePhoto', selectedFile);

            const res = await axios.put('/api/User/update-profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data?.user) {
                // Merge the updated profile into authUser while preserving structure
                const updatedUser = res.data.user;
                if (authUser?.user) setUser({ ...authUser, user: updatedUser });
                else if (authUser?.User) setUser({ ...authUser, User: updatedUser });
                else setUser(updatedUser);
                setPreview(updatedUser.profilePhoto || DEFAULT_PHOTO);
            }
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f0f13] shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/3">
                    <h2 className="text-white font-bold text-lg tracking-wide">Edit Profile</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
                    {/* Profile Photo */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <img
                                src={preview}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-brand-primary/40 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                                onError={(e) => { e.target.src = DEFAULT_PHOTO; }}
                            />
                            <button
                                onClick={() => fileRef.current.click()}
                                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            >
                                <Camera className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <button
                            onClick={() => fileRef.current.click()}
                            className="text-xs text-brand-primary hover:text-indigo-300 font-semibold tracking-wide uppercase transition-colors"
                        >
                            Change Photo
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </div>

                    {/* Name & Email (read-only) */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <User2 className="w-3.5 h-3.5" /> Full Name
                        </label>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 opacity-60">
                            <span className="text-white text-sm">{userData.fullname || '—'}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 flex items-center gap-1"><Info className="w-3 h-3" /> Name cannot be changed</p>
                    </div>

                    {/* Custom Status */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5" /> Custom Status
                        </label>
                        <input
                            value={customStatus}
                            onChange={(e) => setCustomStatus(e.target.value)}
                            placeholder="e.g. Available, In a meeting, Do not disturb..."
                            maxLength={80}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-brand-primary/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all"
                        />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <User2 className="w-3.5 h-3.5" /> Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell people a bit about yourself..."
                            rows={3}
                            maxLength={200}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-brand-primary/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all resize-none"
                        />
                        <p className="text-[10px] text-slate-600 text-right">{bio.length}/200</p>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5" /> Website
                        </label>
                        <input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="https://yourwebsite.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-brand-primary/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all"
                        />
                    </div>

                    {/* Social Link */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Link2 className="w-3.5 h-3.5" /> Social Media Link
                        </label>
                        <input
                            value={socialLink}
                            onChange={(e) => setSocialLink(e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:border-brand-primary/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 bg-white/3 flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm font-medium transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading || success}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center gap-2 disabled:opacity-60 disabled:scale-100"
                    >
                        {loading ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                        ) : success ? (
                            <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                        ) : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettingsModal;
