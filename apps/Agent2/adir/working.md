**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\adir\          ║
║  working.md                                                          ║
║  Updated: 2026-03-16 | The blueprint — how deployed agents work.     ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent2 shares the Jerry-template architecture with all       ║
║  deployed agents. See Agent1's working.md for the full blueprint.   ║
║                                                                      ║
║  Service: http://127.0.0.1:11112 (not working)                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How Agent2 Works (When Fixed)

Agent2 is a Jerry-template agent. All Jerry agents share the same architecture — Node.js Express server, PHP CGI API, Gemini LLM, voice engine, shell command execution. The full architectural blueprint lives in Agent1's working.md since the design is identical across all agents.

---

## What Makes Agent2 Different

Agent2's only distinction is its deployment failure. Early Agent-Dropper wrapped the deployment inside an `agent/` subdirectory instead of deploying files to root. The correct structure (which Agent4 has) puts server.js, config.json, api/, and data/ at the root level.

**Agent2 structure (broken):**
```
Agent2/
├── adir/              ← Documentation only
└── agent/             ← Everything else is buried here
    ├── server.js
    ├── config.json
    └── ...
```

**Correct structure (Agent4):**
```
Agent4/
├── server.js          ← At root
├── config.json        ← At root
├── api/               ← At root
├── data/              ← At root
└── adir/              ← Documentation
```

---

## API Patterns (When Working)

Same as all Jerry agents. Replace port with 11112:

**Chat:**
```
http://127.0.0.1:11112/api/agent.php?action=chat&input=Hello%20Agent2
```

**Status:**
```
http://127.0.0.1:11112/api/agent.php?action=status
```

**Shell command:**
```
http://127.0.0.1:11112/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB
```

---

## Full Architecture Reference

For the complete blueprint of how Jerry-template agents work — request flow, LLM configuration, voice engine, cross-agent communication, directory structure — read:

`C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\working.md`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  → Full agent architecture:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    working.md                                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-agent2-architecture.md                              ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
