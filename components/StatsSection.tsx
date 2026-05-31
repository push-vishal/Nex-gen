'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, BookOpen, CheckCircle, Cpu } from 'lucide-react';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function Counter({ target, suffix = '', duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const totalFrames = 60;
    const frameDuration = (duration * 1000) / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(end * (progress * (2 - progress)));
      
      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(current);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  const stats = [
    { label: 'Active Students', value: 15000, suffix: '+', icon: Users, color: 'text-brand-purple' },
    { label: 'Premium Courses', value: 250, suffix: '+', icon: BookOpen, color: 'text-brand-cyan' },
    { label: 'Completion Rate', value: 92, suffix: '%', icon: CheckCircle, color: 'text-brand-emerald' },
    { label: 'AI Mentor Availability', value: 24, suffix: '/7', icon: Cpu, color: 'text-purple-400' },
  ];

  return (
    <div className="w-full bg-[#050816]/60 border-y border-white/5 py-12 relative overflow-hidden backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group"
            >
              <div className={`p-3 bg-white/5 border border-white/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                <Icon size={22} />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-zinc-500 font-semibold mt-2.5 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
