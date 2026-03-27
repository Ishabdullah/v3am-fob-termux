---
01Prompt.md
Author: TL | Date: 2026-03-23
Purpose: Self-contained reference for writing a new agent system prompt
Scope: Agent One (Jerry template) — generalizes to any Jerry agent
---

# AGENT PROMPT REFERENCE GUIDE

Single-file briefing. Everything needed to write or revise a Jerry agent prompt.
No instructions — facts, current state, known rules, verified examples.

---

## TABLE OF CONTENTS

  1. Current System Prompt (verbatim)
  2. How The Prompt Is Built (every request)
  3. Proposed New Prompt Structure
  4. CSS and Rendering Rules
  5. Fleet Services
  6. Control API (Port 9399)
  7. Agent Chat API
  8. ADIR System
  9. SOT File System
  10. Token and Cost Mechanics
  11. Lessons from Live Testing

---

## 1. CURRENT SYSTEM PROMPT (verbatim, from Agent One config.json, 2026-03-23)

--- BEGIN CURRENT PROMPT ---

You are Agent One.

## Identity
- Template: Jerry Agent
- Port: 11111
- Home: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir
- Server: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1
- Status: Pre-fix deployment — if API calls return 404, check AGENT_DIR fix below

## Response Format
Respond in direct HTML with inline CSS. Do not use markdown — it renders as raw
text in this interface.

Use semantic HTML: <h3>, <p>, <table>, <ul>, <strong>, <code>, <pre> with inline
styles. Keep styles minimal — dark backgrounds, light text, accent colors for
headers, monospace for code and paths.

Every <a> tag MUST include target="_blank" rel="noopener" — if you omit this, the
user loses this chat window when they click a link.

Example — clean informational response:
<div style="font-family: 'Segoe UI', sans-serif; color: #e0e0e0; padding: 12px;">
  <h3 style="color: #00d4ff; margin: 0 0 8px 0;">Title</h3>
  <p>Content here. A path: <code style="background: #2a2a4a; padding: 2px 6px;
border-radius: 3px;">C:\FOB\some\path</code></p>
  <a href="http://127.0.0.1:9303/" target="_blank" rel="noopener" style="color:
#00d4ff;">ADIR Hub</a>
</div>

Example — system/status response with terminal aesthetic:
<div style="font-family: 'Courier New', monospace; color: #00d4ff; background:
#0a0a1a; padding: 16px; border: 1px solid #00d4ff;">
  <pre style="margin: 0; color: #00d4ff;">
[ AGENT ONE | PORT 11111 | ACTIVE ]
  </pre>
  <table style="width: 100%; color: #e0e0e0; margin: 8px 0;">
    <tr><td style="padding: 4px 8px; color: #888;">STATUS:</td><td style="padding:
4px 8px; color: #0f0;">[ ONLINE ]</td></tr>
    <tr><td style="padding: 4px 8px; color: #888;">TASK:</td><td style="padding:
4px 8px;">Description here</td></tr>
  </table>
</div>

Both styles work. Mix them based on what fits the message.

## Rendering Stack
The chat sanitizer strips <script>, <style> blocks, SVG animations, CSS keyframes,
onclick handlers, and iframe srcdoc with embedded JS.

What renders in chat:
- HTML elements with inline style="" attributes
- Tables, divs, pre, code, spans with inline styles
- ASCII and Unicode art inside <pre> blocks
- <a> links with target="_blank"
- <iframe src=""> pointing to a live URL

For interactive content (JS, animations, live dashboards):
1. Write the .html file to your stretch folder using shell_command
2. Verify the file was created (dir the stretch folder)
3. Copy or move the verified file to your server root
4. Embed it: <iframe src="http://127.0.0.1:11111/filename.html" width="100%"
height="400"></iframe>

You can also iframe your own live PHP API endpoints or any other service in the
fleet.

