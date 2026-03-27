---
SOT-323-TL-VARIANT-NOTES.md
Author: TL | Date: 2026-03-23
Purpose: Design notes for BOT-TEMPLATE and TANDRMGR-TEMPLATE, informed by cold
         external review of JERRY-GEN-V3 by Gemini (no FOB context)
---

# VARIANT DESIGN NOTES

These notes are for when BOT-TEMPLATE and TANDRMGR-TEMPLATE are written.
External reviewer correctly identified the axis of difference even without FOB context.
Notes below correct for FOB-specific reality where the external model guessed wrong.

---

## Jerry-Class (Operators) — already done in JERRY-GEN-V3-TEMPLATE.md

Primary tool:    shell_command (dir, type, echo)
Memory:          SOT files on local disk, date-weighted
Output:          Console header/footer boxes + HTML
Authority:       Writes to own adir only, escalates via FEED.txt

---

## Bot-Class (KB Agents — Bot1, StartPower, Librarian, TANDRSocial)

External reviewer guessed: kb_search / vector_query
FOB reality: KB bots load a knowledge base file as static context into the prompt.
             There is no vector search. The KB is a .md or .txt file loaded at scan time.
             Bot "memory" is the KB file itself, not a local SOT system.

Key differences from Jerry:
  - No adir SOT system — bots don't navigate directories
  - No shell_command motor — bots don't write files
  - No console header/footer — bots respond in clean UI format
  - Primary function: answer from KB, cite source, escalate to human if not found
  - Do NOT improvise answers not in the KB — this is the bot equivalent of FEED escalation

Template needs:
  - Identity block (name, port, KB topic)
  - KB source declaration (what file/topic it knows)
  - Response format (clean, citation-style, no terminal aesthetic)
  - Hard boundary: "If the answer is not in your knowledge base, say so. Do not guess."
  - Escalation: refer to TANDRmgr or flag to user — NOT FEED.txt (bots don't write files)

---

## TANDRmgr-lab (:8086) — Orchestrator

External reviewer guessed: agent_dispatch / status_poll, Gantt charts, conflict resolution
FOB reality: TANDRmgr is a chat interface with manager context. It calls agents via
             HTTP (same agent.php API as everyone else). It uses MemoryBot (:8091)
             for extended context. It does NOT have a Gantt or authority system.

Key differences from Jerry:
  - Primary function: orchestrate tasks across the fleet by calling agents via HTTP
  - Uses MemoryBot at :8091 for cross-session context (separate from SOT files)
  - Can write to FEED.txt (it IS the hub-level coordinator)
  - Fleet status via: http://127.0.0.1:9399/status
  - Calls agents: http://127.0.0.1:[port]/api/agent.php?action=chat&input=[message]
  - Does NOT need console header boxes — it has its own UI
  - Conflict resolution: SOT date-weight IS the tie-breaker. Newest file wins.
    No "authority level" system exists. The external reviewer invented that.

Template needs:
  - Identity block (Manager, port 8086)
  - Fleet map reference (INDEX.md equivalent)
  - Motor: HTTP calls to agents, HTTP calls to Control API
  - MemoryBot integration note
  - Orchestration rules: delegate to agents, don't do operator work directly
  - Escalation: write to FEED.txt or respond to user directly (no FEED dependency)

---

## The One Correct Insight from External Review

"If Agent One and Agent Two have conflicting SOT files, the Manager needs tie-breaker logic."

FOB answer: the tie-breaker is already in the naming convention.
SOT-0323-TL-INDEX.md beats SOT-0316-TL-INDEX.md because 0323 > 0316.
The date in the filename IS the authority weight. No additional system needed.
TANDRmgr should be told this explicitly in its template so it applies the same rule.

---

End of SOT-323-TL-VARIANT-NOTES.md
