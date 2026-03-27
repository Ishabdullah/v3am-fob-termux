**324 Ports and paths are changed ref data**

# V3AMFOB — Electron App Status

*Last updated: 2026-03-21*

---

## Status: BUILT — Tray fix applied, awaiting clean test run

---

## Quick Facts

| Item | Value |
|------|-------|
| Exe | `C:\FOB\V3AMFOB\dist\win-unpacked\V3AMFOB.exe` |
| Launcher | `C:\FOB\START-V3AMFOB.bat` |
| Source | `C:\FOB\V3AMFOB\` |
| Dev run | `cd C:\FOB\V3AMFOB && npm start` |
| Full session notes | `F:\Claude\SESSION-2026-03-21.md` |

---

## What It Does

- Spawns all 20 FOB services on launch (or adopts them if Launcher4 already running)
- Main window = iframe of Librarian :57785 (default), switchable to v3am.com/FOB/ or v3am.ngrok.app/
- ↗ button on each endpoint tab = open in default browser
- Server rack grid — live UP/DOWN status per service, click card = open in browser
- Tabbed log viewer — one tab per service + System
- System tray — cyan icon, service menu grouped by group, double-click restores window
- X button = minimize to tray (not close)
- Tray Quit = kills only what V3AMFOB spawned (Launcher4 services survive)

---

## Pending Items

1. Kill zombie PIDs 18300 + 1468 (admin terminal: `taskkill /F /PID 18300 /PID 1468`) or reboot
2. Test tray icon appears after clean launch
3. Add real `.ico` to `C:\FOB\V3AMFOB\assets\icon.ico` for proper branding
4. Full installer build: run `npm run dist` from admin terminal → `V3AMFOB Setup 1.0.0.exe`

---

## Known Issues Fixed This Session

| Issue | Fix |
|-------|-----|
| EADDRINUSE on launch | Adopt mode: checkPort() before spawn, skip if already up |
| Tray not appearing | Base64 PNG was malformed — replaced with nativeImage.createFromBuffer() RGBA |
| X closed app entirely | Was tray creation failing silently — same fix above |
| Menu bar "Exit" looks like "Edit" | User preference: menu bar restored |
| electron-builder symlink error | Workaround: asar extract → patch → repack (full build needs admin or Developer Mode) |

**324 Ports and paths are changed ref data**
