'use client';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { deleteFlashcard } from '@/app/flashcards/actions';
import { Trash2 } from 'lucide-react';

export function FlashcardFaceButton({
  flashcardID,
  name,
}: {
  flashcardID: number;
  name: string;
}) {
  const { toast } = useToast();
  const showToast = () => {
    toast({
      description: 'Your flashcard has been deleted.',
      variant: 'destructive',
    });
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={async (_data) => {
        await deleteFlashcard(flashcardID);
        showToast();
      }}
    >
      <Trash2 key={`trash2-${name}`} className='h-6 w-6' />
    </Button>
  );
}
