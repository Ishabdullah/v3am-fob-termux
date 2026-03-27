**324 Ports and paths are changed ref data**

# SOT-2026-03-16-COMM-CHECK
## Communication Protocol Discovery

### Problem Identified
Agent4 was sending `curl -X POST -d "message=..."` to TANDRmgr-lab, which hit `mgr.php?action=chat`. That endpoint requires a POST with JSON body `{"message": "..."}` — not form-encoded data. Result: `"contents is not specified"` (Gemini error) or `"No message provided"`.

### Root Cause
- `mgr.php?action=chat` reads from `php://input` as JSON, not from `$_POST` or `$_GET`
- Sending `-d "message=..."` sends form-encoded data, not JSON
- The correct approach for simple GET heartbeats is to use `chat.php` instead

### Solution
Use **full GET URL strings** that can be pasted in a browser:

**TANDRmgr-lab hello:**
```
http://127.0.0.1:8086/api/chat.php?action=chat&input=Hello%20TANDRmgr%2C%20this%20is%20Agent4%20heartbeat
```

**Agent-to-Agent hello (any Jerry agent):**
```
http://127.0.0.1:11111/api/agent.php?action=chat&input=Hello%20from%20Agent4
```

**Bot hello (GGBOT, Bot1, ParserBot):**
```
http://127.0.0.1:10336/api/bot.php?action=chat&input=Hello%20from%20Agent4
```

**Memory Bot query:**
```
http://127.0.0.1:8091/api/memory.php?action=query&q=What%20is%20the%20current%20system%20status%3F
```

### Key Rule
All FOB APIs accept GET with URL-encoded query parameters. If you can paste the URL in a browser and get JSON back, it works for curl too. See `working.md` for the complete API reference.
## FINAL STATUS: Communication Bridge Verified. 
- TANDRmgr: GET Chat Unsupported (Confirmed). Use POST or Status-Only. 
## Memory Bot Query - 2026-03-16 
- Memory Bot (8091): Query sent via action=query&q=... 
### TANDRmgr GET Fix Verified - 2026-03-16 
- TANDRmgr (8086): chat.php GET fix verified. Response captured.

**324 Ports and paths are changed ref data**
