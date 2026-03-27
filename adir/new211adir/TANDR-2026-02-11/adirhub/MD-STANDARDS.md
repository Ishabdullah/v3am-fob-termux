**324 Ports and paths are changed ref data**

# TANDR MD File Standards & Edit Trail System

**Status:** ✅ Framework Ready
**Version:** 2026-02-15
**Author:** System Documentation

---

## Overview

All Markdown files in the TANDR system should follow a standardized structure with headers, footers, and automatic edit trail tracking.

---

## Standard MD File Template

### Required Header Section

```markdown
# [Page Title]

**Status:** ✅ [Status: Draft/In Review/Ready/Current]
**Version:** [YYYY-MM-DD]
**Author:** [Creator Name/Agent]

---
```

### Required Footer Section

```markdown
---

## Footer Metadata

**Last Modified:** [YYYY-MM-DDTHH:MM:SSZ]
**Last Editor:** [Name/Agent]
**File Path:** [Full path to file]
**Total Edits:** [Number]
**Status:** ✅ [Current/In Review/Draft]

---

## Edit Trail

### Session [YYYY-MM-DDTHH:MM:SSZ]
- **Editor:** [Name/Agent]
- **Change:** [What was changed]
- **Reason:** [Why it was changed]
- **Files Modified:** [List files]

### Session [YYYY-MM-DDTHH:MM:SSZ]
- **Editor:** [Name/Agent]
- **Change:** [What was changed]
- **Reason:** [Why it was changed]
```

---

## Save Metadata Process

### What Gets Captured When You Click SAVE

```json
{
  "save_metadata": {
    "editor_name": "[Your Name/Agent ID]",
    "timestamp": "2026-02-15T14:35:00Z",
    "session_id": "[Unique Session ID]",
    "browser_user_agent": "[Browser Info]",
    "ip_address": "[Your IP]",
    "change_description": "[What you changed]",
    "change_reason": "[Why you changed it]",
    "related_files": ["file1.md", "file2.md"]
  }
}
```

### Auto-Formatting Process

When you save a file in ADIR Hub, the system:

1. **Captures Metadata**
   - Identifies you (editor name/agent)
   - Records exact timestamp
   - Creates unique session ID
   - Gets browser/network info

2. **Wraps Content**
   ```
   ### Session [TIMESTAMP]
   - **Editor:** [Your Name]
   - **Change:** [What you changed]
   - **Reason:** [Why]
   - **Files Modified:** [List]
   ```

3. **Updates Edit Trail**
   - Adds new entry to Edit Trail section
   - Pushes previous entries down
   - Maintains chronological order (newest first)

4. **Updates Footer**
   - Sets "Last Modified" to current time
   - Sets "Last Editor" to your name
   - Increments "Total Edits" counter

5. **Saves File**
   - Writes to disk with timestamp
   - Maintains backup of previous version
   - Logs to system audit trail

---

## Wheel Console Template Format

Use this for documenting major operations and changes:

### Full Template

```
╔════════════════════════════════════════════════════════════════════════════╗
║ 🎡 WHEEL PROTOCOL - [Operation Name] ║
║ [Brief Description] ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ║
║ OPERATION ID: wheel_[YYYYMMDD]_[HHMMSS]_[###] ║
║ PHASE: [Phase Name] ║
║ STATUS: [Status] ║
║ START TIME: [YYYY-MM-DDTHH:MM:SSZ] ║
║ ║
╠════════════════════════════════════════════════════════════════════════════╣
║ PHASE 1: [Phase Name] ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ║
║ Task: [What this phase does] ║
║ Assigned To: [Name/Agent] ║
║ Status: ✅ COMPLETE / 🔄 ACTIVE / ⏳ PENDING ║
║ Duration: [Time taken] ║
║ ║
║ Details: ║
║ - [Detail 1] ║
║ - [Detail 2] ║
║ - [Detail 3] ║
║ ║
║ Output: ║
║ └─→ [What this phase produces] ║
║ ║
╠════════════════════════════════════════════════════════════════════════════╣
║ PHASE 2: [Phase Name] ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ║
║ [Same structure as Phase 1] ║
║ ║
╠════════════════════════════════════════════════════════════════════════════╣
║ SUMMARY & METRICS ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ║
║ Total Duration: [Time] ║
║ Phases Completed: [X]/[Y] ║
║ Success Rate: [%] ║
║ Status: ✅ COMPLETE / 🔄 IN PROGRESS ║
║ ║
║ Performance: ║
║ - Files Modified: [Count] ║
║ - Lines Changed: [Count] ║
║ - Operations Completed: [Count] ║
║ - Issues Found: [Count] ║
║ ║
║ Next Steps: ║
║ - [Next step 1] ║
║ - [Next step 2] ║
║ ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## Edit Trail Entry Format

### When You Make a Change

```markdown
### Session 2026-02-15T14:35:00Z
- **Editor:** [Your Name]
- **Change:** [What changed - be specific]
- **Reason:** [Why - context matters]
- **Files Modified:**
  - file1.md (3 lines changed)
  - file2.md (updated footer)
  - file3.md (new section added)
