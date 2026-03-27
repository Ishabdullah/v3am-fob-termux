**324 Ports and paths are changed ref data**

# API Instructions: GET Requests to TANDRSocial & TANDRbot

**Created:** 2026-02-25
**Purpose:** Simple GET request guide for agents to communicate with services
**Format:** Standard URL query parameters (no complex escaping issues)
**Also Supports:** POST JSON for structured multi-turn conversations

---

## 🎯 Quick Reference

### TANDRSocial (Port 8099) - Social Media Content
```
GET http://localhost:8099/api/bot.php?action=chat&input=YOUR_REQUEST_HERE
```

### TANDRbot (Port 8081) - Customer Chat Bot
```
GET http://localhost:8081/api/bot.php?action=chat&input=YOUR_REQUEST_HERE
```

---

## 📋 Parameter Guide

### Required Parameters

| Parameter | Value | Example |
|-----------|-------|---------|
| `action` | Always: `chat` | `action=chat` |
| `input` | Your request (URL encoded) | `input=Draft+a+hiring+post` |

### URL Encoding Rules

**Replace spaces with:** `+` or `%20`

**Examples:**
- `Draft a post` → `Draft+a+post` or `Draft%20a%20post`
- `Include #hashtags` → `Include+%23hashtags`
- `Tips & tricks` → `Tips+%26+tricks`

### Special Characters

| Character | Encoded | Example |
|-----------|---------|---------|
| Space | `+` or `%20` | `hello+world` |
| `#` | `%23` | `%23hiring` |
| `&` | `%26` | `tips+%26+tricks` |
| `?` | `%3F` | `what%3F` |
| `:` | `%3A` | `time%3A5pm` |
| `/` | `%2F` | `path%2Fto%2Ffile` |
| `=` | `%3D` | `key%3Dvalue` |

---

## 🔧 Example Requests

### TANDRSocial Examples

**1. Generate a hiring post**
```
GET http://localhost:8099/api/bot.php?action=chat&input=Draft+a+hiring+post+for+carpenter+position
```

**2. Generate a social media post**
```
GET http://localhost:8099/api/bot.php?action=chat&input=Create+a+Facebook+post+about+kitchen+remodeling+tips
```

**3. Request with hashtags**
```
GET http://localhost:8099/api/bot.php?action=chat&input=Draft+post+about+summer+specials+include+%23summer+%23savings
```

**4. Complex request**
```
GET http://localhost:8099/api/bot.php?action=chat&input=Draft+professional+hiring+post+for+carpenter.+Include+%23CarpentryJobs+%23Hiring.+Add+3+posting+tips.
```

### TANDRbot Examples

**1. Simple customer question**
```
GET http://localhost:8081/api/bot.php?action=chat&input=What+services+do+you+offer
```

**2. Project inquiry**
```
GET http://localhost:8081/api/bot.php?action=chat&input=How+long+does+a+deck+remodel+take
```

**3. Pricing question**
```
GET http://localhost:8081/api/bot.php?action=chat&input=What+is+the+cost+of+a+basic+deck+installation
```

---

## 💻 Using with curl (Bash)

### Basic Format
```bash
curl -s "http://localhost:PORT/api/bot.php?action=chat&input=YOUR_REQUEST"
```

### TANDRSocial with curl
```bash
curl -s "http://localhost:8099/api/bot.php?action=chat&input=Draft+hiring+post"
```

### TANDRbot with curl
```bash
curl -s "http://localhost:8081/api/bot.php?action=chat&input=What+services+do+you+offer"
```

### With output parsing
```bash
# Get full response
curl -s "http://localhost:8099/api/bot.php?action=chat&input=Draft+hiring+post" | head -200

# Extract just the message
curl -s "http://localhost:8099/api/bot.php?action=chat&input=Draft+hiring+post" | grep -o '"message":"[^"]*"'
```

---

## 🤖 Using from Jerry Agent

### Format for Jerry
Jerry can send GET requests using its http_get tool:

```
http://localhost:8099/api/bot.php?action=chat&input=Draft+a+hiring+post+for+carpenter+position
```

### Example Command for Jerry
```
Ask+the+TANDRSocial+API+to+draft+a+hiring+post+using+GET+request+to+localhost:8099
```

This will trigger Jerry's HTTP_GET tool to call TANDRSocial directly.

---

## ✅ Success Indicators

When the request works, you'll get a JSON response:

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

## ❌ Common Issues & Fixes

### Issue: "Invalid request" Error
**Problem:** Missing or wrong parameters
**Fix:** Ensure you have both `action=chat` AND `input=YOUR_MESSAGE`

**Wrong:**
```
http://localhost:8099/api/bot.php?action=chat
http://localhost:8099/api/bot.php?input=hello
```

**Correct:**
```
http://localhost:8099/api/bot.php?action=chat&input=hello
```

