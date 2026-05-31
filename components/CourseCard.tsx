'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { title, progress, icon_name } = course;

  // Dynamically resolve the Lucide icon from its name string
  const renderIcon = (name: string) => {
    const IconComponent = (LucideIcons as any)[name];
    if (IconComponent) {
      return <IconComponent size={22} className="text-brand-purple group-hover:scale-110 transition-transform duration-300" />;
    }
    return <LucideIcons.BookOpen size={22} className="text-brand-purple" />;
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
        scale: 1.02,
        borderColor: 'rgba(168, 85, 247, 0.25)',
        boxShadow: '0 8px 24px -8px rgba(168, 85, 247, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative col-span-1 rounded-2xl bg-card-bg backdrop-blur-md border border-card-border p-6 flex flex-col justify-between min-h-[190px] overflow-hidden group cursor-pointer"
    >
      {/* Background Gradient Mesh / Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tr from-brand-purple/5 to-transparent blur-2xl group-hover:from-brand-purple/10 transition-colors duration-500 pointer-events-none" />

      {/* Top Header section */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="p-3 bg-purple-500/10 border border-purple-500/15 rounded-xl flex items-center justify-center shrink-0">
            {renderIcon(icon_name)}
          </div>
          <span className="text-[10px] font-semibold text-brand-purple px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
            ACTIVE
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-2 leading-snug group-hover:text-purple-200 transition-colors duration-200">
          {title}
        </h3>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 mt-6">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <span className="text-zinc-400">Progress</span>
          <span className="text-white bg-white/5 px-2 py-0.5 rounded-full">{progress}%</span>
        </div>

        {/* Custom Progress Bar Track */}
        <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
          {/* Animated Progress Bar Fill */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            className="h-full bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan rounded-full"
          />
        </div>
      </div>
    </motion.article>
  );
}
