import { Question } from '@/types/planning';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QuizQuestionAnswerChoice } from './quiz-question-answer-choice';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from './ui/button';

export function QuizQuestion({
  question,
  index,
}: {
  question: Question;
  index: number;
}) {
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
                  letter={answer.substring(0, 2)}
                  value={answer.substring(2)}
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
