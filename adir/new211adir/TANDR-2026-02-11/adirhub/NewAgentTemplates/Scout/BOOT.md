**324 Ports and paths are changed ref data**

# Scout Agent - Bootstrap & Deployment Guide

**Agent Name:** Scout
**Port:** 9203
**Type:** Intelligence & Research
**Status:** Ready for Deployment
**Created:** 2026-03-04

---

## Quick Start

### Deploy via Agent-Dropper v2

1. **Open Agent-Dropper UI:**
   ```
   http://127.0.0.1:9210/
   ```

2. **Go to:** Agent Builder tab

3. **Select Template:** Scout Agent (9203)

4. **Configure:**
   - Agent name: Scout
   - Role: Intelligence & Research
   - Port: 9203

5. **Deploy:** Click "Create Agent"

### Or Start Directly

```bash
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\NewAgentTemplates\Scout
node server.js
```

---

## What is Scout?

Scout is an intelligence and research specialist agent that:
- Searches and analyzes data across ADIR
- Discovers leads and identifies patterns
- Conducts competitive/market analysis
- Synthesizes research findings
- Works with Jerry (Operations) for actionable intelligence

**Key Differentiator:** Scout goes deeper than search—it discovers meaning and patterns.

---

## Capabilities

✅ **Full-Text Search** - Find anything in ADIR ecosystem
✅ **Data Extraction** - Parse and structure raw data
✅ **Pattern Recognition** - Identify trends and anomalies
✅ **Research Synthesis** - Combine insights into reports
✅ **Lead Discovery** - Find high-value prospects
✅ **Market Intelligence** - Competitive and industry analysis
✅ **Voice Support** - STT (speech-to-text) + TTS (text-to-speech)

---

## Integration Points

### Parent Agent (Jerry)
Scout reports findings to Jerry for operational decisions.

```bash
POST http://localhost:9200/agent/api/agent.php?action=chat&input=Scout_discovery_results
```

### Data Sources
- **PromptLibrary:** `C:/FOB/adir/.../PromptLibrary/adir/`
- **CRM Data:** `C:/FOB/adir/.../TANDRCRM/agent/data/`
- **Company Data:** `C:/FOB/adir/.../1CRM/adir/`

### Document Parser
For extracting data from DOCX and XLSX files:
```bash
curl http://localhost:11109/api/parse-docx?file=C:/path/to/file.docx
```

---

## Voice Configuration

### Enable Voice
Voice is enabled by default. Settings in `config.json`:

```json
"voice": {
  "enabled": true,
  "provider": "web-speech",
  "settings": {
    "rate": 1.0,
    "pitch": 1.0,
    "volume": 1.0,
    "language": "en-US"
  },
  "auto_speak": "auto",
  "speak_button": true,
  "mic_button": true
}
```

### Features
- **Push-to-Talk:** Click mic → speak → auto-filled input
- **Auto-Speak:** Bot responses speak automatically
- **Speak Button:** Click to replay response
- **Voice Settings:** Adjust speed, pitch, volume in UI

---

## API Endpoints

### Health Check
```bash
GET http://127.0.0.1:9203/health
```

### Search ADIR
```bash
POST http://127.0.0.1:9203/api/agent.php?action=chat&input=Search_for_[QUERY]
```

### Extract Data
```bash
POST http://127.0.0.1:9203/api/agent.php?action=chat&input=Extract_[DATA_TYPE]_from_[SOURCE]
```

### Analyze Patterns
```bash
POST http://127.0.0.1:9203/api/agent.php?action=chat&input=Analyze_patterns_in_[DATASET]
```

---

## Example Tasks

### Task 1: Find Hot Leads
```
Scout, search the CRM database for all leads contacted in the last 30 days with outstanding actions.
```

### Task 2: Market Intelligence
```
Scout, analyze competitor activity. Compare our service offerings with top 3 competitors in the construction industry.
```

### Task 3: Pattern Discovery
```
Scout, what patterns do you see in our sales pipeline? Which deal types have highest close rates?
```

---

## File Structure

