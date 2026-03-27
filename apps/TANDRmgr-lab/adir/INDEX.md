324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 



```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - NAVIGATION INDEX                                     ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\        ║
║  adir\INDEX.md                                                       ║
║  Updated: 2026-03-16 | The crossroads — where to go from here.      ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: TANDRmgr-lab is the workbench. Not a factory — a lab.       ║
║  Two servers live here: TANDRmgr-lab (8086) and Memory Bot (8091).  ║
║                                                                      ║
║  Service: http://127.0.0.1:8086                                     ║
║  Memory Bot: http://127.0.0.1:8091                                  ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# TANDRmgr-lab — The Workbench Crossroads

You're standing in the manager lab. Unlike KB-Maker and Agent-Dropper which are factories that build and deploy things, TANDRmgr-lab is where you test LLM interactions, manage conversation context, and experiment with prompts and models. Memory Bot lives inside this directory at `bot/` and provides persistent memory across conversations.

This is also a critical dependency for the ADIR Hub — the Hub's file reading and status checking features route through TANDRmgr-lab's API at `api/adir-api.php`.

---

## What Lives Here

| Component | Port | What It Does |
|-----------|------|-------------|
| TANDRmgr-lab | 8086 | LLM relay, web UI, API testing |
| Memory Bot | 8091 | Persistent conversation memory |
| ADIR Hub API | — | File reading for Hub dashboard (via api/) |

---

## Talking to the Lab

**Chat with Ollama through TANDRmgr-lab:**
```
http://127.0.0.1:8086/api/generate
```
POST with `{"prompt":"your question","model":"qwen2.5:7b"}`.

**Check what the lab remembers:**
```
http://127.0.0.1:8086/api/memory
```

**Ask Memory Bot directly:**
```
http://127.0.0.1:8091/api/memory.php?action=query&q=What+recent+information+do+you+have%3F
```

**Check available models on Ollama:**
```
http://127.0.0.1:11434/api/tags
```

---

## Where to Walk From Here

**Understand how to operate it:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\BOOT.md`

**See what's happening right now:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\current.md`

**Understand the architecture:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\working.md`

**Visit the deployed agents (built by Agent-Dropper):**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\index.md`

**Visit the factories that build things:**
- Agent-Dropper: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\adir\index.md`
- KB-Maker: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\adir\index.md`

**Back to the hub:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF INDEX.md                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  You're at the workbench crossroads. Your next move:                 ║
║                                                                      ║
║  → Operate the lab:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\       ║
║    adir\BOOT.md                                                      ║
║                                                                      ║
║  → See the deployed agents:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    index.md                                                          ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this crossroads, create:                                  ║
║  SOT-[YYYYMMDD]-tandrmgr-navigation.md                              ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
