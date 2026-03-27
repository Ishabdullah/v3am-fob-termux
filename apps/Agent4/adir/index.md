**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - NAVIGATION INDEX                                     ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\         ║
║  index.md                                                            ║
║  Updated: 2026-03-16 | The crossroads — where to go from Agent4.    ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent4 is the WORKING reference agent. Port 11113.           ║
║  Post-fix deployment. Use this as the model for healthy agents.     ║
║                                                                      ║
║  Service: http://127.0.0.1:11113                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Agent4 — Working Reference Agent Crossroads

You're inside Agent4, the only Jerry-template agent with a confirmed working AGENT_DIR. This is the reference deployment — when you need to know what a healthy agent looks like, compare against Agent4.

**The deployed agents fleet:**

| Agent | Port | Template | Status | Notes |
|-------|------|----------|--------|-------|
| Agent1 | 11111 | Jerry | Pre-fix | AGENT_DIR may need correction |
| Agent2 | 11112 | Jerry | Running | Server in agent/ subdir (by design) |
| **Agent4** | **11113** | **Jerry** | **Working** | **Reference deployment** |
| Bot1 | 11114 | TANDRSocial | Deployed | KB bot, different template |

---

## Talking to the Fleet

From Agent4, you can call any other agent that's running. These are paste-in-browser ready:

**Talk to Agent1 (if running):**
```
http://127.0.0.1:11111/api/agent.php?action=chat&input=Agent4%20here%20%E2%80%94%20checking%20your%20status
```

**Talk to Agent2 (if running):**
```
http://127.0.0.1:11112/api/agent.php?action=chat&input=Agent4%20here%20%E2%80%94%20checking%20your%20status
```

**Talk to Bot1 (if running):**
```
http://127.0.0.1:11114/api/bot.php?action=chat&input=Agent4%20requesting%20knowledge%20base%20summary
```

**Check TANDRmgr-lab memory:**
```
http://127.0.0.1:8086/api/memory
```

**Ask Ollama a question through TANDRmgr-lab:**
```
http://127.0.0.1:8086/api/generate
```

---

## Where to Walk From Here

**Operate this agent:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\BOOT.md`

**See what's happening:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\current.md`

**Understand how all agents work:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\working.md`

**API patterns reference (from Agent4's own exploration):**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\working.md`

**Visit the other agents:**
- Agent1: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\index.md`
- Agent2: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\adir\index.md`
- Bot1: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Bot1\adir\index.md`

**Visit the factory that built this:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\index.md`

**Visit the workbench:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\INDEX.md`

**Back to the hub:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're at the working agent's crossroads. Your next move:           ║
║                                                                      ║
║  → Talk to the fleet:                                                ║
║    Use the API URLs above to communicate with other agents           ║
║                                                                      ║
║  → See the agent architecture:                                       ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    working.md                                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this crossroads, create:                                  ║
║  SOT-[YYYYMMDD]-agent4-navigation.md                                ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
