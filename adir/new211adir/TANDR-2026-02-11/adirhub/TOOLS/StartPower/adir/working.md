**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  StartPower\adir\working.md                                          ║
║  Updated: 2026-03-16 | How the startup system works.                 ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This explains the startup architecture — how MasterSTART6    ║
║  orchestrates service launches, health checks, and shutdown.         ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How the Startup System Works

MasterSTART6.bat is a sequential batch script that launches FOB services in the right order, waits for them to bind to their ports, and then reports their health. It's not fancy — just reliable.

---

## The Launch Pattern

Each service is started with the Windows `start` command, which opens a new terminal window:

```batch
start "ServiceName" cmd /k "cd /d C:\FOB\...\ServiceDir && node server.js"
```

The `/k` flag keeps the terminal open so you can see logs. Each service gets its own window. To stop a service, close its window or hit `Ctrl+C` in it.

Services are started sequentially, not in parallel. This matters because some services depend on others (e.g., bots need Ollama running first).

---

## The Health Check

After launching all services, the script waits 8 seconds, then curls each service's port:

```batch
curl -s --connect-timeout 2 http://127.0.0.1:{port}/ >nul 2>&1
```

If curl gets a response, the service is [UP]. If it times out, it's [DOWN]. If it was intentionally skipped (like bots with `--no-bots`), it shows [SKIP].

The 8-second wait is a compromise — too short and services show false [DOWN], too long and startup feels slow. Some services (especially TANDRmgr-lab) may need more time on slow machines.

---

## Two Scripts, Two Purposes

**MasterSTART6.bat** is the full orchestration:
1. Prereq checks (Node, PHP, curl, Ollama)
2. Ollama startup if needed
3. Core services (4)
4. Optional bots (2, skippable with `--no-bots`)
5. Health check
6. Browser auto-open

**START-ALL.bat** is the simple launcher:
1. Starts KB-Maker, Agent-Dropper, TANDRmgr-lab, ADIR Hub
2. No prereq checks, no health check, no browser open
3. Faster, simpler, assumes everything is already set up

---

## The Three Eras of Startup

**Era 1 (Feb 2026):** `C:\STARTPOWER` with `START-MASTER.bat`, `CONFIG-SERVICES.txt`, `DIAGNOSE.bat`, `TEST-APIS.bat`. Managed 13+ services including TANDRbot, TANDRCRM, Jerry/Randy/Tommy, Atlas, WordPress. Complex, over-engineered for the number of services.

**Era 2 (Feb 24):** `STATMASTER` bats and deployment package scripts. Short-lived transition.

**Era 3 (Mar 2026, current):** `C:\FOB\MasterSTART6.bat`. Manages 5 core + 2 optional services. Simpler, focused, reliable. The StartPower directory name is a historical reference to Era 1.

---

## Shutdown

`STOP-ALL.bat` finds and kills Node.js processes associated with FOB services. Individual services can be stopped with their own STOP bat files or by closing their terminal windows.

There is no graceful shutdown signal — services are killed. This is fine because Express servers don't need cleanup, but it means in-flight PHP processes may be interrupted.

---

## How to Write Good ADIR MD Files

Every adir directory is a mini knowledge base for whoever (or whatever) reads it. The files need to be useful to both humans reading them in a text editor and AI agents reading them as context. Follow these rules and your files will work in both situations.

### The Five File Types

**working.md** — The blueprint. How this thing works — architecture, design decisions, request flow, data patterns. Written once, updated when the architecture changes. An agent reading working.md should be able to understand what the service does and why it is built that way without looking at any code.

**current.md** — The live status. What is running, what broke, what was just changed, what needs attention. Updated frequently. Dated entries preferred. An agent reading current.md should know what state the system is in right now.

**index.md** — The crossroads. Where to go next. Lists the important files in this directory, what each one covers, and links to related directories. Short. An agent reading index.md should know what files exist and which one to read for any given purpose.

**BOOT.md** — The operating guide. How to start, stop, deploy, troubleshoot. Step-by-step. Written for someone arriving with no context. Should be able to follow BOOT.md and get a working system without asking questions.

**SOT-[YYYYMMDD]-[topic].md** — Source of truth files. One file per insight, decision, or discovery. Dated so the newest one wins when topics overlap. Written when you learn something that future agents need to know. These are your external memory.

### The Header Block

Every md file in the ADIR system starts with a header box. This is not decoration — it is the first thing an agent reads and it tells them where they are, when the file was updated, and what they should do with it.

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - [FILE TYPE IN CAPS]                                   ║
║  [Full absolute path to this file]                                   ║
║  Updated: [YYYY-MM-DD] | [One line describing what this file does]   ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: [What an agent should do with this file. One or two          ║
║  sentences. Be direct. Start with what they'll learn or do.]         ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303  |  This file: [filename]               ║
╚══════════════════════════════════════════════════════════════════════╝
```

The AGENT line is critical. It tells the AI reading this file what they are supposed to do with it. "This explains X so you can do Y" is the right pattern.

### The Footer Block

Every md file ends with a footer that points to what to read next and where to write new knowledge.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF [filename]                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  → [What to read next and why]:                                      ║
║    [Full absolute path]                                              ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-[topic].md                                           ║
║  Place in: [full path to this adir directory]                        ║
╚══════════════════════════════════════════════════════════════════════╝
```

The footer makes every file part of a navigation chain. An agent can follow footers to walk through the whole system without guessing what to read next.

### SOT File Rules

SOT = Source of Truth. When you learn something that should survive a context reset, write a SOT file.

Naming: `SOT-[YYYYMMDD]-[kebab-case-topic].md`
Examples: `SOT-20260321-gemini-fix.md`, `SOT-20260315-provider-routing.md`

Content structure:
```
# SOT-[YYYYMMDD] — [Topic Title]
Date: [YYYY-MM-DD]
Status: [COMPLETE / IN PROGRESS / SUPERSEDED by SOT-YYYYMMDD-newtopic.md]

---

## What Was Learned / What Happened

[The fact, fix, or discovery in plain language]

## What Changed

[Files modified, decisions made, configuration updated]

## Why It Matters

[What breaks or goes wrong without knowing this]
```

**The date is the weight.** When two SOT files cover the same topic, the newer date wins. Always check the date before acting on a SOT. If you write a SOT that supersedes an older one, mark the old one with `Status: SUPERSEDED by SOT-[date]-[topic].md`.

### Writing Style Rules

**Write for the agent that arrives with no memory.** Every file should stand alone. Do not assume the reader has read any other file first. Reference other files by full absolute path so they can be found.

**Dates over vague time references.** "Updated March 2026" is better than "recently updated." "2026-03-21" is better than "March 2026." Agents lose track of relative time. Absolute dates do not lie.

**Facts over opinions.** "Ollama requires 10.9GB RAM to load qwen3.5:4b" is useful. "Ollama might be slow" is not. Be specific.

**Status clearly stated.** Start current.md and SOT files with an explicit status line: OPERATIONAL, BROKEN, IN PROGRESS, SUPERSEDED. Do not make the reader infer the current state.

**Short sections with clear headers.** Agents scan for sections. Long paragraphs get skipped. Use ## and ### headers so any section can be jumped to directly.

**Paths always absolute.** Never write `./adir/logs`. Always write `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\StartPower\adir\logs`. A relative path breaks the moment you read the file from a different working directory.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  → Service registry:                                                 ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md      ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-startup-architecture.md                              ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
