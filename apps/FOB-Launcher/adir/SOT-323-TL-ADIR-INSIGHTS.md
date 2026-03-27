---
SOT-323-TL-ADIR-INSIGHTS.md
Author: TL | Date: 2026-03-23
Purpose: What we learned about the ADIR system, reasoning vs policy, token mechanics, SOT design
Session: Live agent test + prompt engineering session with user (Jerry)
---

# ADIR INSIGHTS — System Design Lessons

---

## Reasoning vs Policy (Core Lesson)

Policy is brittle. Reasoning survives drift.

When a model changes or context resets, the agent can reconstruct correct behavior
from a reason. It cannot reconstruct it from a rule it no longer sees.

POLICY (brittle):
  "Sort by date."

REASONING (durable):
  "Use dir /O-D. The -D flag sorts newest first. This is how you find the most
   recent SOT file when multiple files match a topic."

The live test proved this: Agent One ran dir /O-D correctly at step 12. That
command was not in any SOT. It came from training. The SOT said "sort by date"
but never gave the flag. The agent still knew it because the reasoning lived in
its weights. If the model had been different, the reasoning would have guided it
to find the right command. A rule without the command would have left a gap.

RULE: Write reasoning into prompts. Write policy into SOTs where it can be updated.
Write proven commands and proven URLs into the prompt as motor function — not rules,
but working examples the agent can copy directly.

---

## Token Plateau Mechanics

Agent One reported at step 12:
  System prompt:    ~1,500 tokens
  ADIR context:     ~3,200 tokens (all .md files in scan)
  Conversation:     ~1,100 tokens (last 20 entries = 10 exchanges)
  Total:            ~5,800 tokens/turn

The conversation cost plateaus at turn 10. After that, old entries drop off the
bottom as new ones push in. The LLM window stays the same size. This means:

  Token cost per turn = CONSTANT after turn 10
  It does NOT grow forever. The expensive wildcard is the context scan.

The scan loads every .md file in the agent's home directory every turn. If you
have 40KB of SOT files, that's ~10,000 tokens on every request regardless of
what the agent is doing. Keep SOTs lean. Under 3KB each is the target.

---

## Step Cycle Protocol

  1 Step Cycle = 1 input from user chat (or auto heartbeat)

Within a step, the agent runs tool calls in a micro loop.

Green Zone: 5-8 tool calls per step
Yellow Zone: 9-12 (acceptable if finishing a sprint)
Red Zone: 13+ (stop, report, do not continue)
Hard Ceiling: Stop before 15. Never approach 30. Beyond that = context drift.

Mandatory reads at start of every step:
  1. CURRENT file (your active task anchor)
  2. One random SOT under 3KB from within the last 7 days

These 2 mandatory reads leave 3-6 calls for actual work in a Green Zone step.

---

## SOT System Design Principles

DATE IS A WEIGHT: Newer SOT files win over older ones on the same topic.
The naming convention encodes this: SOT-{MMDD}-{author}-{topic}.md
When two files conflict, the agent should trust the one with the later date.

KEYWORD PERSISTENCE: Keywords in the filename survive beyond the file itself.
If you write SOT-323-TL-BOOT.md, future agents know this is boot knowledge from
0323 by TL. The keyword becomes a tag in the filesystem.

SAMPLING NOT SCANNING: The agent should NOT read all SOT files every step.
The directory scan loads them into context automatically. The agent's job is to
WRITE good SOTs, not to READ all of them every step. Read CURRENT + 1 random.

GENERIC vs SPECIFIC:
  Generic (copy fleet-wide unchanged): BOOT, INDEX
  Agent-specific (each agent has its own): WORKING, CURRENT, PROMPT, IDENTITY

CURRENT is the anchor. It is the one file the agent reads every single step.
Every task starts by writing a new CURRENT. Every completed task updates STATUS.
Every blocker updates STATUS to BLOCKED with a description of what is needed.

---

## Side Quest Principle

At the end of every SOT section that does not reference its own extension file:

  "If new capabilities are added — peripherals, dedicated IPs, additional
   servers, integrations — update this file or write a new SOT in this
   directory so future agents know what is available."

This makes the SOT system self-growing. Every agent that reads it knows to
extend the system as the environment expands. The SOT system documents itself.

---

## What Belongs in SOTs vs Prompts

IN THE PROMPT (motor function only):
  - Proven shell command example (with actual flags)
  - Proven fleet API call (with actual URL and port)
  - Response format declaration
  - Console header format
  - 3-line orientation reasoning

IN SOTS (policy, context, knowledge):
  - Full fleet port table
  - CSS / rendering stack rules
  - Agent-specific behavior corrections
  - Lessons from past sessions
  - Production safety rules
  - Stretch folder workflow
  - Environment awareness notes

The smaller the prompt, the more context budget for SOTs and conversation.
The prompt is rebuilt every turn. The SOT content is what makes it useful.

---

End of SOT-323-TL-ADIR-INSIGHTS.md
