export interface Track {
  track_number: number
  title: string
}

export interface AlbumInfo {
  title: string
  artist: string
  artworkUrl: string
}

export const ALBUM_INFO: AlbumInfo = {
  title: '401K',
  artist: 'YolaJo',
  artworkUrl: '/401k-cover.jpg',
}

export const TRACKS_401K: Track[] = [
  { track_number: 1, title: 'STOP PLAYING WITH ME' },
  { track_number: 2, title: 'BANKROLLS & POLES' },
  { track_number: 3, title: 'TRAP JUMPIN' },
  { track_number: 4, title: 'FULL EFFECT' },
  { track_number: 5, title: "INTL' PLAYA" },
  { track_number: 6, title: 'ROADRUNNER' },
  { track_number: 7, title: 'R.B.I.T.K' },
  { track_number: 8, title: 'GOT IT BACK' },
  { track_number: 9, title: 'WHY LIE' },
  { track_number: 10, title: 'WHY THEY MAD' },
  { track_number: 11, title: 'CRAZY WORLD' },
  { track_number: 12, title: 'HOW I FEEL' },
]

export const TRACKS = TRACKS_401K

export function getTrackTitle(trackNumber: number): string {
  const track = TRACKS_401K.find(
    (track) => track.track_number === trackNumber
  )

  return track?.title || `Track ${trackNumber}`
}

export function getTotalTracks(): number {
  return TRACKS_401K.length
}
