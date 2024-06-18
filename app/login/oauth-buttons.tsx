'use client';
import { Button } from '@/components/ui/button';
import { Provider } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { oAuthSignIn } from './actions';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

const providers: OAuthProviders[] = [
  {
    name: 'github',
    displayName: 'GitHub',
    icon: <Github className='size-5' />,
  },

  {
    name: 'google',
    displayName: 'Google',
    icon: <FaGoogle className='size-5' />,
  },
];

export function OAuthButtons() {
  return (
    <>
      {providers.map((provider) => (
        <Button
          className='flex items-center justify-center w-full gap-2'
          variant='outline'
          key={provider.name}
          onClick={async () => {
            await oAuthSignIn(provider.name);
          }}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
