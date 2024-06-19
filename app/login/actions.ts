"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helpers";

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/login?message=No provider selected");
  }

  const supabase = createClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `https://dniupvfeibclkakhiagi.supabase.co/auth/v1/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }
  console.log(`data`, data);
  console.log(`redirectUrl`, redirectUrl);
  revalidatePath("/quizzes");
  return redirect(data.url);
}
