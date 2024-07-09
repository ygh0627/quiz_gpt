import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { FlashcardType } from '@/types/planning';
import { AlertDialogCancel } from './ui/alert-dialog';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import Flashcard from './flashcard';

export function FlashcardItems({
  flashcard,
}: {
  flashcard: {
    content: string | null;
    contenttype: string | null;
    created_at: string;
    id: number;
    name: string | null;
    user_id: string;
  };
}) {
  const flashcards: FlashcardType[] = JSON.parse(flashcard.content!);

  return (
    <Card>
      <div className='flex flex-col justify-center '>
        <CardHeader className='flex flex-row justify-between items-end'>
          <CardTitle>{flashcard.name}</CardTitle>
          <AlertDialogCancel>
            <X />
          </AlertDialogCancel>
        </CardHeader>
        <div className='mx-6 -mt-4 mb-4'>
          <Separator />
        </div>
      </div>
      <div className='flex flex-grow h-[650px]'>
        <ScrollArea className='w-full'>
          <CardContent key={`CardContent-${flashcard.name}`}>
            <div className='flex flex-col items-center'>
              {flashcards.map((f, i) => (
                <Flashcard
                  key={`flashcard-${i}`}
                  front={f.front}
                  back={f.back}
                />
              ))}
            </div>
          </CardContent>
        </ScrollArea>
      </div>
    </Card>
  );
}
