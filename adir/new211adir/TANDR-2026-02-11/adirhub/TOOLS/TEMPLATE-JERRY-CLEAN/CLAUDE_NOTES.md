**324 Ports and paths are changed ref data**

# Session Notes: TANDRAgent
**Project:** T&R Builders Operations Agent
**Port:** 9200 (Node.js + Express + PHP CGI)
**URL:** http://localhost:9200/

---

## Session: 2026-02-10 (VM Deployment)

### Context
This agent (TANDRAgent) is part of the T&R Builders three-bot system:
- TANDRbot (:8081) - Field assistant for reps, owner, estimators
- TANDRAgent/this (:9200) - Operations hub, knowledge management
- TANDRSocial (:8099) - Social media content
- ADIR Hub (:9303) - Dashboard

### LLM Configuration
- **Primary:** Anthropic (claude-3-haiku-20240307)
- **Fallback:** Ollama (gemma3:1b on localhost:11434)
- **Timeout:** 300s

### Key Capabilities
1. Read TANDRbot conversation logs (http_get to :8081)
2. Create/update TANDRbot knowledge files (file_write + curl POST)
3. File operations in local data/ directory
4. Shell commands (curl, dir, etc.)
5. Web search via Google Custom Search

### TANDRbot API
| Action | URL |
|--------|-----|
| Read logs | GET http://localhost:8081/api/bot.php?action=get_logs&type=conversations |
| List knowledge | GET http://localhost:8081/api/bot.php?action=knowledge |
| Read knowledge | GET http://localhost:8081/api/bot.php?action=get_knowledge&file=name.md |
| Write knowledge | POST http://localhost:8081/api/bot.php?action=update_knowledge |

### Writing to TANDRbot (2-step process)
Windows cmd.exe mangles JSON in inline curl. Always use temp file:
1. `[TOOL_CALL: file_write | path=data/temp_kb_update.json | content={"file":"name.md","content":"..."}]`
2. `[TOOL_CALL: shell_command | command=curl -s -X POST -H "Content-Type: application/json" -d @C:\TandrHub\apps\TANDRCRM\agent\data\temp_kb_update.json http://localhost:8081/api/bot.php?action=update_knowledge]`

### Tool IDs
Use `file_write`, `file_read`, `file_list` (NOT write_file, read_file)

### Knowledge Files Managed
- leads.md, about.md, services.md, faq.md, contact.md, tandragent.md

**324 Ports and paths are changed ref data**
