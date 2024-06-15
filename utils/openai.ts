import OpenAI from 'openai';

export async function generateQuiz(notes: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Return a short summary for the provided notes at the level of a second grader',
      },
      {
        role: 'user',
        content: notes,
      },
    ],
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
  });
  return response;
}
