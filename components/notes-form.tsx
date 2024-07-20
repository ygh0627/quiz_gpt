'use client';
import { quizFormSubmit } from '@/app/quizzes/actions';
import { flashcardFormSubmit } from '@/app/flashcards/actions';
import { useAuth } from '@clerk/nextjs';
import { useRef } from 'react';
import { NotesContent } from './notes-content';
import { Card, CardContent } from './ui/card';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface NotesFormProps {
  closeDialog: () => void; // Adjust the type based on the actual type of `closeDialog`
  showSpinner: () => void;
  hideSpinner: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  numQuestions: number;
}

export function NotesForm({
  closeDialog,
  showSpinner,
  hideSpinner,
  difficulty,
  numQuestions,
}: NotesFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  return (
    <Card>
      <CardContent className='p-3'>
        <form
          ref={formRef}
          className='flex gap-4'
          action={async (data) => {
            if (pathname === '/quizzes') {
              await quizFormSubmit({
                data: data,
                numQuestions: numQuestions,
                difficulty: difficulty,
              });
            } else if (pathname === '/flashcards') {
              await flashcardFormSubmit({
                data: data,
              numFlashcards: numQuestions,
            difficulty: difficulty});
            }
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
