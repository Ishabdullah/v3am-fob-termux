**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  FOB-LAUNCHER ADIR — WORKING CONTEXT                                 ║
║  Path: apps\FOB-Launcher\adir\WORKING.md                             ║
║  Updated: 2026-03-22 | Author: Claude                                ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Working Context

Running notes on decisions made, constraints discovered, and things that need to stay consistent across sessions.

---

## Architecture Decisions (don't undo these)

**Rack buttons use fetch() not IPC**
Rack card ▶/↺/■ buttons call the Control API directly via `fetch()` to port 9399. They do NOT use IPC. This was deliberate — keeps the pattern consistent for anything that might call from an iframe, and avoids adding IPC channels for a hot path. The button re-enables when `broadcastStatus()` fires back via the existing `status-update` IPC event.

**Control API is the external surface**
Everything outside the renderer (iframes, agents, scripts, external tools) talks to the launcher through port 9399. No exceptions. Don't add IPC handles that duplicate Control API endpoints.

**fob-config.json merge strategy**
`saveConfig()` merges new data over the existing file. This means you can save partial objects (just `skin`, just `endpoints`, just `panels`) without clobbering the rest. Keep it this way.

**Installer ships fob-config.default.json with `onlyifdoesntexist`**
The Inno Setup script copies `fob-config.default.json` as `fob-config.json` only if no config exists. This means user layout and skin survive reinstalls. Do not change the flag to `ignoreversion`.

**MANUAL_SERVICES uses a Set, loaded from config**
`manualServices` in `fob-config.json` is a string array of service IDs that skip auto-start. `spawnAll()` checks `MANUAL_SERVICES.has(svc.id)` — if true, logs `[MANUAL]` and sets status to `down` without spawning.

---

## Open Questions / Future Work

- **User-assignable port monitors**: User can add extra ports to watch (not in SERVICES array) and see them in the rack. Not yet designed.
- **postMessage fob-bg type**: Adding a background image via postMessage would require a file:// URL which only works if the path is local. Deferred — security/path concern.
- **Tray Scripts submenu depth**: Currently scans only C:\FOB top level. If scripts get organized into subdirs, a shallow recursive scan (depth 1) would be a natural next step.

---

## Constraints

- PHP path hardcoded to `C:\FOB\php\php-cgi.exe` in all bat startup scripts
- V3AMFOB CONFIG_PATH hardcoded to `C:\FOB\V3AMFOB\fob-config.json` — intentional, not relative, so the path is consistent no matter how the process is launched
- asar repack required for any renderer or main.js change to take effect in packaged app
- Node >=18 required

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF WORKING.md                                                    ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
