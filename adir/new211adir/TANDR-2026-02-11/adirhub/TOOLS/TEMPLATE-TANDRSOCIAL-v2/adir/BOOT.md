**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT & OPERATING GUIDE                                ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-TANDRSOCIAL-CLEAN\adir\BOOT.md                            ║
║  Updated: 2026-03-16 | How to operate this template.                 ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the bot template — the blueprint that Agent-Dropper  ║
║  copies when deploying social media bots. You're reading the         ║
║  template's own documentation, not a deployed bot's.                 ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Operate This Template

TEMPLATE-TANDRSOCIAL-CLEAN is one of two templates that Agent-Dropper v2 uses to create new bots. The other is TEMPLATE-JERRY-CLEAN (for standard agents). This one builds social media content management bots — bots that read a knowledge base, draft posts, and optionally connect to Facebook's Graph API.

Think of this directory as a mold in a factory. It doesn't run as a service itself. Agent-Dropper copies it, configures the copy, and starts the copy on its own port. But you can also run it manually for testing.

---

## Running the Template Directly (Testing)

If you need to test the template before deploying bots from it:

```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN
npm install
node server.js
```

The server reads its port from `config.json`. The template config has port 8099 as a placeholder, but remember — this is a template. When Agent-Dropper deploys a real bot, it writes a new port into config.json.

**Access points (when running):**
- Chat UI: `http://127.0.0.1:[PORT]/`
- Dashboard: `http://127.0.0.1:[PORT]/dashboard.html`
- Status: `http://127.0.0.1:[PORT]/api/bot.php?action=status`

---

## How Agent-Dropper Uses This Template

When someone deploys a bot with `"type": "tandrsocial"` through Agent-Dropper v2, this is what happens:

1. **Copy** — The entire TEMPLATE-TANDRSOCIAL-CLEAN directory gets cloned to the target location (usually `apps/[BotName]`)
2. **Configure** — Agent-Dropper writes a new `config.json` with the assigned port, name, and model settings
3. **Fix routing** — Sets `AGENT_DIR` correctly in server.js so API calls find the PHP scripts
4. **Generate startup** — Creates a `START-[BotName].bat` file
5. **Ready** — The new bot can be started with `node server.js` in its own directory

The deployed bot is independent. It has its own port, its own config, its own knowledge base, and its own logs. Changes to the template don't affect already-deployed bots.

---

## The Request Flow

Same pattern as every service in FOB:

1. Browser or caller sends HTTP to the Node.js Express server
2. Express routes `/api/*` requests to PHP scripts via `C:\FOB\php\php-cgi.exe`
3. `bot.php` does the work — reads the knowledge base, calls Ollama, processes the request
4. Response flows back through Express to the caller

For social media features, there's an extra layer: `graph-api.php` handles Facebook Graph API calls when the bot needs to read feeds, search posts, or get engagement metrics.

---

## The Knowledge Base

Bots built from this template read `.md` files from `data/social-knowledge/` on every request. This is how they know what voice to use, what products to mention, and who the audience is.

The template ships with three example files:
- **company-voice.md** — Brand tone, style guidelines, content mix rules
- **services-and-products.md** — What the company offers, pricing, timelines
- **target-audience.md** — Demographics, pain points, content preferences

When deploying a real bot, you replace these with actual company data. The bot reads them fresh each time — no restart needed after edits.

---

## Content Drafting

The bot's main job is drafting social media posts. When it creates content, it saves drafts to `adir/logs/post-drafts/` with metadata:

```
Post Type: Facebook
Suggested Time: Wednesday 7:00 AM
Tone: Educational

--- POST CONTENT ---
[The actual post text]

--- HASHTAGS ---
#tag1 #tag2

--- NOTES FOR TEAM ---
[Context, image suggestions, review notes]
```

Drafts are saved, not posted. A human reviews and approves before anything goes live. The bot researches, drafts, and suggests — it doesn't publish.

---

## Configuration

All bot behavior is controlled by `config.json` at the template root. Key sections:

- **app** — Name, port, environment
- **llm** — Provider (ollama/anthropic), model, endpoint
- **knowledge** — Path to the knowledge base directory
- **security** — Allowed read/write directories, file extensions, rate limits
- **facebook_graph_api** — Graph API token, permissions, page ID
- **system_prompt** — The bot's personality and instructions

The security section enforces sandboxing — the bot can only read from the knowledge base and write to its own logs. No system access, no code execution, no reaching into other agents' directories.

---

## Pre-Flight Checklist

Before running (whether testing the template or deploying a bot):

- Node.js >= 18 installed: `node --version`
- PHP available: `C:\FOB\php\php-cgi.exe` exists
- Dependencies installed: `node_modules/` present (run `npm install` if not)
- `config.json` is valid JSON with a numeric `port` field
- Ollama running at port 11434 (if using ollama as LLM provider)
- Port not already in use: check with `netstat -ano | findstr :[PORT]`

---

## Troubleshooting

**Server won't start / "config.json must have a numeric port field":** The server.js requires a root-level `"port"` field in config.json. If it's nested under `"app"`, the server won't find it. Check the config structure.

**404 on API calls:** Same AGENT_DIR issue that affected early agents. Agent-Dropper v2 fixes this during deployment. If testing the template directly, verify the API files are where server.js expects them.

**Bot doesn't know about the company:** Check that `data/social-knowledge/` has .md files and that the knowledge `base_path` in config.json points to the right directory.

**Graph API errors:** Facebook tokens expire. If you see "Invalid access token," generate a new Page Access Token in the Facebook Developers console and update config.json.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know how to operate this template. Your next move:              ║
║                                                                      ║
║  → See what's in this directory:                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\index.md                         ║
║                                                                      ║
║  → Walk back up to the hub:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  → See the other template:                                           ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\BOOT.md                                ║
║                                                                      ║
║  To evolve this guide, create:                                       ║
║  SOT-[YYYYMMDD]-tandrsocial-template-boot.md                        ║
║  Place in: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\   ║
║  TEMPLATE-TANDRSOCIAL-CLEAN\adir\                                    ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
