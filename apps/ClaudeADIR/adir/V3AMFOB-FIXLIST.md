**324 Ports and paths are changed ref data**

# V3AMFOB — FIX & FEATURE LIST
*Planning doc — no code yet. Work through sections in order.*
*Last updated: 2026-03-22 (rev 3)*

---

## SECTION 1 — BROKEN SERVICES (fix first)

### 1.1 TANDRmgr-lab not loading
- Port: 8086
- Path: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab`
- Likely: node_modules missing, server.js crash on startup, or port conflict
- Check: logs in V3AMFOB rack panel, or run `node server.js` manually in that dir

### 1.2 Memory Bot not loading
- Port: 8091
- Path: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot`
- Headless service — no UI, just HTTP at http://127.0.0.1:8091/
- Lives in TANDRmgr-lab's sub-directory `bot\`
- Likely: same node_modules issue or not being spawned at all
- Check: is it in SERVICES list in main.js? Is its cwd correct?

### 1.5 REGISTRY.md — code dependency issue
- Librarian tried to edit REGISTRY.md, user stopped it — has code dependencies
- Do not auto-edit. Investigate what reads it, then fix properly
- Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md (likely)

### 1.6 Agent Two TANDRbot port 8081 down
- Librarian audit: Agent Two has path discrepancy causing TANDRbot (8081) to not load
- Agent Two itself (11112) may be up but its sub-service is broken
- Investigate cwd path in SERVICES or Agent Two's own config

### 1.4 TANDRSocial sub-API port 8099 HTTP 500
- Librarian reported API on 8099 failing
- Main TANDRSocial port is 57790 — 8099 may be a sub-API or old reference
- Physical .md files in data/social-knowledge/ are intact
- Investigate: what serves 8099 and why is it 500ing

