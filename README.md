# V3AM FOB — Termux Port

A complete port of the V3AM FOB multi-agent AI platform to **Termux on Android**.

Run a full fleet of 20 AI agents directly on your phone — no Windows, no Electron, no PHP.

---

## What is V3AM FOB?

V3AM FOB (Forward Operating Base) is a multi-agent AI coordination platform. It runs a fleet of specialized AI agents (bots, knowledge bases, social media managers, document parsers) all coordinated from a single launcher dashboard.

This Termux port converts the original Windows/Electron application to run natively on Android via Termux:

| Original (Windows) | Termux Port |
|---|---|
| Electron desktop app | Browser-based dashboard |
| PHP CGI scripts | Pure Node.js Express handlers |
| Ollama LLM backend | llama.cpp (built from source) |
| `C:\FOB\...` paths | `$HOME/fob/...` paths |
| `.bat` scripts | `.sh` bash scripts |
| `taskkill`, `netstat` | `kill`, `lsof` |
| System tray | Browser tab |

---

## Requirements

- **Samsung S24 Ultra** (or any Android device with 8GB+ RAM)
- **Termux** (install from F-Droid — the Play Store version is outdated)
- **~6GB free storage** (for llama.cpp build + model)
- **Node.js LTS** (installed automatically by `setup.sh`)

### Minimum specs for llama.cpp models
| Model | RAM needed |
|---|---|
| Qwen2.5-3B-Q4 | ~3GB |
| Qwen2.5-7B-Q4 | ~5GB (default) |
| Llama-3.2-8B-Q4 | ~5.5GB |
| Mistral-7B-Q4 | ~5GB |

---

## Quick Start

### 1. Install Termux

Download from F-Droid: https://f-droid.org/packages/com.termux/

### 2. Clone this repository

```bash
cd ~
git clone https://github.com/your-repo/v3am-fob-termux.git
cd v3am-fob-termux
```

### 3. Run setup (one time)

```bash
bash setup.sh
```

This will:
- Update Termux packages
- Install Node.js, git, cmake, make, clang
- Clone and build llama.cpp (~10 min on S24 Ultra)
- Download Qwen2.5-7B-Q4 model (~4.7GB)
- Install npm dependencies for all services
- Create the `~/fob/` directory structure

### 4. Start all services

```bash
bash start.sh
```

### 5. Open the dashboard

Open Chrome or any browser on your phone and navigate to:

```
http://127.0.0.1:9399/
```

You'll see the V3AM FOB dashboard with all service statuses, controls, and the embedded service viewer.

---

## Services and Ports

| Service | Port | Group | Purpose |
|---|---|---|---|
| ADIR Hub | 9303 | Core | Central command dashboard |
| KB-Maker v2 | 9220 | Core | Bot factory |
| Agent-Dropper | 9210 | Core | Agent deployment |
| TANDRmgr-lab | 8086 | Core | Manager interface |
| FOB Server | 8100 | Core | Command center |
| Agent One | 11111 | Agents | General agent |
| Agent Two | 11112 | Agents | General agent |
| Agent Four | 11113 | Agents | Primary agent |
| Bot One | 11114 | Agents | General bot |
| GGBot | 10336 | Bots | Knowledge bot |
| GGBot @KBMkr | 10333 | Bots | GGBot at KB Maker |
| Memory Bot | 8091 | Bots | Persistent memory |
| VisionBot | 10337 | Bots | Vision agent |
| ParserBot | 10108 | Bots | Document parser |
| StartPower | 57775 | KB Agents | KB agent |
| Librarian | 57785 | KB Agents | Knowledge librarian |
| TANDRSocial | 57790 | KB Agents | Social media |
| ImageGen | 9230 | Supporting | Image generation |
| Proxy25565 | 25565 | Supporting | Mobile gateway |
| Launcher API | 9399 | Core | Dashboard + Control API |
| llama.cpp | 8084 | LLM | Local AI server |

---

## Configuring LLM Providers

Edit `~/fob/config/fob-config.json`:

### Use local llama.cpp (default)

```json
{
  "llm": {
    "provider": "llamacpp",
    "llamacpp": {
      "endpoint": "http://127.0.0.1:8084/completion",
      "temperature": 0.7,
      "max_tokens": 4096
    }
  }
}
```

### Use Anthropic Claude

```json
{
  "llm": {
    "provider": "anthropic",
    "anthropic": {
      "api_key": "sk-ant-your-key-here",
      "model": "claude-haiku-4-5-20251001"
    }
  }
}
```

### Use Google Gemini

```json
{
  "llm": {
    "provider": "gemini",
    "gemini": {
      "api_key": "AIza-your-key-here",
      "model": "gemini-2.0-flash"
    }
  }
}
```

### Using a different GGUF model

Place any GGUF model file in `~/fob/models/` and edit `start.sh` to point to it, or restart — the script auto-detects any `.gguf` file in that directory.

---

## Accessing from Another Device

To access FOB from another device on the same Wi-Fi network:

1. Find your phone's IP address:
   ```bash
   ip addr show wlan0 | grep 'inet '
   ```

2. Replace `127.0.0.1` with your phone's IP in the browser URL, e.g.:
   ```
   http://192.168.1.100:9399/
   ```

For public internet access, use Cloudflare Tunnel:
```bash
pkg install cloudflared
cloudflared tunnel --url http://127.0.0.1:9399
```

---

## Control API

The launcher exposes a REST API at port 9399:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/status` | Full fleet status JSON |
| `GET` | `/logs/:id` | Get service logs by ID |
| `GET` | `/endpoints` | Get configured endpoint tabs |
| `GET` | `/config` | Get launcher config |
| `POST` | `/config` | Save launcher config |
| `POST` | `/restart/:id` | Kill + respawn a service |
| `POST` | `/start/:id` | Start a downed service |
| `POST` | `/stop/:id` | Stop a running service |
| `GET` | `/events` | Server-Sent Events stream for live updates |

Example:
```bash
# Get fleet status
curl http://127.0.0.1:9399/status | jq .

