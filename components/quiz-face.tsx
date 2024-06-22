'use client';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { deleteQuiz } from '@/app/quizzes/actions';
import { Trash2 } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { AlertDialogTrigger } from './ui/alert-dialog';

export function QuizFace({
  name,
  quizID,
  createdAt,
}: {
  name: string;
  quizID: number;
  createdAt: string;
}) {
  const { toast } = useToast();
  const showToast = () => {
    toast({
      description: 'Your quiz has been deleted.',
      variant: 'destructive',
    });
  };
  return (
    <Card className='w-[480px]'>
      <CardHeader>
        <div className='flex flex-row justify-between items-center'>
          <CardTitle>{name}</CardTitle>
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
        </div>
        <CardDescription>
          Created on {createdAt.substring(0, 10)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialogTrigger asChild>
          <Button>Open</Button>
        </AlertDialogTrigger>
      </CardContent>
    </Card>
  );
}
