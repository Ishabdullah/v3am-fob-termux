**324 Ports and paths are changed ref data**

# T&R Builders System Architecture
**Verified by TANDRAgent Audit:** 2026-02-11 19:40 UTC

---

## EXECUTIVE SUMMARY

5 services deployed on fresh build (TANDR-2026-02-11). All operational. Three-bot relay loop working. Knowledge bases exist but one API endpoint is broken (C1 blocking issue).

---

## SERVICE INVENTORY (VERIFIED LIVE)

### 1. TANDRbot (Port 8081) ✅ OPERATIONAL

**Role:** Customer-facing field assistant (sales reps, owners, estimators)

**Status:**
- ✅ Responding on port 8081
- ✅ Chat endpoint working
- ✅ 6 knowledge files loaded
- ⚠️ CURRENT-STATUS.md from old build (2026-02-04, references V3AM paths)

**LLM:** claude-3-haiku-20240307 (Anthropic)

**Knowledge Files (Verified):**
1. about.md — Company info
2. contact.md — Contact information
3. faq.md — Common Q&A
4. leads.md — Active leads (may be stale)
5. services.md — Services offered
6. tandragent.md — Protocol for when to ask TANDRAgent

**API Endpoints:**
- `GET /api/bot.php?action=status` — Service status ✅
- `GET /api/bot.php?action=knowledge` — List knowledge files ✅
- `GET /api/bot.php?action=get_knowledge&file=name.md` — Read specific file ✅
- `POST /api/bot.php?action=chat` — Chat interface ✅
- `POST /api/bot.php?action=update_knowledge` — Write/update knowledge files ✅

**adir/ Documentation:**
- BOOT.md ✅
- CURRENT-STATUS.md ⚠️ (from 2026-02-04, needs update)
- index.md ✅
- PRODUCTION-SERVER.md ✅
- TROUBLESHOOTING.md ✅
- FB-MESSENGER-SESSION.md ✅
- logs/ directory ✅

**Last Tested:** 2026-02-11 ~19:15 UTC (chat: "Hello! How can I assist you today?")

---

### 2. TANDRAgent (Port 9200) ✅ OPERATIONAL

**Role:** Central operations hub, knowledge management, system audit, inter-bot coordination

**Status:**
- ✅ Responding on port 9200
- ✅ Chat endpoint working
- ✅ adir/ properly documented (just fixed)
- ✅ Performing active system audit

**LLM:** claude-haiku-4-5-20251001 (Anthropic), claude-opus-4-6 (help system)

**Capabilities:**
- Read TANDRbot logs via HTTP
- Create/update TANDRbot knowledge files
- Execute shell commands (restricted: dir, ls, type, cat, pwd, etc.)
- File operations in data/ and upload/
- Web search (Google Custom Search)
- System audit & monitoring

**adir/ Documentation:**
- BOOT.md ✅ (just fixed, comprehensive)
- CURRENT-STATUS.md ✅ (just fixed, comprehensive)
- index.md ✅ (just fixed, comprehensive)
- logs/ directory ✅

**Known Limitation:** Cannot copy files to other apps' directories (copy command blocked or restricted)

**Last Tested:** 2026-02-11 ~19:25 UTC (status & chat working)

---

### 3. TANDRmgr (Port 8085) ✅ OPERATIONAL

**Role:** API orchestrator, chat relay hub, internal help system

**Status:**
- ✅ Responding on port 8085
- ✅ Chat relay confirmed working
- ✅ Knows all 3 other services
- ⚠️ adir/ has only stub BOOT.md (44 bytes), missing index.md and CURRENT-STATUS.md

**LLM:** claude-3-haiku-20240307 (main chat), claude-opus-4-6 (help system)

**Architecture:**
- Orchestrates between TANDRbot, TANDRAgent, TANDRSocial
- **Chat relay verified:** Message → TANDRmgr → TANDRAgent → TANDRmgr → Response ✅
- Help system configured (invoked internally when chat fails)
- help-context.md documents how help works (2,200+ words)

**Configured Services:**
- TANDRAgent: http://localhost:9200
- TANDRSocial: http://localhost:8099
- TANDRbot: http://localhost:8081

