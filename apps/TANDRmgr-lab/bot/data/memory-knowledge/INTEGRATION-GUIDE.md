**324 Ports and paths are changed ref data**

# TANDRMemory Real-Time Integration Guide

**Purpose:** How to integrate TANDRmgr-lab with TANDRMemory for live conversation tracking
**Status:** Ready for integration
**Version:** 1.0.0

---

## Quick Start

### 1. TANDRmgr-lab Posts Conversations to Memory
After each user interaction, TANDRmgr-lab POSTs the conversation to TANDRMemory:

```bash
curl -X POST http://127.0.0.1:8091/api/memory.php \
  -H "Content-Type: application/json" \
  -d '{
    "action": "ingest_conversation",
    "timestamp": "2026-03-07 15:30:45",
    "user": "Why is Randy not working?",
    "assistant": "Randy (9201) has not been deployed yet. Configuration is ready but service is not running."
  }'
```

### 2. TANDRMemory Stores Conversation
- Appends to: `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr-lab\adir\logs\conversations.txt`
- Format: `[TIMESTAMP] User: question\nAssistant: response\n---\n`

### 3. TANDRmgr-lab Queries Memory When Needed
```bash
curl "http://127.0.0.1:8091/api/memory.php?action=query&q=Why+did+Randy+fail"
```

Memory returns answer based on:
- Recent conversations (what was just discussed)
- Knowledge base files (documented history)
- Pattern matching (service status, errors, etc.)

---

## New API Endpoints

### 1. Ingest Conversation (Real-Time)
**Endpoint:** `POST /api/memory.php?action=ingest_conversation`

**Purpose:** TANDRmgr-lab sends new conversations as they happen

**Request:**
```json
{
  "timestamp": "2026-03-07 15:30:45",
  "user": "What services are working?",
  "assistant": "Currently: Jerry (✅), Randy (⏳), Tommy (⏳), TANDRbot (❌), TANDRSocial (❌)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Conversation ingested",
    "timestamp": "2026-03-07 15:30:45",
    "file": "C:\\...\\adir\\logs\\conversations.txt"
  }
}
```

**Usage in PHP (TANDRmgr-lab):**
```php
function post_to_memory($user_msg, $assistant_msg) {
    $data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'user' => $user_msg,
        'assistant' => $assistant_msg
    ];

    $ch = curl_init('http://127.0.0.1:8091/api/memory.php?action=ingest_conversation');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_exec($ch);
    curl_close($ch);
}

// After responding to user
$response = "Your answer here";
post_to_memory($user_input, $response);
```

---

### 2. Get Recent Conversations
**Endpoint:** `GET /api/memory.php?action=get_recent_conversations&limit=20&search=jerry`

**Purpose:** Retrieve recent conversations (with optional filtering)

**Query Parameters:**
- `limit` - Number of recent conversations to return (default: 20, max: 100)
- `search` - Optional search term to filter conversations

**Response:**
```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "timestamp": "2026-03-07 15:30:45",
        "user": "Is Jerry working?",
        "assistant": "Yes, Jerry (9200) is operational",
        "full_text": "Is Jerry working? | Yes, Jerry (9200) is operational"
      }
    ],
    "count": 5,
    "latest": "2026-03-07 15:30:45"
  }
}
```

**Usage:**
```bash
# Get last 20 conversations
curl "http://127.0.0.1:8091/api/memory.php?action=get_recent_conversations&limit=20"

# Search for conversations about Randy
curl "http://127.0.0.1:8091/api/memory.php?action=get_recent_conversations&search=randy"
```

---

### 3. Refresh Memory
**Endpoint:** `GET /api/memory.php?action=refresh_memory`

**Purpose:** Regenerate memory statistics from all logged conversations

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Memory refreshed from logs",
    "statistics": {
      "total_conversations": 247,
      "recent_topics": {
        "jerry": 45,
        "error": 32,
        "service": 28,
        "fail": 18,
        "randy": 15
      },
      "latest_timestamp": "2026-03-07 15:30:45"
    }
  }
}
```

**Usage:**
```bash
# Refresh memory after bulk ingestion
curl "http://127.0.0.1:8091/api/memory.php?action=refresh_memory"
```

---

## Integration Flow

### Real-Time Conversation Tracking

```
TANDRmgr-lab receives user input
    ↓
Generate response (existing logic)
    ↓
POST to TANDRMemory.ingest_conversation()
    ↓
