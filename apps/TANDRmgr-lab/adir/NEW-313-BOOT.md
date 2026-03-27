324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 

# TANDRmgr-lab - Boot & Operating Guide

**Status:** ✅ Ready to Run
**Version:** 2026-03-13
**Port:** 8086
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab`

---

## What Is TANDRmgr-lab?

**TANDRmgr-lab** is the **manager lab & testing service** in FOB that:
- Provides a **testing interface** for LLM interactions
- Acts as a **relay to Ollama** (local LLM)
- Maintains **conversation memory** for context
- Offers **API endpoints** for service testing
- Supports **integration with Memory Bot** (port 8091)

**Use it for:**
- Testing Ollama models
- Experimenting with prompts
- Maintaining conversation context
- Testing service integration

---

## Prerequisites

### Required (Checked by MasterSTART.bat)
- Node.js v22+ (for runtime)
- npm (package manager, comes with Node.js)
- Ollama (LLM provider, port 11434)
- Port 8086 available

### Check Installation
```bash
node --version          # Should be v22.x.x
npm --version           # Should show version
curl http://localhost:11434/api/tags    # Ollama running?
netstat -ano | findstr :8086            # Port free?
```

---

## Quick Start

### Option 1: Via MasterSTART.bat (Recommended)
```batch
C:\FOB\MasterSTART.bat
```
This starts TANDRmgr-lab as part of all 8 FOB services.

### Option 2: Start Directly
```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab

# Install dependencies (first time only)
npm install

# Start the server
node bot/server.js
```

### Option 3: Check Status
```bash
curl http://localhost:8086/
```

Expected response: Service info + config

---

## File Structure

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\
├── adir/                          ← Documentation (THIS FOLDER)
│   ├── NEW-313-index.md          ← Navigation
│   ├── NEW-313-BOOT.md           ← This file
│   ├── NEW-313-current.md        ← Current status
│   ├── NEW-313-working.md        ← Architecture
│   ├── SANITIZATION-GUIDE.md     ← Data sanitization
│   └── logs/                      ← Session logs
│       ├── conversations.txt      ← Conversation history
│       ├── server-restarts.log    ← Restart timestamps
│       └── ...
│
├── bot/                           ← Service code
│   ├── server.js                 ← Express server
│   ├── config.json               ← Configuration
│   ├── package.json              ← Dependencies
│   ├── package-lock.json         ← Lock file
│   ├── node_modules/             ← Installed packages
│   ├── data/
│   │   └── memory-knowledge/     ← Knowledge base
│   │       ├── conversations.md
│   │       ├── institutional_dna_hooks.md
│   │       ├── relay-history.md
│   │       └── ...
│   └── adir/logs/                ← Bot logs
│       ├── queries.txt
│       └── errors.txt
│
└── data/
    └── help-context.md
```

---

## Configuration

### Location
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\config.json
```

### Key Settings
```json
{
  "port": 8086,
  "ollama": {
    "host": "http://localhost",
    "port": 11434,
    "defaultModel": "qwen2.5:7b"
  },
  "memory": {
    "enabled": true,
    "path": "./data/memory-knowledge"
  },
  "api": {
    "relay": true,
    "help": true
  }
}
```

### Modify Model
Edit `config.json` to change default Ollama model:
```json
"defaultModel": "mistral:7b"    // or llama3:7b, etc.
```

Then restart service.

---

## Common Operations

### Task: Check if Running
```bash
curl http://localhost:8086/
```

### Task: Query Ollama via TANDRmgr
```bash
curl -X POST http://localhost:8086/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explain open source software","model":"qwen2.5:7b"}'
```

### Task: List Available Models
```bash
curl http://localhost:11434/api/tags
```

### Task: Check Memory
```bash
curl http://localhost:8086/api/memory
```

### Task: Pull New Ollama Model
```bash
ollama pull llama3:7b
```

Then update config.json defaultModel if desired.

### Task: View Logs
```bash
# Conversations
cat C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\conversations.txt

# Queries
cat C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\adir\logs\queries.txt

# Errors
cat C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\adir\logs\errors.txt
```

### Task: Restart Service
```bash
# Kill existing process
taskkill /im node.exe /f

# Start fresh
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab
node bot/server.js
```

### Task: Install Dependencies
```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab
npm install
```

---

## Integration Points

### With Ollama (Port 11434)
- Sends requests to `/api/generate` and `/api/chat/completions`
- Polls `/api/tags` for available models
- Falls back if Ollama down

### With Memory Bot (Port 8091)
- Passes conversation context
- Requests previous session data
- Updates memory on completion

### With ADIR Hub (Port 9303)
- Registers health check
- Appears in service list
- Can be controlled via ADIR admin panel

### With MasterSTART.bat
- Started automatically
- Health checked via curl
- Part of unified startup

---

## Troubleshooting

### Service Won't Start

**Port 8086 in use:**
```bash
netstat -ano | findstr :8086
taskkill /PID [PID] /f
```

**Node.js not found:**
```bash
node --version
# If fails, install from https://nodejs.org/
```

**Dependencies missing:**
```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab
npm install
```

### Ollama Not Responding

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If fails, start Ollama
ollama serve
```

### Configuration Issues

Check `config.json`:
```bash
cat C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\config.json
```

Verify JSON is valid (use JSONLint or similar)

### Memory Not Loading

Check path in config.json:
```
"path": "./data/memory-knowledge"
```

Verify directory exists:
```bash
ls -la C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge\
```

---

## Data & Logs

### Log Locations (See SANITIZATION-GUIDE.md for details)

| Log File | Size | Purpose |
|----------|------|---------|
| `adir\logs\conversations.txt` | 1.1 MB | Conversation history |
| `bot\adir\logs\queries.txt` | TBD | Bot queries |
| `adir\logs\server-restarts.log` | 5 KB | Restart timestamps |
| `adir\logs\server-errors.txt` | 25 KB | Error history |

### Memory Locations

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge\
├── conversations.md              ← Stored conversations
├── institutional_dna_hooks.md    ← Company procedures (SANITIZE)
├── relay-history.md              ← Service relay history
├── error-patterns.md             ← Learned error patterns
├── performance.md                ← Performance metrics
└── ...
```

### Before Open Source
**CRITICAL:** Sanitize all log and memory files

1. Follow: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\SANITIZATION-GUIDE.md`
2. Replace company names
3. Remove customer data
4. Verify still functional

---

## Entry/Exit Protocol

### Entering (After Reboot)
1. Read: `NEW-313-current.md` (what's the status?)
2. Read: `NEW-313-working.md` (how does it work?)
3. Check: `http://localhost:8086/` (is it running?)
4. Review: `SANITIZATION-GUIDE.md` (data status?)

### Exiting (Before Shutdown)
1. Update: `NEW-313-current.md` with final status
2. Review: Any data needing sanitization?
3. Close: All service terminals

---

## Performance Notes

- **Startup time:** ~5 seconds (after Node.js loads)
- **Memory usage:** ~80-100 MB
- **Response time:** Depends on Ollama model (usually 1-30 seconds)
- **Log growth:** conversations.txt ~1 MB (grows slowly)

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-BOOT.md`
**Created:** 2026-03-13
**Purpose:** Operating guide for TANDRmgr-lab
**Status:** ✅ Ready for FOB
**Last Updated:** 2026-03-13

**Related Files:**
- Index: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-index.md`
- Status: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-current.md`
- Architecture: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-working.md`
- Sanitization: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\SANITIZATION-GUIDE.md`


324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
