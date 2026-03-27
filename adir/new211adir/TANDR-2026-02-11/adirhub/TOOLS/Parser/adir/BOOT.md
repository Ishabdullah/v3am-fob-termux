**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Parser\adir\BOOT.md                                                 ║
║  Updated: 2026-03-16 | The manual — how to use the Parser.           ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Parser is NOT a service. It is a document repository —       ║
║  a directory of .md files converted from DOCX, PDF, and other        ║
║  business documents. No port, no server, no API.                     ║
║                                                                      ║
║  ParserBot (inside this directory) IS a service — a knowledge bot    ║
║  that reads these documents. See ParserBot\adir\BOOT.md.             ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Use the Parser

Parser is the gold mine — a directory of business documents converted to markdown format. Contracts, resumes, financial reports, proposals, contacts, and SOT analysis files all live here as `.md` files that any agent or bot can read.

---

## What's Here

The Parser directory contains 60+ markdown files covering:

- **Contracts** — roofing, siding, fencing, deck, patio, stairs, retaining walls (Biggs Petroleum, Casa Lomas, Center for Living, Centrex, East Hill Village, Grossman, Kilkenney, Peters, etc.)
- **Financial** — P&L reports, bank statements, cost breakdowns
- **Company** — resumes, mission statement, builder questionnaire, contacts
- **Templates** — blank roofing contract, blank siding contract, quote form
- **Kitchen** — KITCHEN_KNOWLEDGE_BASE.md (used by GGBOT)
- **SOT Analysis** — SOT-303 files analyzing kitchens, exteriors, logistics, the parser itself, and a playbook index
- **Raw Conversions** — ALL_DOCX_CONTENT.md (bulk conversion), DOCX_CONVERSION_INDEX.md (index of what was converted)

---

## How to Use It

**Reading documents:** Walk the directory. Every `.md` file is a self-contained document. The filenames tell you what's inside — contract names, project codes (dates like 20250319), or descriptive names.

**Feeding to a bot:** Point a knowledge bot at this directory (or a subset) as its knowledge source. ParserBot does exactly this — it was deployed via KB-Maker with `knowledge_path` pointing here.

**Adding documents:** Convert new DOCX/PDF files to markdown and place them here. Follow the naming convention: descriptive lowercase names, underscores or spaces, `.md` extension.

**SOT files:** The `SOT-303-*` files are agent-generated analysis of the parsed documents — patterns found in kitchens, exteriors, logistics, and the parser itself. These are the gold extracted from the raw ore.

---

## ParserBot

Inside this directory is `ParserBot/` — a TANDRSOCIAL template copy deployed by KB-Maker on 2026-03-10. It loads these parsed documents as its knowledge base and lets you chat with them.

→ [ParserBot BOOT.md](./ParserBot/adir/BOOT.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot\adir\BOOT.md`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know what the Parser is and how to use it. Your next move:      ║
║                                                                      ║
║  → Navigate the Parser directory:                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\adir\index.md                                              ║
║                                                                      ║
║  → Use ParserBot to chat with these documents:                       ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\ParserBot\adir\BOOT.md                                     ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this manual, create:                                      ║
║  SOT-[YYYYMMDD]-parser-boot.md                                      ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
