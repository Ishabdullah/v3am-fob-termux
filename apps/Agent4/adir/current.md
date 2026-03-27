**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\          ║
║  current.md                                                          ║
║  Updated: 2026-03-16 | Agent4 status snapshot.                       ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent4 is the WORKING reference agent. Port 11113.           ║
║                                                                      ║
║  Service: http://127.0.0.1:11113                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Service State: Working

Agent4 is the only Jerry-template agent with confirmed working AGENT_DIR. Deployed on 2026-03-15 after the Agent-Dropper v2 fix. Chat, status, shell commands, and tools all functional.

**Verify:**
```
http://127.0.0.1:11113/api/agent.php?action=status
```

---

## What Needs Attention

**Exposed API keys in config.json.** Anthropic key (`YOUR_ANTHROPIC_API_KEY...`), Gemini key (`YOUR_GEMINI_API_KEY...`), and Google Search key (`YOUR_GEMINI_API_KEY...`) in plaintext.

**Extensive SOT file collection.** Agent4's adir has many SOT files from exploration sessions. These are valuable documentation but add clutter. The user handles all deletions.

**Stale adir files.** Original `CURRENT-STATUS.md` (references port 9200), `NEW-313-*` files, `SYSTEM_PROMPT.md`, `TOOL-VERIFICATION.md`, `UI-ARCHITECTURE-PLAN.md`, `map.md`. Now superseded by standard ADIR format.

**Has a stretch/ directory.** Active experimentation sandbox.

**Has working.md with API patterns.** Agent4's own working.md contains a comprehensive API reference generated during exploration. This is preserved as a valuable SOT-equivalent.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console format. SOT files created for comm-check, memory-sync, port-truth.

**2026-03-15:** Agent deployed with correct AGENT_DIR. Confirmed working. Created extensive SOT documentation.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  Agent4 is healthy. Your next move:                                  ║
║                                                                      ║
║  → Operate it:                                                       ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    BOOT.md                                                           ║
║                                                                      ║
║  → Check the API patterns reference:                                 ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    working.md                                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-agent4-status.md                                    ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
