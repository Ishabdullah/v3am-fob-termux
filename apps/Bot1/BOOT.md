324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example

# TANDRSocial - Boot Loader

Load this to USE TANDRSocial. For building/modifying, see CLAUDE.md.

---

## What Is This?

Employee-only social media content management AI. Researches FB trends, drafts posts, analyzes engagement. Uses Facebook Graph API (not Messenger like TANDRbot).

## Status: PAUSED

Waiting on Facebook page admin access to generate Page Access Token. Everything else is built and ready.

## Dependencies

- Node.js (server.js on port 8099)
- Ollama (localhost:11434)
- Facebook Graph API token (NOT YET CONFIGURED)

## Start

```bash
cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial
node server.js
```
Or: `C:\Users\tandradmin\Desktop\2026Start\START-TANDRSOCIAL.bat`

## Test

```bash
curl "http://localhost:8099/api/bot.php?action=status"
```

## Access

| URL | Purpose |
|-----|---------|
| http://localhost:8099/ | Chat UI |
| http://localhost:8099/dashboard.html | Admin panel |
| api/bot.php?action=status | Health check |
| api/graph-api.php | Facebook Graph API wrapper |

## Key Differences from TANDRbot

- Employee-only (not public)
- Graph API (reads feeds, drafts posts) vs Messenger webhook
- Knowledge in data/social-knowledge/ (brand voice, audience, services)
- Bot writes drafts to adir/logs/post-drafts/

## Next Steps

1. Get FB page admin access
2. Generate Page Access Token
3. Update config.json with token
4. Test: `php api/graph-api.php?test=graph`

## Facebook App

- App ID: 1
- App Name: TANDRSocial Content Manager

---

See [REGISTRY.md](../../../adirhub/REGISTRY.md) for all endpoints.


324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example