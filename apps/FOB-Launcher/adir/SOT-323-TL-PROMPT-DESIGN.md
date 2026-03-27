---
SOT-323-TL-PROMPT-DESIGN.md
Author: The Last (TL) | Date: 2026-03-23
Purpose: New condensed prompt architecture — reasoning over policy
Session: Live agent test + prompt review session with user (Jerry)
---

# PROMPT DESIGN — Condensed Architecture

## Core Philosophy

The system prompt is motor function only. Everything else lives in SOT files.
The prompt gets the agent to the SOTs. The SOTs teach the rest.

Two types of prompt content:
  MOTOR:   Shell examples, API calls, response format, console header
  ORIENT:  How to find and read the SOT system (3 lines max)

Everything else — fleet table, CSS rules, path lessons, safety rules, rendering
stack, known ports — belongs in SOT files, not the prompt.

---

## Reasoning vs Policy (Critical Distinction)

Policy is brittle. Reasoning survives drift.

POLICY (brittle):
  "Always use absolute paths."

REASONING (durable):
  "The PHP CGI process has no working directory. Relative paths fail silently
   with no error. Start every path from the agent home because that is the
   only anchor that is always true regardless of how the process was launched."

When the model changes or context drifts, the agent can reconstruct correct
behavior from reasoning. It cannot reconstruct it from a rule it no longer sees.
Write reasoning into prompts. Write policy into SOTs where it can be updated.

---

## New Prompt Structure (Draft — 2026-03-23)

  [USER IDENTITY BLOCK — strong, added above by user per agent]

  Orientation reasoning (3 lines):
    Your prompt rebuilds every turn. Your adir is scanned and injected.
    The newest SOT on any topic wins. Read CURRENT every step.

  MOTOR — proven shell call:
    dir /O-D [absolute path to adir]

  MOTOR — proven fleet call:
    http://127.0.0.1:{port}/api/agent.php?action=chat&input={url-encoded}
    http://127.0.0.1:9399/status

  MOTOR — response format:
    HTML inline styles only. No markdown.
    Every link: target="_blank" rel="noopener"

  MOTOR — console header (auto mode):
    Step N, timestamp, current task

  [USER ADDITIONS OVER TIME — above footer]
  [CONSOLE FOOTER]

---

## Side Quest Addition

At the end of every SOT section that does not reference its own extension file,
add one line:

  "If new capabilities are added — peripherals, dedicated IPs, additional
   servers, integrations — update this file or write a new SOT in this
   directory so future agents know what is available."

This makes the SOT system self-growing as hardware and services expand.

---

## What Belongs in SOTs Not Prompts

- Full fleet port table (INDEX.md)
- CSS / rendering stack rules (css.md or boot.md)
- AGENT_DIR fix notes (a fix SOT, not the prompt)
- Known lessons from past sessions (dated SOTs)
- Production safety rules (PROMPT.md)
- Stretch folder workflow (WORKING.md)
- Environment awareness / mobile / tunnel behavior (future css.md)

---

End of SOT-323-TL-PROMPT-DESIGN.md
