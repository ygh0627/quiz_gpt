'use client';
import { useFormStatus } from 'react-dom';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export function NotesContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <Textarea
        disabled={pending}
        minLength={1}
        name='notes'
        placeholder='Paste your notes here...'
      />
      <Button disabled={pending} type='submit'>
        Generate Quiz
      </Button>
    </>
  );
}
