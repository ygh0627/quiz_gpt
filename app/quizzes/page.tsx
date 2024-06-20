import { NotesUpload } from '@/components/notes-upload';
import { QuizForm } from '@/components/quiz-form';
import { QuizList } from '@/components/quiz-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { generateQuiz } from '@/utils/openai';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function QuizzesPage() {
  const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   return redirect('/login');
  // }
  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('contenttype', 'quiz')
    .order('created_at', { ascending: false });

  //const response = await generateQuiz("The solar system consists of the Sun, a nearly perfect sphere of hot plasma, and the celestial objects gravitationally bound to it. This includes eight planets, their moons, dwarf planets, and countless smaller objects like asteroids and comets. The planets, in order of their distance from the Sun, are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has unique characteristics, with terrestrial planets (Mercury, Venus, Earth, Mars) being rocky and gas giants (Jupiter, Saturn, Uranus, Neptune) mostly composed of hydrogen and helium. The solar system also contains the asteroid belt between Mars and Jupiter, and the Kuiper Belt and Oort Cloud at its fringes, which are regions filled with icy bodies and cometary nuclei.");
  //console.log(response.choices[0].message.content);

  return (
    <section className='p-3 pt-6 max-w-6xl w-full flex flex-col gap-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Quizzes
      </h1>

      <QuizForm />
      <Separator className='w-full' />
      
      <QuizList quizzes={content} />
      <NotesUpload />
      <div className='text-sm'>
        {`{"name":"History Quiz","contentType":"quiz","content":[{"id":"1","prompt":"Who was the first President of the United States?","answerChoices":["a) Thomas Jefferson","b) George Washington","c) Abraham Lincoln","d) John Adams"],"correctAnswer":"b","explanation":"George Washington was the first President of the United States.","isComplete":true,"isCorrect":null,"difficulty":"easy","hint":"He was a general during the American Revolutionary War."},{"id":"2","prompt":"In which year did the Titanic sink?","answerChoices":["a) 1905","b) 1912","c) 1920","d) 1915"],"correctAnswer":"b","explanation":"The Titanic sank in 1912 after hitting an iceberg.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"It was during the early 20th century."},{"id":"3","prompt":"Who was the principal author of the Declaration of Independence?","answerChoices":["a) Benjamin Franklin","b) John Adams","c) Thomas Jefferson","d) James Madison"],"correctAnswer":"c","explanation":"Thomas Jefferson was the principal author of the Declaration of Independence.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"He later became the third President of the United States."}]}
`}
      </div>
      <div className='text-sm'>
        {`{"name":"Science Quiz","contentType":"quiz","content":[{"id":"1","prompt":"What is the chemical symbol for water?","answerChoices":["a) H2O","b) CO2","c) O2","d) H2"],"correctAnswer":"a","explanation":"H2O is the chemical formula for water, consisting of two hydrogen atoms and one oxygen atom.","isComplete":true,"isCorrect":null,"difficulty":"easy","hint":"It's a common formula taught in early science classes."},{"id":"2","prompt":"What planet is known as the Red Planet?","answerChoices":["a) Venus","b) Saturn","c) Mars","d) Jupiter"],"correctAnswer":"c","explanation":"Mars is known as the Red Planet due to its reddish appearance caused by iron oxide on its surface.","isComplete":true,"isCorrect":null,"difficulty":"easy","hint":"It's named after the Roman god of war."},{"id":"3","prompt":"What gas do plants absorb from the atmosphere?","answerChoices":["a) Oxygen","b) Nitrogen","c) Carbon Dioxide","d) Hydrogen"],"correctAnswer":"c","explanation":"Plants absorb carbon dioxide from the atmosphere and use it in photosynthesis to produce oxygen.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"It's essential for the process of photosynthesis."}]}
`}
      </div>
      <div className='text-sm'>
        {`{"name":"Math Quiz","contentType":"quiz","content":[{"id":"1","prompt":"What is the value of pi to two decimal places?","answerChoices":["a) 3.12","b) 3.14","c) 3.16","d) 3.18"],"correctAnswer":"b","explanation":"Pi is approximately 3.14 to two decimal places.","isComplete":true,"isCorrect":null,"difficulty":"easy","hint":"It's a famous irrational number used in mathematics."},{"id":"2","prompt":"What is the square root of 144?","answerChoices":["a) 10","b) 11","c) 12","d) 13"],"correctAnswer":"c","explanation":"The square root of 144 is 12.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"It's a perfect square number."},{"id":"3","prompt":"If a triangle has angles 90°, 45°, and 45°, what type of triangle is it?","answerChoices":["a) Equilateral","b) Scalene","c) Isosceles","d) Right-angled"],"correctAnswer":"d","explanation":"A triangle with angles 90°, 45°, and 45° is a right-angled triangle.","isComplete":true,"isCorrect":null,"difficulty":"medium","hint":"One angle is a right angle."}]}
`}
      </div>
    </section>
  );
}
