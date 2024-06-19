'use client';
import { QuizItems } from './quiz-items';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2, X } from 'lucide-react';
import { Card, CardFooter, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { deleteQuiz } from '@/app/quizzes/actions';
import { useToast } from './ui/use-toast';
import { QuizFace } from './quiz-face';

export async function QuizList({
  quizzes,
}: {
  quizzes:
    | {
        content: string | null;
        contenttype: string | null;
        created_at: string;
        id: number;
        name: string | null;
        user_id: string;
      }[]
    | null;
}) {
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        {quizzes?.map((quiz) => {
          return (
            <AlertDialog key={`alert-dialog-${quiz.id}`}>
              <QuizFace
                name={quiz.name!}
                quizID={quiz.id}
                createdAt={quiz.created_at}
              />

              <AlertDialogContent className='min-w-[960px] max-h-[540px]'>
                <QuizItems key={quiz.id} quiz={quiz} />
              </AlertDialogContent>
            </AlertDialog>
          );
        })}
      </div>
    </>
  );
}
