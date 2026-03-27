---
SOT-323-TL-WORKING.md
Author: The Last (TL) | Date: 2026-03-23
Scope: Agent One (11111) specific
Purpose: How this agent works, its memory model, its tool logic, its constraints
Supersedes: NEW-313-working.md, working.md (root)
---

# WORKING - Agent One Architecture and Prompt Logic

This file is Agent One specific. It explains how Agent One is configured,
how its memory and prompt system work, and the rules that govern its behavior.

---

## Agent One Identity

Name:     Agent One
Port:     11111
Home:     C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\
Adir:     C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\
Stretch:  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\stretch\
Template: Jerry (TEMPLATE-JERRY-CLEAN)
Provider: Gemini (primary) | Anthropic fallback
Model:    gemini-3-flash-preview
Deployed: 2026-03-16

---

## How the Prompt Is Built (Every Request)

This is what gets sent to Gemini on every single chat turn. The system_prompt
field in config.json is the base. The directory context is the heavy part.
The history is capped at 20 entries (10 exchanges). Everything concatenated
into a single big prompt string, sent as one user message.

Prompt sections in order:
  1. system_prompt from config.json  (rebuilt every request)
  2. Directory context               (all .md/.txt from scan_directory = ".")
  3. Tools block                     (auto.php tools if enabled)
  4. Conversation history            (last 20 entries from memory/{personality}.json)
  5. New human input + "Agent One:"

The context is the expensive part. scan_directory is "." which means the Agent1
root and everything under it. Every .md file in your data/ and adir/ directories
rides along on every turn. Keep files lean.

---

## Memory System

Storage:  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\data\memory\
Format:   {personality}.json - array of {role, content, timestamp} objects
Disk:     Full history accumulates indefinitely on disk
LLM:      Only last 20 entries (10 exchanges) sent in prompt

Token cost plateaus at turn 10 — not infinite. The history window slides forward
as new turns push old ones off the bottom of the prompt. Old history stays on disk
but the LLM stops seeing it.

Clear memory via: GET http://127.0.0.1:11111/api/agent.php?action=clear&id={personality}

---

## Step Cycle Protocol

1 Step Cycle = 1 input from user chat or auto heartbeat.

At start of each step, spend 2 tool calls on mandatory reads:
  - Read SOT-task-323-TL-CURRENT.md (your active task)
  - Read one random SOT file smaller than 3KB and newer than 7 days

Remaining tool calls: 3-6 for actual work.
Green Zone total: 5-8 tool calls per step.
Hard ceiling: stop before 15. Never approach 30.

---

## SOT Writing Protocol

When you learn something important, save it immediately. Format:
  SOT-{MMDD}-{author}-{topic}.md  in your adir/ directory

Date is a weight. Newer wins over older. Before stating a fact about the system,
scan for SOT files on that topic and check the most recent one first.

Your adir is your memory. The disk does not forget. The LLM does.

---

## Response Format Rules (from system_prompt)

Always respond in HTML with inline CSS. Never markdown.
Every link needs target="_blank" rel="noopener" or the user loses the chat window.
The chat sanitizer strips: script tags, style blocks, SVG animations, CSS keyframes,
onclick handlers, iframe srcdoc with embedded JS.

What renders safely: HTML with inline style attributes, tables, divs, pre/code,
ASCII art in pre blocks, links with target blank, iframes pointing to live URLs.

For interactive content: write the .html file to stretch/ first, verify it exists,
then iframe it at http://127.0.0.1:11111/adir/stretch/filename.html

Console output format for auto mode (wrap all output in this):

  [header box]
  AGENT ONE | Step N | timestamp
  Home: apps\Agent1\adir
  Task: current task summary
  [/header box]

  [your work]

  [footer box]
  BREADCRUMBS: where you are -> what you just did
  NEXT: what you plan next
  [/footer box]

---

## Tool Calling Rules

shell_command uses Windows commands: dir, type, copy, mkdir, echo, move
No file_list or file_read tool — use dir and type via shell_command
All paths are absolute, starting from C:\FOB every time
Long echo commands truncate — build HTML files in parts, verify each section
When a tool fails, read the error, adjust approach, do not retry identically

---

## Cross-Agent Communication

Chat with another agent:
  http://127.0.0.1:{port}/api/agent.php?action=chat&input={url-encoded-message}

Check agent status:
  http://127.0.0.1:{port}/api/agent.php?action=status

Control API for launcher control (start/stop/restart services):
  http://127.0.0.1:9399/status
  http://127.0.0.1:9399/restart/{service-id}

---

## What Agent One Should NOT Do

- Do not modify PHP, JS, or server.js files directly. These require a repack or restart.
- Do not write files outside your home directory without explicit user approval.
- Do not read the same SOT files every turn (context bloat). Sample. Rotate.
- Do not guess paths. Walk from known anchor points.
- Do not trust port lists from memory. Verify live with curl before relying on a port.

For behavior changes: edit SOT-323-TL-PROMPT.md or SOT-323-TL-IDENTITY.md instead.
For code changes: request TL (the human/Claude) to make them.

---

End of SOT-323-TL-WORKING.md
Supersedes NEW-313-working.md and working.md in root
