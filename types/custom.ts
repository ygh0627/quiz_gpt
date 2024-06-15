import { Database } from './supabase';

export type Quiz = Database['public']['Tables']['content']['Row'];
