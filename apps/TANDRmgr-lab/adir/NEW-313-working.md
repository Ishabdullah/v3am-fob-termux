324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 

# TANDRmgr-lab - Architecture & Design

**Created:** 2026-03-13
**Status:** ✅ Production Ready
**Purpose:** Explain how TANDRmgr-lab works and why it's designed this way

---

## What Is TANDRmgr-lab?

**TANDRmgr-lab** is the **manager lab & testing service** in FOB:

```
User → TANDRmgr-lab (8086) → Ollama (11434) → Response
                    ↓
                Memory Bot (8091) - Context persistence
```

It provides:
1. **Testing interface** for LLM interactions
2. **API relay** to Ollama
3. **Memory system** for conversation context
4. **Integration layer** with other FOB services

**NOT:**
- Production LLM gateway (removed company-specific routing)
- Database service
- External API manager

---

## Architecture

### Service Stack

```
┌─────────────────────────────────────────┐
│   User/Client Interface                 │
│   http://localhost:8086/                │
└────────────────┬────────────────────────┘
                 │
    ┌────────────▼────────────┐
    │  Express Web Server     │
    │  Node.js (server.js)    │
    │                         │
    │  ├─ HTTP Endpoints      │
    │  ├─ Request Handling    │
    │  ├─ Response Formatting │
    │  └─ Error Management    │
    └────────────┬────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    │  ┌──────────────────┐   │   ┌──────────────────┐
    │  │  Ollama Relay    │   │   │  Memory System   │
    │  │  (/api/generate) │   │   │  (Conversation   │
    │  │  (/api/chat)     │   │   │   Context)       │
    │  └────────┬─────────┘   │   └────────┬─────────┘
    │           │              │            │
    │           │ REST calls   │  File read/write
    │  ┌────────▼──────────────▼────┐     │
    │  │   Data/Memory System        │────┘
    │  │   /data/memory-knowledge/   │
    │  └─────────────────────────────┘
    │
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────────────────┐
    │  External Services                  │
    │  ├─ Ollama (11434)                  │
    │  ├─ Memory Bot (8091)               │
    │  └─ ADIR Hub (9303)                 │
    └─────────────────────────────────────┘
```

### Request Flow: Chat Query

```
1. User sends POST /api/generate
   └─ {"prompt": "Hello", "model": "qwen2.5:7b"}

2. TANDRmgr-lab receives request
   └─ Validates input
   └─ Checks config

3. Load conversation memory
   └─ Reads: /data/memory-knowledge/conversations.md
   └─ Prepends previous context

4. Call Ollama
   └─ POST to http://localhost:11434/api/generate
   └─ Sends: prompt + model + context
   └─ Waits for response

5. Process response
   └─ Extract text
   └─ Format JSON
   └─ Store in memory

6. Optional: Notify Memory Bot
   └─ POST to http://localhost:8091/api/store
   └─ Send conversation turn

7. Return to user
   └─ JSON response
   └─ {"response": "...", "model": "...", "context": {...}}
```

---

## Core Components

### 1. Express Server (bot/server.js)

**Purpose:** HTTP request handling

**Key Routes:**
```javascript
GET /                    // Service info
POST /api/generate       // LLM generation
POST /api/chat           // Chat completion
GET /api/memory          // Retrieve context
GET /status              // Health check
POST /api/config         // Update config
```

**Features:**
- Request validation
- CORS handling
- Error catching
- Response formatting

### 2. Ollama Integration

**Connection:** `http://localhost:11434`

**Endpoints Used:**
```
POST /api/generate              // Text generation
POST /api/chat/completions      // Chat API
GET /api/tags                   // List models
```

**Default Model:** `qwen2.5:7b`
- 7 billion parameters
- Fast response (~2-5 seconds)
- Good quality outputs
- ~4GB memory usage

**How It Works:**
```
TANDRmgr request
    ↓
POST to Ollama /api/generate
    ↓
Ollama processes locally
    ↓
Returns streamed/complete response
    ↓
TANDRmgr formats and returns
```

### 3. Memory System

**Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\bot\data\memory-knowledge\`

**Files:**
- **conversations.md** - Conversation turns with context
- **relay-history.md** - Service interactions
- **error-patterns.md** - Learned error patterns
- **performance.md** - Response times & metrics
- **institutional_dna_hooks.md** - Operating procedures
- **index.md** - Memory file index

**How It Works:**
```
User asks question
    ↓
Read conversations.md for context
    ↓
Prepend to new query
    ↓
Send to Ollama
    ↓
Get response
    ↓
Append to conversations.md
    ↓
Return to user
```

**File Size Management:**
- conversations.md grows slowly
- Currently ~1.1 MB (hundreds of turns)
- Can grow to gigabytes with heavy use
- Trim manually or implement rotation

### 4. Configuration (bot/config.json)

**Key Settings:**
```json
{
  "port": 8086,              // Unique to FOB
  "ollama": {
    "host": "http://localhost",
    "port": 11434,
    "defaultModel": "qwen2.5:7b",
    "timeout": 30000
  },
  "memory": {
    "enabled": true,
    "path": "./data/memory-knowledge",
    "maxAge": null           // Keep all history
  },
  "api": {
    "relay": true,           // Forward to Ollama
    "help": true             // Enable help endpoint
  }
}
```

---

## Design Decisions

### Decision 1: Port 8086 (Not 8085)

**What:** Unique port in FOB
**Why:**
- Avoids conflicts with old TANDR system
- Unique identification in registry
- Easy to remember

**Impact:**
- Must update all references from 8085 → 8086
- MasterSTART.bat checks this port
- ADIR Hub knows this port

---

### Decision 2: Ollama Only (No External APIs)

**What:** Single LLM provider
**Why:**
1. **Offline-first** - Works without internet
2. **No API keys** - No authentication needed
3. **Cost-free** - No per-request charges
4. **Local control** - Models run on user machine
5. **Privacy** - No data sent externally

**Removed:**
- ❌ Google Gemini (external API)
- ❌ OpenAI (external API)
- ❌ Anthropic Claude (external API)
- ❌ Multi-provider routing logic

**Impact:**
- Simpler code
- No credential management
- Performance depends on local hardware
- Model choice limited to Ollama catalog

---

### Decision 3: Persistent Memory (Conversations.md)

**What:** Store all conversation turns in markdown file
**Why:**
1. **Context preservation** - Claude/agents can reference history
2. **Human readable** - Easy to audit & understand
3. **Simple** - No database needed
4. **Searchable** - Standard text format
5. **Portable** - Can move between systems

**How It Works:**
```markdown
## Turn 1 (2026-03-13 10:00)
**User:** "What's your name?"
**Model:** qwen2.5:7b
**Response:** "I'm TANDRmgr-lab..."

## Turn 2 (2026-03-13 10:01)
**User:** "Can you explain FOB?"
**Model:** qwen2.5:7b
**Response:** "FOB is a thin client..."
```

**Growth Pattern:**
- ~500 bytes per conversation turn
- 1000 turns = ~500 KB
- 10000 turns = ~5 MB
- Currently: ~1.1 MB (roughly 2000+ turns)

---

### Decision 4: File-Based Data (Not Database)

**What:** Use markdown files instead of database
**Why:**
1. **No dependencies** - No database server needed
2. **Version control** - Works with git
3. **Human readable** - Can edit manually
4. **Portable** - Copy files anywhere
5. **Simple** - Easier to understand

**Tradeoff:**
- Slower than database for large datasets
- No complex querying
- No ACID guarantees
- Thread safety requires locking

**Suitable for:**
- Thin client (moderate data volume)
- Development/testing
- Single-user scenarios

---

### Decision 5: Integration with Memory Bot (Optional)

**What:** Can send context to Memory Bot (8091)
**Why:**
1. **Persistent storage** - Memory Bot stores across reboots
2. **Shared context** - Multiple agents can access
3. **Offload** - Memory Bot manages retention
4. **Flexibility** - Can swap memory backend

**How:**
```
TANDRmgr-lab (8086)
    ↓
POST /api/store to Memory Bot (8091)
    ↓
Memory Bot persists context
    ↓
