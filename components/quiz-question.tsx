import { Question } from '@/types/planning';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QuizQuestionAnswerChoice } from './quiz-question-answer-choice';

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
          {question.answerChoices.map((answer) => (
            <QuizQuestionAnswerChoice letter={answer.substring(0, 2)} value={answer.substring(2)} />
          ))}
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
