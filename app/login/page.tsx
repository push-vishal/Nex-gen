'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';
import {
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  TrendingUp,
  Award,
  Flame,
  Sparkles,
  Zap,
  BarChart3,
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clear errors when switching modes
  useEffect(() => {
    setErrorMsg(null);
  }, [mode]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setErrorMsg('All fields are required.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setErrorMsg('Signup successful! Please check your email or sign in directly.');
      setLoading(false);
      setMode('signin');
    }
  };

  // Stat items shown on the left panel
  const statItems = [
    { icon: BookOpen, label: '250+', desc: 'Premium Courses', color: 'text-purple-400' },
    { icon: TrendingUp, label: '15K+', desc: 'Active Learners', color: 'text-cyan-400' },
    { icon: Award, label: '92%', desc: 'Completion Rate', color: 'text-emerald-400' },
    { icon: Flame, label: '24/7', desc: 'AI Mentor Access', color: 'text-orange-400' },
  ];

  // Floating feature badges
  const features = [
    'Progress Tracking',
    'Smart Streaks',
    'AI Recommendations',
    'XP & Badges',
    'Analytics Dashboard',
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-white flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(34,211,238,0.04)_0%,transparent_70%)]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(168,85,247,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-20">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </button>

        <Logo showText={true} showTagline={false} size="sm" />
      </header>

      {/* Main Layout: Two Column Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 lg:py-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 relative z-10">
        {/* ── LEFT COLUMN: Branding & Social Proof ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col gap-10 py-12"
        >
          {/* Hero Logo large */}
          <Logo showText={true} showTagline={true} size="xl" />

          {/* Big headline */}
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.1]">
              Your Learning{' '}
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Journey
              </span>
              <br />
              Starts Here
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Join thousands of students mastering skills with AI-powered guidance, personalized dashboards, and gamified progress tracking.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {statItems.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/[0.04] rounded-2xl group hover:border-white/[0.08] transition-colors"
                >
                  <div className={`p-2.5 bg-white/[0.04] rounded-xl ${stat.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-black text-white leading-none">{stat.label}</span>
                    <span className="text-[10px] font-semibold text-zinc-500 mt-0.5">{stat.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-2">
            {features.map((f, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.06 }}
                className="px-3 py-1.5 bg-purple-500/[0.06] border border-purple-500/[0.1] text-purple-300 text-[10px] font-bold uppercase tracking-wider rounded-full"
              >
                {f}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: Auth Form Card ── */}
        <div className="flex justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[420px] relative"
          >
            {/* Decorative glow behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 rounded-[2rem] blur-xl pointer-events-none" />

            <div className="relative bg-[#0A0A1B]/80 border border-white/[0.06] backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-6">
                <Logo showText={true} showTagline={false} size="md" />
              </div>

              {/* Card Header */}
              <div className="text-center mb-7">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-xs text-zinc-500 mt-1.5 font-medium">
                  {mode === 'signin'
                    ? 'Sign in to access your personalized workspace'
                    : 'Start your learning journey with NexGen Learn'}
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="relative bg-white/[0.03] p-1 border border-white/[0.04] rounded-xl mb-6 flex items-center">
                <button
                  onClick={() => setMode('signin')}
                  className={`flex-1 py-2.5 text-center text-xs font-bold rounded-lg transition-colors relative z-10 cursor-pointer ${
                    mode === 'signin' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2.5 text-center text-xs font-bold rounded-lg transition-colors relative z-10 cursor-pointer ${
                    mode === 'signup' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Sign Up
                </button>

                <motion.div
                  layoutId="authTab"
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg -z-0 shadow-lg shadow-purple-950/30"
                  style={{
                    left: mode === 'signin' ? '4px' : 'calc(50% + 2px)',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              </div>

              {/* Error/Success Messages */}
              <AnimatePresence mode="wait">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-start gap-2.5 p-3.5 rounded-xl mb-5 text-xs border font-medium leading-relaxed ${
                      errorMsg.includes('successful')
                        ? 'bg-emerald-500/10 border-emerald-500/15 text-emerald-300'
                        : 'bg-red-500/10 border-red-500/15 text-red-300'
                    }`}
                  >
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-1.5"
                    >
                      <label className="text-[11px] text-zinc-400 font-semibold pl-1" htmlFor="fullName">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <User size={15} className="absolute left-4 text-zinc-600" />
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] focus:border-purple-500/40 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-semibold pl-1" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-4 text-zinc-600" />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] focus:border-purple-500/40 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-semibold pl-1" htmlFor="password">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock size={15} className="absolute left-4 text-zinc-600" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] focus:border-purple-500/40 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-950/25 cursor-pointer active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : mode === 'signin' ? (
                    <>
                      <LogIn size={16} />
                      <span>Sign In</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/[0.04]" />
                <span className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-white/[0.04]" />
              </div>

              {/* Switch mode prompt */}
              <p className="text-center text-xs text-zinc-500">
                {mode === 'signin' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-purple-400 hover:text-purple-300 font-bold cursor-pointer transition-colors"
                    >
                      Sign up for free
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-purple-400 hover:text-purple-300 font-bold cursor-pointer transition-colors"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-medium">
                  <Zap size={10} className="text-emerald-500" />
                  <span>256-bit SSL</span>
                </div>
                <div className="w-px h-3 bg-white/[0.06]" />
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-medium">
                  <Sparkles size={10} className="text-purple-500" />
                  <span>AI-Powered</span>
                </div>
                <div className="w-px h-3 bg-white/[0.06]" />
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-medium">
                  <BarChart3 size={10} className="text-cyan-500" />
                  <span>Real-time Analytics</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-[10px] text-zinc-600 relative z-20 font-medium">
        © 2026 NexGen Learn. All rights reserved.
      </footer>
    </div>
  );
}
