324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 

# Memory Bot - Support Service

**Status:** ✅ Support Service
**Version:** 2026-03-13
**Port:** 8091
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab` (part of TANDRmgr-lab)

---

## What Is Memory Bot?

**Memory Bot** is a **support service** for TANDRmgr-lab:
- Provides persistent context storage
- Maintains conversation memory across sessions
- Stores agent knowledge
- Integrates with TANDRmgr-lab (8086)
- Optional service

---

## Service Info

| Property | Value |
|----------|-------|
| **Name** | Memory Bot |
| **Port** | 8091 |
| **Type** | Support (Optional) |
| **Parent** | TANDRmgr-lab |
| **Root** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab` |

---

## Quick Start

### With All Services
```bash
C:\FOB\MasterSTART.bat
```

### Direct Access
```bash
curl http://localhost:8091/
```

---

## Integration

**Relationship:**
- Started with TANDRmgr-lab (port 8086)
- Shares code base: `apps/TANDRmgr-lab/bot/`
- Dedicated port: 8091
- Optional service

**API:**
```
GET http://localhost:8091/
POST http://localhost:8091/api/store      (store context)
GET http://localhost:8091/api/retrieve    (get context)
```

---

## Architecture

```
TANDRmgr-lab (8086)
        ↓
Memory Bot (8091)
        ↓
Persistent Storage
```

---

## Purpose

1. **Persistent Memory** - Context survives reboots
2. **Shared Context** - Multiple agents access same knowledge
3. **Learning** - Agents build knowledge over time
4. **Continuity** - Sessions continue across shutdowns

---

## Logs & Data

**Storage:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\`

**Key files:**
- Memory knowledge base files
- Conversation history
- Agent learning data

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-MEMORY-BOT-index.md`
**Created:** 2026-03-13
**Status:** ✅ Support Service
**Last Updated:** 2026-03-13

**Related:**
- TANDRmgr-lab: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-index.md`


324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
