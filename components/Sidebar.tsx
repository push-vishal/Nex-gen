'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';
import { LayoutDashboard, BookOpen, BarChart3, Settings, Compass, LogOut } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  onNavChange?: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'discover', label: 'Explore', icon: Compass },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ onNavChange }: SidebarProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState<{ fullName: string; initials: string } | null>(null);

  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();

        const name = profile?.full_name || user.user_metadata?.full_name || 'Scholar';
        const initials = name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        setUserProfile({ fullName: name, initials });
      }
    }
    loadUserData();
  }, [supabase]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onNavChange) {
      onNavChange(tabId);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {/* Sidebar for Desktop & Tablet */}
      <nav className="hidden md:flex flex-col h-[calc(100vh-2rem)] sticky top-4 left-0 bg-card-bg backdrop-blur-md border border-card-border rounded-2xl p-4 transition-all duration-300 w-20 lg:w-64 shrink-0 shadow-lg shadow-purple-950/5">
        {/* Logo Section */}
        <div 
          onClick={() => router.push('/')}
          className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-white/5 overflow-hidden cursor-pointer"
        >
          <Logo
            showText={true}
            size="sm"
            textClassName="opacity-0 lg:opacity-100 transition-opacity duration-300 whitespace-nowrap"
          />
        </div>

        {/* Navigation Items */}
        <ul className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 z-10 relative outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="hidden lg:inline transition-opacity duration-300">
                    {item.label}
                  </span>

                  {/* Active Highlight (layoutId ensures smooth slide animation) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/15 to-blue-600/10 border-l-2 border-brand-purple rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Profile / Status & Logout Summary */}
        <div className="mt-auto border-t border-white/5 pt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 px-2 overflow-hidden w-full">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center font-semibold text-white text-sm shrink-0 shadow-inner">
                {userProfile?.initials || 'S'}
              </div>
              <div className="hidden lg:flex flex-col text-left overflow-hidden">
                <span className="text-xs font-semibold text-white truncate">
                  {userProfile?.fullName || 'Loading...'}
                </span>
                <span className="text-[10px] text-zinc-400 truncate">Student Profile</span>
              </div>
            </div>
            
            {/* Desktop Logout Button */}
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="hidden lg:flex p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors duration-200"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Collapsed Tablet Logout Button */}
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="lg:hidden w-full flex items-center justify-center py-2.5 hover:bg-red-500/10 border border-transparent hover:border-red-500/25 rounded-xl text-red-400 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Bottom Nav Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#030014]/85 backdrop-blur-lg border-t border-white/10 flex justify-around items-center z-50 px-4 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-colors duration-200 ${
                isActive ? 'text-brand-purple' : 'text-zinc-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1 font-medium scale-90 sm:scale-100">{item.label}</span>

              {/* Active Dot for Mobile */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveDot"
                  className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-purple rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
        {/* Mobile LogOut Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center py-2 px-3 rounded-xl text-zinc-400 hover:text-red-400"
        >
          <LogOut size={20} />
          <span className="text-[10px] mt-1 font-medium scale-90 sm:scale-100">Log Out</span>
        </button>
      </nav>
    </>
  );
}
