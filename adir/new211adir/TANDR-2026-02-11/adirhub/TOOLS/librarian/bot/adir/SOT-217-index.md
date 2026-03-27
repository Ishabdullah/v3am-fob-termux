**324 Ports and paths are changed ref data**

# TANDRSocial Index - Local Navigation & Integration Map

**Purpose**: Navigate TANDRSocial directory structure without relative paths
**Version**: SOT-217 (2026-02-17)
**Verified By**: @Claude
**Status**: Active

---

## 🎯 This Directory (TANDRSocial)

**Current Location**: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\adir\`

**Service**: TANDRSocial (Social Media Content Management AI)
**Port**: 8099
**Role**: Employee-only social media content strategist - research trends, draft posts, analyze Facebook performance
**Access**: Employee-only (local access, ngrok with auth planned for future)

**Security Model**: Sandboxed - can only read `data/social-knowledge/` and `adir/logs/`, write to `adir/logs/`

**Files in this directory**:
- `BOOT.md` - Service boot configuration and startup instructions (READ ONLY)
- `BOOT.md.bak` - Backup
- `CURRENT-STATUS.md` - Current service status
- `index.md` - Quick reference
- `logs/` - Service logs and drafts directory (write-only for bot)
- `test.md` - Test data
- `test.md.bak` - Backup
- `SOT-217-index.md` - This navigation file

---

## 🔗 Integration Points

### What TANDRSocial Connects To

| Service | Port/Endpoint | Connection | Purpose |
|---------|---------------|-----------|---------|
| Facebook Graph API | HTTPS | API calls | Read feeds, search posts, analytics |
| Ollama (Local LLM) | 11434 | LLM queries | Content drafting, analysis |
| Anthropic API | 443 | LLM queries | Advanced content generation |
| Node.js Server | 8099 | Local | Server framework and routing |
| TANDRCRM | 9200 | (planned) | Share insights with operations |

### What Connects To TANDRSocial

| Consumer | Type | Purpose |
|----------|------|---------|
| TANDR Employees | Internal | Request content ideas, research trends |
| File system | Sandboxed | Post drafts saved to adir/logs/post-drafts/ |
| TANDR operations | Internal | Feed insights to business decisions |
| System Status | Dashboard | Service monitoring |
| Knowledge management | Internal | Update brand guidelines via files |

---

## 📍 Main Navigation (Back to Parent Directories)

### Level Up Navigation

| Directory | Full Path |
|-----------|-----------|
| **Apps Root** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\` |
| **ADIR Root** | `C:\FOB\adir\new211adir\TANDR-2026-02-11\` |
| **ADIR Parent** | `C:\FOB\adir\new211adir\` |
| **FOB Root** | `C:\FOB\` |

### Atlas Master Index

**Return to Atlas for system-wide navigation:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Atlas\adir\template_index.md`

---

## 🏗️ Local Directory Structure

```
TANDRSocial/adir/
├── BOOT.md                          ← Service boot config & startup
├── BOOT.md.bak                      ← Backup
├── CURRENT-STATUS.md                ← Service status
├── index.md                         ← Quick reference
├── logs/                            ← Bot logs and drafts
│   ├── conversations.txt            ← Chat history
│   ├── post-drafts/                 ← Bot-drafted posts (for review)
│   │   └── YYYY-MM-DD-topic.txt     ← Individual post drafts
│   ├── fb-feeds/                    ← Cached feed data
│   └── analytics/                   ← Performance analysis files
├── test.md                          ← Test data
├── test.md.bak                      ← Backup
└── SOT-217-index.md                 ← This navigation file
```

---

## 📋 Related Directories (Same Level - Sister Services)

| Directory | Purpose | Status |
|-----------|---------|--------|
| `../TANDRmgr/adir/` | LLM Manager | [See TANDRmgr index] |
| `../TANDRCRM/adir/` | Operations Hub | [See TANDRCRM index] |
| `../1CRM/adir/` | CRM Dashboard | [See 1CRM index] |
| `../TANDRbot/adir/` | Public Chatbot | [See TANDRbot index] |

---

## 🚀 Quick Path Reference

### To access this service:
```
Chat UI: http://localhost:8099/
Dashboard (edit knowledge): http://localhost:8099/dashboard.html
API Status: http://localhost:8099/api/bot.php?action=status
Config: C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\config.json
Knowledge Base: C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\data\social-knowledge\
Post Drafts: C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\adir\logs\post-drafts\
```

### To access related services:
```
TANDRmgr: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\
TANDRCRM: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\adir\
TANDRbot: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRbot\adir\
1CRM: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\1CRM\adir\
ADIR Hub: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\
Ollama: http://localhost:11434/
```

### Health Checks:
```
TANDRSocial API: curl http://localhost:8099/api/bot.php?action=status
Ollama: curl http://localhost:11434/api/tags
Facebook Graph API: Check config.json access_token validity
```

### Start TANDRSocial:
```
Desktop Shortcut: C:\Users\tandradmin\Desktop\2026Start\START-TANDRSOCIAL.bat
Manual: cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial && node server.js
Full Suite: C:\V3AM\COMMAND-CENTER\01-START-ALL-OFFLINE-2026.bat
```

### Example Workflows:
```
Trend Research: "What's trending in construction this week?"
Post Drafting: "Draft a post about kitchen remodeling tips"
Performance Analysis: "How are our Facebook posts performing?"
Competitor Research: "What are competitors posting about?"
Content Ideas: "Give me 5 post ideas for next week"
```

---

## 📍 Local Navigation Footer

**Current Location**: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\adir\`

**Files in this directory**:
- `BOOT.md` - Boot configuration
- `CURRENT-STATUS.md` - Status
- `index.md` - Quick ref
- `logs/` - Logs and drafts
- `test.md` - Test data
- `SOT-217-index.md` - This navigation file

**Parent Directories** (copy full path to navigate):
1. `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\` - Apps root
2. `C:\FOB\adir\new211adir\TANDR-2026-02-11\` - ADIR root
3. `C:\FOB\adir\new211adir\` - TANDR folder
4. `C:\FOB\` - FOB root

**Sister Services** (same level):
- `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\` - TANDRmgr
- `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\adir\` - TANDRCRM
- `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRbot\adir\` - TANDRbot

**Return to Master Navigation:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Atlas\adir\template_index.md`

---

**To navigate elsewhere: Copy full path above. Use full paths to avoid errors in ever-expanding directory structure.**

---

*SOT-217-index.md | Created: 2026-02-17 | Verified: @Claude*

**324 Ports and paths are changed ref data**
