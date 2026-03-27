---
SOT-323-TL-INDEX.md
Author: The Last (TL) | Date: 2026-03-23
Scope: GENERIC — the ADIR phone book, valid for all fleet agents
Purpose: Every API endpoint, service port, and key file path in the system
Supersedes: NEW-313-index.md
---

# INDEX — FOB Fleet Phone Book

All APIs, ports, and file locations any agent in the fleet can reach.
Verify live with curl before trusting this list — ports change.

---

## Fleet Services

| Name | ID | Port | URL | Notes |
|------|----|------|-----|-------|
| ADIR Hub | adir-hub | 9303 | http://127.0.0.1:9303/ | Central dashboard |
| KB-Maker v2 | kb-maker | 9220 | http://127.0.0.1:9220/ | Bot factory |
| Agent-Dropper v2 | agent-dropper | 9210 | http://127.0.0.1:9210/ | Agent deployer |
| TANDRmgr-lab | tandrmgr | 8086 | http://127.0.0.1:8086/ | Manager / orchestrator |
| FOB Server | fob-server | 8100 | http://127.0.0.1:8100/ | Static file server |
| Agent One | agent-one | 11111 | http://127.0.0.1:11111/ | Jerry agent |
| Agent Two | agent-two | 11112 | http://127.0.0.1:11112/ | Jerry agent |
| Agent Four | agent-four | 11113 | http://127.0.0.1:11113/ | Jerry agent (reference) |
| Bot One | bot-one | 11114 | http://127.0.0.1:11114/ | KB bot (TANDRSocial) |
| GGBot | ggbot | 10336 | http://127.0.0.1:10336/ | |
| GGBot @KBMkr | ggbot-kb | 10333 | http://127.0.0.1:10333/ | |
| Memory Bot | memorybot | 8091 | http://127.0.0.1:8091/ | Context for TANDRmgr |
| VisionBot | visionbot | 10337 | http://127.0.0.1:10337/ | Vision/image |
| ParserBot | parserbot | 10108 | http://127.0.0.1:10108/ | |
| StartPower | startpower | 57775 | http://127.0.0.1:57775/ | KB agent |
| Librarian | librarian | 57785 | http://127.0.0.1:57785/ | KB agent |
| TANDRSocial | tandrsocial | 57790 | http://127.0.0.1:57790/ | KB agent |
| ImageGen | imagegen | 9230 | http://127.0.0.1:9230/ | |
| V3AMFOB Control API | — | 9399 | http://127.0.0.1:9399/ | Launcher control |
| Ollama | — | 11434 | http://127.0.0.1:11434/ | Local LLM engine |

---

## V3AMFOB Control API (Port 9399)

The launcher's HTTP API. Call from any agent — no auth, localhost only.

```
GET  http://127.0.0.1:9399/status          → full fleet status JSON
GET  http://127.0.0.1:9399/status/:id      → single service status
POST http://127.0.0.1:9399/restart/:id     → kill + respawn
POST http://127.0.0.1:9399/start/:id       → start a downed service
POST http://127.0.0.1:9399/stop/:id        → stop (owned services only)
```

Response shape:
```json
{ "ok": true, "services": [
  { "id": "librarian", "name": "Librarian", "port": 57785,
    "group": "KB Agents", "status": "up", "owned": true }
]}
```

---

## Agent Chat API (All Jerry Agents)

Call any Jerry agent's chat endpoint:
```
GET http://127.0.0.1:{port}/api/agent.php?action=chat&input={url-encoded-message}
GET http://127.0.0.1:{port}/api/agent.php?action=status
GET http://127.0.0.1:{port}/api/agent.php?action=scan
GET http://127.0.0.1:{port}/api/agent.php?action=memory&id={personality}
GET http://127.0.0.1:{port}/api/agent.php?action=clear&id={personality}
GET http://127.0.0.1:{port}/api/agent.php?action=context
```

---

## ADIR Hub Coordination Files

These are shared bulletin board files on the hub. All agents can read them:

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\CURRENT.txt    ← active fleet task
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\WORKING.txt    ← working context
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\FEED.txt       ← inter-agent messages
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\LOGS\action_log.txt  ← audit trail
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md       ← hub index
```

---

## Key File Locations

```
FOB Root:       C:\FOB\
ADIR Root:      C:\FOB\adir\new211adir\TANDR-2026-02-11\
Hub:            C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\
Hub TOOLS:      C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\
Apps:           C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\
KB-Maker v2:    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\
Agent-Dropper:  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\
StartPower:     C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\StartPower\
Librarian:      C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\librarian\bot\
TANDRSocial:    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-v2\
Jerry Template: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\
Four Template:  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-FOUR-CLEAN\
Launcher:       C:\FOB\V3AMFOB\
Launcher SOT:   C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\SOT-V3AMFOB-LAUNCHER.md
PORT REGISTRY:  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\PORT-REGISTRY.json
PHP Bundled:    C:\FOB\php\php-cgi.exe
```

---

## SOT File Naming Convention

```
SOT-{MMDD}-{AUTHOR}-{TYPE}.md          ← standard dated SOT
SOT-{keyword}-{MMDD}-{AUTHOR}-{TYPE}.md ← keyword-tagged SOT (acts as persistent memory)
```

- `{MMDD}` = date (323 = March 23). Higher = newer = wins.
- `{AUTHOR}` = who wrote it (TL = The Last / Claude, agent name for agent-written)
- `{TYPE}` = BOOT, INDEX, WORKING, CURRENT, PROMPT, IDENTITY, or custom
- Extra keywords in the name act as persistent memory tags (e.g. SOT-task-323-TL-CURRENT.md)

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF SOT-323-TL-INDEX.md                                          ║
║  Supersedes NEW-313-index.md | Generic — valid for all agents        ║
╚══════════════════════════════════════════════════════════════════════╝
```
