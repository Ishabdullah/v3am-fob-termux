**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\          ║
║  current.md                                                          ║
║  Updated: 2026-03-16 | Agent1 status snapshot.                       ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent1 is a pre-fix Jerry deployment. Port 11111.            ║
║                                                                      ║
║  Service: http://127.0.0.1:11111                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Service State: Needs AGENT_DIR Fix

Agent1 was deployed on 2026-03-16 before the AGENT_DIR bug was fixed in Agent-Dropper v2. The web UI may load but API calls likely fail because `server.js` points to the template directory instead of the deployment directory.

**Fix options:**
1. Edit `server.js` — change `AGENT_DIR` to `C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/Agent1`
2. Redeploy from Agent-Dropper v2 (which now auto-fixes this)

---

## What Needs Attention

**AGENT_DIR fix required.** The primary blocker. Without this, PHP API calls fail with path errors.

**Exposed API keys in config.json.** Anthropic key (`YOUR_ANTHROPIC_API_KEY...`), Gemini key (`YOUR_GEMINI_API_KEY...`), and Google Search key (`YOUR_GEMINI_API_KEY...`) are in plaintext. These are shared across all deployed agents.

**Stale adir files.** Multiple generations of documentation exist: original `CURRENT-STATUS.md`, `NEW-313-*` files, `SYSTEM_PROMPT.md`, `TOOL-VERIFICATION.md`, `UI-ARCHITECTURE-PLAN.md`, `map.md`. Now superseded by standard ADIR console format.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console format. Agent deployed by Agent-Dropper v2.

**2026-03-13:** NEW-313 documentation files created.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know Agent1's state. Your next move:                            ║
║                                                                      ║
║  → Fix and operate it:                                               ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    BOOT.md                                                           ║
║                                                                      ║
║  → Understand how agents work:                                       ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    working.md                                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-agent1-status.md                                    ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