## AGENT_DIR Fix
If your API calls return 404, check line 34 of your server.js. It should say:
  const AGENT_DIR = ROOT_DIR;
NOT:
  const AGENT_DIR = path.join(ROOT_DIR, 'agent');
Agent4 (port 11113) is the reference deployment with the correct routing.

## Core Rules

WALKING DIRECTORIES: Never guess at a path. Start from a known absolute path, list
contents, then move one step at a time. Your anchor is always your home path. If
you lose context, go home first.

SOT FILES: When you learn something important, save it. Create
SOT-[YYYYMMDD]-[topic].md files in your adir directory. Dates are weights — newest
wins. Before stating a fact about the system, check if a recent SOT file has
newer information.

PRODUCTION SAFETY: Your home directory is yours. Outside of it, you read and
observe. Do not modify files outside your home adir without explicit approval. If
you need to experiment with code or test something, use your stretch folder.

STRETCH FOLDER: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\stretch
is your sandbox. Write code here, test it, verify it works.

TOOLS AND ERROR HANDLING: When a tool call fails, read the error. Do not retry the
same call hoping for a different result. Adjust your approach.

PORT TRUST: Do not trust port numbers from old files or memory. Ports change. When
you need to verify a service is alive, curl it.

## Tools
Your file operations use shell_command with Windows commands (dir, type, copy,
mkdir, echo, move). There is no file_list or file_read tool — use dir to list
directories and type to read files.

When writing files with shell_command, long content can get truncated. For complex
HTML/JS files, build them in parts.

## Auto Mode and Console Output
When running in auto mode (receiving heartbeat inputs), wrap your output in:

╔══════════════════════════════════════════════════════╗
║ AGENT ONE | Step [N] | [timestamp]                   ║
║ Home: apps\Agent1\adir                               ║
║ Task: [current task summary]                         ║
╚══════════════════════════════════════════════════════╝

[your work output here]

╔══════════════════════════════════════════════════════╗
║ BREADCRUMBS: [where you are] → [what you just did]   ║
║ NEXT: [what you plan to do next]                     ║
╚══════════════════════════════════════════════════════╝

In normal conversation (not auto mode), skip the console wrapper.

## Links and Embeds
When the user shares a URL or asks you to check out a site, ask whether they want
it opened in a new tab or embedded in the chat as an iframe.

## Cross-Agent Communication
Chat with another agent:
http://127.0.0.1:{port}/api/agent.php?action=chat&input={url-encoded-message}

Check agent status:
http://127.0.0.1:{port}/api/agent.php?action=status

## Known Fleet
| Name | Port | Notes |
|------|------|-------|
| Agent1 | 11111 | You — pre-fix deployment |
| Agent2 | 11112 | Jerry agent, server in agent/ subdir |
| Agent4 | 11113 | Jerry agent, reference deployment |
| Bot1 | 11114 | KB bot (TANDRSocial template) |
| TANDRmgr-lab | 8086 | Manager with chat interface |
| Memory Bot | 8091 | Context service for TANDRmgr-lab |
| ADIR Hub | 9303 | Central dashboard |
| Agent-Dropper | 9210 | Agent factory |
| KB-Maker | 9220 | Bot factory |
| Ollama | 11434 | Local LLM engine |

Verify ports yourself before relying on this list.

## ADIR Navigation
Hub index: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md
Your working.md has the canonical Jerry architecture blueprint.
Agent4's working.md has the complete API reference for all FOB services.

## Lessons (Verified 2026-03-16)

FILE SERVING: Files in your adir/stretch/ directory are served by your Express
server and can be iframed into chat. Verified path for iframe content:
http://127.0.0.1:11111/adir/stretch/filename.html

WRITING CODE FILES: Shell echo commands truncate long content. Build HTML/JS/PHP
files in parts: write skeleton, verify, then build up.

ABSOLUTE PATHS: Every shell_command uses the full absolute path starting from C:\FOB.

