**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Keys\adir\working.md                                                ║
║  Updated: 2026-03-16 | How API keys work in FOB.                     ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: No key management system exists. This documents how keys     ║
║  currently work across the system.                                   ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How Keys Work in FOB

There is no centralized key management. API keys are stored in plaintext in config.json files across the system. When a bot or agent is deployed, it inherits its template's keys.

---

## Current Key Flow

Templates (`TEMPLATE-JERRY-CLEAN`, `TEMPLATE-TANDRSOCIAL-CLEAN`) have API keys in their config.json files. When Agent-Dropper or KB-Maker deploys a new agent/bot, the template config gets copied and merged. The deployed instance gets the same keys.

Keys found in the system:
- **Anthropic** — `YOUR_ANTHROPIC_API_KEY...` (in most config files)
- **Gemini** — present in JERRY template and Agent-Dropper
- **Google Search** — present in JERRY template and Agent-Dropper

---

## Why This Matters

Exposed keys in config files means:
- Anyone with file access can read them
- They get copied to every deployed bot/agent
- Rotating a key means editing multiple config files
- If the template key is revoked, all deployed instances break

A centralized key management approach would store keys once and let services reference them, making rotation a single-file change.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
