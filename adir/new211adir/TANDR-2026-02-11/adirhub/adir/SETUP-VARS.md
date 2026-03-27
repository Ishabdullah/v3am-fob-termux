**324 Ports and paths are changed ref data**

# SETUP-VARS — Installer Variable Registry
Path: adirhub/adir/SETUP-VARS.md
Purpose: Every hardcoded path, port, or credential that must become a user-configurable
         variable in the FOB setup wizard (setup.exe / Electron onboarding screen).
         When you hardcode something that a new user would need to change, add it here.

---

## HOW TO USE THIS FILE
When writing code that contains a path, port, or key that varies per install:
1. Use it hardcoded for now (ship it)
2. Add it to this file with: variable name, default, where it's used, setup wizard label
3. Tag the source file with a comment: # SETUP_VAR: VARIABLE_NAME

This file becomes the spec for the setup wizard developer.

---

## INSTALL ROOT

| Variable         | Default              | Used In                          | Wizard Label                  |
|------------------|----------------------|----------------------------------|-------------------------------|
| FOB_ROOT         | C:\FOB               | All bats, server paths           | "FOB install directory"       |
| TANDR_ROOT       | C:\FOB\adir\new211adir\TANDR-2026-02-11 | All service paths | (derived from FOB_ROOT) |

---

## EXTERNAL TOOL PATHS

| Variable           | Default              | Used In                          | Wizard Label                        |
|--------------------|----------------------|----------------------------------|-------------------------------------|
| SD_WEBUI_PATH      | D:\AIScreen          | Launcher2.bat, ImageGen          | "Stable Diffusion WebUI folder"     |
| SD_OUTPUT_PATH     | F:\4\ME\EYES         | Launcher2.bat, ImageGen config   | "Image generation output folder"    |
| VISION_BRIDGE_PATH | F:\4\launch_bridge.bat | Launcher2.bat, VisionBridge.bat | "Vision Bridge launch script"       |
| VISIONBOT_PATH     | F:\Vision            | Launcher2.bat                    | "VisionBot folder"                  |
| PHP_PATH           | C:\FOB\php\php-cgi.exe | All service server.js files    | "PHP CGI executable path"           |
| NGROK_PATH         | C:\ngrok\ngrok.exe   | Launcher2.bat, ngrok bats        | "ngrok executable path"             |
| OLLAMA_PATH        | C:\Users\%USERNAME%\AppData\Local\Programs\Ollama\ollama.exe | MasterSTART, Launcher2 | "Ollama executable" (auto-detect) |

---

## PORTS

| Variable         | Default | Used In                    | Wizard Label                     | Wizard Type    |
|------------------|---------|----------------------------|----------------------------------|----------------|
| PORT_ADIR_HUB    | 9303    | adirhub/server.js          | "ADIR Hub port"                  | optional       |
| PORT_TANDRMGR    | 8086    | apps/TANDRmgr-lab          | "TANDRmgr-lab port"              | optional       |
| PORT_AGENT_DROP  | 9210    | Agent-Dropper-v2           | "Agent Dropper port"             | optional       |
| PORT_KB_MAKER    | 9220    | KB-Maker-v2                | "KB-Maker port"                  | optional       |
| PORT_IMAGEGEN    | 9230    | apps/ImageGen              | "ImageGen relay port"            | optional       |
| PORT_SCREENSTREAM| 9240    | apps/ScreenStream          | "ScreenStream port"              | optional       |
| PORT_GGBOT       | 10336   | TOOLS/GGBOT                | "GGBot port"                     | optional       |
| PORT_FOB_SERVER  | 8100    | fob-server.js              | "FOB Command Center port"        | optional       |
| PORT_AGENT_ONE   | 11111   | apps/Agent1                | "Agent One port"                 | optional       |
| PORT_AGENT_TWO   | 11112   | apps/Agent2                | "Agent Two port"                 | optional       |
| PORT_AGENT_FOUR  | 11113   | apps/Agent4                | "Agent Four port"                | optional       |
| PORT_MEMORY_BOT  | 8091    | apps/TANDRmgr-lab/bot      | "Memory Bot port"                | optional       |
| PORT_VISION_BRIDGE| 40001  | Vision Bridge (Python)     | "Vision Bridge port"             | optional       |
| PORT_VISIONBOT   | 48882   | apps/VisionBot             | "VisionBot port"                 | optional       |
| PORT_SD_WEBUI    | 7860    | ImageGen api/generate.php  | "SD WebUI port"                  | optional       |

---

## TUNNEL / REMOTE ACCESS

| Variable           | Default           | Used In                     | Wizard Label                        |
|--------------------|-------------------|-----------------------------|-------------------------------------|
| NGROK_DOMAIN_A4    | v3am.ngrok.app    | START-AGENT4-NGROK.bat, Launcher2 | "Agent Four ngrok domain"       |
| NGROK_DOMAIN_GGBOT | tandrm.ngrok.app  | GGBOT ngrok bat             | "GGBot ngrok domain"                |
| TUNNEL_DASHBOARD   | http://v3am.com/FOB/dashboard.php | tunnel-manager  | "Tunnel dashboard URL"         |
| TUNNEL_PASSWORD    | FOB2026           | dashboard.php               | "Tunnel dashboard password"         |

---

## API KEYS / CREDENTIALS

Keys currently live in each service's config.json — leave them there for now.
User rotates/sets them from provider consoles. Electron wizard sets initial values on fresh install.

| Variable              | Default  | Used In                                      | Wizard Label                        |
|-----------------------|----------|----------------------------------------------|-------------------------------------|
| ANTHROPIC_API_KEY     | (none)   | Agent-Dropper config.json, agent configs     | "Anthropic API key (optional)"      |
| GEMINI_API_KEY        | (none)   | Agent-Dropper config.json                    | "Google Gemini API key (optional)"  |
| OLLAMA_MODEL          | gemma3:1b | TANDR_DEFAULT_MODEL env var                 | "Default Ollama model"              |
| NGROK_AUTH_TOKEN      | (none)   | ngrok config                                 | "ngrok auth token (optional)"       |

NOTE: On open-source ship, config.json files will have placeholder values like "YOUR_API_KEY_HERE".
Electron setup wizard populates real values into fob-config.json on first run.
Services read from fob-config.json and fall back to their own config.json defaults.

---

## SETUP WIZARD FLOW (proposed)

Screen 1 — Welcome + license
Screen 2 — Install directory (FOB_ROOT)
Screen 3 — Required: Node.js check, PHP check, Ollama check (with install links if missing)
Screen 4 — Optional tools:
            [ ] Stable Diffusion WebUI — path picker → SD_WEBUI_PATH
            [ ] Vision Bridge          — path picker → VISION_BRIDGE_PATH
            [ ] VisionBot              — path picker → VISIONBOT_PATH
            [ ] ngrok tunnels          — domain inputs → NGROK_DOMAIN_A4
Screen 5 — Port configuration (advanced, collapsible — most users skip)
Screen 6 — API keys (Anthropic key input, optional)
Screen 7 — Review + Install
Screen 8 — Launch (runs Launcher2 equivalent, shows health check)

---

## NOTES FOR ELECTRON SETUP WIZARD
- Write all user choices to a single config file: FOB_ROOT\fob-config.json
- Launcher2 reads fob-config.json at startup instead of hardcoded values
- Services read their port from fob-config.json or fall back to defaults
- "Click yes next next" path = all defaults, only asks for FOB_ROOT
- Advanced path = exposes all variables above

**324 Ports and paths are changed ref data**
