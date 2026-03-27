**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Parser\ParserBot\adir\BOOT.md                                       ║
║  Updated: 2026-03-16 | The manual — how to operate ParserBot.        ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: ParserBot is a knowledge bot that reads parsed business      ║
║  documents. Deployed via KB-Maker v2 on 2026-03-10. Built from       ║
║  the TANDRSOCIAL template. Port needs configuration (see below).     ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Operate ParserBot

ParserBot is a knowledge bot that lets you chat with the parsed business documents in the Parser directory. It was deployed via KB-Maker v2 on 2026-03-10 from the TANDRSOCIAL template. Its knowledge base contains 60+ markdown files: contracts, resumes, financial reports, and agent-generated analysis.

---

## Port Status: NEEDS CONFIGURATION

ParserBot was deployed with port 10108 but the port was not written to config.json at root level. The server.js defaults to 8099 when config.port is missing. Before starting ParserBot, you must add `"port": 10108` (or another available port) to the root of config.json:

```json
{
  "port": 10108,
  "app": { ... }
}
```

---

## Starting and Stopping

**Start:**
```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Parser\ParserBot
node server.js
```
Or double-click `START-PARSERBOT.bat`.

**Stop:** Close the terminal, `Ctrl+C`, or `STOP-PARSERBOT.bat`.

**Prerequisites:** Node.js, `node_modules` installed (or copied from GGBOT), Ollama on port 11434, PHP at `C:\FOB\php\php-cgi.exe`.

---

## The Request Flow

```
Browser (http://127.0.0.1:{port}/)
  → POST /api/bot.php?action=chat
  → Express (server.js) routes to PHP
    → bot.php reads config.json (system prompt, LLM settings)
    → bot.php reads ALL files in data/social-knowledge/ (the parsed docs)
    → bot.php calls Ollama (glm-5:cloud) or Anthropic fallback
  → Response sent to browser
```

---

## Knowledge Base

ParserBot's knowledge is in `data/social-knowledge/` — this contains copies of the parsed business documents from the parent Parser directory. The PHP API reads ALL files in this directory on every message and includes them as LLM context.

**Warning:** With 60+ documents, the total knowledge size likely exceeds the recommended 50KB limit. This may cause issues with LLM context windows. Consider curating a subset of the most important documents, or creating a summary file that the bot can reference first.

---

## Customization Needed

ParserBot is largely uncustomized from the TANDRSOCIAL template. To make it fully functional:

1. **Add port** to config.json root level (currently missing)
2. **Update system_prompt.role** — currently TANDRSocial's social media personality. Should be rewritten as a document analysis assistant
3. **Update app.name** — currently "TANDRSocial"
4. **Update knowledge.base_path** — verify it points to the right directory
5. **Curate knowledge** — trim the knowledge base to fit within LLM context limits

---

## Troubleshooting

**Port conflict** — if port 8099 is taken (another TANDRSOCIAL instance), add a unique port to config.json.

**Knowledge too large** — if the bot gives incomplete or confused answers, the knowledge base is likely exceeding context limits. Curate to the most important documents.

**Bot responds as TANDRSocial** — the system prompt hasn't been customized. Update `config.json` → `system_prompt.role`.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know how to operate ParserBot. Your next move:                  ║
║                                                                      ║
║  → Navigate ParserBot's workspace:                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\ParserBot\adir\index.md                                    ║
║                                                                      ║
║  → The documents ParserBot reads:                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Parser\adir\index.md                                              ║
║                                                                      ║
║  → The factory that created it:                                      ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    KB-Maker-v2\adir\BOOT.md                                         ║
║                                                                      ║
║  To evolve this manual, create:                                      ║
║  SOT-[YYYYMMDD]-parserbot-boot.md                                   ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
