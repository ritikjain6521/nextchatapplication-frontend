import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, MessageCircle, Loader2, CheckCircle2, Sparkles, Shield, Zap, Users } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Real-time Messaging', desc: 'Instant, zero-delay delivery' },
  { icon: Shield, title: 'Private & Secure', desc: 'Your data stays yours' },
  { icon: Users, title: 'Groups & Channels', desc: 'Chat at any scale' },
];

function Signup() {
    const [authUser, setUser] = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const password = watch("password", "");

    const getPasswordStrength = (pwd) => {
        if (!pwd) return { label: '', color: '#475569', pct: 0 };
        if (pwd.length < 6) return { label: 'Weak', color: '#ef4444', pct: 33 };
        if (pwd.length < 10) return { label: 'Good', color: '#f59e0b', pct: 66 };
        return { label: 'Strong', color: '#22c55e', pct: 100 };
    };

    const strength = getPasswordStrength(password);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/User/signup", {
                fullname: data.fullname,
                email: data.Email,
                password: data.password,
                confirmPassword: data.confirmPassword
            });
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data));
                setUser(res.data);
            }
        } catch (error) {
            if (error.response) alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (hasError) => ({
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: 'var(--input-bg)',
        border: `1px solid ${hasError ? '#ef4444' : 'var(--border-medium)'}`,
        borderRadius: '12px', padding: '0.75rem 1rem', transition: 'all 0.2s',
    });

    return (
        <div className="auth-page" style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowY: 'auto' }}>
            {/* Left Decorative Panel */}
            <div className="auth-panel-left" style={{
                background: 'linear-gradient(135deg, #0e0f1a 0%, #160f35 50%, #0e0f1a 100%)',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: '-10%', right: '-10%',
                    width: '60%', height: '60%', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,106,247,0.22) 0%, transparent 70%)',
                    animation: 'blob 8s infinite ease-in-out',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-10%', left: '-10%',
                    width: '60%', height: '60%', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
                    animation: 'blob 8s infinite ease-in-out',
                    animationDelay: '3s',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(rgba(124,106,247,0.07) 1px, transparent 1px)',
                    backgroundSize: '32px 32px', pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '380px' }}>
                    <div style={{
                        width: '72px', height: '72px', borderRadius: '20px',
                        background: 'linear-gradient(135deg, #7c6af7, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 0 40px rgba(124,106,247,0.5)',
                    }}>
                        <MessageCircle size={36} color="white" />
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f1f1f5', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
                        Join NexChat
                    </h2>
                    <p style={{ color: '#8b8fa8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        Free forever. No ads. No nonsense.<br />Just great conversations.
                    </p>

                    {features.map(({ icon: Icon, title, desc }) => (
                        <div key={title} style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '0.875rem 1.25rem', borderRadius: '14px', marginBottom: '0.75rem',
                            background: 'rgba(124,106,247,0.08)',
                            border: '1px solid rgba(124,106,247,0.15)',
                            textAlign: 'left',
                        }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                                background: 'linear-gradient(135deg, rgba(124,106,247,0.3), rgba(139,92,246,0.2))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Icon size={16} color="#a78bfa" />
                            </div>
                            <div>
                                <p style={{ fontWeight: 600, color: '#f1f1f5', fontSize: '0.875rem', margin: 0 }}>{title}</p>
                                <p style={{ color: '#8b8fa8', fontSize: '0.75rem', margin: 0 }}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="auth-panel-right" style={{ overflowY: 'auto', alignItems: 'flex-start', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <div style={{ width: '100%', maxWidth: '420px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '14px',
                            background: 'linear-gradient(135deg, #7c6af7, #8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(124,106,247,0.4)',
                        }}>
                            <MessageCircle size={22} color="white" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                                Create account
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
                                It only takes 30 seconds
                            </p>
                        </div>
                    </div>

                    {/* Hint card */}
                    <div style={{
                        padding: '0.875rem 1.25rem', borderRadius: '14px', marginBottom: '1.5rem',
                        background: 'rgba(124,106,247,0.06)', border: '1px solid rgba(124,106,247,0.15)',
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                    }}>
                        <Sparkles size={16} color="#a78bfa" />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
                            Free account · No credit card needed
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Full Name */}
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Full Name</label>
                            <div style={inputStyle(errors.fullname)}>
                                <User size={16} color="var(--text-muted)" />
                                <input
                                    type="text" placeholder="John Doe"
                                    {...register("fullname", { required: "Full name is required" })}
                                    style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.875rem', color: 'var(--text-primary)' }}
                                />
                            </div>
                            {errors.fullname && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.2rem' }}>{errors.fullname.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Email Address</label>
                            <div style={inputStyle(errors.Email)}>
                                <Mail size={16} color="var(--text-muted)" />
                                <input
                                    type="text" placeholder="you@example.com"
                                    {...register("Email", { required: "Email is required" })}
                                    style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.875rem', color: 'var(--text-primary)' }}
                                />
                            </div>
                            {errors.Email && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.2rem' }}>{errors.Email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Password</label>
                            <div style={inputStyle(errors.password)}>
                                <Lock size={16} color="var(--text-muted)" />
                                <input
                                    type={showPassword ? "text" : "password"} placeholder="Min. 6 characters"
                                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                                    style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem', color: 'var(--text-primary)' }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {password && (
                                <div style={{ marginTop: '0.5rem', padding: '0 2px' }}>
                                    <div style={{ height: '3px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden', marginBottom: '4px' }}>
                                        <div style={{ height: '100%', width: `${strength.pct}%`, background: strength.color, borderRadius: '4px', transition: 'all 0.4s ease' }} />
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: strength.color, fontWeight: 600 }}>
                                        {strength.label ? `Password strength: ${strength.label}` : ''}
                                    </span>
                                </div>
                            )}
                            {errors.password && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.2rem' }}>{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Confirm Password</label>
                            <div style={inputStyle(errors.confirmPassword)}>
                                <Lock size={16} color="var(--text-muted)" />
                                <input
                                    type={showConfirm ? "text" : "password"} placeholder="Re-enter password"
                                    {...register("confirmPassword", { required: "Please confirm your password", validate: v => v === password || "Passwords do not match" })}
                                    style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem', color: 'var(--text-primary)' }}
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.2rem' }}>{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Terms */}
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                            By signing up you agree to our{' '}
                            <span style={{ color: '#a78bfa', cursor: 'pointer' }}>Terms</span> and{' '}
                            <span style={{ color: '#a78bfa', cursor: 'pointer' }}>Privacy Policy</span>.
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '0.875rem', borderRadius: '12px',
                                background: loading ? 'rgba(124,106,247,0.5)' : 'linear-gradient(135deg, #7c6af7, #6366f1)',
                                color: 'white', fontWeight: 700, fontSize: '0.9rem',
                                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                                boxShadow: '0 4px 20px rgba(124,106,247,0.35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,106,247,0.5)'; }}}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,106,247,0.35)'; }}
                        >
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : <><CheckCircle2 size={16} /> Create Account →</>}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
                        Already have an account?{' '}
                        <Link to="/Login" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>
                            Sign in →
                        </Link>
                    </p>

                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '1.5rem' }}>
                        Secure · Real-time · Private · Engineered by <span style={{ color: '#a78bfa' }}>Ritik Jain</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
