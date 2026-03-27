**324 Ports and paths are changed ref data**

# API Instructions: POST Requests to TANDRSocial & TANDRbot

**Created:** 2026-02-25
**Updated:** 2026-02-25 (CORRECTED from GET to POST)
**Purpose:** Correct POST request guide for agents to communicate with services
**Format:** JSON body via POST (clean, no special URL encoding needed)

---

## 🎯 Quick Reference

### TANDRSocial (Port 8099) - Social Media Content
```
POST http://localhost:8099/api/bot.php?action=chat
Content-Type: application/json

{
  "message": "Draft a hiring post for carpenter position"
}
```

### TANDRbot (Port 8081) - Customer Chat Bot
```
POST http://localhost:8081/api/bot.php?action=chat
Content-Type: application/json

{
  "message": "What services do you offer"
}
```

---

## 📋 Parameter Guide

### Required Parameters

| Parameter | Type | Location | Example |
|-----------|------|----------|---------|
| `action` | String | URL parameter | `?action=chat` |
| `message` | String | JSON body | `{"message": "Draft a post"}` |

### Optional Parameters (JSON Body)

| Parameter | Type | Purpose | Example |
|-----------|------|---------|---------|
| `conversation_id` | String | Track multi-turn chats | `"conv_abc123"` |
| `history` | Array | Previous messages | `[{"role":"user","content":"..."}]` |

### JSON Body Format

```json
{
  "message": "Your request here with #hashtags and special & characters!",
  "conversation_id": "optional_conv_id",
  "history": []
}
```

**Required:** `message` field only
**Optional:** `conversation_id`, `history` (for continuing conversations)

---

## ✅ No Special Escaping Needed!

**Advantage of JSON over URL parameters:**
- ✅ `#hashtags` work directly
- ✅ `&` characters work directly
- ✅ `"quotes"` can be escaped normally
- ✅ Spaces don't need encoding
- ✅ No URL encoding complexity

**Examples that work directly:**

```json
{
  "message": "Draft post about kitchen remodeling & deck installation #remodel"
}
```

```json
{
  "message": "Include these hashtags: #summer #savings & #2026"
}
```

```json
{
  "message": "Ask: What's the cost? Why choose us? Tips & tricks?"
}
```

---

## 💻 Using with curl

### Basic Format
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Your request here"}'
```

### TANDRSocial Example - Hiring Post
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Draft a hiring post for carpenter position with hashtags and tips"}'
```

### TANDRbot Example - Customer Question
```bash
curl -X POST "http://localhost:8081/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"What services does the company offer?"}'
```

### With Multi-turn Conversation
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message":"Draft a post about summer specials",
    "conversation_id":"conv_12345",
    "history":[
      {"role":"user","content":"What topics should we post about?"},
      {"role":"assistant","content":"Summer promotions are popular..."}
    ]
  }'
```

### Parsing JSON Response
```bash
# Get full response
curl -s -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Draft hiring post"}' | head -100

# Extract just the message using jq
curl -s -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Draft hiring post"}' | jq '.data.message'
```

---

## 🤖 Using from Jerry Agent

### Basic Request Format
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"TASK_HERE"}'
```

### Example Command for Jerry
```
Execute API request to TANDRSocial: POST to localhost:8099/api/bot.php?action=chat with JSON message "Draft a hiring post for carpenter position"
```

### Response Format
Jerry will receive JSON:
```json
{
  "success": true,
  "data": {
    "message": "Here is your hiring post...",
    "model": "minimax-m2.5:cloud",
    "provider": "ollama",
    "conversation_id": "conv_...",
    "timestamp": "2026-02-25T..."
  }
}
```

---

## ✅ Success Indicators

When the request works, you'll get a 200 response with JSON:

```json
{
  "success": true,
  "data": {
    "message": "Your response here...",
    "model": "minimax-m2.5:cloud",
    "provider": "ollama",
    "conversation_id": "conv_12345",
    "timestamp": "2026-02-25T16:35:00+00:00"
  }
}
```

---

## ❌ Common Issues & Fixes

### Issue: 400 Bad Request - "Invalid request. Please provide a message."

**Problem:** Missing or invalid JSON body

**Wrong:**
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat&input=hello"
# ❌ Uses URL parameter "input" instead of JSON body "message"

curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -d '{"input":"hello"}'
# ❌ JSON has "input" field, API expects "message" field
```

**Correct:**
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'
# ✅ Proper JSON with "message" field
```

