import { NotesUpload } from '@/components/notes-upload';
import { QuizForm } from '@/components/quiz-form';
import { QuizList } from '@/components/quiz-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function QuizzesPage() {
  const supabase = createClient();

  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('contenttype', 'quiz')
    .order('created_at', { ascending: false });

  return (
    <section className='p-3 pt-6 max-w-6xl w-full flex flex-col gap-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Quizzes
      </h1>
      <Separator className='w-full' />
      <QuizList quizzes={content} />
      <div>Sample notes for presentation demo:</div>
      <div>
        The solar system is a vast and intricate cosmic neighborhood centered
        around the Sun, a star located at its heart. It spans over 4.6 billion
        years in age and consists of the Sun, eight planets, their moons, dwarf
        planets like Pluto, asteroids, comets, and a vast amount of smaller
        objects orbiting the Sun. The eight planets are divided into two main
        types: terrestrial planets (Mercury, Venus, Earth, and Mars) with solid,
        rocky surfaces, and gas giants (Jupiter and Saturn) along with ice
        giants (Uranus and Neptune) composed primarily of hydrogen and helium.
      </div>
      <div>
        The inner solar system, where the terrestrial planets reside, is
        characterized by rocky bodies and shorter orbital periods. Mercury, the
        closest planet to the Sun, experiences extreme temperatures due to its
        lack of atmosphere, while Venus is shrouded in thick clouds of sulfuric
        acid and has a runaway greenhouse effect. Earth, the third planet from
        the Sun, is uniquely suited for life with its moderate temperatures and
        abundant liquid water. Mars, often referred to as the "Red Planet,"
        features vast deserts, polar ice caps, and evidence of ancient rivers
        and lakes.
      </div>
      Beyond Mars lies the asteroid belt, a region populated by rocky objects,
      some of which are remnants from the early solar system's formation. The
      outer solar system hosts the gas giants: Jupiter, the largest planet, with
      its iconic Great Red Spot and extensive system of moons; Saturn, known for
      its prominent rings made of ice and rock particles; Uranus and Neptune,
      characterized by their icy compositions and unique rotational axes. These
      outer planets are much colder than their inner counterparts and have
      numerous moons, some with intriguing features like geysers and subsurface
      oceans.
      <div>
        <div>
          The solar system is not static but dynamic, with ongoing discoveries
          and explorations revealing new insights into its formation and
          evolution. Space missions like Voyager, Cassini, and New Horizons have
          provided detailed data about distant worlds and continue to expand our
          understanding of the solar system's vast diversity and complexity.
        </div>
      </div>
      <NotesUpload />
    </section>
  );
}
