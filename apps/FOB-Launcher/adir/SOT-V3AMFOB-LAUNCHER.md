**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  V3AMFOB LAUNCHER — SOURCE OF TRUTH                                  ║
║  Path: apps\FOB-Launcher\adir\SOT-V3AMFOB-LAUNCHER.md               ║
║  Updated: 2026-03-22 rev2 | Author: Claude                           ║
╠══════════════════════════════════════════════════════════════════════╣
║  READ THIS if you are:                                               ║
║  - An agent trying to control or customize the launcher              ║
║  - A user trying to change how the app looks or behaves              ║
║  - A Claude instance helping to build or debug FOB                   ║
╚══════════════════════════════════════════════════════════════════════╝
```

# V3AMFOB Launcher — Complete Technical Reference

V3AMFOB is the Electron desktop application that launches, monitors, and controls all FOB services. It is the primary entry point for the system. This document covers everything an agent, user, or developer needs to understand and extend it.

---

## Architecture Overview

```
V3AMFOB.exe (Electron)
├── main.js          ← Main process: spawns services, tray, IPC, Control API
├── preload.js       ← Bridge: exposes safe IPC channels to the renderer
├── renderer/
│   ├── index.html   ← App window HTML skeleton
│   ├── app.js       ← UI logic: rack panel, log panel, dragging, skin, config
│   └── style.css    ← All visual styles, CSS variables
├── assets/
│   └── icon.ico     ← App and tray icon
└── fob-config.json  ← Persisted user config (panel positions, skin, endpoints)
```

**Two processes, one bridge:**
- **Main process** (`main.js`) — has full Node.js access. Spawns services, reads files, controls the tray, runs the Control API HTTP server.
- **Renderer process** (`renderer/app.js`) — runs in a sandboxed browser context. Cannot access Node.js directly. Communicates with main via `preload.js` IPC channels.
- **Iframes** (agents loaded inside the app) — run in a separate browser origin (`127.0.0.1:PORT`). They **cannot** access the renderer DOM or call IPC directly. They communicate via the **Control API** (HTTP on port 9399).

---

## What's Been Built (changelog for future Claude)

| Date | Change | Files |
|------|--------|-------|
| 2026-03-22 | Rack/log panels start hidden by default | `renderer/app.js` |
| 2026-03-22 | Tray balloon tip on first window hide | `main.js` |
| 2026-03-22 | profile.ico set as app + tray icon | `assets/icon.ico` |
| 2026-03-22 | Tray right-click → submenu per service: Open browser + Open folder | `main.js` — `buildTrayMenu()` |
| 2026-03-22 | Tray submenu → Start / Stop / Restart per service | `main.js` — `buildTrayMenu()` |
| 2026-03-22 | Rack cards → ▶ Start / ↺ Restart / ■ Stop buttons | `renderer/app.js` — `buildCard()`, `updateCard()` |
| 2026-03-22 | Card button CSS (`.card-btn`, `.card-controls`) | `renderer/style.css` |
| 2026-03-22 | Manual vs auto-start toggle per service in Settings | `main.js`, `renderer/app.js`, `index.html`, `style.css` |
| 2026-03-22 | Uninstaller expanded — all 22 node_modules + kill V3AMFOB on uninstall | `F:\Claude\FOB-Setup.iss` |
| 2026-03-22 | Ngrok scrub — confirmed clean, no auth tokens in packageable files | audit only |
| 2026-03-22 | Dynamic bat scanner → tray 📜 Scripts submenu (`scanBats()`) | `main.js` |
| 2026-03-22 | Fullscreen toggle button (⛶) hides Windows taskbar — dashboard mode | `main.js`, `renderer/app.js`, `renderer/index.html` |
| 2026-03-22 | postMessage CSS bridge wired — agents can now skin the launcher live | `renderer/app.js` |

**Not yet built (next up):**
- User-assignable port monitors

---

## The Control API (Port 9399)

The primary way any agent or external script controls the launcher. Runs as a plain HTTP server in the main process. No auth — localhost only.

### Endpoints

| Method | Endpoint | Returns |
|--------|----------|---------|
| `GET` | `http://127.0.0.1:9399/status` | Full fleet status JSON |
| `GET` | `http://127.0.0.1:9399/status/:id` | Single service status |
| `POST` | `http://127.0.0.1:9399/restart/:id` | Kill + respawn a service |
| `POST` | `http://127.0.0.1:9399/start/:id` | Start a downed service |
| `POST` | `http://127.0.0.1:9399/stop/:id` | Stop a running service |

