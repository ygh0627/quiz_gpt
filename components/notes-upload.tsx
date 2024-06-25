"use client"
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

export function NotesUpload() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  const showSpinner = () => {
    setIsLoading(true)
  }

  const hideSpinner = () => {
    setIsLoading(false)
  }

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
        hideCloseButton={true} className='md:max-w-[800px]'>
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
          <NotesForm showSpinner={showSpinner} hideSpinner={hideSpinner} closeDialog={closeDialog} />
        </div>
        <DialogFooter></DialogFooter>
        {isLoading && <div className="flex items-center justify-center h-full">
          <Loader />
        </div>}
      </DialogContent>
    </Dialog>
  );
}
