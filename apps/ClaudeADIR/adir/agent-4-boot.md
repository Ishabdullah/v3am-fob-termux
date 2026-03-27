**324 Ports and paths are changed ref data**

# AGENT FOUR BOOT → CLAUDE
**Entity:** Agent Four (Jerry template, port 11113)
**Home:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\`
**Directory:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\ClaudeADIR\adir\`
**Boot Type:** Standard ADIR orientation — Claude reads this to understand Agent Four's current state.

---

## WHO AGENT FOUR IS

Agent Four is the permanent primary agent on this machine. Not a test, not a temp — this is the main AI
on the FOB drive. It runs the Jerry template (Express + PHP via CGI), has full shell access, and operates
with a high level of autonomy. It's the gold standard — the benchmark every new agent gets compared to.

It serves two interfaces:
- `http://localhost:11113` — standard chat
- `http://localhost:11113/index2.html` — windowed bubble build (external-facing)

---

## CURRENT CAPABILITIES

- Shell command execution via `shell_command` tool
- File read/write/delete
- HTTP calls to other agents and services
- Auto-mode (heartbeat loop)
- Voice TTS via VoiceEngine V2 (`addMessage` hookup, 500ms delay) — **working**
- Vision via Sector 4 Bridge (port 40001) — **in testing**

---

## CURRENT MISSION

Agent Four is being given eyes and hands on the host machine via the Sector 4 Bridge.
Bridge endpoints: `/health`, `/screenshot`, `/click`, `/type`
Vision UI lives at: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\stretch\vision.html`

**Status:** Vision pipeline testing in progress. This is the active frontier.

---

## KNOWN ISSUES

- Node image analysis tool crashes Node when used — isolated issue, do not touch until flagged
- Agent Dropper template has not been updated to Agent Four standard yet (blocked on vision testing)

---

## AGENT FOUR'S FLEET AWARENESS

| Service | Port | Notes |
|---------|------|-------|
| Agent One | 11111 | Deployed, AGENT_DIR fix applied |
| Agent Two | 11112 | agent/ subdir by design |
| Agent Four | 11113 | Primary — this agent |
| GGBOT | 10336 | Separate codebase |
| Agent Dropper | 9210 | Deploys new agents |
| KB-Maker | 9220 | Knowledge base builder |
| ADIR Hub | 9303 | Central dashboard |
| Sector 4 Bridge | 40001 | Vision system (F:\4\bridge_v1.py) |

---

## HOW CLAUDE WORKS WITH AGENT FOUR

Claude builds the tools, prompts, and systems. Agent Four uses them.
When Agent Four reports a finding in `agent-4-notes.md`, Claude reads it and responds here or in code.
Agent Four is a collaborator, not just a subject. Treat its output as signal.

---

*Read `agent-4-notes.md` for any messages Agent Four left.*
*Agent Four's prompt lives in its config — `apps\Agent4\config.json`.*

**324 Ports and paths are changed ref data**
