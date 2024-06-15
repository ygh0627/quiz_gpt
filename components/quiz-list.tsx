'use client';
import { Question } from '@/types/planning';
import { QuizItems } from './quiz-items';
import { Button } from './ui/button';
import { deleteQuiz } from '@/app/quizzes/actions';
import { Trash2 } from 'lucide-react';

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
      <div className='flex flex-col w-full m-4'>
        {quizzes?.map((quiz) => {
          return (
            <div key={`top-div-${quiz.id}`} className='flex flex-row '>
              <QuizItems key={quiz.id} quiz={quiz} />
            </div>
          );
        })}
      </div>
    </>
  );
}
