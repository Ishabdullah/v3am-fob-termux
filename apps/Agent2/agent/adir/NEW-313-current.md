**324 Ports and paths are changed ref data**

# Agent Template - Current Status

**Status:** ✅ Template Ready
**Version:** 2.0.0
**Last Updated:** 2026-03-13

---

## Template Status

**Purpose:** Reference agent for Agent-Dropper v2 spawning

**What It Contains:**
- ✅ Complete agent code structure
- ✅ PHP API layer (agent.php, auto.php, providers)
- ✅ Configuration template (config.json)
- ✅ Web dashboard (dashboard.html)
- ✅ Documentation in adir/

---

## When Template Is Used

Agent-Dropper v2 clones this template to create new agents:

1. **Copy phase** - All files/directories duplicated
2. **Config phase** - config.json updated with port, name
3. **Initialize phase** - NEW-313- files created
4. **Start phase** - Agent started on assigned port

---

## Template Contents

| Component | Status | Purpose |
|-----------|--------|---------|
| Code (api/) | ✅ Complete | API handlers |
| Config | ✅ Template | Agent settings |
| Dashboard | ✅ Ready | Web interface |
| Logs | ✅ Ready | adir/logs/ |
| Docs | ✅ NEW-313 | This documentation |

---

## No Breaking Changes

Template has not been modified since creation (Mar 11, 2026).
Used as-is by Agent-Dropper v2.

---

## Logs

**adir/logs/:**
- `conversations.txt` - Clean (template init only)
- No sensitive data
- Ready for new agents

---

## Next Steps

1. Agent-Dropper v2 clones this template
2. Updates config.json with new port
3. Creates NEW-313- files for new agent
4. Starts agent on assigned port

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\adir\NEW-313-current.md`
**Created:** 2026-03-13
**Status:** ✅ Template Ready
**Last Updated:** 2026-03-13

**324 Ports and paths are changed ref data**
