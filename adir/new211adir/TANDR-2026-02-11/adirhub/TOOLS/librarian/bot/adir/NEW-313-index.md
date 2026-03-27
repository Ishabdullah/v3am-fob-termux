**324 Ports and paths are changed ref data**

# Social Media Bot Template (TANDRSocial Reference)

**Status:** ✅ Template for Agent-Dropper v2
**Version:** 2.0.0
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN`

---

## What Is This?

**TEMPLATE-TANDRSOCIAL-CLEAN** is a reference social media bot template used by Agent-Dropper v2 to spawn agents that draft and manage social media content.

**Purpose:**
- Base structure for social media management agents
- Shows how agents handle knowledge bases and content drafting
- Demonstrates Facebook Graph API integration
- Contains configuration examples for social bots

---

## Template Structure

```
TEMPLATE-TANDRSOCIAL-CLEAN/
├── adir/                  ← Documentation (use NEW-313- prefix)
│   ├── BOOT.md
│   ├── CURRENT-STATUS.md
│   ├── index.md
│   ├── logs/
│   │   ├── conversations.txt
│   │   ├── post-drafts/      ← Where bot saves social media drafts
│   │   └── ...
│   └── data/
├── api/                   ← Bot API (PHP)
│   ├── bot.php
│   ├── graph-api.php      ← Facebook integration
│   └── providers/
├── data/
│   └── social-knowledge/  ← Knowledge base for bot
│       ├── company-voice.md
│       ├── services-and-products.md
│       └── target-audience.md
├── config.json            ← Bot configuration
├── dashboard.html         ← Web interface
└── server.js              ← Express server
```

---

## Key Features

### Knowledge Base Integration
- Reads .md files from `data/social-knowledge/`
- Uses company voice, products, audience data
- Informs all content generation

### Content Drafting
- Generates social media posts
- Saves drafts to `adir/logs/post-drafts/`
- Includes metadata (timing, tone, hashtags, team notes)

### Facebook Graph API
- Reads page feeds
- Searches for trending content
- Gets engagement metrics
- (Future) Posts to page with approval

### Sandboxed Operations
- Restricted file access
- Write only to allowed directories
- No system access

---

## How Agent-Dropper Uses This

1. **Template copy** - Clones entire directory
2. **Configuration** - Updates port, name, knowledge base
3. **Knowledge base** - Customized with company data
4. **Documentation** - NEW-313- files created
5. **API setup** - Graph API token configured
6. **Deployment** - Agent started on port

---

## Key Files (Template Reference)

| File | Purpose |
|------|---------|
| `api/bot.php` | Main chat/content API |
| `api/graph-api.php` | Facebook Graph integration |
| `data/social-knowledge/` | Company knowledge base |
| `dashboard.html` | User interface |
| `config.json` | Agent configuration |
| `adir/logs/post-drafts/` | Generated content storage |

---

## Configuration Example (config.json)

```json
{
  "app": {
    "name": "Social Media Bot Name",
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
    "access_token": "...",
    "permissions": ["pages_read_engagement", "pages_manage_posts"]
  }
}
```

---

## Typical Workflow

1. **Agent boots** - Reads knowledge base
2. **User requests** - "Draft a post about [topic]"
3. **Bot processes** - Reads company voice, services, audience
4. **Content generation** - Creates post with timing, hashtags, notes
5. **Draft saved** - File written to `post-drafts/`
6. **User reviews** - Team approves/edits
7. **Publishing** - Manual or scheduled posting

---

## Knowledge Base Files

Agents created from this template include:

- **company-voice.md** - Brand guidelines, tone, style
- **services-and-products.md** - What the company offers
- **target-audience.md** - Who the company serves
- (Custom additions) - Past posts, seasonal ideas, etc.

---

## Security Model

**Sandboxed access:**
- Read: knowledge base only
- Write: logs/ and post-drafts/ only
- No system file access
- No code execution

**API security:**
- Path validation
- Extension whitelist
- Input sanitization

---

## Related

- **Agent-Dropper v2:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\`
- **General Agent Template:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\`

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\NEW-313-index.md`
**Created:** 2026-03-13
**Status:** ✅ Reference Template
**Last Updated:** 2026-03-13

**This template is used by Agent-Dropper v2 to create social media management agents.**

**324 Ports and paths are changed ref data**
