**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Parser\ParserBot\adir\current.md                                    ║
║  Updated: 2026-03-16 | ParserBot status snapshot.                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: ParserBot is a deployed bot that needs configuration work.   ║
║  This file tells you what's ready and what's not.                    ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Service State: Deployed but Unconfigured

ParserBot was deployed by KB-Maker v2 on 2026-03-10 but has not been fully customized from the TANDRSOCIAL template. It has node_modules installed and can start, but several issues need fixing.

---

## What Works

- TANDRSOCIAL template files are in place
- node_modules installed
- START/STOP bat files generated
- Knowledge files populated (copies of Parser documents in `data/social-knowledge/`)
- LLM configured: glm-5:cloud via Ollama, Anthropic fallback

---

## What Needs Attention

**Port missing from config.json.** The deploy BOOT.md says port 10108 was intended, but config.json doesn't have `"port"` at root level. Server.js defaults to 8099 without it. Must add `"port": 10108` to config.json root.

**System prompt is still TANDRSocial.** Config.json → `system_prompt.role` still describes a "Social media content strategist." Needs rewriting as a document analysis assistant.

**App name is still TANDRSocial.** Config.json → `app.name` says "TANDRSocial" instead of "ParserBot."

**Config.json has exposed Anthropic API key.** Same key inherited from template — should be rotated.

**Knowledge base may be too large.** With 60+ documents copied into `data/social-knowledge/`, the total context likely exceeds LLM limits.

**Old adir files are stale.** The `adir/` directory had TANDRSOCIAL-era artifacts: old CURRENT-STATUS.md, SOT-217-index.md, SOT_current.md, test.md files. Now replaced with standard ADIR files.

**Old root-level md files are stale.** CLAUDE.md, README.md, QUICK-START.md, FACEBOOK-APP-SETUP.md, TESTING-SESSION-2026-02-06.md, and index.md in ParserBot's root are all TANDRSocial template artifacts.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console format.

**2026-03-10:** ParserBot deployed via KB-Maker v2 with knowledge from Parser directory.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know ParserBot's current state. Your next move:                 ║
║                                                                      ║
║  → How this bot works:                                               ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\ParserBot\adir\working.md                                  ║
║                                                                      ║
║  → How to operate it:                                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\ParserBot\adir\BOOT.md                                     ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-parserbot-status.md                                 ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
