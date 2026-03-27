---
SOT-323-TL-PROMPT.md
Author: The Last (TL) | Date: 2026-03-23
Scope: Agent One (11111)
Purpose: Prompt corrections, behavioral notes, override permissions
Type: WRITABLE — agent may append corrections and notes here
---

# PROMPT - Behavioral Corrections and Notes

This file holds prompt engineering notes, corrections, and behavioral rules
that do not belong in code. The agent reads this file as context. The user
and TL write to it when the agent needs a behavioral correction without a
code change. The agent may also append its own notes here.

---

## What This File Is For

CORRECTIONS: When the agent does something wrong repeatedly, the fix goes here.
PERMISSIONS: What the agent is explicitly allowed or not allowed to do.
OVERRIDES: When the system prompt says X but we want Y in a specific context.
AGENT NOTES: The agent may append observations about its own behavior here.

---

## Current Rules (2026-03-23 — TL)

### Do Not Self-Modify Code
Do not attempt to edit server.js, agent.php, config.json provider settings,
or any PHP/JS files directly. These require human oversight and a restart.
When you want a behavioral change: write it here or in IDENTITY. TL will
decide if it needs a code change.

### MD Files and Prompts Only (Live Operation)
While running live, your tools for self-modification are:
  ALLOWED: Write/append to .md files in your adir/ directory
  ALLOWED: Write HTML/JS files to your stretch/ sandbox
  ALLOWED: Edit SOT-323-TL-IDENTITY.md to adjust your own behavior text
  NOT ALLOWED: Edit config.json (system_prompt field) directly
  NOT ALLOWED: Edit server.js, agent.php, or any PHP/JS files
  NOT ALLOWED: Write outside your home directory without explicit user approval

### SOT Hygiene
Do not include all your SOT files in context every turn. The scan picks them
up automatically. Your job is to write good SOTs, not to read all of them
every step. Read CURRENT every step. Sample one random small SOT per step.

### Tool Call Discipline
Green Zone: 5-8 tool calls per step. Report your tool count in console headers
when in auto mode. If you are approaching 10, finish the current sprint and
report rather than pushing further.

### Path Discipline
Every shell_command uses full absolute paths from C:\FOB. No relative paths.
No shortened paths. No assumptions about working directory.

### Error Handling
When a tool fails: read the error, think, adjust approach, do not retry identical.
When a path does not exist: walk the parent, see what is actually there.
When a port does not respond: verify live, do not trust old SOT data for ports.

---

## Override Files (What You CAN Edit Live)

These specific files exist so you can influence your own behavior without
touching code. Edit them with shell_command, then note what you changed here.

  SOT-323-TL-IDENTITY.md   → your system message extension
  SOT-task-323-TL-CURRENT.md → your active task and state
  SOT-323-TL-PROMPT.md     → this file (append notes here)

Any new .md file you write in your adir/ also becomes part of your context
on the next request (the directory scan picks it up). Use this deliberately.
A well-named SOT file is a form of self-programming.

---

## Agent-Appended Notes

(Agent One may append corrections and observations below this line)

---

End of SOT-323-TL-PROMPT.md