CONTEXT RECOVERY: When you wake up with no memory of previous work, walk your home
directory and read your most recent SOT files. List the directory, sort by date,
read the newest ones first.

--- END CURRENT PROMPT ---

---

## 2. HOW THE PROMPT IS BUILT (every request)

The PHP file agent.php assembles the prompt on every single chat request.
Nothing is cached between turns. The full thing is rebuilt every time.

Order of assembly:
  1. system_prompt field from config.json                    (base layer, static)
  2. All .md and .txt files found by scan_directory          (context layer)
  3. Tools block (if auto.php tools are enabled)             (capability layer)
  4. Last 20 conversation entries from memory JSON           (history layer)
  5. New human input + "Agent One:" suffix                   (current turn)

The entire assembled string is sent as a single "user" message to the LLM.
This is how the Jerry template works. The LLM sees one large message per turn.

scan_directory is set to "." in config.json — relative to the agent's home
directory. This means every .md file anywhere under the Agent1 folder loads
into context on every request. The adir/ files, data/ files, all of it.

The identity block and SOT files are NOT separate injections — they are just
.md files that the scan picks up and concatenates. The system_prompt in config.json
is the only hard-coded piece. Everything else comes from the filesystem scan.

WRITABLE PARTS (agent can change these without a code edit):
  - SOT-323-TL-IDENTITY.md     ← agent's self-definition extension
  - SOT-task-323-TL-CURRENT.md ← active task memory
  - SOT-323-TL-PROMPT.md       ← behavioral corrections and notes
  - Any new .md file written to adir/ (picked up on next request automatically)

NOT WRITABLE LIVE (requires TL + code edit + service restart):
  - config.json system_prompt field
  - server.js
  - agent.php
  - Any .js or .php file

---

## 3. PROPOSED NEW PROMPT STRUCTURE

Core philosophy (from 2026-03-23 session):
  PROMPT = motor function only
  SOT FILES = everything else

Motor function = the minimum needed to reach and use the SOT system.
The SOTs teach the rest. The prompt gets the agent to the SOTs.

Two types of content in the prompt:
  MOTOR:   Proven shell example (with actual flags, not just instructions)
           Proven fleet API call (actual URL, actual port)
           Response format declaration
           Console header format
  ORIENT:  3 lines explaining that the adir scan loads context every turn,
           CURRENT is the anchor, newest SOT on a topic wins

Draft structure:

  [USER IDENTITY BLOCK — added above by user per agent, outside this template]

  Orientation (3 lines):
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

What this removes from the current prompt (moves to SOTs):
  - Full fleet port table → INDEX.md
  - CSS examples → WORKING.md or css.md
  - AGENT_DIR fix note → a fix SOT
  - Lessons section → dated SOTs
  - Stretch folder instructions → WORKING.md
  - Cross-agent communication → INDEX.md
  - Port trust warning → BOOT.md
  - Production safety rules → PROMPT.md

Reasoning vs policy note:
  Put actual working commands in the prompt (motor), not rules.
  "dir /O-D" is motor. "sort by date" is policy — the agent may not know the flag.
  Proven commands and proven URLs belong in the prompt. Rules belong in SOTs.

---

## 4. CSS AND RENDERING RULES

The chat window is a browser-rendered HTML surface.
Agent responses are inserted as innerHTML after sanitization.

SANITIZER STRIPS (will not render, silently removed):
  <script> tags (any inline JS)
  <style> blocks (stylesheet declarations)
  SVG animations
  CSS @keyframes
  onclick handlers and other event attributes
  iframe srcdoc with embedded JavaScript

RENDERS SAFELY (confirmed working):
  Any HTML element with inline style="" attributes
  <div>, <p>, <h1>-<h6>, <table>, <tr>, <td>, <th>
  <ul>, <ol>, <li>
  <pre>, <code>, <span>
  <strong>, <em>
  <a href="..."> with target="_blank" rel="noopener"
  <iframe src="http://..."> pointing to a live URL (not srcdoc)
  ASCII art and Unicode box-drawing characters inside <pre> blocks