Other services can retrieve via GET /api/retrieve
```

**Status:** Configured but optional

---

## Service Integration

### With ADIR Hub (Port 9303)

**What:** TANDRmgr registers with ADIR Hub
**How:**
1. MasterSTART.bat starts TANDRmgr
2. TANDRmgr binds to port 8086
3. ADIR Hub curl checks port 8086
4. TANDRmgr responds (online)
5. ADIR Hub shows green status badge

**Endpoints:**
- ADIR Hub checks: `curl http://localhost:8086/`
- Admin can view: http://localhost:9303/ → TANDRmgr status

### With Ollama (Port 11434)

**What:** TANDRmgr calls Ollama for LLM
**How:**
1. TANDRmgr receives request
2. Ollama model specified in request or config
3. POST `/api/generate` to Ollama
4. Ollama processes locally
5. Return response to user

**Dependency:**
- TANDRmgr requires Ollama running
- If Ollama down, requests fail gracefully

### With Memory Bot (Port 8091)

**What:** Optional integration for context persistence
**How:**
1. After Ollama response received
2. TANDRmgr POSTs conversation to Memory Bot
3. Memory Bot stores in persistent backend
4. Other services can retrieve context

**Status:** Configured in bot/config.json

---

## API Endpoints (Main)

### POST /api/generate
Generate text from prompt

**Request:**
```json
{
  "prompt": "Explain open source",
  "model": "qwen2.5:7b",
  "temperature": 0.7,
  "top_p": 0.9
}
```

**Response:**
```json
{
  "response": "Open source software is...",
  "model": "qwen2.5:7b",
  "time_ms": 2500,
  "context_used": true
}
```

### POST /api/chat
Chat completion style

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi!"},
    {"role": "user", "content": "What's FOB?"}
  ],
  "model": "qwen2.5:7b"
}
```

**Response:**
```json
{
  "content": "FOB is a thin client...",
  "model": "qwen2.5:7b",
  "finish_reason": "stop"
}
```

### GET /api/memory
Retrieve conversation context

**Response:**
```json
{
  "turns": 45,
  "context_size_kb": 120,
  "last_updated": "2026-03-13T10:30:00Z",
  "available_models": ["qwen2.5:7b", "mistral:7b"]
}
```

---

## Performance Characteristics

### Startup
- Service: ~5 seconds
- Config load: < 1 second
- Memory load: < 1 second
- Total: ~5 seconds

### Response Time
- Ollama model load: ~1 second (first request)
- Generation: ~2-30 seconds (depends on model & prompt)
- Memory save: < 500ms
- Total: ~3-31 seconds per request

### Memory Usage
- Node.js runtime: ~40 MB
- Express + libraries: ~30-40 MB
- Loaded models: 0 MB (Ollama separate process)
- Memory files: varies (usually < 200 MB)
- Total: ~80-100 MB

### Disk Usage
- Code: ~20 MB (with node_modules)
- Memory files: ~1.1 MB (growing)
- Logs: ~40 MB (varies)
- Total: ~61 MB

---

## Limitations & Future

### Current Limitations
1. **Single instance** - Can't scale horizontally
2. **Blocking I/O** - File operations block requests
3. **No caching** - Reloads memory each request
4. **No streaming** - Returns full response at once
5. **No authentication** - Anyone can call APIs

### Future Improvements
1. **Add caching** - Cache memory & responses
2. **Streaming** - Stream Ollama responses as they generate
3. **Authentication** - API key or JWT tokens
4. **Clustering** - Support multiple instances
5. **Database backend** - SQL/NoSQL for scalability

---

## Why This Design?

**Principle:** Thin client means simple, self-contained service

- **No external dependencies** - Works offline
- **Readable code** - Easy to understand & modify
- **Clear data** - Human-editable files, not opaque databases
- **Observable** - See what's happening in logs/memory
- **Portable** - Copy folder, it works anywhere

This approach prioritizes **clarity and simplicity** over **scale and performance**, which is appropriate for a thin client focused on being easy to understand and extend.

---

## Footer

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-working.md`
**Created:** 2026-03-13
**Purpose:** Document architecture & design decisions
**Status:** ✅ Production ready
**Last Updated:** 2026-03-13

**Related Files:**
- Index: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-index.md`
- Boot: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-BOOT.md`
- Current: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\NEW-313-current.md`
- Sanitization: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\SANITIZATION-GUIDE.md`



324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 
324 All ports and paths have changed example only for syntax 