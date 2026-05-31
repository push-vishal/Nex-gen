'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';
import Logo from './Logo';

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <motion.header
      animate={{
        backgroundColor: isScrolled ? 'rgba(5, 8, 22, 0.85)' : 'rgba(5, 8, 22, 0)',
        borderBottomColor: isScrolled ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0)',
        paddingTop: isScrolled ? '12px' : '20px',
        paddingBottom: isScrolled ? '12px' : '20px',
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-all duration-300 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="outline-none">
          <Logo showTagline={false} size="md" />
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <a href="#courses" className="hover:text-white transition-colors duration-200">Courses</a>
          <a href={isLoggedIn ? '/dashboard' : '/login'} className="hover:text-white transition-colors duration-200">Dashboard</a>
          <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
          <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:from-purple-600 hover:to-blue-600 text-xs font-extrabold uppercase tracking-wider text-white transition-all shadow-lg shadow-purple-950/25 cursor-pointer"
            >
              Explore Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push('/login')}
                className="hidden sm:inline-block text-xs font-extrabold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/login?mode=signup')}
                className="px-5 py-2.5 rounded-full bg-brand-purple hover:bg-purple-600 text-xs font-extrabold uppercase tracking-wider text-white transition-all shadow-lg shadow-purple-950/20 cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
