---
SOT-323-TL-SESSION-END-2.md
Author: TL | Date: 2026-03-23 (session 2)
Purpose: Session state at context breach — what was done, what is next
---

# SESSION END STATE — 2026-03-23 (continued)

---

## What Was Done This Session

### V3 Prompt Fleet Deployment
- Agent One config.json — UPDATED to V3 (fixed broken prompt, wrong adir path, lowercase name)
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\config.json
  Version bumped: 2.0.0 → 3.0.0
  Fixed: `apps\Agent1\agent\adir` → `apps\Agent1\adir`

- Agent Two config.json — already V3 from previous session. Confirmed valid.
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\agent\config.json

- Agent Four config.json — UPDATED to V3 then REVERTED to V2 (user request)
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\config.json
  Status: Back on V2 prompt with Lessons (Verified 2026-03-16) intact
  Reason: Agent Four stays on V2 — it is the reference/baseline, not yet migrated

### Agent Dropper Template
- default-prompt.txt reviewed — still V2 style with ${name}/${port}/${path} placeholders
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2\default-prompt.txt
  Status: NOT YET UPDATED to V3
  Decision: Pending — update this when ready to standardize all new deploys on V3

### V3 Prompt Validation (from previous session)
- Agent One: answered escalation question — passed, plus quoted SOT self-programming framing
- Agent Two: answered escalation question — passed, prompt-literal, clean
- Agent Four: answered escalation question — experience-based, deeper, but cites session-only tools
- Decision: V3 prompt confirmed working across agents and models (Gemini Flash + others)

---

## Architecture Insight — Bot/Agent Layered System

The Librarian + StartPower setup is intentional and working:
- KB-Maker builds prompt bots (Librarian, coding bot, memory bot, etc.)
- An agent (StartPower or any Jerry agent) runs as the LLM brain underneath
- The bot system prompt is the persona/scope layer; the agent is the motor
- Model can be swapped mid-chat — agent LLM to Opus 4.6 or back to local
- No "right way" — mix and match persona + agent brain + model as needed
- The [LIST_FILES:] bracket syntax in the Librarian bot prompt causes protocol theater
  but the system works. Do not change it without explicit direction.
- StartPower (57775) has LIBRARIAN-DIAGNOSTIC SOT — knows about 9399 Control API gap

---

## What Is Next

1. Review TANDRmgr-lab — user has queued this for repackaging prep
   Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab

2. Update Agent Dropper default-prompt.txt to V3 (deferred, not urgent)

3. Write BOT-TEMPLATE.md and TANDRMGR-TEMPLATE.md
   Notes in: SOT-323-TL-VARIANT-NOTES.md

4. Asar repack + FOB-Setup.exe rebuild
   Instructions: F:\Claude\REPACKAGE-INSTRUCTIONS.md

5. Update Agent Two IDENTITY.md — clear T&R template bleed (still pending)

6. Deploy 323-TL SOT generics (BOOT + INDEX) to Agent Two adir (still pending)

---

## Fleet Prompt Status Summary

| Agent | Port | Prompt | Version | Config Path |
|-------|------|--------|---------|-------------|
| Agent One | 11111 | V3 | 3.0.0 | apps\Agent1\config.json |
| Agent Two | 11112 | V3 | 2.0.0 | apps\Agent2\agent\config.json |
| Agent Four | 11113 | V2 | 2.0.0 | apps\Agent4\config.json |
| Agent Dropper template | — | V2 | — | adirhub\TOOLS\Agent-Dropper-v2\default-prompt.txt |

---

End of SOT-323-TL-SESSION-END-2.md
