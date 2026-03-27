**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT & OPERATING GUIDE                                ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-JERRY-CLEAN\adir\BOOT.md                                  ║
║  Updated: 2026-03-16 | How to operate this template.                 ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the standard agent template — the blueprint that     ║
║  Agent-Dropper copies when deploying "jerry" type agents. You're     ║
║  reading the template's own documentation, not a deployed agent's.   ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Operate This Template

TEMPLATE-JERRY-CLEAN is the standard agent template that Agent-Dropper v2 copies to create new agents. It's the more common of the two templates — the other being TEMPLATE-TANDRSOCIAL-CLEAN for social media bots. Agents 1 through 4 in the `apps/` directory were all built from this template.

Think of this directory as the master copy. It doesn't run as a service itself. Agent-Dropper clones it, patches the configuration, and starts the clone on its own port. But you can also run it directly for testing.

---

## Running the Template Directly (Testing)

```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN
npm install
node server.js
```

The server reads port from `config.json` and falls back to 9200. The template config doesn't have a root-level `port` field, so it uses the default. When Agent-Dropper deploys a real agent, it writes the assigned port into config.json.

**Access points (when running):**
- Agent UI: `http://127.0.0.1:[PORT]/`
- Dashboard: `http://127.0.0.1:[PORT]/dashboard.html`
- Status: `http://127.0.0.1:[PORT]/api/agent.php?action=status`

---

## How Agent-Dropper Uses This Template

When someone deploys an agent with `"type": "jerry"` through Agent-Dropper v2:

1. **Copy** — The entire TEMPLATE-JERRY-CLEAN directory gets cloned to the target (usually `apps/[AgentName]`)
2. **Configure** — Agent-Dropper writes `config.json` with the assigned port, name, and model
3. **Fix routing** — Changes `AGENT_DIR` from `path.join(ROOT_DIR, 'agent')` to `ROOT_DIR` so API calls work correctly
4. **Generate startup** — Creates `START-[AgentName].bat`
5. **Ready** — The new agent runs independently on its own port

The AGENT_DIR fix is critical. The template's `server.js` has `const AGENT_DIR = path.join(ROOT_DIR, 'agent')` on line 34, which points API routes to a nonexistent subdirectory. Agent-Dropper rewrites this to `const AGENT_DIR = ROOT_DIR;` during deployment. This is the same fix that Agents 1-3 are missing and Agent4 has.

---

## The Request Flow

The JERRY template has a more complex routing setup than TANDRSOCIAL:

1. Express server receives the request
2. Both `/api/*` and `/agent/api/*` routes get handled — they both resolve to PHP scripts in the `agent/api/` subdirectory (or root `api/` after the AGENT_DIR fix)
3. PHP scripts execute via `C:\FOB\php\php-cgi.exe` with a 5-minute timeout
4. Response flows back through Express

The dual route pattern (`/api/` and `/agent/api/`) exists because the template originally had API files inside an `agent/` subdirectory. The AGENT_DIR fix flattens this, but both routes still work for backwards compatibility.

---

## The Agent's Capabilities

Agents built from this template have:

- **Chat interface** — A web UI for conversational interaction
- **Multi-provider LLM** — Supports Ollama, Anthropic, Gemini, and OpenAI (configured in config.json)
- **Directory scanning** — Can scan and read `.md` and `.txt` files in its working directory
- **File operations** — Sandboxed read/write to its own data and adir directories
- **Dashboard** — Admin panel with multiple tabs (dashboard, archivist, prompt guide, reasoning, tools, settings)
- **Tool system** — Chat, scan, memory, and context tools
- **Console protocol** — Structured header/footer output with progress tracking

---

## Configuration

The template's `config.json` is more complex than TANDRSOCIAL's. Key sections:

- **paths** — `scan_directory` (what the agent can explore), `data_directory`, `ui_directory`
- **llm** — Multi-provider with Ollama, Anthropic, Gemini, OpenAI configurations
- **search** — Google Custom Search integration (cx ID + API key)
- **agent** — Name, identity, system prompt (very long — includes console protocol, sanity checks, tool usage, wheel protocol)
- **ui** — Theme, title, available tabs
- **tools** — Enabled tool list (chat, scan, memory, context)

**Warning:** The template config.json contains visible API keys for Anthropic, Gemini, and Google Search. These should be replaced with placeholders before the template is shared or published.

---

## Pre-Flight Checklist

- Node.js >= 18: `node --version`
- PHP available: `C:\FOB\php\php-cgi.exe` exists
- Dependencies: `node_modules/` present (run `npm install` if not)
- `config.json` is valid JSON
- Ollama running at 11434 (if using ollama provider)
- Port not in use: `netstat -ano | findstr :[PORT]`

---

## Troubleshooting

**404 on API calls:** This is the AGENT_DIR bug. The template's server.js routes API calls to `agent/api/` but the PHP files may be at `api/` directly. Fix: change line 34 of server.js from `const AGENT_DIR = path.join(ROOT_DIR, 'agent')` to `const AGENT_DIR = ROOT_DIR;`. Agent-Dropper does this automatically for new deployments.

**Server starts on wrong port:** The template defaults to 9200 if config.json doesn't have a root-level `port` field. Add `"port": [NUMBER]` at the top level of config.json.

**LLM calls fail:** Check which provider is set in `config.json` under `llm.provider`. Verify the endpoint is reachable. For Ollama: `curl http://127.0.0.1:11434/api/tags`. For external providers: verify the API key is valid.

**Dashboard tabs don't load:** Some tabs reference features that may not be fully implemented in the template. The chat tab is the primary interface.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know how to operate this template. Your next move:              ║
║                                                                      ║
║  → See what's in this directory:                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\index.md                                ║
║                                                                      ║
║  → Walk back up to the hub:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  → See the other template:                                           ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\BOOT.md                          ║
║                                                                      ║
║  To evolve this guide, create:                                       ║
║  SOT-[YYYYMMDD]-jerry-template-boot.md                               ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
