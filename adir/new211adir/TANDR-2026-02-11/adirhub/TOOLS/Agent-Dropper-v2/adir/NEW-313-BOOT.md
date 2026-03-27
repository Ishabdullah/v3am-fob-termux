**324 Ports and paths are changed ref data**

# Agent-Dropper v2 - Boot & Operating Guide

**Status:** ✅ Ready
**Version:** 2026-03-13
**Port:** 9210
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2`

---

## What Is Agent-Dropper v2?

**Agent-Dropper v2** is the **agent deployment system**:
- Deploy bots/agents to ports
- Configure deployed agents
- Manage lifecycle
- Monitor agents
- Integrate with KB-Maker

---

## Quick Start

### Via MasterSTART.bat
```batch
C:\FOB\MasterSTART.bat
```

### Direct Start
```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2
npm install
npm start
```

### Check Status
```bash
curl http://localhost:9210/
```

---

## Interface

**Access:** http://localhost:9210/

Main functions:
- Deploy agents
- Configure agents
- Monitor deployments
- Manage agent lifecycle

---

## Deployment Workflow

1. Create bot in KB-Maker (9220)
2. Open Agent-Dropper (9210)
3. Select bot to deploy
4. Configure deployment settings
5. Click Deploy
6. Agent runs on assigned port

---

## Troubleshooting

**Port in use:**
```bash
netstat -ano | findstr :9210
taskkill /PID [PID] /f
```

**Dependencies:**
```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2
npm install
```

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\NEW-313-BOOT.md`
**Created:** 2026-03-13
**Status:** ✅ Ready
**Last Updated:** 2026-03-13

**324 Ports and paths are changed ref data**
