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
import { CloudUpload, Plus, Send } from 'lucide-react';
import { useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { useFormStatus } from 'react-dom';
import { Textarea } from './ui/textarea';
import { generateQuiz } from '@/app/quizzes/actions';
import { addQuiz } from '@/app/quizzes/actions';
import { useAuth } from '@clerk/nextjs';
import { NotesForm } from './notes-form';

export function NotesUpload() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='default'
          className='fixed bottom-32 right-32 h-16 w-16 text-white p-4 rounded-full shadow-lg'
        >
          <Plus className='h-16 w-16' />
        </Button>
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
