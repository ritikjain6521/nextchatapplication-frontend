import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';

function Signup() {
    const [authUser, setUser] = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const password = watch("password", "");

    const validPasswordMatch = (value) => {
        return value === password || "Passwords do not match";
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const userInfo = {
            fullname: data.fullname,
            email: data.Email,
            password: data.password,
            confirmPassword: data.confirmPassword
        };
        try {
            const res = await axios.post("/api/User/signup", userInfo);
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

    // Password strength indicator
    const getPasswordStrength = (pwd) => {
        if (!pwd) return { label: '', color: '', width: '0%' };
        if (pwd.length < 6) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
        if (pwd.length < 10) return { label: 'Good', color: 'bg-yellow-500', width: '66%' };
        return { label: 'Strong', color: 'bg-green-500', width: '100%' };
    };

    const strength = getPasswordStrength(password);

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-[#09090b] overflow-hidden py-8">
            {/* Ambient Background Blobs */}
            <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-600/25 blur-[130px] pointer-events-none animate-blob" />
            <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-purple-600/25 blur-[130px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }} />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">

                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-4">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Create account</h1>
                        <p className="text-slate-400 mt-1.5 text-sm">Join NexChat — it's free forever</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                            <div className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3 transition-all focus-within:border-indigo-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] ${errors.fullname ? 'border-red-500/70' : 'border-white/10'}`}>
                                <User className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("fullname", { required: "Full name is required" })}
                                    className="bg-transparent text-white placeholder-slate-500 outline-none w-full text-sm"
                                />
                            </div>
                            {errors.fullname && <p className="text-red-400 text-xs font-medium pl-1">{errors.fullname.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                            <div className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3 transition-all focus-within:border-indigo-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] ${errors.Email ? 'border-red-500/70' : 'border-white/10'}`}>
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
                            <div className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3 transition-all focus-within:border-indigo-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] ${errors.password ? 'border-red-500/70' : 'border-white/10'}`}>
                                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 6 characters"
                                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                                    className="bg-transparent text-white placeholder-slate-500 outline-none w-full text-sm"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-white transition-colors">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {/* Password Strength Bar */}
                            {password && (
                                <div className="space-y-1 px-1">
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
                                    </div>
                                    <p className="text-xs text-slate-500">Strength: <span className={`font-semibold ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span></p>
                                </div>
                            )}
                            {errors.password && <p className="text-red-400 text-xs font-medium pl-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirm Password</label>
                            <div className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3 transition-all focus-within:border-indigo-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] ${errors.confirmPassword ? 'border-red-500/70' : 'border-white/10'}`}>
                                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    {...register("confirmPassword", { required: "Please confirm your password", validate: validPasswordMatch })}
                                    className="bg-transparent text-white placeholder-slate-500 outline-none w-full text-sm"
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-slate-400 hover:text-white transition-colors">
                                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-400 text-xs font-medium pl-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Terms note */}
                        <p className="text-slate-500 text-xs pl-1">
                            By signing up, you agree to our <span className="text-indigo-400 cursor-pointer hover:underline">Terms</span> and <span className="text-indigo-400 cursor-pointer hover:underline">Privacy Policy</span>.
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>
                            ) : (
                                <><CheckCircle2 className="w-4 h-4" /> Create Account</>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-slate-400 text-sm mt-6">
                        Already have an account?{' '}
                        <Link to="/Login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                            Sign in
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

export default Signup;
