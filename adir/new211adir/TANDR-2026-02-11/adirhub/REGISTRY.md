```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - SERVICE REGISTRY                                     ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md       ║
║  Updated: 2026-03-22 | Read next: BOOT.md (how to operate)          ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: You are reading the Registry — the map of everything that   ║
║  exists in this system and where to find it. If you just woke up    ║
║  and this is your first file, good. You're in the right place.      ║
║                                                                      ║
║  After this file, read:                                              ║
║  1. BOOT.md → how to start and operate the system                    ║
║  2. index.md → navigation links to everything else                   ║
║  3. current.md → what's happening right now                          ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303  |  This file: REGISTRY.md              ║
╚══════════════════════════════════════════════════════════════════════╝
```

# FOB Service Registry

**This is the authoritative map of every service, port, path, and endpoint in the FOB system.** If something isn't listed here, it either doesn't exist yet or it's from an older era and should not be trusted. Always check dates on any md file you find — the system has evolved through multiple versions and stale files still linger in these directories. When in doubt, walk the directory and verify with your own eyes.

---

## The Territory

FOB lives at `C:\FOB`. Everything runs from one machine, fully local, zero external dependencies. The brain of the operation is a set of Node.js Express servers that proxy requests to PHP scripts for the actual business logic. PHP is bundled at `C:\FOB\php\php-cgi.exe` — it doesn't need to be installed separately.

The main project tree starts here:

`C:\FOB\adir\new211adir\TANDR-2026-02-11\`

From that root, two branches matter:

- **adirhub/** — The hub. ADIR Hub server, the TOOLS directory, and all the builder tools live here. This is where you are right now.
- **apps/** — Applications. TANDRmgr-lab, deployed agents, and bots live here.

---

## Core Services

These always run. They are the heartbeat of FOB. If any of these are down, something is wrong.

| Service | Port | What It Does | Where It Lives |
|---------|------|-------------|----------------|
| **V3AMFOB** | — | Electron launcher — starts all services, rack panel, tray icon, Control API | `C:\FOB\V3AMFOB` |
| **KB-Maker v2** | 9220 | Bot factory and knowledge builder interface | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2` |
| **Agent-Dropper v2** | 9210 | Deploys new agents — copies templates, fixes configs, generates startup scripts | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2` |
| **TANDRmgr-lab** | 8086 | Manager lab with chat interface — the owner's workbench for testing and orchestration | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab` |
| **ADIR Hub** | 9303 | Central dashboard and coordination — the file viewer, project scanner, and status monitor you might be looking at right now | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub` |
| **FOB Server** | 8100 | Static file server — serves help.html, index, and assets | `C:\FOB` |
| **Control API** | 9399 | Fleet control bridge built into V3AMFOB — GET /status, POST /restart/:id, /start/:id, /stop/:id | `C:\FOB\V3AMFOB\main.js` |
| **Ollama** | 11434 | Local LLM engine. Optional — cloud providers also work via config.json | External service (not in the FOB directory tree) |

**To verify any service is alive**, open a browser or curl it:

- KB-Maker: [http://127.0.0.1:9220/](http://127.0.0.1:9220/)
- Agent-Dropper: [http://127.0.0.1:9210/](http://127.0.0.1:9210/)
- TANDRmgr-lab: [http://127.0.0.1:8086/](http://127.0.0.1:8086/)
- ADIR Hub: [http://127.0.0.1:9303/](http://127.0.0.1:9303/)
- Ollama models: [http://127.0.0.1:11434/api/tags](http://127.0.0.1:11434/api/tags)

---

## Extended Services

V3AMFOB launches these alongside the core services.

| Service | Port | What It Does | Where It Lives |
|---------|------|-------------|----------------|
| **Librarian** | 57785 | Knowledge curator and new-user onboarding — the first agent most users see | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\librarian` |
| **StartPower** | 57775 | LLM relay and system prompt engine | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\StartPower` |
| **TANDRSocial** | 57790 | Social media content assistant | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial` |
| **ImageGen** | 9230 | Image generation interface | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\ImageGen` |
| **ScreenStream** | 9240 | Screen capture and streaming relay | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\ScreenStream` |
| **VisionBot** | 10337 | Vision-capable knowledge bot | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\VisionBot` |
| **GGBot KB** | 10333 | Knowledge bot (GGBot knowledge base) | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\GGBOT` |
| **GGBOT** | 10336 | Specialized bot | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\GGBOT` |
| **ParserBot** | 10108 | Parser tool bot | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot` |

---

## Support Services

