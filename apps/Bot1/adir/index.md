**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - INDEX                                                 ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-TANDRSOCIAL-CLEAN\adir\index.md                           ║
║  Updated: 2026-03-16 | You are at the template crossroads.          ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the navigation index for the TANDRSocial bot         ║
║  template. This is NOT a running service — it's a blueprint that     ║
║  Agent-Dropper copies to create new social media bots.               ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# TEMPLATE-TANDRSOCIAL-CLEAN Index

You're standing inside one of the two templates that Agent-Dropper v2 uses to build bots. This one creates social media content management bots — bots that read a knowledge base, draft posts, and optionally connect to Facebook's Graph API. The other template (JERRY) creates standard agents.

---

## What Do You Need?

### "How do I operate this template?"

BOOT.md explains how to test it, how Agent-Dropper uses it, the request flow, the knowledge base system, and troubleshooting.

→ [BOOT.md](./BOOT.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\BOOT.md`

### "What's the current state of this template?"

current.md tells you what's working, what's changed recently, and what needs attention.

→ [current.md](./current.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\current.md`

### "How does this template work under the hood?"

working.md explains the architecture — the content drafting pipeline, the knowledge base system, the Facebook Graph API integration, the sandboxing model, and how Agent-Dropper transforms this template into a running bot.

→ [working.md](./working.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\working.md`

---

## What's In This Template

Walking up one level from `adir\` into the template root, here's what you'll find:

| File/Directory | Purpose |
|----------------|---------|
| `server.js` | Express server — reads port from config.json, routes `/api/*` to PHP |
| `config.json` | All configuration — port, LLM, knowledge paths, Facebook API, security |
| `index.html` | Chat interface — where users talk to the bot |
| `dashboard.html` | Admin panel — content review and settings |
| `api/bot.php` | Main API — chat, content generation, file operations |
| `api/graph-api.php` | Facebook Graph API wrapper — feeds, search, insights |
| `api/security.php` | Sandboxing — path validation, extension whitelist |
| `api/providers/` | LLM connectors — ollama.php, anthropic.php |
| `data/social-knowledge/` | Knowledge base — company voice, products, audience |
| `adir/` | You are here — documentation and logs |
| `adir/logs/` | Conversation logs, post drafts, feed cache, errors |

---

## Where You Can Walk

### Up to the TOOLS Directory

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\`

Walk up to see all the tools — Agent-Dropper, KB-Maker, GGBOT, Parser, and the other template (JERRY).

### Over to the JERRY Template

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\adir\`

The standard agent template. Compare it with this one to understand the difference between an agent and a bot.

### Up to the Hub

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md`

Back to the central crossroads of the entire ADIR system.

### Into the Logs

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\logs\`

Conversation history, post drafts, feed cache, error logs. These are template examples — deployed bots get their own.

---

## The ADIR Reading Order

Same pattern as everywhere in the system:

1. **BOOT.md** — How to operate (you should read this first here — no REGISTRY for templates)
2. **index.md** — Where to go (you are here)
3. **current.md** — What's happening now
4. **working.md** — How it works under the hood

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're at the template crossroads. Choose your path:                ║
║                                                                      ║
║  → How to operate:                                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\BOOT.md                          ║
║                                                                      ║
║  → How it works:                                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\working.md                       ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this index, create:                                       ║
║  SOT-[YYYYMMDD]-tandrsocial-template-index.md                       ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
