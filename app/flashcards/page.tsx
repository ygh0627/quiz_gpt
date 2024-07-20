import { FlashcardList } from '@/components/flashcard-list';
import { NotesUpload } from '@/components/notes-upload';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/utils/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function FlashcardsPage() {
  const supabase = createClient();
  const user = await currentUser();
  if (!user) {
    return redirect('/');
  }

  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('contenttype', 'flashcard')
    .order('created_at', { ascending: false });

  return (
    <section className='p=3 pt-6 max-w-6xl w-full flex flex-col gap-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Flashcards
      </h1>
      <Separator className='w-full' />
      <FlashcardList flashcards={content} />
      <NotesUpload />
    </section>
  );
}
