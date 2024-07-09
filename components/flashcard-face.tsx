import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { AlertDialogTrigger } from './ui/alert-dialog';
import { FlashcardFaceButton } from './flashcard-face-button';

export function FlashcardFace({
  name,
  flashcardID,
  createdAt,
}: {
  name: string;
  flashcardID: number;
  createdAt: string;
}) {
  return (
    <Card className='w-[480px]'>
      <CardHeader>
        <div className='flex flex-row justify-between items-center'>
          <CardTitle>{name}</CardTitle>
          {/* maybe prop drilling but we can refactor later */}
          <FlashcardFaceButton flashcardID={flashcardID} name={name} />
        </div>
        <CardDescription>
          Created on {createdAt.substring(0, 10)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialogTrigger asChild>
          <Button>Open</Button>
        </AlertDialogTrigger>
      </CardContent>
    </Card>
  );
}