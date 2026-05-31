'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Database, Terminal, FileCode, Play } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BentoGrid from '@/components/BentoGrid';
import HeroTile from '@/components/HeroTile';
import CourseCard from '@/components/CourseCard';
import ActivityTile from '@/components/ActivityTile';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const [showDemo, setShowDemo] = useState(false);

  // Mock course data to render if the user switches to Demo Mode
  const mockCourses = [
    {
      id: 'demo-1',
      title: 'Advanced React Patterns & Architecture',
      progress: 75,
      icon_name: 'Sparkles',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo-2',
      title: 'Next.js 14 App Router Masterclass',
      progress: 90,
      icon_name: 'Layers',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo-3',
      title: 'Framer Motion: Interactive Animations',
      progress: 45,
      icon_name: 'Activity',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo-4',
      title: 'PostgreSQL Database Systems with Supabase',
      progress: 20,
      icon_name: 'Database',
      created_at: new Date().toISOString(),
    },
  ];

  if (showDemo) {
    return (
      <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col gap-6 w-full pb-20 md:pb-0">
          <header className="flex flex-col gap-1.5 md:flex-row md:items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Student Workspace</h2>
              <p className="text-zinc-400 text-xs font-semibold">Active Mode: <span className="text-brand-purple">Local Mock Demo Mode</span></p>
            </div>
            <button
              onClick={() => {
                setShowDemo(false);
                reset();
              }}
              className="mt-2 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/25 hover:bg-brand-purple/20 transition-colors text-xs font-bold text-white uppercase tracking-wider"
            >
              <RefreshCw size={14} />
              Retry Live Database
            </button>
          </header>

          <BentoGrid>
            <HeroTile profile={null} />
            <ActivityTile />
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </BentoGrid>
        </main>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#030014] text-white">
      <div className="absolute inset-0 bg-radial-gradient from-purple-950/20 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-card-bg border border-red-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-lg shadow-2xl shadow-red-950/10 relative z-10"
      >
        {/* Error Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 shrink-0">
            <AlertCircle size={28} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Database Connection Failed</h1>
            <p className="text-sm text-zinc-400 mt-1">Next.js Server Component encountered an error querying Supabase.</p>
          </div>
        </div>

        {/* Detailed Error Box */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-6 font-mono text-xs text-red-300 max-h-[120px] overflow-y-auto break-all">
          {error.message || 'Unknown connection error. Please check your network and configuration.'}
        </div>

        {/* Diagnostic / Set Up Helper */}
        <div className="space-y-4 text-sm text-zinc-400 border-t border-white/5 pt-5 mb-8">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <Terminal size={16} className="text-brand-purple" />
            How to resolve this:
          </h2>
          
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">1</div>
            <p>
              Verify your <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs">.env.local</code> file contains valid Supabase keys:
              <br />
              <span className="text-xs text-zinc-500">NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">2</div>
            <p className="flex items-center gap-1.5">
              <FileCode size={14} className="text-zinc-400 shrink-0" />
              Ensure the <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs">courses</code> table is created and seeded. Run the <code className="text-brand-purple bg-white/5 px-1.5 py-0.5 rounded text-xs font-semibold">supabase_seed.sql</code> script in your Supabase SQL editor.
            </p>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-purple hover:bg-purple-600 font-bold transition-all text-sm text-white shadow-lg shadow-purple-950/30"
          >
            <RefreshCw size={16} />
            Retry Connection
          </button>
          
          <button
            onClick={() => setShowDemo(true)}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold transition-all text-sm text-zinc-200"
          >
            <Play size={16} className="text-brand-cyan" />
            Launch in Demo Mode
          </button>
        </div>
      </motion.div>
    </main>
  );
}