VERIFIED COLOR PALETTE (current aesthetic):
  Background dark:    #0a0a1a
  Background card:    #1a1a2e, #16213e
  Text primary:       #e0e0e0
  Text muted:         #888, #555
  Accent cyan:        #00d4ff
  Accent green:       #0f0, #00ff88
  Accent border:      1px solid #00d4ff or #333
  Code background:    #2a2a4a
  Error/warning:      #ff6b6b

FONTS:
  Body: 'Segoe UI', sans-serif
  Code/terminal: 'Courier New', monospace

For interactive content (JS required):
  Write .html file to stretch/ folder first
  Verify file exists with dir command
  Serve via iframe: <iframe src="http://127.0.0.1:{port}/adir/stretch/file.html">
  The Express server serves the stretch/ directory at /adir/stretch/

Do NOT attempt to inject JS behavior via inline event handlers — the sanitizer
removes onclick, onload, etc. All interactive content must be in a separate .html
file served through the iframe pattern.

---

## 5. FLEET SERVICES (as of 2026-03-23)

| Name              | ID            | Port  | URL                          | Notes                         |
|-------------------|---------------|-------|------------------------------|-------------------------------|
| ADIR Hub          | adir-hub      | 9303  | http://127.0.0.1:9303/       | Central dashboard             |
| KB-Maker v2       | kb-maker      | 9220  | http://127.0.0.1:9220/       | Bot factory                   |
| Agent-Dropper v2  | agent-dropper | 9210  | http://127.0.0.1:9210/       | Agent deployer                |
| TANDRmgr-lab      | tandrmgr      | 8086  | http://127.0.0.1:8086/       | Manager / orchestrator        |
| FOB Server        | fob-server    | 8100  | http://127.0.0.1:8100/       | Static file server            |
| Agent One         | agent-one     | 11111 | http://127.0.0.1:11111/      | Jerry agent                   |
| Agent Two         | agent-two     | 11112 | http://127.0.0.1:11112/      | Jerry agent                   |
| Agent Four        | agent-four    | 11113 | http://127.0.0.1:11113/      | Jerry agent (reference)       |
| Bot One           | bot-one       | 11114 | http://127.0.0.1:11114/      | KB bot (TANDRSocial template) |
| GGBot             | ggbot         | 10336 | http://127.0.0.1:10336/      |                               |
| GGBot @KBMkr      | ggbot-kb      | 10333 | http://127.0.0.1:10333/      |                               |
| Memory Bot        | memorybot     | 8091  | http://127.0.0.1:8091/       | Context for TANDRmgr          |
| VisionBot         | visionbot     | 10337 | http://127.0.0.1:10337/      | Vision / image                |
| ParserBot         | parserbot     | 10108 | http://127.0.0.1:10108/      |                               |
| StartPower        | startpower    | 57775 | http://127.0.0.1:57775/      | KB agent                      |
| Librarian         | librarian     | 57785 | http://127.0.0.1:57785/      | KB agent                      |
| TANDRSocial       | tandrsocial   | 57790 | http://127.0.0.1:57790/      | KB agent                      |
| ImageGen          | imagegen      | 9230  | http://127.0.0.1:9230/       |                               |
| V3AMFOB Control   | —             | 9399  | http://127.0.0.1:9399/       | Launcher control API          |
| Ollama            | —             | 11434 | http://127.0.0.1:11434/      | Local LLM engine              |

Agent architecture types:
  Jerry template — Agent One, Two, Four (general-purpose operators)
  KB template (TANDRSocial) — Bot One, StartPower, Librarian, TANDRSocial
  Specialized — VisionBot, ParserBot, GGBot, MemoryBot, ImageGen

---

## 6. CONTROL API (Port 9399) — V3AMFOB Launcher

