**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\working.md         ║
║  Updated: 2026-03-16 | The blueprint — architecture and decisions.   ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This file explains WHY the system is built the way it is.    ║
║  Read this when you need to understand the design before you modify  ║
║  something. If you just want to know what exists, read REGISTRY.md.  ║
║  If you want to operate it, read BOOT.md.                            ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303  |  This file: working.md               ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How Things Work

This file is the architectural record. It explains the patterns that hold the system together, the decisions that were made and why, and the design philosophy that should guide future changes. If REGISTRY.md is the map and BOOT.md is the manual, this is the engineering notebook.

---

## The Request Flow: Node.js → PHP → Ollama

Every service in FOB follows the same pattern. Understanding it once means understanding them all.

A request arrives at a Node.js Express server. Express doesn't do the work — it's a doorman. It receives the request, figures out which PHP script should handle it, and spawns a PHP process via `C:\FOB\php\php-cgi.exe`. The PHP script does the actual business logic — talking to Ollama for AI responses, reading and writing files, processing data. When PHP finishes, its output flows back through Express to the caller.

Why this split? PHP handles the business logic because it's fast to write, easy to modify, and doesn't require restarting the server when you change a script. Node.js handles the networking because it's better at concurrent connections, CORS, and keeping processes alive. The combination gives you the flexibility of PHP with the robustness of Node.js as a frontend.

**The numbers that matter:**
- PHP execution timeout: **10 minutes** (to allow slow LLM calls through Ollama)
- Max payload size: **10MB** in both directions
- CORS: **Wide open** on all services — any origin can call any endpoint
- PHP binary: `C:\FOB\php\php-cgi.exe` — bundled, not installed separately

When an agent or a bot needs to talk to Ollama, the call goes: Browser → Node.js (port X) → PHP script → Ollama (port 11434) → response cascades back. The default model is **qwen2.5:7b**, but Ollama has 20+ models cached and any of them can be requested.

---

## The ADIR System: Navigation as Architecture

