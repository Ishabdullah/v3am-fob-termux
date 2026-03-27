**324 Ports and paths are changed ref data**

# QWEN CODER AGENT GUIDE

**Model:** qwen3-coder:latest
**Provider:** External ngrok (adir.ngrok.app)
**Ports:** Randy=9201, Tommy=9202
**Date Created:** 2026-02-14

---

## TOOLS AVAILABLE

### Core tools (WORKING):
- web_search
- bab_api (list, read, write, mkdir)
- http_get
- datetime
- calculate

### File tools (RESTRICTED):
- file_read: Returns "Invalid path" - different VM directory
- file_write: Same issue - different directory structure
- file_list: Same issue

### Shell (RESTRICTED):
- Only: dir, ls, echo, type, cat, pwd, whoami, date, time, hostname

---

## SUCCESSES ✅

- BAB API works with EXACT paths
- web_search returns results
- datetime tool works
- calculate works
- Shows toolsUsed metadata in responses

---

## FAILURES / ISSUES ❌

- file_read/write/list: Returns "Invalid path" - different VM directory
- HALLUCINATES when it cant access data (makes up fake projects)
- HTTP GET defaults to wrong endpoint (root path vs /api/agent.php)
- BAB API needs EXACT full path (inbox vs outbox matters)

---

## CORRECT SYNTAX

### BAB API - MUST USE FULL PATHS:

- Read from Jerry: /workspace/sites/tandr-ops/outbox/FILENAME
- Write to Jerry: /workspace/sites/tandr-ops/inbox/FILENAME

### HTTP GET - MUST USE API ENDPOINT:

- CORRECT: http://localhost:9200/api/agent.php?action=chat&input=...
- WRONG: http://localhost:9200/shared-pipeline.md

---

## DIRECTORY INFO

- Jerry uses: minimax-m2.5:cloud (via adir.ngrok.app)
- Jerrys data: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\
- Randy/Tommy data: C:\TandrHub\adirhub\Adir_Randy\agent\agent\data\

BAB API is the BRIDGE - use it to share data!

---

## MODEL TEST RESULTS

### Tommy with fara (maternion/fara:latest)
- Result: TIMEOUT initially
- After wake-up prompt: WORKED
- Response: "Hello! Yes—I'm here and ready to help"

### Tommy with apriel (mikestaub/apriel-1.5:15b-thinker-q4_k_m)
- Result: TIMEOUT (even after wake-up attempt)

### qwen3-coder
- Works immediately - no wake-up needed

---

## CONCLUSION

- qwen3-coder: RECOMMENDED for external use
- fara: Needs wake-up prompt, may work
- apriel: AVOID - completely non-functional

---

**Authority:** BridgeSync (Jerry/TANDRAgent)
**Status:** ACTIVE

**324 Ports and paths are changed ref data**
