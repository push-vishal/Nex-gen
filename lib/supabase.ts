import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder-id')) {
    throw new Error(
      'Supabase credentials are not configured. Please replace the placeholders in your .env.local file with your actual Supabase URL and Anon Key.'
    );
  }
  
  try {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Not needed for simple read queries in RSC
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to initialize Supabase client: ${error?.message || error}`);
  }
}
