"323 Update these ports are out dated they are for historical record"

# Agent Template - Jerry Clean (Reference)

**Status:** ✅ Template for Agent-Dropper v2
**Version:** 2.0.0
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN`

---

## What Is This?

**TEMPLATE-JERRY-CLEAN** is a reference agent template used by Agent-Dropper v2 to spawn new agents.

**Purpose:**
- Base structure for new agent deployment
- Shows expected file organization
- Demonstrates API layer architecture
- Contains configuration examples

---

## Template Structure

```
TEMPLATE-JERRY-CLEAN/
├── adir/                  ← Documentation (use NEW-313- prefix)
│   ├── BOOT.md
│   ├── CURRENT-STATUS.md
│   ├── index.md
│   ├── logs/
│   └── ... (various session docs)
├── api/                   ← Agent logic (PHP)
│   ├── agent.php
│   ├── auto.php
│   └── providers/
├── config.json            ← Agent configuration
├── dashboard.html         ← Web interface
└── server.js              ← Express server (if Node.js)
```

---

## How Agent-Dropper v2 Uses This

1. **Template copy** - Agent-Dropper copies this directory to spawn new agent
2. **Configuration update** - Sets port, name, LLM provider in config.json
3. **Documentation created** - New agent gets its own adir/ files
4. **API adjusted** - Routes and handlers updated for new agent
5. **Deployment** - New agent starts on assigned port

---

## Key Files (Template Reference)

| File | Purpose |
|------|---------|
| `config.json` | Agent configuration (port, LLM, API keys) |
| `api/agent.php` | Main API handler |
| `api/auto.php` | Automation/task execution |
| `dashboard.html` | Admin interface |
| `adir/BOOT.md` | Agent startup guide |
| `adir/CURRENT-STATUS.md` | Operational status |

---

## For New Agent Creation

When Agent-Dropper v2 creates a new agent from this template:

1. **Copy structure** - All files/directories duplicated
2. **Update config.json**:
   - Set `port` to assigned port
   - Set `name` to agent name
   - Configure LLM provider (Ollama/Anthropic/etc)
   - Add necessary API keys
3. **Create NEW-313- files**:
   - NEW-313-index.md - Agent overview
   - NEW-313-BOOT.md - Startup guide
   - NEW-313-current.md - Status
   - NEW-313-working.md - Architecture
4. **Initialize logs** - Create adir/logs/ directory
5. **Start agent** - `node server.js` or equivalent

---

## Configuration Example (config.json)

```json
{
  "app": {
    "name": "Agent Name Here",
    "port": 9200,
    "environment": "production"
  },
  "llm": {
    "provider": "ollama",
    "model": "qwen2.5:7b",
    "endpoint": "http://localhost:11434"
  },
  "api_keys": {
    "anthropic": "sk-...",
    "google": "..."
  }
}
```

---

## Related

- **Agent-Dropper v2:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\`
- **Template Directory:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\`

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\adir\NEW-313-index.md`
**Created:** 2026-03-13
**Status:** ✅ Reference Template
**Last Updated:** 2026-03-13

**This template is used by Agent-Dropper v2 to create new agents.**