### 1.3 Bot1 not loading
- Port: 11114
- Path: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Bot1`
- Check: server.js exists, node_modules present, port free

---

## SECTION 2 — TRAY IMPROVEMENTS

### TRAY STATUS (current behavior for reference)
- Left click → opens floating tray popup panel
- Right click → live server list (rebuilds from status Map on every status change)
- Each service entry clicks through to http://127.0.0.1:PORT/ in browser
- Services are hardcoded — not user-configurable yet

### 2.1 Right-click tray → Open file location per service
- Add "Open folder" submenu or secondary click per service entry
- Opens Windows Explorer to that service's cwd directory
- Lets user manually refire a bat or inspect files without digging
- Implementation: `shell.openPath(svc.cwd)` in Electron main process

### 2.2 Right-click tray → Start/Stop per service
- See Section 3 — tray is one entry point for service control

### 2.3 User-assignable ports to monitor
- Currently only services hardcoded in SERVICES array are watched
- Goal: user can add a custom port (and label) in Settings to monitor
- Shows in rack and tray just like a built-in service (adopt mode — no spawn)
- Useful for external tools, Ollama, SD WebUI, etc.
- Save custom monitors to fob-config.json under "monitors" key

---

## SECTION 3 — SERVICE CONTROL (big feature)

### 3.1 Start/stop individual services from the Electron app
- Currently: V3AMFOB spawns all services on launch and that's it
- Goal: user can start and stop any individual service from inside the app
- Entry points: rack panel card buttons AND tray right-click menu
- Each service card in the rack gets a ▶ Start / ■ Stop button
- Tray context menu gets Start/Stop next to each service entry

### 3.2 Fire individual .bat files
- Some services have their own start bat (e.g. START-GGBOT.bat, START-ScreenStream.bat)
- Option A: V3AMFOB spawns node directly (already does this)
- Option B: V3AMFOB fires the service's own .bat — keeps it consistent with manual startup
- Decision needed: which approach per service? Some may need the bat for env setup

### 3.3 "Start on demand" mode
- Not every service needs to run all the time
- Allow user to mark services as "manual" vs "auto-start"
- Auto-start fires on V3AMFOB launch (current behavior)
- Manual services sit as ❌ until user clicks Start
- Save this preference to fob-config.json per service id

### 3.4 Restart from rack panel
- Already exists (restart button per card) — verify it works correctly
- Should kill the process and respawn with same spawn logic

---

## SECTION 4 — INSTALLER / PACKAGE FIXES

### 4.1 Uninstaller needs to clean all node_modules
- Current uninstaller only removes 4 service node_modules
- Need to expand to all 22 services
- Also option: "Remove C:\FOB entirely" checkbox

### 4.2 Default layout on fresh install
- Panel positions are based on user's screen — may look different on other resolutions
- Consider a "reset layout" button in Settings
- Or detect screen size on first launch and scale positions proportionally

---

## SECTION 5 — ASSETS & BRANDING

### 5.0 Desktop shortcut icon — this PC
- Use profile.jpg (confirmed by user)
- profile.ico already set as assets\icon.ico — tray and app icon are correct
- Desktop shortcut icon on this PC may still show old icon — restart V3AMFOB to pick up new icon.ico
- For installer: Inno Setup [Icons] section can specify IconFilename: pointing to a .ico
  — need to convert profile.jpg → profile.ico OR use existing profile.ico from Downloads
- profile.ico source: C:\Users\TheLast\Downloads\profile.ico

### 5.1 Update FOB Server help page
- URL: http://127.0.0.1:8100/help.html
- Path: C:\FOB\help.html (served by fob-server.js on port 8100)
- CSS and design: KEEP AS-IS — looks great
- Logo: references assets/logo.jpg and assets/logo.ico — confirm those exist at C:\FOB\assets\

**CONTENT THAT NEEDS REWRITING:**

- "Starting Up" section
  - OLD: "Double-click Launcher.bat" → WRONG, primary launcher is now V3AMFOB.exe (desktop shortcut or C:\FOB\V3AMFOB\V3AMFOB.exe)
  - OLD: "Command Center (the page you came from)" → no longer the entry point
  - NEW: launch V3AMFOB, it starts all services automatically, rack panel shows status

- "Shutting Down" section
  - OLD: references MasterSTOP.bat at long path → WRONG
  - NEW: click X on V3AMFOB (goes to tray, services keep running) OR right-click tray → Quit to kill everything
  - Alternative: STOP-ALL2.bat at C:\FOB\STOP-ALL2.bat

- "Where Things Live" table — update entries:
  - Launcher: C:\FOB\Launcher.bat → V3AMFOB desktop shortcut / C:\FOB\V3AMFOB\V3AMFOB.exe
  - Stop everything: MasterSTOP.bat → C:\FOB\STOP-ALL2.bat
  - Keep: Agent configs, Agent-Dropper 9210, KB-Maker 9220

- "Quick Reference — Ports" table — add missing services:
  - FOB Server: 8100 (this page)
  - ScreenStream: 9240
  - StartPower: 57775
  - Librarian: 57785
  - TANDRSocial: 57790
  - ImageGen: 9230
  - VisionBot: 10337
  - GGBot KB: 10333

- Troubleshooting section:
  - Replace all "MasterSTOP.bat" references with "STOP-ALL2.bat"
  - Replace all "Launcher.bat" references with "V3AMFOB"
  - "Services won't start" → "Open the rack panel in V3AMFOB to see service logs"

- Back link: href="index.html" → either remove or point to V3AMFOB (can't link to a desktop app, just remove the back button)

## SECTION 6 — POLISH

### 6.1 Loading/splash state
- App currently loads blank until services are adopted/spawned
- Consider a brief loading indicator on the iframe while Librarian spins up

### 6.2 Service card icons
- Each service card in the rack could show its icon from assets\icons\
- Map service id → icon file

### 6.3 Settings — "Start on demand" toggles
- UI in settings panel to toggle auto-start vs manual per service
- Saves to fob-config.json

---

---

## SECTION 7 — NGROK SCRUB (pre-package task)

### 7.1 Find and sanitize all ngrok auth tokens in bat files
- Before every package build: find all .bat files under C:\FOB that contain "ngrok"
- Replace the auth token / env variable value with placeholder: `YOUR_NGROK_TOKEN`
- This is a find-replace pass on bat files only, not touching anything else
- Quick scan command to find them all:
  `grep -rl "ngrok" C:\FOB --include="*.bat"`

### 7.2 What to keep vs scrub
- **KEEP:** `v3am.ngrok.app` references — this is a public URL, not a secret, fine to ship
- **KEEP:** The bat files themselves — user changes the token when they set up their own ngrok
- **SCRUB:** Any `ngrok authtoken XXXX` or `NGROK_TOKEN=XXXX` env lines in bats
- **SCRUB:** Any config files that store the auth token

### 7.3 StartPower exception
- StartPower (`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\StartPower\`) contains live ngrok auth
- User will DELETE the StartPower directory manually right before packaging — do not touch it
- After next package build StartPower can be rebuilt/re-added fresh

### 7.4 Timing
- Do this pass LAST, right before snapshot + ISCC compile
- After scrub: spot-check a few bats to confirm token is gone
- Do NOT commit or package until confirmed clean

---

## SECTION 8 — LIBRARIAN + CONTROL API INTEGRATION

### 8.0 Brief the Librarian on the Control API

- The Librarian asked "how do I control the fleet from inside an iframe?"
- Answer: Control API at port 9399 is ALREADY the bridge. No DOM access needed.
- Next conversation with Librarian, tell it:
  "GET http://127.0.0.1:9399/status returns full fleet JSON.
   POST to /restart/:id, /start/:id, /stop/:id to control any service.
   Build your fleet dashboard using this — you don't need DOM access."
- Librarian can then show live fleet status + restart buttons inside its own UI

### 9.1 Librarian fleet status widget
- Librarian builds a live panel in its UI that polls GET /status every 5s
- Shows all services with ✅/🟡/❌ and a restart button per service
- This makes Librarian a full system monitor visible in the V3AMFOB iframe
- No V3AMFOB code change needed — pure Librarian-side HTML/JS

### 9.2 Librarian new user onboarding flow
- Current welcome assumes T&R Builders context — needs to be user-agnostic
- First message to new user should NOT mention T&R — just introduce the system
- Offer: "What is your mission?" → creates their first SOT-USER-INIT.md
- T&R history stays as provenance but never surfaces to the new user

---

## SECTION 9 — DYNAMIC BAT SCANNER (new feature)

### 9.1 Overview
The system is not static — KB-Maker v2 and Agent-Dropper generate new agents with their own START/STOP bats.
V3AMFOB should discover these automatically instead of requiring a code change each time.

### 9.2 Bat scanner — how it works
- On V3AMFOB startup: recursively scan C:\FOB for all *.bat files
- Build a list grouped by directory
- Show in tray under a "Scripts" submenu — user can fire any bat from the tray
- Refresh the list periodically (every 30s) or watch for new files with fs.watch
- Filter: skip STOP-*.bat from the "run" list (or show separately as stop actions)
- Skip node_modules, dist directories

### 9.3 Tray integration
- Tray right-click → "Scripts" submenu → grouped by service/directory
- Each entry shows bat filename, click fires it via `shell.openPath()` or `spawn(bat)`
- Newly created agent bats (from KB-Maker/Agent-Dropper) appear automatically on next scan
- No restart of V3AMFOB needed to see new agents

### 9.4 Rack panel integration (stretch)
- Service cards for dynamically discovered agents (port not yet known)
- When a new agent bat is found AND the agent's port is detectable (from config.json in same dir)
  it gets adopted into the rack as a monitor-only card
- This closes the loop: deploy agent → bat appears → port adopted → rack shows status

### 9.5 Implementation notes
- Scanner runs in main process (main.js)
- Results sent to renderer via IPC or exposed via Control API GET /bats
- fs.watch is preferred over polling for real-time pickup
- Bat execution: `spawn('cmd', ['/c', batPath], { cwd: batDir, detached: true })`
- Do NOT use shell.openPath for bats — it opens the file, not runs it

---

## CODING ORDER (suggested)

1.  Fix broken services (Section 1) — diagnose and fix one at a time
2.  Update help.html content (Section 5.1) — quick, needed before next package
3.  Tray right-click open folder (Section 2.1) — small, high value
4.  Start/stop from rack cards (Section 3.1) — medium, transforms usability
5.  Manual vs auto-start (Section 3.3) — pairs naturally with 3.1
6.  Dynamic bat scanner — tray Scripts menu (Section 8.1-8.3) — unlocks self-growing system
7.  User-assignable port monitors (Section 2.3) — pairs with bat scanner
8.  Tray start/stop submenu (Section 2.2) — after rack cards work
9.  Rack adoption of dynamically discovered agents (Section 8.4) — stretch
10. Uninstaller cleanup (Section 4.1) — do right before next package build
11. Polish (Section 6) — last

**PRE-PACKAGE CHECKLIST (run before every build):**
- [ ] Ngrok scrub pass on all bats (Section 7.1)
- [ ] Delete StartPower directory (Section 7.3)
- [ ] Asar repack (see REPACKAGE-INSTRUCTIONS.md)
- [ ] Update fob-config.default.json from live config
- [ ] Run ISCC, verify output size is sane
- [ ] Spot-check bat files in installer — no auth tokens

---

## NOTES
- No code changes until each item is discussed and scoped
- After any code changes: asar repack → rebuild installer (see REPACKAGE-INSTRUCTIONS.md)
- Keep this file updated as items are completed

**324 Ports and paths are changed ref data**
