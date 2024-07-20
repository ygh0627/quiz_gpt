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
import { Separator } from './ui/separator';
import { CloudUpload, Plus } from 'lucide-react';
import { NotesForm } from './notes-form';
import { useState } from 'react';
import Loader from './loader';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { cn } from '@/lib/utils';
import { Slider } from './ui/slider';
import { usePathname } from 'next/navigation';

export function NotesUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy'
  );
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const showSpinner = () => {
    setIsLoading(true);
  };

  const hideSpinner = () => {
    setIsLoading(false);
  };
  const pathname = usePathname();
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={openDialog}
          variant='default'
          className='fixed bottom-32 right-32 h-16 w-16 text-white p-4 rounded-full shadow-lg'
        >
          <Plus className='h-16 w-16' />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={closeDialog}
        hideCloseButton={true}
        className='md:max-w-[800px]'
      >
        <DialogHeader>
          <DialogTitle>Enter your notes</DialogTitle>
          <DialogDescription>
            Paste your notes into the textbox or write in a topic
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 py-2 justify-center'>
          {/*
          <CloudUpload />
          <div className='flex h-5 items-center space-x-4 text-sm w-[350px]'>
            <Separator />
            <div>or</div>
            <Separator />
          </div>
          */}

          <div>Paste your notes below:</div>
          <NotesForm
            showSpinner={showSpinner}
            hideSpinner={hideSpinner}
            closeDialog={closeDialog}
            difficulty={difficulty}
            numQuestions={numQuestions}
          />
          <div className='pt-4'>
            {pathname === '/quizzes' ? 'Quiz' : 'Flashcard'} Customization
          </div>
          <Separator className='' />
          <div className='flex flex-row w-full items-center justify-center'>
            <div className='p-4'>
              <Card className=''>
                <CardHeader>
                  <CardTitle>Difficulty</CardTitle>
                  <CardDescription>
                    Pick a {pathname === '/quizzes' ? 'quiz' : 'flashcard'}{' '}
                    difficulty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue='easy'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='easy'
                        id='easy'
                        onClick={() => {
                          setDifficulty('easy');
                        }}
                      />
                      <Label htmlFor='easy'>easy</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='medium'
                        id='medium'
                        onClick={() => {
                          setDifficulty('medium');
                        }}
                      />
                      <Label htmlFor='medium'>medium</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='hard'
                        id='hard'
                        onClick={() => {
                          setDifficulty('hard');
                        }}
                      />
                      <Label htmlFor='hard'>hard</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
            <div className='p-4'>
              <Card className=''>
                <CardHeader>
                  <CardTitle>
                    Number of{' '}
                    {pathname === '/quizzes' ? 'Questions' : 'Flashcards'}
                  </CardTitle>
                  <CardDescription>
                    Pick the number of{' '}
                    {pathname === '/quizzes' ? 'quiz questions' : 'flashcards'}:{' '}
                    {numQuestions}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  <Slider
                    defaultValue={[5]}
                    max={pathname === '/quizzes' ? 10 : 30}
                    min={1}
                    step={1}
                    className={cn('w-[80%]')}
                    onValueChange={(value) => {
                      setNumQuestions(value[0]);
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
        {isLoading && (
          <div className='flex items-center justify-center h-full'>
            <Loader />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
