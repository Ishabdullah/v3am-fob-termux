**324 Ports and paths are changed ref data**

# Agent-Dropper v2 - Architecture & Design

**Created:** 2026-03-13
**Status:** ✅ Production Ready
**Purpose:** Document how Agent-Dropper works

---

## What Is Agent-Dropper v2?

**Agent-Dropper v2** is the **deployment system** for agents/bots.

```
KB-Maker (9220) → Agent-Dropper (9210) → Deploy to port → Running Agent
```

---

## Architecture

### Service Stack

```
Deployment Interface (HTML/JS)
        ↓
Express Server (Node.js)
        ↓
├─ Agent Manager
├─ Port Allocator
├─ Lifecycle Manager
├─ Configuration Handler
└─ Deployment Engine
        ↓
├─ KB-Maker (9220) - Bot source
├─ Dynamic Ports - Agent endpoints
└─ ADIR Hub (9303) - Registration
```

---

## Core Functions

### 1. Agent Management
- Deploy agents
- Configure agents
- Monitor status
- Update agents
- Undeploy agents

### 2. Port Allocation
- Allocate available ports
- Avoid conflicts
- Track allocations
- Reserve ports

### 3. Lifecycle Management
- Start agent process
- Health checks
- Restart on failure
- Stop agent
- Cleanup

### 4. Configuration Handling
- Agent identity
- LLM model
- Knowledge base
- API settings

---

## Deployment Workflow

```
1. User selects bot in KB-Maker
2. User opens Agent-Dropper
3. Agent-Dropper fetches bot config
4. User configures deployment
5. Agent-Dropper allocates port
6. Agent-Dropper starts agent process
7. Agent registers with ADIR Hub
8. Agent appears in service list
9. User can interact with agent
```

---

## Design Philosophy

- **Simple deployment** - One-click deploy
- **Dynamic scaling** - Auto port allocation
- **Isolation** - Each agent separate process
- **Integration** - Registers with ADIR Hub

---

## Key Paths

| Purpose | Path |
|---------|------|
| Root | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2` |
| adir | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir` |
| Config | `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2/config.json` |

---

## Integration Points

### With KB-Maker (9220)
- Fetches bot configurations
- Loads bot code
- Gets knowledge bases

### With ADIR Hub (9303)
- Registers deployed agents
- Reports status
- Gets service list

### With Deployed Agents
- Manages lifecycle
- Sends configuration
- Monitors health

---

## Future Improvements

- Rollback capability
- Blue-green deployment
- Load balancing
- Advanced monitoring
- Auto-scaling

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\NEW-313-working.md`
**Created:** 2026-03-13
**Status:** ✅ Production ready
**Last Updated:** 2026-03-13

**324 Ports and paths are changed ref data**
