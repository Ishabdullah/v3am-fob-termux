**324 Ports and paths are changed ref data**

# SOT-FLEET-INDEX — FOB Service Phone Book

**Purpose:** Complete directory of every service in the fleet — ports, absolute paths, start commands, deploy origin.
**Use:** Review before building any launcher bat. Update whenever a bot is deployed or decommissioned.
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11`  (use `%ROOT%` in bat files)
**Last verified:** 2026-03-22

---

## Group A — Core Infrastructure (always launch first)

| Service | Port | Path (relative to ROOT) | Start | Notes |
|---|---|---|---|---|
| Ollama | 11434 | external | `ollama serve` | Local LLM — check before launching agents |
| ADIR Hub | 9303 | `adirhub` | `node server.js` | Port hardcoded in server.js |
| KB-Maker v2 | 9220 | `adirhub\TOOLS\KB-Maker-v2` | `node server.js` | Bot factory |
| Agent-Dropper v2 | 9210 | `adirhub\TOOLS\Agent-Dropper-v2` | `node server.js` | Agent factory |
| TANDRmgr-lab | 8086 | `apps\TANDRmgr-lab` | `node server.js` | Port hardcoded in server.js |
| FOB Command Center | 8100 | `C:\FOB` | `node fob-server.js` | Outside ROOT tree |

---

## Group B — Agents (TEMPLATE-JERRY-CLEAN / TEMPLATE-FOUR-CLEAN based)

| Service | Port | Path (relative to ROOT) | Start | Origin |
|---|---|---|---|---|
| Agent One | 11111 | `apps\Agent1` | `node server.js` | Copied in |
| Agent Two | 11112 | `apps\Agent2\agent` | `node server.js` | Non-standard subpath — `agent\` subfolder |
| Agent Four | 11113 | `apps\Agent4` | `node server.js` | Copied in — primary public agent |
| Bot One | 11114 | `apps\Bot1` | `node server.js` | KB bot in agents group |

---

## Group C — Bots (standing KB bots, always running)

| Service | Port | Path (relative to ROOT) | Start | Origin |
|---|---|---|---|---|
| GGBot | 10336 | `adirhub\TOOLS\GGBOT` | `node server.js` | Original / hand-built |
| Memory Bot | 8091 | `apps\TANDRmgr-lab\bot` | `npm start` | TANDRmgr sub-bot |
| VisionBot | 10337 | `apps\VisionBot` | `node server.js` | Copied in |

---

## Group D — Deployed KB Bots (created by KB-Maker, living in fleet)

These were created by KB-Maker and are real running services. They need their own launcher entries.

| Service | Port | Path (relative to ROOT) | Start | Deployed |
|---|---|---|---|---|
| ParserBot | 10108 | `adirhub\TOOLS\Parser\ParserBot` | `node server.js` | 2026-03-10 |
| GGBot @KBMaker-adir | 10333 | `adirhub\TOOLS\KB-Maker-v2\adir` | `node server.js` | 2026-03-08 — ⚠️ unusual path (deployed inside KB-Maker's own workspace) |
| Librarian | 57785 | `adirhub\TOOLS\librarian\bot` | `node server.js` | 2026-03-22 — routes to StartPower |

> **⚠️ GGBot@10333 note:** This bot lives at `KB-Maker-v2\adir` — KB-Maker's own workspace directory.
> It is a real deployed service but its location is non-standard. Consider relocating to `adirhub\TOOLS\GGBot-10333` or similar at next maintenance window.

---

## Group E — Supporting Services

| Service | Port | Path (relative to ROOT) | Start | Notes |
|---|---|---|---|---|
| StartPower | 57775 | `adirhub\TOOLS\StartPower` | `node server.js` | Agent engine — Librarian routes to this |
| ImageGen | 9230 | `apps\ImageGen` | `node server.js` | Stable Diffusion API bridge |
| ScreenStream | 9240 | `apps\ScreenStream` | `node server.js` | Port hardcoded in server.js |
| Proxy25565 | 25565 | `apps\Proxy25565` | `node server.js` | Game/Minecraft proxy |

---

## Group F — Vision (path-variable dependent)

VisionBot at 10337 is the primary vision service (in apps tree). The external `F:\Vision` instance (port 48882) from Launcher2 is no longer used.

| Service | Port | Path | Start | Notes |
|---|---|---|---|---|
| VisionBot | 10337 | `apps\VisionBot` | `node server.js` | ← USE THIS ONE |
| ImageGen | 9230 | `apps\ImageGen` | `node server.js` | See Group E |
| SD WebUI | 7860 | `SD_WEBUI_PATH=D:\AIScreen` | `webui-user.bat` | Optional — check if present |
| Vision Bridge | 40001 | `VISION_BRIDGE_PATH=F:\4\launch_bridge.bat` | `cmd /c` | Optional external launch script |

---

## Group G — Templates (source only, never directly launched)

| Template | Port in config | Path (relative to ROOT) | Used By |
|---|---|---|---|
| TEMPLATE-TANDRSOCIAL-CLEAN | `?` (placeholder) | `adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-CLEAN` | KB-Maker v2 (hardcoded path in server.js:172) |
| TEMPLATE-TANDRSOCIAL-v2 | 57790 | `adirhub\TOOLS\TEMPLATE-TANDRSOCIAL-v2` | Staging copy — promote to CLEAN before deploying |
| TEMPLATE-JERRY-CLEAN | `?` (placeholder) | `adirhub\TOOLS\TEMPLATE-JERRY-CLEAN` | Agent-Dropper v2 |
| TEMPLATE-FOUR-CLEAN | 0 (placeholder) | `adirhub\TOOLS\TEMPLATE-FOUR-CLEAN` | Agent-Dropper v2 — `DEPLOY_NAME` placeholder still in config |

> **⚠️ TEMPLATE-FOUR-CLEAN:** Port is 0 and app name is `DEPLOY_NAME` — config was never finalized. Fix before deploying new Four-type agents.

---

## Port Map (sorted)

| Port | Service | Group | Status |
|---|---|---|---|
| 7860 | SD WebUI | Vision | Optional external |
| 8086 | TANDRmgr-lab | Core | Active |
| 8091 | Memory Bot | Bots | Active |
| 8100 | FOB Command Center | Core | Active |
| 9210 | Agent-Dropper v2 | Core | Active |
| 9220 | KB-Maker v2 | Core | Active |
| 9230 | ImageGen | Supporting | Active |
| 9240 | ScreenStream | Supporting | Active |
| 9303 | ADIR Hub | Core | Active |
| 10108 | ParserBot | Deployed KB | Active |
| 10333 | GGBot @KBMaker-adir | Deployed KB | Active ⚠️ unusual path |
| 10336 | GGBot | Bots | Active |
| 10337 | VisionBot | Bots/Vision | Active |
| 11111 | Agent One | Agents | Active |
| 11112 | Agent Two | Agents | Active — non-standard subpath |
| 11113 | Agent Four | Agents | Active — primary public agent |
| 11114 | Bot One | Agents | Active |
| 25565 | Proxy25565 | Supporting | Active |
| 40001 | Vision Bridge | Vision | Optional external |
| 57775 | StartPower | Supporting | Manual start |
| 57785 | Librarian | Deployed KB | Manual start |
| 57790 | TEMPLATE-TANDRSOCIAL-v2 | Template/Test | Manual — not for launcher |
| 11434 | Ollama | External | Pre-check |

---

## Launcher4 Decisions (2026-03-22)

- [x] **Both GGBots (10336 + 10333)** — both in Launcher4
- [x] **ParserBot (10108)** — in Launcher4, Group C Bots
- [x] **TEMPLATE-FOUR-CLEAN config** — DO NOT TOUCH. Agent-Dropper may substitute `DEPLOY_NAME`/`0` at deploy time. See SOT-CURRENT.md for deferred review.
- [x] **Proxy25565** — in Launcher4. Believed to be v3am FOB tunnel related. See SOT-CURRENT.md.
- [x] **StartPower + Librarian** — AUTO-START in Launcher4. Needed for agent/bot knowledge access via chat.
- [x] **Vision Bridge (40001)** — in Launcher4 with skip-if-not-found guard (cross-drive bat unreliable)
- [x] **VisionBot** — use `apps\VisionBot` at port 10337. F:\Vision (48882) retired.

---

## Launcher4 Setup Variables Block

```bat
set ROOT=C:\FOB\adir\new211adir\TANDR-2026-02-11
set PHP=C:\FOB\php\php-cgi.exe

REM ---- MACHINE-SPECIFIC (edit per install) ----
set SD_WEBUI_PATH=D:\AIScreen
set VISION_BRIDGE_PATH=F:\4\launch_bridge.bat
REM ----------------------------------------------
```

---

*To update this file: re-run the port scan (`python` walk of `adirhub/TOOLS` + `apps`) after any KB-Maker or Agent-Dropper deploy.*

**324 Ports and paths are changed ref data**
