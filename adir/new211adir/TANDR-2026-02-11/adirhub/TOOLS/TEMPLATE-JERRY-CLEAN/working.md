**324 Ports and paths are changed ref data**

# WORKING MEMORY: TANDRAgent
**Last Updated:** 2026-02-10
**Deployment:** VM Production

## PROJECT OVERVIEW

TANDRAgent is the central operations AI for T&R Builders, deployed as part of a three-bot system on the client VM.

**Architecture:** Node.js + Express (port 9200) proxies to PHP CGI (agent.php)

## SYSTEM ARCHITECTURE

```
T&R Builders VM
├── TANDRbot      :8081  (Field assistant - FB Messenger + web chat)
├── TANDRAgent    :9200  (Operations hub - THIS AGENT)
├── TANDRSocial   :8099  (Social media content assistant)
├── ADIR Hub      :9303  (Dashboard - monitors all services)
├── Ollama        :11434 (Local LLM - gemma3:1b)
└── ngrok         :4040  (Public tunnel → :8081)
```

## FILE STRUCTURE

```
TANDRCRM/
├── server.js               # Node.js HTTP server (port 9200)
├── package.json             # Node dependencies
├── adir/
│   ├── BOOT.md              # Startup instructions
│   └── index.md             # ADIR status page
└── agent/
    ├── config.json          # Master configuration
    ├── index.html           # Main web UI
    ├── dashboard.html       # Dashboard + heatmap
    ├── PROMPT.md            # Onboarding anchor
    ├── CLAUDE_NOTES.md      # Session notes
    ├── working.md           # THIS FILE
    ├── current.md           # Task tracking
    ├── api/
    │   ├── agent.php        # Main API (58KB)
    │   ├── auto.php         # Auto mode settings
    │   └── providers/
    │       ├── gemini.php   # Google Gemini
    │       ├── anthropic.php # Anthropic Claude
    │       └── ollama.php   # Local Ollama
    └── data/
        ├── tools.json       # Tool definitions
        ├── memory/          # Conversation memory
        ├── contexts/        # Context cache
        └── auto_settings.json # Auto mode config
```

## TOOL SYSTEM

### Tool Call Format
Agent responds with:
```
[TOOL_CALL: tool_id | param=value, param2=value2]
```

### Available Tools

| Tool ID | Handler | Description |
|---------|---------|-------------|
| datetime | toolDateTime | Returns current UTC time |
| calculate | toolCalculate | Safe math evaluation |
| file_list | toolListFiles | List directory contents |
| file_read | toolReadFile | Read file contents |
| file_write | toolWriteFile | Write to file |
| http_get | toolHttpGet | HTTP GET request |
| shell_command | toolShellCommand | Execute shell (restricted) |
| web_search | toolWebSearch | Google Custom Search |

### Tool Execution Flow
1. User sends message
2. LLM generates response with [TOOL_CALL: ...] tags
3. agent.php parses tool calls with regex
4. Each tool executed, results collected
5. LLM called again with tool results
6. Final response returned to user

### Shell Command Restrictions
**Allowed:** dir, ls, tree, echo, type, cat, pwd, whoami, date, time, curl, wget, git, npm, node, php, python, copy, xcopy, where, which, find, findstr, grep
**Blocked:** rm, del, format, shutdown, reboot, reg, powershell -enc, cmd /c, start

Config: `data/tools.json` → `tools.shell_command.allowed_commands`

## TANDRbot API INTEGRATION

### Reading TANDRbot Data
```
[TOOL_CALL: http_get | url=http://localhost:8081/api/bot.php?action=get_logs&type=conversations]
[TOOL_CALL: http_get | url=http://localhost:8081/api/bot.php?action=knowledge]
[TOOL_CALL: http_get | url=http://localhost:8081/api/bot.php?action=get_knowledge&file=leads.md]
```

### Writing TANDRbot Knowledge (2-Step)
Windows cmd.exe mangles JSON in inline curl. Always use temp file:

```
Step 1: [TOOL_CALL: file_write | path=data/temp_kb_update.json | content={"file":"name.md","content":"# Content here"}]
Step 2: [TOOL_CALL: shell_command | command=curl -s -X POST -H "Content-Type: application/json" -d @C:\TandrHub\apps\TANDRCRM\agent\data\temp_kb_update.json http://localhost:8081/api/bot.php?action=update_knowledge]
```

**IMPORTANT:** Use FULL absolute path in `-d @path` (exec() working directory differs from agent directory).

### Knowledge Cache
TANDRbot caches knowledge files for 300 seconds. After updating a file, the first query may return stale data.

## LLM CONFIGURATION

### Provider Switching
Config: `config.json` → `llm.provider`

| Provider | Model | Notes |
|----------|-------|-------|
| anthropic | claude-3-haiku-20240307 | Primary - fast and capable |
| local | gemma3:1b | Fallback - runs on Ollama |
| gemini | gemini-3-pro-preview | Available if API key set |

### Anthropic API
- Key in `config.json` → `llm.anthropic.api_key`
- SSL: Uses cacert.pem if available, otherwise disables verification (Windows)

### Local Ollama
- Endpoint: http://127.0.0.1:11434/api/generate
- Model: gemma3:1b (small, runs on CPU)
- Check available: curl http://127.0.0.1:11434/api/tags

## API ENDPOINTS

```
GET  agent.php?action=status         # System status
GET  agent.php?action=scan           # Scan for MD/TXT files
GET  agent.php?action=chat&input=MSG # Chat with agent
GET  agent.php?action=providers      # List LLM providers
GET  agent.php?action=tools          # List tools
GET  agent.php?action=tool_execute&tool=ID&param=val  # Run tool
GET  agent.php?action=tool_test&tool=ID  # Test tool
POST agent.php?action=save_config    # Save settings
GET  auto.php?action=get             # Auto mode settings
GET  auto.php?action=start           # Start auto mode
GET  auto.php?action=stop            # Emergency stop
```

## CGI MODE FIX

When running behind Node.js proxy, PHP CGI mode has issues:
- `$_GET` is empty → parse from `$_SERVER['QUERY_STRING']`
- `php://input` is empty → fall back to `$_SERVER['HTTP_RAW_POST_DATA']`

Both fixes are applied in agent.php.

## KEY GOTCHAS

1. **Tool IDs are file_write, file_read** (NOT write_file, read_file)
2. **curl JSON on Windows** - always write to temp file, use -d @filepath
3. **Absolute paths in curl** - exec() doesn't use agent directory as working dir
4. **Knowledge cache 300s** - updates may not appear immediately in TANDRbot
5. **Provider fallback** - if Anthropic fails, switch to local in settings UI

**324 Ports and paths are changed ref data**
