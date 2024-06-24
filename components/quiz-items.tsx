import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Question } from '@/types/planning';
import { QuizQuestion } from './quiz-question';
import { AlertDialogCancel } from './ui/alert-dialog';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

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

  return (
    <Card>
      <div className='flex flex-col justify-center '>
        <CardHeader className='flex flex-row justify-between items-end'>
          <CardTitle>{quiz.name}</CardTitle>
          <AlertDialogCancel>
            <X />
          </AlertDialogCancel>
        </CardHeader>
        <div className='mx-6 -mt-4 mb-4'>
          <Separator />
        </div>
      </div>
      <div className='flex flex-grow h-[650px]'>
        <ScrollArea className='w-full'>
          <CardContent key={`CardContent-${quiz.name}`}>
            {quizQuestions.map((q, i) => (
              <QuizQuestion
                key={`quiz question ${q.hint}`}
                question={q}
                index={i}
              />
            ))}
          </CardContent>
        </ScrollArea>
      </div>
    </Card>
  );
}
