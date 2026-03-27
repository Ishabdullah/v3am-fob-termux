**324 Ports and paths are changed ref data**

# Vision Pipeline — Full Reference
**Updated:** 2026-03-19
**Purpose:** Let any agent (especially Agent Four) control the screen using the vision bridge REST API.

---

## Service Map

| Service | Port | Location | Role |
|---------|------|----------|------|
| Vision Bridge | 40001 | `F:\4\bridge_v1.py` | Screenshot, click, type, analyze |
| VisionBot (Vision) | 48882 | `F:\Vision\server.js` | Timestamped visual memory log |
| Agent Four | 11113 | `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\` | Agent you are messaging |
| Ollama (MoonDream) | 11434 | local | Vision LLM inside the bridge |

---

## How to Send Agent Four a Message via Browser

1. Open Chrome → navigate to `http://127.0.0.1:11113/`
2. Click the **Chat** tab
3. Click the input box at the bottom (placeholder: "Ask about this directory...")
4. Type your instruction and press **Enter** or click **Send**

**Important:** Do NOT press Escape before typing — it moves focus to the address bar.
If the input loses focus, click it again directly before typing.

Agent Four's chat API (bypasses browser UI):
```
GET http://127.0.0.1:11113/api/agent.php?action=chat&input=YOUR+MESSAGE+HERE
```

---

## Vision Bridge Endpoints — Port 40001

Base URL: `http://127.0.0.1:40001`

### GET /health
Check bridge is alive.
```bash
curl http://127.0.0.1:40001/health
# → {"status":"ready","bridge":"Sector 4","version":"1.2","port":40001,"screen":"1280x1024"}
```

### GET /screenshot
Returns a raw PNG of the full screen. Saved to `F:\4\logs\current.png`.
```bash
curl http://127.0.0.1:40001/screenshot -o screen.png
```

### POST /click
Click a screen coordinate.
```bash
curl -X POST http://127.0.0.1:40001/click \
  -H "Content-Type: application/json" \
  -d '{"x": 300, "y": 500}'
# → {"status":"ok","clicked":{"x":300,"y":500},"requested":{"x":300,"y":500}}
```

### POST /move
Move mouse without clicking.
```bash
curl -X POST http://127.0.0.1:40001/move \
  -H "Content-Type: application/json" \
  -d '{"x": 300, "y": 500}'
```

### POST /type
Type text at the current cursor position (keyboard simulation, char by char).
```bash
curl -X POST http://127.0.0.1:40001/type \
  -H "Content-Type: application/json" \
  -d '{"text": "hello world"}'
```

### POST /key
Press a key or key combo.
```bash
curl -X POST http://127.0.0.1:40001/key \
  -H "Content-Type: application/json" \
  -d '{"key": "return"}'

# Other useful keys:
# "escape", "ctrl+a", "ctrl+v", "ctrl+c", "tab", "f5", "delete"
```

### POST /paste
Click a target, then paste text via clipboard (ctrl+v). Faster than /type for long text.
**Warning:** Internally does ctrl+a before ctrl+v — this selects all text in the focused element first. For browser inputs this can select all page text instead of just the input. Use /type for browser inputs.
```bash
curl -X POST http://127.0.0.1:40001/paste \
  -H "Content-Type: application/json" \
  -d '{"text": "your message here", "x": 300, "y": 882}'
```

### GET /analyze
Screenshot → crop region → MoonDream vision LLM → returns description.
**Also auto-logs the observation to VisionBot at port 48882.**

**Simple prompt (URL-encoded):**
```bash
curl "http://127.0.0.1:40001/analyze?prompt=what+is+on+screen&crop=full"
```

**Complex prompt (base64-encoded) — RECOMMENDED for Agent Four:**
Use `prompt_b64=` with a base64-encoded prompt. This handles any characters safely and can be pasted directly into a browser address bar.

Generate the base64 in shell:
```bash
echo -n "Describe what you see on the left half of the screen in detail" | base64
# → RGVzY3JpYmUgd2hhdCB5b3Ugc2VlIG9uIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIHNjcmVlbiBpbiBkZXRhaWw=
```

Then call (also works pasted into browser address bar):
```
http://127.0.0.1:40001/analyze?prompt_b64=RGVzY3JpYmUgd2hhdCB5b3Ugc2VlIG9uIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIHNjcmVlbiBpbiBkZXRhaWw=&crop=left
```

**In Agent Four shell_command:**
```bash
curl -s "http://127.0.0.1:40001/analyze?prompt_b64=RGVzY3JpYmUgd2hhdCB5b3Ugc2VlIG9uIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIHNjcmVlbiBpbiBkZXRhaWw=&crop=left"
```

