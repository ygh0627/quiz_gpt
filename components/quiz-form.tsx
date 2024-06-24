'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';
import { FormContent } from './form-content';

export function QuizForm() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className='p-3'>
        <form
          ref={formRef}
          className='flex gap-4'
          action={async (data) => {
            //await addQuiz(data);
            formRef.current?.reset();
          }}
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}
