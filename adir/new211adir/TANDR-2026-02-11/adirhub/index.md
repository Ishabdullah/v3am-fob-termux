**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - INDEX                                                 ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md           ║
║  Updated: 2026-03-16 | You are at the crossroads.                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the index — the crossroads of the ADIR system.      ║
║  Every path through the system passes through here. If your context  ║
║  is getting full and you're losing track of where things are, come   ║
║  back to this file. It will always point you in the right direction. ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303  |  This file: index.md                 ║
╚══════════════════════════════════════════════════════════════════════╝
```

# ADIR Hub Index

You're standing at the center of the system. Every directory, every service, every file you need can be reached from here. Think of this as the lobby — you walk in, you look at the signs, and you choose a hallway. Don't try to read everything at once. Pick the path that matches what you need right now and follow it.

---

## What Do You Need?

### "I just woke up. What is this place?"

Start with the map. REGISTRY tells you every service, every port, every path — the complete inventory of what exists and where it lives.

→ [REGISTRY.md](./REGISTRY.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md`

### "I know what's here. How do I operate it?"

BOOT teaches you how to start the system, stop it, deploy agents, troubleshoot problems, and stay oriented while you work.

→ [BOOT.md](./BOOT.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\BOOT.md`

### "What's happening right now?"

Current is the live snapshot — what's running, what just changed, what needs attention. This file changes frequently and reflects the state of the system today, not last week.

→ [current.md](./current.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\current.md`

### "How does this system actually work under the hood?"

Working explains the architecture, the design decisions, the patterns that hold everything together. Read this when you need to understand why things are built the way they are before you modify them.

→ [working.md](./working.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\working.md`

---

## Places You Can Walk

The ADIR system is a freeway through the directories. From here at the hub, you can walk in several directions. Each destination has its own `adir\` folder with md files that orient you when you arrive.

### The Hub (You Are Here)

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\`

This is ADIR Hub — the central dashboard, the file viewer, and the API that connects everything. The web interface runs on port 9303. The md files in this directory are the top-level navigation for the entire system.

### The TOOLS Directory

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\`

Walk down into TOOLS and you'll find the builder services — the factories that create and deploy agents and bots. Each tool has its own adir with documentation:

- **Agent-Dropper v2** — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\`
  Deploys new agents. Port 9210. Has the AGENT_DIR routing fix.

- **KB-Maker v2** — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\`
  Bot factory and knowledge builder. Port 9220.

- **GGBOT** — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\GGBOT\`
  Specialized bot. Port 10336.

- **Parser / ParserBot** — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot\`
  Parser tool bot. Port 10108.

- **Templates** — `TEMPLATE-JERRY-CLEAN\` and `TEMPLATE-TANDRSOCIAL-CLEAN\` are the base templates that Agent-Dropper copies when deploying new agents.

### The Apps Directory

`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\`

Walk up one level from adirhub, then down into apps. This is where the applications and deployed agents live:

- **TANDRmgr-lab** — `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\`
  The manager lab. Port 8086. Has a chat interface and orchestration tools. Memory Bot lives inside at `bot\` on port 8091.

- **Agent1, Agent2, Agent4** — Deployed agents on ports 11111, 11112, 11113. Agent4 is the working reference deployment.

- **Bot1** — Port 11114. Deployed bot.

### The SOT Archive

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\`

Walk into the `adir\` subdirectory of the hub and you'll find the SOT files — Source of Truth snapshots created by agents and users over time. These are the system's evolving memory. When you create a new SOT file, this is where it goes. When you're looking for the latest information on a specific topic, walk this directory and look for the newest dated file.

**Note:** Many of the SOT files in this directory are from earlier eras (Feb 2026) and reference services and paths that no longer exist. Always check the date. The newest file on a given topic is the one to trust.

---

## The Dashboard

If you have a browser or can make HTTP requests, the ADIR Hub dashboard gives you a visual overview of everything:

[http://127.0.0.1:9303/](http://127.0.0.1:9303/)

The dashboard shows:
- **Status bar** — green/red indicators for every service
- **Sidebar** — navigable tree of all projects, tools, and their adir files
- **File viewer** — read and edit any md file directly in the browser
- **Project cards** — quick overview of each tool and app with BOOT and STATUS buttons

---

## Live Service Links

Quick access to every running service. These are paste-ready — open them in a browser or curl them from a terminal.

| Service | URL |
|---------|-----|
| ADIR Hub | [http://127.0.0.1:9303/](http://127.0.0.1:9303/) |
| Agent-Dropper v2 | [http://127.0.0.1:9210/](http://127.0.0.1:9210/) |
| KB-Maker v2 | [http://127.0.0.1:9220/](http://127.0.0.1:9220/) |
| TANDRmgr-lab | [http://127.0.0.1:8086/](http://127.0.0.1:8086/) |
| Ollama Models | [http://127.0.0.1:11434/api/tags](http://127.0.0.1:11434/api/tags) |
| System Status (JSON) | [http://127.0.0.1:9303/api/adir-api.php?action=check_status](http://127.0.0.1:9303/api/adir-api.php?action=check_status) |

---

## Old Files in This Directory

You'll notice many more md files in this directory beyond the core four (REGISTRY, BOOT, index, current, working). Most of these are from earlier eras of the system — session summaries, audit logs, WordPress guides, deployment notes, and old SOT files. They're historical records. Some contain useful context about why decisions were made. None of them describe the system as it exists today.

The user manages deletions of old files. If you're an agent, don't delete them — just ignore the ones that don't match the current REGISTRY. If you need to know whether a file is current, check its date and compare it against the REGISTRY and this index. If it's not linked from here, it's probably from an older era.

---

## The ADIR Reading Order

If you're ever lost, reset to this sequence. It's the same every time, in every directory that has an `adir\` folder:

1. **REGISTRY.md** — What exists (the map)
2. **BOOT.md** — How to operate (the manual)
3. **index.md** — Where to go (you are here)
4. **current.md** — What's happening now (the pulse)
5. **working.md** — How it works (the blueprint)

This pattern repeats at every level of the system. When you walk into a new directory and find an `adir\` folder, look for these files. They'll orient you just like they did here.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're at the crossroads. Choose your path:                         ║
║                                                                      ║
║  → See what's happening right now:                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\current.md       ║
║                                                                      ║
║  → Understand how the system works:                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\working.md       ║
║                                                                      ║
║  → Walk down into TOOLS:                                             ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║                                                                      ║
║  → Walk over to apps:                                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\                    ║
║                                                                      ║
║  → Browse SOT files:                                                 ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\            ║
║                                                                      ║
║  To evolve this index, create:                                       ║
║  SOT-[YYYYMMDD]-index-update.md                                      ║
║  Place in: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\    ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
