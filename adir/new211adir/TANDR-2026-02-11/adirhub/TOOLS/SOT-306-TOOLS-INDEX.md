**324 Ports and paths are changed ref data**

# SOT-306-TOOLS-INDEX.md
**Last Updated:** 2026-03-07
**Purpose:** Specific tool implementations and their DNA
**Status:** TEMPLATE - Defines approach for each tool

---

## You Are Here: Tools & Implementations

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS/`

This is where **specific implementations** live. Think of ADIRHUB as "how to work in a coffee shop" and TOOLS as "how to work in THIS specific coffee shop."

Each tool has its own DNA, variables, strengths, constraints.

---

## The Difference

| Layer | Purpose | Example |
|-------|---------|---------|
| **Training (ADIRHUB)** | Generic methodology | "How to manage a project" |
| **Tools (HERE)** | Specific implementation | "How to manage THIS project (ParserBot)" |

**Don't confuse them.** You can forget how to use ParserBot. You can't forget that this district exists.

---

## Current Tools Structure

```
TOOLS/
├── SOT-306-TOOLS-INDEX.md                ← You are here
│
├── Parser/
│   └── ParserBot/                        → Chat AI system
│       ├── SOT-306-PARSERBOT-CURRENT.md  → ParserBot status
│       ├── server.js                     → Node.js server
│       ├── config.json                   → Settings
│       ├── api/
│       │   ├── bot.php                   → Main API
│       │   ├── security.php              → Path validation
│       │   ├── knowledge-base.php        → KB management
│       │   └── providers/                → LLM providers
│       ├── data/
│       │   └── social-knowledge/         → Knowledge base files
│       ├── index.html                    → Chat UI
│       └── dashboard-pro.html            → Control center
│
├── [Other tools TBD]
│
└── CURRENT.md                            → What's being built now
```

---

## ParserBot (Current Implementation)

**Purpose:** Employee-facing social media content management AI

**Key Facts:**
- Port: 10108
- Node.js + Express + PHP backend
- Real Facebook Graph API integration
- Real Ollama/Anthropic LLM providers
- Real knowledge base files

**Architecture:**
1. **Frontend:** index.html (chat), dashboard-pro.html (controls)
2. **Server:** server.js (Node.js router)
3. **API:** bot.php (main logic)
4. **Data:** config.json, social-knowledge/, conversation logs

**Its DNA:**
- Employee-only access (ngrok + auth later)
- Reads Facebook feeds
- Drafts social posts
- Analyzes performance
- File I/O sandboxed

**Current Status:**
Check `SOT-306-PARSERBOT-CURRENT.md` for latest

---

## How To Work With Tools

**When you need to modify a tool:**

1. **Read the Training First** (go to adirhub, read ARCHITECTURE.md)
2. **Check This Tool's SOT** (SOT-306-[TOOLNAME]-CURRENT.md)
3. **Understand Its DNA** (what makes it different)
4. **Work within its constraints** (don't violate security, architecture)
5. **Update the SOT** when you're done

**Don't:**
- Treat all tools the same way
- Forget to check the SOT before starting
- Violate security boundaries
- Burn context re-reading old docs (use SOT dates to skip stale ones)

---

## Adding New Tools

When a new tool is created:

1. Create directory under TOOLS/
2. Create SOT-306-[TOOLNAME]-CURRENT.md
3. Document its DNA, architecture, constraints
4. Link it from this index
5. Future instances inherit your documentation

---

## Tool Categories (As They Evolve)

Currently:
- **Parser** - ParserBot (social media AI)

Coming:
- [TBD based on project needs]

Each gets its own SOT when created.

---

## Critical Pattern

> **Don't generalize across tools. Each one is different.**

ParserBot's way of handling knowledge bases might not work for the next tool. That's intentional. Tools adapt to their specific problems.

The training (ADIRHUB) teaches you to think like a pro. The tools teach you this specific coffee shop.

---

## Key Principle for Tool Development

1. **Understand the tool's purpose** - What problem does it solve?
2. **Document its constraints** - What can't it do?
3. **Document its strengths** - What does it excel at?
4. **Leave breadcrumbs** - SOT-306-[TOOLNAME] files for next person
5. **Don't over-design** - Solve the problem you have, not hypothetical ones

---

## When Things Change

Tools evolve:
- New features get added
- Bugs get fixed
- Constraints change
- Architecture improves

**When it does:**
1. Update the tool's SOT-306 file
2. Note what changed and why
3. Link to related ADIRHUB docs if methodology changed
4. Future instances inherit the updated version

---

## This Is A Template

Future developers may create their own SOT-306-TOOLS-INDEX.md and tool-specific SOTs. The structure stays. The tools change.

**Your notes matter. Write them clearly.**

**324 Ports and paths are changed ref data**
