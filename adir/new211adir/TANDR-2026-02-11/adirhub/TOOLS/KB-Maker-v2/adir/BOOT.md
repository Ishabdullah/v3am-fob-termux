**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  KB-Maker-v2\adir\BOOT.md                                           ║
║  Updated: 2026-03-16 | The manual — how to create knowledge bots.    ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: KB-Maker v2 is the bot factory. It takes the TANDRSOCIAL    ║
║  template and turns it into a running knowledge bot on its own port. ║
║  Agent-Dropper deploys agents (JERRY template). KB-Maker deploys     ║
║  bots (TANDRSOCIAL template). Two factories, two templates.          ║
║                                                                      ║
║  Service: http://127.0.0.1:9220                                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Deploy a Knowledge Bot

KB-Maker v2 is a bot factory running on port 9220. It copies the TANDRSOCIAL template, configures it with your settings, and produces a self-contained knowledge bot that runs on its own port. Think of it as a cookie cutter — the template is the shape, your config is the dough, and the deployed bot is the cookie.

---

## Prerequisites

KB-Maker must be running before you can deploy anything. It starts with `MasterSTART6.bat` or `START-ALL.bat` alongside the other core services. Verify it's alive:

```
http://127.0.0.1:9220/api/status
```

You also need Ollama running on port 11434 if you want local LLM responses. Without Ollama, the bot falls back to Anthropic (if an API key is configured in the deployed bot's config.json).

---

## Deploying a Bot

Send a POST to KB-Maker's deploy endpoint. This is the only way to create a bot — never copy the template manually.

```
POST http://127.0.0.1:9220/api/deploy-bot
Content-Type: application/json

{
  "name": "MyBot",
  "port": 10337,
  "path": "C:/FOB/adir/new211adir/TANDR-2026-02-11/adirhub/TOOLS/MYBOT",
  "knowledge_path": "C:/path/to/knowledge/files",
  "model": "glm-5:cloud",
  "voice": true
}
```

**Required fields:** `name` (display name, also used for START/STOP bat files), `port` (must not conflict — check REGISTRY.md), `path` (full path where the bot directory gets created), `knowledge_path` (full path to a directory of .md files the bot will use as its brain).

**Optional fields:** `model` (defaults to "gemma:2b" if omitted), `voice` (defaults to true).

The safe port range for new bots is **10337–10399**. Check `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md` for what's already taken.

---

## What Happens During Deployment

When you hit the deploy endpoint, KB-Maker runs a pipeline:

1. **Validates** your request — checks required fields, verifies the port isn't obviously wrong.
2. **Copies** the entire TEMPLATE-TANDRSOCIAL-CLEAN directory to your specified path. Skips `node_modules`, `upload`, and `.git`.
3. **Generates config.json** — merges your settings (port, model, knowledge path) into the template's config structure. The port lands at root level where server.js expects it.
4. **Creates scaffolding** — `adir/logs/conversations.txt` (clean log), `START-{NAME}.bat`, `STOP-{NAME}.bat`, `adir/BOOT.md` (deployment record).
5. **Returns** a JSON response with success status, the bot's URL, and a list of files created.

The response looks like:
```json
{
  "success": true,
  "message": "Knowledge bot deployed successfully with full TANDRSocial template",
  "details": {
    "name": "MyBot",
    "port": 10337,
    "url": "http://127.0.0.1:10337/",
    "template": "Full TANDRSocial (with all features)",
    "knowledgeSource": "C:/path/to/knowledge",
    "model": "glm-5:cloud",
    "voice": "Enabled"
  }
}
```

---

## After Deployment: The Checklist

Deployment gives you a running skeleton. You still need to customize it. This is the post-deployment checklist — skip nothing.

**1. Install dependencies.** Either `npm install` in the bot directory, or copy `node_modules` from an existing bot like GGBOT.

**2. Update config.json.** The template ships with TANDRSocial's personality. You MUST change:
- `system_prompt.role` — this is the bot's brain. Rewrite it for your bot's purpose.
- `app.name` and `app.description` — what shows in dashboards.
- `bot_settings.title` and `bot_settings.hot_buttons` — the chat UI identity.
- `knowledge.base_path` — should be `"data/knowledge"` (not the template's `"data/social-knowledge"`).
- `security.allowed_read_dirs` — must include `"data/knowledge"`.

**3. Add knowledge files.** Put `.md` files in `data/knowledge/`. Keep each file focused on one topic. Keep total knowledge under 50KB. The bot reads ALL files on every message — no restart needed for knowledge changes.

**4. Customize index.html.** Update the welcome message, quick action buttons (`data-message` attributes), header title, and CSS color variables in `:root {}`.

**5. Add CSS route to server.js** (if using external CSS files). The template doesn't serve `/css/*` by default.

**6. Write a CLAUDE.md** in the bot's root directory. Include: bot name, port, purpose, "DO NOT BREAK" warnings, architecture, config field reference, troubleshooting.

**7. Start and test.** Run `node server.js` or double-click `START-{NAME}.bat`. Verify: `http://127.0.0.1:{port}/api/bot.php?action=status`.

---

## The Request Flow

Once a bot is running, every chat message follows this path:

```
Browser → POST /api/bot.php?action=chat → server.js (Express)
  → spawns PHP: php-cgi.exe api/bot.php
    → PHP reads config.json (system prompt, LLM settings)
    → PHP reads ALL files in data/knowledge/ (context)
    → PHP calls Ollama (localhost:11434) or Anthropic
    → PHP returns response
  → Express sends response to browser
```

PHP does the heavy lifting. Express is just the traffic cop. The PHP script at `api/bot.php` handles chat, status checks, and file operations. The LLM providers live in `api/providers/ollama.php` and `api/providers/anthropic.php`.

---

## Troubleshooting

**"EADDRINUSE" on bot startup** — the port is taken. Check: `netstat -ano | findstr :{port}`. Either kill the process or pick a different port in config.json.

**Bot responds with TANDRSocial personality** — you forgot to update `config.json` → `system_prompt.role`. The template ships with TANDRSocial's identity.

**Bot can't find knowledge files** — check `config.json` → `knowledge.base_path` (should be `"data/knowledge"`) and `security.allowed_read_dirs` (must include that path).

**CSS not loading (404)** — server.js needs a `/css/:filename` route added. See KB-Maker's CLAUDE.md for the code snippet.

**PHP errors / 404 on API calls** — verify `C:\FOB\php\php-cgi.exe` exists. This is the bundled PHP that every bot needs.

**Voice not working** — must use Chrome or Edge. Check `config.json` → `voice.enabled` and `features.voice_input` are both `true`.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know how to deploy and operate knowledge bots. Your next move:  ║
║                                                                      ║
║  → What's in this directory and where to go:                         ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    KB-Maker-v2\adir\index.md                                        ║
║                                                                      ║
║  → How KB-Maker works under the hood:                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    KB-Maker-v2\adir\working.md                                      ║
║                                                                      ║
║  → The template KB-Maker copies from:                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\BOOT.md                          ║
║                                                                      ║
║  To evolve this manual, create:                                      ║
║  SOT-[YYYYMMDD]-kb-maker-boot.md                                    ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
