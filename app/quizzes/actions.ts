'use server';
import { Quiz } from '@/types/custom';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function addQuiz(formData: FormData) {
  const supabase = createClient();
  const text = formData.get('quiz') as string | null;
  if (!text) {
    throw new Error('Text is required');
  }

  const contentObject = JSON.parse(text);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User is not logged in');
  }

  const { error } = await supabase.from('content').insert({
    user_id: user.id,
    name: contentObject.name,
    contenttype: contentObject.contentType,
    content: contentObject.content,
  });

  if (error) {
    throw new Error('Error inserting quiz');
  }

  revalidatePath('/quizzes');
}

export async function deleteQuiz(id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User is not logged in');
  }
  const { error } = await supabase.from('content').delete().match({
    user_id: user.id,
    id: id,
  });

  if (error) {
    throw new Error('Error deleting quiz');
  }

  revalidatePath('/quizzes');
}

export async function updateQuiz(quiz: Quiz) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not logged in');
  }

  const { error } = await supabase.from('content').update(quiz).match({
    user_id: user.id,
    id: quiz.id,
  });

  if (error) {
    throw new Error('Error updating quiz');
  }

  revalidatePath('/quizzes');
}
