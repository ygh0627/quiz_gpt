import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
} from '@clerk/nextjs';
import { createClient } from '@/utils/supabase/client';
export default function Header() {
  return (
    <header className='sticky top-0 z-10 w-full border-b border-border bg-white'>
      <div className='container flex items-center h-14'>
        <nav className='flex items-center space-x-4 lg:space-x-6'>
          <a className='flex items-center space-x-2 mr-6' href='/'>
            <span className='font-bold text-xl'>QuizGPT</span>
          </a>
          <Link href='/quizzes'>Quizzes</Link>
          <Link href='/flashcards'>Flashcards</Link>
        </nav>
        <div className='flex flex-1 items-center justify-end space-x-2'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  );
}
