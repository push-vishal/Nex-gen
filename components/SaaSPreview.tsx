'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, BookOpen, Zap, Target, Mail, Lock, LogIn } from 'lucide-react';

export default function SaaSPreview() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-purple/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Left Column: Card 1 (Learning Overview) & Card 2 (Modern Login Panel) */}
      <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
        
        {/* Card 1: Learning Overview */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(168, 85, 247, 0.25)' }}
          className="bg-zinc-950/45 border border-white/5 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between h-fit relative group cursor-pointer transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400">Learning Overview</h4>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Stat 1 */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-3.5">
              <div className="p-2 bg-orange-500/10 border border-orange-500/15 rounded-xl text-orange-500">
                <Flame size={18} className="animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-white">7 Days</span>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Streak</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-3.5">
              <div className="p-2 bg-purple-500/10 border border-purple-500/15 rounded-xl text-brand-purple">
                <BookOpen size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-white">4 Active</span>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Courses</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-3.5">
              <div className="p-2 bg-yellow-500/10 border border-yellow-500/15 rounded-xl text-yellow-500">
                <Zap size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-white">1,250 XP</span>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Earned</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-3.5">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/15 rounded-xl text-brand-cyan">
                <Target size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-white">82%</span>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Weekly Goal</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Modern Login Panel (Mockup) */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(168, 85, 247, 0.25)' }}
          className="bg-zinc-950/45 border border-white/5 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between relative group transition-all duration-300"
        >
          <div className="text-left mb-5">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400">Interactive Gate</h4>
            <p className="text-[10px] text-zinc-600 font-semibold mt-1">Single-Sign On Gateway Preview</p>
          </div>

          <div className="space-y-3.5 opacity-80 pointer-events-none select-none">
            <div className="relative flex items-center">
              <Mail size={14} className="absolute left-3.5 text-zinc-600" />
              <div className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/5 rounded-xl text-xs text-zinc-600">
                name@domain.com
              </div>
            </div>

            <div className="relative flex items-center">
              <Lock size={14} className="absolute left-3.5 text-zinc-600" />
              <div className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/5 rounded-xl text-xs text-zinc-600">
                ••••••••
              </div>
            </div>

            <div className="w-full py-2.5 bg-brand-purple/20 border border-brand-purple/20 text-brand-purple text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
              <LogIn size={14} />
              <span>Sign In</span>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-3 text-[10px] text-zinc-700 font-bold uppercase tracking-wider">Or</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="py-2 border border-white/5 bg-black/40 rounded-xl text-[10px] font-bold text-zinc-500 flex items-center justify-center gap-1.5">
                <svg className="w-3 h-3 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-7.995 0-4.417 3.53-7.996 7.859-7.996 2.463 0 4.11 1.025 5.05 1.926l2.466-2.37C17.72 1.48 15.22 0 12.24 0 5.58 0 0 5.373 0 12s5.58 12 12.24 12c6.96 0 11.57-4.84 11.57-11.72 0-.795-.085-1.4-.195-1.995H12.24z"/>
                </svg>
                <span>Google</span>
              </div>
              <div className="py-2 border border-white/5 bg-black/40 rounded-xl text-[10px] font-bold text-zinc-500 flex items-center justify-center gap-1.5">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: SaaS Dashboard Mockup Console (With dynamic SVG lines) */}
      <motion.div
        whileHover={{ borderColor: 'rgba(168, 85, 247, 0.2)' }}
        className="lg:col-span-7 bg-zinc-950/45 border border-white/5 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 relative"
      >
        {/* Glow detail */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />

        {/* Console title */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-300">Live Analytics Panel</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-10 h-4 bg-white/5 border border-white/5 rounded-full" />
            <div className="w-4 h-4 bg-white/5 border border-white/5 rounded" />
          </div>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          {/* Study hours chart (spans 3 columns) */}
          <div className="col-span-3 bg-black/45 border border-white/5 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start mb-2">
              <div className="text-left">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Study Intensity</span>
                <h5 className="text-sm font-black text-white mt-0.5">Weekly Progress (Hours)</h5>
              </div>
              <span className="text-xs font-bold text-brand-cyan px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                +14.5%
              </span>
            </div>

            {/* Glowing SVG Chart */}
            <div className="flex-1 w-full relative min-h-[80px]">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area path */}
                <path
                  d="M 0 80 Q 50 40, 100 65 T 200 20 T 300 10 L 300 100 L 0 100 Z"
                  fill="url(#chart-glow)"
                />
                {/* Main line path */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  d="M 0 80 Q 50 40, 100 65 T 200 20 T 300 10"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Accent dots */}
                <circle cx="100" cy="65" r="4.5" fill="#22D3EE" stroke="#050816" strokeWidth="1.5" />
                <circle cx="200" cy="20" r="4.5" fill="#8B5CF6" stroke="#050816" strokeWidth="1.5" />
                <circle cx="300" cy="10" r="4.5" fill="#22D3EE" stroke="#050816" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Completion Rate wheel (spans 1 col) */}
          <div className="col-span-1 bg-black/45 border border-white/5 rounded-2xl p-3 flex flex-col justify-between items-center text-center">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Completion</span>
            
            {/* SVG circle percentage */}
            <div className="relative w-14 h-14 flex items-center justify-center my-1.5">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#22D3EE" strokeWidth="3" strokeDasharray="92 100" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[10px] font-black text-white">92%</span>
            </div>
            
            <span className="text-[9px] font-bold text-zinc-400">Excellent</span>
          </div>

          {/* XP Progress indicator (spans 2 cols) */}
          <div className="col-span-2 bg-black/45 border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between text-left">
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Target Level</span>
              <h5 className="text-xs font-black text-white mt-0.5">Scholar Tier 4</h5>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-semibold text-zinc-400">
                <span>XP earned: 1,250</span>
                <span>Goal: 1,500</span>
              </div>
              <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                <div className="h-full w-[83%] bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
