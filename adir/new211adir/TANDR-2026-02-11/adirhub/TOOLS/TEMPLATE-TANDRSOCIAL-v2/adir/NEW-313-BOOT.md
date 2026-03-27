**324 Ports and paths are changed ref data**

# Social Media Bot Template - Boot & Startup Guide

**Status:** ✅ Template for Agent-Dropper v2
**Version:** 2.0.0
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN`

---

## What Is This Template?

TEMPLATE-TANDRSOCIAL-CLEAN is a social media bot reference template that Agent-Dropper v2 uses to spawn agents for content management and social media drafting.

**When cloned by Agent-Dropper v2:**
- Directory copied to new location
- config.json updated with port, name, LLM settings
- Facebook Graph API token configured
- NEW-313- documentation files created
- Knowledge base customized with company data
- Agent started on assigned port

---

## How To Use This Template

### For Agent-Dropper v2 (Automatic)

Agent-Dropper handles:
1. Copy all files from template
2. Update config.json with agent details
3. Set port number and LLM provider
4. Configure Facebook Graph API
5. Create NEW-313- files
6. Initialize post-drafts directory
7. Start agent

### Manual Usage (for testing)

```bash
# Navigate to template
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN

# Install dependencies
npm install

# Start server
node server.js
```

**Access:**
- Chat UI: `http://localhost:8099/`
- Dashboard: `http://localhost:8099/dashboard.html`
- API Status: `http://localhost:8099/api/bot.php?action=status`

---

## Pre-Flight Checklist

Before spawning social media bot from this template:

- ✅ Node.js installed: `node --version`
- ✅ PHP installed: `php -v`
- ✅ Port available (check config.json)
- ✅ Dependencies: `npm install`
- ✅ config.json valid JSON
- ✅ LLM provider reachable (Ollama/Anthropic)
- ✅ Knowledge base files present (social-knowledge/)
- ✅ Facebook Graph API credentials (if using)

---

## Configuration (config.json)

```json
{
  "app": {
    "name": "Social Bot Name",
    "port": 8099,
    "environment": "production"
  },
  "llm": {
    "provider": "ollama",
    "model": "qwen2.5:7b",
    "endpoint": "http://localhost:11434"
  },
  "knowledge": {
    "base_path": "data/social-knowledge"
  },
  "facebook_graph_api": {
    "enabled": true,
    "access_token": "YOUR_TOKEN",
    "permissions": ["pages_read_engagement"]
  }
}
```

**When cloning:** Agent-Dropper updates port, name, and API credentials automatically.

---

## Directory Structure

```
TEMPLATE/
├── api/               ← API handlers (PHP)
│   ├── bot.php        ← Main chat API
│   ├── graph-api.php  ← Facebook integration
│   └── providers/
├── adir/              ← Documentation + logs
├── data/
│   └── social-knowledge/  ← Knowledge base
├── config.json        ← Configuration
├── dashboard.html     ← Web interface
└── server.js          ← Express server
```

---

## Starting a Social Media Bot

### Via Node.js

```bash
node server.js
```

**Output:**
```
Social Bot listening on http://127.0.0.1:8099/
Chat interface available at /
Dashboard available at /dashboard.html
Ready for content generation
```

### Via Batch (Windows)

Agent-Dropper creates appropriate batch files automatically.

---

## Testing the Bot

### Health Check
```bash
curl http://localhost:8099/api/bot.php?action=status
```

### Chat Interface
```bash
curl -X POST http://localhost:8099/api/bot.php?action=chat \
  -d "message=Draft a post about our services"
```

### List Available Tools
```bash
curl http://localhost:8099/api/bot.php?action=tools
```

### Test Facebook Graph API
```bash
curl http://localhost:8099/api/graph-api.php?action=test
```

---

## Knowledge Base Setup

Create files in `data/social-knowledge/`:

- **company-voice.md** - Brand guidelines, tone, style
- **services-and-products.md** - What you offer
- **target-audience.md** - Who you serve
- **campaign-strategy.md** (optional) - Campaign guidelines
- **seasonal-calendar.md** (optional) - Content calendar

Bot reads all .md files automatically for context.

---

## Content Drafting

Bot saves drafts to: `adir/logs/post-drafts/`

**Draft format:**
```
Post Type: Facebook
Suggested Time: [When to post]
Tone: [Confident, Educational, etc]

--- POST CONTENT ---
[The actual post]

--- HASHTAGS ---
#tag1 #tag2

--- NOTES FOR TEAM ---
[Review notes, context]
```

---

## Facebook Graph API

### Configuration

1. Create Facebook app at developers.facebook.com
2. Get Page Access Token
3. Update config.json with token
4. Set required permissions:
   - `pages_read_engagement` - Read posts/insights
   - `pages_manage_posts` - Post to page (future)

### Capabilities

- Read page feeds
- Search for content
- Get engagement metrics
- Get post details
- (Future) Post with approval

---

## Logs & Debugging

**Location:** `adir/logs/`

**Files:**
- `conversations.txt` - Chat history
- `errors.txt` - Error log
- `server-errors.txt` - Server issues
- `post-drafts/` - Generated content
- `fb-feeds/` - Cached Facebook data

---

## Integration with FOB

New social bots created from this template:
- Register with ADIR Hub (9303)
- Connect to Ollama (11434)
- Access Facebook Graph API
- Store drafts in own post-drafts/
- Isolated knowledge base per bot

---

## Important Notes

**For social media agents:**
1. Each agent gets unique port (no conflicts)
2. Knowledge base customized per agent
3. Post drafts isolated to agent directory
4. Logs stored in own adir/logs/
5. Facebook token stored in config.json

---

## Related Files

- [NEW-313-index.md](./NEW-313-index.md) - Overview
- [NEW-313-current.md](./NEW-313-current.md) - Status
- [NEW-313-working.md](./NEW-313-working.md) - Architecture

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\NEW-313-BOOT.md`
**Created:** 2026-03-13
**Status:** ✅ Template
**Last Updated:** 2026-03-13

**This template is used by Agent-Dropper v2 for social media bot deployment.**

**324 Ports and paths are changed ref data**
