'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Question } from '@/types/planning';
import { QuizQuestion } from './quiz-question';
import { AlertDialogCancel } from './ui/alert-dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

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
    <>
      <Card>
        <CardHeader className='flex flex-row justify-between items-center'>
          <CardTitle>{quiz.name}</CardTitle>
          <AlertDialogCancel>
            <X />
          </AlertDialogCancel>
        </CardHeader>
        <CardContent
          key={`CardContent-${quiz.name}`}
          className='flex flex-row items-center m-4 '
        >
          <Carousel
            opts={{ align: 'start' }}
            orientation='horizontal'
            className='w-full'
          >
            <CarouselContent className='-mt-1 max-w-[540px]'>
              {quizQuestions.map((q, i) => (
                <CarouselItem>
                  <QuizQuestion question={q} index={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
    </>
  );
}
