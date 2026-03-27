**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\BOOT.md  ║
║  Updated: 2026-03-16 | The manual — how to operate Agent1.          ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent1 is a Jerry-template agent on port 11111.             ║
║  Deployed by Agent-Dropper v2. Pre-fix deployment — needs           ║
║  AGENT_DIR correction in server.js to work.                         ║
║                                                                      ║
║  Service: http://127.0.0.1:11111                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Operate Agent1

Agent1 is a Jerry-template agent deployed by Agent-Dropper v2 on port 11111. It has a chat UI, voice engine, Gemini as its LLM provider, and shell command execution. It was deployed on 2026-03-16 — before the AGENT_DIR fix was applied to Agent-Dropper. This means its `server.js` may have the wrong path for `AGENT_DIR`, causing PHP API calls to fail.

---

## Starting

```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1
node server.js
```

Or use the startup bat:
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\START-AGENTONE.bat
```

**First time:** Run `npm install` in the Agent1 root directory.

---

## Verify

```
http://127.0.0.1:11111/
```

If the page loads but chat doesn't work, the AGENT_DIR bug is likely the cause. Check `server.js` — the `AGENT_DIR` constant should point to this agent's directory, not the template's original location.

---

## The AGENT_DIR Fix

Agent-Dropper v2 had a bug before 2026-03-15 where deployed agents kept the template's `AGENT_DIR` path instead of their actual deployment path. If Agent1's `server.js` has:

```javascript
const AGENT_DIR = 'C:/FOB/.../TEMPLATE-JERRY-CLEAN'  // WRONG
```

Change it to:
```javascript
const AGENT_DIR = 'C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/Agent1'  // CORRECT
```

Or redeploy from Agent-Dropper v2, which now auto-fixes this during deployment.

---

## Talking to Agent1

**Chat via browser:**
```
http://127.0.0.1:11111/
```

**Chat via API (paste in browser):**
```
http://127.0.0.1:11111/api/agent.php?action=chat&input=Hello%20Agent1%2C%20what%20can%20you%20do%3F
```

**Check status:**
```
http://127.0.0.1:11111/api/agent.php?action=status
```

**Run a shell command:**
```
http://127.0.0.1:11111/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB
```

**List available tools:**
```
http://127.0.0.1:11111/api/agent.php?action=tools
```

---

## Configuration

Config lives at `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\config.json`:

- **Port:** 11111
- **LLM Provider:** Gemini (gemini-3-flash-preview)
- **Template:** Jerry
- **Voice:** Enabled
- **Knowledge Bot:** Disabled

---

## Troubleshooting

**Chat returns errors:** Check AGENT_DIR in server.js. This is the #1 issue with pre-fix deployments.

**Port 11111 in use:** `netstat -ano | findstr :11111` then `taskkill /PID [PID] /f`

**Dependencies missing:** `npm install` in the Agent1 root directory.

**PHP not found:** Verify `C:\FOB\php\php-cgi.exe` exists.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know how to operate Agent1. Your next move:                     ║
║                                                                      ║
║  → Navigate this agent's workspace:                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    index.md                                                          ║
║                                                                      ║
║  → See Agent4 (the working one):                                     ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    BOOT.md                                                           ║
║                                                                      ║
║  → Back to the factory that built this:                              ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Agent-Dropper-v2\adir\BOOT.md                                     ║
║                                                                      ║
║  To evolve this manual, create:                                      ║
║  SOT-[YYYYMMDD]-agent1-boot.md                                      ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