# Restart GGBot
curl -X POST http://127.0.0.1:9399/restart/ggbot

# Start Librarian
curl -X POST http://127.0.0.1:9399/start/librarian
```

---

## Service Bot API

Each service exposes an API at `/api/bot.php?action=...` (even though there's no PHP — the bridge handles it):

| Action | Method | Description |
|---|---|---|
| `status` | GET | Service status + LLM availability |
| `chat` | POST | Send message, get LLM response |
| `knowledge` | GET | List knowledge base files |
| `reload` | POST | Reload config from disk |
| `get_prompt` | GET | Get system prompt |
| `update_prompt` | POST | Update system prompt |
| `get_knowledge` | GET | Read a knowledge file |
| `update_knowledge` | POST | Write a knowledge file |
| `get_logs` | GET | Read log files |
| `get_config` | GET | Get service config (masked) |
| `update_config` | POST | Save service config |
| `write_file` | POST | Write a file to service logs |
| `read_file` | GET | Read a service file |
| `list_files` | GET | List files in a directory |
| `search_files` | GET | Search through markdown files |

---

## Architecture

```
Termux Process Tree
├── node lib/launcher.js        ← Port 9399 (dashboard + control API)
│   └── Spawns all services:
│       ├── node adirhub/server.js          9303
│       ├── node TOOLS/KB-Maker-v2/server.js 9220
│       ├── node TOOLS/GGBOT/server.js       10336
│       ├── node apps/Agent1/server.js       11111
│       └── ... (all 19 services)
└── llama-server --model ...    ← Port 8080 (local LLM)
```

### Request flow

```
Browser → service:PORT/api/bot.php?action=chat
  → Express (server-template.js)
  → php-bridge.js (createBotRoutes)
  → LLM provider (llamacpp.js / anthropic.js / gemini.js)
  → Response JSON
```

### File structure

```
v3am-fob-termux/
├── setup.sh                  # One-shot installer
├── start.sh                  # Start all services
├── stop.sh                   # Stop all services
├── restart.sh                # Restart all services
├── fob-server.js             # FOB Command Center (port 8100)
├── lib/
│   ├── launcher.js           # Service spawner + control API + dashboard
│   ├── php-bridge.js         # Node.js replacement for all PHP CGI
│   ├── server-template.js    # Universal service Express server
│   ├── security.js           # Rate limiting + path validation
│   ├── utils.js              # Shared utilities
│   └── providers/
│       ├── llamacpp.js       # llama.cpp HTTP provider
│       ├── anthropic.js      # Anthropic Claude provider
│       └── gemini.js         # Google Gemini provider
├── dashboard/
│   ├── index.html            # Main dashboard UI
│   ├── app.js                # Dashboard JavaScript
│   └── style.css             # Dark terminal theme
├── config/
│   ├── fob-config.json       # Main config (endpoints, LLM, skin)
│   └── llm-config.json       # LLM provider reference
└── adir/new211adir/TANDR-2026-02-11/
    ├── adirhub/              # ADIR Hub + all TOOLS/
    │   ├── server.js         ← Patched: uses lib/server-template.js
    │   ├── TOOLS/GGBOT/
    │   ├── TOOLS/KB-Maker-v2/
    │   ├── TOOLS/librarian/
    │   └── ...
    └── apps/                 # Agent apps
        ├── Agent1/
        ├── Agent2/agent/
        └── ...
```

---

## Troubleshooting

### llama.cpp won't build
```bash
# Check cmake version
cmake --version

# Rebuild with verbose output
cd ~/llama.cpp/build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j2 2>&1 | tail -30
```

### Service won't start (port already in use)
```bash
# Find what's using the port
lsof -i :PORT

# Kill it
kill -9 $(lsof -ti :PORT)
```

### Dashboard shows all services DOWN
- The launcher may still be starting services
- Wait 15-30 seconds after `bash start.sh`
- Check logs: `tail -f ~/fob/logs/launcher.log`
- Make sure Node.js is installed: `node --version`

### LLM doesn't respond
- Check llama.cpp status: `curl http://127.0.0.1:8084/health`
- Make sure the model loaded: `tail -f ~/fob/logs/llama-server.log`
- Try with a cloud provider: edit `config/fob-config.json` and set `"provider": "gemini"` with your API key

### Running out of memory
- Close other apps on your phone
- Use a smaller model (3B instead of 7B)
- Add a Termux wakelocked background task

### npm install fails
```bash
cd ~/v3am-fob-termux
npm install

# For individual services
cd ~/fob/adir/new211adir/TANDR-2026-02-11/adirhub/TOOLS/GGBOT
npm install
```

---

## Development

### Adding a new service

1. Create a directory in `adir/new211adir/TANDR-2026-02-11/apps/NewService/`
2. Create `config.json` with `"port": PORT_NUMBER` and LLM settings
3. Create `server.js`:
   ```js
   const { createServer } = require('../../../../../lib/server-template');
   createServer(__dirname);
   ```
4. Add to `SERVICES` array in `lib/launcher.js`
5. Add an `index.html` for the service UI

### Changing the default LLM

Edit `config/fob-config.json`:
```json
{ "llm": { "provider": "anthropic" } }
```

Then restart: `bash restart.sh`

---

## Credits

Original V3AM FOB project by the V3AM Team.  
Termux port converted by Perplexity Computer.

---

*Created with [Perplexity Computer](https://www.perplexity.ai/computer)*
