**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Agent-Dropper-v2\adir\working.md                                   ║
║  Updated: 2026-03-16 | The blueprint — how the factory works.        ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This explains Agent-Dropper's architecture — how it copies   ║
║  templates, fixes routing, generates configs, and produces running   ║
║  agents.                                                             ║
║                                                                      ║
║  Service: http://127.0.0.1:9210                                     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How Agent-Dropper Works

Agent-Dropper v2 is unlike the other services in FOB. Most services follow the Node.js → PHP CGI pattern — Express receives the request, spawns PHP to do the work. Agent-Dropper handles its deployment logic entirely in Node.js. The `server.js` is the factory itself, not just a wrapper.

---

## The Deployment Engine

The heart of Agent-Dropper is the `/api/deploy-agent` POST handler (lines 179-454 of server.js). It's a sequential pipeline:

**Phase 1: Validation**
Checks for required fields: `name`, `type`, and `path`. Port is optional. Creates the target directory if it doesn't exist.

**Phase 2: Template Copy**
Uses `copyDirSync()` — a recursive directory copy that skips `node_modules`, `upload`, and `.git`. The source is hardcoded to:
`C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\TEMPLATE-JERRY-CLEAN`

If that's missing, it falls back to copying from `apps\TANDRCRM`. This fallback is legacy — in the current system, TEMPLATE-JERRY-CLEAN should always exist.

**Phase 3: Directory Scaffolding**
Ensures `api/`, `adir/logs/`, and `data/` exist in the deployed directory, creating them if the template copy didn't include them.

**Phase 4: The AGENT_DIR Fix**
This is the critical patch added on 2026-03-15. It reads the deployed `server.js`, finds the line `const AGENT_DIR = path.join(ROOT_DIR, 'agent')`, and replaces it with `const AGENT_DIR = ROOT_DIR;`. This fixes the routing bug that caused 404s on Agents 1-3. Uses a regex replace, so it only matches the exact pattern.

**Phase 5: Configuration**
Reads any existing config.json from the copied template, then merges deployment parameters on top. Sets `_meta` (name, version, template, deploy timestamp), `port` at root level, `paths`, LLM defaults, voice settings, and knowledge bot linking. Writes the merged config back.

**Phase 6: Scaffolding Files**
- Creates a clean `conversations.txt` in `adir/logs/`
- Ensures `package.json` exists (creates a minimal one if missing)
- Generates `START-[NAME].bat` and `STOP-[NAME].bat`
- Writes a `BOOT.md` with deployment details

**Phase 7: Response**
Returns JSON with success status, agent details, URL, and list of files created.

---

## Why Node.js Instead of PHP

Every other service in FOB routes API calls through PHP CGI. Agent-Dropper doesn't — its deployment logic runs directly in the Express handler. This is because deployment involves heavy filesystem operations: recursive directory copying, file reading and patching, multiple file writes. Spawning PHP for each of these steps would be slow and fragile. Node.js handles filesystem operations natively and can do the entire deployment in a single synchronous pass.

The `server.js` still has some PHP-style endpoint names (like `/api/voice.php` and `/api/ngrok.php`), but these are actually handled by Express route handlers in JavaScript, not by PHP scripts.

---

## The Template Selection Problem

Currently, Agent-Dropper only copies TEMPLATE-JERRY-CLEAN regardless of what `type` value you pass. The deploy body accepts `"type": "jerry"` or `"type": "tandrsocial"`, but the code (line 195) always copies from the JERRY template path.

To properly support TANDRSOCIAL deployments, the deploy handler would need a template selector:
- `"type": "jerry"` → copy from `TEMPLATE-JERRY-CLEAN`
- `"type": "tandrsocial"` → copy from `TEMPLATE-TANDRSOCIAL-CLEAN`

This is a known limitation, not a bug — it was built for jerry-type agents first and the tandrsocial path hasn't been wired up yet.

---

## Voice and ngrok: Optional Features

**Voice module** — Uses the browser's Web Speech API for text-to-speech. No server-side audio processing. Configured in config.json under `voice`. The `/api/voice.php` endpoint (despite the name, handled in JS) returns voice status and settings.

**ngrok** — Placeholder support for creating an ngrok tunnel to expose Agent-Dropper remotely. Currently in placeholder status (`auth_token: "placeholder_token_here"`). When configured with a real token and domain, Agent-Dropper can start an ngrok tunnel at boot and be accessible at a public URL.

Neither feature affects the core deployment functionality.

---

## The Config Architecture

Agent-Dropper's config.json serves double duty:

1. **Its own configuration** — port (9210), LLM provider, voice settings, ngrok settings, UI tabs
2. **Template for deployed agents** — When it writes a deployed agent's config.json, it merges the template's config with deployment-specific overrides

This means Agent-Dropper's config.json has sections that don't affect Agent-Dropper itself (like `templates.jerry.port_range`) but exist as reference data for the deployment process.

---

## Design Decisions

**Why hardcode the template path?** Simplicity. There are only two templates and they live at known, fixed locations. A dynamic template registry would add complexity without benefit at this scale.

**Why generate bat files?** Windows convenience. Each deployed agent gets its own START and STOP bat so it can be launched independently from MasterSTART6. The START bat also handles copying `node_modules` from a known location if the deployed agent doesn't have them yet.

**Why merge configs instead of overwriting?** The template config.json has useful defaults (LLM providers, security settings, tool definitions) that the deployment shouldn't destroy. Merging preserves template defaults while allowing deployment-specific values to take priority.

**Why the AGENT_DIR fix as a regex?** Targeted precision. The regex `const AGENT_DIR = path\.join\(ROOT_DIR, 'agent'\);` matches only the exact bug pattern. If someone manually edits the server.js to use a different pattern, the fix won't interfere.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You understand how the factory works. Your next move:               ║
║                                                                      ║
║  → See the templates it deploys from:                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\BOOT.md                                ║
║                                                                      ║
║  → See the agents it created:                                        ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\                    ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-agent-dropper-architecture.md                        ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
