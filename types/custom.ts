import { Database } from './supabase';

export type Quiz = Database['public']['Tables']['content']['Row'];

export type CustomFlashcardType =
  Database['public']['Tables']['content']['Row'];
