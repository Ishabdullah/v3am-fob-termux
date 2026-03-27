**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT & OPERATING GUIDE                                ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Agent-Dropper-v2\adir\BOOT.md                                      ║
║  Updated: 2026-03-16 | How to operate Agent-Dropper v2.             ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is Agent-Dropper v2 — the factory that creates new      ║
║  agents and bots. It copies templates, patches configs, fixes        ║
║  routing, and generates startup scripts. Port 9210.                  ║
║                                                                      ║
║  Home: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\       ║
║        Agent-Dropper-v2                                              ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Operate Agent-Dropper v2

Agent-Dropper is the agent factory. You tell it what you want — a name, a type, a port — and it builds you a running agent. It copies the right template, writes the config, fixes the server routing, generates startup scripts, and hands you a ready-to-launch directory. It's one of the four core services and runs on port 9210.

---

## Starting Up

Agent-Dropper starts automatically with MasterSTART6:
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\MasterSTART6.bat
```

Or start it directly:
```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2
npm install
node server.js
```

Once running, open the web interface: [http://127.0.0.1:9210/](http://127.0.0.1:9210/)

---

## Deploying an Agent

This is Agent-Dropper's core job. One POST request and you have a new agent.

**Step 1:** Decide on a name, type, port, and path. Agents go in apps:
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\[AgentName]`

Currently used ports: 11111 (Agent1), 11112 (Agent2), 11113 (Agent4), 11114 (Bot1). Next available: **11115**.

**Step 2:** POST to the deploy endpoint:
```
curl -X POST http://127.0.0.1:9210/api/deploy-agent -H "Content-Type: application/json" -d "{\"name\":\"Agent5\",\"type\":\"jerry\",\"port\":11116,\"path\":\"C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/Agent5\"}"
```

**Step 3:** Start the new agent:
```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent5
npm install
node server.js
```

Or use the generated `START-AGENT5.bat`.

**Step 4:** Verify: `curl http://127.0.0.1:11116/`

---

## What Happens During Deployment

When Agent-Dropper receives a deploy request, it runs through this sequence:

1. **Creates the target directory** at the specified path
2. **Copies the template** — TEMPLATE-JERRY-CLEAN for `"type": "jerry"` agents (the only template currently wired up for deployment). Falls back to copying from TANDRCRM if the template isn't found.
3. **Skips heavy directories** — `node_modules`, `upload`, `.git` are not copied
4. **Ensures key directories exist** — `api/`, `adir/logs/`, `data/`
5. **Fixes AGENT_DIR in server.js** — Replaces `path.join(ROOT_DIR, 'agent')` with `ROOT_DIR` so API routes work correctly
6. **Writes config.json** — Merges deployment parameters (port, name, paths, LLM, voice, knowledge bot) with any existing config from the template
7. **Creates a clean conversation log** in `adir/logs/conversations.txt`
8. **Ensures package.json exists** — Creates one if the template didn't have it
9. **Generates START and STOP bat files** — `START-[NAME].bat` and `STOP-[NAME].bat`
10. **Writes BOOT.md** — A deployment-specific boot file in the agent's adir

The result is a fully independent agent directory that can be started immediately.

---

## The Deploy API

| Endpoint | Method | Body |
|----------|--------|------|
| `/api/deploy-agent` | POST | JSON with deployment parameters |
| `/api/status` | GET | Service health, LLM config, voice/ngrok status |
| `/health` | GET | Simple ping |

**Deploy body fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Agent name (used in bat files, config, BOOT.md) |
| `type` | Yes | Template type (`jerry` or `tandrsocial`) |
| `port` | No | Port number for the agent |
| `path` | Yes | Absolute path where agent will be created |
| `kbUrl` | No | Knowledge bot API URL |
| `kbEnabled` | No | Enable knowledge bot linking |
| `systemPrompt` | No | Custom system prompt |
| `voice` | No | Voice configuration object |

---

## Additional Features

**Voice module** — Agent-Dropper has Web Speech API integration for text-to-speech responses. Configured in config.json under `voice`. Browser-based — no server overhead.

**ngrok support** — Placeholder configuration for remote access via ngrok tunnel. Currently set to placeholder status. Configure auth token and domain in config.json to enable.

**Web UI** — The index.html provides a dashboard with tabs for agent building, template browsing, deployment management, voice settings, ngrok status, and general settings.

---

## Troubleshooting

**Deploy returns error:** Check that the target path is valid and the parent directory exists. Agent-Dropper creates the final directory but not intermediate parents.

**Deployed agent returns 404:** The AGENT_DIR fix should have been applied automatically. Verify by checking line 34 of the deployed agent's server.js — it should say `const AGENT_DIR = ROOT_DIR;` not `path.join(ROOT_DIR, 'agent')`.

**Port conflict:** An agent can't start if another process already holds the port. Check with `netstat -ano | findstr :[PORT]` and kill the conflicting process.

**Template not found:** Agent-Dropper looks for TEMPLATE-JERRY-CLEAN at the hardcoded path `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN`. If this directory is missing, it falls back to copying from `apps\TANDRCRM`.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know how to operate Agent-Dropper. Your next move:              ║
║                                                                      ║
║  → See what's in this directory:                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Agent-Dropper-v2\adir\index.md                                    ║
║                                                                      ║
║  → Walk back up to the hub:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  → See what Agent-Dropper deploys from:                              ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\BOOT.md                                ║
║                                                                      ║
║  To evolve this guide, create:                                       ║
║  SOT-[YYYYMMDD]-agent-dropper-boot.md                                ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
