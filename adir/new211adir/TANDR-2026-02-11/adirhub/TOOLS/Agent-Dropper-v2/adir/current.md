**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Agent-Dropper-v2\adir\current.md                                   ║
║  Updated: 2026-03-16 | Factory status snapshot.                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent-Dropper v2 is a core service running on port 9210.     ║
║  This file tells you what's running and what needs attention.        ║
║                                                                      ║
║  Service: http://127.0.0.1:9210                                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Service State: Running

Agent-Dropper v2 is live on port 9210. It started with MasterSTART6 and is operational.

**Verify:** [http://127.0.0.1:9210/api/status](http://127.0.0.1:9210/api/status)

---

## Deployment History

Four agents/bots have been deployed through this system:

| Name | Port | Status | Deployed |
|------|------|--------|----------|
| Agent1 | 11111 | Pre-fix deployment | Pre-fix |
| Agent2 | 11112 | Running (agent/ subdir by design) | Pre-fix |
| Agent4 | 11113 | Working | Post-fix (2026-03-15+) |
| Bot1 | 11114 | Deployed | — |

**Next available port:** 11115

---

## What Needs Attention

**Config.json has exposed API keys.** Anthropic and Gemini keys are visible in the config. Should be rotated or replaced with placeholders.

**Template references in config are partially stale.** The `templates` section lists jerry, randy, tommy, and custom — but only jerry is actually wired in the deploy code. Randy and tommy template names are config artifacts from Era 1.

**System prompt references old services.** The agent identity prompt mentions Jerry, Randy, Tommy agents and old paths. Functional but outdated — the console protocol and deployment logic work fine regardless.

**The deploy endpoint only copies JERRY template.** Despite the `type` field accepting different values, `server.js` line 195 hardcodes the path to `TEMPLATE-JERRY-CLEAN`. Deploying with `"type": "tandrsocial"` still copies the JERRY template. This could be extended to select the right template based on type.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console format.

**2026-03-15:** The AGENT_DIR routing fix was added to the deploy logic. Lines 232-248 of server.js now automatically replace `path.join(ROOT_DIR, 'agent')` with `ROOT_DIR` in every deployed agent's server.js. Agent4 was the first successful deployment after this fix.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know the factory's current state. Your next move:               ║
║                                                                      ║
║  → How Agent-Dropper works under the hood:                           ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Agent-Dropper-v2\adir\working.md                                 ║
║                                                                      ║
║  → Back to this service's index:                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Agent-Dropper-v2\adir\index.md                                   ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-agent-dropper-status.md                              ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
