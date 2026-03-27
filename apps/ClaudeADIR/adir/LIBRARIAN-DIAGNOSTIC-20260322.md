**324 Ports and paths are changed ref data**

# LIBRARIAN DIAGNOSTIC REPORT — CROSS-AGENT SYNC
*Source: StartPower/Librarian conversation 2026-03-21*
*Filed by: Claude | Purpose: redundant knowledge backup + gap analysis*

---

## WHAT THE LIBRARIAN CONFIRMED

### Identity & Role
- Librarian is the FIRST agent new users see in the Electron app
- Served via iframe in V3AMFOB at http://127.0.0.1:57785/
- Persona: curator, front-desk, institutional memory
- T&R Builders history = provenance only — "Old Wing" — not the user's destination
- New users bring their own mission. Librarian provides the empty ledger + filing system.
- ADIR structure (SOT, working.md, current.md) is user-agnostic and ready for any topic

### Environment Specs (Librarian's findings)
- JS is active inside iframes served by the local Express node ✅
- Librarian can write/manipulate any HTML in its own stretch/ directory ✅
- DOM sight: BLOCKED by Same-Origin Policy — cannot look UP at the parent Electron window ✅ (expected)
- CSS injection into V3AMFOB: not possible from iframe without a bridge

### Fleet Status (as of 2026-03-21 per Librarian)
- Port 9303 ADIR Hub: UP
- Port 57775 StartPower LLM: UP
- Port 57785 Librarian UI: UP
- Port 8100 FOB Server: UP
- TANDRSocial API port 8099: FAILING (HTTP 500) — but .md files intact
  NOTE: main TANDRSocial port is 57790, 8099 may be a sub-API — investigate
- ADIR Hub Registry: needs manual refresh for recent lab deployments

---

## WHAT THE LIBRARIAN DOESN'T KNOW YET (gaps to close)

### The Control API IS the bridge
The Librarian asked "how do I control the Electron app / fleet from inside an iframe?"
Answer: **the Control API at port 9399 already exists.**

The Librarian can call these from inside its own JS right now:
```
GET  http://127.0.0.1:9399/status        → full fleet status JSON
POST http://127.0.0.1:9399/restart/:id   → kill + respawn a service
POST http://127.0.0.1:9399/start/:id     → start a downed service
POST http://127.0.0.1:9399/stop/:id      → stop a service
```

This means the Librarian can:
- Show a live fleet dashboard in its own UI (poll /status every 5s)
- Offer restart buttons for downed services — directly from the iframe
- Become a full system monitor without needing DOM access to V3AMFOB at all
- No bridge script needed — the API is the bridge

### TODO: Brief the Librarian on the Control API
When next chatting with Librarian, tell it:
> "You already have a fleet control bridge. GET http://127.0.0.1:9399/status returns all service statuses. You can POST to restart/start/stop any service. Build your fleet dashboard using this API."

---

## ACTION ITEMS FOR V3AMFOB FIX LIST

- TANDRSocial port 8099 HTTP 500 — investigate (added to Section 1)
- Librarian onboarding sequence — needs a "welcome new user" flow that doesn't assume T&R context
- Consider exposing more data via Control API so agents can be richer monitors

---

## LIBRARIAN QUOTE WORTH KEEPING
*"The T&R files are the 'Old Wing' of the library — a reference for how the system handles complexity. The 'New Wing' is where the user will begin writing their own history. I am here to hand them the first empty ledger."*

---
CITE: StartPower conversation 2026-03-21
NEXT: Brief Librarian on Control API / build fleet status widget in Librarian UI

**324 Ports and paths are changed ref data**
