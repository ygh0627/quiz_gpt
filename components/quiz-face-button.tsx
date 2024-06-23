'use client';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { deleteQuiz } from '@/app/quizzes/actions';
import { Trash2 } from 'lucide-react';

export function QuizFaceButton({ quizID, name }: { quizID: number, name: string }) {
  const { toast } = useToast();
  const showToast = () => {
    toast({
      description: 'Your quiz has been deleted.',
      variant: 'destructive',
    });
  };

  return (
    <Button
      formAction={async (data) => {
        console.log('don1e');
      }}
      variant='ghost'
      size='icon'
      onClick={async (_data) => {
        await deleteQuiz(quizID);
        showToast();
      }}
    >
      <Trash2 key={`trash2-${name}`} className='h-6 w-6' />
    </Button>
  );
}
