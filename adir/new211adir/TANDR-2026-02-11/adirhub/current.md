**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\current.md         ║
║  Updated: 2026-03-16 | You are reading the pulse.                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the live snapshot — the heartbeat of the system.     ║
║  Unlike the other files, this one changes frequently. It tells you   ║
║  what's running, what just happened, and what needs attention RIGHT  ║
║  NOW. If something here contradicts an older file, trust this one.   ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303  |  This file: current.md               ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

This file is a living document. It gets rewritten when the system state changes meaningfully — after a reboot, after a deploy, after something breaks and gets fixed. If you're an agent reading this for the first time, this is your situational awareness. Everything below describes the world as it exists right now, not last week.

---

## System State: Post-Reboot, Stable

The system was rebooted on 2026-03-16 after a freeze. Before the reboot, backup zips were moved to the F: drive to free up space on C:. The system came back clean. MasterSTART6 was run and services are live.

**Startup script used:**
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\MasterSTART6.bat
```

---

## What's Running

The core five are up. These are the services that MasterSTART6 launches first, and they should always be alive when the system is operational.

| Service | Port | Status |
|---------|------|--------|
| ADIR Hub | 9303 | Running |
| Agent-Dropper v2 | 9210 | Running |
| KB-Maker v2 | 9220 | Running |
| TANDRmgr-lab | 8086 | Running |
| Ollama | 11434 | Running |

To verify any of these yourself, curl the port or open it in a browser. A response means it's alive. A timeout means it's down. Don't trust this table blindly — it was written by a human at a point in time. The machine knows the truth:

[http://127.0.0.1:9303/api/adir-api.php?action=check_status](http://127.0.0.1:9303/api/adir-api.php?action=check_status)

That endpoint does a real port scan and returns JSON. It's the closest thing to a heartbeat monitor this system has.

---

## Deployed Agents and Bots

MasterSTART6 also launches the agents and bots that live in the apps directory. Here's their current state:

| Name | Port | Status | Notes |
|------|------|--------|-------|
| Agent1 | 11111 | Pre-fix | AGENT_DIR may need correction |
| Agent2 | 11112 | Running | Server in `Agent2\agent\` subdirectory (by design) |
| Agent4 | 11113 | Working | Post-fix reference deployment — confirmed functional |
| Bot1 | 11114 | Deployed | Running |
| Memory Bot | 8091 | Running | Lives inside TANDRmgr-lab at `apps\TANDRmgr-lab\bot` |
| GGBOT | 10336 | Running | Optional service |
| ParserBot | 10108 | Running | Optional service |

**The AGENT_DIR story:** Agent1 was deployed before Agent-Dropper v2 got the routing fix on 2026-03-15. Its `server.js` may have `const AGENT_DIR = path.join(ROOT_DIR, 'agent')`, which points to a subdirectory that doesn't exist. The fix is simple — change it to `const AGENT_DIR = ROOT_DIR;` — or just redeploy through Agent-Dropper, which now handles this automatically.

Agent4 was the first agent deployed after the fix. It works and is the reference deployment.

---

## What Just Happened

The ADIR md files are being rewritten from scratch. The old files contained references to three different eras of the system — services that no longer exist, paths that point nowhere, startup scripts that were replaced months ago. An agent reading the old files would get contradictory instructions and waste its context window trying to reconcile them.

The rewrite replaces all of that with a single, verified, current layer:

1. **REGISTRY.md** — Rewritten ✓ (the map of everything)
2. **BOOT.md** — Rewritten ✓ (how to operate)
3. **index.md** — Rewritten ✓ (navigation crossroads)
4. **current.md** — This file ✓ (you're reading it)
5. **working.md** — Next (architecture and design decisions)
6. **SOURCE-OF-TRUTH.md** — Pending (master inventory)

Old md files from earlier eras still exist in this directory. The user manages deletions. If you're an agent, don't delete them — just ignore anything that isn't linked from the core five files or dated after 2026-03-15.

---

## What Needs Attention

These are the open items. If you're looking for something to do, start here.

**Agent1 may need the AGENT_DIR fix.** Edit its `server.js` manually or redeploy through Agent-Dropper v2 at [http://127.0.0.1:9210/](http://127.0.0.1:9210/). The fix is documented in REGISTRY.md and BOOT.md.

**working.md and SOURCE-OF-TRUTH.md still need to be written.** These are the last two files in the rewrite sequence. working.md will explain the architecture — the Node.js→PHP pattern, the Agent-Dropper design, the ADIR system itself. SOURCE-OF-TRUTH.md will be the master inventory replacing the old version that referenced dead services.

**MasterSTOP.bat doesn't exist yet.** MasterSTART6.bat references it, but the file hasn't been created. Current shutdown method is closing terminal windows or running `taskkill /FI "WINDOWTITLE eq FOB -*" /F`.

---

## How to Update This File

This file should be updated whenever the system state changes meaningfully. If you're an agent and you just deployed something, fixed something, or discovered something important — update this file or create a SOT file.

**If you can write directly to this file:** Go ahead. Replace the sections that changed. Keep the console header/footer. Update the date in the header.

**If you'd rather create a SOT file:** Name it `SOT-[YYYYMMDD]-current-update.md` and place it in:

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\`

Include what changed, when you verified it, and who you are. The next agent who reads current.md and then walks into the SOT archive will find your update and know to trust the newer date.

---

## Quick Checks

Need to verify something fast? These are your go-to commands and URLs.

**All services alive?**
[http://127.0.0.1:9303/api/adir-api.php?action=check_status](http://127.0.0.1:9303/api/adir-api.php?action=check_status)

**What projects exist?**
[http://127.0.0.1:9303/api/adir-api.php?action=scan_projects](http://127.0.0.1:9303/api/adir-api.php?action=scan_projects)

**What models does Ollama have?**
[http://127.0.0.1:11434/api/tags](http://127.0.0.1:11434/api/tags)

**Is Agent-Dropper healthy?**
[http://127.0.0.1:9210/api/status](http://127.0.0.1:9210/api/status)

**Dashboard (visual overview):**
[http://127.0.0.1:9303/](http://127.0.0.1:9303/)

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know what's happening right now. Your next move:                ║
║                                                                      ║
║  → Understand how the system works under the hood:                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\working.md       ║
║                                                                      ║
║  → Go back to the crossroads:                                        ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  → Check the map again:                                              ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md      ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-current-update.md                                    ║
║  Place in: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\    ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
