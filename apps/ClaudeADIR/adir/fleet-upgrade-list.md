**324 Ports and paths are changed ref data**

# FLEET UPGRADE LIST
**Directory:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\ClaudeADIR\adir\`
**Last Updated:** 2026-03-20
**Purpose:** Running list of capabilities to roll out to agents over time.
Add new items as we build them. Check off when propagated.

---

## HOW TO USE THIS FILE

When we build something new and proven on one agent, it goes here.
When we're ready to push it to the fleet, we work through the checklist.
Agent Four is always the reference implementation.

---

## CAPABILITIES TO PROPAGATE

### 1. Voice TTS — addMessage hookup pattern
**Source:** Agent Four `apps\Agent4\index.html`
**Pattern:** Hook TTS in `addMessage()` not `sendMessage()`, 500ms delay, `_cleanForSpeech()` whitelist
**Why:** sendMessage hookup fails — voice state is IDLE before async response arrives

| Agent | Status |
|-------|--------|
| Agent Four | ✅ DONE (reference) |
| Agent One | ⬜ pending |
| Agent Two | ⬜ pending |
| Bot1 | ⬜ pending |
| TEMPLATE-JERRY-CLEAN | ⬜ pending |
| TEMPLATE-TANDRSOCIAL-CLEAN | ⬜ pending |

---

### 2. Vision Bridge Access
**Service:** Sector 4 Bridge `:40001`
**What agents get:** Knowledge of `/analyze`, `/screenshot`, `/click`, `/move`, `/type`, `/paste` endpoints
**How:** Add to system prompt — see `vision-system.md` for endpoint table
**Reference:** Agent Four already has this in its prompt

| Agent | Status |
|-------|--------|
| Agent Four | ✅ DONE |
| Agent One | ⬜ pending |
| Agent Two | ⬜ pending |
| TEMPLATE-JERRY-CLEAN | ⬜ pending |

---

### 3. ImageGen Access
**Service:** ImageGen `:9230`
**What agents get:** Ability to POST prompts and get image URLs back
**Endpoint:** `POST http://127.0.0.1:9230/api/generate.php` with `{ "prompt": "..." }`
**Returns:** `imageUrl` they can iframe or link to
**Status:** Service built 2026-03-20, SD WebUI not yet running

| Agent | Status |
|-------|--------|
| Agent Four | ⬜ add to prompt once SD WebUI confirmed working |
| Agent One | ⬜ pending |
| Agent Two | ⬜ pending |
| TEMPLATE-JERRY-CLEAN | ⬜ pending |

---

### 4. Custom Windows Folder Icons
**Script:** `C:\FOB\APPLY-ICONS.bat`
**Icon pack:** `F:\Claude\future_space_quantum_icon_pack_50\ico\`
**Status:** Bat built, not yet run
**Note:** Run once as admin — sets desktop.ini + attrib on 19 key folders

| Task | Status |
|------|--------|
| APPLY-ICONS.bat created | ✅ |
| Icons applied to FOB folders | ⬜ pending |

---

### 5. TEMPLATE-JERRY-CLEAN Prompt
**What's needed:** Final system prompt — newborn agents discover identity from config.json
**Reference:** Agent Four `PROMPT.md` + `config.json`
**Status:** Still pending — write after vision testing complete

---

### 6. Agent Dropper Template Update
**What:** Update Agent Dropper HTML + preloaded context/knowledge to Agent Four standard
**Blocked by:** Vision pipeline testing with Agent Four must finish first
**Location:** `adirhub\TOOLS\Agent-Dropper-v2\`

---

## SERVICES TO ADD TO MASTER LAUNCHER

Services outside FOB that need bats and inclusion in a master start:

| Service | Port | Location | Bat exists? |
|---------|------|----------|-------------|
| V3AM PHP Server | 8080 | `D:\01V3AM_aistart` | ✅ `03AI___START_V3AM_SERVICES.bat` |
| MySQL | 3306 | `D:\01V3AM_aistart\mysql` | ✅ (inside above) |
| SD WebUI (A1111) | 7860 | `C:\AI\sd-webui` | ⬜ need to wire up |
| ImageGen | 9230 | `apps\ImageGen` | ✅ `START-ImageGen.bat` |
| VeilEdge (standalone) | TBD | `D:\01V3AM_aistart\veiledge` | ⬜ need npm start |

---

## FUTURE IDEAS (not yet started)

- **Video mode** for Vision Bridge — mss capture loop → cv2 stream, "just an API change"
- **EYES viewer** — simple HTML page that auto-refreshes and shows latest generated image
- **Agent-to-agent visual briefs** — Agent Four POSTs a prompt to ImageGen, shares imageUrl with another agent
- **Icon generator workflow** — use ImageGen to produce the flat neon icon pack matching the preview style

**324 Ports and paths are changed ref data**
