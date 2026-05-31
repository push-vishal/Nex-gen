'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Flame, Award, ChevronRight } from 'lucide-react';

interface HeroTileProps {
  userName?: string;
}

export default function HeroTile({ userName = 'John' }: HeroTileProps) {
  const [streakCount, setStreakCount] = useState(7);
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerStreakBonus = () => {
    setStreakCount((prev) => prev + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Entrance slide variant
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ 
        scale: 1.015,
        boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.15)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative lg:col-span-3 md:col-span-2 col-span-1 min-h-[220px] rounded-2xl bg-card-bg backdrop-blur-md border border-card-border p-6 sm:p-8 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group"
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/5 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-purple/10 blur-3xl group-hover:bg-brand-purple/15 transition-colors duration-500 pointer-events-none" />

      {/* Main Greeting Info */}
      <div className="relative z-10 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-brand-purple text-xs font-semibold mb-4">
          <Award size={14} />
          <span>Level 4 Scholar</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Welcome back, <span className="bg-gradient-to-r from-brand-purple via-pink-400 to-brand-cyan bg-clip-text text-transparent">{userName}</span>!
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg">
          You are on a <span className="text-zinc-200 font-semibold">{streakCount}-day learning streak</span>. Finish today's exercises to lock in your next milestone!
        </p>

        <div className="mt-6 flex items-center gap-2 text-brand-purple group-hover:text-purple-300 font-semibold text-sm transition-colors duration-200">
          <span>Resume: Advanced React Patterns</span>
          <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>

      {/* Interactive Streak Indicator */}
      <div className="relative z-10 flex items-center gap-4 bg-white/5 border border-white/5 p-4 sm:p-5 rounded-2xl md:self-stretch justify-center shrink-0 hover:bg-white/10 transition-colors duration-200 select-none" onClick={triggerStreakBonus}>
        {/* Confetti Micro-animation */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full h-full relative">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-brand-purple"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg) translate(25px)`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          animate={{ scale: showConfetti ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-orange-600/20 to-brand-purple/20 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-lg shadow-orange-950/20"
        >
          <Flame size={28} className="animate-pulse" />
          {/* Sparkle border indicator */}
          <div className="absolute inset-0 rounded-full border border-dashed border-orange-400/40 animate-[spin_20s_linear_infinite]" />
        </motion.div>

        <div className="flex flex-col text-left">
          <span className="text-2xl font-black text-white leading-none">{streakCount} Days</span>
          <span className="text-xs text-zinc-400 mt-1 font-medium uppercase tracking-wider">Active Streak</span>
          
          {/* Days of the week row */}
          <div className="flex gap-1.5 mt-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
              // Highlight M-F (0-4) as completed for 7-day, or customize based on streak
              const isCompleted = idx < (streakCount % 7 || 7);
              return (
                <div 
                  key={idx}
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold border transition-colors duration-300 ${
                    isCompleted 
                      ? 'bg-brand-purple/25 border-brand-purple/40 text-brand-purple' 
                      : 'bg-zinc-900 border-white/5 text-zinc-600'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
