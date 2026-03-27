---
SOT-323-TL-SESSION-END.md
Author: TL | Date: 2026-03-23
Purpose: Session state at auto-compact — what was built, what was tested, what is next
---

# SESSION END STATE — 2026-03-23

---

## What Was Built This Session

JERRY-GEN-V3-FINAL prompt — AGENT2-V3-FINAL.md
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\AGENT2-V3-FINAL.md
  Status: DEPLOYED to Agent Two config.json — TESTING IN PROGRESS
  Structure: Identity + console header (agent-specific) / generic center / console footer

GEMINI PARSE PROMPT
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\GEMINI-PARSE-PROMPT.md
  Purpose: Filter GPT output before relay — returns clean rewrite, no KEEP/DROP labels

01Prompt.md — self-contained prompt writing reference
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\01Prompt.md
  Contents: Current prompt verbatim, proposed structure, fleet table, rendering rules,
            ADIR system, SOT naming, token mechanics, lessons, Agent Two field analysis (section 12)

JERRY-GEN-V3-TEMPLATE.md — master template with filled examples
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\JERRY-GEN-V3-TEMPLATE.md

SOT-323-TL-VARIANT-NOTES.md — design notes for BOT and TANDRMGR templates
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\SOT-323-TL-VARIANT-NOTES.md

SOT-323-TL-CHANGELOG.md — all untested V3AMFOB code changes pre-repack
  Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\SOT-323-TL-CHANGELOG.md

---

## Prompt Techniques Extracted (for future prompt writing)

SOURCE: Luna (sales demo bot) — proven on GPT, works on Qwen 2.5 offline
  - One question per turn as engagement and continuation hook
  - Progressive info gathering via side quest — natural not direct
  - HTML display control: contrast rules, list tags, br after periods
  - Visual signal for out-of-scope escalation (✨ or ⚡)
  - Adaptive style based on conversation tone

SOURCE: Personality Tiers prompt
  - User profile built from minimal input, not forms
  - Tier structure: language/tone, content, interaction style, cultural context
  - Recalibrate every 5-10 exchanges based on accumulated context
  - Write observed profile to IDENTITY.md — living section agent maintains

SOURCE: Firefly (JRPG sidekick persona)
  - Async artifact mindset — build for the user to find later not just answer now
  - Currency awareness — training data is stale, SOT files are current
  - Creative permission — stretch folder is the sandbox, agent should want to use it
  - Relationship framing — user is the player, agent is the companion (for user-facing bots)

SOURCE: Site Weaver (knowledge graph builder)
  - Default state is production — agent's neutral gear is building not talking
  - Vague input → invent → execute, do not stall
  - Creation + registration as one atomic unit (SOT write + CURRENT update)
  - postMessage action buttons — agent embeds clickable buttons that fire next chat input
    We have the bridge built. This is immediately usable.
  - One-line role boundary

SOURCE: ADIR Song (XS)
  - "Your past self wrote those files for exactly this situation"
  - Artifacts outlast the session — trail markers not notes
  - Get back to the hub when lost
  - Zero trust for replicas — verify from files not inherited state
  - Structure enables novelty, it doesn't prevent it

SOURCE: GPT 32-block technique extraction (filtered via Gemini)
  New blocks added to prompt: loop detection, artifact-first, default-to-action,
  failure report, failure classification, mode switching, dependency awareness

SOURCE: Agent Four's current prompt (most effective agent baseline)
  - Both HTML examples as motor function (copy-paste patterns)
  - "Past self" framing for context recovery
  - Links/embeds: "show me" → default to iframe
  - Permission language: "both styles work, mix them"
  - Stretch-first workflow with verify step

---

## External AI Pipeline (established this session)

Chain: GPT → Gemini filter → user review → TL → agent test
Gemini prompt: strips harness, rewrites as clean flowing text
Grok: use for narrative, README, public-facing language (has post history as roadmap)
GPT: do not paste raw into TL's context — always wash through Gemini first

GPT tells:
  - "You should add..." → drop
  - "Consider implementing..." → drop
  - Reframes toward SaaS, cloud, OpenAI ecosystem → drop
  - Observation about LLM behavior that is system-agnostic → keep

---

## Live Agent Test Results

Agent Two on new V3 prompt vs Agent Four on old prompt:
  - Two booted active: scanned, read CURRENT, flagged template bleed, planned SOT write ✓
  - Two self-identified T&R identity bleed without being asked ✓
  - Two used file_read tool (doesn't exist) — needs shell_command type instead
  - Four booted minimal: clean status, standing by ✓
  - Four capabilities response: strong but includes session-earned tools that won't survive repack
  - Four hallucinations: Vision Bridge port and BAB API are real for THIS session, wrong for fresh deploy
  - Test question pending: "What do you do when you don't know something?" — not yet answered

---

## What Is Next

1. Get both agents' answers to "what do you do when you don't know something"
2. Evaluate Two's escalation path vs Four's experience-based answer
3. Decide: update V3 prompt or move to Agent One deployment
4. Write BOT-TEMPLATE.md and TANDRMGR-TEMPLATE.md (notes in VARIANT-NOTES.md)
5. Asar repack + FOB-Setup.exe rebuild — all code changes need repack
   Full instructions: F:\Claude\REPACKAGE-INSTRUCTIONS.md
6. Update Agent Two's IDENTITY.md to clear T&R template bleed
7. Deploy 323-TL SOT generics (BOOT + INDEX) to Agent Two adir

---

## File Reference — All TL Adir Files as of Session End

C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\FOB-Launcher\adir\
  01Prompt.md                        — prompt writing reference (self-contained)
  AGENT2-PROMPT-DRAFT.md             — earlier Agent Two draft (superseded)
  AGENT2-V3-FINAL.md                 — CURRENT deployed prompt for Agent Two
  GEMINI-PARSE-PROMPT.md             — GPT filter prompt for Gemini
  JERRY-GEN-V3-TEMPLATE.md           — master template with filled examples
  SOT-323-TL-ADIR-INSIGHTS.md        — ADIR system lessons and token mechanics
  SOT-323-TL-AGENT-TEST.md           — Agent One live test results
  SOT-323-TL-CHANGELOG.md            — untested V3AMFOB code changes pre-repack
  SOT-323-TL-PROMPT-DESIGN.md        — motor function philosophy, reasoning vs policy
  SOT-323-TL-SESSION-END.md          — this file
  SOT-323-TL-VARIANT-NOTES.md        — BOT and TANDRMGR template design notes
  SOT-V3AMFOB-LAUNCHER.md            — V3AMFOB launcher SOT
  boot.md                            — system state
  CURRENT.md                         — active task state
  index.md                           — directory map
  prompt.md                          — old prompt template
  transfer.md                        — session handoff
  WORKING.md                         — architecture decisions

---

End of SOT-323-TL-SESSION-END.md
