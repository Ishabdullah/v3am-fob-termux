**324 Ports and paths are changed ref data**

# KB-Maker v2 - Boot & Operating Guide

**Status:** ✅ Ready
**Version:** 2026-03-13
**Port:** 9220
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2`

---

## What Is KB-Maker v2?

**KB-Maker v2** is the **bot factory & builder interface** in FOB:
- Create and manage bot knowledge bases
- Configure bot behaviors
- Build prompts and responses
- Integrate with Ollama for generation
- Deploy bots via Agent-Dropper

---

## Quick Start

### Via MasterSTART.bat (Recommended)
```batch
C:\FOB\MasterSTART.bat
```

### Direct Start
```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2
npm install
npm start
```

### Check Status
```bash
curl http://localhost:9220/
```

---

## Interface

**Access:** http://localhost:9220/

Main functions:
- Knowledge base management
- Bot configuration
- Template builder
- Deployment integration

---

## Configuration

Located at: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2/config.json`

Key settings:
- Port: 9220
- Ollama integration
- Storage paths
- API endpoints

---

## Troubleshooting

**Port in use:**
```bash
netstat -ano | findstr :9220
taskkill /PID [PID] /f
```

**Dependencies missing:**
```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2
npm install
```

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\adir\NEW-313-BOOT.md`
**Created:** 2026-03-13
**Status:** ✅ Ready
**Last Updated:** 2026-03-13

**324 Ports and paths are changed ref data**
