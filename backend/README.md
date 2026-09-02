# 401K Player Backend

Cloudflare Workers backend for NOVA MUSIC audio delivery.

## Setup

```bash
npm install
npx wrangler secret put MASTER_TOKEN
npx wrangler r2 bucket create nova-music-audio
npx wrangler r2 bucket create nova-music-masters
npm run deploy
```

## Environment

Configure in `wrangler.toml`:
- `MASTER_TOKEN` — Admin API key for protected operations
- R2 buckets for audio and master storage
