**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\BOOT.md  ║
║  Updated: 2026-03-16 | The manual — how to operate Agent4.          ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agent4 is the WORKING Jerry-template agent. Port 11113.     ║
║  Post-fix deployment — AGENT_DIR is correct. This is the            ║
║  reference agent for how deployed agents should behave.             ║
║                                                                      ║
║  Service: http://127.0.0.1:11113                                    ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How to Operate Agent4

Agent4 is the working reference agent. Deployed on 2026-03-15 after the AGENT_DIR fix was applied to Agent-Dropper v2, it's the only Jerry-template agent confirmed functional with correct paths. Use Agent4 as the model for what a healthy deployment looks like.

---

## Starting

```
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4
node server.js
```

**First time:** Run `npm install` in the Agent4 root directory.

---

## Verify

```
http://127.0.0.1:11113/
```

Agent4 should load its chat UI and respond to API calls without errors.

---

## Talking to Agent4

**Chat via browser:**
```
http://127.0.0.1:11113/
```

**Chat via API (paste in browser):**
```
http://127.0.0.1:11113/api/agent.php?action=chat&input=What%20can%20you%20tell%20me%20about%20the%20FOB%20system%3F
```

**Check status:**
```
http://127.0.0.1:11113/api/agent.php?action=status
```

**Run a shell command:**
```
http://127.0.0.1:11113/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB%5Cadir%5Cnew211adir%5CTANDR-2026-02-11%5Capps
```

**List tools:**
```
http://127.0.0.1:11113/api/agent.php?action=tools
```

**Read a file through Agent4:**
```
http://127.0.0.1:11113/api/agent.php?action=read&file=adir%2FBOOT.md
```

**Write a file through Agent4:**
```
http://127.0.0.1:11113/api/agent.php?action=write&file=adir%2Fstretch%2Fnotes.md&content=Testing%20write%20from%20API
```

---

## Cross-Agent Communication

Agent4 is the best agent to use as a communication hub since it's the only one confirmed working. Other agents (once fixed) should check in with Agent4 periodically:

**From another agent, ask Agent4 to report:**
```
http://127.0.0.1:11113/api/agent.php?action=chat&input=This%20is%20Agent1%20checking%20in.%20What%20is%20your%20current%20status%20and%20what%20SOT%20files%20have%20you%20created%20recently%3F
```

**From another agent, run a command on Agent4's shell:**
```
http://127.0.0.1:11113/api/agent.php?action=cmd&command=dir%20C%3A%5CFOB%5Cadir%5Cnew211adir%5CTANDR-2026-02-11%5Capps%5CAgent4%5Cadir%5CSOT*
```

---

## Configuration

Config at `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\config.json`:

- **Port:** 11113
- **LLM Provider:** Gemini (gemini-3-flash-preview)
- **Template:** Jerry
- **Voice:** Enabled
- **Knowledge Bot:** Disabled
- **Deployed:** 2026-03-15

---

## Troubleshooting

**Port 11113 in use:** `netstat -ano | findstr :11113` then `taskkill /PID [PID] /f`

**Dependencies missing:** `npm install` in the Agent4 root directory.

**PHP not found:** Verify `C:\FOB\php\php-cgi.exe` exists.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  You know how to operate Agent4 — the working reference agent.       ║
║  Your next move:                                                     ║
║                                                                      ║
║  → Navigate this workspace:                                          ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\        ║
║    index.md                                                          ║
║                                                                      ║
║  → Understand how agents work:                                       ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent1\adir\        ║
║    working.md                                                        ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this manual, create:                                      ║
║  SOT-[YYYYMMDD]-agent4-boot.md                                      ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
