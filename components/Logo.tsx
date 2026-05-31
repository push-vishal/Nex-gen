'use client';

import React from 'react';

interface LogoProps {
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  textClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({
  showText = true,
  showTagline = false,
  className = '',
  textClassName = '',
  size = 'md',
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 32, title: 'text-base', tag: 'text-[9px]' },
    md: { icon: 40, title: 'text-xl', tag: 'text-[10px]' },
    lg: { icon: 56, title: 'text-2xl', tag: 'text-xs' },
    xl: { icon: 72, title: 'text-3xl', tag: 'text-sm' },
  };

  const currentSize = sizeMap[size];
  // Use a unique ID suffix to avoid SVG gradient ID collisions when multiple logos render
  const uid = React.useId().replace(/:/g, '');

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Hexagon Logo — matching attachment */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          {/* Purple → Violet → Blue border gradient */}
          <linearGradient id={`hex-border-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="40%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          {/* Arrow gradient: deep purple → blue */}
          <linearGradient id={`arrow-grad-${uid}`} x1="30%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          {/* Sparkle gradient: cyan → light blue */}
          <linearGradient id={`sparkle-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>

        {/* Outer Hexagon — rounded-style, slightly rotated for flat-top look */}
        <path
          d="M 60 8 L 103 30 L 103 74 L 60 96 L 17 74 L 17 30 Z"
          stroke={`url(#hex-border-${uid})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Inner subtle hex fill for depth */}
        <path
          d="M 60 8 L 103 30 L 103 74 L 60 96 L 17 74 L 17 30 Z"
          fill={`url(#hex-border-${uid})`}
          opacity="0.04"
        />

        {/* Upward trending arrow — matches attachment curve */}
        <path
          d="M 32 72 Q 45 68, 52 55 Q 58 44, 62 42 L 72 30"
          stroke={`url(#arrow-grad-${uid})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M 66 28 L 74 27 L 72 36"
          stroke={`url(#arrow-grad-${uid})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 4-point Sparkle Star (top-right area) */}
        <path
          d="M 82 28 C 82 32, 82 32, 86 32 C 82 32, 82 32, 82 36 C 82 32, 82 32, 78 32 C 82 32, 82 32, 82 28 Z"
          fill={`url(#sparkle-grad-${uid})`}
        />
        {/* Smaller secondary sparkle */}
        <path
          d="M 90 38 C 90 40.5, 90 40.5, 92.5 40.5 C 90 40.5, 90 40.5, 90 43 C 90 40.5, 90 40.5, 87.5 40.5 C 90 40.5, 90 40.5, 90 38 Z"
          fill={`url(#sparkle-grad-${uid})`}
          opacity="0.7"
        />
      </svg>

      {/* Typography — matching attachment style */}
      {showText && (
        <div className={`flex flex-col text-left leading-none ${textClassName}`}>
          <span className={`font-black tracking-tight leading-none ${currentSize.title}`}>
            <span className="bg-gradient-to-r from-[#4338CA] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent">
              NexGen
            </span>{' '}
            <span className="bg-gradient-to-r from-[#93C5FD] to-[#BAE6FD] bg-clip-text text-transparent font-light">
              Learn
            </span>
          </span>
          {showTagline && (
            <span className={`text-zinc-400 font-medium mt-1.5 tracking-wide italic leading-none ${currentSize.tag}`}>
              Learn Smarter. Progress Faster.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
