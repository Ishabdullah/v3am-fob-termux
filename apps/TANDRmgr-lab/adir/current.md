324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 


```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\        ║
║  adir\current.md                                                     ║
║  Updated: 2026-03-16 | Manager lab status snapshot.                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: TANDRmgr-lab is a core service. Port 8086.                   ║
║  Memory Bot is a support service. Port 8091.                         ║
║                                                                      ║
║  Service: http://127.0.0.1:8086                                     ║
║  Memory Bot: http://127.0.0.1:8091                                  ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Service State: Running

TANDRmgr-lab is live on port 8086. Memory Bot is live on port 8091. Both start with MasterSTART6.

**Verify:**
- TANDRmgr-lab: [http://127.0.0.1:8086/](http://127.0.0.1:8086/)
- Memory Bot: [http://127.0.0.1:8091/](http://127.0.0.1:8091/)

---

## What Needs Attention

**Data sanitization pending.** Conversation logs and memory files contain company/customer data. Must be sanitized before any open-source sharing. See `SANITIZATION-GUIDE.md`.

**Conversation log is large.** `adir/logs/conversations.txt` is ~1.1 MB of conversation history. May need trimming.

**Legacy subdirectories exist.** The root directory contains old subdirectories from previous eras: `3AI/`, `TANDRAgent/`, `TANDRSocial/`, `TANDRbot/`. These are artifacts from when the apps directory housed multiple services. They should be reviewed for cleanup.

**Old adir files.** Multiple generations of documentation exist: original `BOOT.md`, `INDEX.md`, `CURRENT-STATUS.md` from Era 1, then `NEW-313-*` files from 2026-03-13, plus SOT files. Now superseded by the standard ADIR console format.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console format.

**2026-03-13:** NEW-313 documentation files created with current FOB architecture.

**2026-03-06:** SOT-306 investigation and memory bot plan files written.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know the manager lab's current state. Your next move:           ║
║                                                                      ║
║  → How it works:                                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\       ║
║    adir\working.md                                                   ║
║                                                                      ║
║  → Data sanitization guide:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\       ║
║    adir\SANITIZATION-GUIDE.md                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-tandrmgr-status.md                                  ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```


324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 