```
Scout/
├── BOOT.md              (This file)
├── app.md               (Agent description)
├── task.md              (Task templates)
├── config.json          (Configuration)
├── server.js            (Node.js server)
├── package.json         (Dependencies)
├── api/
│   └── agent.php        (Agent API endpoint)
├── data/
│   └── (searchable files)
└── logs/
    └── (conversation logs)
```

---

## File Descriptions

### BOOT.md
Bootstrap and deployment guide (this file). Instructions for starting Scout.

### app.md
Agent description, capabilities, and use cases. What Scout does and why.

### task.md
Task template library. Common tasks Scout handles with step-by-step workflows.

### config.json
Configuration for port, voice, LLM provider, knowledge base paths.

---

## Configuration Reference

### Change Port
Edit `config.json`:
```json
"ports": {
  "http": 9203
}
```

### Change LLM Provider
```json
"llm": {
  "provider": "gemini"  // Options: gemini, anthropic, openai, local
}
```

### Disable Voice
```json
"voice": {
  "enabled": false
}
```

---

## Testing

### Test 1: Health Check
```bash
curl http://127.0.0.1:9203/health
# Expected: {"status": "healthy", "agent": "scout"}
```

### Test 2: Simple Search
```bash
curl -X POST http://127.0.0.1:9203/api/agent.php \
  -d 'action=chat&input=Find+all+leads+in+Oregon'
# Expected: Search results with matching leads
```

### Test 3: Voice
1. Open http://127.0.0.1:9203/ in browser
2. Click mic button
3. Say a search query
4. Scout searches and speaks results

---

## Troubleshooting

### Server Won't Start
```bash
# Check if dependencies are installed
npm install

# Check if port 9203 is available
netstat -ano | findstr :9203
```

### Voice Not Working
1. Check browser compatibility (Chrome, Edge, Firefox latest)
2. Verify microphone permissions
3. Check `config.json` voice settings
4. Check browser console for errors

### Search Returns No Results
1. Verify knowledge base paths exist
2. Check file permissions
3. Run ADIR sync: `curl http://127.0.0.1:9203/api/sync-adir`

---

## Next Steps

1. **Deploy Agent** - Use Agent-Dropper v2 or start directly
2. **Test Voice** - Verify STT and TTS work
3. **Connect to Jerry** - Register with parent agent
4. **Run Sample Tasks** - Try the example tasks above
5. **Monitor Logs** - Check `logs/` directory for issues

---

## Integration with ADIR System

Scout is part of the extended agent network:

```
ADIR Hub (9303) - Central dashboard
    ├─ Agent-Dropper v2 (9210) - Deployment tool
    └─ Agent Network:
        ├─ Jerry (9200) - Operations
        ├─ Randy (9201) - Sales/Marketing
        ├─ Tommy (9202) - Execution
        ├─ Scout (9203) - Intelligence ← YOU ARE HERE
        ├─ Architect (9204) - Planning
        ├─ Sentinel (9205) - Monitoring
        └─ Crafter (9206) - Content Creation
```

---

## Performance Notes

- **Search Speed:** O(n) where n = number of files in ADIR
- **Pattern Recognition:** May take 5-15 seconds depending on dataset size
- **Parallel Queries:** Can handle 5+ concurrent requests

For large datasets, use DocumentParser service (port 11109) to pre-process files.

---

## Support & Resources

- **ADIR Documentation:** See ARCHITECTURE.md, MULTI_LAYER_WORKFLOW.md
- **Agent Network:** See PORT-REGISTRY.json for all active agents
- **Voice Module:** See Agent-Dropper-v2 BOOT.md for voice options
- **CRM Data:** Located at `C:/FOB/.../TANDRCRM/agent/data/`

---

## Summary

Scout is a full-featured intelligence agent with:
- ✅ Deep research and discovery capabilities
- ✅ Voice support (STT + TTS)
- ✅ Integration with Jerry and ADIR ecosystem
- ✅ Pattern recognition and synthesis
- ✅ Full logging and monitoring

**Status:** ✅ Ready to Deploy
**Version:** 1.0.0
**Port:** 9203
**Next Agent:** Architect (9204)

**324 Ports and paths are changed ref data**
