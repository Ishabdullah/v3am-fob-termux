**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - INDEX                                                 ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-JERRY-CLEAN\adir\index.md                                 ║
║  Updated: 2026-03-16 | You are at the template crossroads.          ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the navigation index for the JERRY agent template.   ║
║  This is NOT a running service — it's the master copy that           ║
║  Agent-Dropper clones to create new agents.                          ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# TEMPLATE-JERRY-CLEAN Index

You're inside the standard agent template. This is the blueprint that Agent-Dropper v2 copies every time someone deploys a `"type": "jerry"` agent. Agent1, Agent2, and Agent4 in the apps directory all came from here. The other template (TANDRSOCIAL) creates social media bots.

---

## What Do You Need?

### "How do I operate this template?"

→ [BOOT.md](./BOOT.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\adir\BOOT.md`

### "What's the current state of this template?"

→ [current.md](./current.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\adir\current.md`

### "How does this template work under the hood?"

→ [working.md](./working.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\adir\working.md`

---

## What's In This Template

Walking up one level from `adir\` into the template root:

| File/Directory | Purpose |
|----------------|---------|
| `server.js` | Express server — routes `/api/*` and `/agent/api/*` to PHP, default port 9200 |
| `config.json` | All config — LLM providers (Ollama/Anthropic/Gemini/OpenAI), search, agent identity, tools, UI |
| `index.html` | Agent chat interface |
| `dashboard.html` | Admin panel with tabs (dashboard, archivist, tools, settings) |
| `api/` | PHP API handlers — `agent.php` (main), `auto.php` (automation), `providers/` |
| `data/` | Agent's data directory |
| `upload/` | File upload directory |
| `adir/` | You are here — documentation and logs |
| `adir/logs/` | Conversation history, errors, startup logs |

---

## Where You Can Walk

### Up to the TOOLS Directory

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\`

All tools live here — Agent-Dropper, KB-Maker, GGBOT, Parser, and both templates.

### Over to the TANDRSOCIAL Template

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\`

The bot template. Compare it with this one to see the difference — social media features, Facebook Graph API, knowledge base system.

### Down to Deployed Agents

`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\`

Where agents built from this template end up: Agent1 (11111), Agent2 (11112), Agent4 (11113).

### Up to the Hub

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md`

Back to the central crossroads.

---

## The ADIR Reading Order

1. **BOOT.md** — How to operate
2. **index.md** — Where to go (you are here)
3. **current.md** — What's happening now
4. **working.md** — How it works

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're at the template crossroads. Choose your path:                ║
║                                                                      ║
║  → How to operate:                                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\BOOT.md                                ║
║                                                                      ║
║  → How it works:                                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\working.md                             ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this index, create:                                       ║
║  SOT-[YYYYMMDD]-jerry-template-index.md                              ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
