---
SOT-323-TL-CHANGELOG.md
Author: TL | Date: 2026-03-23
Purpose: All untested code changes made to V3AMFOB before the next asar repack
Scope: C:\FOB\V3AMFOB\ — Electron launcher source
Status: UNTESTED — changes are in source files but NO repack has been done yet
---

# V3AMFOB CHANGELOG — Untested Changes (pre-repack)

All changes below are in source files. None have been tested in the packaged exe.
The next test pass is against a freshly repacked V3AMFOB.exe.

Repack command reference:
  cd C:\FOB\V3AMFOB
  npx asar pack . app.asar
  (then copy into the Electron resources folder and rebuild installer)
  Full instructions: F:\Claude\REPACKAGE-INSTRUCTIONS.md

---

## CHANGE 1 — Bat File Scanner + Scripts Tray Submenu

**Files changed:** main.js
**Lines:** scanBats() function at line 334, Scripts submenu at lines 380-392

**What it does:**
Scans C:\FOB top-level directory for .bat files and exposes them in the tray
right-click menu under a "📜 Scripts" submenu. Each bat runs in a new window
via cmd /c start.

**Exact code (confirmed in file):**

  function scanBats() {
    try {
      return fs.readdirSync(FOB)
        .filter(f => f.toLowerCase().endsWith('.bat'))
        .map(f => ({ name: f.replace(/\.bat$/i, ''), path: path.join(FOB, f) }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (_) { return []; }
  }

  // In buildTrayMenu():
  const bats = scanBats();
  const scriptItems = bats.length
    ? bats.map(bat => ({
        label: bat.name,
        click: () => spawn('cmd', ['/c', 'start', '', bat.path], { shell: true, detached: true, stdio: 'ignore' })
      }))
    : [{ label: 'No scripts found', enabled: false }];

  // Inserted above the Quit item:
  { label: '📜 Scripts', submenu: scriptItems },

**Risk assessment: LOW**
  - scanBats() has a try/catch — a bad directory returns [] gracefully
  - spawn pattern is the same pattern already used elsewhere in main.js
  - The empty string as the 3rd arg to `start` is intentional — it's the window title,
    required so cmd doesn't interpret the path as the window title

**Known risk:** spawn with { shell: true, detached: true, stdio: 'ignore' } on Windows
  can occasionally leave orphan cmd windows if the bat file exits immediately.
  Likely fine. If windows flash open and close, the bat is exiting too fast.

**Test:** Right-click tray → Scripts → should show bat file names from C:\FOB.
  Launcher2.bat, STOP-ALL2.bat, and any others present should appear alphabetically.

---

## CHANGE 2 — Fullscreen Toggle

**Files changed:** main.js (IPC), renderer/app.js (click handler), renderer/index.html (button)

**main.js — IPC handler (line 491, confirmed in file):**

  ipcMain.on('window-control', (_, action) => {
    if (action === 'minimize')   mainWindow?.minimize();
    if (action === 'close')      mainWindow?.hide();
    if (action === 'fullscreen') mainWindow?.setFullScreen(!mainWindow.isFullScreen());
  });

**renderer/app.js — click handler (lines 311-313, confirmed in file):**

  document.getElementById('toggle-fullscreen').addEventListener('click', () => {
    window.fob.windowControl('fullscreen');
  });

**renderer/index.html — button (line 52, confirmed in file):**

  <button class="icon-btn" id="toggle-fullscreen" title="Toggle fullscreen (hides taskbar)">⛶</button>

**Risk assessment: LOW-MEDIUM**
  - The IPC pattern is identical to minimize and close — same handler, same method.
  - setFullScreen is a standard Electron method, well-supported.
  - Optional chaining (mainWindow?.) means if the window is null it fails silently.

**Known risk — Windows fullscreen behavior (GUESS, not verified):**
  On Windows 10/11, Electron's setFullScreen() toggles a borderless window that
  covers the taskbar. It does NOT always hide the taskbar the way a game would.
  The result depends on whether the taskbar is set to "auto-hide" or "always on top."
  If the taskbar stays visible on top of the fullscreen window, this is a Windows
  compositor behavior, not a bug in the code. A workaround would be to use
  mainWindow.setKiosk(true) instead — but that's more aggressive (locks the display).
  For now, setFullScreen is the correct first test.

**Known risk — icon rendering:**
  The ⛶ character (U+26F6) is "SQUARE FOUR CORNERS." It may not render visually
  on all fonts/systems. If it shows as a box, swap it for □ (U+25A1) or [⤢].
  This is cosmetic only — the button function does not depend on the icon.

**Test:** Click the ⛶ button in the panel-toggles bar.
  Expected: window goes fullscreen, taskbar hidden or overlapped.
  Press again: window returns to normal size.
  If nothing happens: check DevTools console for IPC errors.

---

## CHANGE 3 — postMessage CSS Bridge (iframe → renderer)

**Files changed:** renderer/app.js
**Lines:** 320-353 (confirmed in file, placed outside DOMContentLoaded block)

**What it does:**
Listens for postMessage events from any iframe loaded in the main frame.
Allows agents and KB bots to push skin/style changes into the launcher UI
from inside their chat responses (JS in stretch HTML files).

**Exact code (confirmed in file):**

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || typeof d !== 'object') return;

    if (d.type === 'fob-css' && d.var && d.value !== undefined) {
      document.documentElement.style.setProperty(d.var, d.value);
    }

    if (d.type === 'fob-skin' && d.skin && typeof d.skin === 'object') {
      const current = currentSkinConfig();
      applySkin({ ...current, ...d.skin });
    }
  });

