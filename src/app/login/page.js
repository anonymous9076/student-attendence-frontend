'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      toast.success(`Welcome back, ${res.data.user.name}!`);
      router.push('/');
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Authentication failed. Please check your credentials.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/8 blur-3xl rounded-full -mr-72" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-indigo-600/8 blur-3xl rounded-full -ml-72" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/15 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Secure Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Sign in to continue to the Student Management Portal</p>
        </div>

        {/* Card */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40">
          {/* Top gradient accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)' }} />
          
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 border-t-0 p-8 md:p-10">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                  <input 
                    type="email" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/30 transition-all placeholder:text-slate-600" 
                    placeholder="name@university.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center mx-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/30 transition-all placeholder:text-slate-600" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all touch-manipulation"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 group/btn transition-all active:scale-[0.98] disabled:opacity-60 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 mt-2"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom link */}
        {/* <p className="mt-8 text-center text-slate-500 text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-white font-semibold hover:text-blue-400 transition underline underline-offset-4 decoration-white/20 hover:decoration-blue-400">
            Create one
          </Link>
        </p> */}
      </div>
    </div>
  );
}
