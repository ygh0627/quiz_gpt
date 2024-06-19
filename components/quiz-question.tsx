import { Question } from '@/types/planning';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QuizQuestionAnswerChoice } from './quiz-question-answer-choice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';

export function QuizQuestion({
  question,
  index,
}: {
  question: Question;
  index: number;
}) {
  return (
    <Card>
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
            <div className='w-full flex items-start justify-end'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>Hint</Button>
                </PopoverTrigger>
                <PopoverContent>{question.hint}</PopoverContent>
              </Popover>
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
