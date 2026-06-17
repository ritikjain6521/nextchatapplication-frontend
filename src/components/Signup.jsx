import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, MessageCircle, Loader2, CheckCircle2, Sparkles, Shield, Zap, Users, CreditCard, ChevronDown } from 'lucide-react';

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
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [signupData, setSignupData] = useState(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    const password = watch("password", "");
    const selectedPlan = watch("plan", "Free");

    const getPasswordStrength = (pwd) => {
        if (!pwd) return { label: '', color: '#475569', pct: 0 };
        if (pwd.length < 6) return { label: 'Weak', color: '#ef4444', pct: 33 };
        if (pwd.length < 10) return { label: 'Good', color: '#f59e0b', pct: 66 };
        return { label: 'Strong', color: '#22c55e', pct: 100 };
    };

    const strength = getPasswordStrength(password);

    const onSubmit = async (data) => {
        if (data.plan !== 'Free') {
            setSignupData(data);
            setShowPaymentModal(true);
            return;
        }
        await processRegistration(data);
    };

    const processRegistration = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/User/signup", {
                fullname: data.fullname,
                email: data.Email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                plan: data.plan
            });
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data.User || res.data));
                setUser(res.data.User || res.data);
            }
        } catch (error) {
            if (error.response) alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const getPlanAmount = (planName) => {
        if (planName === 'Pro') return 299;
        if (planName === 'Team') return 999;
        if (planName === 'Enterprise') return 2999;
        return 0;
    };

    const handleRazorpayPayment = async () => {
        setProcessingPayment(true);
        try {
            // 1. Create order
            const amount = getPlanAmount(signupData.plan);
            const orderRes = await axios.post("/api/payment/create-order", { amount, plan: signupData.plan });
            
            // 2. Open Razorpay Checkout
            const options = {
                key: "rzp_test_T2kPx2zeXlGhhZ", // Public Key
                amount: orderRes.data.amount,
                currency: "INR",
                name: "NexChat",
                description: `Upgrade to ${signupData.plan} Plan`,
                order_id: orderRes.data.id,
                handler: async (response) => {
                    try {
                        // We must register the user first as a 'Free' user so we have a token to verify payment securely
                        // OR we can pass registration data securely. Let's just create the user as Free, log them in, then verify payment to upgrade.
                        const regRes = await axios.post("/api/User/signup", {
                            fullname: signupData.fullname,
                            email: signupData.Email,
                            password: signupData.password,
                            confirmPassword: signupData.confirmPassword,
                            plan: 'Free' // Start as Free, upgraded by verify endpoint
                        });
                        
                        if (regRes.data) {
                            localStorage.setItem("user", JSON.stringify(regRes.data.User || regRes.data));
                            setUser(regRes.data.User || regRes.data);
                            
                            // Now call verify which will upgrade the plan
                            const verifyRes = await axios.post("/api/payment/verify", {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                plan: signupData.plan,
                                amount: amount
                            });

                            // Update user state with new plan
                            if (verifyRes.data.user) {
                                localStorage.setItem("user", JSON.stringify(verifyRes.data.user));
                                setUser(verifyRes.data.user);
                            }
                            
                            setShowPaymentModal(false);
                            // It will naturally redirect since useAuth user is set
                        }
                    } catch (error) {
                        alert(error.response?.data?.message || "Payment verification failed");
                    }
                },
                prefill: {
                    name: signupData.fullname,
                    email: signupData.Email,
                },
                theme: {
                    color: "#7c6af7",
                },
                modal: {
                    ondismiss: () => {
                        setProcessingPayment(false);
                    }
                }
            };
            
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
                alert("Payment Failed: " + response.error.description);
                setProcessingPayment(false);
            });
            rzp.open();

        } catch (error) {
            console.error(error);
            alert("Failed to initiate payment");
            setProcessingPayment(false);
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
                        background: selectedPlan !== 'Free' ? 'rgba(34,197,94,0.1)' : 'rgba(124,106,247,0.06)', 
                        border: `1px solid ${selectedPlan !== 'Free' ? 'rgba(34,197,94,0.3)' : 'rgba(124,106,247,0.15)'}`,
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        transition: 'all 0.3s ease'
                    }}>
                        <Sparkles size={16} color={selectedPlan !== 'Free' ? "#22c55e" : "#a78bfa"} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
                            {selectedPlan === 'Free' ? 'Free account · No credit card needed' : `${selectedPlan} Plan · Proceed to secure payment`}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Plan Selection */}
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Select Plan</label>
                            <div style={{...inputStyle(false), padding: 0, position: 'relative'}}>
                                <select 
                                    {...register("plan")}
                                    style={{ 
                                        background: 'transparent', border: 'none', outline: 'none', width: '100%', 
                                        padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'var(--text-primary)', 
                                        appearance: 'none', cursor: 'pointer' 
                                    }}
                                >
                                    <option value="Free" style={{background: '#160f35', color: '#fff'}}>Free Plan (100 Credits)</option>
                                    <option value="Pro" style={{background: '#160f35', color: '#fff'}}>Pro Plan (₹299/mo - 500 Credits)</option>
                                    <option value="Team" style={{background: '#160f35', color: '#fff'}}>Team Plan (₹999/mo - 2500 Credits)</option>
                                    <option value="Enterprise" style={{background: '#160f35', color: '#fff'}}>Enterprise (₹2999/mo - 10000 Credits)</option>
                                </select>
                                <ChevronDown size={16} color="var(--text-muted)" style={{position: 'absolute', right: '1rem', pointerEvents: 'none'}} />
                            </div>
                        </div>
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

            {/* Mock Payment Gateway Modal */}
            {showPaymentModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
                }}>
                    <div style={{
                        background: 'var(--bg-card)', border: '1px solid var(--border-medium)',
                        borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '400px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'center'
                    }}>
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                        }}>
                            <CreditCard size={30} color="#22c55e" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Secure Checkout</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            You are subscribing to the <strong>{signupData?.plan} Plan</strong>.
                        </p>
                        
                        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'left' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Payment Method</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem' }}>
                                <div style={{width: 30, height: 20, background: '#e5e7eb', borderRadius: 4, display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                                    <span style={{fontSize: 10, color: '#000', fontWeight: 'bold'}}>VISA</span>
                                </div>
                                •••• •••• •••• 4242
                            </div>
                        </div>

                        <button
                            onClick={handleRazorpayPayment}
                            disabled={processingPayment}
                            style={{
                                width: '100%', padding: '0.875rem', borderRadius: '12px',
                                background: processingPayment ? '#4b5563' : '#22c55e', color: 'white', fontWeight: 700,
                                border: 'none', cursor: processingPayment ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {processingPayment ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : <><Lock size={16} /> Pay Securely</>}
                        </button>
                        {!processingPayment && (
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                style={{
                                    marginTop: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)',
                                    fontSize: '0.8rem', cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
