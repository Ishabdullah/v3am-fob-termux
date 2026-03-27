**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Parser\adir\current.md                                              ║
║  Updated: 2026-03-16 | Document repository status.                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Parser is a data directory — no service to check.            ║
║  This file tracks the state of the document collection.              ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Repository State: Active

The Parser directory contains 60+ business documents converted to markdown. This is a living repository — new documents can be added at any time.

---

## Document Count

Approximately 65+ `.md` files covering contracts, financial reports, resumes, templates, and analysis.

Key conversion artifacts:
- `ALL_DOCX_CONTENT.md` — bulk conversion of all DOCX files into one document
- `DOCX_CONVERSION_INDEX.md` — index of what was converted and when
- `SOT-303-*` files — agent-generated analysis extracted from the raw documents

---

## What Needs Attention

**Old adir files are stale.** The `adir/` directory previously contained a `test.md` file with pasted terminal output, startup logs, and user notes from 2026-03-15. This was a scratchpad, not structured documentation. Now replaced with standard ADIR files.

**ParserBot needs port configuration.** ParserBot was deployed with port 10108 but its config.json doesn't have `port` at root level, so it defaults to 8099 when started. Either add `"port": 10108` to config.json or pick a new port.

**ParserBot has exposed API key.** The Anthropic key is visible in ParserBot's config.json (same key as other template copies).

**Knowledge path may exceed 50KB.** With 60+ documents in `data/social-knowledge/`, the total knowledge size likely exceeds the recommended 50KB limit for LLM context. ParserBot may need a curated subset rather than the full collection.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console format.

**2026-03-10:** ParserBot deployed via KB-Maker v2.

**2026-03-03:** SOT-303 analysis files created — agent-extracted patterns from kitchens, exteriors, logistics, and the parser itself.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know the repository's current state. Your next move:            ║
║                                                                      ║
║  → How the Parser system works:                                      ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\adir\working.md                                            ║
║                                                                      ║
║  → ParserBot status:                                                 ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\ParserBot\adir\current.md                                  ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-parser-status.md                                    ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
