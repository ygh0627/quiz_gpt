// from typescript perspective
export type Question = {
  id: string;
  prompt: string;
  answerChoices: string[];
  correctAnswer: string; // string or "a" ... or "true"
  explanation: string;
  isComplete: boolean | null;
  isCorrect: boolean | null;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
};

export type FlashcardType = {
  id: string;
  front: string;
  back: string;
};

// from db perspective
type ContentTest = {
  id: string; // quiz id
  user_id: string; // id of the student in the database
  name: string; // name of the module
  contentType: string; // string but really only flashcard or quiz
  content: string; // thinking about using json.stringify to simplify the db stuff, but it practice it will be an
  //array of Questions or Flashcards with each item's respective properties - can use json.parse to get the array back
  //created_at: Date // only used in the db so commented out here
};

// command used in supabase SQL editor
/* 
create table content (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  name text,
  contentType text,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table content enable row level security;
create policy "Students can create content." on content for
  insert with check (auth.uid() = user_id);
create policy "Students can read their content." on content for
  select using ((select auth.uid()) = user_id);
create policy "Students can update their content." on content for
  update using ((select auth.uid()) = user_id);
create policy "Students can delete their content." on content for
  delete using ((select auth.uid()) = user_id);

*/

const questions: Question[] = [
  {
    id: '1',
    prompt: 'What is the capital of France?',
    answerChoices: ['a) Berlin', 'b) Madrid', 'c) Paris', 'd) Rome'],
    correctAnswer: 'c',
    explanation: 'Paris is the capital city of France.',
    isComplete: false,
    difficulty: 'easy',
    isCorrect: null,
    hint: 'It is also known as the city of love.',
  },
  {
    id: '2',
    isCorrect: null,
    prompt: 'The Earth is flat.',
    answerChoices: ['a) True', 'b) False'],
    correctAnswer: 'false',
    explanation: 'The Earth is an oblate spheroid, not flat.',
    isComplete: false,
    difficulty: 'easy',
    hint: 'Think about the shape of the planet.',
  },
];
