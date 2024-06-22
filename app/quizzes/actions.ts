"use server";
import { Quiz } from "@/types/custom";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs";

export async function addQuiz(quiz: string) {
  const supabase = createClient();
  const contentObject = JSON.parse(quiz);
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not logged in");
  }

  const { data: writer, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("userId", user.id)
    .single();

  const { error } = await supabase.from("content").insert({
    user_id: writer.uuid,
    name: contentObject.name,
    contenttype: contentObject.contentType,
    content: contentObject.content,
  });

  if (error) {
    console.log(error);
    throw new Error("Error inserting quiz");
  }

  revalidatePath("/quizzes");
}

export async function deleteQuiz(id: number) {
  const supabase = createClient();
  const user = await currentUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { data: writer, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("userId", user.id)
    .single();

  const { error } = await supabase.from("content").delete().match({
    user_id: writer.uuid,
    id,
  });

  if (error) {
    throw new Error("Error deleting quiz");
  }

  revalidatePath("/quizzes");
}

export async function updateQuiz(quiz: Quiz) {
  const supabase = createClient();
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not logged in");
  }

  const { data: writer, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("userId", user.id)
    .single();

  const { error } = await supabase.from("content").update(quiz).match({
    user_id: writer.uuid,
    id: quiz.id,
  });

  if (error) {
    throw new Error("Error updating quiz");
  }

  revalidatePath("/quizzes");
}