### Status Response Shape

```json
{
  "ok": true,
  "services": [
    {
      "id":     "librarian",
      "name":   "Librarian",
      "port":   57785,
      "group":  "KB Agents",
      "status": "up",
      "owned":  true
    }
  ]
}
```

`owned: true` means V3AMFOB spawned this process and can stop it. `owned: false` means the service was adopted (already running when FOB started) — FOB can monitor it but cannot stop it.

### Status values
- `"up"` — port is responding
- `"starting"` — process spawned, port not yet open
- `"down"` — port not responding, process not running

### Service IDs (for API calls)

| ID | Service |
|----|---------|
| `adir-hub` | ADIR Hub (9303) |
| `kb-maker` | KB-Maker v2 (9220) |
| `agent-dropper` | Agent-Dropper v2 (9210) |
| `tandrmgr` | TANDRmgr-lab (8086) |
| `fob-server` | FOB Server (8100) |
| `agent-one` | Agent One (11111) |
| `agent-two` | Agent Two (11112) |
| `agent-four` | Agent Four (11113) |
| `bot-one` | Bot One (11114) |
| `ggbot` | GGBot (10336) |
| `ggbot-kb` | GGBot @KBMkr (10333) |
| `memorybot` | Memory Bot (8091) |
| `visionbot` | VisionBot (10337) |
| `parserbot` | ParserBot (10108) |
| `startpower` | StartPower (57775) |
| `librarian` | Librarian (57785) |
| `tandrsocial` | TANDRSocial (57790) |
| `imagegen` | ImageGen (9230) |
| `proxy` | Proxy25565 (25565) |

### Using the Control API from inside an agent (iframe)

Agents are loaded inside the V3AMFOB iframe. The Same-Origin Policy blocks DOM access to the parent window — but the Control API needs no DOM access. Call it directly from your agent's JS:

```javascript
// Poll fleet status every 5 seconds
async function getFleetStatus() {
  const res = await fetch('http://127.0.0.1:9399/status');
  return await res.json();
}

// Restart a service
async function restartService(id) {
  const res = await fetch(`http://127.0.0.1:9399/restart/${id}`, { method: 'POST' });
  return await res.json();
}
```

This works from **any** origin — your agent's HTML, a knowledge bot, StartPower responses, anything running in the FOB ecosystem.

---

## Customizing the Launcher via Agent HTML Responses

StartPower and other agents render HTML responses inside the V3AMFOB iframe. Because the iframe has its own DOM, **an agent's HTML response can inject CSS that styles the agent's own panel** — but it cannot reach outside the iframe into the parent Electron window due to Same-Origin Policy.

### What agents CAN do from inside an iframe

- Full CSS control over their own HTML — layout, colors, fonts, animations
- JavaScript execution — fetch calls, DOM manipulation, localStorage
- Call Control API (port 9399) to show fleet status, restart services
- `window.open()` to open new browser tabs
- `postMessage` to the parent window — **this is the exception**: the Electron renderer has a live `postMessage` handler (as of 2026-03-22)

### postMessage bridge (current status: ✅ LIVE)

The renderer (`app.js`) has a `window.addEventListener('message', ...)` handler. Agents can send commands from inside their iframe and the launcher applies them immediately — no reload, no IPC.

#### Message type 1 — set a CSS variable

```javascript
// From inside an agent iframe (e.g. a StartPower HTML response):
window.parent.postMessage({ type: 'fob-css', var: '--accent', value: '#ff6600' }, '*');
window.parent.postMessage({ type: 'fob-css', var: '--text',   value: '#ffffff' }, '*');
```

Sets any CSS variable on `:root` in the Electron renderer immediately. Use for accent color, text color, font size.

#### Message type 2 — patch the skin

```javascript
// Merge a partial skin update over whatever is currently applied:
window.parent.postMessage({
  type: 'fob-skin',
  skin: {
    panelOpacity: 0.4,
    fontSize: 16,
    textColor: '#00ff88'
  }
}, '*');
```

Only the keys you include are changed. The rest of the skin (background image, position, etc.) stays as-is. Valid keys match the skin config shape: `textColor`, `fontSize`, `panelOpacity`, `imageOpacity`, `imagePosX`, `imagePosY`, `imageScale`.

#### What StartPower / agents can do with this

Include a `<script>` block in the HTML response:

```html
<script>
// On page load, tell the launcher to shift to a dark amber theme
window.parent.postMessage({ type: 'fob-css', var: '--accent', value: '#ffaa00' }, '*');
window.parent.postMessage({ type: 'fob-skin', skin: { panelOpacity: 0.6 } }, '*');
</script>
```

This gives agents live control over:
- Accent color (borders, highlights, active states)
- Text color
- Font size
- Panel opacity (glass effect intensity)
- Background image position and opacity

---

## CSS Variables (Renderer Skin System)

The renderer exposes these CSS variables on `:root` that can be changed at runtime:

| Variable | Default | Controls |
|----------|---------|----------|
| `--accent` | `#00d9ff` | Accent color (borders, highlights) |
| `--font-size-base` | `14px` | Base font size |
| `--text` | `#c8d6e5` | Primary text color |

