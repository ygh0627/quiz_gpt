import { Database } from './supabase';

export type Quiz = Database['public']['Tables']['quizzes']['Row'];
