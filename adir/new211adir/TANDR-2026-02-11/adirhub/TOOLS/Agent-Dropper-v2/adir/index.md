**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - INDEX                                                 ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Agent-Dropper-v2\adir\index.md                                     ║
║  Updated: 2026-03-16 | You are at the factory crossroads.           ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is Agent-Dropper v2 — the agent factory. Port 9210.    ║
║  It copies templates, configures them, and deploys them as running   ║
║  agents on their own ports.                                          ║
║                                                                      ║
║  Service: http://127.0.0.1:9210                                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Agent-Dropper v2 Index

You're inside the agent factory. This service takes templates and turns them into running agents. It's one of the four core services in FOB and runs on port 9210.

---

## What Do You Need?

### "How do I deploy an agent?"

→ [BOOT.md](./BOOT.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\BOOT.md`

### "What's the current state of this service?"

→ [current.md](./current.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\current.md`

### "How does Agent-Dropper work under the hood?"

→ [working.md](./working.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\working.md`

---

## What's In This Directory

| File/Directory | Purpose |
|----------------|---------|
| `server.js` | Express server — deployment API, status, voice, ngrok endpoints |
| `config.json` | Service config — port 9210, LLM, voice, ngrok, templates, agent identity |
| `index.html` | Web UI with tabs for building, deploying, and managing agents |
| `api/` | PHP API handlers (agent.php from template heritage) |
| `templates/` | Template references |
| `adir/` | You are here — documentation and logs |
| `adir/logs/` | Deployment logs, conversations, agent-dropper.log |

---

## Where You Can Walk

### The Templates (What Agent-Dropper Copies)

- **JERRY:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\`
  Standard agent template. Used for `"type": "jerry"` deployments.

- **TANDRSOCIAL:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\`
  Social media bot template. Used for `"type": "tandrsocial"` deployments.

### The Deployed Agents (What Agent-Dropper Created)

`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\`

Agent1 (11111), Agent2 (11112), Agent4 (11113), Bot1 (11114).

### KB-Maker (The Other Factory)

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\`

KB-Maker creates knowledge bots. Agent-Dropper deploys agents. They work together — KB-Maker can generate a bot that Agent-Dropper then deploys.

### Up to the Hub

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md`

---

## Quick API Reference

| Endpoint | Method | What It Does |
|----------|--------|-------------|
| [http://127.0.0.1:9210/](http://127.0.0.1:9210/) | GET | Web interface |
| [http://127.0.0.1:9210/api/deploy-agent](http://127.0.0.1:9210/api/deploy-agent) | POST | Deploy a new agent |
| [http://127.0.0.1:9210/api/status](http://127.0.0.1:9210/api/status) | GET | Service health and config |
| [http://127.0.0.1:9210/health](http://127.0.0.1:9210/health) | GET | Simple ping |

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're at the factory crossroads. Choose your path:                 ║
║                                                                      ║
║  → How to deploy agents:                                             ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Agent-Dropper-v2\adir\BOOT.md                                    ║
║                                                                      ║
║  → How the factory works:                                            ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Agent-Dropper-v2\adir\working.md                                 ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this index, create:                                       ║
║  SOT-[YYYYMMDD]-agent-dropper-index.md                               ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
