**324 Ports and paths are changed ref data**

# 5AI Emergence Reasoning Engine - ADIR Integration

**Version:** 1.0
**Status:** 🟢 ACTIVE
**Date:** 2026-02-17

## System Identity
- **Name:** 5AI Emergence Reasoning Engine
- **Role:** Multi-character autonomous reasoning system
- **Access:** http://localhost:5555/emergence-reasoning-engine.html
- **Tool Execution:** TANDRmgr via https://tandr3ai.ngrok.app
- **Data Storage:** ADIR (Autonomous Directory Index Registry)

---

## Available Characters

| Character | Role | Provider | Status |
|-----------|------|----------|--------|
| **Friend** | Manager/Coordinator | TANDRmgr | 🟢 Active |
| **Journey** | Strategic Planner | Ollama (default) | 🟢 Active |
| **Sower** | Creative Problem Solver | TANDRmgr | 🟢 Active |
| **Gardener** | Organization & QA | Ollama (default) | 🟢 Active |
| **Workshop** | Orchestrator & Traffic | TANDRmgr | 🟢 Active |
| **Silence** | Graceful Completion | Ollama (default) | 🟢 Active |

---

## Available Tools (Full TANDR Agent Toolset)

### System Tools
- `web_search` - Search the web for information
- `file_read` - Read file contents
- `file_list` - List directory files
- `file_write` - Write/update files
- `shell_command` - Execute shell commands
- `http_get` - Make HTTP GET requests

### Specialized Tools
- `calculate` - Mathematical calculations
- `datetime` - Date and time operations
- `bab_api` - BuildingABot file management
- `atlas_controller` - Master verification system
- `prompt_guide` - Access prompt library
- `create_tool_files` - Create new tool directories

---

## ADIR Structure

```
adirhub/adir/
├── projects/
│   └── reasoning/
│       ├── emergence-friend-2026-02-17.md
│       ├── emergence-journey-2026-02-17.md
│       ├── emergence-sower-2026-02-17.md
│       ├── emergence-gardener-2026-02-17.md
│       ├── emergence-workshop-2026-02-17.md
│       └── emergence-silence-2026-02-17.md
└── logs/
    └── emergence-reasoning-2026-02-17.md
```

---

## How Tool Execution Works

1. **Character generates SYSTEM_AI_REQUEST** in response (JSON block in TECH_NOTES)
2. **Reasoning Engine extracts** the request block
3. **Routes to TANDRmgr** via https://tandr3ai.ngrok.app/api/mgr.php?action=tool_execute
4. **Logs request & response** to individual character MD file
5. **Logs to shared** emergence-reasoning log
6. **Returns results** to character for next cycle

---

## Testing Tools

To test tool execution, give the reasoning engine a goal like:

> "Test our tools by making real API calls. Try reading files, checking the dashboard, making web searches."

The characters will generate SYSTEM_AI_REQUEST blocks with:
- **reads:** File paths to read
- **writes:** Files to create/update
- **searches:** Web search queries
- **api_calls:** External API endpoints

---

## Next Steps

- [x] TANDRmgr integration configured
- [x] Tool execution bridge created
- [x] ADIR directory structure initialized
- [ ] Implement actual file write to MD logs (via TANDRmgr)
- [ ] Add web access capability
- [ ] Test with live goal
- [ ] Monitor tool execution logs

---

**Created by:** Claude Code Integration
**Last Updated:** 2026-02-17 07:45 UTC

**324 Ports and paths are changed ref data**
