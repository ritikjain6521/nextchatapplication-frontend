import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, Loader2, AlertCircle, ShieldAlert } from 'lucide-react';

function AdminLogin() {
  const [, setUser] = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.post('/api/User/admin-login', {
        email: data.email,
        password: data.password,
      });
      if (res.data?.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate('/admin');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #07070f 0%, #0e0b1f 50%, #07070f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '15%', left: '15%',
        width: '40vw', height: '40vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%',
        width: '35vw', height: '35vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px', pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '440px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 40px rgba(245,158,11,0.4)',
          }}>
            <ShieldAlert size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#f1f1f5', margin: '0 0 0.5rem' }}>
            Admin Portal
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Authorized personnel only. All access is logged.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(18,18,26,0.85)',
          border: '1px solid rgba(245,158,11,0.15)',
          borderRadius: '24px',
          padding: '2rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.05)',
        }}>
          {/* Error message */}
          {errorMsg && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '12px', padding: '0.75rem 1rem', marginBottom: '1.25rem',
            }}>
              <AlertCircle size={15} color="#ef4444" />
              <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#6b7280', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                Admin Email
              </label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '12px', padding: '0.75rem 1rem',
              }}>
                <Mail size={15} color="#6b7280" />
                <input
                  type="email"
                  placeholder="admin@nexchat.com"
                  {...register('email', { required: 'Email is required' })}
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    width: '100%', fontSize: '0.875rem', color: '#f1f1f5',
                  }}
                />
              </div>
              {errors.email && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', color: '#6b7280', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                Admin Password
              </label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${errors.password ? '#ef4444' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '12px', padding: '0.75rem 1rem',
              }}>
                <Lock size={15} color="#6b7280" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  {...register('password', { required: 'Password is required' })}
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    flex: 1, fontSize: '0.875rem', color: '#f1f1f5',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.25rem' }}>{errors.password.message}</p>}
            </div>

            {/* Warning notice */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
              background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: '10px', padding: '0.75rem',
            }}>
              <Shield size={14} color="#f59e0b" style={{ marginTop: '1px', flexShrink: 0 }} />
              <p style={{ color: '#9ca3af', fontSize: '0.72rem', margin: 0, lineHeight: 1.5 }}>
                This portal is restricted to authorized admins. Unauthorized access attempts are recorded and reported.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.9rem', borderRadius: '12px',
                background: loading
                  ? 'rgba(245,158,11,0.4)'
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white', fontWeight: 700, fontSize: '0.9rem',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'all 0.2s',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(245,158,11,0.45)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.3)'; }}
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Authenticating...</>
                : <><ShieldAlert size={16} /> Sign In to Admin Panel</>
              }
            </button>
          </form>
        </div>

        {/* Footer links */}
        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.78rem', marginTop: '1.5rem' }}>
          Not an admin?{' '}
          <Link to="/Login" style={{ color: '#7c6af7', fontWeight: 600, textDecoration: 'none' }}>
            Back to User Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
