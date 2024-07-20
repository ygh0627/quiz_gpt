'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Question } from '@/types/planning';
import { QuizQuestion } from './quiz-question';
import { AlertDialogCancel } from './ui/alert-dialog';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import Loader from './loader';
import { createContext, useReducer, useState } from 'react';
import { markQuestionCorrect } from '@/app/quizzes/actions';

type Action = {
  type: 'mark_question_correct';
  payload: { questionID: string; quizID: number };
};

export const QuizDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);
function reducer(
  state: {
    content: string | null;
    contenttype: string | null;
    created_at: string;
    id: number;
    name: string | null;
    user_id: string;
  },
  action: Action
) {
  switch (action.type) {
    case 'mark_question_correct': {
      const { questionID, quizID } = action.payload;
      markQuestionCorrect(quizID, questionID);
      console.log('here2');
      return state;
    }
    default:
      return state;
  }
}

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
  const [state, dispatch] = useReducer(reducer, quiz);
  const quizQuestions: Question[] = JSON.parse(state.content!);

  return (
    <QuizDispatchContext.Provider value={dispatch}>
      <Card>
        <div className='flex flex-col justify-center '>
          <CardHeader className='flex flex-row justify-between items-end'>
            <CardTitle className='flex flex-row'>
              <div>{quiz.name}</div>
              <div className='pl-96'>
                {/*quizQuestions.filter((value) => value.isCorrect === true).length}{' '}
              / {quizQuestions.length*/}
              </div>
            </CardTitle>
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
                  quizID={quiz.id}
                />
              ))}
            </CardContent>
          </ScrollArea>
        </div>
      </Card>
    </QuizDispatchContext.Provider>
  );
}
