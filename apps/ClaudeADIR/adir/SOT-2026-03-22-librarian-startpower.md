**324 Ports and paths are changed ref data**

# SOT-2026-03-22 — Librarian + StartPower Integration

**Status:** Testing
**Session:** 2026-03-22

---

## What Was Built

### TEMPLATE-TANDRSOCIAL-v2
Working test copy of the bot template. Lives at:
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-v2`

Changes from CLEAN:
- `bot.php` — added custom provider (agent GET format + OpenAI POST format)
- `bot.php` — fixed key preservation bug in `handleUpdateConfig`
- `dashboard.html` — replaced Facebook Settings tab with LLM Settings tab
- `dashboard.html` — fixed key masking bug (saving config no longer wipes API keys)
- `dashboard.html` — added custom OpenAI-compatible provider panel with format dropdown
- `dashboard.html` — added Quick Reference section below LLM settings
- `server.js` — added `/css/:filename` and `/js/:filename` routes
- `config.json` — added gemini block, custom block (StartPower endpoint), port 57790
- `START-NGROK.bat` — generic ngrok launcher, reads port from config.json

### TEMPLATE-TANDRSOCIAL-CLEAN
KB-Maker source template. Lives at:
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN`

Changes applied:
- `config.json` — replaced TANDRSocial social media prompt with generic Knowledge Bot prompt
- `START-NGROK.bat` — added (every new deploy gets it)

**Every bot KB-Maker deploys now gets START-NGROK.bat and the generic prompt.**

---

## Librarian Bot

**Port:** 57785
**Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Librarian\bot`
**Start:** `START-LIBRARIAN.bat` in that directory
**Chat:** http://127.0.0.1:57785/
**Dashboard:** http://127.0.0.1:57785/dashboard.html

### Configuration
- Provider: `custom` → routes to StartPower at `http://127.0.0.1:57775/api/agent.php?action=chat`
- Format: `agent` (GET with `?input=` param)
- Fallback: disabled

### bot.php Changes (applied manually — reapply after any KB-Maker redeploy)
- Added `callCustomProvider()` function (agent + openai formats)
- Added `custom` case to `getLLMResponse()` and `checkLLMStatus()`
- Added custom key masking in `handleGetConfig()`
- Added `custom` + `format` field to `handleUpdateSettings()` provider loop
- Fixed `handleUpdateConfig()` — preserves API keys on full config save

### System Prompt
Role: The Librarian — reads and writes .md files only, cites sources, no code, no shell execution.
Full prompt in `config.json` under `system_prompt.role`.

### Knowledge Files
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Librarian\bot\data\social-knowledge\`
Currently contains old TANDR Builder social media files. User is replacing with clean stubs.

### Known Issue
KB-Maker redeploy overwrites bot.php with the CLEAN template version (which lacks custom provider).
After any redeploy, re-apply the bot.php changes listed above.
Long-term fix: promote v2 bot.php → CLEAN template.

---

## StartPower Agent

**Port:** 57775
**Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\StartPower`
**Start:** `START-STARTPOWER.bat` in that directory
**UI:** http://127.0.0.1:57775/

### Configuration
- Provider: `local` (Ollama, model: `qwen3.5:4b`)
- Has shell_command tools, HTTP tools, full agent capabilities
- Public via ngrok at v3am.ngrok.app (verify tunnel is active)

### Role in This Setup
StartPower is the engine. The Librarian is the vessel (restrictive GUI + knowledge files).
When a user chats in the Librarian's GUI:
1. Librarian's bot.php loads knowledge files into system prompt
2. Sends user message to StartPower via GET: `?action=chat&input=<message>`
3. StartPower processes with its full agent toolset
4. Response returns through the Librarian GUI

### agent.php Fix Applied
`handleSaveConfig` — added `!empty()` check on model field.
Prevents blank model being saved when Ollama dropdown shows "not running" during settings save.

### Prompt
Being worked on. Current prompt in `config.json` under `agent.system_prompt`.
Goal: generic, no hardcoded paths or port numbers.

---

## START-NGROK.bat (Generic)

Lives in: TEMPLATE-TANDRSOCIAL-v2 and TEMPLATE-TANDRSOCIAL-CLEAN (all future deploys)

Behavior:
1. Kills all running `ngrok.exe` processes
2. Reads port from `config.json` in the bat's own directory
3. Starts `ngrok http <port>` in a new named window

Usage: double-click from any bot folder. No editing required.

---

## Pending

- [ ] Work on StartPower system prompt (remove hardcoded paths/ports)
- [x] Promote v2 bot.php + dashboard.html → TEMPLATE-TANDRSOCIAL-CLEAN (2026-03-22, session 2)
- [x] Fix app.name in CLEAN config.json ("TANDRSocial" → "Knowledge Bot")
- [ ] Clean Librarian knowledge files (user working on)
- [ ] Test Librarian ↔ StartPower pipeline end-to-end
- [ ] Verify Librarian handles [LIST_FILES] and [READ_FILE] commands through StartPower

**324 Ports and paths are changed ref data**
