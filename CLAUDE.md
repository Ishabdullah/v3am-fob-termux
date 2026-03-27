# CLAUDE.md — V3AM FOB Termux

## What this codebase is

V3AM FOB Termux is a port of the original Windows-based V3AM FOB multi-agent AI platform to run on Android via Termux. It runs 19+ Node.js services that each expose an Express API with LLM chat, knowledge base management, and file operations.

## Architecture

```
lib/launcher.js        → Service spawner + control API (port 9399) + dashboard
lib/php-bridge.js      → Node.js replacement for ALL PHP CGI (bot.php pattern)
lib/server-template.js → Universal Express server for all services
lib/security.js        → Rate limiting + input sanitization + path validation
lib/utils.js           → Shared utilities (port check, PID mgmt, paths)
lib/providers/
  llamacpp.js          → llama.cpp HTTP provider (main local LLM)
  anthropic.js         → Anthropic Claude API
  gemini.js            → Google Gemini API
dashboard/             → Browser dashboard (replaces Electron renderer)
config/fob-config.json → Main configuration
adir/...               → Service directories (copied from original, server.js patched)
```

## Key rules

1. **NO PHP** — all API logic lives in `lib/php-bridge.js`
2. **NO Electron** — dashboard is plain HTML/CSS/JS served by Express
3. **NO Windows paths** — all paths use `$HOME/fob/` or `process.env.HOME + '/fob/'`
4. **NO .bat scripts** — only `.sh` bash scripts
5. **llama.cpp** is the default local LLM (replaces Ollama)
6. All shell scripts use `bash` (not `cmd.exe`)

## Service server pattern

Every service's `server.js` is exactly:
```js
const { createServer } = require('../../lib/server-template');
createServer(__dirname);
```

The depth of `../../` relative to `lib/` varies by directory depth. See existing services for examples.

## API pattern

All services respond to `GET/POST /api/bot.php?action=ACTION` where ACTION is:
- `status` — service health + LLM status
- `chat` — LLM chat (POST with `{message, history, conversation_id}`)
- `knowledge` — list KB files
- `get_prompt` / `update_prompt` — system prompt CRUD
- `get_knowledge` / `update_knowledge` — KB file CRUD
- `get_logs` — read log files
- `get_config` / `update_config` / `save_config` — config CRUD
- `write_file` / `read_file` / `list_files` / `search_files` — file ops

## Adding a service

1. Create directory in `adir/new211adir/TANDR-2026-02-11/apps/NewService/`
2. Add `config.json` with `"port": PORT`
3. Add `server.js` using the template pattern above (correct relative path!)
4. Add to `SERVICES` array in `lib/launcher.js` (follow existing format)
5. No PHP files needed

## LLM providers

Providers implement this interface:
```js
class Provider {
  async chat(messages, knowledgeContext = '') → { success, content, model, provider, tokens }
  async isAvailable() → boolean
  async getModelInfo() → { provider, model, max_tokens, available }
}
```

Provider selection in `php-bridge.js`:
- `llamacpp` → `lib/providers/llamacpp.js`
- `anthropic` → `lib/providers/anthropic.js`
- `gemini` → `lib/providers/gemini.js`
- `ollama` → treated as `llamacpp` (backward compat)

## Control API (port 9399)

```
GET  /status           → all service statuses
GET  /logs/:id         → service logs
GET  /endpoints        → configured tabs
GET  /config           → launcher config
POST /config           → save config
POST /restart/:id      → kill + respawn
POST /start/:id        → start service
POST /stop/:id         → stop service
GET  /events           → SSE live updates stream
```

## Paths

```
~/fob/                 → FOB_ROOT (main data root)
~/fob/config/          → launcher config
~/fob/models/          → GGUF model files
~/fob/run/             → PID files
~/fob/logs/            → launcher + llama.cpp logs
~/fob/adir/...         → service directories (symlinked or same as project)
~/llama.cpp/           → llama.cpp source and build
```

## Common tasks

**Restart a single service:**
```bash
curl -X POST http://127.0.0.1:9399/restart/ggbot
```

**Check service logs:**
```bash
tail -f ~/fob/logs/launcher.log
curl http://127.0.0.1:9399/logs/ggbot
```

**Switch LLM provider:**
Edit `~/fob/config/fob-config.json` → `llm.provider` → restart

**Add API key:**
Edit `~/fob/config/fob-config.json` → `llm.anthropic.api_key` or `llm.gemini.api_key`

## Environment variables

```
FOB_ROOT       → ~/fob/ (override with this env var)
SERVICES_ROOT  → ~/fob/adir/new211adir/TANDR-2026-02-11
FOB_CONFIG     → ~/fob/config/fob-config.json
NODE_ENV       → production
```

## Dependencies

Root `package.json` only needs:
- `express` ^4.18.2
- `cors` ^2.8.5

Services inherit express from the template pattern. No other npm packages required for core functionality. The llama.cpp/Anthropic/Gemini providers use only Node.js built-ins (`http`, `https`).

## Known issues / limitations

- The `VisionBot` service requires additional setup (camera/vision libraries) that may not be available on all Android devices
- `ImageGen` service requires a separate image generation backend
- `TANDRmgr-lab/bot` uses `npm start` — ensure its `package.json` has a start script
- Services that call Windows-specific utilities in their HTML/JS frontend will need additional patching
- Some agent HTML UIs may still reference `window.fob.*` IPC methods — those calls will fail silently in the browser dashboard (use fetch to localhost instead)
