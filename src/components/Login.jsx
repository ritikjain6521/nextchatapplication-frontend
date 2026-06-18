import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider.jsx';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, MessageCircle, Shield, Zap, Users } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Real-time', desc: 'Instant message delivery' },
  { icon: Shield, title: 'Encrypted', desc: 'End-to-end privacy' },
  { icon: Users, title: 'Groups', desc: 'Chat with everyone' },
];

function Login() {
    const [authUser, setUser] = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/User/login", { email: data.Email, password: data.password });
            if (res.data) {
                if (res.data.token) localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user || res.data));
                setUser(res.data.user || res.data);
            }
        } catch (error) {
            if (error.response) alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Left Decorative Panel */}
            <div className="auth-panel-left" style={{
                background: 'linear-gradient(135deg, #0e0f1a 0%, #1a1040 50%, #0e0f1a 100%)',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Animated blobs */}
                <div style={{
                    position: 'absolute', top: '-10%', left: '-10%',
                    width: '60%', height: '60%', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,106,247,0.25) 0%, transparent 70%)',
                    animation: 'blob 8s infinite ease-in-out',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-10%', right: '-10%',
                    width: '60%', height: '60%', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                    animation: 'blob 8s infinite ease-in-out',
                    animationDelay: '3s',
                }} />
                {/* Grid pattern */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(rgba(124,106,247,0.08) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                    pointerEvents: 'none',
                }} />

                {/* Content */}
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
                        NexChat
                    </h2>
                    <p style={{ color: '#8b8fa8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        Connect instantly. Chat privately.<br />Stay in sync, always.
                    </p>

                    {/* Feature cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div key={title} style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '0.875rem 1.25rem', borderRadius: '14px',
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
            </div>

            {/* Right Form Panel */}
            <div className="auth-panel-right">
                <div style={{ width: '100%', maxWidth: '420px' }}>
                    {/* Mobile Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
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
                                Welcome back
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
                                Sign in to NexChat
                            </p>
                        </div>
                    </div>

                    {/* Social / Divider hint */}
                    <div style={{
                        padding: '1rem 1.25rem', borderRadius: '14px', marginBottom: '1.5rem',
                        background: 'rgba(124,106,247,0.06)', border: '1px solid rgba(124,106,247,0.15)',
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                    }}>
                        <Sparkles size={16} color="#a78bfa" />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
                            Your messages are end-to-end secured
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                                Email Address
                            </label>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                background: 'var(--input-bg)', border: `1px solid ${errors.Email ? '#ef4444' : 'var(--border-medium)'}`,
                                borderRadius: '12px', padding: '0.75rem 1rem', transition: 'all 0.2s',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = 'rgba(124,106,247,0.6)'}
                            onBlur={e => e.currentTarget.style.borderColor = errors.Email ? '#ef4444' : 'var(--border-medium)'}
                            >
                                <Mail size={16} color="var(--text-muted)" />
                                <input
                                    type="text"
                                    placeholder="you@example.com"
                                    {...register("Email", { required: "Email is required" })}
                                    style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--text-primary)' }}
                                />
                            </div>
                            {errors.Email && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.Email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                                Password
                            </label>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                background: 'var(--input-bg)', border: `1px solid ${errors.password ? '#ef4444' : 'var(--border-medium)'}`,
                                borderRadius: '12px', padding: '0.75rem 1rem', transition: 'all 0.2s',
                            }}>
                                <Lock size={16} color="var(--text-muted)" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password", { required: "Password is required" })}
                                    style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--text-primary)', flex: 1 }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password.message}</p>}
                        </div>

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
                                transition: 'all 0.2s', marginTop: '0.25rem',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,106,247,0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,106,247,0.35)'; }}
                        >
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In →'}
                        </button>
                    </form>

                    {/* Footer */}
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
                        Don't have an account?{' '}
                        <Link to="/Signup" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>
                            Create one free →
                        </Link>
                    </p>

                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2rem' }}>
                        Secure · Real-time · Private · Engineered by <span style={{ color: '#a78bfa' }}>Ritik Jain</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
