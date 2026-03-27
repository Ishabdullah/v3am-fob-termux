**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-TANDRSOCIAL-CLEAN\adir\working.md                         ║
║  Updated: 2026-03-16 | The blueprint — architecture and design.      ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This explains how bots built from this template work. The    ║
║  content drafting pipeline, the knowledge base system, the Facebook  ║
║  integration, the sandboxing model, and how a template becomes a     ║
║  running bot.                                                        ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How This Template Works

This is the architectural record for TEMPLATE-TANDRSOCIAL-CLEAN — the bot template that Agent-Dropper v2 uses to create social media content management bots. Understanding the template means understanding every bot deployed from it.

---

## The Content Drafting Pipeline

This is the core purpose of bots built from this template. A user asks for content, the bot reads the knowledge base, calls the LLM, and saves a draft for human review. Here's the full flow:

1. User sends a message through the chat interface: *"Draft a post about our roofing services"*
2. The browser POSTs to `/api/bot.php?action=chat`
3. Express routes the request to `bot.php` via PHP CGI
4. `bot.php` reads every `.md` file from `data/social-knowledge/` — this is the knowledge context
5. The user's message plus the knowledge context plus the system prompt get sent to the LLM (Ollama or Anthropic)
6. The LLM generates a response with a formatted draft post
7. If the response contains a `[SAVE_FILE: ...]` directive, `bot.php` writes the draft to `adir/logs/post-drafts/`
8. The response flows back to the user with a preview

The bot drafts. It doesn't publish. Every post goes through human review first. The `post-drafts/` directory is the staging area — the team reads the drafts, edits them, and posts manually (or through a future approval workflow).

---

## The Knowledge Base System

Every bot built from this template has a knowledge base at `data/social-knowledge/`. The template ships with three example files:

- **company-voice.md** — Brand guidelines, tone, style, content mix rules (60% educational, 30% showcase, 10% promotional), hashtag strategy, posting schedule
- **services-and-products.md** — What the company offers, pricing ranges, timelines, warranties, service area
- **target-audience.md** — Who the company serves, demographics, pain points, social media behavior, content preferences

The bot reads ALL `.md` files in this directory on every request. There's no caching across requests — the knowledge is always fresh. Add a new file and the bot picks it up immediately. Edit an existing file and the changes apply to the next message. No restart needed.

This is the design's strength: the knowledge base is just files. Anyone can edit them. The LLM gets the full context every time. The bot's personality and expertise are shaped entirely by what's in these files.

---

## Facebook Graph API Integration

The template includes `api/graph-api.php` — a wrapper around Facebook's Graph API. When configured with a valid Page Access Token, the bot can:

- **Read page feeds** — See what's been posted to the company page
- **Search posts** — Find trending content about specific topics
- **Get insights** — Pull engagement metrics (impressions, clicks, interactions)
- **Get post comments** — Read what people are saying
- **Get post details** — Full data on a specific post

The Graph API is optional. A bot works fine without it — it just can't pull live data from Facebook. The token goes in `config.json` under `facebook_graph_api.access_token`. Permissions needed: `pages_read_engagement`, `pages_manage_posts`, `read_insights`.

Future capability: posting to the page with an approval workflow. Currently disabled — the bot only reads.

---

## The Sandboxing Model

Security is enforced at the PHP level via `api/security.php`. Every file read or write goes through path validation:

**What the bot CAN read:**
- `data/social-knowledge/*.md` — Knowledge base
- `adir/logs/fb-feeds/*` — Its own cached feed data
- `adir/logs/post-queue/*` — Posts waiting for review

**What the bot CAN write:**
- `adir/logs/conversations.txt` — Chat history
- `adir/logs/post-drafts/*` — Generated content
- `adir/logs/fb-feeds/*` — Feed cache
- `adir/logs/errors.txt` — Error log

**What the bot CANNOT do:**
- Read or write system files
- Access other agents' directories
- Execute system commands
- Modify its own code
- Post to Facebook without approval