Applied via `applySkin()` in `app.js`:
```javascript
root.style.setProperty('--font-size-base', skin.fontSize + 'px');
root.style.setProperty('--text', skin.textColor);
```

Panel opacity is applied dynamically via an injected `<style>` tag with id `skin-opacity-style`.

### Skin config shape (in fob-config.json)

```json
{
  "skin": {
    "imagePath":      "C:/path/to/bg.jpg",
    "imageScale":     100,
    "imagePosX":      50,
    "imagePosY":      50,
    "imageOpacity":   0.6,
    "panelOpacity":   0.85,
    "fontSize":       19,
    "textColor":      "#c8d6e5",
    "trayImagePath":  "profiletray.jpg"
  }
}
```

---

## Rack Card Start/Stop — How It Works

Cards call the Control API directly via `fetch()` — no IPC needed. `cardAction(id, action)` in `app.js` posts to `http://127.0.0.1:9399/{action}/{id}`. The button shows `…` while waiting. When main processes the action it calls `broadcastStatus()` which sends a `status-update` IPC event to the renderer, which calls `updateCard()` to re-enable and recolor the buttons.

**Button states:**
- ▶ Start — green, enabled only when service is `down`
- ↺ Restart — yellow, always enabled
- ■ Stop — red, enabled only when service is `up` or `starting`

**Stop limitation:** Stop only works on services V3AMFOB owns (`owned: true`). Adopted services (running before FOB launched) show stop as enabled in the tray only if owned — in the rack the button is always shown but the API returns a note if the process isn't owned.

---

## IPC Channels (Renderer ↔ Main)

The renderer calls these via `window.fob.*` (exposed through `preload.js`):

| Channel | Direction | Description |
|---------|-----------|-------------|
| `get-endpoints` | renderer → main | Get saved endpoint list |
| `get-logs` | renderer → main | Get log buffer for a service ID |
| `restart-service` | renderer → main | Restart a service by ID (rack uses Control API fetch instead) |
| `save-config` | renderer → main | Persist config to fob-config.json |
| `get-config` | renderer → main | Read full config |
| `open-file-dialog` | renderer → main | Open OS file picker |
| `open-url` | renderer → main | Open URL in default browser |
| `window-control` | renderer → main | minimize / maximize / close |
| `tray-action` | renderer → main | Tray balloon / tray commands |
| `status-update` | main → renderer | Broadcast service status change |
| `log-line` | main → renderer | Stream a log line to the UI |

---

## fob-config.json — Persisted State

Lives at `C:\FOB\V3AMFOB\fob-config.json`. Written by `save-config` IPC call.

