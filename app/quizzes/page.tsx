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
      <QuizForm />

      <Separator className='w-full' />
      <QuizList quizzes={quizzes} />
    </section>
  );
}
