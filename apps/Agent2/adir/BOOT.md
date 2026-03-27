**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\adir\BOOT.md  ║
║  Updated: 2026-03-16 | The manual — how to operate Agent2.          ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent2 is a broken Jerry-template deployment. Port 11112.   ║
║  Files deployed to agent/ subdirectory instead of root.             ║
║  Needs redeployment or manual restructure.                          ║
║                                                                      ║
║  Service: http://127.0.0.1:11112 (not working)                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Operate Agent2

Agent2 is a Jerry-template agent assigned port 11112, but it has a structural problem. Unlike the other agents where server.js, config.json, and api/ live at the root level, Agent2's deployment put everything inside an `agent/` subdirectory. The root of Agent2 has only two folders: `adir/` and `agent/`.

This means you can't just `node server.js` from the Agent2 root — there's no server.js there.

---

## The Problem

```
Agent2/                        ← Nearly empty
├── adir/                      ← Documentation (you are here)
└── agent/                     ← ALL server files are in here
    ├── server.js              ← Express server
    ├── config.json            ← Config (port 11112)
    ├── index.html             ← Chat UI
    ├── api/                   ← PHP API endpoints
    ├── data/                  ← Knowledge
    ├── node_modules/          ← Dependencies installed
    └── START-AGENTTWO.bat     ← Startup script
```

---

## Option 1: Run From agent/ Subdirectory

```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\agent
node server.js
```

This may work but the AGENT_DIR path in server.js likely points to the wrong location (pre-fix deployment).

---

## Option 2: Redeploy (Recommended)

Use Agent-Dropper v2 to redeploy Agent2. The current Agent-Dropper auto-fixes AGENT_DIR and deploys files to the correct root location:

```
http://127.0.0.1:9210/api/deploy.php?action=deploy&agent_name=Agent2&port=11112
```

**Warning:** This will overwrite the agent/ subdirectory contents. Back up any SOT files or custom configurations first.

---

## Verify (if running)

```
http://127.0.0.1:11112/
```

---

## Troubleshooting

**No server.js in root:** Files are in `agent/` subdirectory. Either run from there or redeploy.

**AGENT_DIR wrong:** Pre-fix deployment issue. Check server.js inside `agent/`.

**Port 11112 in use:** `netstat -ano | findstr :11112` then `taskkill /PID [PID] /f`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Agent2 needs redeployment. Your next move:                          ║
║                                                                      ║
║  → Redeploy via Agent-Dropper:                                       ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Agent-Dropper-v2\adir\BOOT.md                                     ║
║                                                                      ║
║  → See a working agent (Agent4):                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    BOOT.md                                                           ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this manual, create:                                      ║
║  SOT-[YYYYMMDD]-agent2-boot.md                                      ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
