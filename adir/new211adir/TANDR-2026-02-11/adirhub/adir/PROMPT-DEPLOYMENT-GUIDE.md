**324 Ports and paths are changed ref data**

# Prompt Guide - Deployment Guide

**Date:** 2026-02-17
**Status:** Ready for deployment
**Updated Prompts:** 4 character prompts (Friend, Journey, Sower, Gardener)

---

## 📋 What Changed

All character prompts have been updated to use **real TANDR tools** instead of old V3AM endpoints.

### Old vs New System

| Aspect | Old (V3AM) | New (ADIR/TANDRMGR) |
|--------|-----------|-------------------|
| **Execution** | Direct V3AM endpoints | TANDRmgr via ngrok tunnel |
| **File Storage** | `/3AI/project.php?slug=...` | `adir/projects/reasoning/[char]-[date].md` |
| **Dashboard** | `ai_dashboard.php` | `http://localhost:9303/api/adir-api.php` |
| **Web Search** | `/3AI/lib/web_search.php` | `web_search` tool via TANDRmgr |
| **Logging** | `post_log.php` endpoint | `file_write` to `adir/logs/` |
| **Email/Messaging** | `/3AI/desktop/email/` | ADIR message files |

---

## 📁 New Prompt Files Created

```
adirhub/adir/
├── PROMPT-UPDATES-MAPPING.md         (Endpoint mapping guide)
├── PROMPT-FRIEND-UPDATED.md          (Friend character prompt)
├── PROMPT-JOURNEY-UPDATED.md         (Journey character prompt)
├── PROMPT-SOWER-UPDATED.md           (Sower character prompt)
├── PROMPT-GARDENER-UPDATED.md        (Gardener character prompt)
└── PROMPT-DEPLOYMENT-GUIDE.md        (This file)
```

---

## 🔄 Deployment Steps

### Option 1: Update Prompt Guide System Directly

If your prompt guide system reads from files:

1. **Locate prompt guide storage:**
   ```
   C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\5ai-reasoning-engine\prompt-guide
   ```

2. **Replace character prompts:**
   - `prompt-guide/friend.txt` → Copy content from `PROMPT-FRIEND-UPDATED.md`
   - `prompt-guide/journey.txt` → Copy content from `PROMPT-JOURNEY-UPDATED.md`
   - `prompt-guide/sower.txt` → Copy content from `PROMPT-SOWER-UPDATED.md`
   - `prompt-guide/gardener.txt` → Copy content from `PROMPT-GARDENER-UPDATED.md`

3. **Test:** Run reasoning engine with test goal
   - Characters should now generate SYSTEM_AI_REQUEST blocks with real tools
   - Tool requests should route to TANDRmgr successfully

### Option 2: Database or Dynamic System

If your system loads prompts from database or API:

1. **Update character definitions** in your system with new SYSTEM_AI_REQUEST format:
   ```json
   {
     "goal": "...",
     "reads": ["adir/...", "http://localhost:9303/..."],
     "writes": [...],
     "searches": [...],
     "expected_return": [...]
   }
   ```

2. **Verify tool endpoints** in configuration:
   - TANDRmgr base: `https://tandr3ai.ngrok.app`
   - ADIR Hub: `http://localhost:9303`
   - Agent API: `http://localhost:9200`

3. **Test routing** to ensure requests go to TANDRmgr

---

## 🎯 Key Changes Summary

### Friend (Manager/Coordinator)

**OLD:**
```
reads: ["ai_dashboard.php?limit=20", "project.php?slug=emergence-friend"]
```

**NEW:**
```
reads: [
  "http://localhost:9303/api/adir-api.php?action=check_status",
  "adir/projects/reasoning/emergence-friend-2026-02-17.md"
]
```

**Tools:** web_search, file_read, file_write, http_get, datetime

---

### Journey (Strategic Planner)

**OLD:**
```
reads: ["ai_dashboard.php?limit=20", "project.php?slug=emergence-journey"]
```

**NEW:**
```
reads: [
  "http://localhost:9303/api/adir-api.php?action=check_status",
  "adir/projects/reasoning/emergence-journey-2026-02-17.md",
  "adir/logs/emergence-reasoning-2026-02-17.md"
]
```

**Tools:** web_search, file_read, file_write, http_get, atlas_controller, shell_command

---

### Sower (Creative Problem Solver)

