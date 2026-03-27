**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - SOURCE OF TRUTH                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\SOURCE-OF-TRUTH.md║
║  Updated: 2026-03-16 | The master inventory — everything in one     ║
║  place.                                                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the definitive reference. If you need to verify a    ║
║  port, a path, an endpoint, or a decision — this is where you look. ║
║  REGISTRY.md is the quick map. This file is the full ledger.        ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303  |  This file: SOURCE-OF-TRUTH.md      ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Source of Truth — Complete System Inventory

This file is the master ledger. REGISTRY.md gives you the quick overview — this file gives you everything. Every service, every path, every endpoint, every configuration detail, every template, every convention. When two files disagree, check this one. When this one is wrong, create a SOT file to correct it.

---

## The Machine

Everything runs on one Windows 10 machine. No cloud, no containers, no external dependencies beyond Ollama running locally. The system is fully self-contained at `C:\FOB`.

| Component | Location | Notes |
|-----------|----------|-------|
| FOB Root | `C:\FOB` | Top-level directory |
| Project Root | `C:\FOB\adir\new211adir\TANDR-2026-02-11` | All services branch from here |
| Hub | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub` | Dashboard, tools, coordination |
| Apps | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps` | Applications and deployed agents |
| PHP | `C:\FOB\php\php-cgi.exe` | Bundled PHP 8.4 — not installed, just present |
| Node.js | System PATH | Must be >= 18.0, installed separately |
| Ollama | System PATH | Local LLM engine, installs itself |

---

## Complete Service Inventory

### Core Services

These five form the heartbeat. If any are down, the system is impaired.