```json
{
  "endpoints": [
    { "label": "🤖 Librarian", "url": "http://127.0.0.1:57785/" },
    { "label": "🌐 FOB Remote", "url": "https://v3am.com/FOB/" }
  ],
  "skin": { ... },
  "panels": {
    "header":    { "x": 0,  "y": 0,   "w": 1920, "h": 40  },
    "rack":      { "x": 0,  "y": 40,  "w": 480,  "h": 800 },
    "log":       { "x": 480,"y": 40,  "w": 480,  "h": 400 },
    "iframe":    { "x": 0,  "y": 840, "w": 1920, "h": 600 }
  },
  "globalZoom": 0.75
}
```

Agents can read this via the Control API if an endpoint is added. Currently not exposed — only the renderer reads it directly via IPC.

---

## Source Files — Where to Make Changes

| What you want to change | File |
|------------------------|------|
| Add a new service to the fleet | `C:\FOB\V3AMFOB\main.js` — SERVICES array |
| Change tray menu behavior | `main.js` — `buildTrayMenu()` |
| Add a Control API endpoint | `main.js` — `startControlAPI()` |
| Change rack panel layout / cards | `renderer/app.js` |
| Change visual styles | `renderer/style.css` |
| Change default endpoints (iframe URLs) | `main.js` — `DEFAULT_ENDPOINTS` |
| Add a postMessage listener (iframe bridge) | `renderer/app.js` |
| Change app / tray icon | `assets/icon.ico` |
| Change default config shipped with installer | `F:\Claude\FOB-PACKAGE\fob-config.default.json` |

---

## How to Repackage After Changes

Any change to `main.js`, `app.js`, `style.css`, or `index.html` requires an asar repack before the changes take effect in the packaged app. Full instructions: `F:\Claude\REPACKAGE-INSTRUCTIONS.md`

Quick version:
1. Kill V3AMFOB.exe
2. Run the asar repack node script (copies the 5 renderer files + assets into the asar)
3. Snapshot FOB-services + copy win-unpacked
4. Run ISCC.exe

---

## Troubleshooting

**Control API not responding (port 9399)**
- V3AMFOB must be running. The API only exists while the Electron app is open.
- Check the log panel for `[API] Control API listening` — if missing, the port may be in use.
- Emergency: kill V3AMFOB and relaunch.

**Agent can't reach Control API from iframe**
- Confirm you're using `http://127.0.0.1:9399/` not localhost (same thing, but be consistent)
- CORS is open (`Access-Control-Allow-Origin: *`) — should work from any origin
- Check browser devtools in the iframe for network errors

**CSS changes not applying after edit**
- If you edited source files, you need to asar repack. Changes to source files don't auto-update the running app.
- If you're injecting CSS at runtime via JS, it applies immediately.

**postMessage from iframe not received**
- The bridge is live in `app.js`. Supported types: `fob-css` (set a CSS var) and `fob-skin` (merge skin patch).
- Make sure you're posting to `window.parent` — not `window` or `window.top`.
- Check that the target origin is `'*'` — the bridge accepts all origins.
- Verify the Electron app has been repacked with the latest `app.js` — source file edits don't auto-update the packaged app.

**Service shows ❌ but is actually running**
- The port scanner polls every 5 seconds. Wait one cycle.
- If it stays red: check the log panel for that service — look for `[ERR]` or `[EXIT]` lines.
- Also check if something else grabbed the port: `netstat -ano | findstr :PORT`

---
```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF SOT-V3AMFOB-LAUNCHER.md                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Key things to know:                                                 ║
║  → Control API at 9399 is the bridge from iframe/agents to launcher  ║
║  → Rack card buttons use fetch() to 9399 directly — not IPC         ║
║  → Tray start/stop runs inline in buildTrayMenu() in main.js         ║
║  → postMessage bridge IS LIVE — fob-css and fob-skin types work now  ║
║  → Tray Scripts submenu auto-scans C:\FOB for .bat files             ║
║  → fob-config.json is the source of truth for layout + skin          ║
║  → Any code change needs asar repack to take effect in packaged app  ║
║  → Changelog table at top of this file tracks what's been built      ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
