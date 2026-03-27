**324 Ports and paths are changed ref data**

# CLAUDE SESSION NOTES — 2026-03-20
Saved to ADIR so user and Agent Four can see context of what was built.

---

## BUILT THIS SESSION

### ScreenStream :9240 — REST API complete
Browser captures screen via getDisplayMedia, posts frames every 2s to server.
Server saves to latest.jpg (single file, always overwritten — no memory bloat).
Agent Four can now grab screen frames:

  curl http://127.0.0.1:9240/api/snap    → fresh JPEG frame (waits up to 4s)
  curl http://127.0.0.1:9240/api/status  → streaming state + last frame age

Browser must be open at http://127.0.0.1:9240 with START clicked first.

### Launcher2.bat — C:\FOB\Launcher2.bat
Single bat starts all 16 FOB services. Replace old START-ALL.bat.
STOP-ALL2.bat is the paired shutdown.
Setup variables at top of file (paths, ports, ngrok domain, tunnel dashboard).

### SD WebUI ADIR — adirhub/TOOLS/SDWebUI/adir/
Documentation only. SD files stay in D:\AIScreen.
BOOT.md has full API reference and ImageGen relay usage.

### SETUP-VARS.md — adirhub/adir/SETUP-VARS.md
CRITICAL DOCUMENT. Registry of every hardcoded value that becomes a setup wizard variable.
This is the spec for the Electron setup wizard.
Rule: when writing code with a hardcoded path/port/key → add it to SETUP-VARS.md.

---

## NEXT PRIORITIES

1. Electron wrapper — setup wizard + app window + OS bridge (ipcMain/ipcRenderer)
   fob-config.json replaces all hardcoded variables across the system

2. Test ScreenStream with Agent Four — hit /api/snap, confirm frame delivery

3. Vision testing → Agent Dropper template update

4. Voice TTS propagation — Agent1, Agent2, Bot1, TEMPLATE-JERRY-CLEAN

---

## FULL NOTES
See F:\Claude\SESSION-2026-03-20.md for complete technical details.

**324 Ports and paths are changed ref data**
