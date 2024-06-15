'use client';
import { addQuiz } from "@/app/quizzes/actions";
import { Button } from "./ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <Textarea
        disabled={pending}
        minLength={4}
        name="quiz"
        required
        placeholder="Write some text"
      />
      <Button type="submit" size="icon" className="min-w-10">
        <Send className='h-5 w-5' />
        <span className='sr-only'>Submit Text</span>
      </Button>
    </>
  )
}

export function QuizForm() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className='p-3'>
        <form ref={formRef} className='flex gap-4' action={async (data) => {
          await addQuiz(data);
          formRef.current?.reset();
        }}>
          <FormContent />
        </form>
      </CardContent>
    </Card>
  )
}