ADIR is the coordination layer that makes this system navigable. It's not a service — it's a pattern. Every directory that matters has an `adir\` subdirectory containing md files that orient whoever arrives there, human or agent.

The pattern is always the same:

1. **REGISTRY.md** — What exists here (the map)
2. **BOOT.md** — How to operate what's here (the manual)
3. **index.md** — Where to go from here (the crossroads)
4. **current.md** — What's happening right now (the pulse)
5. **working.md** — How it works and why (this file — the blueprint)

An agent that wakes up in an unfamiliar directory looks for `adir\` first. If it finds one, it reads these files in order and knows everything it needs to know. If there's no `adir\`, the agent is in uncharted territory and might want to create one.

**Why md files instead of a database?** Because agents read files. An md file is simultaneously human-readable documentation and machine-readable instructions. An agent can read it, act on it, and create a new SOT file to evolve it — all with basic file operations. No database driver, no ORM, no schema migrations. The filesystem IS the database. Dates are weights. The newest file on a topic is the strongest signal.

**Why narrative instead of bullet points?** Two reasons. First, dense narrative survives context window compression better than lists. When the context conveyor belt drops old tokens, a story holds together — a list becomes fragments. Second, analogies engage the LLM more deeply. An agent processing a parable about walking through a building is less likely to shortcut or hallucinate than one scanning a checklist.

---

## The SOT Evolution Pattern

MD files don't get edited by agents — they get evolved. The pattern works like this:

The original md files (the ones you're reading now) are the **base layer**. They describe the system as it existed when they were written. As agents work in the system, they discover new things — a port changed, a service was added, a fix was applied, a decision was made. Instead of editing the base files, agents create **Source of Truth (SOT) files**:

```
SOT-[YYYYMMDD]-[topic].md
```

These go into the `adir\` subdirectory of the relevant location. For the hub, that's:

`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\`

When someone needs to know the truth about a topic, they look for the latest SOT file on that topic. The date in the filename is the weight — newer dates win. If `SOT-20260320-registry-update.md` exists alongside `SOT-20260316-registry-update.md`, the March 20 file is the one to trust.

This is a primitive neural network made of files. The md files are nodes. The links between them are connections. The dates are weights. The system learns by creating new nodes with higher weights, not by overwriting the old ones.

**The exception:** current.md can be directly overwritten. It's the one file that's expected to change in place, because it represents the present moment, not accumulated knowledge.

---

## Agent-Dropper: How Agents Get Born

Agent-Dropper v2 lives at `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Agent-Dropper-v2` and runs on port 9210. It's a factory — you tell it what you want, and it builds it.

When you POST a deploy request, Agent-Dropper:

1. Copies the appropriate template directory (JERRY or TANDRSOCIAL) from `adirhub\TOOLS\`
2. Writes a `config.json` with the agent's name, port, and model settings
3. Fixes the `server.js` routing — sets `AGENT_DIR` correctly so API calls find the PHP scripts
4. Generates a `START-[AgentName].bat` for easy startup

Templates live at:
- `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN\` — standard agent template
- `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN\` — bot template

Deployed agents land in:
- `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\[AgentName]\`

**The AGENT_DIR Fix (2026-03-15):** Before this date, Agent-Dropper deployed agents with `const AGENT_DIR = path.join(ROOT_DIR, 'agent')` in their server.js. This pointed to a subdirectory that didn't exist in the JERRY template — the PHP files sit at the root level, not inside an `agent\` subfolder. Every API call returned 404. The fix was simple: `const AGENT_DIR = ROOT_DIR;`. Agent-Dropper v2 now applies this fix automatically during deployment. Agent4 was the first agent deployed with the fix, and it works. Agents 1-3 still have the bug and need either a manual edit or a redeploy.

---

## The Dashboard: ADIRHUB.html

The web dashboard at [http://127.0.0.1:9303/](http://127.0.0.1:9303/) is a single HTML file backed by JavaScript and the PHP API.

- **ADIRHUB.html** — the page structure and layout
- **js/adirhub.js** — all the logic: project loading, file viewing/editing, status checks, markdown rendering
- **api/adir-api.php** — the backend: project scanning, file I/O, service status

The dashboard does three things:

1. **Status monitoring** — a bar at the top with green/red indicators for every service. Auto-refreshes every 30 seconds by hitting the `check_status` API endpoint, which does a real port scan.

2. **Project navigation** — a sidebar tree showing every project, tool, and their adir files. Built by the `scan_projects` API endpoint, which walks `apps/` and `adirhub/TOOLS/` looking for directories with `adir\` subdirectories.

3. **File viewing and editing** — click any md file in the sidebar and it renders in the main panel. The markdown renderer in adirhub.js handles headers, tables, bold, code blocks, and links. Links to `.md` files are intercepted and loaded inline instead of navigating away.

**Important for md file authors:** The dashboard renders your files. Keep your markdown standard — headers, tables, code fences, links, bold. The renderer is custom but covers the basics. Avoid exotic markdown extensions.

---

## Every Service Gets Its Own Room

This is a design decision, not an accident. Every service runs as its own Node.js process, in its own terminal window, on its own port. No service shares a process with another.

Why? Because PHP's built-in server is single-threaded. Early versions of the system used PHP directly and suffered from zombie CLOSE_WAIT connections — a single slow request would block everything behind it. The move to individual Node.js Express servers solved this permanently. Each server manages its own connection pool, its own timeouts, its own lifecycle.

The windows are titled `FOB - [ServiceName]` so you can see at a glance what's running. MasterSTART6 launches them all. If one crashes, the others keep going. You can restart a single service without touching anything else.

---

## The Port System

Ports are allocated by convention, not by a central registry service. The current allocation:

- **8086-8091** — Applications (TANDRmgr-lab, Memory Bot)
- **9210-9303** — Core tools (Agent-Dropper, KB-Maker, ADIR Hub)
- **10108-10336** — Optional services (ParserBot, GGBOT)
- **11111-11114** — Deployed agents and bots
- **11434** — Ollama (external to FOB)

Next available agent port: **11115**. When deploying a new agent, always check what's already taken. The definitive list is in `MasterSTART6.bat` — that's the file that actually starts everything, so its port assignments are ground truth.

There's a `PORT-REGISTRY.json` in the TOOLS directory, but it may be stale. When in doubt, check MasterSTART6.bat or scan the ports live.

---

## The Three Eras

This system has been through three major phases. Understanding this history helps you interpret old files you might find lying around.

**Era 1 (February 2026):** The original TANDR system. Lived at `C:\TandrHub`. Had agents named Jerry, Randy, and Tommy. Service Manager ran on port 9999. Startup was through `C:\STARTPOWER`. TANDRbot (8081), TANDRCRM (9200), and a dozen other services. All of this is gone.

**Era 2 (Late February 2026):** The deployment package phase. STATMASTER bats, 3AI Mobile, START-HERE.md. A transitional period where the system was being packaged for portability. Short-lived.

**Era 3 (March 2026 — Now):** FOB thin client. Everything lives at `C:\FOB`. Four core services, Ollama for AI, Agent-Dropper for spawning new agents, ADIR Hub for coordination. MasterSTART6 as the startup. This is the current reality.

If you find a file that mentions `C:\TandrHub`, Service Manager, Jerry/Randy/Tommy, or ports like 9999, 8081, 9200 — you're reading Era 1. Ignore it for operational purposes. It's historical context, not current instructions.

---

## Design Principles

These aren't written in stone, but they've proven useful:

**Absolute paths everywhere.** Never relative, never guessed. An agent should be able to read a path in any file and go directly there without calculating where it is relative to something else. When the context conveyor belt drops the agent's sense of where it was, an absolute path still works.

**Walk, don't fly.** When exploring, start from a known anchor path, list what's there, and move one step at a time. Don't guess at directory structures or assume a path exists because a file said it should. The filesystem is the truth.

**Every room has a sign.** The `adir\` directory pattern means you never arrive somewhere with zero context. If a directory has an `adir\` folder, read it. If it doesn't, you're in uncharted territory.

**The newest date wins.** When two files contradict each other, the newer one is right. Dates are weights. The system evolves forward, not in place.

**Templates are agnostic.** This system is a template. Anyone can use it — a developer deploying agents, a user loading chat logs, anyone building their own AI workspace. The md files explain HOW to navigate, HOW to remember, HOW to evolve. They don't assume who you are or what you're building. They teach the pattern and get out of the way.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You understand the architecture. Your next move:                    ║
║                                                                      ║
║  → See what's happening right now:                                   ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\current.md       ║
║                                                                      ║
║  → Go back to the crossroads:                                        ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  → Check the map:                                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\REGISTRY.md      ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-working-update.md                                    ║
║  Place in: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\    ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
