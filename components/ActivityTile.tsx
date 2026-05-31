'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Activity, Flame, Calendar, Clock } from 'lucide-react';
import { ActivityDay } from '@/lib/types';

interface ActivityTileProps {
  totalHours?: number;
  targetPercentage?: number;
  rankPercentage?: number;
}

export default function ActivityTile({
  totalHours = 84.2,
  targetPercentage = 92,
  rankPercentage = 5,
}: ActivityTileProps) {
  const [hoveredDay, setHoveredDay] = useState<{ day: ActivityDay; x: number; y: number } | null>(null);

  // Generate 24 weeks of mock activity data
  const generateMockActivity = (): ActivityDay[] => {
    const data: ActivityDay[] = [];
    const today = new Date();
    // 24 weeks * 7 days
    const totalDays = 24 * 7;
    
    for (let i = totalDays - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Determine pseudo-random levels
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      let count = 0;
      
      const rand = Math.random();
      if (rand > 0.45) {
        level = Math.floor(Math.random() * 4 + 1) as 0 | 1 | 2 | 3 | 4;
        count = level * 45 + Math.floor(Math.random() * 30); // in minutes
      }
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count,
        level,
      });
    }
    return data;
  };

  const activityData = generateMockActivity();
  // Chunk into 24 weeks of 7 days
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  // Get color for activity levels
  const getLevelClass = (level: number) => {
    switch (level) {
      case 1: return 'bg-purple-950/40 border-purple-500/20';
      case 2: return 'bg-purple-800/40 border-purple-500/30';
      case 3: return 'bg-purple-600/50 border-purple-400/30';
      case 4: return 'bg-brand-purple border-purple-300/40 shadow-sm shadow-purple-500/20';
      default: return 'bg-zinc-900 border-white/5';
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: ActivityDay) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
    
    if (parentRect) {
      setHoveredDay({
        day,
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 48,
      });
    }
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
        boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative lg:col-span-2 md:col-span-2 col-span-1 rounded-2xl bg-card-bg backdrop-blur-md border border-card-border p-6 flex flex-col justify-between overflow-hidden cursor-pointer group"
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-purple-900/5 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/15 rounded-xl text-brand-cyan">
            <Activity size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Learning Consistency</h3>
            <p className="text-xs text-zinc-400">Activity heatmap for the last 24 weeks</p>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-zinc-900 border border-white/5" />
          <div className="w-2.5 h-2.5 rounded bg-purple-950/40 border border-purple-500/20" />
          <div className="w-2.5 h-2.5 rounded bg-purple-800/40 border border-purple-500/30" />
          <div className="w-2.5 h-2.5 rounded bg-purple-600/50 border border-purple-400/30" />
          <div className="w-2.5 h-2.5 rounded bg-brand-purple border border-purple-300/40" />
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid Section */}
      <div className="relative w-full my-auto py-2 z-10">
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex gap-[4px] min-w-max select-none">
            {/* Days of Week Labels */}
            <div className="flex flex-col justify-between text-[9px] text-zinc-600 font-bold uppercase pr-1.5 h-[98px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid Columns */}
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[4px]">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3 h-3 rounded-[3px] border transition-all duration-300 hover:scale-125 cursor-pointer relative ${getLevelClass(day.level)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 bg-zinc-950/95 border border-purple-500/30 rounded-lg p-2.5 text-xs text-white shadow-xl shadow-black/80 pointer-events-none flex flex-col gap-1 w-44"
              style={{
                left: `${hoveredDay.x}px`,
                top: `${hoveredDay.y}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="flex items-center gap-1.5 font-bold text-zinc-300">
                <Calendar size={12} className="text-brand-purple" />
                <span>{hoveredDay.day.date}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Clock size={12} className="text-brand-cyan" />
                <span>
                  {hoveredDay.day.count > 0
                    ? `${(hoveredDay.day.count / 60).toFixed(1)} hrs study time`
                    : 'No study recorded'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-4 relative z-10">
        <div className="flex flex-col text-left">
          <span className="text-xs text-zinc-400">Total Hours</span>
          <span className="text-base sm:text-lg font-black text-white mt-0.5">{totalHours}h</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs text-zinc-400">Weekly Target</span>
          <span className="text-base sm:text-lg font-black text-brand-cyan mt-0.5">{targetPercentage}%</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs text-zinc-400">Current Rank</span>
          <span className="text-base sm:text-lg font-black text-brand-purple mt-0.5">Top {rankPercentage}%</span>
        </div>
      </div>
    </motion.article>
  );
}
