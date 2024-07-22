'use server';
import { CustomFlashcardType } from '@/types/custom';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { currentUser } from '@clerk/nextjs';

export async function addFlashcard(flashcard: string) {
  const supabase = createClient();
  const contentObject = JSON.parse(flashcard);
  const user = await currentUser();
  if (!user) {
    throw new Error('User is not logged in');
  }

  const { data: writer, error: userError } = await supabase
    .from('user')
    .select('*')
    .eq('userId', user.id)
    .single();

  const { error } = await supabase.from('content').insert({
    user_id: writer!.uuid!,
    name: contentObject.name,
    contenttype: contentObject.contentType,
    content: contentObject.content,
  });

  if (error) {
    console.log(error);
    throw new Error('Error inserting quiz');
  }
}

export async function deleteFlashcard(id: number) {
  const supabase = createClient();
  const user = await currentUser();

  if (!user) {
    throw new Error('User is not logged in');
  }

  const { data: writer, error: userError } = await supabase
    .from('user')
    .select('*')
    .eq('userId', user.id)
    .single();

  const { error } = await supabase.from('content').delete().match({
    user_id: writer!.uuid!,
    id,
  });

  if (error) {
    throw new Error('Error deleting flashcard');
  }

  revalidatePath('/flashcards');
}

/**********
 * OPENAI
 **********/
import OpenAI from 'openai';

type notesInfo = {
  notes: string;
  numFlashcards: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

export async function generateFlashcards({
  notes,
  numFlashcards,
  difficulty,
}: notesInfo) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are tasked with creating ${numFlashcards} flashcards based on the provided notes. The flashcards 
        should be of ${difficulty} difficulty. The flashcards will consist
        of a front and a back. You need to return the flashcards as a JSON.stringified string and nothing else. 
        The template of the JSON is as follows:
        {
          name: string; 
          contentType: string;
          content: string;
        }
        The name field should be the name of the flashcards, which is your choice. The contentType field should be 'flashcard' only 
        and nothing else. The content field should be a JSON.stringified string of a JSON of the following template:
        
        {
          id: string;
          front: string;
          back: string;
        }
        The id field should be an ID of your choosing. There are two options for the flashcards. The first option is
         that the front may be a question, and the back can be the answer to the question. The second option is that 
         the front may be a definition, and the back can be the word associated with that definition.

        The above JSON is an example of one question. You will need to generate ${numFlashcards} such flashcards, stringify them, 
        place the string in the content field of the first JSON, and then return the stringified version of that JSON.
        An small example of what you should return is as follows (without the outer quotes): 
        "
        {"name":"History Flashcards","contentType":"flashcard","content":[{"id":"1","front":"Who was the first President of the United States?","back":"George Washington"},{"id":"2","front":"In which year did the Titanic sink?","back":"1912"},{"id":"3","front":"What is the capital of France?","back":"Paris"},{"id":"4","front":"What is the chemical symbol for water?","back":"H2O"},{"id":"5","front":"Who wrote 'To Kill a Mockingbird'?","back":"Harper Lee"}]}
        "

        Make sure the JSON string you return is exactly in accordance with the example string. Make sure to double quote 
        every field correctly. The JSON should have ABSOLUTELY ZERO ERRORS. MAKE SURE IT IS CORRECT. DO NOT PUT JSON.STRINGIFY 
        IN THE RETURNED ANSWER. IT SHOULD BE STRINGIFIED, NOT WRITTEN AS STRINGIFIED. MAKE SURE ALL NECESSARY COMMAS AND BRACKETS ARE PROVIDED. I WANT ZERO MISTAKES OR I WILL REPORT TO YOU THE POLICE. Also make sure the
        returned string is under 2000 tokens in length.
        `,
      },
      {
        role: 'user',
        content: notes,
      },
    ],
    temperature: 0.7,
    max_tokens: 3000,
    top_p: 1,
    stream: true,
  });
  let fullResponse = '';
  for await (const chunk of response) {
    if (chunk.choices[0].delta.content) {
      fullResponse = fullResponse + chunk.choices[0].delta.content;
      //console.log(chunk.choices[0].delta.content);
    }
  }

  return fullResponse;
}

type flashcardFormSubmitType = {
  data: FormData;
  difficulty: 'easy' | 'medium' | 'hard';
  numFlashcards: number;
};
export async function flashcardFormSubmit({
  data,
  numFlashcards,
  difficulty,
}: flashcardFormSubmitType) {
  const text = data.get('notes') as string | null;
  if (!text) {
    throw new Error('Text is required');
  }
  // send notes to chatgpt
  const response = await generateFlashcards({
    notes: text,
    numFlashcards: numFlashcards,
    difficulty: difficulty,
  });

  // get quiz
  //const quiz = response!.choices[0].message.content;
  const flashcard = response;
  await addFlashcard(flashcard!);
  revalidatePath('/flashcards');
}
