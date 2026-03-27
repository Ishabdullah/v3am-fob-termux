**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\          ║
║  working.md                                                          ║
║  Updated: 2026-03-16 | The blueprint — how deployed agents work.     ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This explains the Jerry-template agent architecture.         ║
║  Every agent deployed by Agent-Dropper shares this design.          ║
║                                                                      ║
║  Service: http://127.0.0.1:11111                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How Deployed Agents Work

Every agent deployed by Agent-Dropper v2 is a clone of the Jerry template at `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN`. They all share the same architecture — what makes each agent unique is its config.json, its knowledge files, and whatever SOT files it accumulates over time.

---

## The Request Flow

When you talk to an agent, the request travels through three layers:

1. **Browser/curl** sends HTTP request to `http://127.0.0.1:11111/api/agent.php?action=chat&input=Hello`
2. **Node.js Express** (`server.js`) receives it, spawns PHP: `C:\FOB\php\php-cgi.exe api/agent.php`
3. **PHP** (`api/agent.php`) processes the action, calls the LLM provider, returns JSON

The `AGENT_DIR` constant in `server.js` tells PHP where to find its files. If this points to the wrong directory (the template instead of the deployment), everything breaks.

---

## API Patterns

All Jerry-template agents use identical API endpoints. URL-encode all parameters. These are paste-in-browser ready:

**Chat:**
```
http://127.0.0.1:11111/api/agent.php?action=chat&input=What%20services%20are%20running%20on%20this%20machine%3F
```

**Status:**
```
http://127.0.0.1:11111/api/agent.php?action=status
```

**Shell command:**
```
http://127.0.0.1:11111/api/agent.php?action=cmd&command=netstat%20-ano%20%7C%20findstr%20%3ALISTENING
```

**List tools:**
```
http://127.0.0.1:11111/api/agent.php?action=tools
```

**Read a file:**
```
http://127.0.0.1:11111/api/agent.php?action=read&file=adir%2FBOOT.md
```

**Write a file:**
```
http://127.0.0.1:11111/api/agent.php?action=write&file=adir%2Fstretch%2Fnotes.md&content=Testing%20file%20write
```

---

## Cross-Agent Communication

Agents can talk to each other by calling the other agent's API. This is how the chorus works — each agent has its own port, its own shell, its own context. One agent can run a command in another agent's shell without breaking its own, as long as the target isn't on auto mode.

**Agent1 asks Agent4 a question:**
```
http://127.0.0.1:11113/api/agent.php?action=chat&input=Agent1%20checking%20in%20%E2%80%94%20what%27s%20your%20current%20task%3F
```

**Agent1 runs a directory listing on Agent4's machine:**
```
http://127.0.0.1:11113/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB%5Cadir%5Cnew211adir%5CTANDR-2026-02-11%5Capps
```

Agents should call each other periodically to keep engines moving and context updated. The escaped characters in these URLs are critical — agents always struggle finding the full path examples, so keep them visible in working.md and index.md.

---

## LLM Configuration

Agent1 uses Gemini as its primary LLM provider:

- **Provider:** Gemini (`gemini-3-flash-preview`)
- **Fallback:** Anthropic (`claude-haiku-4-5-20251001`)
- **Local option:** Ollama via `https://adir.ngrok.app/api/generate`

The provider is set in `config.json` under `llm.provider`. Change it and restart.

---

## Voice Engine

Jerry-template agents include a voice engine — a state machine that handles text-to-speech for the chat UI. Voice is enabled by default in Agent1's deployment. The voice engine state transitions: idle → speaking → paused → idle.

---

## Directory Structure

```
Agent1/
├── server.js              ← Express server (port 11111) — CHECK AGENT_DIR
├── config.json            ← Agent identity, LLM config, API keys
├── index.html             ← Chat UI
├── dashboard.html         ← Agent dashboard
├── api/                   ← PHP API endpoints
│   ├── agent.php          ← Main API router (chat, cmd, tools, status)
│   ├── security.php       ← Path validation/sandboxing
│   └── providers/         ← LLM provider implementations
├── data/                  ← Knowledge and context
├── adir/                  ← You are here
│   ├── logs/              ← Conversation logs
│   └── [documentation]
└── START-AGENTONE.bat     ← Startup script
```

---

## Design Decisions

**Why Jerry template?** It's the agent template — chat, tools, shell access, voice. TANDRSocial is the bot template — knowledge base, content management, no shell. Agent-Dropper deploys Jerry. KB-Maker deploys TANDRSocial.

**Why Gemini?** All agents default to Gemini for cost and speed. Anthropic is fallback. Local Ollama is available via ngrok relay.

**Why separate ports?** Each agent is its own process, its own Express server, its own terminal window. No shared state. Communication is always via HTTP API calls.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You understand how agents work. Your next move:                     ║
║                                                                      ║
║  → Operate this agent:                                               ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    BOOT.md                                                           ║
║                                                                      ║
║  → See the Jerry template source:                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\index.md                                ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-agent-architecture.md                               ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
