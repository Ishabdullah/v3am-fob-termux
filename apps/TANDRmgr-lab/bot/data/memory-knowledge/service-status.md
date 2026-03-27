# TANDRmgr-lab Fleet Service Status

**Purpose:** Current fleet service status and deployment information
**Last Updated:** 2026-03-23
**Source:** ADIR Hub dashboard — full fleet confirmed UP

---

## FULL FLEET (All UP as of 2026-03-23)

### INFRASTRUCTURE

| Service | Port | Role |
|---------|------|------|
| ADIR Hub | 9303 | Central command dashboard |
| KB-Maker v2 | 9220 | Bot factory — deploys bots from template |
| Agent-Dropper | 9210 | Agent factory — deploys Jerry agents |
| TANDRmgr-lab | 8086 | Operations switchboard (this system) |
| FOB Server | 8100 | Supporting server |
| ImageGen | 9230 | Image generation service |
| Proxy25565 | 25565 | Network proxy |

### AGENTS

| Service | Port | Status | Notes |
|---------|------|--------|-------|
| Agent One | 11111 | ✅ UP — TESTED PERFECT | Jerry V3 prompt |
| Agent Two | 11112 | ✅ UP — TESTED PERFECT | Jerry V3 prompt |
| Agent Four | 11113 | ✅ UP — TESTED PERFECT | Jerry V2 (reference baseline) |
| Bot One | 11114 | ✅ UP | TANDRSocial KB bot |

### BOTS

| Service | Port | Status | Notes |
|---------|------|--------|-------|
| GGBot | 10336 | ✅ UP | Primary knowledge bot |
| GGBot @KBMkr | 10333 | ✅ UP | GGBot variant under KB-Maker |
| Memory Bot | 8091 | ✅ UP — TESTED GOOD | Operational history + web search |
| VisionBot | 10337 | ✅ UP | Vision/image analysis bot |
| ParserBot | 10108 | ✅ UP | Parsing bot |

### KB AGENTS

| Service | Port | Status | Notes |
|---------|------|--------|-------|
| StartPower | 57775 | ✅ UP — TESTED PERFECT | System control, screen capture, image gen, fleet ops |
| Librarian | 57785 | ✅ UP — TESTED GOOD | KB curator, reads/writes markdown |
| TANDRSocial | 57790 | ✅ UP | Social/community KB agent |

---

## RETIRED / SUPERSEDED (Alpha Era)

The following no longer exist:
- Jerry (Port 9200) — superseded by Agent fleet
- Randy (Port 9201) — retired
- Tommy — retired
- TANDRbot — retired
- T&R Builders (Port 9200) — Alpha prototype

---

## Fleet Prompt Status

| Agent | Port | Prompt | Version |
|-------|------|--------|---------|
| Agent One | 11111 | V3 | 3.0.0 |
| Agent Two | 11112 | V3 | 2.0.0 (config) |
| Agent Four | 11113 | V2 | 2.0.0 (reference baseline) |
| Dropper template | — | V2 | pending V3 |

---

## Memory Bot Notes

- Runs as separate Node.js process in `bot/` subdirectory
- Start via `bot\start-bot.bat`
- If down → TANDRmgr shows "Service memory unavailable"
- KB path: `bot\data\memory-knowledge\`
- To update KB: ask Librarian or an agent to write markdown files to that path