The sandbox uses `realpath()` checks to prevent directory traversal and a strict extension whitelist (`.md`, `.txt`, `.json` only). This means a prompt injection attack that tries to read `/etc/passwd` or `../../config.json` from another service gets blocked at the PHP level before it touches the filesystem.

---

## The System Prompt

The bot's personality lives in `config.json` under `system_prompt.role`. It's a long, detailed prompt that tells the LLM:

- Who it is (a social media content strategist)
- What it can do (research, draft, analyze)
- How to format drafts (the `[SAVE_FILE: ...]` pattern)
- How to use file discovery (`[LIST_FILES: ...]` pattern)
- What it cannot do (post directly, access customer data)
- Tone guidelines (conversational, data-driven, collaborative)

This prompt is the template's most important artifact. When Agent-Dropper deploys a new bot, this prompt can be customized — different company, different industry, different tone. The architecture stays the same; the personality changes.

---

## Template to Running Bot: The Transformation

When Agent-Dropper v2 receives a deploy request with `"type": "tandrsocial"`, here's what happens inside:

1. **Directory copy** — The entire `TEMPLATE-TANDRSOCIAL-CLEAN` directory gets copied to the target path (e.g., `apps/Bot1`)

2. **Config rewrite** — Agent-Dropper writes a new `config.json` with:
   - The assigned port number
   - The bot's name
   - LLM settings (model, endpoint)
   - Any API credentials provided in the deploy request

3. **Server.js fix** — Sets `AGENT_DIR = ROOT_DIR` so API routes resolve correctly (the routing fix from 2026-03-15)

4. **Startup script** — Generates `START-[BotName].bat` that runs `node server.js` in the bot's directory

5. **Independent operation** — The deployed bot is now completely independent. It has its own port, config, knowledge base, and logs. Changes to the template don't affect it. Changes to it don't affect the template.

---

## How This Differs from TEMPLATE-JERRY-CLEAN

The JERRY template creates general-purpose agents. This template creates social media bots. The key differences:

| Feature | JERRY (Agent) | TANDRSOCIAL (Bot) |
|---------|--------------|-------------------|
| Primary API | `agent.php` | `bot.php` |
| Facebook integration | No | Yes (`graph-api.php`) |
| Knowledge base | General | Social media focused |
| Content drafting | No | Yes (post-drafts/) |
| System prompt | General assistant | Content strategist |
| Dashboard | Basic | Content review panel |

The underlying architecture is the same — Express server, PHP CGI, config.json, sandboxed file access. The difference is what the PHP scripts do and what the system prompt tells the LLM to be.

---

## Design Decisions

**Why PHP for the API?** Same reason as the rest of FOB — PHP is fast to modify without restarting the server. Change `bot.php` and the next request picks up the changes. No build step, no hot reload, no server restart.

**Why file-based knowledge instead of a database?** Because files are transparent. You can read them, edit them, version them, and copy them. An agent reading `.md` files in a directory is the simplest possible knowledge retrieval system. It scales by adding files, not by managing schemas.

**Why sandbox at the PHP level?** Because the LLM controls what the bot tries to do. The system prompt includes file operation patterns (`[SAVE_FILE: ...]`, `[READ_FILE: ...]`), and the bot's PHP code executes them. The sandbox ensures that even if the LLM generates an unexpected file operation, it can't escape the allowed directories.

**Why drafts instead of direct posting?** Trust but verify. The LLM is good at generating content but it can hallucinate facts, miss brand nuances, or create something off-tone. The draft pipeline ensures a human sees everything before it goes public. Publishing comes later, with an approval workflow.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You understand the template architecture. Your next move:           ║
║                                                                      ║
║  → See the template's current status:                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\current.md                       ║
║                                                                      ║
║  → Back to this template's index:                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\index.md                         ║
║                                                                      ║
║  → See the other template (JERRY):                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-tandrsocial-template-architecture.md                 ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