| Service | Port | What It Does | Where It Lives |
|---------|------|-------------|----------------|
| **Memory Bot** | 8091 | Context and memory assistant for TANDRmgr-lab | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot` |

---

## Deployed Agents

The Agent-Dropper creates new agents on demand. Each one gets its own port, its own directory, and its own server.js. They land in the apps directory:

`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\`

| Agent | Port | Path | Status |
|-------|------|------|--------|
| **Agent1** | 11111 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1` | Running |
| **Agent2** | 11112 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\agent` | Running |
| **Agent4** | 11113 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4` | Running |
| **Bot1** | 11114 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Bot1` | Running |

**Important:** Agent-Dropper v2 now automatically fixes the `AGENT_DIR` path in server.js during deployment. Any agent deployed after 2026-03-15 will work correctly. Agent1 was deployed before this fix and may need a manual edit to set `const AGENT_DIR = ROOT_DIR;` in server.js, or a redeploy through Agent-Dropper.

**To deploy a new agent**, POST to Agent-Dropper:

```
http://127.0.0.1:9210/api/deploy-agent
```

Required JSON body:
```json
{
  "name": "MyAgent",
  "type": "jerry",
  "port": 11116,
  "path": "C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/MyAgent"
}
```

---

## Port Map

A quick reference so you never have to guess. If you're an agent and you want to know what's running, scan these ports — but always verify live rather than trusting this list blindly. Ports can change.

| Port | Service | Type |
|------|---------|------|
| 8086 | TANDRmgr-lab | Core |
| 8091 | Memory Bot | Support |
| 8100 | FOB Server | Core |
| 9210 | Agent-Dropper v2 | Core |
| 9220 | KB-Maker v2 | Core |
| 9230 | ImageGen | Extended |
| 9240 | ScreenStream | Extended |
| 9303 | ADIR Hub | Core |
| 9399 | Control API (V3AMFOB) | Core |
| 10108 | ParserBot | Extended |
| 10333 | GGBot KB | Extended |
| 10336 | GGBOT | Extended |
| 10337 | VisionBot | Extended |
| 11111 | Agent1 | Deployed |
| 11112 | Agent2 | Deployed |
| 11113 | Agent4 | Deployed |
| 11114 | Bot1 | Deployed |
| 11434 | Ollama | LLM (optional) |
| 57775 | StartPower | Extended |
| 57785 | Librarian | Extended |
| 57790 | TANDRSocial | Extended |

---

## API Endpoints

These are the doors you knock on to talk to each service. If you're building something or connecting agents, these are your integration points.

### ADIR Hub (9303)

| Endpoint | Method | What You Get |
|----------|--------|-------------|
| [http://127.0.0.1:9303/](http://127.0.0.1:9303/) | GET | Web dashboard |
| [http://127.0.0.1:9303/api/adir-api.php?action=scan_projects](http://127.0.0.1:9303/api/adir-api.php?action=scan_projects) | GET | All projects with their adir files |
| [http://127.0.0.1:9303/api/adir-api.php?action=check_status](http://127.0.0.1:9303/api/adir-api.php?action=check_status) | GET | Live status of all services (port scan) |
| [http://127.0.0.1:9303/api/adir-api.php?action=get_registry](http://127.0.0.1:9303/api/adir-api.php?action=get_registry) | GET | This file (REGISTRY.md) as JSON |
| [http://127.0.0.1:9303/api/adir-api.php?action=read_file&path=PATH](http://127.0.0.1:9303/api/adir-api.php?action=read_file&path=PATH) | GET | Read any .md/.txt/.json file |

### Agent-Dropper v2 (9210)

| Endpoint | Method | What You Get |
|----------|--------|-------------|
| [http://127.0.0.1:9210/](http://127.0.0.1:9210/) | GET | Web interface |
| [http://127.0.0.1:9210/api/deploy-agent](http://127.0.0.1:9210/api/deploy-agent) | POST | Deploy a new agent (JSON body required) |
| [http://127.0.0.1:9210/api/status](http://127.0.0.1:9210/api/status) | GET | Dropper health and config |
| [http://127.0.0.1:9210/health](http://127.0.0.1:9210/health) | GET | Simple ping |

### Ollama (11434)

| Endpoint | Method | What You Get |
|----------|--------|-------------|
| [http://127.0.0.1:11434/api/tags](http://127.0.0.1:11434/api/tags) | GET | List all available models |
| [http://127.0.0.1:11434/api/generate](http://127.0.0.1:11434/api/generate) | POST | Generate text (model + prompt in body) |
| [http://127.0.0.1:11434/api/chat](http://127.0.0.1:11434/api/chat) | POST | Chat completion (messages array in body) |

Default model: **qwen2.5:7b**

---

## Startup

**Primary launcher — V3AMFOB (Electron app):**
```
C:\FOB\V3AMFOB\V3AMFOB.exe
```
Or use the desktop shortcut. V3AMFOB starts all services automatically, shows a rack panel with live status per service, and sits in the system tray. Clicking X minimizes to tray — services keep running. Right-click tray → Quit to kill everything.

**Emergency stop bat:**
```
C:\FOB\STOP-ALL2.bat
```

**Control API** (for agents and dashboards to control the fleet programmatically):
```
GET  http://127.0.0.1:9399/status        → full fleet status JSON
POST http://127.0.0.1:9399/restart/:id   → kill + respawn a service
POST http://127.0.0.1:9399/start/:id     → start a downed service
POST http://127.0.0.1:9399/stop/:id      → stop a service
```
If you are an agent running inside an iframe and want to show fleet status or restart a service — use the Control API. You do not need DOM access. The API is the bridge.

---

## Directory Layout

```
C:\FOB\
├── V3AMFOB\                         ← MAIN LAUNCHER (Electron app)
│   ├── V3AMFOB.exe                  ← Start here
│   └── main.js                      ← Control API (port 9399) lives here
├── STOP-ALL2.bat                    ← Kill all services
├── help.html                        ← This help page (served on port 8100)
├── php\php-cgi.exe                  ← Bundled PHP 8.4
│
└── adir\new211adir\TANDR-2026-02-11\
    ├── adirhub\                     ← YOU ARE HERE
    │   ├── server.js                ← ADIR Hub Express server (port 9303)
    │   ├── REGISTRY.md              ← This file
    │   ├── BOOT.md                  ← How to operate
    │   ├── index.md                 ← Navigation links
    │   ├── current.md               ← Current status
    │   ├── working.md               ← How things work
    │   ├── ADIRHUB.html             ← Web dashboard UI
    │   ├── api\adir-api.php         ← Hub API endpoints
    │   ├── js\adirhub.js            ← Dashboard logic
    │   ├── adir\                    ← SOT files and deep docs
    │   └── TOOLS\
    │       ├── KB-Maker-v2\         ← Bot factory (port 9220)
    │       ├── Agent-Dropper-v2\    ← Agent deployer (port 9210)
    │       ├── librarian\           ← Librarian (port 57785)
    │       ├── StartPower\          ← LLM relay (port 57775)
    │       ├── GGBOT\               ← Bot (port 10336)
    │       ├── Parser\ParserBot\    ← Parser bot (port 10108)
    │       ├── TEMPLATE-JERRY-CLEAN\      ← Agent template
    │       └── TEMPLATE-TANDRSOCIAL-CLEAN\← Bot template
    │
    └── apps\
        ├── TANDRmgr-lab\            ← Manager lab (port 8086)
        │   └── bot\                 ← Memory Bot (port 8091)
        ├── TANDRSocial\             ← Social content (port 57790)
        ├── ImageGen\                ← Image gen (port 9230)
        ├── ScreenStream\            ← Screen capture (port 9240)
        ├── VisionBot\               ← Vision bot (port 10337)
        ├── Agent1\                  ← Port 11111
        ├── Agent2\agent\            ← Port 11112
        ├── Agent4\                  ← Port 11113
        └── Bot1\                    ← Port 11114
