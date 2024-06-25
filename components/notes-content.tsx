import { useFormStatus } from 'react-dom';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useEffect } from 'react';

interface NotesContentProps {
  showSpinner: () => void;
}

export function NotesContent({ showSpinner }: NotesContentProps) {
  const { pending } = useFormStatus();
  useEffect(() => {
    if (pending) {
      showSpinner();
    }
  }, [pending])
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
