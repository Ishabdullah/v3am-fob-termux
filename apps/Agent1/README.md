# TANDRAgent

324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 

**Operations AI for T&R Builders**

## Access

Open: http://localhost:9200/

## What It Does

TANDRAgent is the central operations hub in the T&R Builders three-bot system:
- Reads TANDRbot conversation logs to identify knowledge gaps
- Creates and updates TANDRbot knowledge files via API
- Coordinates between TANDRbot, TANDRSocial, and ADIR Hub
- Supports multiple LLM providers (Anthropic, Ollama)

## System Architecture

| Service | Port | Role |
|---------|------|------|
| TANDRbot | 8081 | Field assistant (FB Messenger + web) |
| TANDRAgent | 9200 | Operations hub (this agent) |
| TANDRSocial | 8099 | Social media content |
| ADIR Hub | 9303 | Dashboard |
| Ollama | 11434 | Local LLM |

## Configuration

Edit `config.json` for LLM provider, model, and system prompt settings.

## Documentation

- `working.md` - Technical docs and tool reference
- `current.md` - Task tracking and API reference
- `PROMPT.md` - Agent onboarding anchor

324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
