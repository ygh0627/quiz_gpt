import OpenAI from 'openai';

type notesInfo = {
  notes: string;
  difficulty: 'easy' | 'medium' | 'hard';
};
export async function generateQuiz({ notes, difficulty }: notesInfo) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are tasked with creating a five question multiple choice quiz based on the provided notes.
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

        The above JSON is an example of one question. You will need to generate 10 such questions, stringify them, 
        place the string in the content field of the first JSON, and then return the stringified version of that JSON.
        An small example of what you should return is as follows (without the outer quotes): 
        "
        {"name":"History Quiz","contentType":"quiz","content":[{"id":"1","prompt":"Who was the first President of the United States?","answerChoices":["a) Thomas Jefferson","b) George Washington","c) Abraham Lincoln","d) John Adams"],"correctAnswer":"b","explanation":"George Washington was the first President of the United States.","isComplete":true,"isCorrect":null,"difficulty":"easy","hint":"He was a general during the American Revolutionary War."},{"id":"2","prompt":"In which year did the Titanic sink?","answerChoices":["a) 1905","b) 1912","c) 1920","d) 1915"],"correctAnswer":"b","explanation":"The Titanic sank in 1912 after hitting an iceberg.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"It was during the early 20th century."},{"id":"3","prompt":"Who was the principal author of the Declaration of Independence?","answerChoices":["a) Benjamin Franklin","b) John Adams","c) Thomas Jefferson","d) James Madison"],"correctAnswer":"c","explanation":"Thomas Jefferson was the principal author of the Declaration of Independence.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"He later became the third President of the United States."}]}
        "

        Make sure the JSON string you return is exactly in accordance with the example string. Make sure to double quote 
        every field correctly. The JSON should have ABSOLUTELY ZERO ERRORS. MAKE SURE IT IS CORRECT. Also make sure the
        returned string is under 1500 tokens in length.
        `,
      },
      {
        role: 'user',
        content: notes,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
    top_p: 1,
  });
  return response;
}
