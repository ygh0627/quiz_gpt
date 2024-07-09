// created by Jay
'use client';
import { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard = ({ front, back }: FlashcardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className='perspective-1000 w-1/2 h-80 m-4'>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`absolute w-full h-full bg-white backface-hidden flex items-center justify-center p-4 border rounded-lg shadow-lg text-xl`}
        >
          {front}
        </div>
        <div
          className={`absolute w-full h-full bg-gray-200 backface-hidden flex items-center justify-center p-4 border rounded-lg shadow-lg transform rotate-y-180 text-xl`}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
