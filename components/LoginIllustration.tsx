'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Settings, Sparkles, Flame, GraduationCap } from 'lucide-react';

export default function LoginIllustration() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none">
      {/* Decorative background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-purple/10 blur-3xl" />
      <div className="absolute w-60 h-60 rounded-full bg-brand-cyan/5 blur-3xl -translate-y-12" />

      {/* Main floating console dashboard mockup */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        className="w-[85%] aspect-[1.4] rounded-2xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl backdrop-blur-md relative z-10"
      >
        {/* Console Header Bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="w-24 h-1.5 bg-white/5 rounded-full" />
          <div className="w-4 h-4 rounded bg-white/5" />
        </div>

        {/* Dashboard Mock Content */}
        <div className="grid grid-cols-3 gap-3 h-[calc(100%-2rem)]">
          <div className="col-span-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-16 h-3 bg-brand-purple/20 border border-brand-purple/20 rounded" />
              <div className="w-full h-4 bg-white/10 rounded" />
              <div className="w-3/4 h-2.5 bg-white/5 rounded" />
            </div>

            {/* Custom mini chart */}
            <div className="h-16 flex items-end gap-1 border-t border-white/5 pt-3">
              {[35, 60, 45, 80, 50, 95, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                  className="flex-1 bg-gradient-to-t from-brand-purple to-brand-cyan rounded-t-sm"
                />
              ))}
            </div>
          </div>

          <div className="col-span-1 flex flex-col justify-between items-center bg-white/5 border border-white/5 rounded-xl p-2.5">
            <GraduationCap size={24} className="text-brand-cyan animate-pulse" />
            <div className="w-full space-y-1.5">
              <div className="w-full h-1 bg-white/10 rounded-full" />
              <div className="w-full h-2 bg-brand-cyan/20 rounded" />
            </div>
            <span className="text-[9px] font-bold text-zinc-400">92% Target</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Book Component (Top Right) */}
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
        className="absolute top-[8%] right-[8%] z-20 p-3 bg-zinc-900/90 border border-white/10 rounded-2xl shadow-xl flex items-center justify-center text-orange-400 backdrop-blur-sm"
      >
        <BookOpen size={24} />
      </motion.div>

      {/* Floating Video Player Component (Bottom Right) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
        className="absolute bottom-[10%] right-[3%] z-20 p-3 bg-zinc-900/90 border border-white/10 rounded-2xl shadow-xl flex items-center justify-center text-brand-cyan backdrop-blur-sm"
      >
        <Video size={24} />
      </motion.div>

      {/* Floating Settings/Cog Component (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 6, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
        className="absolute bottom-[8%] left-[8%] z-20 p-3 bg-zinc-900/90 border border-white/10 rounded-2xl shadow-xl flex items-center justify-center text-zinc-400 backdrop-blur-sm"
      >
        <Settings size={22} />
      </motion.div>

      {/* Floating Flame Streak Component (Top Left) */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, delay: 1.5 }}
        className="absolute top-[12%] left-[4%] z-20 p-3 bg-zinc-900/90 border border-white/10 rounded-2xl shadow-xl flex items-center justify-center text-red-500 backdrop-blur-sm"
      >
        <Flame size={22} className="animate-pulse" />
      </motion.div>

      {/* Sparkles particle detail */}
      <div className="absolute top-[35%] left-[20%] text-brand-purple/40 animate-pulse">
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-[40%] right-[20%] text-brand-cyan/40 animate-pulse">
        <Sparkles size={14} />
      </div>
    </div>
  );
}
