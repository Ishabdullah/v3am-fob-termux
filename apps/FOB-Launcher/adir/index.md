**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  FOB-LAUNCHER ADIR — INDEX                                           ║
║  Path: apps\FOB-Launcher\adir\index.md                               ║
║  Updated: 2026-03-22 | Author: Claude                                ║
╚══════════════════════════════════════════════════════════════════════╝
```

# FOB-Launcher ADIR — Directory Index

This is the ADIR home for the V3AMFOB Electron launcher. Everything an agent or Claude
needs to understand, build, or debug the launcher lives here.

---

## Files in This Directory

| File | Purpose |
|------|---------|
| `index.md` | This file — directory map and orientation |
| `boot.md` | First read on arrival — what is this place, what state it's in |
| `CURRENT.md` | Active task — what is being worked on right now |
| `WORKING.md` | Working context — decisions in progress, constraints, open questions |
| `prompt.md` | Agent prompt template — instructions for agents operating in this context |
| `transfer.md` | Session handoff — what to pass to the next Claude when context ends |
| `SOT-V3AMFOB-LAUNCHER.md` | Full technical reference — architecture, API, changelog, troubleshooting |

---

## Quick Orientation

- **The app lives at:** `C:\FOB\V3AMFOB\`
- **Main files:** `main.js`, `renderer/app.js`, `renderer/style.css`, `renderer/index.html`, `preload.js`
- **Control API:** `http://127.0.0.1:9399` — HTTP endpoints to query and control the fleet
- **Config:** `C:\FOB\V3AMFOB\fob-config.json` — skin, panels, endpoints, manualServices
- **Installer script:** `F:\Claude\FOB-Setup.iss`
- **Repackage instructions:** `F:\Claude\REPACKAGE-INSTRUCTIONS.md`

---

## Start Here

If you just arrived: read `boot.md` first, then `CURRENT.md`, then `SOT-V3AMFOB-LAUNCHER.md` if you need the full technical picture.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF index.md                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