| Service | Port | Directory | Server | Status Endpoint |
|---------|------|-----------|--------|-----------------|
| ADIR Hub | 9303 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub` | `server.js` | [http://127.0.0.1:9303/](http://127.0.0.1:9303/) |
| Agent-Dropper v2 | 9210 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2` | `server.js` | [http://127.0.0.1:9210/health](http://127.0.0.1:9210/health) |
| KB-Maker v2 | 9220 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2` | `server.js` | [http://127.0.0.1:9220/](http://127.0.0.1:9220/) |
| TANDRmgr-lab | 8086 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab` | `server.js` | [http://127.0.0.1:8086/](http://127.0.0.1:8086/) |
| Ollama | 11434 | External (system-level) | `ollama serve` | [http://127.0.0.1:11434/api/tags](http://127.0.0.1:11434/api/tags) |

### Optional Services

Started by MasterSTART6 but not critical to core operation.

| Service | Port | Directory | Purpose |
|---------|------|-----------|---------|
| GGBOT | 10336 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\GGBOT` | Specialized bot |
| ParserBot | 10108 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot` | Parser tool bot |

### Support Services

| Service | Port | Directory | Purpose |
|---------|------|-----------|---------|
| Memory Bot | 8091 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot` | Context and memory for TANDRmgr-lab |

### Deployed Agents

Created by Agent-Dropper v2. Each has its own Express server, port, and directory.

| Agent | Port | Directory | Status | Deployed |
|-------|------|-----------|--------|----------|
| Agent1 | 11111 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1` | Pre-fix deployment | Pre-fix |
| Agent2 | 11112 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\agent` | Running (agent/ subdir by design) | Custom |
| Agent4 | 11113 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4` | Working | Post-fix |
| Bot1 | 11114 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Bot1` | Deployed | — |

**Next available port:** 11115

---

## Complete Port Map

Every port in the system, in numerical order. This is the single place to check before assigning a new port.

| Port | Service | Type |
|------|---------|------|
| 8086 | TANDRmgr-lab | Core |
| 8091 | Memory Bot | Support |
| 9210 | Agent-Dropper v2 | Core |
| 9220 | KB-Maker v2 | Core |
| 9303 | ADIR Hub | Core |
| 10108 | ParserBot | Optional |
| 10336 | GGBOT | Optional |
| 11111 | Agent1 | Deployed |
| 11112 | Agent2 | Deployed |
| 11113 | Agent4 | Deployed |
| 11114 | Bot1 | Deployed |
| 11434 | Ollama | Core (LLM) |

---

## Complete API Reference

### ADIR Hub (Port 9303)

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/` | GET | Web dashboard (ADIRHUB.html) |
| `/api/adir-api.php?action=scan_projects` | GET | All projects with adir file lists |
| `/api/adir-api.php?action=check_status` | GET | Live port scan of all services |
| `/api/adir-api.php?action=get_registry` | GET | REGISTRY.md content as JSON |
| `/api/adir-api.php?action=read_file&path=PATH` | GET | Read any .md/.txt/.json file |
| `/api/adir-api.php?action=save_file` | POST | Write file (JSON body: path, content) |
| `/api/adir-api.php?action=append_file` | POST | Append to file (JSON body: path, content) |

**Note:** The `check_status` endpoint has a hardcoded service list in `adir-api.php`. It does not read from REGISTRY.md. If a new service is added, both REGISTRY.md AND the PHP function must be updated.

### Agent-Dropper v2 (Port 9210)

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/` | GET | Web interface |
| `/api/deploy-agent` | POST | Deploy new agent (JSON body required) |
| `/api/status` | GET | Dropper health and config |
| `/health` | GET | Simple ping |

**Deploy body format:**
```json
{
  "name": "AgentName",
  "type": "jerry",
  "port": 11116,
  "path": "C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/AgentName"
}
```

Types: `jerry` (agent template) or `tandrsocial` (bot template).

### Ollama (Port 11434)

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/tags` | GET | List all cached models |
| `/api/generate` | POST | Text generation (model + prompt) |
| `/api/chat` | POST | Chat completion (messages array) |

Default model: **qwen2.5:7b**

### Deployed Agents (Port 11111+)

All agents share the same API pattern:

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/` | GET | Agent web interface |
| `/api/agent.php?action=status` | GET | Agent status |
| `/api/agent.php?action=chat` | POST | Chat with agent |

---

## Startup Scripts

| Script | Location | What It Does |
|--------|----------|-------------|
| **MasterSTART6.bat** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\MasterSTART6.bat` | Full startup — prereq checks, first-run npm install, all services + agents + bots, health checks, browser tabs. This is the primary startup. |
| **START-ALL.bat** | `C:\FOB\START-ALL.bat` | Quick startup — 4 core Node.js services only. No prereqs, no agents, no bots. |
| **STOP-ALL.bat** | `C:\FOB\STOP-ALL.bat` | Shutdown script. |

**MasterSTART6 first-run behavior:** Creates `.fob-installed` marker after running `npm install` in every service directory. Delete this file to force a reinstall.

**Window titles:** Every service window is titled `FOB - [ServiceName]`. To kill all at once: `taskkill /FI "WINDOWTITLE eq FOB -*" /F`

---

## Directory Layout

```
C:\FOB\
├── START-ALL.bat                    ← Quick start (4 core services)
├── STOP-ALL.bat                     ← Shutdown
├── php\php-cgi.exe                  ← Bundled PHP 8.4
│
└── adir\new211adir\TANDR-2026-02-11\
    ├── MasterSTART6.bat             ← MAIN STARTUP (full system)
    │
    ├── adirhub\                     ← HUB
    │   ├── server.js                ← Express server (port 9303)
    │   ├── ADIRHUB.html             ← Dashboard UI
    │   ├── js\adirhub.js            ← Dashboard logic
    │   ├── api\adir-api.php         ← API endpoints
    │   ├── REGISTRY.md              ← Service map
    │   ├── BOOT.md                  ← Operating guide
    │   ├── index.md                 ← Navigation crossroads
    │   ├── current.md               ← Live status
    │   ├── working.md               ← Architecture
    │   ├── SOURCE-OF-TRUTH.md       ← This file
    │   ├── adir\                    ← SOT archive
    │   └── TOOLS\
    │       ├── Agent-Dropper-v2\    ← Agent deployer (9210)
    │       ├── KB-Maker-v2\         ← Bot factory (9220)
    │       ├── GGBOT\               ← Bot (10336)
    │       ├── Parser\ParserBot\    ← Parser (10108)
    │       ├── TEMPLATE-JERRY-CLEAN\       ← Agent template
    │       └── TEMPLATE-TANDRSOCIAL-CLEAN\ ← Bot template
    │
    └── apps\
        ├── TANDRmgr-lab\            ← Manager lab (8086)
        │   └── bot\                 ← Memory Bot (8091)
        ├── Agent1\                  ← Port 11111
        ├── Agent2\agent\            ← Port 11112
        ├── Agent4\                  ← Port 11113
        └── Bot1\                    ← Port 11114
```

---

## Templates

Agent-Dropper uses these templates when deploying new agents or bots. They live in the TOOLS directory and are copied wholesale, then configured.

| Template | Location | Used For |
|----------|----------|----------|
| JERRY | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN` | Standard agent deployment |
| TANDRSOCIAL | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN` | Bot deployment |

After copying, Agent-Dropper writes `config.json`, fixes `AGENT_DIR` in `server.js`, and generates a startup bat file.

---

## Configuration Conventions

**Default AI model:** qwen2.5:7b (set via Ollama, configurable per agent in config.json)

**Environment variable:** `TANDR_DEFAULT_MODEL` overrides the default model for TANDRmgr-lab. Falls back to `gemma3:1b` if not set.

**Node.js version:** >= 18.0 required (TANDRmgr-lab enforces this in its package.json)

**PHP:** Bundled at `C:\FOB\php\php-cgi.exe`. Version 8.4. No separate installation needed. All server.js files reference this path.

**CORS:** Every service has CORS wide open. Any origin can call any endpoint. This is by design — the system is fully local.

---

## Truth Hierarchy

When information conflicts, trust in this order:

1. **The running service itself** — curl it, scan its port, check its response. The machine doesn't lie.
2. **MasterSTART6.bat** — this is the script that actually starts everything. Its port assignments and paths are the operational ground truth.
3. **This file (SOURCE-OF-TRUTH.md)** — the maintained ledger.
4. **REGISTRY.md** — the quick-reference map.
5. **SOT files** — dated snapshots. Newest wins.
6. **Other md files** — check the date. Old files from earlier eras (pre March 2026) describe a different system.

---

## Dead References

If you encounter any of these in old files, you're reading historical content. None of these exist in the current system:

| Reference | What It Was | Era |
|-----------|-------------|-----|
| `C:\TandrHub` | Old system location | Era 1 (Feb 2026) |
| `C:\STARTPOWER` | Old startup scripts | Era 1 |
| Service Manager (9999) | Centralized service manager | Era 1 |
| TANDRbot (8081) | Facebook Messenger bot | Era 1 |
| TANDRCRM (9200) | Agent UI | Era 1 |
| TANDRSocial (8099) | Social bot | Era 1 |
| TANDRmgr (8085) | Old manager (now TANDRmgr-lab 8086) | Era 1 |
| Jerry/Randy/Tommy agents | Named agents on 9200-9202 | Era 1 |
| Atlas (9204) | Master controller | Era 1 |
| BASELINE (9199) | Reference copy | Era 1 |
| 1CRM Dashboard (9304) | CRM dashboard | Era 1 |
| WordPress Test Lab (8888) | WP testing | Era 1 |
| ngrok (4040) | External tunnel | Era 1 |
| CONFIG-SERVICES.txt | Service config file | Era 1 |
| DIAGNOSE.bat | Diagnostic tool | Era 1 |
| START-MASTER.bat | Old startup | Era 1 |
| STATMASTER bats | Deployment scripts | Era 2 (Feb 24) |
| 3AI Mobile (8087/8088) | Mobile app | Era 2 |
| START-HERE.md | Deployment guide | Era 2 |

---

## How This File Gets Updated

This is a base-layer file. It should be accurate at the time it's written. As the system evolves:

**For small corrections:** Create a SOT file. Name it `SOT-[YYYYMMDD]-sot-update.md` and place it in `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\`. Include what changed and why.

**For major overhauls:** Rewrite this file directly. Update the date in the header. The rule for agents: if you're confident the change is correct and verified, you can update this file. If you're not sure, write a SOT file instead and let a human review.

**Always verify before recording.** Curl the port. List the directory. Check the file exists. This ledger is only as good as the verification behind it.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF SOURCE-OF-TRUTH.md                                           ║
╠══════════════════════════════════════════════════════════════════════╣
║  You've read the complete ledger. Your next move:                    ║
║                                                                      ║
║  → Go back to the crossroads:                                        ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  → Check the quick map:                                              ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md      ║
║                                                                      ║
║  → See what's happening right now:                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\current.md       ║
║                                                                      ║
║  To evolve this ledger, create:                                      ║
║  SOT-[YYYYMMDD]-sot-update.md                                        ║
║  Place in: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\    ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
