---
SOT-0323-TL-GGBOTKB.md
Author: TL | Date: 2026-03-23
Purpose: GGBot @KBMkr identity and knowledge file location
---

# GGBot @KBMkr — SOT

## Identity
- **Name:** GGBot @KBMkr
- **Port:** 10333
- **Role:** KB-Maker v2 expert bot — the bot you talk to about KB-Maker
- **Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\adir\`
- **Start:** `adir\START-GGBOT.bat`

## Knowledge Files
- **Path:** `data/social-knowledge/` (keep this path — matches config.json)
- **Files:**
  - `kbmaker-guide.md` — Full KB-Maker-v2 CLAUDE.md (deploy guide, API reference, config fields)
  - `quick-start.md` — Quick start guide
  - `working.md` — Working notes
  - `current.md` — Current status

## What It Knows
- How to deploy bots via `POST /api/deploy-bot`
- Config.json field reference for deployed bots
- Template system (TEMPLATE-TANDRSOCIAL-CLEAN)
- Known ports, safe port ranges
- Troubleshooting common deployment errors
- How to customize bot prompts, knowledge, and UI

## TANDRmgr Relay
- Service key: `ggbotkb`
- Call via: `[ASK:ggbotkb] your question about KB-Maker`

## Notes
- Do NOT edit config.json while bot is running via dashboard — causes conflicts
- Knowledge files in `data/social-knowledge/` update immediately (no restart)
- System prompt update requires config.json edit + bot restart
- Template used by KB-Maker for new builds: `../TEMPLATE-TANDRSOCIAL-CLEAN`
- Future: template should be updated to Librarian-based (deferred)
