---
SOT-323-TL-BOOT.md
Author: The Last (TL) | Date: 2026-03-23
Scope: GENERIC — drop this into any agent's adir folder unchanged
Purpose: Explains the ADIR system, hub, tools, and how all agents boot
Supersedes: NEW-313-BOOT.md
---

# BOOT — The ADIR System & Agent Architecture

This file explains how any agent in the FOB fleet is structured, how it boots,
and what shared infrastructure is available. It is intentionally generic —
the same file can be placed in any agent's adir folder.

---

## What Is ADIR

ADIR is the coordination framework that all agents run inside. It is not an AI —
it is a file and folder standard. Every agent has an `adir/` directory that acts
as its persistent memory, navigation map, and documentation home. The agent's
scan picks up .md files from this directory and includes them in its context.

Key principle: **your adir IS your memory**. When you wake up with no session
context, list your adir, sort by date, and read your newest SOT files. Your past
self left them for this exact moment.

---

## The Hub

**ADIR Hub** lives at: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\`
**Port:** 9303
**URL:** http://127.0.0.1:9303/

The hub is the central command dashboard. It runs an Express server and exposes
the ADIR coordination files (CURRENT.txt, WORKING.txt, FEED.txt) to agents that
poll it. It is not your manager — it is a shared bulletin board.

Hub TOOLS directory: `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\`
This contains shared tools all agents can call: KB-Maker, Agent-Dropper, Parser,
StartPower, Librarian, TANDRSocial templates.

---

## How an Agent Boots

Every agent is a Node.js Express server running from its home directory. The boot
sequence on startup:

```
1. node server.js starts on assigned port
2. Express registers routes — /api/:script → PHP CGI handler
3. PHP scripts handle all AI logic (config.json, memory, context, LLM calls)
4. scan_directory scans for .md files → builds context cache
5. On first chat request: system_prompt + context + memory → sent to LLM
```

**The system prompt is rebuilt on EVERY request** — it is not cached between turns.
The context (directory scan) is cached and reused unless explicitly refreshed.

### Absolute Paths (Windows)

All shell commands use full absolute paths. Never relative. Examples:
```
Home:    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\{AgentN}\
Adir:    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\{AgentN}\adir\
Stretch: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\{AgentN}\adir\stretch\
API:     C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\{AgentN}\api\
Config:  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\{AgentN}\config.json
```

---

## The Bat File (How FOB Starts Everything)

V3AMFOB (Electron launcher) spawns all agents via the SERVICES array in
`C:\FOB\V3AMFOB\main.js`. Each service entry has a `cwd` and a `cmd`.

When V3AMFOB starts, it runs `node server.js` in each agent's home directory
with `windowsHide: true`. Agents do not get their own terminal windows — their
stdout/stderr pipes into the V3AMFOB log panel.

Manual start if needed:
```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\{AgentN}
node server.js
```

---

## Step Cycles

**1 Step Cycle** = 1 input from the main chat (from the user, or from an auto
heartbeat). This is the outer loop from the agent's perspective.

**Micro cycles** happen inside a step — agent-to-agent calls, tool chains,
sub-requests. These are invisible to the user but consume tokens and time.

**Green Zone** (verified 2026-03-23 by Jerry/TL): **5–8 tool calls per step**.
- Stays under the 30-second PHP CGI timeout
- Maintains LLM attention on tool parameter delimiters
- Atomic — if one call fails, the other 7 succeed and can be reported cleanly

**Breakage limit:** 30+ tool calls in a step → 504 Gateway errors, attention drift,
context log bloat. Do not approach this ceiling.

---

## Mandatory Per-Step Reads (SOT Protocol)

At the start of each step cycle, spend 2 of your tool calls on:

1. **Read CURRENT** — `SOT-task-{date}-TL-CURRENT.md` — your active task and state
2. **Read one random SOT** — pick a file smaller than ~3KB and newer than 7 days

This keeps your context fresh without blowing your token budget on stale history.
Do not read every SOT every turn. Sample. The newest files win.

---

## Memory Architecture

```
Request arrives → PHP loads config.json → reads memory/{personality}.json
              → takes last 20 entries (10 exchanges, array_slice -20)
              → builds: system_prompt + context + history[20] + new input
              → sends to LLM as one big prompt string
              → appends response to memory file
```

Memory is **disk-backed** (survives restarts). History is **capped at 20 entries**
in the LLM prompt (the file grows indefinitely on disk). Token cost plateaus after
turn 10 — not infinite. The context (directory scan) is the expensive wildcard.

**Implication for SOT strategy:** Keep your SOT files lean. The context scan
pulls in every .md file in your scan_directory. 50KB of markdown rides along on
every single turn. Prefer many small, targeted SOTs over a few giant ones.

---

## Production Safety Rules

- **Your home adir is yours.** Read and write freely inside it.
- **Outside your home:** read and observe only. Do not modify other agents' files
  without explicit user approval.
- **Stretch folder** is your sandbox for code experiments.
- **Do not self-modify your own PHP or JS code while live.** Use the PROMPT and
  IDENTITY SOTs to change your behavior. Code changes require a human + repack.
- **Walking directories:** never guess a path. Start from a known absolute, list
  contents, move one step at a time.

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF SOT-323-TL-BOOT.md                                           ║
║  Supersedes NEW-313-BOOT.md | Generic — valid for all agents         ║
╚══════════════════════════════════════════════════════════════════════╝
```
