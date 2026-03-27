**324 Ports and paths are changed ref data**

# LAUNCHER3 — Pre-Build Notes
Date: 2026-03-20
Status: NOT YET BUILT — notes only

---

## What Launcher3 adds over Launcher2

1. StartPower :57775
   start "StartPower-57775" /MIN cmd /k "cd /d %ROOT%\adirhub\TOOLS\StartPower && node server.js"

2. ngrok tunnel moves from Agent Four (:11113) to StartPower (:57775)
   NGROK_DOMAIN_A4 = v3am.ngrok.app -> 57775  (was 11113)

3. Browser open on launch:
   start chrome "https://v3am.com/FOB/"
   (v3am.com/FOB/ should load the public FOB dashboard/landing)

## Health check additions
call :check "StartPower" 57775

## Summary line additions
echo   StartPower     http://127.0.0.1:57775
echo   StartPower WEB https://v3am.ngrok.app

## SETUP-VARS additions needed
STARTPOWER_PORT = 57775
STARTPOWER_PATH = C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\StartPower
V3AM_FOB_URL    = https://v3am.com/FOB/

**324 Ports and paths are changed ref data**