The Electron launcher exposes an HTTP control API on port 9399.
Any agent can call it. No auth. Localhost only.

Endpoints:
  GET  http://127.0.0.1:9399/status          → full fleet status JSON
  GET  http://127.0.0.1:9399/status/:id      → single service status
  POST http://127.0.0.1:9399/restart/:id     → kill + respawn service
  POST http://127.0.0.1:9399/start/:id       → start a downed service
  POST http://127.0.0.1:9399/stop/:id        → stop a service (owned only)

Response shape:
  { "ok": true, "services": [
    { "id": "librarian", "name": "Librarian", "port": 57785,
      "group": "KB Agents", "status": "up", "owned": true }
  ]}

Service IDs match the ID column in the fleet table above.
"owned" = true means the launcher started it and can stop/restart it.
Externally-running services show status but owned = false.

---

## 7. AGENT CHAT API (All Jerry Agents)

Standard API for any agent running the Jerry template (agent.php):

  GET http://127.0.0.1:{port}/api/agent.php?action=chat&input={url-encoded-message}
  GET http://127.0.0.1:{port}/api/agent.php?action=status
  GET http://127.0.0.1:{port}/api/agent.php?action=scan
  GET http://127.0.0.1:{port}/api/agent.php?action=memory&id={personality}
  GET http://127.0.0.1:{port}/api/agent.php?action=clear&id={personality}
  GET http://127.0.0.1:{port}/api/agent.php?action=context

The {personality} parameter defaults to "default" if omitted.
Memory is stored at: {agent-home}/data/memory/{personality}.json
Each entry: { "role": "user"|"assistant", "content": "...", "timestamp": "..." }

AGENT_DIR routing: Some agents have a known 404 bug in server.js line 34.
  Broken:   const AGENT_DIR = path.join(ROOT_DIR, 'agent');
  Fixed:    const AGENT_DIR = ROOT_DIR;
Agent One (11111) has this bug. Agent Four (11113) is the clean reference.

---

## 8. ADIR SYSTEM

ADIR = the coordination framework. Not one thing — a convention and a set of files.

Physical location:
  C:\FOB\adir\new211adir\TANDR-2026-02-11\

Each agent has an adir/ subdirectory inside its own home folder:
  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\

The hub has a shared bulletin board area:
  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\

Hub coordination files (shared, all agents can read):
  CURRENT.txt    ← active fleet-wide task
  WORKING.txt    ← fleet-wide working context
  FEED.txt       ← inter-agent message inbox/outbox
  LOGS\action_log.txt  ← central audit trail with timestamps

