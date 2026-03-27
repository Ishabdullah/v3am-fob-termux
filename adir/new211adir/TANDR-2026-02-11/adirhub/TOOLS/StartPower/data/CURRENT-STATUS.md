**324 Ports and paths are changed ref data**

# System Audit - 2026-02-11

## TESTED SO FAR

### Step 1: TANDRAgent (localhost:9200) - SELF CHECK
- **URL:** http://localhost:9200/api/agent.php?action=status
- **Result:** ✅ WORKING
- **Response:** {"status":"ok","agent":"TANDRAgent","version":"1.0.0","provider":"anthropic","model":"claude-3-haiku-20240307","fallback":"ollama\/gemma3:1b","tools":8,"uptime":"running"}

### Step 2: TANDRbot (localhost:8081)
- **URL:** http://localhost:8081/api/bot.php?action=status
- **Result:** ✅ WORKING
- **Response:** {"status":"ok","bot":"TANDRbot","version":"2.0.0","provider":"anthropic","model":"claude-3-haiku-20240307","knowledge_files":6,"cache_ttl":300}

### Step 3: TANDRSocial (localhost:8099)
- **URL:** http://localhost:8099/api/bot.php?action=status
- **Result:** ✅ WORKING
- **Response:** {"status":"ok","bot":"TANDRSocial","version":"1.0.0","provider":"anthropic","model":"claude-3-haiku-20240307","features":{"facebook_graph":true,"post_queue":true,"auto_discovery":true},"knowledge_files":3,"environment":"production"}

### Step 4: TANDRmgr (localhost:8085)
- **URL:** http://localhost:8085/api/mgr.php?action=status
- **Result:** ❌ NO RESPONSE
- **Error:** Connection refused or service not running

### Step 5: ADIR Hub (localhost:9303)
- **URL:** http://localhost:9303/api/adir-api.php?action=status
- **Result:** ✅ WORKING
- **Response:** {"status":"ok","hub":"ADIR Hub","version":"1.0.0","services":{"TANDRbot":8081,"TANDRAgent":9200,"TANDRSocial":8099,"TANDRmgr":8085},"environment":"production"}

### Step 6: Ollama (localhost:11434)
- **URL:** http://localhost:11434/
- **Result:** ✅ WORKING
- **Response:** "Ollama is running"

## WORKS NOW
- TANDRAgent (9200) - Status OK
- TANDRbot (8081) - Status OK
- TANDRSocial (8099) - Status OK
- ADIR Hub (9303) - Status OK
- Ollama (11434) - Running

## NEEDS REVIEW
(none yet)

## NOT WORKING
- TANDRmgr (8085) - No response. Not started.

**324 Ports and paths are changed ref data**
