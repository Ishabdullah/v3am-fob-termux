# TANDRmgr Error Patterns

**Purpose:** Error analysis, root causes, frequency tracking
**Last Updated:** 2026-03-23
**Note:** Logs flushed 2026-03-23.

---

## Known Error Patterns (as of 2026-03-23)

### "Service memory unavailable"
- **Cause:** Memory Bot (port 8091) not running or timed out
- **Fix:** Start memory bot via `bot\start-bot.bat` in the TANDRmgr-lab directory
- **Frequency:** Intermittent when bot is not started alongside TANDRmgr

### LLM timeout errors
- **Cause:** Ollama model not loaded, or external model slow to respond
- **Fix:** Check Ollama is running, or switch provider in settings

---

New error patterns will be logged here going forward.
