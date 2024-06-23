'use client';
import { generateQuiz, addQuiz } from "@/app/quizzes/actions";
import { useAuth } from "@clerk/nextjs";
import { useRef } from "react";
import { NotesContent } from "./notes-content";
import { Card, CardContent } from "./ui/card";




export function NotesForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { userId } = useAuth();
  return (
    <Card>
      <CardContent className='p-3'>
        <form
          ref={formRef}
          className='flex gap-4'
          action={async (data) => {
            const text = data.get('notes') as string | null;
            if (!text) {
              throw new Error('Text is required');
            }
            // send notes to chatgpt
            const response = await generateQuiz({
              notes: text,
              difficulty: 'hard',
            });
            // get quiz
            const quiz = response.choices[0].message.content;
            await addQuiz(quiz!);
            console.log('sup');
            formRef.current?.reset();
          }}
        >
          <NotesContent />
        </form>
      </CardContent>
    </Card>
  );
}
