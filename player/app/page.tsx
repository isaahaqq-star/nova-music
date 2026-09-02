import type { Metadata } from 'next'
import { Player } from '@/components/Player'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: '401K • NOVA MUSIC',
  description: 'YolaJo — 401K Album • Private Listening Player',
  openGraph: {
    title: '401K by YolaJo',
    description: 'NOVA MUSIC private listening player',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main>
      <Player />
    </main>
  )
}
