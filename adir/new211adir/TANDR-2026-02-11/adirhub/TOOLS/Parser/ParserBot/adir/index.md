**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - INDEX                                                 ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Parser\ParserBot\adir\index.md                                      ║
║  Updated: 2026-03-16 | You are inside ParserBot's workspace.         ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: ParserBot is a knowledge bot for parsed business documents.  ║
║  Deployed via KB-Maker v2 from TANDRSOCIAL template. Needs port      ║
║  configuration and system prompt customization.                      ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# ParserBot Index

You're inside ParserBot — a knowledge bot that reads the Parser directory's 60+ business documents and lets you chat with them. Contracts, financials, resumes, and SOT analysis files are all in its knowledge base.

---

## What Do You Need?

### "How do I start and operate this bot?"

→ [BOOT.md](./BOOT.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot\adir\BOOT.md`

### "What's the current state of this bot?"

→ [current.md](./current.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot\adir\current.md`

### "How does this bot work?"

→ [working.md](./working.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot\adir\working.md`

---

## What's In This Directory

| File/Directory | Purpose |
|----------------|---------|
| `server.js` | Express server (TANDRSOCIAL template, reads port from config.json) |
| `config.json` | Configuration — needs port at root level, system prompt uncustomized |
| `index.html` | Chat UI (TANDRSOCIAL template) |
| `dashboard.html` | Admin panel |
| `dashboard-pro.html` | Enhanced admin panel |
| `api/` | PHP API layer (bot.php, security.php, providers/) |
| `data/social-knowledge/` | Knowledge base — copies of parsed business documents |
| `adir/` | You are here — documentation and logs |
| `START-PARSERBOT.bat` | Windows startup script |
| `STOP-PARSERBOT.bat` | Windows shutdown script |

---

## Where You Can Walk

### The Documents (What ParserBot Reads)

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\`

The parent Parser directory with 60+ business documents.

### The Factory That Created This Bot

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\`

### Sibling Bot (GGBOT)

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\GGBOT\`

The reference example of a fully customized KB-Maker bot.

### Up to the Hub

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're inside ParserBot's workspace. Choose your path:              ║
║                                                                      ║
║  → How to operate this bot:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\ParserBot\adir\BOOT.md                                     ║
║                                                                      ║
║  → The documents this bot reads:                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\adir\index.md                                              ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this index, create:                                       ║
║  SOT-[YYYYMMDD]-parserbot-index.md                                  ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