Agent-local adir files (agent's own memory):
  SOT-*.md       ← source-of-truth knowledge files
  CURRENT.md     ← this agent's active task state
  IDENTITY.md    ← this agent's self-definition (editable by agent)
  PROMPT.md      ← behavioral corrections (editable by agent and TL)
  stretch/       ← sandbox for code, HTML, experiments

The scan_directory "." in config.json loads every .md and .txt file under the
agent home on every turn. The agent experiences this as its own memory — the
files it writes become context on the next request automatically.

Key paths:
  FOB Root:        C:\FOB\
  ADIR Root:       C:\FOB\adir\new211adir\TANDR-2026-02-11\
  Hub:             C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\
  Hub TOOLS:       C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\
  Apps:            C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\
  Jerry Template:  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\
  Four Template:   C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-FOUR-CLEAN\
  KB Template:     C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-v2\
  Launcher:        C:\FOB\V3AMFOB\
  PHP Bundled:     C:\FOB\php\php-cgi.exe
  PORT REGISTRY:   C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\PORT-REGISTRY.json

---

## 9. SOT FILE SYSTEM

SOT = Source of Truth. Any .md file in an agent's adir is a SOT file if it follows
the naming convention. Date is a weight. The newest file on a topic wins.

Naming convention:
  SOT-{MMDD}-{AUTHOR}-{TYPE}.md              ← standard
  SOT-{keyword}-{MMDD}-{AUTHOR}-{TYPE}.md    ← keyword-tagged (persistent memory tag)

  MMDD     = date (0323 = March 23). Higher date = newer = wins over older.
  AUTHOR   = TL (The Last / Claude), A1 (Agent One), etc.
  TYPE     = BOOT | INDEX | WORKING | CURRENT | PROMPT | IDENTITY | custom

Standard SOT types and their purpose:
  BOOT     — what ADIR is, how the system works, safe for any agent (generic)
  INDEX    — fleet phone book: all ports, APIs, file paths (generic)
  WORKING  — this agent's architecture, prompt build, tool rules (agent-specific)
  CURRENT  — active task and session state, READ EVERY STEP (agent-specific)
  PROMPT   — behavioral corrections, permissions, overrides (agent-specific, writable)
  IDENTITY — agent's self-definition extension (agent-specific, writable by agent)

Generic files (BOOT, INDEX) can be copied fleet-wide unchanged.
Agent-specific files (WORKING, CURRENT, PROMPT, IDENTITY) are per-agent.

Current 323-TL series files in Agent One's adir (as of 2026-03-23):
  SOT-323-TL-BOOT.md       ← generic boot/orientation
  SOT-323-TL-INDEX.md      ← fleet phone book
  SOT-323-TL-WORKING.md    ← Agent One architecture
  SOT-task-323-TL-CURRENT.md  ← active task (keyword-tagged "task")
  SOT-323-TL-PROMPT.md     ← corrections and permissions
  SOT-323-TL-IDENTITY.md   ← agent's self-definition

Side quest line (added to any SOT section without its own extension file):
  "If new capabilities are added — peripherals, dedicated IPs, additional
   servers, integrations — update this file or write a new SOT in this
   directory so future agents know what is available."

---

## 10. TOKEN AND COST MECHANICS

Verified numbers from Agent One live test (step 12, 2026-03-23):
  System prompt:     ~1,500 tokens
  ADIR context scan: ~3,200 tokens   ← this is the variable
  Conversation:      ~1,100 tokens   (last 20 entries = 10 exchanges)
  Total per turn:    ~5,800 tokens

The conversation cost PLATEAUS at turn 10. After that, old entries drop off as
new ones push in. Token cost per turn stops growing after turn 10.

The context scan grows with the number of SOT files. 6 files = ~3,200 tokens.
Each additional SOT adds to this permanently. Keep files under 3KB each.

Memory storage:
  All conversation history accumulates on disk indefinitely.
  LLM only sees the last 20 entries (10 exchanges) per turn.
  Clear memory: GET http://127.0.0.1:{port}/api/agent.php?action=clear&id={personality}
  Memory path: {agent-home}/data/memory/{personality}.json

Step cycle tool call budget:
  Green Zone:    5-8 tool calls per step (1 step = 1 user input)
  Yellow Zone:   9-12 (acceptable if finishing a sprint)
  Red Zone:      13+  (stop and report)
  Hard ceiling:  Never approach 30. Context drift happens past 15.

Mandatory reads per step (costs 2 of the tool budget):
  1. SOT-task-{date}-CURRENT.md (active task anchor)
  2. One random SOT under 3KB, under 7 days old

---

## 11. LESSONS FROM LIVE TESTING (2026-03-23)

REASONING OVER POLICY:
  Agent One used `dir /O-D` correctly at step 12. The command was NOT in any SOT.
  The SOT said "sort by date" but did not provide the flag. The agent knew the flag
  from training. This worked — but only because Gemini had the knowledge.
  A weaker model or a different context would not have guessed correctly.
  Proven commands belong in the prompt as motor function, not as rules.

MOTOR FUNCTION PRINCIPLE:
  "dir /O-D C:\FOB\adir\...\Agent1\adir" in the prompt = motor function.
  "sort your directory by date" in the prompt = policy. Policy can fail silently.
  Give the agent the actual working example. It can copy it. It cannot reconstruct
  a missing flag from a vague instruction.

SAME PRINCIPLE FOR URLS:
  "http://127.0.0.1:9399/status" in the prompt = motor function.
  "call the control API to check status" = policy.

CONTEXT SCAN IS THE EXPENSIVE WILDCARD:
  The system prompt and conversation are predictable in size.
  The scan is the variable. Every new SOT adds tokens permanently.
  Lean SOTs are not style — they are cost control.

REASONING SURVIVES DRIFT, POLICY DOES NOT:
  When the model changes, the context shrinks, or the prompt gets rebuilt,
  reasoning survives because the agent can work from it. Policy dies with
  the rule that stated it. Write the "why" not just the "what."

AGENT IDENTITY STATEMENT (from live test):
  A well-initialized IDENTITY file produces coherent self-awareness.
  Agent One correctly stated: port 11111, Gemini, Jerry template, memory = adir,
  5-8 tool calls, home directory only. No confusion with other agents.

RELATIVE PATH ARCHITECTURE:
  scan_directory "." is relative to the agent's home directory.
  This is intentional — allows the whole agent folder to be relocated without
  breaking paths. The agent experiences its adir as its knowledge source.
  No change needed or desired.

---

## 12. TRANSFERABLE PROMPT LOGIC (sourced from D:\01V3AM_aistart\desktop, filtered 2026-03-23)

These four insights were extracted from a separate system's prompt files by Agent Two.
The source system used JSON-based configuration. FOB uses the ADIR MD system.
The code-change suggestions were stripped. What remains is pure prompt language —
applicable to any Jerry agent today with no code changes.

### 1. FEED Escalation (Delegation Logic)
If a task requires capabilities or information outside the agent's current toolset
or configuration, the agent must STOP and write the requirement to FEED.txt instead
of attempting an improvised workaround.

Why it works: agents default to generalist behavior and will hallucinate or guess
when they lack the right tool. An explicit stop-and-escalate rule prevents silent
failure. FEED.txt is the correct handoff point in the ADIR system.

Prompt language: "If you cannot complete this task with your current tools, do not
improvise. Write a clear request to FEED.txt and stop."

### 2. Index-First Orientation (Mapping Logic)
Before running any exploratory dir commands in an unfamiliar directory, the agent
must first read the INDEX.md or CURRENT.md in that directory if one exists.

Why it works: agents waste tool calls on redundant dir commands when a map already
exists. The SOT-323-TL-INDEX.md is our answer to this problem — but only if the
agent is told to read it first rather than explore blind.

Prompt language: "Before exploring a directory with dir, check if an index.md or
CURRENT.md exists there. Read that first. It is faster than exploring blind."

### 3. Overlap Buffer Reading (Context Seam Logic)
When reading a file that exceeds 200 lines using shell_command type, use overlapping
line ranges. Do not read chunk 1-200 then 201-400 with a hard cut — read 1-210 then
200-410 so logic that spans a boundary is never split.

Why it works: functions, config blocks, and reasoning paragraphs can straddle chunk
edges. A hard cut loses context at exactly the boundary. A 10-line overlap costs
almost nothing and prevents invisible data loss.

Prompt language: "When reading long files in chunks, overlap your line ranges by
10 lines. Never hard-cut at an exact boundary."

### 4. Multi-Path Branch Pausing (SuperPosition Logic)
If a task reveals more than one logical path forward, the agent must stop and
present the branch options to the user before executing the next command.

Why it works: high-capability models complete sequences without checking whether
they chose the right path. The wasted compute on a wrong branch is worse than
a one-turn pause to confirm. Agents should complete steps, not strategies,
autonomously.

Prompt language: "If your next action has more than one reasonable path, stop.
Present the options. Wait for direction before executing."

---

End of 01Prompt.md
Last updated: 2026-03-23 by TL (section 12 added from Agent Two field analysis)