### Issue: Special characters not working
**Problem:** Spaces, hashtags, ampersands not encoded
**Fix:** Use URL encoding

**Wrong:**
```
input=Draft post with #hashtags
```

**Correct:**
```
input=Draft+post+with+%23hashtags
```

### Issue: Can't access service
**Problem:** Port wrong or service not running
**Fix:** Verify service is running on correct port

```bash
# Check if service is responding
curl -s http://localhost:8099/api/bot.php?action=chat&input=test

# Or check port is listening
netstat -ano | findstr :8099
```

---

## 🎯 Best Practices for Agents

### 1. Always use action=chat
```
✅ http://localhost:8099/api/bot.php?action=chat&input=...
❌ http://localhost:8099/api/bot.php?input=...
```

### 2. URL encode spaces as +
```
✅ http://localhost:8099/api/bot.php?action=chat&input=Draft+hiring+post
❌ http://localhost:8099/api/bot.php?action=chat&input=Draft hiring post
```

### 3. URL encode special characters
```
✅ input=Include+%23hashtags
❌ input=Include+#hashtags
```

### 4. Keep requests simple
```
✅ input=Draft+a+hiring+post
✅ input=Create+Facebook+post+about+remodeling
✅ input=What+services+do+you+offer

❌ input=Draft&a&complicated&request&with&lots&of&ampersands
❌ input=Very+very+very+long+request+that+tries+to+do+everything+at+once
```

### 5. Test one service at a time
```
# First test TANDRSocial
curl -s "http://localhost:8099/api/bot.php?action=chat&input=test"

# Then test TANDRbot
curl -s "http://localhost:8081/api/bot.php?action=chat&input=test"
```

---

## 📝 Request Examples (Copy-Paste Ready)

### TANDRSocial - Hiring Post
```
http://localhost:8099/api/bot.php?action=chat&input=Draft+hiring+post+for+carpenter+position+include+hashtags+and+posting+tips
```

### TANDRSocial - Social Media Content
```
http://localhost:8099/api/bot.php?action=chat&input=Create+Facebook+post+about+kitchen+remodeling+tips+and+trends
```

### TANDRSocial - Marketing Content
```
http://localhost:8099/api/bot.php?action=chat&input=Draft+email+campaign+content+for+spring+home+improvement+promotions
```

### TANDRbot - Service Information
```
http://localhost:8081/api/bot.php?action=chat&input=What+services+does+the+company+offer
```

### TANDRbot - Pricing Inquiry
```
http://localhost:8081/api/bot.php?action=chat&input=How+much+does+a+deck+installation+cost
```

### TANDRbot - Project Timeline
```
http://localhost:8081/api/bot.php?action=chat&input=How+long+does+a+home+renovation+project+take
```

---

## 🔗 Integration Pattern

### For Jerry Agent (Recommended)
```
1. Jerry receives request: "Ask TANDRSocial to draft a hiring post"
2. Jerry constructs GET URL: http://localhost:8099/api/bot.php?action=chat&input=...
3. Jerry sends HTTP_GET request
4. Jerry receives JSON response
5. Jerry parses response and reports back
```

### Command Format for Jerry
```
Send+GET+request+to+TANDRSocial+port+8099+to+draft+hiring+post+for+carpenter
```

---

## ✨ Why GET Requests Work Better

✅ **No complex escaping** - URL parameters are standard
✅ **Easy to debug** - See the full URL in browser
✅ **No shell conflicts** - Ampersands handled by URL parser
✅ **Readable for agents** - Clear parameter structure
✅ **Works everywhere** - curl, browsers, APIs, external tools
✅ **Manual testing easy** - Just paste URL in browser
✅ **External AI compatible** - Any system can make GET requests

---

## 📈 Also Supports POST JSON

For advanced multi-turn conversations with history, use POST JSON:

```bash
curl -X POST "http://localhost:8099/api/bot.php?action=chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Draft a post", "conversation_id":"conv_123", "history":[]}'
```

But for simple single requests, GET is cleaner and easier.

---

## 🚀 Next Steps

1. **Test TANDRSocial:** Copy a hiring post request above
2. **Test TANDRbot:** Copy a service question request above
3. **Instruct Jerry:** Use these GET request patterns
4. **Verify responses:** Check that JSON comes back valid

---

## 📞 Quick Checklist

- [ ] Port 8099 (TANDRSocial) is accessible
- [ ] Port 8081 (TANDRbot) is accessible
- [ ] Action parameter is always `chat`
- [ ] Input parameter is URL encoded (spaces = +)
- [ ] Special characters are encoded (%23 for #, etc.)
- [ ] Jerry can make HTTP_GET requests
- [ ] Responses are valid JSON

---

**Document Version:** 1.0
**Last Updated:** 2026-02-25
**Status:** READY FOR AGENT USE
**API Type:** REST GET with URL parameters (also supports POST JSON)

**324 Ports and paths are changed ref data**
