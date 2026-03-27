**324 Ports and paths are changed ref data**

# Prompt Guide Updates - Tool Mapping

**Date:** 2026-02-17
**Purpose:** Map old V3AM endpoints to real TANDR tools

---

## Endpoint Mapping

| Old Endpoint | Tool | New Syntax | Example |
|---|---|---|---|
| `/3AI/project.php?slug=emergence-[name]` | `file_read` | Read ADIR project log | `"adir/projects/reasoning/emergence-friend-2026-02-17.md"` |
| `ai_dashboard.php?limit=20` | `http_get` | ADIR Hub status API | `"http://localhost:9303/api/adir-api.php?action=check_status"` |
| `project.php?slug=...` | `file_read` | Read ADIR file | Read from `adir/projects/[goal]/[file].md` |
| `/3AI/desktop/email/` | `file_write` + `file_read` | Coordination files | Use `adir/messages/` directory |
| `/3AI/` | `http_get` | ADIR Hub | `http://localhost:9303/` |
| `post_log.php` | `file_write` | Write MD log | Write to `adir/logs/emergence-[date].md` |
| `/3AI/lib/web_search.php` | `web_search` | Web search | Use actual web_search tool |

---

## Tool Categories Available

### Read Operations
```json
{
  "goal": "Read project log or dashboard",
  "reads": [
    "adir/projects/reasoning/emergence-friend-2026-02-17.md",
    "http://localhost:9303/api/adir-api.php?action=check_status"
  ]
}
```

### Write Operations
```json
{
  "goal": "Log results to character file",
  "writes": [
    {
      "path": "adir/projects/reasoning/emergence-friend-2026-02-17.md",
      "content": "## [TIME] Activity Log\n..."
    }
  ]
}
```

### Search Operations
```json
{
  "goal": "Search web for information",
  "searches": ["query terms here"],
  "expected_return": ["search results with URLs and snippets"]
}
```

### API Calls
```json
{
  "goal": "Call external API",
  "api_calls": [
    {
      "url": "http://localhost:9200/agent/api/agent.php?action=status",
      "method": "GET"
    }
  ]
}
```

---

## ADIR Directory Structure

```
adir/
├── projects/
│   └── reasoning/
│       ├── emergence-friend-2026-02-17.md      (Friend's log)
│       ├── emergence-journey-2026-02-17.md     (Journey's log)
│       ├── emergence-sower-2026-02-17.md       (Sower's log)
│       ├── emergence-gardener-2026-02-17.md    (Gardener's log)
│       └── emergence-workshop-2026-02-17.md    (Workshop's log)
├── logs/
│   └── emergence-reasoning-2026-02-17.md       (Shared log)
└── messages/
    └── [coordination files between characters]
```

---

## Updated SYSTEM_AI_REQUEST Format

### OLD (V3AM)
```json
{
  "goal": "Read dashboard",
  "reads": ["ai_dashboard.php?limit=20", "project.php?slug=emergence-friend"],
  "writes": [{"endpoint":"post_log.php","target":"main","user":"Friend","content":"..."}],
  "expected_return": ["proof snippet", "key fields", "success/fail"]
}
```

### NEW (TANDR/ADIR)
```json
{
  "goal": "Read current system status and character log",
  "reads": [
    "http://localhost:9303/api/adir-api.php?action=check_status",
    "adir/projects/reasoning/emergence-friend-2026-02-17.md"
  ],
  "writes": [
    {
      "path": "adir/projects/reasoning/emergence-friend-2026-02-17.md",
      "content": "## [2026-02-17 HH:MM:SS] Step Completed\n\n[content here]\n"
    }
  ],
  "expected_return": [
    "service status (ports and health)",
    "character log entries",
    "write confirmation"
  ]
}
```

---

## Character-Specific Updates

### Friend (Manager/Coordinator)
- **Read:** Dashboard status → `http://localhost:9303/api/adir-api.php?action=check_status`
- **Read:** Character logs → `adir/projects/reasoning/emergence-*.md`
- **Write:** Coordination log → `adir/projects/reasoning/emergence-friend-[DATE].md`
- **Actions:** Coordinate with other characters via shared logs

### Journey (Strategic Planner)
- **Read:** Project status → `adir/projects/reasoning/`
- **Read:** Current system state → ADIR Hub API
- **Write:** Plan details → `adir/projects/reasoning/emergence-journey-[DATE].md`
- **Search:** Web for external info if needed

### Sower (Creative Problem Solver)
- **Read:** Recent activity → `adir/logs/emergence-reasoning-[DATE].md`
- **Read:** Project context → `adir/projects/reasoning/`
- **Write:** Ideas and options → `adir/projects/reasoning/emergence-sower-[DATE].md`
- **Search:** Web for inspiration and research

### Gardener (Organization & QA)
- **Read:** All character logs → `adir/projects/reasoning/emergence-*.md`
- **Read:** Shared log → `adir/logs/emergence-reasoning-[DATE].md`
- **Write:** Summary and cleanup → `adir/projects/reasoning/emergence-gardener-[DATE].md`
- **Verify:** Service health via `http://localhost:9303/api/adir-api.php?action=check_status`

---

## Tool Availability

All characters have access to:
- ✅ `web_search` - Search the web
- ✅ `file_read` - Read ADIR files
- ✅ `file_write` - Write ADIR files
- ✅ `file_list` - List directory contents
- ✅ `http_get` - Make HTTP GET requests
- ✅ `shell_command` - Execute commands
- ✅ `datetime` - Get current time
- ✅ `calculate` - Math operations
- ✅ `bab_api` - File management
- ✅ `atlas_controller` - System verification
- ✅ `prompt_guide` - Access prompt library

---

## Implementation Notes

1. **Dates:** Use `YYYY-MM-DD` format in file paths
2. **Timestamps:** Include `HH:MM:SS` in log entries
3. **Paths:** Use forward slashes `/` (will work in all environments)
4. **File writes:** Append to existing logs, don't overwrite
5. **Tool requests:** Keep them atomic (one primary goal per request)
6. **Responses:** Always log what came back for audit trail

---

**Status:** Ready for prompt updates
**Next Step:** Update character prompts with new tool mappings

**324 Ports and paths are changed ref data**
