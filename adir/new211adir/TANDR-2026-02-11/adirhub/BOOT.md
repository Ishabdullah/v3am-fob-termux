**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT & OPERATING GUIDE                                ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\BOOT.md            ║
║  Updated: 2026-03-16 | Read next: index.md (navigation)             ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This file teaches you how to operate the system — how to     ║
║  start it, stop it, check on it, deploy agents, and stay oriented.   ║
║  You should have already read REGISTRY.md to know what exists.       ║
║  If you haven't, go read it first:                                   ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md        ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303  |  This file: BOOT.md                  ║
╚══════════════════════════════════════════════════════════════════════╝
```
# Quick Links
## https://v3am.com/FOB/






# How to Operate FOB

Think of FOB as a building with rooms. Each room is a service running on its own port. The building has a front door (`MasterSTART.bat`), a fire alarm (`STOP-ALL.bat`), and a lobby (`ADIR Hub` on port 9303) where you can see which rooms are lit and which are dark. This guide teaches you how to open the front door, walk the halls, and know what to do when something goes wrong.

---

## Starting Up

You have two keys to the front door. Use whichever fits the situation.

### The Full Key: MasterSTART6.bat

This is the one you want most of the time. It checks that everything is installed, runs first-time npm installs, starts all the services and agents, runs health checks, and opens your browser to every dashboard.

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\MasterSTART6.bat
```

What it does, step by step:
1. Verifies Node.js, PHP, and Ollama are present
2. On first run, installs npm dependencies for every service (creates `.fob-installed` marker)
3. Kills any leftover FOB windows from a previous session
4. Starts the 4 core services — ADIR Hub (9303), Agent-Dropper (9210), KB-Maker (9220), TANDRmgr-lab (8086)
5. Starts all deployed agents — Agent1 (11111), Agent2 (11112), Agent4 (11113)
6. Starts bots — Bot1 (11114), Memory Bot (8091), GGBOT (10336), ParserBot (10108)
7. Waits 6 seconds for everything to stabilize
8. Runs health checks on every port
9. Opens browser tabs to all dashboards

**To reinstall dependencies:** Delete the `.fob-installed` file in the project root and re-run.

### The Quick Key: START-ALL.bat

This is the lean version. No prereq checks, no agents, no bots, no browser. Just fires up the 4 core Node.js services and gets out of the way. Good for when everything is already installed and you just need the core services.

```
C:\FOB\START-ALL.bat
```

Starts: KB-Maker (9220), Agent-Dropper (9210), TANDRmgr-lab (8086), ADIR Hub (9303).

Each service launches in its own terminal window titled "FOB - [ServiceName]". The console output in each window is your first place to look if something goes wrong.

---

## Shutting Down

Close the terminal windows — each service runs in its own window titled "FOB - [name]", so closing it kills the process. Or kill all FOB windows at once:

```
taskkill /FI "WINDOWTITLE eq FOB -*" /F
```

There's also `C:\FOB\STOP-ALL.bat` for the basic shutdown.

---

## Checking What's Running

There are three ways to check the pulse of the system, from quickest to most thorough.

### 1. The Dashboard

