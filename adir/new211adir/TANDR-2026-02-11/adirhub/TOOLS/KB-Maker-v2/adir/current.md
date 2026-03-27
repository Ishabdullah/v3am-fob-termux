**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  KB-Maker-v2\adir\current.md                                        ║
║  Updated: 2026-03-16 | Bot factory status snapshot.                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: KB-Maker v2 is a core service running on port 9220.         ║
║  This file tells you what's running and what needs attention.        ║
║                                                                      ║
║  Service: http://127.0.0.1:9220                                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Service State: Running

KB-Maker v2 is live on port 9220. It starts with MasterSTART6 or START-ALL.bat alongside the other core services and is operational.

**Verify:** [http://127.0.0.1:9220/api/status](http://127.0.0.1:9220/api/status)

---

## Deployment History

One bot has been deployed through KB-Maker:

| Name | Port | Status | Location |
|------|------|--------|----------|
| GGBOT | 10336 | Working | `adirhub\TOOLS\GGBOT` |

**Next available port:** 10337 (safe range: 10337–10399)

---

## What Needs Attention

**Config.json has exposed API keys.** The Anthropic API key is visible in config.json. Should be rotated or replaced with a placeholder. This is inherited from the template — every bot deployed also gets a copy of this key.

**Old adir files are stale.** The `adir/` directory contains files from when this was TANDRSocial (Era 1) — references to `C:\V3AM`, port 8099, Facebook Graph API, tandradmin desktop paths. These are template artifacts, not current documentation. The nested `adir/adir/` directory also has stale SOT files and old BOOT/index content. All should be cleaned up or deleted.

**Bot port range in config is misleading.** Config.json lists `bot_port_range: [9220, 9229]` but deployed bots actually use ports 10336+. The range in config is a suggestion, not a constraint — the deploy endpoint uses whatever port you pass in the request body.

**Default model is gemma:2b.** Config.json sets the default LLM model to `gemma:2b`. This is fine for testing but may not be the best choice for production bots. The model can be overridden per-bot at deploy time.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console format. Old TANDRSocial-era documentation replaced with current KB-Maker v2 content.

**2026-03-13:** NEW-313-BOOT.md was written as a brief boot guide for KB-Maker. Now superseded by the full BOOT.md rewrite.

---

## Quick Checks

| What | URL |
|------|-----|
| KB-Maker status | [http://127.0.0.1:9220/api/status](http://127.0.0.1:9220/api/status) |
| KB-Maker web UI | [http://127.0.0.1:9220/](http://127.0.0.1:9220/) |
| KB-Maker health | [http://127.0.0.1:9220/health](http://127.0.0.1:9220/health) |
| GGBOT status | [http://127.0.0.1:10336/api/bot.php?action=status](http://127.0.0.1:10336/api/bot.php?action=status) |

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know the bot factory's current state. Your next move:           ║
║                                                                      ║
║  → How KB-Maker works under the hood:                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    KB-Maker-v2\adir\working.md                                      ║
║                                                                      ║
║  → Back to this service's index:                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    KB-Maker-v2\adir\index.md                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-kb-maker-status.md                                  ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
