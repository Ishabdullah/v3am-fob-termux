**324 Ports and paths are changed ref data**

# FLEET AUDIT — FINAL REPORT
*Source: Librarian final audit 2026-03-21*
*Filed by: Claude | Status: pre-scrub reference*

---

## AGENT KNOWLEDGE MAP

### Agent One — Port 11111 — LEGACY CORE
- Has local .md files: `leads.md`, `history.md`, `company-voice.md`
- Contains raw conversation logs from Jerry/Randy/Tommy era
- Action: MANUAL SCRUB — edit/replace these files before next package
- This is the primary T&R Builders knowledge node to neutralize

### Agent Two — Port 11112 — CLEAN SLATE
- TANDRbot service on port 8081: DOWN
- No local T&R knowledge files detected
- Currently clean due to path discrepancies in build
- Action: none needed — already a blank slate

### Agent Four — Port 11113 — CONTEXT HOLDER
- Model: Gemini-3-Flash
- Active context: 49,875 tokens at time of audit
- T&R protocol lives in SYSTEM PROMPT, not local .md files
- No physical legacy files to scrub — system prompt edit handles it
- Action: update system prompt to remove T&R-specific instructions

### Control API — Port 9399
- Librarian confirmed: found it, understands it, can use it ✅
- Can monitor + restart StartPower, Agent One, Agent Four from iframe
- Bridge is active — no further work needed on this

---

## LEGACY DATA LOCATION
Librarian moved legacy T&R files to:
`adir\archives\legacy-TR\`
For manual review and scrubbing before mission reset.

---

## REGISTRY.md — DO NOT TOUCH (code dependency note)
- Librarian tried to edit REGISTRY.md, user stopped it
- File has code dependencies connected to it
- Claude to investigate and fix properly — do not auto-edit
- Added to fix list as Section 1.5

---

## PRE-PACKAGE SCRUB CHECKLIST (from this audit)
- [ ] Agent One: replace/scrub leads.md, history.md, company-voice.md
- [ ] Agent One: clear conversation logs
- [ ] Agent Four: update system prompt — remove T&R-specific instructions
- [ ] Agent Two: fix path discrepancy so TANDRbot 8081 loads correctly
- [ ] REGISTRY.md: fix code dependency then update content
- [ ] archives/legacy-TR/: review, keep as "Old Wing" reference or delete

---
LIBRARIAN STATUS: Standby, Tabula Rasa mode, ready for new user mission
NEXT: User manual scrub → mission reset → repackage

**324 Ports and paths are changed ref data**
