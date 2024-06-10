// from typescript perspective
type Question = {
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

// from db perspective
type QuizTest = {
  id: string; // quiz id
  user_id: string; // id of the student in the database
  name: string; // name of the Quiz
  Questions: string; // thinking about using json.stringify to simplify the db stuff, but it practice it will be an
  //array of Questions with each questions' respective properties - can use json.parse to get the array back
  //created_at: Date // only used in the db so commented out here
};

// command used in supabase SQL editor
/* 
create table quizzes (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  questions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table quizzes enable row level security;
create policy "Students can create quizzes." on quizzes for
  insert with check (auth.uid() = user_id);
create policy "Students can read their quizzes." on quizzes for
  select using ((select auth.uid()) = user_id);
create policy "Students can update their quizzes." on quizzes for
  update using ((select auth.uid()) = user_id);
create policy "Students can delete their quizzes." on quizzes for
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