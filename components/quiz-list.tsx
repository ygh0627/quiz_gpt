import { QuizItems } from './quiz-items';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';
import { QuizFace } from './quiz-face';

export async function QuizList({
  quizzes,
}: {
  quizzes:
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
        {quizzes?.map((quiz) => {
          return (
            <AlertDialog key={`alert-dialog-${quiz.id}`}>
              <QuizFace
                key={`quiz face ${quiz.id}`}
                name={quiz.name!}
                quizID={quiz.id}
                createdAt={quiz.created_at}
              />

              <AlertDialogContent className='min-w-[1200px] h-[800px]'>
                <QuizItems key={quiz.id} quiz={quiz} />
              </AlertDialogContent>
            </AlertDialog>
          );
        })}
      </div>
    </>
  );
}
