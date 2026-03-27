**324 Ports and paths are changed ref data**

# KB-Maker v2 - Architecture & Design

**Created:** 2026-03-13
**Status:** ✅ Production Ready
**Purpose:** Document how KB-Maker works

---

## What Is KB-Maker v2?

**KB-Maker v2** is the **bot factory** - where bots are created, configured, and prepared for deployment.

```
User → KB-Maker UI (9220) → Ollama (11434) → Deploy to Agent-Dropper (9210)
```

---

## Architecture

### Service Stack

```
Web Interface (HTML/JS)
        ↓
Express Server (Node.js)
        ↓
├─ Knowledge Base Manager
├─ Bot Configuration
├─ Template System
├─ Ollama Integration
└─ File Storage
        ↓
Ollama (11434) - LLM generation
Agent-Dropper (9210) - Deployment
```

---

## Core Functions

### 1. Knowledge Base Management
- Create/edit knowledge bases
- Store bot knowledge
- Manage context
- Version control

### 2. Bot Configuration
- Name & identity
- Prompts & instructions
- LLM model selection
- API settings

### 3. Template System
- Reusable templates
- Common patterns
- Bot templates
- Response templates

### 4. Ollama Integration
- Generate responses
- Test prompts
- Model selection
- Local LLM integration

---

## Workflow

```
1. User creates new bot in UI
2. KB-Maker stores configuration
3. User builds knowledge base
4. User tests with Ollama
5. User deploys via Agent-Dropper
6. Bot runs on deployed port
```

---

## Design Philosophy

- **Simple interface** - Easy to create bots
- **Modular** - Reusable components
- **Integrated** - Works with Ollama & Agent-Dropper
- **File-based** - Stores in accessible files

---

## Key Paths

| Purpose | Path |
|---------|------|
| Root | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2` |
| adir | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\adir` |
| Config | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2/config.json` |

---

## Future Improvements

- Admin dashboard for all bots
- Advanced prompt engineering
- Knowledge base versioning
- Automated testing
- Performance metrics

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\adir\NEW-313-working.md`
**Created:** 2026-03-13
**Status:** ✅ Production ready
**Last Updated:** 2026-03-13

**324 Ports and paths are changed ref data**
