import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto min-h-screen">
      {/* Sidebar Skeleton (Collapsible responsive widths) */}
      <div className="hidden md:flex flex-col h-[calc(100vh-2rem)] sticky top-4 left-0 bg-card-bg backdrop-blur-md border border-card-border rounded-2xl p-4 w-20 lg:w-64 shrink-0 gap-6">
        <div className="flex items-center gap-3 px-3 py-4 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 animate-pulse shrink-0" />
          <div className="hidden lg:block w-28 h-4 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl">
              <div className="w-5 h-5 bg-zinc-800 rounded animate-pulse shrink-0" />
              <div className="hidden lg:block w-24 h-3 bg-zinc-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-4 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse shrink-0" />
          <div className="hidden lg:flex flex-col gap-2 flex-1">
            <div className="w-16 h-3 bg-zinc-800 rounded animate-pulse" />
            <div className="w-10 h-2 bg-zinc-850 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="flex-1 flex flex-col gap-6 w-full pb-20 md:pb-0">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2 border-b border-white/5 pb-4">
          <div className="w-40 h-7 bg-zinc-800 rounded animate-pulse" />
          <div className="w-24 h-3 bg-zinc-850 rounded animate-pulse" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-auto">
          {/* Hero Tile Skeleton (spans 3 cols on lg, 2 on md, 1 on sm) */}
          <div className="relative lg:col-span-3 md:col-span-2 col-span-1 h-[220px] rounded-2xl bg-card-bg border border-card-border p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1 flex flex-col gap-3">
              <div className="w-24 h-5 bg-purple-950/20 border border-purple-500/10 rounded-full animate-pulse" />
              <div className="w-3/4 h-8 bg-zinc-800 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-zinc-850 rounded animate-pulse" />
            </div>
            <div className="w-48 h-16 bg-zinc-800 rounded-2xl animate-pulse shrink-0" />
          </div>

          {/* Activity Tile Skeleton (spans 2 cols on lg/md, 1 on sm) */}
          <div className="relative lg:col-span-2 md:col-span-2 col-span-1 h-[256px] rounded-2xl bg-card-bg border border-card-border p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl animate-pulse shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-32 h-4 bg-zinc-800 rounded animate-pulse" />
                <div className="w-24 h-2 bg-zinc-850 rounded animate-pulse" />
              </div>
            </div>
            {/* Heatmap mock grid representation */}
            <div className="flex gap-[4px] py-4 w-full overflow-hidden">
              <div className="flex flex-col justify-between text-[9px] text-transparent pr-1">
                <span>M</span>
                <span>W</span>
                <span>F</span>
              </div>
              <div className="flex gap-[4px] w-full">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-[4px]">
                    {[...Array(7)].map((_, j) => (
                      <div key={j} className="w-3 h-3 rounded-[3px] bg-zinc-900 border border-white/5 animate-pulse" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="w-12 h-3 bg-zinc-850 rounded animate-pulse" />
                  <div className="w-8 h-4 bg-zinc-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Course Tiles (3 small columns to fill in) */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative col-span-1 h-[190px] rounded-2xl bg-card-bg border border-card-border p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 bg-zinc-800 rounded-xl animate-pulse" />
                  <div className="w-12 h-4 bg-zinc-850 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-zinc-800 rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="w-10 h-3 bg-zinc-850 rounded animate-pulse" />
                  <div className="w-6 h-3 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="h-2 w-full bg-zinc-900 border border-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
