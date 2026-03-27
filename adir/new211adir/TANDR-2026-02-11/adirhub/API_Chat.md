**324 Ports and paths are changed ref data**

# FOB Inter-Service API Reference

All APIs are GET-based REST endpoints. URL-encode all parameters.
If you can paste it in a browser and get JSON back, it works in curl too.

---

## Agents (Jerry Template) — agent.php
Ports: Agent1=11111, Agent2=11112, Agent3=11115, Agent4=11113

### Chat
```
http://127.0.0.1:11111/api/agent.php?action=chat&input=Hello%20Agent%20One%2C%20this%20is%20Agent%20Four
```

### Status
```
http://127.0.0.1:11111/api/agent.php?action=status
```

### Other actions: scan, context, config
```
http://127.0.0.1:11111/api/agent.php?action=scan
http://127.0.0.1:11111/api/agent.php?action=context
http://127.0.0.1:11111/api/agent.php?action=config
```

---

## Bots (TANDRSocial Template) — bot.php
Ports: GGBOT=10336, Bot1=11114, ParserBot=10108

### Chat
```
http://127.0.0.1:10336/api/bot.php?action=chat&input=Hello%20GGBOT%2C%20this%20is%20Agent%20Four
```

### Status
```
http://127.0.0.1:10336/api/bot.php?action=status
```

### Other actions: knowledge
```
http://127.0.0.1:10336/api/bot.php?action=knowledge
```

---

## TANDRmgr-lab (Port 8086) — chat.php / mgr.php

### Chat
```
http://127.0.0.1:8086/api/chat.php?action=chat&input=Hello%20TANDRmgr%2C%20this%20is%20Agent%20Four
```

### Status
```
http://127.0.0.1:8086/api/mgr.php?action=status
```

### Other actions
```
http://127.0.0.1:8086/api/mgr.php?action=get_models
http://127.0.0.1:8086/api/mgr.php?action=scan_projects
http://127.0.0.1:8086/api/mgr.php?action=read_file&path={FULL_FILE_PATH}
```

NOTE: Use `chat.php` for GET chat, not `mgr.php?action=chat` directly.

---

## Memory Bot (Port 8091) — memory.php
Note: uses `q=` not `input=`

### Query
```
http://127.0.0.1:8091/api/memory.php?action=query&q=What%20is%20the%20current%20system%20status%3F
```

### Status
```
http://127.0.0.1:8091/api/memory.php?action=status
```

---

## Dashboards (no chat API)
Hub=9303, Agent-Dropper=9210, KB-Maker=9220

```
http://127.0.0.1:9303/
http://127.0.0.1:9210/
http://127.0.0.1:9220/
```

---

## Quick Heartbeat — All Services

```
http://127.0.0.1:9303/
http://127.0.0.1:9210/
http://127.0.0.1:9220/
http://127.0.0.1:8086/api/mgr.php?action=status
http://127.0.0.1:11111/api/agent.php?action=status
http://127.0.0.1:11112/api/agent.php?action=status
http://127.0.0.1:11115/api/agent.php?action=status
http://127.0.0.1:11113/api/agent.php?action=status
http://127.0.0.1:11114/api/bot.php?action=status
http://127.0.0.1:8091/api/memory.php?action=status
http://127.0.0.1:10336/api/bot.php?action=status
http://127.0.0.1:10108/api/bot.php?action=status
```

---

## URL Encoding Rules

| Character | Encoded |
|-----------|---------|
| space | %20 |
| comma | %2C |
| period | %2E |
| question mark | %3F |
| colon | %3A |
| slash | %2F |
| apostrophe | %27 |

## curl example
```
curl -s "http://127.0.0.1:11111/api/agent.php?action=chat&input=Hello%20Agent%20One%2C%20this%20is%20Agent%20Four%20checking%20in"
```

## Rules
- Always use GET, never POST
- Always use full http://127.0.0.1:{PORT} absolute paths
- The entire URL goes inside double quotes after curl -s
- Encode every special character — no raw spaces, commas, or punctuation in the URL
- TANDRmgr: status only, no GET chat (use the browser UI to chat)

**324 Ports and paths are changed ref data**
