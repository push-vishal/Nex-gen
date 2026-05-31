-- 1. Drop existing tables if they exist

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;


-- 2. Create Profiles Table (Linked to auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    streak_days INTEGER NOT NULL DEFAULT 1,
    level_title TEXT NOT NULL DEFAULT 'Novice Scholar',
    total_hours NUMERIC(5, 1) NOT NULL DEFAULT 0.0,
    target_percentage INTEGER NOT NULL DEFAULT 100,
    rank_percentage INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for Profiles
CREATE POLICY "Allow users to read their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. Create Courses Table

CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for Courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for Courses
CREATE POLICY "Allow users to read their own courses" 
ON public.courses FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own courses" 
ON public.courses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own courses" 
ON public.courses FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. Create Trigger to Auto-Provision Profile & Courses on Sign Up

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Create a profile row for the new user
    INSERT INTO public.profiles (id, full_name, streak_days, level_title, total_hours, target_percentage, rank_percentage)
    VALUES (
        new.id, 
        COALESCE(new.raw_user_meta_data->>'full_name', 'Scholar'), 
        1, 
        'Novice Scholar', 
        0.0, 
        100, 
        100
    );

    -- 2. Provision initial courses for the new user
    INSERT INTO public.courses (user_id, title, progress, icon_name)
    VALUES
        (new.id, 'Advanced React Patterns', 75, 'Sparkles'),
        (new.id, 'Next.js App Router Masterclass', 90, 'Layers'),
        (new.id, 'Framer Motion Animations', 45, 'Activity'),
        (new.id, 'Database Systems with Supabase', 20, 'Database');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