### Issue: 429 Rate Limited

**Problem:** Too many requests too quickly
**Fix:** Wait a moment before next request (default: 30 requests/minute)

### Issue: Can't access service

**Problem:** Port wrong or service not running
**Fix:** Verify service is running on correct port

```bash
# Check if service is responding
curl -s "http://localhost:8099/api/bot.php?action=status" | jq .

# Or check port is listening
netstat -ano | findstr :8099
```

---

## 🎯 Best Practices for Agents

### 1. Always use POST, not GET
```bash
✅ POST http://localhost:8099/api/bot.php?action=chat
❌ GET http://localhost:8099/api/bot.php?action=chat&input=...
```

### 2. Always include Content-Type header
```bash
✅ curl -H "Content-Type: application/json"
❌ curl -d '{"message":"..."}'  # Missing header
```

### 3. Always use "message" field in JSON
```bash
✅ {"message":"Your request"}
❌ {"input":"Your request"}
❌ {"text":"Your request"}
```

### 4. Keep requests simple
```bash
✅ {"message":"Draft a hiring post"}
✅ {"message":"What services do you offer?"}
❌ {"message":"Draft&execute&post&to&Facebook&with&analytics"}
```

### 5. Test one service at a time
```bash
# First test TANDRSocial
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'

# Then test TANDRbot
curl -X POST "http://localhost:8081/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

### 6. Handle responses properly
```bash
# Check success flag
if response.success == true:
  process response.data.message
else:
  log error: response.error
```

---

## 📝 Copy-Paste Ready Requests

### TANDRSocial - Hiring Post
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Draft a hiring post for carpenter position including hashtags and posting tips"}'
```

### TANDRSocial - Social Media Content
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Create a Facebook post about kitchen remodeling tips and trends"}'
```

### TANDRSocial - Marketing Content
```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Draft email campaign content for spring home improvement promotions"}'
```

### TANDRbot - Service Information
```bash
curl -X POST "http://localhost:8081/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"What services does the company offer?"}'
```

### TANDRbot - Pricing Inquiry
```bash
curl -X POST "http://localhost:8081/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"How much does a deck installation cost?"}'
```

### TANDRbot - Project Timeline
```bash
curl -X POST "http://localhost:8081/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"How long does a home renovation project take?"}'
```

---

## 🔗 Integration Pattern

### For Jerry Agent
```
1. Jerry receives request: "Ask TANDRSocial to draft a hiring post"
2. Jerry constructs POST request: POST to localhost:8099/api/bot.php?action=chat
3. Jerry sends with JSON body: {"message":"Draft hiring post for carpenter"}
4. Jerry receives JSON response
5. Jerry parses response.data.message and reports back
```

### Command Format for Jerry
```
Send POST request to TANDRSocial port 8099 with JSON message "Draft hiring post for carpenter position"
```

---

## ✨ Why POST with JSON Works Better

✅ **No URL encoding** - Spaces, hashtags, special chars work directly
✅ **Cleaner format** - JSON is readable and standard
✅ **Less escaping** - Only need to escape quotes in JSON strings
✅ **Better for complex data** - Easy to include arrays, nested objects
✅ **More secure** - Harder to accidentally inject special chars
✅ **Works everywhere** - curl, browsers, APIs, all support POST JSON

---

## 🚀 Next Steps

1. **Test TANDRSocial:** Copy a hiring post request above
2. **Test TANDRbot:** Copy a service question request above
3. **Instruct Jerry:** Use these POST request patterns
4. **Verify responses:** Check that JSON comes back valid

---

## 📞 Quick Checklist

- [ ] Port 8099 (TANDRSocial) is accessible
- [ ] Port 8081 (TANDRbot) is accessible
- [ ] Action parameter is always `?action=chat`
- [ ] JSON body has `"message"` field (not "input")
- [ ] Content-Type header is `application/json`
- [ ] Message text can include any characters (#, &, !, etc.)
- [ ] Jerry can make POST requests
- [ ] Responses are valid JSON

---

**Document Version:** 1.0 (CORRECTED FROM GET TO POST)
**Last Updated:** 2026-02-25
**Status:** READY FOR AGENT USE
**API Type:** REST POST with JSON body
**Error Messages:** 400 = bad JSON, 429 = rate limited, 500 = server error

**324 Ports and paths are changed ref data**
