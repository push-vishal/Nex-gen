import React from 'react';
import { createClient } from '@/lib/supabase';
import Sidebar from '@/components/Sidebar';
import BentoGrid from '@/components/BentoGrid';
import HeroTile from '@/components/HeroTile';
import CourseCard from '@/components/CourseCard';
import ActivityTile from '@/components/ActivityTile';

export const revalidate = 0; // Disable query caching to fetch live data from Supabase

export default async function Home() {
  const supabase = createClient();
  
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('title', { ascending: true });

  if (error) {
    throw new Error(`Database query error: ${error.message}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col gap-6 w-full pb-20 md:pb-0">
        <header className="flex flex-col gap-1 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-black text-white tracking-tight">Student Workspace</h2>
          <p className="text-zinc-400 text-xs font-semibold">
            Active Mode: <span className="text-brand-emerald">Live Database</span>
          </p>
        </header>

        <BentoGrid>
          <HeroTile userName="Scholar" />
          <ActivityTile />
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full border border-dashed border-white/10 rounded-2xl p-12 text-center text-zinc-400 font-semibold">
              No courses found in database. Run the seed script to insert sample data.
            </div>
          )}
        </BentoGrid>
      </main>
    </div>
  );
}
