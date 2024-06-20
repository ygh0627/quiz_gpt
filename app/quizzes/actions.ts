"use server";
import { Quiz } from "@/types/custom";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addQuiz(quiz: string, userId: string | null | undefined) {
  const supabase = createClient();
  console.log(quiz);
  const contentObject = JSON.parse(quiz);

  if (!userId) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("content").insert({
    user_id: userId,
    name: contentObject.name,
    contenttype: contentObject.contentType,
    content: contentObject.content,
  });

  if (error) {
    console.log(error);
    console.log(userId);
    throw new Error("Error inserting quiz");
  }

  revalidatePath("/quizzes");
}

export async function deleteQuiz(
  id: number,
  userId: string | null | undefined
) {
  const supabase = createClient();

  if (!userId) {
    throw new Error("User is not logged in");
  }
  const { error } = await supabase.from("content").delete().match({
    user_id: userId,
    id: id,
  });

  if (error) {
    throw new Error("Error deleting quiz");
  }

  revalidatePath("/quizzes");
}

export async function updateQuiz(
  quiz: Quiz,
  userId: string | null | undefined
) {
  const supabase = createClient();

  if (!userId) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("content").update(quiz).match({
    user_id: userId,
    id: quiz.id,
  });

  if (error) {
    throw new Error("Error updating quiz");
  }

  revalidatePath("/quizzes");
}