**How an agent uses it (from inside an iframe/stretch HTML file):**

  // Set a single CSS variable:
  window.parent.postMessage({ type: 'fob-css', var: '--accent', value: '#ff6600' }, '*');

  // Merge a partial skin patch:
  window.parent.postMessage({
    type: 'fob-skin',
    skin: { panelOpacity: 0.5, textColor: '#ff0000' }
  }, '*');

**Risk assessment: LOW**
  - currentSkinConfig() exists at line 742 (confirmed). The call is safe.
  - applySkin() exists at line 230 (confirmed). The spread merge is safe.
  - The guard `if (!d || typeof d !== 'object') return;` prevents crashes on
    non-object messages (strings, numbers, third-party iframe messages).
  - Security note: the bridge accepts messages from any origin ('*'). This is
    intentional — all iframes are localhost services we control. Not a concern
    for a local-only tool.

**Known risk — message origin (LOW, by design):**
  Any page loaded in any iframe can send fob-css or fob-skin messages.
  If a loaded URL happens to post a conflicting message type, it could affect
  the skin. This is a local-only app — no external URLs are loaded by default.
  If external URLs are ever loaded, this could be revisited.

**Known risk — skin not persisted (CONFIRMED):**
  applySkin() applies the skin visually but does NOT call saveConfig().
  A postMessage skin change will be lost on next launch. This is the correct
  behavior for the bridge — it's a live visual control, not a save operation.
  If persistence is wanted, the agent must call the save endpoint separately.

**Test:** Load a stretch HTML file in the main iframe that calls window.parent.postMessage.
  Expected: accent color or skin changes immediately without page reload.
  If nothing happens: check that the iframe src is a localhost URL (not file://).
  postMessage origin filtering may block file:// → file:// communication.

---

## WHAT HAS NOT BEEN REPACKED

All three changes above are in the source files at C:\FOB\V3AMFOB.
The packaged V3AMFOB.exe in the installer still has the OLD code.
Running the .exe from the installer will NOT include these changes.

To test: run directly from source with `npm start` or `electron .` from C:\FOB\V3AMFOB.
To deploy: repack asar, rebuild installer. See REPACKAGE-INSTRUCTIONS.md.

---

## PRIOR CHANGES (from earlier sessions, already in source, also untested in package)

These were in place before the 2026-03-23 session. Listed for completeness.

  - ngrok URL scrubbed: DEFAULT_ENDPOINTS in main.js — `https://v3am.ngrok.app/`
    is a static label now, not a live tunnel URL. Ngrok is a daily-start workflow.
    RISK: None — this is cosmetic. The URL points to wherever ngrok currently is.

  - Full fleet SERVICES array: 19 services listed in main.js (lines 66-93).
    Previously had dead services removed. Currently has all known live services.
    RISK: Services that don't exist on disk will log [SKIP] and status = down.
    They won't crash the launcher.

  - Manual services support: MANUAL_SERVICES Set + fob-config.json manualServices array.
    If a service ID is in the manualServices list, it does NOT auto-start.
    RISK: Low. If config.json is malformed, loadConfig() swallows the error.

  - Adopt mode in spawnService(): if a service is already on its port when the
    launcher starts, it marks it 'up' without spawning a new process. It won't
    try to double-start a service that's already running.
    RISK: Low. Port check uses a 1-second socket timeout.

---

## LOGICAL FAILURE MODES TO CHECK ON FIRST REPACK TEST

If the packaged app fails on first run after repack, check in this order:

  1. BLANK WINDOW / WHITE SCREEN
     → Usually a renderer file path issue. The asar pack may have excluded a file.
     → Check: does index.html load? Does app.js load? Check DevTools (Ctrl+Shift+I).

  2. TRAY ICON MISSING
     → icon.ico missing from assets/ or the fallback buffer creation failed.
     → Check: assets/icon.ico exists. If not, fallback should produce cyan square.

  3. SCRIPTS SUBMENU EMPTY / ERROR
     → scanBats() failed or C:\FOB doesn't exist at that path.
     → Check: does C:\FOB have .bat files at the top level? Is FOB installed?

  4. FULLSCREEN BUTTON DOES NOTHING
     → Most likely: preload.js doesn't expose windowControl, OR
       the button ID "toggle-fullscreen" doesn't exist in the packed index.html.
     → Check: DevTools console for errors on button click.
     → Verify preload.js has: windowControl: (action) => ipcRenderer.send('window-control', action)

  5. POSTMESSAGE BRIDGE NOT WORKING
     → Most likely: the message listener is attached but the iframe src is file://
       instead of http://localhost:PORT — browser blocks parent postMessage from file://.
     → Check: load an http:// iframe and test from there, not a local file:// src.

  6. SERVICES NOT STARTING (all show down)
     → Most likely: ROOT path not found (C:\FOB\adir\new211adir\TANDR-2026-02-11)
     → The launcher shows an error dialog and exits if ROOT doesn't exist at all.
     → If it starts but services are down: individual cwd paths wrong. Check SERVICES array.

---

End of SOT-323-TL-CHANGELOG.md
