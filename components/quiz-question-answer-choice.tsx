'use client';
import { Check, X } from 'lucide-react';
import { Button } from './ui/button';

export function QuizQuestionAnswerChoice({
  letter,
  value,
  isCorrectAnswerChoice,
  onClick,
  displayCheck,
  displayX,
}: {
  letter: string;
  value: string;
  isCorrectAnswerChoice: boolean;
  onClick: () => void
  displayCheck: boolean;
  displayX: boolean;
}) {
  return (
    <div key={`${letter} ${value}`} className='flex flex-row'>
      <Button
        variant='outline'
        className='flex w-auto m-1 justify-start items-center'
        onClick={onClick}
      >
        {displayCheck ? <Check color='green'className='' /> : null}
        {displayX ? <X color='red' className='' /> : null}
        <p className='font-medium leading-none'>
          {letter} {value}
        </p>
      </Button>
    </div>
  );
}
