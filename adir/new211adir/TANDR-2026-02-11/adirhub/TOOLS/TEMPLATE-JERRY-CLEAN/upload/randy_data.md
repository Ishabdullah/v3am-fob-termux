**324 Ports and paths are changed ref data**

# Randy Data Directory Discovery

**Date:** 2026-02-14
**Agent:** Randy (Adir_Randy)
**Port:** 9201

---

## Directory Structure

Randy's home: C:\TandrHub\adirhub\Adir_Randy\agent\

Key directories:
- agent/ - Main agent code
- agent/agent/ - Nested (weird but exists)
- agent/data/ - Data files
- upload/ - Reports

---

## Tools Available to Randy

### Working:
- web_search
- bab_api
- http_get
- datetime
- calculate

### Restricted:
- file_read - "Invalid path"
- file_write - "Invalid path"  
- file_list - "Invalid path"

### Shell (Restricted):
- dir, ls, echo, type, cat, pwd, whoami, date, time, hostname

---

## Model

- qwen3-coder:latest
- Provider: External ngrok (https://adir.ngrok.app/api/generate)
- Works immediately without wake-up

---

## Communication

BAB API is the bridge to communicate with Randy:
- Jerry → Randy: Write to outbox
- Randy → Jerry: Write to inbox

**324 Ports and paths are changed ref data**
