**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Keys\adir\BOOT.md                                                   ║
║  Updated: 2026-03-16 | The manual — API key management.              ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Keys is a placeholder directory for API key management.      ║
║  Not a service — no port, no server. Currently empty.                ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Keys Directory

This directory is reserved for API key management and credential references. It does not contain a running service.

---

## Current State

Empty. No key management system has been built yet.

---

## Known API Keys in the System

API keys are currently scattered across config.json files in individual services and templates. This is a known issue — keys are exposed in plaintext and duplicated across:

- `TEMPLATE-JERRY-CLEAN/config.json` — Anthropic, Gemini, Google Search keys
- `TEMPLATE-TANDRSOCIAL-CLEAN/config.json` — Anthropic key
- `Agent-Dropper-v2/config.json` — Anthropic, Gemini, Google Search keys
- `GGBOT/config.json` — Anthropic key
- `Parser/ParserBot/config.json` — Anthropic key

All deployed bots and agents inherit these keys from their templates.

---

## Future Purpose

This directory could house:
- A centralized key registry
- Environment variable templates
- Key rotation documentation
- Instructions for replacing placeholder keys with real ones

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this, create:                                             ║
║  SOT-[YYYYMMDD]-keys-boot.md                                        ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