**crop= options:**

| Value | Region |
|-------|--------|
| `full` | Entire screen (1280×1024) |
| `top` | Top half (0,0 → 1280,512) |
| `bottom` | Bottom half (0,512 → 1280,1024) |
| `left` | Left half (0,0 → 640,1024) |
| `right` | Right half (640,0 → 1280,1024) |
| `tl` | Top-left quadrant |
| `tr` | Top-right quadrant |
| `bl` | Bottom-left quadrant |
| `br` | Bottom-right quadrant |

**Response:**
```json
{
  "status": "ok",
  "crop": "bl",
  "offset": {"x": 0, "y": 512},
  "crop_size": {"w": 640, "h": 512},
  "screen_size": {"w": 1280, "h": 1024},
  "snap": "C:\\FOB\\...\\Agent4\\adir\\stretch\\analyze_bl.png",
  "response": "[0.42, 0.63, 0.6, 0.74]",
  "visionbot": "...(VisionBot acknowledgement)..."
}
```

---

## CRITICAL: Coordinate Math

MoonDream returns bounding boxes as **normalized fractions** of the crop image, not pixel coordinates.

```
real_x = (normalized_x × crop_w) + offset_x
real_y = (normalized_y × crop_h) + offset_y
```

### Example
- Crop: `bl` → offset `(0, 512)`, crop_size `640×512`
- MoonDream response: `[0.42, 0.63, 0.6, 0.74]` → `[x1, y1, x2, y2]`
- Center in crop: `x = (0.42+0.6)/2 × 640 = 326`, `y = (0.63+0.74)/2 × 512 = 351`
- **Real screen coords:** `x = 326 + 0 = 326`, `y = 351 + 512 = 863`

For point responses (e.g. `[0.15, 0.72]`):
```
real_x = 0.15 × crop_w + offset_x
real_y = 0.72 × crop_h + offset_y
```

---

## How the VisionBot Auto-Log Works

Every `/analyze` call automatically POSTs to VisionBot:

```
POST http://127.0.0.1:48882/api/bot.php?action=chat
{"message": "[2026-03-19 15:53:00] CROP=full PROMPT=what is on screen RESULT=<moondream description>", "session_id": "bridge"}
```

VisionBot stores this in `F:\Vision\adir\logs\vision-log\YYYY-MM-DD.txt`.

To query visual history, chat with VisionBot:
- Open `http://127.0.0.1:48882/`
- Ask: "What was on screen at 15:50 today?"

---

## Agent Four Screen Control — Step by Step

To instruct Agent Four to perform a screen action, send it this kind of message via its browser chat at `http://127.0.0.1:11113/`:

### Step 1 — Look at the screen
```
Call GET http://127.0.0.1:40001/analyze?prompt=describe+what+you+see&crop=full
Read the "response" field — that is what MoonDream sees.
Read the "offset" field — you MUST add this to any coordinates MoonDream gives you.
```

### Step 2 — Find a UI element
```
Call GET http://127.0.0.1:40001/analyze?prompt=where+is+the+chat+input+box&crop=bl
MoonDream returns a bounding box [x1,y1,x2,y2] as fractions of the crop.
Convert to real coords: center_x = ((x1+x2)/2 × crop_w) + offset_x
                        center_y = ((y1+y2)/2 × crop_h) + offset_y
```

### Step 3 — Click the element
```
Call POST http://127.0.0.1:40001/click with {"x": real_x, "y": real_y}
```

### Step 4 — Type into it
```
Call POST http://127.0.0.1:40001/type with {"text": "your message"}
Call POST http://127.0.0.1:40001/key with {"key": "return"} to submit
```

### Step 5 — Verify
```
Call GET http://127.0.0.1:40001/analyze?prompt=did+the+message+send&crop=bl
Check MoonDream's description to confirm the action succeeded.
```

---

## Agent Four Saved Crop Files

Every `/analyze` call saves the crop image here for inspection:
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent4\adir\stretch\analyze_{crop}.png
```
e.g. `analyze_bl.png`, `analyze_full.png`, `analyze_tr.png`

---

## Screen Layout Reference (1280×1024)

```
┌──────────────────────────────────────────────────────────────┐
│  x=0                        x=640                    x=1280  │
│  ┌─────────────┬───────────────────────────────────────────┐ │ y=0
│  │   LEFT      │              RIGHT                        │ │
│  │  Agent Four │         Claude Code Terminal              │ │
│  │  port:11113 │                                           │ │
│  │             │                                           │ │
│  │  Chat input │                                           │ │
│  │  y ≈ 872    │                                           │ │
│  └─────────────┴───────────────────────────────────────────┘ │ y=1024
└──────────────────────────────────────────────────────────────┘

