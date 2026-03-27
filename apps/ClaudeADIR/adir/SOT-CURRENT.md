**324 Ports and paths are changed ref data**

# SOT-CURRENT — Active Notes & Deferred Reviews

**Purpose:** Parking lot for things flagged during sessions that need a later review.
**Update this file** whenever something gets deferred, resolved, or changes status.
**Last updated:** 2026-03-22

---

## Open Reviews

### TEMPLATE-FOUR-CLEAN config placeholder — REVIEW LATER
**Flagged:** 2026-03-22 during Launcher4 build
**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-FOUR-CLEAN\config.json`
**Issue:** `app.name` is `DEPLOY_NAME` and `port` is `0` — these are template placeholders.
**Do NOT change yet.** Belief is that Agent-Dropper substitutes these values at deploy time as part of its replication logic. Changing them could break Agent-Dropper's templating.
**Action needed:** Confirm whether Agent-Dropper does string-replace on `DEPLOY_NAME` and `0` during agent creation. Check `Agent-Dropper-v2/server.js` deploy logic and compare against a successfully deployed agent's config.

---

### GGBot at KB-Maker-v2/adir (port 10333) — REVIEW LATER
**Flagged:** 2026-03-22 during fleet scan
**Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\KB-Maker-v2\adir`
**Issue:** A full GGBot-style Knowledge Bot was deployed inside KB-Maker's own workspace directory. Unusual path — `adir` is normally a tool's operational workspace, not a bot home.
**Currently:** Running in Launcher4 at port 10333. Not broken, just in a weird spot.
**Action needed:** Decide if this bot should be relocated to `adirhub\TOOLS\GGBot-10333` or similar. If it has knowledge files or active config worth keeping, do a proper copy + port-update, not a rm/redeploy.

---

### Proxy25565 purpose confirmation
**Flagged:** 2026-03-22
**Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Proxy25565`
**Port:** 25565
**Current status:** In Launcher4. Believed to be part of the v3am FOB tunnel / Minecraft proxy work.
**Action needed:** Confirm role. If it's tunnel-related, document it in tunnel-system.md.

---

## Resolved

| Date | Item | Resolution |
|---|---|---|
| 2026-03-22 | Promote v2 bot.php + dashboard.html → TEMPLATE-TANDRSOCIAL-CLEAN | Done |
| 2026-03-22 | app.name "TANDRSocial" → "Knowledge Bot" in CLEAN config | Done |
| 2026-03-22 | TEMPLATE-FOUR-CLEAN — defer, don't touch | Deferred — see Open Reviews |
| 2026-03-22 | Launcher4 first run | 21/22 UP — SD WebUI only DOWN (expected, D:\AIScreen absent) |
| 2026-03-22 | ParserBot + GGBot@10333 first launcher inclusion | Both UP first try |

**324 Ports and paths are changed ref data**
