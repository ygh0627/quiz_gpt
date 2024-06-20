import { signout } from '@/app/login/actions';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className='sticky top-0 z-10 w-full border-b border-border bg-white'>
      <div className='container flex items-center h-14'>
        <nav className='flex items-center space-x-4 lg:space-x-6'>
          <a className='flex items-center space-x-2 mr-6' href='/'>
            <span className='font-bold text-xl'>QuizGPT</span>
          </a>
          <Link href='/quizzes'>Quizzes</Link>
        </nav>
        <div className='flex flex-1 items-center justify-end space-x-2'>
          <UserButton afterSignOutUrl='/' />
          {/* {user !== null ? (
            <form action={signout} className='flex items-center m-2'>
              <p className='mr-4'>{`Hello, ${user.user_metadata['full_name'].split(' ')[0]
                }`}</p> */}
          {/*<div className='mr-4'>
                <ThemeToggle />
            </div>*/}

          {/* <Button>Sign Out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href='/login'>Sign In</Link>
            </Button>
          )} */}
        </div>
      </div>
    </header>
  );
}
