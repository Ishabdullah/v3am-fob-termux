**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\          ║
║  working.md                                                          ║
║  Updated: 2026-03-16 | API patterns and cross-agent communication.   ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent4 is the working reference agent. This file contains    ║
║  the complete API reference for all FOB services.                   ║
║                                                                      ║
║  Service: http://127.0.0.1:11113                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# API Patterns — All FOB Services

All APIs are GET-based REST endpoints. URL-encode parameters. If you can paste it in a browser, it works. Agents should use these frequently — calling each other keeps the engines moving and context updated.

---

## Jerry-Template Agents (agent.php)

All agents deployed by Agent-Dropper use the same API pattern. Replace `{port}` with the agent's port number.

**Chat — ask the agent something:**
```
http://127.0.0.1:{port}/api/agent.php?action=chat&input=Hello%2C%20what%20is%20your%20status%3F
```

**Status — check if alive:**
```
http://127.0.0.1:{port}/api/agent.php?action=status
```

**Shell command — run something on the agent's machine:**
```
http://127.0.0.1:{port}/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB%5Cadir
```

**Tools — list available tools:**
```
http://127.0.0.1:{port}/api/agent.php?action=tools
```

**Read file — read a file through the agent:**
```
http://127.0.0.1:{port}/api/agent.php?action=read&file=adir%2FBOOT.md
```

**Write file — write to the agent's filesystem:**
```
http://127.0.0.1:{port}/api/agent.php?action=write&file=adir%2Fstretch%2Fnotes.md&content=Test%20write
```

### Agent Port Reference
| Agent | Port | Status |
|-------|------|--------|
| Agent1 | 11111 | Pre-fix deployment |
| Agent2 | 11112 | Running (agent/ subdir) |
| Agent4 | 11113 | Working |

---

## TANDRSocial-Template Bots (bot.php)

Bots deployed by KB-Maker use `bot.php` instead of `agent.php`. Different API, same pattern.

**Chat — ask the bot something:**
```
http://127.0.0.1:{port}/api/bot.php?action=chat&input=What%20do%20you%20know%20about%20construction%3F
```

**Status:**
```
http://127.0.0.1:{port}/api/bot.php?action=status
```

### Bot Port Reference
| Bot | Port | Status |
|-----|------|--------|
| Bot1 | 11114 | Needs port config in root config.json |
| GGBOT | 10336 | Working |

---

## TANDRmgr-lab (Port 8086)

**Generate LLM response via Ollama relay:**
```
http://127.0.0.1:8086/api/generate
```
POST with `{"prompt":"your question","model":"qwen2.5:7b"}`

**Check memory:**
```
http://127.0.0.1:8086/api/memory
```

---

## Memory Bot (Port 8091)

**Query memory:**
```
http://127.0.0.1:8091/api/memory.php?action=query&q=What%20recent%20information%20do%20you%20have%3F
```

---

## KB-Maker v2 (Port 9220)

**Deploy a new bot:**
```
http://127.0.0.1:9220/api/deploy.php?action=deploy&bot_name=TestBot&port=11120&model=qwen2.5%3A7b
```

**List deployed bots:**
```
http://127.0.0.1:9220/api/deploy.php?action=list
```

---

## Agent-Dropper v2 (Port 9210)

**Deploy a new agent:**
```
http://127.0.0.1:9210/api/deploy.php?action=deploy&agent_name=Agent5&port=11116
```

**List deployed agents:**
```
http://127.0.0.1:9210/api/deploy.php?action=list
```

---

## Ollama (Port 11434)

**List available models:**
```
http://127.0.0.1:11434/api/tags
```

**Generate response:**
```
http://127.0.0.1:11434/api/generate
```
POST with `{"model":"qwen2.5:7b","prompt":"Hello"}`

---

## Cross-Agent Communication Pattern

Agents can run commands on each other's shells. One agent calls another's API — the target responds when called (as long as it's not on auto mode). This is how the chorus works:

**Agent4 asks Agent1 to scan its own directory:**
```
http://127.0.0.1:11111/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB%5Cadir%5Cnew211adir%5CTANDR-2026-02-11%5Capps%5CAgent1%5Cadir
```

**Agent4 asks Agent2 for a status check:**
```
http://127.0.0.1:11112/api/agent.php?action=chat&input=Agent4%20here%20%E2%80%94%20report%20your%20current%20status
```

**Agent4 checks Hub status:**
```
http://127.0.0.1:9303/
```

The escaped characters matter. Agents always struggle with URL encoding. Keep these full examples visible — copy and modify the port/parameters.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You have the complete API reference. Your next move:                ║
║                                                                      ║
║  → Full agent architecture blueprint:                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    working.md                                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this reference, create:                                   ║
║  SOT-[YYYYMMDD]-api-patterns.md                                     ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
