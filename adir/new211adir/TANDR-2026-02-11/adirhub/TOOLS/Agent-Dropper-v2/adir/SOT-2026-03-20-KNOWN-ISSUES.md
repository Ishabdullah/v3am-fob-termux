**324 Ports and paths are changed ref data**

# SOT — Agent-Dropper v2 Known Issues
Date: 2026-03-20
Status: NOTED — do not fix until tested

---

## ITEM 2 — Template type field silently ignored
server.js line 195 hardcodes TEMPLATE-JERRY-CLEAN regardless of the `type` field in the deploy request.
Sending `"type": "tandrsocial"` deploys a JERRY agent, not a TANDRSocial bot.

STATUS: Needs testing before fix.
- First confirm what types are actually being requested in real deployments
- Confirm TEMPLATE-TANDRSOCIAL-CLEAN is in the correct state to be deployed
- Test a tandrsocial deploy end-to-end before touching server.js
- Only fix after test confirms expected vs actual behavior

DO NOT CHANGE server.js until tested.

---

## ITEM 3 — Stale template names in config.json
config.json templates section lists: jerry, randy, tommy, custom
Randy and Tommy are Era 1 artifacts. No templates exist for them.
Only jerry and tandrsocial are valid.

STATUS: Config cleanup — low priority, harmless, but confusing for new users/open-source.
Remove randy and tommy from the templates list when doing a config pass.
Do not touch server.js for this — config.json only.

---

## ITEM 4 — System prompt references dead agents
Agent identity/system prompt mentions Jerry, Randy, Tommy agents and old Era 1 paths.
Functionally harmless — routing and deploy logic work regardless.

STATUS: Needs a prompt rewrite pass.
Will be addressed when Agent Four is confirmed as the new base standard post-vision testing.
See: apps/Agent4/adir/ for current Agent Four state.
See: MISSION.md for fleet context.

---

## RELATED
- API keys in config.json: intentional, leave in place, see SETUP-VARS.md for Electron wizard plan
- BOOT.md references MasterSTART6: update to Launcher2.bat when doing docs pass
- NEW-313 files in this adir: old era, can be archived or deleted

**324 Ports and paths are changed ref data**
