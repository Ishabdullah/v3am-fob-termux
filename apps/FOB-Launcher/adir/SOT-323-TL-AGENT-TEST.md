---
SOT-323-TL-AGENT-TEST.md
Author: TL | Date: 2026-03-23
Purpose: Live Agent One test results — what the agent did, what it revealed, what we learned
Session: First live agent test with 323-TL SOT system, joint session with user (Jerry)
---

# AGENT TEST — Live Agent One Results (2026-03-23)

---

## Test Setup

Agent One (port 11111) received two questions in the same step cycle:
  - TL's question: walk adir, read CURRENT and IDENTITY, report with console header,
    write SOT-323-A1-FIRSTREAD.md
  - User's question: how many tokens per turn and how does context management work

This was the first live test of the 323-TL SOT set immediately after initialization.

---

## What Agent One Did (Step 12 of its session)

Agent One produced a full HTML console header response.
It reported Step 12, timestamp, task description.

It ran: dir /O-D on its adir directory
It read: SOT-task-323-TL-CURRENT.md (confirmed STATUS: STANDBY)
It read: SOT-323-TL-IDENTITY.md (confirmed identity block)
It wrote: SOT-323-A1-FIRSTREAD.md to its adir (confirmed via shell_command)
It reported breadcrumbs and NEXT block in console footer format.

Confirmed: The console header format from WORKING.md was followed correctly.
Confirmed: The CURRENT + IDENTITY read was performed as instructed.
Confirmed: The SOT write happened and was verified.

---

## Token Breakdown Agent One Reported

  System prompt:     ~1,500 tokens
  ADIR context scan: ~3,200 tokens  ← biggest cost, grows with SOT count
  Conversation:      ~1,100 tokens  (last 20 entries = 10 exchanges)
  Total at step 12:  ~5,800 tokens/turn

The plateau mechanism was confirmed: cost stabilizes after turn 10.
Old entries drop off the LLM window as new ones push in.
The ADIR scan is the variable — keep SOT files lean.

---

## Key Finding: dir /O-D Gap

Agent One used `dir /O-D` correctly. This command was NOT in any SOT file.
The SOT said "sort by date" but did not provide the actual flag.

The agent used it correctly because it exists in training weights (Gemini knowledge).
This worked this time. It may not work with a different model or after drift.

LESSON: Put proven working commands in the prompt as motor function, not rules.
The prompt should include `dir /O-D [path]` as a copy-paste example, not just
the instruction "sort by date." A weaker model would have guessed or failed.

This is the central proof of the reasoning vs policy principle.

---

## Identity Statement Quality

Agent One's self-description was coherent and accurate:
  "I am Agent One. Port 11111. Home: apps\Agent1\adir"
  Jerry-architecture agent on Gemini. General-purpose operator.
  MEMORY: adir is my memory. DISCIPLINE: 5-8 tool calls.
  SAFETY: home directory only. COMMUNICATION: HTML inline styles.

The IDENTITY file initialization by TL (2026-03-23 block) was read and followed.
The agent did not confuse its identity with another agent or the system.

---

## Relative Path Architecture Note

During the session, scan_directory "." was discussed.
Agent One described it as scanning "the adir/ folder" — technically its experience
of it from inside the prompt is that it loads files from its knowledge directory.
The actual technical anchor is the agent's home directory, not just adir/.

User note: this is intentional architecture. "." is relative, allowing the entire
folder to be dragged and dropped elsewhere without breaking the path. The agent
correctly experiences its adir as its context source. No change needed.

---

## FIRSTREAD SOT Written by Agent One

Agent One wrote SOT-323-A1-FIRSTREAD.md to its own adir at:
  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\

This was the first SOT the agent wrote under the 323-TL system.
It confirmed its own initialization and status.
This is what the IDENTITY file's "Identity Update Log" section is for —
agent-written record of its own evolution over time.

---

## What Worked

  - Console header format: followed correctly
  - dir /O-D: used correctly (from training, not SOT — gap noted)
  - CURRENT read: performed correctly as mandatory first read
  - IDENTITY read: performed correctly
  - SOT write: confirmed via shell echo + write
  - Token breakdown: agent reported accurately
  - Green Zone discipline: stayed within tool call limits

## What Needs Follow-up

  - Motor function prompt: dir /O-D should be in the prompt as an actual example
  - Context scan growth: adir has 6 files now, all loaded every turn; lean is critical
  - Fleet deployment: BOOT and INDEX are ready to copy to Agent2, Agent4, bots

---

End of SOT-323-TL-AGENT-TEST.md
