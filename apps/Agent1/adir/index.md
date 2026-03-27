**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - NAVIGATION INDEX                                     ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\         ║
║  index.md                                                            ║
║  Updated: 2026-03-16 | The crossroads — where to go from Agent1.    ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: You are inside a deployed Jerry-template agent.             ║
║  Port 11111. Pre-fix deployment. Needs AGENT_DIR correction.        ║
║                                                                      ║
║  Service: http://127.0.0.1:11111                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Agent1 — Deployed Agent Crossroads

You're inside Agent1, a Jerry-template agent deployed by Agent-Dropper v2 on port 11111. All deployed agents share the same architecture — Node.js Express server with PHP CGI API endpoints, Gemini LLM, voice engine, shell command execution, and a chat UI.

There are four deployed agents/bots in the apps directory. They were created by the two factories in TOOLS:

| Agent | Port | Template | Status | Notes |
|-------|------|----------|--------|-------|
| Agent1 | 11111 | Jerry | Pre-fix | AGENT_DIR may need correction |
| Agent2 | 11112 | Jerry | Running | Server files in agent/ subdir (by design) |
| Agent4 | 11113 | Jerry | Working | Post-fix reference deployment |
| Bot1 | 11114 | TANDRSocial | Deployed | KB bot |

---

## Talking to Other Agents

Agents can call each other via API. One agent can run commands in another agent's shell — as long as the target agent isn't on auto mode, it only responds when called:

**Chat with Agent4 from here:**
```
http://127.0.0.1:11113/api/agent.php?action=chat&input=Agent1%20here%2C%20what%27s%20your%20status%3F
```

**Run a command on Agent4's shell:**
```
http://127.0.0.1:11113/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB%5Cadir
```

**Check Agent4's status:**
```
http://127.0.0.1:11113/api/agent.php?action=status
```

Agents should call each other periodically to keep the system updated. Use the API chat with fully escaped URLs — agents always have a hard time finding these paths, so keep full examples visible.

---

## Where to Walk From Here

**Operate this agent:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\BOOT.md`

**See what's happening now:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\current.md`

**Understand how agents work:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\working.md`

**Visit the other deployed agents:**
- Agent4 (working): `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\index.md`
- Agent2: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\adir\index.md`
- Bot1: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Bot1\adir\index.md`

**Visit the factory that built this:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\index.md`

**Back to the hub:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're at the Agent1 crossroads. Your next move:                    ║
║                                                                      ║
║  → Fix and run this agent:                                           ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    BOOT.md                                                           ║
║                                                                      ║
║  → See the working agent (Agent4):                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    index.md                                                          ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this crossroads, create:                                  ║
║  SOT-[YYYYMMDD]-agent1-navigation.md                                ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
