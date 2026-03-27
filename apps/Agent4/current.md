# CURRENT TASKS: TANDRAgent
**Status:** Deployed - VM Production
**Last Updated:** 2026-02-10
**URL:** http://localhost:9200/


These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
---

## SYSTEM OVERVIEW

TANDRAgent is the central operations AI for T&R Builders.
Part of the three-bot system deployed on the client VM.

### Services Running

| Service | Port | Status |
|---------|------|--------|
| TANDRbot | 8081 | Active - Field assistant |
| TANDRAgent (this) | 9200 | Active - Operations hub |
| TANDRSocial | 8099 | Active - Social media |
| ADIR Hub | 9303 | Active - Dashboard |
| Ollama | 11434 | Active - Local LLM |
| ngrok | 4040 | Active - Public tunnel |

### LLM Config
- **Primary:** Anthropic (claude-3-haiku-20240307)
- **Fallback:** Ollama (gemma3:1b)
- **Timeout:** 300s

---

## THREE-BOT LOOP (PROVEN WORKING)

The three-bot communication loop has been tested and verified:

1. Jerry messages TANDRbot (via FB Messenger or web chat)
2. TANDRbot checks its knowledge files for the answer
3. If knowledge is missing, TANDRbot follows tandragent.md protocol and says "let me check with the team"
4. Jerry asks TANDRAgent (this agent) to find the information
5. TANDRAgent reads TANDRbot logs via http_get
6. TANDRAgent creates/updates a knowledge file via file_write + curl POST
7. TANDRbot reads the updated knowledge file and can now answer

### TANDRbot API Reference

| Action | Method | URL |
|--------|--------|-----|
| Read conversation logs | GET | `http://localhost:8081/api/bot.php?action=get_logs&type=conversations` |
| List all knowledge files | GET | `http://localhost:8081/api/bot.php?action=knowledge` |
| Read specific knowledge file | GET | `http://localhost:8081/api/bot.php?action=get_knowledge&file=leads.md` |
| Update/create knowledge file | POST | `http://localhost:8081/api/bot.php?action=update_knowledge` |
| Get bot status | GET | `http://localhost:8081/api/bot.php?action=status` |
| Get system prompt | GET | `http://localhost:8081/api/bot.php?action=get_prompt` |

### Writing Knowledge (2-Step Process)
Windows cmd.exe mangles JSON quotes. Always use temp file approach:
```
Step 1: [TOOL_CALL: file_write | path=data/temp_kb_update.json | content={"file":"leads.md","content":"# Leads\n..."}]
Step 2: [TOOL_CALL: shell_command | command=curl -s -X POST -H "Content-Type: application/json" -d @C:\TandrHub\apps\TANDRCRM\agent\data\temp_kb_update.json http://localhost:8081/api/bot.php?action=update_knowledge]
```

Note: TANDRbot has a knowledge cache_ttl of 300s. First query after an update may use stale cache.

---

## KNOWLEDGE FILES MANAGED

These files live in TANDRbot's `data/knowledge/` directory:

| File | Purpose | Status |
|------|---------|--------|
| about.md | Company info, history | Exists |
| services.md | Services offered | Exists |
| faq.md | Common Q&A | Exists |
| contact.md | Contact information | Exists |
| tandragent.md | Protocol index (when to ask TANDRAgent) | Exists |
| leads.md | Active leads and follow-ups | Exists |

TANDRAgent can create new knowledge files as needed. TANDRbot auto-detects them.

---

## TOOL REFERENCE

| Tool ID | Purpose | Example |
|---------|---------|---------|
| datetime | Current time | `[TOOL_CALL: datetime]` |
| calculate | Math | `[TOOL_CALL: calculate \| expression=2+2]` |
| file_read | Read local file | `[TOOL_CALL: file_read \| path=config.json]` |
| file_write | Write local file | `[TOOL_CALL: file_write \| path=data/temp.json \| content=...]` |
| file_list | List directory | `[TOOL_CALL: file_list \| path=data]` |
| http_get | HTTP GET | `[TOOL_CALL: http_get \| url=http://localhost:8081/api/bot.php?action=status]` |
| shell_command | Shell cmd | `[TOOL_CALL: shell_command \| command=curl ...]` |
| web_search | Google search | `[TOOL_CALL: web_search \| query=construction trends]` |

**CRITICAL:** Tool IDs are `file_write`, `file_read`, `file_list` (NOT write_file, read_file).

---

## COMPLETED FEATURES

- [x] Core agent (scan, chat, memory, context)
- [x] LLM provider switching (Anthropic, Ollama, Gemini)
- [x] Tool execution with CRUD management
- [x] Auto mode UI
- [x] Settings save/load
- [x] Three-bot communication loop
- [x] TANDRbot knowledge file management
- [x] Shell command execution (restricted)
- [x] Web search via Google Custom Search

These ports and paths are out of date 324These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324

