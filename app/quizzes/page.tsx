import { NotesUpload } from '@/components/notes-upload';
import { QuizForm } from '@/components/quiz-form';
import { QuizList } from '@/components/quiz-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { generateQuiz } from '@/utils/openai';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function QuizzesPage() {
  const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   return redirect('/login');
  // }
  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('contenttype', 'quiz')
    .order('created_at', { ascending: false });

  return (
    <section className='p-3 pt-6 max-w-6xl w-full flex flex-col gap-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Quizzes
      </h1>

      <Separator className='w-full' />

      <QuizList quizzes={content} />
      <NotesUpload />
    </section>
  );
}
