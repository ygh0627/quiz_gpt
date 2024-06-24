'use client';
import { formSubmit } from '@/app/quizzes/actions';
import { useAuth } from '@clerk/nextjs';
import { useRef } from 'react';
import { NotesContent } from './notes-content';
import { Card, CardContent } from './ui/card';
import { useRouter } from 'next/navigation';

export function NotesForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { userId } = useAuth();
  const router = useRouter();
  return (
    <Card>
      <CardContent className='p-3'>
        <form
          ref={formRef}
          className='flex gap-4'
          action={async (data) => {
            await formSubmit(data);
            formRef.current?.reset();
            router.refresh();
          }}
        >
          <NotesContent />
        </form>
      </CardContent>
    </Card>
  );
}
