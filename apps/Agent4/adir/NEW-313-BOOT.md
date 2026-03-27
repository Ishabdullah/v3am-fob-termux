**324 Ports and paths are changed ref data**

# Agent Template - Boot & Startup Guide

**Status:** ✅ Template for Agent-Dropper v2
**Version:** 2.0.0
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN`

---

## What Is This Template?

TEMPLATE-JERRY-CLEAN is a reference agent that Agent-Dropper v2 uses to spawn new agents.

**When cloned by Agent-Dropper v2:**
- Directory copied to new location
- config.json updated with port, name, LLM settings
- NEW-313- documentation files created
- Agent started on assigned port

---

## How To Use This Template

### For Agent-Dropper v2 (Automatic)

Agent-Dropper will handle:
1. Copy all files from this template
2. Update config.json with agent details
3. Set port number
4. Create NEW-313- files
5. Start agent

### Manual Usage (for testing)

```bash
# Navigate to template
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN

# Install dependencies
npm install

# Start server
node server.js
```

---

## Pre-Flight Checklist

Before spawning a new agent from this template:

- ✅ Node.js installed: `node --version`
- ✅ PHP installed: `php -v`
- ✅ Port available (check in config.json)
- ✅ Dependencies: `npm install`
- ✅ config.json valid JSON
- ✅ LLM provider reachable (Ollama/Anthropic)

---

## Configuration (config.json)

```json
{
  "app": {
    "name": "Agent Name",
    "port": 9200,
    "environment": "production"
  },
  "llm": {
    "provider": "ollama",
    "model": "qwen2.5:7b",
    "endpoint": "http://localhost:11434"
  }
}
```

**When cloning:** Agent-Dropper will update these values automatically.

---

## Directory Structure

```
TEMPLATE/
├── api/               ← API handlers (PHP)
├── adir/              ← Documentation
├── config.json        ← Configuration
├── dashboard.html     ← Web interface
├── server.js          ← Express server
└── package.json       ← Dependencies
```

---

## Starting an Agent

### Via Node.js

```bash
node server.js
```

**Output:**
```
Agent listening on http://127.0.0.1:9200/
Ready for connections
```

### Via Batch (Windows)

Agent-Dropper will create appropriate batch files automatically.

---

## Testing the Agent

### Health Check
```bash
curl http://localhost:9200/api/agent.php?action=status
```

### Chat Interface
```bash
curl -X POST http://localhost:9200/api/agent.php?action=chat -d "message=Hello"
```

### Available Tools
```bash
curl http://localhost:9200/api/agent.php?action=tools
```

---

## Logs & Debugging

**Location:** `adir/logs/`

**Files:**
- `conversations.txt` - Chat history
- `errors.txt` - Error log
- `startup.log` - Boot sequence

---

## Integration with FOB

New agents created from this template automatically:
- Register with ADIR Hub (9303)
- Connect to Ollama (11434)
- Store logs in adir/logs/
- Expose dashboard.html for UI

---

## Important Notes

**For agents using this template:**
1. Each agent gets unique port (no conflicts)
2. Logs isolated to own adir/logs/
3. Configuration in own config.json
4. Code structure same across all agents

---

## Related Files

- [NEW-313-index.md](./NEW-313-index.md) - Overview
- [NEW-313-current.md](./NEW-313-current.md) - Status
- [NEW-313-working.md](./NEW-313-working.md) - Architecture

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\adir\NEW-313-BOOT.md`
**Created:** 2026-03-13
**Status:** ✅ Template
**Last Updated:** 2026-03-13

**This template is used by Agent-Dropper v2 for agent deployment.**

**324 Ports and paths are changed ref data**
