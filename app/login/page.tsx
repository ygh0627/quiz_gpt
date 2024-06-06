import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OAuthButtons } from './oauth-buttons';
import { revalidatePath } from 'next/cache';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    revalidatePath('/', 'layout');
    return redirect('/quizzes');
  }

  return (
    <section className='h-[calc(100vh-60px)] flex justify-center items-center'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Choose an OAuth provider to login</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <OAuthButtons />
        </CardContent>
      </Card>
    </section>
  );
}
