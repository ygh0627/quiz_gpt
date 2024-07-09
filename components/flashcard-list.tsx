import { FlashcardFace } from './flashcard-face';
import { AlertDialog, AlertDialogContent } from './ui/alert-dialog';
import { FlashcardItems } from './flashcard-items';

export async function FlashcardList({
  flashcards,
}: {
  flashcards:
    | {
        content: string | null;
        contenttype: string | null;
        created_at: string;
        id: number;
        name: string | null;
        user_id: string;
      }[]
    | null;
}) {
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        {flashcards?.map((flashcard) => {
          return (
            <AlertDialog key={`alert-dialog-${flashcard.id}`}>
              <FlashcardFace
                key={`flashcard-face-${flashcard.id}`}
                name={flashcard.name!}
                flashcardID={flashcard.id}
                createdAt={flashcard.created_at}
              />
              <AlertDialogContent className='min-w-[1200px] h-[800px]'>
                <FlashcardItems key={flashcard.id} flashcard={flashcard} />
              </AlertDialogContent>
            </AlertDialog>
          );
        })}
      </div>
    </>
  );
}
