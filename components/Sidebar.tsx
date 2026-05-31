'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, BarChart3, Settings, Compass, Sparkles } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onNavChange) {
      onNavChange(tabId);
    }
  };

  return (
    <>
      {/* Sidebar for Desktop & Tablet */}
      <nav className="hidden md:flex flex-col h-[calc(100vh-2rem)] sticky top-4 left-0 bg-card-bg backdrop-blur-md border border-card-border rounded-2xl p-4 transition-all duration-300 w-20 lg:w-64 shrink-0 shadow-lg shadow-purple-950/5">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-white/5 overflow-hidden">
          <div className="p-2 bg-purple-600/20 text-brand-purple rounded-lg shrink-0">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent opacity-0 lg:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Nex-Gen Learn
          </span>
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

        {/* Profile / Status Summary */}
        <div className="mt-auto border-t border-white/5 pt-4 flex items-center gap-3 px-2 overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center font-semibold text-white text-sm shrink-0 shadow-inner">
            JD
          </div>
          <div className="hidden lg:flex flex-col text-left overflow-hidden">
            <span className="text-xs font-semibold text-white truncate">John Doe</span>
            <span className="text-[10px] text-zinc-400 truncate">Pro Learner</span>
          </div>
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
      </nav>
    </>
  );
}