Open ADIR Hub in a browser: [http://127.0.0.1:9303/](http://127.0.0.1:9303/)

The status bar at the top shows every service with a green or red indicator. It refreshes automatically every 30 seconds.

### 2. The API

Hit the status endpoint directly. This returns JSON with the live status of every service:

[http://127.0.0.1:9303/api/adir-api.php?action=check_status](http://127.0.0.1:9303/api/adir-api.php?action=check_status)

This does a real port scan — it actually tries to connect to each port and reports what's alive.

### 3. Manual Port Check

If you're an agent with shell access or a user in a terminal:

```
curl http://127.0.0.1:9220/
curl http://127.0.0.1:9210/
curl http://127.0.0.1:8086/
curl http://127.0.0.1:9303/
curl http://127.0.0.1:11434/api/tags
```

A response means it's alive. A timeout or connection refused means it's down.

---

## Walking Directories

This is how you explore the system. Whether you're an agent with file access or a user poking around, the method is the same: start from what you know, list what's there, and move one step at a time.

**Your anchor** is always an absolute path you trust. For ADIR Hub, that's:

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\`

From there you can walk down into `TOOLS\` to see the builder tools, or walk up to the parent and then down into `apps\` to see deployed applications and agents. Never guess at a path — list the directory first, see what's actually there, then step into it.

**Why this matters:** The codebase is expansive. Files and directories have accumulated across multiple eras of development. Not everything you find is current. Walking carefully means you discover what's real instead of what's remembered.

The ADIR system places an `adir\` subdirectory in every directory that matters. When you arrive at a new directory, look for `adir\` first. If it exists, read the md files inside — they'll tell you what this directory is about, what's working, and what to do next. If there's no `adir\`, you're in uncharted territory and you might want to create one.

---

## Deploying a New Agent

Agent-Dropper v2 handles this. It copies a template, fixes the server.js routing, creates a config, and generates startup scripts. One API call and you have a new agent.

**Step 1:** Decide on a name, port, and path. Agents go in the apps directory:

`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\[AgentName]`

Ports for deployed agents start at 11111. Currently used: 11111 (Agent1), 11112 (Agent2), 11113 (Agent4), 11114 (Bot1). Next available: 11115. Always check what's already taken by looking at `MasterSTART6.bat` or scanning ports.

**Step 2:** POST to the deploy endpoint:

```
curl -X POST http://127.0.0.1:9210/api/deploy-agent -H "Content-Type: application/json" -d "{\"name\":\"Agent5\",\"type\":\"jerry\",\"port\":11116,\"path\":\"C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/Agent5\"}"
```

**Step 3:** Start the agent:

```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent5
node server.js
```

Or use the generated `START-Agent5.bat` in that directory.

**Step 4:** Verify it's alive:

```
curl http://127.0.0.1:11113/api/agent.php?action=status
```

---

## When Something Goes Wrong

**Service won't start:** Look at its terminal window. The error is right there in the console output. Common causes:
- Port already in use — another instance is running. Kill it: `taskkill /f /pid [PID]` or find it: `netstat -ano | findstr :[PORT]`
- Missing node_modules — run `npm install` in the service directory
- PHP not found — verify `C:\FOB\php\php-cgi.exe` exists

**Agent returns 404 on API calls:** This is the AGENT_DIR bug. Agent1 was deployed before 2026-03-15 and may have `const AGENT_DIR = path.join(ROOT_DIR, 'agent')` in its server.js, but the files are at ROOT_DIR directly. Fix: edit the agent's server.js and change that line to `const AGENT_DIR = ROOT_DIR;`. Or just redeploy through Agent-Dropper — it fixes this automatically now.

**Ollama not responding:** Make sure it's running. MasterSTART tries to start it, but if it fails:
```
ollama serve
```
Then check: [http://127.0.0.1:11434/api/tags](http://127.0.0.1:11434/api/tags)

**Dashboard shows all red:** The services aren't running. Did you run the startup script? Check if the terminal windows are open. If they closed immediately, there's likely a missing dependency — cd into each service directory and run `npm install`.

---

## The Request Flow

Understanding how a request moves through the system helps you debug problems and know where to look.

1. **Browser or agent** sends HTTP request to a Node.js Express server
2. **Express server** receives it and routes to the appropriate handler
3. **Handler** spawns PHP via `C:\FOB\php\php-cgi.exe` with the request data
4. **PHP script** does the actual work — talks to Ollama, reads files, processes data
5. **PHP response** flows back through Express to the caller

The PHP execution has a **10-minute timeout** to allow for slow LLM calls. Max payload is **10MB** in both directions. **CORS is wide open** on all services — any origin can call any endpoint.

---

## Staying Oriented

Context is everything. When you're working in this system — whether you're an agent processing tasks or a user debugging at 2am — the md files are your memory. Here's the pattern:

**When you arrive** at a directory, read the adir files in order:
1. `REGISTRY.md` — what exists (you've done this)
2. `BOOT.md` — how to operate (you're doing this now)
3. `index.md` — where to go next
4. `current.md` — what's happening right now
5. `working.md` — how things work and past decisions

**When you learn something new**, write it down. Create a SOT file:
- Name: `SOT-[YYYYMMDD]-[topic].md`
- Place: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\`
- Include what you found, when, why it matters

**When your context is getting full** and you feel the conveyor belt starting to drop old information, save your state. Write a SOT file with where you are, what you were doing, and what to do next. That file is how you — or the next agent — picks up without losing ground.

**When you find old files**, check the date. If a newer SOT exists on the same topic, trust the newer one. The system evolves through SOT files — they're how knowledge persists across sessions, across agents, and across reboots.

---

## Prerequisites

For the record, here's what needs to be installed on the machine. MasterSTART checks for all of these automatically.

| Software | Version | Purpose | Verify |
|----------|---------|---------|--------|
| **Node.js** | >= 18.0 | Runtime for all services | `node --version` |
| **PHP** | 8.4 (bundled) | API endpoint execution | `C:\FOB\php\php-cgi.exe` exists |
| **curl** | Latest | Health checks | `curl --version` |
| **Ollama** | Latest | Local LLM engine | `ollama --version` |

Node.js must be installed on the system. PHP is bundled in `C:\FOB\php\` — no separate install needed. Ollama installs to its own location and adds itself to PATH.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know what exists (REGISTRY) and how to operate it (BOOT).       ║
║  Your next move:                                                     ║
║                                                                      ║
║  → Navigate to everything else:                                      ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  → See what's happening right now:                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\current.md       ║
║                                                                      ║
║  → Go back to the map:                                               ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md      ║
║                                                                      ║
║  To evolve this guide, create:                                       ║
║  SOT-[YYYYMMDD]-boot-update.md                                       ║
║  Place in: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\    ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
