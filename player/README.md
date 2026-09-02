# NOVA MUSIC Player

Next.js web-based audio player for the 401K album.

## Features

- ⏯️ Play/pause controls
- ⏭️ Next/previous track navigation
- 🎚️ Progress bar with seek
- 📊 Anonymous playback event logging
- 🎨 Dark mode UI with accent colors
- 📱 Mobile responsive
- 🚀 Deployed on Vercel

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Set the following in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anonymous key
- `NEXT_PUBLIC_R2_URL` — Cloudflare R2 audio endpoint (e.g., `https://audio.nova-music.dev`)

### 3. Development

```bash
npm run dev
```

Open http://localhost:3000

## Architecture

```
player/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main player page
├── components/
│   └── Player.tsx           # Player component
├── lib/
│   ├── supabase.ts          # Supabase client & utilities
│   └── tracks.ts            # Track data & helpers
├── styles/
│   └── globals.css          # Global CSS
├── public/
│   └── index.html           # Static HTML
└── package.json
```

## Track List

01. STOP PLAYING WITH ME
02. BANKROLLS & POLES
03. TRAP JUMPIN
04. FULL EFFECT
05. INTL' PLAYA
06. ROADRUNNER
07. R.B.I.T.K
08. GOT IT BACK
09. WHY LIE
10. WHY THEY MAD
11. CRAZY WORLD
12. HOW I FEEL

## Deployment

### Vercel

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from `player/` directory

```bash
vercel --prod
```

## API Integration

### Audio URLs

Audio files are served from Cloudflare R2:

```
https://audio.nova-music.dev/audio/401k/{trackNumber}.mp3
```

### Playback Events

Anonymous playback events are logged to Supabase:

```typescript
await logPlaybackEvent(trackNumber, 'playing')
```

Supported event types:
- `playing` — Playback started
- `paused` — Playback paused
- `seeked` — User seeked in track
- `track_loaded` — Track metadata loaded
- `track_completed` — Track finished playing
- `next_clicked` — User clicked next
- `previous_clicked` — User clicked previous
