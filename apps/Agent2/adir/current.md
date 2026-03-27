**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\adir\          ║
║  current.md                                                          ║
║  Updated: 2026-03-17 | Agent2 status snapshot.                       ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent2 is operational. Server files live in the agent/        ║
║  subdirectory by design — Agent-Dropper allows custom target dirs.   ║
║                                                                      ║
║  Service: http://127.0.0.1:11112                                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Service State: Operational

Agent2 is running on port 11112. Server files live in the `agent/` subdirectory — this is intentional. Agent-Dropper v2 allows custom target directories during deployment. The server.js, config.json, api/, and web files are all in `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\agent\`.

**Verify:** [http://127.0.0.1:11112/](http://127.0.0.1:11112/)

---

## Fleet Sync (2026-03-17)

Cross-agent communication verified. Agent2 successfully bridged to Agent1 (11111) and Agent4 (11113) via HTTP API. All three agents confirmed operational with Jerry v2.1 architecture: HTML rendering, SOT persistence, cross-agent HTTP support.

---

## What Needs Attention

**Exposed API keys.** Anthropic and Gemini keys are in plaintext in `agent/config.json`. Should be rotated or replaced with placeholders before any replication.

**Legacy files in agent/ subdir.** The `agent/` directory contains old CLAUDE_NOTES.md, ai_task_list.md, ops-dashboard, diagnostics.html, test pages — artifacts from the Jerry template that were never cleaned up.

---

## Recent Changes

**2026-03-17:** Cross-agent fleet sync completed. All three Jerry agents confirmed operational. SOT-20260316-FLEET-STATE.md created.

**2026-03-17:** System prompt upgraded to V2 — HTML rendering, terminal aesthetic, rendering stack, stretch-first workflow, lessons learned.

**2026-03-16:** ADIR md files created in standard console format.

**2026-03-15:** Agent originally deployed via Agent-Dropper v2.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  Agent2 is operational. Your next move:                              ║
║                                                                      ║
║  → See how Agent2 works:                                             ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\adir\        ║
║    working.md                                                        ║
║                                                                      ║
║  → Navigate the fleet:                                               ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\adir\        ║
║    index.md                                                          ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-agent2-status.md                                     ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
