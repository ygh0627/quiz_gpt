'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from './ui/separator';
import { FloatingActionButton } from './floating-action';
import { CloudUpload, Send } from 'lucide-react';
import { useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { useFormStatus } from 'react-dom';
import { Textarea } from './ui/textarea';
import { generateQuiz } from '@/utils/openai';
import { addQuiz } from '@/app/quizzes/actions';

export function NotesUpload() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FloatingActionButton onClick={() => {}} />
      </DialogTrigger>
      <DialogContent className='md:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Upload your notes</DialogTitle>
          <DialogDescription>
            Upload a PDF or paste your notes into the textbox
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4 py-4 justify-center'>
          <CloudUpload />
          <div className='flex h-5 items-center space-x-4 text-sm w-[350px]'>
            <Separator />
            <div>or</div>
            <Separator />
          </div>
          <div>Paste your notes below:</div>
          <NotesForm />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NotesContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <Textarea
        disabled={pending}
        minLength={1}
        name='notes'
        placeholder='Paste your notes here...'
      />
      <Button type='submit'>Generate Quiz</Button>
    </>
  );
}

function NotesForm() {
  const formRef = useRef<HTMLFormElement>(null);
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
            const quiz = response.choices[0].message.content
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