```

---

## A Note About Old Files

This system has been through multiple eras. You will find md files in these directories that reference services, ports, and paths that no longer exist. If you see references to `C:\TandrHub`, `C:\STARTPOWER`, Service Manager on port 9999, TANDRbot on 8081, TANDRCRM on 9200, or agents named Jerry, Randy, and Tommy on ports 9200-9202 — those are from an earlier version. They are not wrong in the context of when they were written, but they do not describe the system as it exists today.

**The rule is simple:** check the date on any file you read. If there's a newer SOT file on the same topic, read that instead. And if you learn something new that contradicts an old file, create your own SOT file to capture the updated truth.

---

## How to Create a SOT File

When you discover something that needs recording — a new service, a changed port, a fix that worked, a decision that was made — write a Source of Truth file:

1. **Name it:** `SOT-[YYYYMMDD]-[topic].md` (example: `SOT-20260316-agent4-routing-fix.md`)
2. **Place it:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\`
3. **Include:** What changed, why it changed, when you verified it, and who you are
4. **Add the console header/footer** so the next agent who reads it gets oriented

The system evolves through SOT files. This REGISTRY.md is the base layer. Your SOT files are the updates. The latest date wins.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF REGISTRY.md                                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  You now know what exists and where. Your next move:                 ║
║                                                                      ║
║  → Learn how to operate the system:                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\BOOT.md          ║
║                                                                      ║
║  → See what's happening right now:                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\current.md       ║
║                                                                      ║
║  → Navigate to other parts of the system:                            ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this registry, create:                                    ║
║  SOT-[YYYYMMDD]-registry-update.md                                   ║
║  Place in: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\    ║
╚══════════════════════════════════════════════════════════════════════╝
```