Known coordinates (approximate, verify with /analyze):
  Agent Four chat input:  x=290, y=872
  Agent Four Send button: x=617, y=872
  Browser tab bar:        y=20
  Windows taskbar:        y=960+
```

---

## Common Patterns for Agent Four

### "Look at the screen and tell me what's there"
```
Instruct Agent Four: Call GET http://127.0.0.1:40001/analyze?prompt=describe+everything+you+see&crop=full and report the response field.
```

### "Click on something you see"
```
Instruct Agent Four:
1. GET http://127.0.0.1:40001/analyze?prompt=where+is+X&crop=REGION
2. Calculate real coords from MoonDream output + offset
3. POST http://127.0.0.1:40001/click {"x": real_x, "y": real_y}
```

### "Type a message into a visible input"
```
Instruct Agent Four:
1. GET /analyze to find and click the input (DO NOT use /paste for browser inputs — use /type)
2. POST /click to focus the input
3. POST /type {"text": "your message"}
4. POST /key {"key": "return"}
```

### "What was on screen an hour ago?"
```
Open http://127.0.0.1:48882/ and ask VisionBot what was observed at that time.
VisionBot logs every /analyze call with a timestamp.
```

---

## Base64 Prompt Cheat Sheet

Pre-encoded prompts ready to paste into curl or a browser address bar:

| Prompt | prompt_b64 value |
|--------|-----------------|
| `describe what you see` | `ZGVzY3JpYmUgd2hhdCB5b3Ugc2Vl` |
| `where is the chat input box` | `d2hlcmUgaXMgdGhlIGNoYXQgaW5wdXQgYm94` |
| `where is the send button` | `d2hlcmUgaXMgdGhlIHNlbmQgYnV0dG9u` |
| `has a new message appeared in the chat` | `aGFzIGEgbmV3IG1lc3NhZ2UgYXBwZWFyZWQgaW4gdGhlIGNoYXQ=` |
| `what text is in the chat input box` | `d2hhdCB0ZXh0IGlzIGluIHRoZSBjaGF0IGlucHV0IGJveA==` |
| `describe the right side of the screen` | `ZGVzY3JpYmUgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHNjcmVlbg==` |
| `describe the left side of the screen` | `ZGVzY3JpYmUgdGhlIGxlZnQgc2lkZSBvZiB0aGUgc2NyZWVu` |
| `what browser tabs are open at the top` | `d2hhdCBicm93c2VyIHRhYnMgYXJlIG9wZW4gYXQgdGhlIHRvcA==` |
| `is there any text being typed in an input field` | `aXMgdGhlcmUgYW55IHRleHQgYmVpbmcgdHlwZWQgaW4gYW4gaW5wdXQgZmllbGQ=` |

**To generate your own:**
```bash
echo -n "your prompt here" | base64
```

**Full ready-to-use browser URLs:**
```
# Describe full screen
http://127.0.0.1:40001/analyze?prompt_b64=ZGVzY3JpYmUgd2hhdCB5b3Ugc2Vl&crop=full

# Find chat input (bottom-left)
http://127.0.0.1:40001/analyze?prompt_b64=d2hlcmUgaXMgdGhlIGNoYXQgaW5wdXQgYm94&crop=bl

# Has response appeared (right side)
http://127.0.0.1:40001/analyze?prompt_b64=aGFzIGEgbmV3IG1lc3NhZ2UgYXBwZWFyZWQgaW4gdGhlIGNoYXQ=&crop=right

# What tabs are open
http://127.0.0.1:40001/analyze?prompt_b64=d2hhdCBicm93c2VyIHRhYnMgYXJlIG9wZW4gYXQgdGhlIHRvcA==&crop=top
```

**All other bridge endpoints also work as browser GET URLs:**
```
http://127.0.0.1:40001/click?x=290&y=872
http://127.0.0.1:40001/type?text=hello+world
http://127.0.0.1:40001/key?key=return
http://127.0.0.1:40001/screenshot
http://127.0.0.1:40001/health
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| /analyze returns empty response | MoonDream found nothing / crop too dark | Try different crop region |
| Click lands in wrong place | Forgot to add offset to MoonDream coords | Always do: real = moondream_fraction × crop_size + offset |
| Type went to address bar | Escape key was pressed before typing | Don't press Escape; click input directly |
| /paste selects whole page | ctrl+a in browser selects page not input | Use /type instead of /paste for browser text inputs |
| Bridge not responding | Bridge process died | Restart: cd F:\4 && python bridge_v1.py |
| VisionBot 500 error on first call | Cold start / model loading | Retry — glm-5:cloud needs warm-up |

**324 Ports and paths are changed ref data**
