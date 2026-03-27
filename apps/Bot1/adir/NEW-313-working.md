**324 Ports and paths are changed ref data**

# Social Media Bot Template - Architecture & Design

**Status:** ✅ Template Reference
**Version:** 2.0.0
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN`

---

## Template Purpose

TEMPLATE-TANDRSOCIAL-CLEAN is a reference architecture for social media content management agents deployed by Agent-Dropper v2.

Shows:
- How to integrate knowledge bases
- Content drafting workflow
- Facebook Graph API integration
- File-based content storage

---

## Architecture

```
User (Employee)
    ↓
Browser: http://localhost:8099/
    ↓
Dashboard (dashboard.html)
    ├── Chat interface
    └── Content review
    ↓
Node.js Server (server.js)
    ↓
API Routes (/api/*)
    ↓
bot.php
├── Reads knowledge base (data/social-knowledge/*.md)
├── Calls LLM (Ollama/Anthropic)
├── Executes requests
└── Writes to files
    ↓
LLM Response
├── Generate content
├── Save drafts to post-drafts/
└── Return to user
    ↓
Facebook Graph API (optional)
├── Read page feeds
├── Search content
└── Get insights
```

---

## Directory Structure

```
Social Media Agent (from template)
├── server.js
│   └── Express HTTP server
│       └── Routes all requests
│
├── api/
│   ├── bot.php
│   │   ├── Chat API
│   │   ├── Content generation
│   │   ├── File operations
│   │   └── Tool execution
│   │
│   ├── graph-api.php
│   │   ├── Facebook integration
│   │   ├── Read feeds
│   │   ├── Get insights
│   │   └── Search posts
│   │
│   ├── security.php
│   │   └── Path validation & sandboxing
│   │
│   └── providers/
│       ├── ollama.php (Local LLM)
│       └── anthropic.php (Cloud LLM)
│
├── data/
│   └── social-knowledge/
│       ├── company-voice.md
│       ├── services-and-products.md
│       └── target-audience.md
│
├── config.json
│   ├── port
│   ├── llm settings
│   ├── knowledge path
│   └── Facebook API token
│
├── dashboard.html
│   ├── Chat UI
│   ├── Content review
│   └── Settings panel
│
└── adir/
    ├── NEW-313-*.md files
    └── logs/
        ├── conversations.txt
        ├── post-drafts/       ← Generated content
        ├── fb-feeds/          ← Cached feed data
        └── errors.txt
```

---

## Data Flow: Content Generation

```
1. User: "Draft a post about our roofing services"
        ↓
2. Dashboard sends: POST /api/bot.php?action=chat
        ↓
3. server.js routes to: bot.php
        ↓
4. bot.php reads:
   - config.json (LLM, port)
   - data/social-knowledge/*.md (company knowledge)
   - User message
        ↓
5. Sends to LLM with knowledge context
        ↓
6. LLM generates response with draft post
        ↓
7. bot.php executes: [SAVE_FILE: post-drafts/...]
        ↓
8. File saved to: adir/logs/post-drafts/[timestamp]-roofing-post.txt
        ↓
9. Response includes:
   - Post preview
   - Suggested timing
   - Hashtags
   - Team notes
        ↓
10. User reviews draft
        ↓
11. Manual post or schedule publication
```

---

## Facebook Graph API Integration

### Read Operations
```
getPageFeed()           → Read posts from company page
searchPosts()           → Search for trending content
getPageInsights()       → Get engagement metrics
getPost()              → Get specific post details
getPostComments()      → Get comment discussions
```

### Data Flow
```
Bot Request
    ↓
graph-api.php
    ↓
Facebook Graph API (HTTPS)
    ↓
Response (JSON)
    ↓
bot.php processes
    ↓
Cached to fb-feeds/
    ↓
Analyzed by LLM
    ↓
User gets insights
```

---

## Knowledge Base System

### Files Read by Bot

```
data/social-knowledge/
├── company-voice.md
│   ├── Brand guidelines
│   ├── Tone & style
│   ├── Content mix
│   └── Hashtag strategy
│
├── services-and-products.md
│   ├── Service descriptions
│   ├── Pricing
│   ├── Timelines
│   └── Warranties
│
└── target-audience.md
    ├── Demographics
    ├── Psychographics
    ├── Pain points
    └── Social behavior
```

### How It Works

1. **On each message** - Bot reads ALL .md files
2. **Content context** - Uses knowledge for generation
3. **Consistency** - All posts align with brand
4. **Updates** - Edit .md files, changes apply immediately
5. **No restart** - Knowledge base reloaded per request

---

## Content Drafting System

### Draft File Format

```
[SAVE_FILE: post-drafts/YYYY-MM-DD-topic.txt]

Post Type: Facebook
Suggested Time: [Day HH:MM]
Tone: [Tone style]

--- POST CONTENT ---
[The actual post text]

--- HASHTAGS ---
#tag1 #tag2

--- NOTES FOR TEAM ---
[Context, CTA, media suggestions]
[END_FILE]
```

### What Gets Generated

- **Posts** - Main social content
- **Metadata** - Timing, tone, CTA
- **Hashtags** - Relevant tags
- **Team notes** - Image suggestions, context

---

## Configuration Template

```json
{
  "app": {
    "name": "Social Media Bot",
    "port": 8099,
    "environment": "production",
    "version": "2.0.0"
  },

  "llm": {
    "provider": "ollama",
    "model": "qwen2.5:7b",
    "endpoint": "http://localhost:11434",
    "temperature": 0.7,
    "max_tokens": 2000
  },

  "knowledge": {
    "base_path": "data/social-knowledge",
    "auto_reload": true
  },

  "api_keys": {
    "anthropic": "sk-...",
    "facebook": "EAABU..."
  },

  "facebook_graph_api": {
    "enabled": true,
    "access_token": "YOUR_TOKEN",
    "version": "v18.0",
    "permissions": [
      "pages_read_engagement",
      "pages_manage_posts",
      "read_insights"
    ]
  },

  "logging": {
    "conversations": "adir/logs/conversations.txt",
    "errors": "adir/logs/errors.txt",
    "post_drafts": "adir/logs/post-drafts/",
    "feed_cache": "adir/logs/fb-feeds/"
  }
}
```

---

## Agent Lifecycle (Spawning)

### When Agent-Dropper Creates Social Bot:

1. **Clone Template**
   - Copy entire TEMPLATE-TANDRSOCIAL-CLEAN
   - Target: `/TOOLS/[CompanyName]-SocialBot/`

2. **Customize Knowledge Base**
   - Update company-voice.md with brand guidelines
   - Update services-and-products.md with offerings
   - Update target-audience.md with customer profile
   - Add custom .md files if needed

3. **Update Configuration**
   - config.json port → assigned port
   - config.json name → agent name
   - facebook_graph_api.access_token → company token

4. **Create Documentation**
   - NEW-313-index.md
   - NEW-313-BOOT.md
   - NEW-313-current.md
   - NEW-313-working.md

5. **Initialize Logs**
   - Create adir/logs/ structure
   - Initialize post-drafts/
   - Create fb-feeds/ if needed

6. **Start Agent**
   - `node server.js`
   - Register with ADIR Hub
   - Listen on assigned port

---

## Sandboxing

**Read Access:**
- `data/social-knowledge/*.md`
- `adir/logs/fb-feeds/*.json`
- Configuration only

**Write Access:**
- `adir/logs/conversations.txt`
- `adir/logs/post-drafts/`
- `adir/logs/errors.txt`

**Blocked:**
- System files
- Other agents' directories
- Code modifications
- Direct system commands

---

## Performance

**Response Times:**
- Status check: ~50ms
- Chat message: 2-5 seconds (LLM dependent)
- Content generation: 3-10 seconds
- Graph API call: 2-5 seconds
- Dashboard load: ~500ms

**Concurrency:**
- Multiple chat requests supported
- LLM processes one at a time
- File operations serialized
- Dashboard remains responsive

---

## Extensibility

### Adding Knowledge Files

1. Create .md in `data/social-knowledge/`
2. Write content
3. Restart agent
4. Bot includes in all future generations

### Adding Graph API Calls

1. Add function to `api/graph-api.php`
2. Call from `api/bot.php`
3. Document in knowledge base
4. Test with bot

### Modifying Dashboard

1. Edit `dashboard.html`
2. Add JavaScript handlers
3. Restart agent
4. Test in browser

---

## Related Documentation

- [NEW-313-index.md](./NEW-313-index.md) - Overview
- [NEW-313-BOOT.md](./NEW-313-BOOT.md) - Startup
- [NEW-313-current.md](./NEW-313-current.md) - Status
- Agent-Dropper v2: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\`
- General Agent Template: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\`

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\adir\NEW-313-working.md`
**Created:** 2026-03-13
**Status:** ✅ Template Reference
**Last Updated:** 2026-03-13

**This is the reference architecture for all social media bot deployments via Agent-Dropper v2.**

**324 Ports and paths are changed ref data**
