'use client';
import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant='default'
      className='fixed bottom-32 right-32 h-16 w-16 text-white p-4 rounded-full shadow-lg '
    >
      <Plus className='h-16 w-16' />
    </Button>
  );
}
