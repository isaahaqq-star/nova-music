# NOVA MUSIC

**401K Private Listening Player** — Secure web-based audio player for YolaJo's 401K album.

## 🎵 Project Structure

```
nova-music/
├── player/              # Next.js frontend (Vercel)
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── lib/            # Utilities (Supabase, helpers)
│   ├── styles/         # Global CSS
│   ├── public/         # Static assets
│   └── package.json
├── backend/            # Cloudflare Workers (audio delivery)
│   ├── src/           # Worker source code
│   ├── wrangler.toml  # Cloudflare config
│   └── package.json
└── supabase/          # Database schema
    └── migrations/    # SQL migrations
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- Supabase account
- Vercel account
- Cloudflare account with Workers

### 2. Environment Setup

**Frontend:**
```bash
cd player
cp .env.example .env.local
# Edit .env.local with your Supabase and R2 URLs
```

**Backend:**
```bash
cd backend
cp .env.example .env
# Configure Cloudflare credentials
```

### 3. Install Dependencies

```bash
# Frontend
cd player
npm install

# Backend
cd backend
npm install
```

### 4. Database Setup

```bash
# Run migrations (requires Supabase CLI)
supabase db push
```

### 5. Development

```bash
# Frontend (localhost:3000)
cd player
npm run dev

# Backend (local testing)
cd backend
npm run dev
```

## 📦 Deployment

### Frontend → Vercel

1. Connect repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from `player/` directory

```bash
vercel --prod
```

### Backend → Cloudflare Workers

```bash
cd backend
npm run deploy
```

Audio delivery will be available at `https://audio.nova-music.dev/audio/401k/:trackNumber.mp3`

### Database → Supabase

Migrations run automatically on deployment. Manual push:

```bash
supabase db push
```

## 🔐 Security

- **Secrets:** Never commit `.env` files with credentials
- **Audio:** Only approved MP3 listening copies in R2
- **Masters:** Private WAV files stored separately
- **Playback:** Anonymous event logging (no user identification)
- **RLS:** All database tables use Row Level Security

## 📋 Track Order (401K)

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

## 📚 Documentation

- [Frontend Setup](./player/README.md)
- [Backend Setup](./backend/README.md)
- [Database Schema](./supabase/README.md)

## ⚠️ Important

- Distribution status: DRAFT (no DSP distribution without MICMG approval)
- Private playback only
- Do not expose distribution masters
- Master token required for admin operations
