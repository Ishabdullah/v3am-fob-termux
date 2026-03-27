324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 


```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\        ║
║  adir\working.md                                                     ║
║  Updated: 2026-03-16 | The blueprint — how TANDRmgr-lab works.       ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This explains TANDRmgr-lab's architecture — LLM relay,      ║
║  memory system, API testing, and integration with Memory Bot.        ║
║                                                                      ║
║  Service: http://127.0.0.1:8086                                     ║
║  Memory Bot: http://127.0.0.1:8091                                  ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How TANDRmgr-lab Works

TANDRmgr-lab is different from the other FOB services. While KB-Maker and Agent-Dropper are factories that deploy things, TANDRmgr-lab is a workbench — a place to test LLM interactions, manage conversation context, and experiment with prompts and models.

---

## The Architecture

TANDRmgr-lab is a Node.js/Express server on port 8086 that uses PHP CGI for its API endpoints — the same pattern as every other FOB service. But it also contains a second service: Memory Bot, running on port 8091 from the `bot/` subdirectory.

```
TANDRmgr-lab (port 8086)
├── server.js          ← Express server, web UI, API routing
├── api.php / api/     ← PHP API endpoints via CGI
├── bot/               ← Memory Bot (port 8091)
│   ├── server.js      ← Separate Express server
│   ├── config.json    ← Memory Bot config
│   └── data/memory-knowledge/  ← Persistent memory files
└── data/              ← Context data for TANDRmgr-lab
```

Two servers, one directory. TANDRmgr-lab handles the web UI and API testing. Memory Bot handles persistent conversation memory.

---

## The LLM Relay

TANDRmgr-lab's primary function is relaying requests to Ollama on port 11434. When you send a prompt to TANDRmgr-lab's API, it:

1. Receives the request on port 8086
2. Optionally enriches it with conversation context from Memory Bot
3. Forwards it to Ollama at `http://127.0.0.1:11434/api/generate`
4. Returns Ollama's response
5. Optionally stores the exchange in memory

The default model is `qwen2.5:7b`, configurable in `bot/config.json`.

---

## Memory Bot (Port 8091)

Memory Bot is a support service that provides persistent conversation memory. It stores conversations, institutional knowledge, error patterns, and performance metrics in markdown files under `bot/data/memory-knowledge/`.

Key memory files:
- `conversations.md` — stored conversation history
- `institutional_dna_hooks.md` — company procedures and knowledge
- `relay-history.md` — service relay history
- `error-patterns.md` — learned error patterns
- `performance.md` — performance metrics

Memory Bot's API:
```
GET http://127.0.0.1:8091/api/memory.php?action=query&q={query}
```

---

## Integration Points

**With Ollama (11434):** Direct LLM relay. Sends `/api/generate` and `/api/chat/completions` requests. Polls `/api/tags` for available models.

**With ADIR Hub (9303):** Registers health check. Appears in the Hub's service status dashboard. Can be controlled via the ADIR admin panel.

**With MasterSTART6:** Started automatically as a core service. Health checked via curl during startup.

**With Deployed Agents:** Agents can query TANDRmgr-lab's API to test LLM interactions or access memory context.

---

## The ADIR Hub API Connection

TANDRmgr-lab's `api/` directory includes `adir-api.php` which powers the ADIR Hub's file reading and status checking features. When the Hub dashboard loads a file or checks service status, it's calling TANDRmgr-lab's API. This makes TANDRmgr-lab a critical dependency for the Hub's functionality.

---

## Design Decisions

**Why a separate Memory Bot?** Separation of concerns. Memory management is complex enough to warrant its own process. If TANDRmgr-lab restarts, memory persists in the bot's files.

**Why port 8086 instead of 8085?** The original TANDRmgr used 8085. The "-lab" variant uses 8086 to avoid conflicts with any old references.

**Why PHP CGI for a testing tool?** Consistency. Every FOB service uses the Node→PHP pattern. Keeping TANDRmgr-lab consistent means agents that understand one service can work with all of them.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You understand how TANDRmgr-lab works. Your next move:              ║
║                                                                      ║
║  → The deployed agents (created by Agent-Dropper):                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    index.md                                                          ║
║                                                                      ║
║  → The service registry:                                             ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md      ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-tandrmgr-architecture.md                            ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