```

### Example (Real Change)

```markdown
### Session 2026-02-15T14:35:00Z
- **Editor:** Jerry (TANDRAgent-Jerry)
- **Change:** Updated Service Manager documentation - added port 9999, 1CRM Dashboard port 9304, and Quick Links integration
- **Reason:** Service Manager is now fully operational and integrated into ADIR Hub
- **Files Modified:**
  - index.md (3 sections updated)
  - REGISTRY.md (added System Management section)
  - BOOT.md (marked for review)
  - ADIRHUB.html (added Quick Links)
  - adir-api.php (added service status checks)
```

---

## Saving Best Practices

### DO ✅ (You Remember Later!)
- Provide clear, specific descriptions
  - ❌ DON'T: "Fixed stuff"
  - ✅ DO: "Updated Service Manager section with port 9999, added 1CRM Dashboard"

- Explain WHY the change was made
  - ❌ DON'T: "Changed BOOT.md"
  - ✅ DO: "Changed BOOT.md because Service Manager integration is complete"

- List all related files
  - ❌ DON'T: Save one file, forget others changed
  - ✅ DO: "Files Modified: index.md, REGISTRY.md, BOOT.md, ADIRHUB.html"

- Save frequently
  - ❌ DON'T: Work 2 hours, save once, forget what you did
  - ✅ DO: Save every 15-30 minutes with small descriptions

- Use your actual identifier
  - ❌ DON'T: "Admin" or "System"
  - ✅ DO: "Jerry (TANDRAgent-Jerry)" or "Claude AI (Task #123)"

### DON'T ❌ (You'll Regret It!)
- Leave change descriptions empty
- Save without explaining why
- Mix unrelated changes in one save
- Wait hours between saves
- Use vague descriptions like "update" or "fix"
- Forget to update File Path in footer

---

## Implementation Checklist

### Phase 1: Documentation Standard (Current)
- ✅ Create MD Standards document (this file)
- ✅ Define header/footer format
- ✅ Define edit trail format
- ✅ Define Wheel Console template
- 🔄 Review all existing MD files
- ⬜ Update all existing MD files to new standard

### Phase 2: ADIR Hub Save Button (Next)
- ⬜ Modify ADIR Hub save functionality
- ⬜ Capture editor metadata
- ⬜ Capture timestamp
- ⬜ Auto-wrap content
- ⬜ Auto-append edit trail
- ⬜ Test save process

### Phase 3: Advanced Tracking (Future)
- ⬜ Session ID generation
- ⬜ Change diff tracking
- ⬜ Audit log creation
- ⬜ Rollback capability
- ⬜ Change history visualization

---

## Example Complete File

Here's what a properly formatted MD file looks like:

```markdown
# System Status Report

**Status:** ✅ Current
**Version:** 2026-02-15
**Author:** Jerry (TANDRAgent-Jerry)

---

## Overview

This document tracks the current status of all TANDR services.

---

## Service Status

| Service | Port | Status |
|---------|------|--------|
| Service Manager | 9999 | 🟢 Online |
| ADIR Hub | 9303 | 🟢 Online |

---

## Recent Updates

The Service Manager is now integrated into ADIR Hub.

---

## Footer Metadata

**Last Modified:** 2026-02-15T14:35:00Z
**Last Editor:** Jerry (TANDRAgent-Jerry)
**File Path:** C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\STATUS.md
**Total Edits:** 3
**Status:** ✅ Current

---

## Edit Trail

### Session 2026-02-15T14:35:00Z
- **Editor:** Jerry (TANDRAgent-Jerry)
- **Change:** Updated Service Manager status to online with port 9999
- **Reason:** Service Manager integration complete
- **Files Modified:** STATUS.md

### Session 2026-02-14T10:20:00Z
- **Editor:** Claude AI (System)
- **Change:** Created initial STATUS.md file
- **Reason:** System setup
- **Files Modified:** STATUS.md (created)

---
```

---

## Footer Metadata

**Last Modified:** 2026-02-15T14:35:00Z
**Last Editor:** Claude AI (System)
**File Path:** C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\MD-STANDARDS.md
**Total Edits:** 1
**Status:** ✅ Framework Complete

---

## Edit Trail

### Session 2026-02-15T14:35:00Z
- **Editor:** Claude AI (System)
- **Change:** Created comprehensive MD Standards document with header/footer format, edit trail system, Wheel Console template, and save metadata process
- **Reason:** Establish consistent documentation standards for all MD files with automatic tracking and AI-friendly formatting
- **Files Modified:** MD-STANDARDS.md (created)

---

**Status:** ✅ Ready for Review & Implementation
**Next Action:** Review with team, then integrate save functionality into ADIR Hub

**324 Ports and paths are changed ref data**
