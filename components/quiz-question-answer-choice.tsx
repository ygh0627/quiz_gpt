import { Button } from './ui/button';

export function QuizQuestionAnswerChoice({
  letter,
  value,
}: {
  letter: string;
  value: string;
}) {
  return (
    <div className='flex flex-row'>
      <Button variant='outline' className='flex-wrap w-48 m-1 justify-start items-center'>
        <p className='font-medium leading-none'>
          {letter} {value}
        </p>
      </Button>
    </div>
  );
}
