export interface Track {
  number: number
  title: string
}

export const TRACKS: Track[] = [
  { number: 1, title: 'STOP PLAYING WITH ME' },
  { number: 2, title: 'BANKROLLS & POLES' },
  { number: 3, title: 'TRAP JUMPIN' },
  { number: 4, title: 'FULL EFFECT' },
  { number: 5, title: "INTL' PLAYA" },
  { number: 6, title: 'ROADRUNNER' },
  { number: 7, title: 'R.B.I.T.K' },
  { number: 8, title: 'GOT IT BACK' },
  { number: 9, title: 'WHY LIE' },
  { number: 10, title: 'WHY THEY MAD' },
  { number: 11, title: 'CRAZY WORLD' },
  { number: 12, title: 'HOW I FEEL' },
]

export function getTrackTitle(trackNumber: number): string {
  const track = TRACKS.find((t) => t.number === trackNumber)
  return track?.title || `Track ${trackNumber}`
}

export function getTotalTracks(): number {
  return TRACKS.length
}
