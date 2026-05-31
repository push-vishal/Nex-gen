-- SQL script to set up and seed the 'courses' table in Supabase.
-- You can run this script directly in the Supabase SQL Editor.

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone to read courses (public access)
CREATE POLICY "Allow public read access" 
ON courses FOR SELECT 
USING (true);

-- 4. Seed initial mock course data
INSERT INTO courses (title, progress, icon_name)
VALUES
    ('Advanced React Patterns', 75, 'Sparkles'),
    ('Next.js App Router Masterclass', 90, 'Layers'),
    ('Framer Motion Animations', 45, 'Activity'),
    ('Database Systems with Supabase', 20, 'Database')
ON CONFLICT DO NOTHING;
