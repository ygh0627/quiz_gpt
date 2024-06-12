import { QuizForm } from '@/components/quiz-form';
import { QuizList } from '@/components/quiz-list';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function QuizzesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login');
  }
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select()
    .order('created_at', { ascending: false });
  return (
    <section className='p-3 pt-6 max-w-2xl w-full flex flex-col gap-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Quizzes
      </h1>
      <div className='text-sm font-medium text-destructive'>
        FOR TESTING ONLY - DO NOT PASTE AND SEND ANYTHING OTHER THAN THESE
        STRINGS UNTIL JSON VALIDATOR IS CREATED
      </div>

      <div className='text-sm'>
        {`{"id":"3","isCorrect":null,"prompt":"What is the boiling point of water?","answerChoices":["a) 90°C","b) 100°C","c) 110°C","d) 120°C"],"correctAnswer":"b","explanation":"Water boils at 100°C under standard atmospheric pressure.","isComplete":false,"difficulty":"easy","hint":"It is a common knowledge temperature."}`}
      </div>
      <div className='text-sm'>
        {`{"id":"4","isCorrect":null,"prompt":"Who wrote 'To Kill a Mockingbird'?","answerChoices":["a) Harper Lee","b) J.K. Rowling","c) Mark Twain","d) Ernest Hemingway"],"correctAnswer":"a","explanation":"Harper Lee is the author of 'To Kill a Mockingbird'.","isComplete":false,"difficulty":"medium","hint":"The author's last name is Lee."}`}
      </div>
      <div className='text-sm'>
        {`{"id":"5","isCorrect":null,"prompt":"What is the capital of Japan?","answerChoices":["a) Beijing","b) Seoul","c) Tokyo","d) Bangkok"],"correctAnswer":"c","explanation":"Tokyo is the capital city of Japan.","isComplete":false,"difficulty":"easy","hint":"It is one of the most populous cities in the world."}`}
      </div>

      <QuizForm />

      <Separator className='w-full' />
      <QuizList quizzes={quizzes} />
    </section>
  );
}
