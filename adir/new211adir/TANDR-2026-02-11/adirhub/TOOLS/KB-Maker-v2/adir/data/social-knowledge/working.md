```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  KB-Maker-v2\adir\working.md                                        ║
║  Updated: 2026-03-16 | The blueprint — how the bot factory works.    ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This explains KB-Maker's architecture — how it copies the    ║
║  TANDRSOCIAL template, generates configs, and produces running bots. ║
║                                                                      ║
║  Service: http://127.0.0.1:9220                                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How KB-Maker Works

KB-Maker v2 is structurally similar to Agent-Dropper v2 — both are Express servers that handle deployment logic entirely in Node.js rather than routing through PHP. The `server.js` IS the factory. It receives a deploy request, copies a template, patches the config, and returns a ready-to-run bot.

---

## The Deployment Engine

The heart of KB-Maker is the `POST /api/deploy-bot` handler in server.js. It runs a sequential pipeline that transforms a JSON request into a deployed bot directory.

**Phase 1: Validation.** Checks for required fields: `name`, `port`, `path`, `knowledge_path`. Rejects the request if any are missing. Creates the target directory if it doesn't exist.

**Phase 2: Template Copy.** Copies the entire TEMPLATE-TANDRSOCIAL-CLEAN directory to the specified path. This is a recursive copy that skips `node_modules`, `upload`, and `.git`. The source is:
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN`

**Phase 3: Configuration.** Reads the template's config.json, then merges deployment parameters on top. Sets: port at root level (critical — server.js reads `config.port` at startup), app name, LLM model, knowledge path, voice settings. Writes the merged config back.

**Phase 4: Knowledge Linking.** If a `knowledge_path` was provided, the deployment process notes where the source knowledge lives. The deployed bot reads from `data/knowledge/` inside its own directory — you still need to populate that directory with `.md` files, either by copying from the knowledge_path or by writing new ones.

**Phase 5: Scaffolding.** Creates supporting files:
- `adir/logs/conversations.txt` — clean conversation log
- `START-{NAME}.bat` — Windows startup script
- `STOP-{NAME}.bat` — Windows shutdown script
- `adir/BOOT.md` — deployment record with timestamp and settings

**Phase 6: Response.** Returns JSON with success status, bot details, URL, and list of files created.

---

## KB-Maker vs Agent-Dropper: Same Pattern, Different Template

Both factories follow the same deployment pattern: receive POST → copy template → patch config → generate bat files → return success. The key differences are what template they copy and what the deployed product does.

| Aspect | KB-Maker | Agent-Dropper |
|--------|----------|---------------|
| Template | TEMPLATE-TANDRSOCIAL-CLEAN | TEMPLATE-JERRY-CLEAN |
| Endpoint | `/api/deploy-bot` | `/api/deploy-agent` |
| Product | Knowledge bot (chat + KB) | Agent (tools + console) |
| AGENT_DIR fix | Not needed | Applied automatically |
| Knowledge | `data/knowledge/*.md` read on every message | Same pattern but less central |
| Tools | None (chat only) | `[TOOL_CALL:]` pattern, file ops, search |

Agent-Dropper has an extra deployment phase — the AGENT_DIR fix (replacing `path.join(ROOT_DIR, 'agent')` with `ROOT_DIR` in the deployed server.js). KB-Maker doesn't need this because the TANDRSOCIAL template doesn't have that bug.

---

## The Knowledge Base System

This is the defining feature of KB-Maker bots. Every deployed bot has a `data/knowledge/` directory. On every chat message, the PHP API (`api/bot.php`) reads ALL `.md` files in that directory and includes their content as context for the LLM call.

This means:
- **No restart needed** for knowledge changes — edit a file, next message sees it.
- **Keep files focused** — one topic per file (about.md, services.md, faq.md, pricing.md).
- **Keep total size under 50KB** — all files get concatenated into the LLM context window.
- **Markdown format** — headers and structure help the LLM find relevant information.

