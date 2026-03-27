# TANDRmgr-lab - Navigation Hub

**Status:** ✅ Active & Operational (FOB Integration)
**Version:** 2026-03-13
**Port:** 8086
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab`
**adir Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir`

---

## Quick Navigation
324 All ports and paths have changed example only for syntax 

**Operational Status:**
- [NEW-313-current.md](./NEW-313-current.md) - Current status & running state
- [NEW-313-working.md](./NEW-313-working.md) - Architecture & how it works
- [NEW-313-BOOT.md](./NEW-313-BOOT.md) - How to start & operate

**Data & Memory:**
- [SANITIZATION-GUIDE.md](./SANITIZATION-GUIDE.md) - Remove company/customer data before open source
- Memory location: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge\`
- Logs location: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\`

**System Integration:**
- Parent: ADIR Hub (`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\`)
- Sibling Services: KB-Maker (9220), Agent-Dropper (9210), ADIR Hub (9303)
- LLM: Ollama (11434)
- Related: Memory Bot (8091)

---

## What Is TANDRmgr-lab?

**TANDRmgr-lab** is a **testing & orchestration service** that:
- Acts as a **manager lab & testing interface** for the FOB thin client
- Provides **LLM relay** to Ollama (11434)
- Offers **API endpoints** for service testing
- Maintains **conversation memory** for context
- Coordinates with **Memory Bot** for persistent context

**NOT:** Production LLM gateway (for open source - company-specific LLM routing removed)

---

## Service Info (At a Glance)

| Property | Value |
|----------|-------|
| **Name** | TANDRmgr-lab |
| **Port** | 8086 |
| **URL** | http://localhost:8086/ |
| **Tech** | Node.js + Express |
| **LLM** | Ollama (localhost:11434) |
| **Root** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab` |
| **adir** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir` |
| **Code** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\server.js` |
| **Config** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\config.json` |

---

## Quick Start

### Check Status
```bash
curl http://localhost:8086/
```

### Use Ollama (Default)
```bash
curl -X POST http://localhost:8086/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello"}'
```

### Check Memory
```bash
curl http://localhost:8086/api/memory
```

---

## Key Directories (Absolute Paths)

| Directory | Purpose | Path |
|-----------|---------|------|
| Root | Service code | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab` |
| adir | Documentation | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir` |
| logs | Session logs | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs` |
| bot | Server code | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot` |
| memory | Knowledge base | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge` |
| data | Context data | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\data` |

---

## Log Files (For Sanitization)

**CRITICAL: Contains company/customer data**

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\conversations.txt
  └─ 1.1 MB - Full conversation history (SANITIZE)

C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\adir\logs\queries.txt
  └─ Customer/company queries (SANITIZE)

C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge\conversations.md
  └─ Stored conversations (SANITIZE)

C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge\institutional_dna_hooks.md
  └─ Company operations DNA (REVIEW/SANITIZE)
```

See **SANITIZATION-GUIDE.md** for complete list and recommendations.

---

## Entry Protocol (After Reboot)

1. **Check status:**
   → Read: [NEW-313-current.md](./NEW-313-current.md)

2. **Understand architecture:**
   → Read: [NEW-313-working.md](./NEW-313-working.md)

3. **Know how to operate:**
   → Read: [NEW-313-BOOT.md](./NEW-313-BOOT.md)

4. **Access service:**
   → http://localhost:8086/

5. **Review memory/logs:**
   → See: [SANITIZATION-GUIDE.md](./SANITIZATION-GUIDE.md)

---

## Key Decisions Made

1. **Port 8086** - Unique to FOB, moved from 8085
2. **Ollama only** - No external LLM APIs
3. **Memory system** - Persistent conversation tracking
4. **Lab environment** - For testing, not production

---

## Next Steps

- [ ] **Sanitize data** before open source (see SANITIZATION-GUIDE.md)
- [ ] **Test APIs** after sanitization
- [ ] **Verify Memory Bot** integration
- [ ] **Update configs** if LLM models change

---

## Related Files

| File | Purpose | Location |
|------|---------|----------|
| REGISTRY.md | All FOB services | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md` |
| MASTERSTART-GUIDE.md | Startup guide | `C:\FOB\MASTERSTART-GUIDE.md` |
| Memory Bot docs | Memory integration | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\MemoryBot\adir\` |
| Ollama guide | LLM models | `C:\FOB\OLLAMA-GUIDE.md` |

---

## Troubleshooting

**Port 8086 in use?**
```bash
netstat -ano | findstr :8086
taskkill /PID [PID] /f
```

**Ollama not responding?**
```bash
curl http://localhost:11434/api/tags
```

**Memory not loading?**
Check: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\config.json`

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-index.md`
**Created:** 2026-03-13
**Purpose:** Navigation & coordination for TANDRmgr-lab
**Status:** ✅ Ready for FOB
**Last Updated:** 2026-03-13

**Before Open Source:**
- [ ] Complete sanitization (SANITIZATION-GUIDE.md)
- [ ] Verify all APIs working
- [ ] Test with Memory Bot
- [ ] Approve for release


324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