TANDRMemory appends to conversations.txt
    ↓
Send response to user
    ↓
(Next query)
    ↓
TANDRmgr-lab queries memory with [ASK:memory]
    ↓
TANDRMemory searches:
  - Recent conversations (from conversations.txt)
  - Knowledge base files (error-patterns.md, relay-history.md, etc.)
  - Pattern matching
    ↓
Return answer with context
    ↓
TANDRmgr-lab includes context in response
```

---

## Example: Conversation Integration

### Before (No Memory)
```
User: "Why isn't Randy working?"
TANDRmgr-lab: "Unknown. Check logs."
```

### After (With Memory)
```
User: "Why isn't Randy working?"

TANDRmgr-lab:
1. POST to memory.ingest_conversation({
     "user": "Why isn't Randy working?",
     "assistant": "[Generating answer...]"
   })
2. Query memory [ASK:memory] with "Why isn't Randy working?"
3. Memory searches recent conversations + knowledge base
4. Memory returns: "Randy (9201) configured on Feb 15 but never deployed"
5. TANDRmgr-lab responds: "Randy was configured on Feb 15 but hasn't been deployed yet..."

Response: "Randy was configured on Feb 15 but the service hasn't been started. Would you like me to help deploy it?"
```

---

## Implementation Checklist

**For TANDRmgr-lab Integration:**

- [ ] Add curl library or HTTP client to chat.php
- [ ] Add `post_to_memory()` function after each response
- [ ] Update query handler to call `[ASK:memory]` for context
- [ ] Test with sample conversation
- [ ] Verify conversations.txt is being appended
- [ ] Test memory refresh after bulk ingestion

**Example Addition to chat.php:**

```php
// After generating response
$response = get_assistant_response($user_input);

// Log to TANDRMemory
$memory_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'user' => $user_input,
    'assistant' => substr($response, 0, 500) // First 500 chars
];

$ch = curl_init('http://127.0.0.1:8091/api/memory.php?action=ingest_conversation');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($memory_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_exec($ch);
curl_close($ch);

// Send response to user
echo $response;
```

---

## Data Flow Diagram

```
TANDRmgr-lab (chat.php)
    ↓
[User Input] → Generate Response
    ↓
[POST] → TANDRMemory.ingest_conversation()
    ↓
TANDRMemory (port 8091)
    ↓
[Append] → conversations.txt
    ↓
[Next Query]
    ↓
[GET] → /api/memory.php?action=query
    ↓
[Search] → conversations.txt + KB files
    ↓
[Return] → Answer with context
    ↓
TANDRmgr-lab includes context in response
    ↓
[Send] → User Response
```

---

## Performance Notes

**Conversation Ingestion:**
- Non-blocking POST (use background request if possible)
- Typical response time: < 10ms
- File append is atomic (safe for concurrent writes)

**Conversation Retrieval:**
- Parsing 1000 conversations: ~100ms
- Search filtering: ~50ms additional
- Recommend caching recent conversations in memory

**Memory Refresh:**
- Full refresh from 1000 conversations: ~200ms
- Run periodically (every 1000 conversations or hourly)
- Can run in background to avoid blocking queries

---

## Troubleshooting

### Conversations Not Being Stored
- Check: Is conversations.txt file writable?
- Check: Does adir/logs/ directory exist?
- Check: Is TANDRMemory bot running on port 8091?

### Memory Returning Incomplete Answers
- Run: `GET /api/memory.php?action=refresh_memory`
- Check: Is conversations.txt being updated?
- Check: Are KB files present and readable?

### High Latency
- Consider: Caching recent conversations in TANDRmgr-lab
- Consider: Running refresh_memory in background (cron)
- Consider: Archiving old conversations (> 30 days) to separate file

---

## Future Enhancements

1. **Automatic Summarization**
   - Summarize old conversations (> 7 days) to reduce file size
   - Store summaries in separate index file

2. **Conversation Tagging**
   - Auto-tag conversations by topic (service, error, query type)
   - Enable faster filtering

3. **Pattern Learning**
   - Analyze conversation patterns
   - Suggest improvements to prompts
   - Identify recurring issues

4. **LLM Integration**
   - Use Claude API to generate better answers
   - Learn from conversation feedback
   - Improve over time

---

**Status:** Ready for implementation
**Next:** Add integration code to TANDRmgr-lab chat.php

**324 Ports and paths are changed ref data**
