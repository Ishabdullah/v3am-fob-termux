**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - CURRENT STATUS                                        ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-JERRY-CLEAN\adir\current.md                               ║
║  Updated: 2026-03-16 | Template status snapshot.                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This is the current status of the agent template — not a     ║
║  running service. This template is the source material that           ║
║  Agent-Dropper copies to create standard agents.                     ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Current Status

---

## Template State: Ready (with known issues)

TEMPLATE-JERRY-CLEAN is Agent-Dropper v2's primary deployment template. It's not running as a service — it sits in the TOOLS directory waiting to be copied.

**Location:**
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN`

---

## What's Working

| Component | Status | Notes |
|-----------|--------|-------|
| server.js | Ready | Express server, dual route pattern (`/api/` and `/agent/api/`) |
| api/agent.php | Ready | Main chat and operations API |
| api/auto.php | Ready | Automation and task execution |
| api/providers/ | Ready | Ollama, Anthropic, Gemini LLM connectors |
| config.json | Has content | Multi-provider LLM config, search, agent identity, tools, UI |
| dashboard.html | Ready | Multi-tab admin panel |
| index.html | Ready | Chat interface |
| data/ | Ready | Agent data directory |
| upload/ | Ready | File upload directory |

---

## What Needs Attention

**The AGENT_DIR bug is in the template itself.** Line 34 of server.js still has `const AGENT_DIR = path.join(ROOT_DIR, 'agent')`. This is the routing bug that caused 404s on pre-fix agents. Agent-Dropper v2 fixes this during deployment, but the template source file still has the old line. It works for the template because the template actually HAS an `agent/` subdirectory structure, but deployed copies don't always match this layout.

**Config.json contains visible API keys.** Anthropic (`YOUR_ANTHROPIC_API_KEY...`), Gemini (`YOUR_GEMINI_API_KEY...`), and Google Search (`YOUR_GEMINI_API_KEY...`) keys are plainly visible. These should be replaced with placeholders before the template is shared.

**The system prompt references old paths.** The agent identity in config.json references `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\` which is an old deployed agent path, not the template path. It also references TANDRbot (8081), TANDRCRM (9200), and TANDRSocial (8099) — all Era 1 services that no longer exist. The prompt structure (console protocol, wheel protocol, sanity checks) is sound, but the specific service references need updating for new deployments.

**Old documentation files still present.** This adir has files from multiple eras: `CURRENT-STATUS.md`, `SYSTEM_PROMPT.md`, `TOOL-VERIFICATION.md`, `UI-ARCHITECTURE-PLAN.md`, `map.md`, and the `NEW-313-*` files. The new ADIR files replace all navigational docs. Old files can be deleted.

---

## Agents Deployed From This Template

| Agent | Port | Location | Status |
|-------|------|----------|--------|
| Agent1 | 11111 | `apps\Agent1` | Pre-fix deployment |
| Agent2 | 11112 | `apps\Agent2\agent` | Running (agent/ subdir by design) |
| Agent4 | 11113 | `apps\Agent4` | Working (post-fix deployment) |

---

## Recent Changes

**2026-03-16:** ADIR md files rewritten to standard console header/footer format.

**2026-03-15:** Agent-Dropper v2 received the AGENT_DIR routing fix. Agents deployed after this date get the correct `AGENT_DIR = ROOT_DIR` in their server.js.

**2026-03-13:** NEW-313-prefixed documentation created (now superseded by this rewrite).

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF current.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know the template's current state. Your next move:              ║
║                                                                      ║
║  → How the template works under the hood:                            ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\working.md                             ║
║                                                                      ║
║  → Back to this template's index:                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\index.md                                ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this status, create:                                      ║
║  SOT-[YYYYMMDD]-jerry-template-status.md                             ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
