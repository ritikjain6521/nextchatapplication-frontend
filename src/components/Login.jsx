import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../Context/Authprovider.jsx';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, MessageCircle, Loader2 } from 'lucide-react';

function Login() {
    const [authUser, setUser] = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const userInfo = {
            email: data.Email,
            password: data.password,
        };
        try {
            const res = await axios.post("/api/User/login", userInfo);
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data));
                setUser(res.data);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Ambient Background Blobs */}
            <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-600/25 blur-[130px] pointer-events-none animate-blob" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-purple-600/25 blur-[130px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }} />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
                    
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-4">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
                        <p className="text-slate-400 mt-1.5 text-sm">Sign in to continue to NexChat</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                            <div className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3 transition-all focus-within:bg-white/8 focus-within:border-indigo-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] ${errors.Email ? 'border-red-500/70' : 'border-white/10'}`}>
                                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="you@example.com"
                                    {...register("Email", { required: "Email is required" })}
                                    className="bg-transparent text-white placeholder-slate-500 outline-none w-full text-sm"
                                />
                            </div>
                            {errors.Email && <p className="text-red-400 text-xs font-medium pl-1">{errors.Email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                            <div className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3 transition-all focus-within:bg-white/8 focus-within:border-indigo-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] ${errors.password ? 'border-red-500/70' : 'border-white/10'}`}>
                                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password", { required: "Password is required" })}
                                    className="bg-transparent text-white placeholder-slate-500 outline-none w-full text-sm"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-white transition-colors">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs font-medium pl-1">{errors.password.message}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-slate-400 text-sm mt-6">
                        Don't have an account?{' '}
                        <Link to="/Signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                            Create account
                        </Link>
                    </p>
                </div>

                {/* Footer Signature */}
                <div className="text-center mt-8 space-y-1.5 opacity-80 hover:opacity-100 transition-opacity">
                    <p className="text-slate-600 text-xs tracking-[0.2em] uppercase font-semibold">Secure · Real-time · Private</p>
                    <p className="text-indigo-900/60 text-[10px] tracking-[0.15em] uppercase font-medium">
                        Engineered by <span className="text-indigo-400/80 font-bold">Ritik Jain</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
