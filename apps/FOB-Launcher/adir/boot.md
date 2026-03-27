**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  FOB-LAUNCHER ADIR — BOOT                                            ║
║  Path: apps\FOB-Launcher\adir\boot.md                                ║
║  Updated: 2026-03-22 | Author: Claude                                ║
╠══════════════════════════════════════════════════════════════════════╣
║  READ THIS FIRST when arriving in this directory.                    ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Boot — What Is This Place

You are in the ADIR home for **V3AMFOB**, the Electron desktop launcher for the FOB system.
This is not a service or an agent. It is the shell that runs everything — the tray icon,
the rack panel, the fleet monitor, the iframe browser, and the Control API that ties it all together.

---

## System State (update this when things change)

| Item | State |
|------|-------|
| Launcher builds | Working — packaged as V3AMFOB.exe |
| Control API | Live on port 9399 |
| Rack card buttons | Working — Start / Stop / Restart |
| Tray Scripts submenu | Working — scans C:\FOB for .bat files |
| postMessage bridge | Live — fob-css and fob-skin messages accepted |
| Fullscreen toggle | Working — ⛶ button hides Windows taskbar |
| Service start modes | Working — manual/auto toggle per service in Settings |
| Installer (FOB-Setup.iss) | Up to date — all 22 node_modules + kill on uninstall |
| Ngrok scrub | Clean — no auth tokens in packageable files |
| Pending feature | User-assignable port monitors |

---

## What Was Just Done (session 2026-03-22)

Built the entire launcher from scratch. The major milestones in order:

1. Electron shell — frameless window, tray, IPC bridge, preload.js
2. Service rack — all 19 services, port polling, status badges
3. Skin system — background image, panel opacity, font size, CSS vars
4. Settings modal — endpoints, appearance, service start modes
5. Control API (9399) — start/stop/restart/status for every service
6. Rack card buttons — ▶ / ↺ / ■ using fetch() to Control API
7. Tray submenus — open browser, open folder, start/stop/restart per service
8. Manual vs auto-start per service
9. Tray balloon tip on first window hide
10. Dynamic .bat scanner → tray Scripts submenu
11. Fullscreen toggle (dashboard mode)
12. postMessage CSS bridge — agents can now skin the launcher live

---

## Things to Know Before Touching Code

- Any edit to `main.js`, `app.js`, `style.css`, or `index.html` requires an **asar repack** before it takes effect in the packaged app. Raw file edits do nothing to the running V3AMFOB.exe.
- The Control API is the bridge between iframes/agents and the launcher. Use it. Don't reach for IPC from outside the renderer.
- Rack buttons use `fetch()` to port 9399 directly — not IPC. This is intentional.
- `fob-config.json` is the source of truth for layout, skin, and manual services. The installer ships `fob-config.default.json` which only installs if no config exists yet.
- Repackage instructions: `F:\Claude\REPACKAGE-INSTRUCTIONS.md`

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF boot.md                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
