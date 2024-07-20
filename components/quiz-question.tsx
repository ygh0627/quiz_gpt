'use client';
import { Question } from '@/types/planning';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QuizQuestionAnswerChoice } from './quiz-question-answer-choice';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from './ui/button';
import { useState, useContext } from 'react';
import { QuizDispatchContext } from './quiz-items';

const useDispatch = () => {
  const context = useContext(QuizDispatchContext);
  if (context === undefined) {
    throw new Error('useDispatch must be used within the QuizDispatchContext');
  }
  return context;
};

export function QuizQuestion({
  question,
  index,
  quizID,
}: {
  question: Question;
  index: number;
  quizID: number;
}) {
  const [selectedAnswerChoice, setSelectedAnswerChoice] = useState<
    null | string
  >(null);
  const dispatch = useDispatch();

  return (
    <Card className='my-2 overflow-y-auto'>
      <CardHeader>
        <CardTitle>
          {index + 1}. ) {question.prompt}
        </CardTitle>
        <CardContent>
          <div className='flex flex-row'>
            <div>
              {question.answerChoices.map((answer) => (
                <QuizQuestionAnswerChoice
                  key={`quiz question answer choice ${question.hint}`}
                  letter={answer.substring(0, 2)}
                  value={answer.substring(2)}
                  isCorrectAnswerChoice={
                    question.correctAnswer === answer.substring(0, 1)
                  }
                  onClick={() => {
                    setSelectedAnswerChoice(answer.substring(0, 1));
                    if (
                      selectedAnswerChoice === answer.substring(0, 1) &&
                      selectedAnswerChoice === question.correctAnswer
                    ) {
                      /*dispatch({
                        type: 'mark_question_correct',
                        payload: {
                          questionID: question.id,
                          quizID: quizID,
                        },
                      });*/
                    }
                  }}
                  displayCheck={
                    (question.isCorrect &&
                      answer.substring(0, 1) === question.correctAnswer) ||
                    (selectedAnswerChoice === answer.substring(0, 1) &&
                      selectedAnswerChoice === question.correctAnswer)
                  }
                  displayX={
                    selectedAnswerChoice === answer.substring(0, 1) &&
                    selectedAnswerChoice !== question.correctAnswer
                  }
                />
              ))}
            </div>
            <div className='w-full flex items-start justify-end mt-4'>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant='outline'>Hint</Button>
                </HoverCardTrigger>
                <HoverCardContent>{question.hint}</HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

// for reference
/*
type Question = {
  id: string;
  prompt: string;
  answerChoices: string[];
  correctAnswer: string; // string or "a" ... or "true"
  explanation: string;
  isComplete: boolean | null;
  isCorrect: boolean | null;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
};

*/