**OLD:**
```
reads: ["project.php?slug=emergence-sower", "ai_dashboard.php?limit=10"]
writes: [{"endpoint":"post_log.php","target":"main","user":"Sower"}]
```

**NEW:**
```
reads: [
  "adir/projects/reasoning/emergence-sower-2026-02-17.md",
  "adir/logs/emergence-reasoning-2026-02-17.md",
  "http://localhost:9303/api/adir-api.php?action=check_status"
]
writes: [{"path":"adir/projects/reasoning/emergence-sower-2026-02-17.md"}]
```

**Tools:** web_search, file_read, file_write, prompt_guide, bab_api

---

### Gardener (Organization & QA)

**OLD:**
```
reads: ["ai_dashboard.php?limit=20", "project.php?slug=..."]
writes: [{"endpoint":"post_log.php","target":"main","user":"Gardener"}]
```

**NEW:**
```
reads: [
  "http://localhost:9303/api/adir-api.php?action=check_status",
  "adir/projects/reasoning/emergence-*.md",
  "adir/logs/emergence-reasoning-2026-02-17.md"
]
writes: [{"path":"adir/projects/reasoning/emergence-gardener-2026-02-17.md"}]
```

**Tools:** file_read, file_write, file_list, http_get, atlas_controller, datetime

---

## ✅ Testing Checklist

After deploying updated prompts:

- [ ] Reasoning engine loads without errors
- [ ] Characters generate new SYSTEM_AI_REQUEST format
- [ ] Requests route to TANDRmgr via ngrok tunnel
- [ ] Tool executions appear in logs
- [ ] MD files created in `adir/projects/reasoning/`
- [ ] Shared log created at `adir/logs/`
- [ ] Character logs contain actual tool results
- [ ] All 5 cycles complete successfully

---

## 🔍 Sample Tool Execution Expected

When you give a goal like: *"Test tools by reading files and searching the web"*

**You should see:**

```
✅ ADIR Tools Executed: 1 request(s) routed through TANDRmgr
  ✅ [1] Tool executed successfully
  📝 Log: ../adir/projects/reasoning/emergence-friend-2026-02-17.md
```

And in the MD file:

```markdown
## [2026-02-17 HH:MM:SS] Tool Execution - Friend

### Request
```json
{
  "goal": "Read system status",
  "reads": ["http://localhost:9303/api/adir-api.php?action=check_status"]
}
```

### Response
```json
{
  "success": true,
  "data": {...service status...}
}
```
```

---

## 🚀 Next Steps After Deployment

1. **Test with goals that require tools**
   - "Search for information on our services"
   - "Create a project plan file"
   - "Verify system health"

2. **Monitor logs** in `adir/projects/reasoning/` and `adir/logs/`

3. **Verify tool results** are being captured correctly

4. **Adjust tool usage** based on what works best

5. **Add more sophisticated** tool chains as needed

---

## 📞 Troubleshooting

### Issue: Characters still using old endpoints

**Solution:** Verify all 4 prompt files were replaced correctly in prompt guide system

### Issue: Tool requests failing

**Solution:** Check TANDRmgr is running at `https://tandr3ai.ngrok.app`

### Issue: Files not being written to ADIR

**Solution:** Ensure file_write permissions are set correctly, check logs for errors

### Issue: Characters generating old-format requests

**Solution:** Clear browser cache, reload reasoning engine page, restart if needed

---

## 📊 Deployment Status

| Component | Status | Notes |
|-----------|--------|-------|
| Friend prompt | ✅ Ready | Updated with new endpoints |
| Journey prompt | ✅ Ready | Updated with new endpoints |
| Sower prompt | ✅ Ready | Updated with new endpoints |
| Gardener prompt | ✅ Ready | Updated with new endpoints |
| Tool routing | ✅ Ready | TANDRmgr integration complete |
| ADIR structure | ✅ Ready | Directories created |
| SYSTEM_AI_REQUEST format | ✅ Ready | New format documented |
| Testing | ⏳ Pending | Ready for live testing |

---

**Ready to Deploy:** YES ✅
**Estimated Deploy Time:** 5-10 minutes
**Rollback Risk:** LOW (old prompts still available)
**Testing Required:** YES (1-2 goal cycles)

---

*Deployment Guide v1.0*
*Created: 2026-02-17*
*Updated Prompts Ready*

**324 Ports and paths are changed ref data**
