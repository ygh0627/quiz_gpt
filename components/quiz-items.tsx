'use client';
import { deleteQuiz, updateQuiz } from '@/app/quizzes/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from './ui/checkbox';
import { Quiz } from '@/types/custom';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuizItems({
  questionsString,
  quizID,
}: {
  questionsString: string;
  quizID: number;
}) {
  const quizQuestions: Question[] = [JSON.parse(questionsString)];
  return (
    <>
      {quizQuestions.map((q) => (
        <Card key={`Card-${q.prompt}`} className={cn('w-full')}>
          <CardContent
            key={`CardContent-${q.prompt}`}
            className='flex items-start m-3'
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
            <p
              key={`p-${q.prompt}`}
              className={cn('flex-1 pt-2 min-w-0 break-words')}
            >
              {q.prompt}
            </p>
            <Button
              formAction={async (data) => {
                //await deleteQuiz(quiz.id);
                console.log('don1e');
              }}
              variant='ghost'
              size='icon'
              onClick={async (data) => {
                await deleteQuiz(quizID);
                console.log('done');
              }}
            >
              <Trash2 key={`trash2-${q.prompt}`} className='h-6 w-6' />
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
