'use server';
import { Quiz } from '@/types/custom';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { currentUser } from '@clerk/nextjs';

export async function addQuiz(quiz: string) {
  const supabase = createClient();
  console.log(quiz);
  const contentObject = JSON.parse(quiz);
  const user = await currentUser();
  if (!user) {
    throw new Error('User is not logged in');
  }

  const { data: writer, error: userError } = await supabase
    .from('user')
    .select('*')
    .eq('userId', user.id)
    .single();
  console.log(user.id);
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

export async function deleteQuiz(id: number) {
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
    throw new Error('Error deleting quiz');
  }

  revalidatePath('/quizzes');
}

export async function updateQuiz(quiz: Quiz) {
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

  const { error } = await supabase.from('content').update(quiz).match({
    user_id: writer!.uuid,
    id: quiz.id,
  });

  if (error) {
    throw new Error('Error updating quiz');
  }

  revalidatePath('/quizzes');
}

/**********
 * OPENAI
 **********/
import OpenAI from 'openai';
import { Question } from '@/types/planning';

type notesInfo = {
  notes: string;
  difficulty: 'easy' | 'medium' | 'hard';
  numQuestions: number;
};
export async function generateQuiz({
  notes,
  difficulty,
  numQuestions,
}: notesInfo) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are tasked with creating a ${numQuestions} question multiple choice quiz based on the provided notes.
        The quiz questions should be of ${difficulty} difficulty. The quiz will consist of traditional multiple choice
        answer as well as true and false. You need to return the quiz as a JSON.stringified string and nothing else. 
        The template of the JSON is as follows:
        {
          name: string; 
          contentType: string;
          content: string;
        }
        The name field should be the name of the quiz, which is your choice. The contentType field should be 'quiz' only 
        and nothing else. The content field should be a JSON.stringified string of a JSON of the following template:
        
        {
          id: string;
          prompt: string;
          answerChoices: string[];
          correctAnswer: string; 
          explanation: string;
          isComplete: null;
          isCorrect: null;
          difficulty: 'easy' | 'medium' | 'hard';
          hint: string;
        }
        The id field should be an ID of your choosing. The prompt field must be a quiz question. The answer choices must
        be an array of answer choices (4 choices if a traditional multiple choice, or 2 choices if true/false). The 
        correctAnswer field should just be one letter (a, b, c, or d) denoting the correct answer. The explanation field 
        should be a string that contains an explanation of the solution. The isComplete field should always be null. The
        isCorrect field should always be null. The difficulty field should only either be 'easy', 'medium', or 'hard'. 
        Lastly, the hint field should be a string that contains a hint for the question.

        The above JSON is an example of one question. You will need to generate ${numQuestions} such questions, stringify them, 
        place the string in the content field of the first JSON, and then return the stringified version of that JSON.
        An small example of what you should return is as follows (without the outer quotes): 
        "
        {"name":"History Quiz","contentType":"quiz","content":[{"id":"1","prompt":"Who was the first President of the United States?","answerChoices":["a) Thomas Jefferson","b) George Washington","c) Abraham Lincoln","d) John Adams"],"correctAnswer":"b","explanation":"George Washington was the first President of the United States.","isComplete":true,"isCorrect":null,"difficulty":"easy","hint":"He was a general during the American Revolutionary War."},{"id":"2","prompt":"In which year did the Titanic sink?","answerChoices":["a) 1905","b) 1912","c) 1920","d) 1915"],"correctAnswer":"b","explanation":"The Titanic sank in 1912 after hitting an iceberg.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"It was during the early 20th century."},{"id":"3","prompt":"Who was the principal author of the Declaration of Independence?","answerChoices":["a) Benjamin Franklin","b) John Adams","c) Thomas Jefferson","d) James Madison"],"correctAnswer":"c","explanation":"Thomas Jefferson was the principal author of the Declaration of Independence.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"He later became the third President of the United States."}]}
        "

        Make sure the JSON string you return is exactly in accordance with the example string. Make sure to double quote 
        every field correctly. The JSON should have ABSOLUTELY ZERO ERRORS. MAKE SURE IT IS CORRECT. DO NOT PUT JSON.STRINGIFY 
        IN THE RETURNED ANSWER. IT SHOULD BE STRINGIFIED, NOT WRITTEN AS STRINGIFIED. MAKE SURE ALL NECESSARY COMMAS AND BRACKETS ARE PROVIDED. I WANT ZERO MISTAKES OR I WILL REPORT TO YOU THE POLICE. Also make sure the
        returned string is under 2500 tokens in length.
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

type quizFormSubmitType = {
  data: FormData;
  difficulty: 'easy' | 'medium' | 'hard';
  numQuestions: number;
};
export async function quizFormSubmit({
  data,
  difficulty,
  numQuestions,
}: quizFormSubmitType) {
  const text = data.get('notes') as string | null;
  if (!text) {
    throw new Error('Text is required');
  }
  // send notes to chatgpt
  const response = await generateQuiz({
    notes: text,
    difficulty: difficulty,
    numQuestions: numQuestions,
  });

  // get quiz
  //const quiz = response!.choices[0].message.content;
  const quiz = response;
  await addQuiz(quiz!);
  revalidatePath('/quizzes');
}

export async function markQuestionCorrect(quizID: number, questionID: string) {
  const supabase = createClient();
  const user = await currentUser();
  if (!user) {
    throw new Error('User is not logged in');
  }

  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('contenttype', 'quiz')
    .order('created_at', { ascending: false });
  if (content === null) {
    return;
  }
  console.log(user.id);
  for (const quiz of content) {
    if (quiz.id === quizID) {
      const currentQuiz: Question[] = JSON.parse(quiz.content!);
      for (const question of currentQuiz) {
        if (question.id === questionID) {
          question.isCorrect = true;
          const { error } = await supabase
            .from('content')
            .update({ content: JSON.stringify(currentQuiz) })
            .eq('id', quizID);
        }
      }
    }
  }
  revalidatePath('/quizzes');
}
