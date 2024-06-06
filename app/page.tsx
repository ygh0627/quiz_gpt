import Flashcard from '@/components/flashCard'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Flashcard front="Front Side" back="Back Side" />
    </div>
  )
}
