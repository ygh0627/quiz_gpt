'use client';
import { formSubmit } from '@/app/quizzes/actions';
import { useAuth } from '@clerk/nextjs';
import { useRef } from 'react';
import { NotesContent } from './notes-content';
import { Card, CardContent } from './ui/card';
import { useRouter } from 'next/navigation';

interface NotesFormProps {
  closeDialog: () => void; // Adjust the type based on the actual type of `closeDialog`
  showSpinner: () => void;
  hideSpinner: () => void;
}


export function NotesForm({ closeDialog, showSpinner, hideSpinner }: NotesFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className='p-3'>
        <form
          ref={formRef}
          className='flex gap-4'
          action={async (data) => {
            await formSubmit(data);
            formRef.current?.reset();
            closeDialog();
            hideSpinner();
          }}
        >
          <NotesContent showSpinner={showSpinner} />
        </form>
      </CardContent>
    </Card>
  );
}
