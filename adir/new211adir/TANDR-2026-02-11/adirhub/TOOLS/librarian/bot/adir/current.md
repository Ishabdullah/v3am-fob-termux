**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-TANDRSOCIAL-CLEAN\adir\current.md                         ║
║  Updated: 2026-03-16 | Template status snapshot.                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the current status of the bot template — not a       ║
║  running service. This template is the source material that           ║
║  Agent-Dropper copies to create social media bots.                   ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Template State: Ready

TEMPLATE-TANDRSOCIAL-CLEAN is one of Agent-Dropper v2's two deployment templates. It's not running as a service — it sits in the TOOLS directory waiting to be copied when someone deploys a `"type": "tandrsocial"` bot.

**Location:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN`

---

## What's Working

| Component | Status | Notes |
|-----------|--------|-------|
| server.js | Ready | Express server, reads port from config.json |
| api/bot.php | Ready | Chat API, content generation, file operations |
| api/graph-api.php | Ready | Facebook Graph API wrapper |
| api/security.php | Ready | Sandboxing and path validation |
| api/providers/ | Ready | Ollama and Anthropic LLM connectors |
| data/social-knowledge/ | Template data | 3 example knowledge files (company-voice, services, audience) |
| dashboard.html | Ready | Web interface for chat and content review |
| config.json | Template config | Port 8099 placeholder, needs real credentials for deploy |
| adir/logs/ | Ready | Directories exist for conversations, post-drafts, fb-feeds |

---

## What Needs Attention

**Config.json contains a visible API key.** The `llm.anthropic.api_key` field has what appears to be a real Anthropic key. This should be replaced with a placeholder (`YOUR_API_KEY_HERE`) in the template, or the key should be rotated if it was ever live.

**No Facebook token configured.** The Graph API fields have placeholder values (`YOUR_FACEBOOK_PAGE_ID`, `YOUR_FACEBOOK_ACCESS_TOKEN`). This is expected for a template — real tokens get set during deployment.

**Old documentation files still present.** This adir directory has files from multiple eras: OLD `BOOT.md`, `CURRENT-STATUS.md`, `SOT-217-index.md`, `SOT_current.md`, `test.md`, and the `NEW-313-*` prefix files. The new ADIR files (BOOT.md, index.md, current.md, working.md) replace all of them. Old files can be deleted by the user.

---

## Template vs. Deployed Bots

This template has never been deployed as a standalone service in the current FOB system. It exists purely as source material for Agent-Dropper. Currently deployed bots that came from this template (if any) would live in the `apps/` directory, not here.

Bot1 on port 11114 may have been deployed from this template — check its directory at `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Bot1` to verify.

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to the standard console header/footer format. Replaces the NEW-313-prefixed files and older documentation.

**2026-03-15:** Agent-Dropper v2 received the AGENT_DIR routing fix. Any bot deployed from this template after this date will have correct routing.

**2026-03-13:** NEW-313-prefixed documentation created (now superseded by this rewrite).

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know the template's current state. Your next move:              ║
║                                                                      ║
║  → How the template works under the hood:                            ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\working.md                       ║
║                                                                      ║
║  → Back to this template's index:                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\index.md                         ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-tandrsocial-template-status.md                      ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