The knowledge path is configured in `config.json` → `knowledge.base_path` and must also be listed in `security.allowed_read_dirs` for the PHP sandboxing to allow access.

---

## The Request Flow (Deployed Bots)

Once a bot is deployed and running, chat messages follow the standard FOB request flow:

```
Browser (http://127.0.0.1:{port}/)
  → POST /api/bot.php?action=chat
  → Express (server.js) receives request
  → Spawns: C:\FOB\php\php-cgi.exe api/bot.php
    → PHP reads config.json (system prompt, LLM settings)
    → PHP reads ALL files in data/knowledge/ (context injection)
    → PHP calls Ollama (127.0.0.1:11434) or Anthropic
    → PHP returns LLM response
  → Express sends response to browser
```

This is the same Node.js → PHP CGI pattern used everywhere in FOB. Express is the traffic cop. PHP does the thinking. The LLM providers live in `api/providers/ollama.php` and `api/providers/anthropic.php`.

---

## The Config Architecture

KB-Maker's own config.json (`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\config.json`) serves double duty:

1. **Its own configuration** — port (9220), LLM provider, voice settings, ngrok placeholder.
2. **Defaults for deployed bots** — the `bot_generation` section holds defaults like `default_model: "gemma:2b"`, `default_voice: true`, and `bot_port_range: [9220, 9229]`.

The port range in config is advisory — the deploy endpoint uses whatever port you send in the request body. GGBOT was deployed at port 10336, well outside the "9220-9229" range.

---

## Template Transformation

When KB-Maker copies TEMPLATE-TANDRSOCIAL-CLEAN, the deployed bot inherits everything the template has: the TANDRSocial chat UI, Facebook Graph API integration code, the social-knowledge directory structure, and TANDRSocial's system prompt. This is by design — the template is a fully-featured starting point.

The customization happens AFTER deployment:
- **System prompt** gets rewritten for the new bot's personality
- **Knowledge files** get replaced with the new bot's content
- **UI elements** (welcome message, buttons, colors) get themed
- **Facebook features** get ignored or removed if not needed

GGBOT is the reference example. It started as a TANDRSOCIAL copy and was customized into a kitchen/granite countertop bot with its own knowledge base, branding, and personality.

---

## Voice and ngrok: Optional Features

**Voice** — uses the browser's Web Speech API. No server-side audio processing. Configured in config.json under `voice`. Can be enabled per-bot at deploy time with `"voice": true`.

**ngrok** — placeholder support for exposing bots to the internet. Currently configured with `"auth_token": "placeholder_token_here"` in KB-Maker's config. Would need a real ngrok token and domain to function.

Neither feature affects the core deployment functionality.

---

## Design Decisions

**Why use the TANDRSOCIAL template for bots?** Because TANDRSOCIAL was built for content-focused chat — it has the knowledge base system, the content drafting pipeline, and the clean chat UI. JERRY was built for tool-using agents with console protocol. Different products, different templates.

**Why handle deployment in Node.js instead of PHP?** Same reason as Agent-Dropper — deployment involves heavy filesystem operations (recursive copy, file patching, multiple writes). Node.js handles this natively in a single synchronous pass. Spawning PHP for each step would be slow and fragile.

**Why merge configs instead of overwriting?** The template config.json has useful defaults (LLM providers, security settings, voice config) that deployment shouldn't destroy. Merging preserves template defaults while letting deployment-specific values take priority.

**Why not combine KB-Maker and Agent-Dropper into one factory?** Separation of concerns. The two templates produce fundamentally different products. Keeping the factories separate means each can evolve independently. KB-Maker could add bot-specific features (knowledge validation, template preview) without affecting agent deployment.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You understand how the bot factory works. Your next move:           ║
║                                                                      ║
║  → See the template it deploys from:                                 ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\BOOT.md                          ║
║                                                                      ║
║  → See a deployed bot (GGBOT):                                       ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    GGBOT\adir\                                                       ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-kb-maker-architecture.md                             ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```
