# TANDRmgr-lab - Current Status

**Last Updated:** 2026-03-13
**Status:** ✅ Operational (Integrated with FOB)
**Port:** 8086
**Root:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab`

---

## System Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Service** | ✅ Running | Starts with MasterSTART.bat |
| **Port 8086** | ✅ Available | FOB assignment (was 8085) |
| **Ollama (11434)** | ✅ Connected | LLM provider active |
| **Memory System** | ✅ Working | Conversation tracking enabled |
| **API Endpoints** | ✅ Responding | All documented endpoints work |
| **Config** | ✅ Valid | `bot/config.json` loaded successfully |

---

## Service Health Check

**Last Verified:** 2026-03-13

```bash
# Expected response when running
curl http://localhost:8086/
```

**Response:** Service info + configuration

---

## Integration Status

### With FOB Ecosystem
- ✅ **MasterSTART.bat** - Starts automatically with all 8 services
- ✅ **ADIR Hub (9303)** - Registered & appears in service list
- ✅ **Status Bar** - Shows as running when services health-checked
- ✅ **Quick Links** - Available in ADIR Hub dashboard

### With Ollama
- ✅ **Model Loaded** - Default: qwen2.5:7b
- ✅ **API Relay** - Forwards requests to `/api/generate`
- ✅ **Available Models** - 20+ models available
- ✅ **Fallback** - Handles Ollama unavailability gracefully

### With Memory Bot (Port 8091)
- ✅ **Context Sharing** - Sends conversation data
- ✅ **Data Retrieval** - Pulls previous session context
- ✅ **Integration** - Configured in bot/config.json

---

## Recent Changes (2026-03-13)

### Port Update
- ❌ **Old:** Port 8085 (TANDR system)
- ✅ **New:** Port 8086 (FOB thin client)
- **Reason:** Port consolidation for FOB

### Configuration Updates
- ✅ Updated config.json to use Ollama only (no external APIs)
- ✅ Verified all endpoints responding
- ✅ Tested with MasterSTART.bat integration

### Documentation Created
- ✅ NEW-313-index.md - Navigation hub
- ✅ NEW-313-BOOT.md - Operating guide
- ✅ NEW-313-current.md - Status (this file)
- ✅ NEW-313-working.md - Architecture
- ✅ SANITIZATION-GUIDE.md - Data cleanup guide

---

## Data & Logs Status

### Log Files (Absolute Paths)

| File | Size | Status | Action Needed |
|------|------|--------|-------------------|
| `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\conversations.txt` | 1.1 MB | ⚠️ Contains company data | SANITIZE before open source |
| `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\adir\logs\queries.txt` | TBD | ⚠️ Contains queries | SANITIZE before open source |
| `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\server-restarts.log` | 5 KB | ✅ Safe | Keep |
| `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\server-errors.txt` | 25 KB | ⚠️ May have context | REVIEW |

### Memory Files (Absolute Paths)

**Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge\`

| File | Status | Action |
|------|--------|--------|
| conversations.md | ⚠️ Company data | SANITIZE |
| institutional_dna_hooks.md | 🔴 CRITICAL | REVIEW/SANITIZE (company procedures) |
| relay-history.md | ⚠️ May have references | REVIEW |
| error-patterns.md | ⚠️ May have context | REVIEW |
| performance.md | ⚠️ May reference projects | SANITIZE project names |
| service-status.md | ✅ Usually safe | KEEP |
| INTEGRATION-GUIDE.md | ⚠️ Company-specific setup | REVIEW |
| PROMPT-GUIDE.md | ⚠️ Company prompts | GENERALIZE |
| index.md | ⏳ Depends on others | UPDATE after sanitizing |

---

## Pre-Open Source Checklist

### Data Sanitization
- [ ] **Read:** SANITIZATION-GUIDE.md for complete instructions
- [ ] **Back up:** Copy entire folder before modifying
- [ ] **Find/Replace:** Company names → generic terms
- [ ] **Remove:** Customer data, project details, sensitive context
- [ ] **Review:** All memory files listed above
- [ ] **Test:** Verify service still works after sanitization
- [ ] **Approve:** Sign off that data is clean

### Code Review
- [ ] **bot/server.js** - Remove any company-specific logic
- [ ] **bot/config.json** - Ensure no hardcoded company references
- [ ] **API endpoints** - Verify generic/safe for public use
- [ ] **Error messages** - No company-specific details leaked

### Documentation Review
- [ ] **BOOT.md** - Uses generic examples, not company-specific
- [ ] **Comments** - Remove company references
- [ ] **README** - Clear for new users unfamiliar with company

---

## Performance Metrics

**Baseline (Last Measured):**
- Startup time: ~5 seconds
- Memory usage: ~80-100 MB
- Response time (Ollama): ~2-30 seconds (model dependent)
- Error rate: < 1%

---

## Known Issues

### No Current Issues
All systems operational as of 2026-03-13

### Historical Issues (Resolved)
- ✅ Port conflict (8085 → 8086)
- ✅ Config validation
- ✅ Ollama integration
- ✅ Memory Bot handshake

---

## Dependencies

### External Services
- **Ollama (11434)** - REQUIRED for LLM functions
- **Memory Bot (8091)** - OPTIONAL for context persistence

### Internal
- **ADIR Hub (9303)** - For registration & status reporting
- **Node.js** - Runtime
- **npm packages** - Listed in package.json

---

## Next Steps

### Immediate (Before Open Source)
1. [ ] **Sanitize all data** - Follow SANITIZATION-GUIDE.md
2. [ ] **Test APIs** after sanitization
3. [ ] **Verify logs** are company-free
4. [ ] **Approve release** once clean

### Short Term (After Release)
1. [ ] Monitor for issues
2. [ ] Collect community feedback
3. [ ] Document common use cases
4. [ ] Consider performance optimizations

### Future
1. [ ] Add API documentation endpoint
2. [ ] Create example scripts
3. [ ] Add metrics/monitoring
4. [ ] Consider clustering capability

---

## Testing Log

### Last Test: 2026-03-13
- ✅ Started via MasterSTART.bat
- ✅ Port 8086 accessible
- ✅ Ollama relay working
- ✅ Health check passing
- ✅ ADIR Hub sees service

---

## Communication Channels

When issues arise:
1. Check logs: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\`
2. Review: NEW-313-working.md (architecture)
3. Check: Ollama status (port 11434)
4. Check: Memory Bot status (port 8091)

---

## Sanitization Reminders

**BEFORE OPEN SOURCE - DO NOT FORGET:**

🔴 **conversations.txt** - 1.1 MB of conversation history
  → Must find/replace company names
  → Must remove customer data

🔴 **institutional_dna_hooks.md** - Company procedures
  → Review what's proprietary
  → Decide: generalize or remove?

🔴 **queries.txt** - Bot interaction history
  → May contain customer questions
  → May contain company procedures

→ See SANITIZATION-GUIDE.md for full details and absolute paths

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-current.md`
**Created:** 2026-03-13
**Purpose:** Track current operational status
**Status:** ✅ Operational - Ready for sanitization
**Last Updated:** 2026-03-13

**Related Files:**
- Index: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-index.md`
- Boot: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-BOOT.md`
- Working: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-working.md`
- Sanitization: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\SANITIZATION-GUIDE.md`



324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