**API Endpoints:**
- `GET /api/mgr.php?action=status` — Service status & config ✅
- `POST /api/mgr.php?action=chat` — Chat with relay ✅
- `GET /api/mgr.php?action=help` — HTTP 400 (not a direct endpoint, invoked internally)

**adir/ Documentation:**
- BOOT.md ⚠️ (1-line stub only)
- CURRENT-STATUS.md ❌ (missing)
- index.md ❌ (missing)
- logs/ directory ✅

**Data Files:**
- help-context.md (2,200+ words on help system)
- server.js, config.json, package.json, etc.

**Last Tested:** 2026-02-11 ~19:22 UTC (relay: chat forwarded to TANDRAgent, response returned ✅)

---

### 4. TANDRSocial (Port 8099) ✅ OPERATIONAL (with broken knowledge API)

**Role:** Social media content management, employee-only content creation tool

**Status:**
- ✅ Responding on port 8099
- ✅ Server running
- ❌ Knowledge API endpoint broken (HTTP 500)
- ⚠️ adir/ is completely empty

**LLM:** claude-3-haiku-20240307

**Knowledge Files (Physically Exist But Unreachable via API):**
- company-voice.md (2,000+ words, excellent)
- services-and-products.md
- target-audience.md (3,000+ words, excellent)

**Critical Issue C1:** 
```
GET /api/bot.php?action=knowledge
Returns: HTTP 500 Internal Server Error
```
Files exist in `data/social-knowledge/` but API can't read them.

**API Endpoints:**
- `GET /api/bot.php?action=status` — Returns knowledge.files: 0 (broken)
- `GET /api/bot.php?action=knowledge` — HTTP 500 ❌
- `POST /api/bot.php?action=chat` — May work but without knowledge context
- `GET /` — UI loads
- `GET /dashboard.html` — Dashboard loads

**Root .md Files (8 total):**
- BOOT.md
- CLAUDE.md
- CURRENT-STATUS.md
- README.md
- index.md
- QUICK-START.md
- FACEBOOK-APP-SETUP.md
- TESTING-SESSION-2026-02-06.md

**adir/ Documentation:**
- BOOT.md ❌ (missing)
- CURRENT-STATUS.md ❌ (missing)
- index.md ❌ (missing)
- logs/ directory ✅

**Features:**
- Facebook Graph API integration (token needed for live posting)
- Post queue management
- Auto-discovery of posts
- Employee-only access

**Last Tested:** 2026-02-11 ~19:35 UTC (knowledge endpoint returns HTTP 500)

---

### 5. ADIR Hub (Port 9303) ✅ OPERATIONAL

**Role:** System registry, dashboard, project monitoring

**Status:**
- ✅ Responding on port 9303
- ✅ Can scan all projects
- ✅ Registry exists but outdated (missing TANDRmgr & TANDRSocial)

**Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub` (NOT in /apps)

**API Actions:**
- `scan_projects` — Lists all app adir/ directories with file counts ✅
- `read_file` — Read any file in workspace ✅
- `save_file` — Write files (workspace namespace only, rejects external paths)
- `append_file` — Append to files
- `check_status` — Check configured services (reports 6 services but missing TANDRmgr)
- `get_registry` — Get registry (outdated)

**adir/ Documentation (At /adirhub):**
- BOOT.md ✅
- REGISTRY.md ⚠️ (from 2026-02-09, missing 2 services)
- index.md ✅
- current.md ✅
- working.md ✅
- TANDR-VM-PACKAGE.md ✅
- logs/ directory ✅

**Registry Status (2026-02-09, outdated):**
Lists only:
- TANDRbot (8081) ✅
- TANDRCRM (9200, which is TANDRAgent) ✅

Missing:
- TANDRmgr (8085) ❌
- TANDRSocial (8099) ❌

**Last Tested:** 2026-02-11 ~19:35 UTC (scan_projects, check_status, get_registry)

---

### 6. Ollama (Port 11434) ✅ OPERATIONAL

**Role:** Local LLM fallback

**Status:**
- ✅ Running
- ✅ Available as fallback provider
- ⚠️ Not currently used (all services on Anthropic)

---

## CROSS-SERVICE COMMUNICATION

### Three-Bot Relay Loop ✅ VERIFIED WORKING

```
User Message → TANDRmgr (/api/mgr.php?action=chat)
              ↓
         [relay_used: true

**324 Ports and paths are changed ref data**
