'use client';
import { QuizItems } from './quiz-items';
import { Button } from './ui/button';
import { deleteQuiz } from '@/app/quizzes/actions';
import { Trash2 } from 'lucide-react';

export async function QuizList({
  quizzes,
}: {
  quizzes:
    | {
        created_at: string;
        id: number;
        questions: string | null;
        user_id: string;
      }[]
    | null;
}) {
  const demoQuizzes = [
    '{"id":"1","questionType":"mcq","prompt":"What is the capital of France?","answerChoices":["a) Berlin","b) Madrid","c) Paris","d) Rome"],"correctAnswer":"c","explanation":"Paris is the capital city of France.","isComplete":true,"difficulty":"easy","hint":"It is also known as the city of love."}',
    '{"id":"2","questionType":"tf","prompt":"The Earth is flat.","correctAnswer":"false","explanation":"The Earth is an oblate spheroid, not flat.","isComplete":true,"difficulty":"easy","hint":"Think about the shape of the planet."}',
    '{"id":"3","questionType":"frq","prompt":"Who developed the theory of relativity?","correctAnswer":"Einstein","explanation":"Albert Einstein developed the theory of relativity.","isComplete":true,"difficulty":"hard","hint":"Consider a famous physicist."}',
  ];

  return (
    <>
      <div className='flex flex-col w-full m-4'>
        {quizzes?.map((quiz) => {
          return (
            <div key={`top-div-${quiz.id}`} className='flex flex-row '>
              <QuizItems key={quiz.id} questionsString={quiz.questions ?? ''} quizID={quiz.id} />
              
            </div>
          );
        })}
      </div>
    </>
  );
}
