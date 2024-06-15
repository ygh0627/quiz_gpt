'use client';
import { deleteQuiz, updateQuiz } from '@/app/quizzes/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from './ui/checkbox';
import { Quiz } from '@/types/custom';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import { Question } from '@/types/planning';

export function QuizItems({
  quiz,
}: {
  quiz: {
    content: string | null;
    contenttype: string | null;
    created_at: string;
    id: number;
    name: string | null;
    user_id: string;
  };
}) {
  const quizQuestions: Question[] = JSON.parse(quiz.content!);
  const { toast } = useToast();
  const showToast = () => {
    toast({
      description: 'Your quiz has been deleted.',
      variant: 'destructive',
    });
  };
  return (
    <>
      <Card key={`Card-${quiz.name}`} className={cn('w-full')}>
        <CardContent
          key={`CardContent-${quiz.name}`}
          className='flex flex-row items-center m-4'
        >
          {/*
            <span className='size-12 flex items-center justify-center'>
              <Checkbox 
                checked={Boolean(q.isComplete)}
                onCheckedChange={async (val) => {
                  if (val === 'indeterminate') {
                    return;
                  }

                  await updateQuiz({ ...q})
                }}
              />
            </span>
              */}
          <div className='flex flex-row justify-between items-center w-full'>
            <div className='flex flex-col justify-between'>
              <p
                key={`p-${quiz.name}`}
                className={cn('flex-1 pt-2 min-w-0 break-words')}
              >
                {quiz.name}
              </p>
              {quizQuestions.map((q) => (
                <div>{q.prompt}</div>
              ))}
            </div>
            <Button
              formAction={async (data) => {
                //await deleteQuiz(quiz.id);
                console.log('don1e');
              }}
              variant='ghost'
              size='icon'
              onClick={async (_data) => {
                await deleteQuiz(quiz.id);
                showToast();
              }}
            >
              <Trash2 key={`trash2-${quiz.name}`} className='h-6 w-6' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
