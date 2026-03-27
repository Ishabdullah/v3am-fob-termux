# TANDRAgent BOOT


324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 
324 ALL PORTS AND PATHS ARE FOR SYNTAX EXAMPLE ONLY 

## Service Identity
- **Name:** TANDRAgent
- **Role:** Central operations hub — reads logs, manages knowledge, coordinates bots
- **Port:** 9200
- **Root:** C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent

## How to Start

```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent
node server.js
```

## Pre-Flight Check
1. Node.js installed? `node --version`
2. Dependencies installed? Check node_modules/ exists
3. Config valid? Check config.json (LLM provider, API keys)
4. Port 9200 available? `netstat -ano