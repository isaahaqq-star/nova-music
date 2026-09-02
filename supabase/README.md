# Supabase Configuration

NOVA MUSIC uses Supabase for:
- Track and album metadata
- Playback event logging (no user identification required)
- Database and authentication infrastructure

## Database Schema

### Tables

- **albums** — Album metadata (title, artist, status, artwork)
- **tracks** — Track listings with URLs and metadata
- **playback_events** — Anonymous playback telemetry (no user tracking)

### Security

- **RLS Enabled:** All tables use Row Level Security
- **Public Read:** Albums and tracks are publicly readable
- **Public Insert:** Playback events can be logged anonymously
- **Protected Write:** Only authenticated admins can modify albums/tracks

## Seed Data

Run migrations to initialize 401K album data:

```bash
supabase db push
```

This will:
1. Create schema and indexes
2. Enable RLS policies
3. Seed 401K album with 12 tracks
