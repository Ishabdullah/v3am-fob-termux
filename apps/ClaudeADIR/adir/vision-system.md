**324 Ports and paths are changed ref data**

# VISION SYSTEM
**Directory:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\ClaudeADIR\adir\`
**Last Updated:** 2026-03-20
**Status:** Bridge LIVE | ImageGen built, needs SD WebUI

---

## Sector 4 Vision Bridge — Port 40001

**Script:** `F:\4\bridge_v1.py`
**Start:** `F:\4\start_bridge.bat` (has monitor loop) or `F:\4\launch_bridge.bat` (bare python)
**Restart bat:** `C:\FOB\VisionBridge.bat` (kills + restarts bridge AND memory bot :8091)

### Endpoints

| Endpoint | Method | What It Does |
|----------|--------|--------------|
| `/health` | GET | Status, screen size, version |
| `/screenshot` | GET | Full screen capture → returns PNG → saves to `F:\4\logs\current.png` |
| `/analyze?prompt=&crop=` | GET | Screenshot → crop → MoonDream (Ollama) → text → posts to VisionBot → saves crop to Agent4 stretch |
| `/click?x=&y=` | GET/POST | pyautogui click at x,y |
| `/move?x=&y=` | GET/POST | Move mouse to x,y |
| `/type?text=` | GET/POST | Type text via pyautogui |
| `/key?key=` | GET/POST | Press a key |
| `/paste?text=&x=&y=` | GET/POST | Clipboard paste (optional click-to-focus first) |

### Crop Regions (for /analyze)
`full` `top` `bottom` `left` `right` `tl` `tr` `bl` `br`

### Vision Chain
```
Agent → /analyze (40001)
  → mss screenshot
  → PIL crop to region
  → MoonDream via Ollama :11434
  → text description returned
  → observation POSTed to VisionBot :48882 (persistent log)
  → cropped PNG saved to apps\Agent4\adir\stretch\analyze_{crop}.png
```

### Notes
- PyAutoGUI failsafe DISABLED — coordinates clamped to screen bounds instead
- Screenshot saves to `F:\4\logs\current.png`
- Analyze crops save to `Agent4\adir\stretch\analyze_{crop}.png`
- MoonDream model must be pulled: `ollama pull moondream`
- `F:\4\ME\EYES\` = designated output folder (currently used by ImageGen, not bridge directly)

---

## ImageGen — Port 9230

**Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\ImageGen\`
**Start:** `START-ImageGen.bat`
**UI:** VeilEdge (cyberpunk React app at `http://127.0.0.1:9230/`)
**Engine:** SD WebUI (AUTOMATIC1111) at `http://127.0.0.1:7860` — must be running separately
**Output:** `F:\4\ME\EYES\` — all generated PNGs land here

### Endpoints

| Endpoint | Method | What It Does |
|----------|--------|--------------|
| `/api/generate.php` | GET | Ping / status check |
| `/api/generate.php` | POST | Generate image via SD WebUI, save to EYES |
| `/eyes/` | GET | List all generated images (JSON) |
| `/eyes/{filename}` | GET | Serve a generated image |
| `/health` | GET | Service health check |

### Generate Payload
```json
{
  "prompt": "neon cyberpunk robot, glowing circuits",
  "negative_prompt": "blurry, low quality",
  "steps": 20,
  "width": 512,
  "height": 512,
  "cfg_scale": 7,
  "sampler_name": "Euler a"
}
```
Only `prompt` is required. Returns:
```json
{
  "ok": true,
  "filename": "gen_20260320_174500.png",
  "path": "F:\\4\\ME\\EYES\\gen_20260320_174500.png",
  "imageUrl": "http://127.0.0.1:9230/eyes/gen_20260320_174500.png"
}
```

### Start SD WebUI
SD WebUI is at `C:\AI\sd-webui` (not currently running).
Start it via `D:\AIScreen\Start-Image.ps1` or `webui-user.bat` in the sd-webui folder.
API comes up on `:7860` — check with: `curl http://127.0.0.1:7860/sdapi/v1/sd-models`

### Salvaged From
- **CORS pattern:** `D:\AIScreen\V1\analyze.php`
- **UI:** `D:\01V3AM_aistart\veiledge\veiledge-offline-working\`
- **Capture loop reference:** `D:\AIScreen\V1\desktop_app.py` + `index.html`

---

## F:\4\ME\EYES — The Visual Sink

All generated images land in `F:\4\ME\EYES\`.
Served via ImageGen at `http://127.0.0.1:9230/eyes/`.
Agents can reference images by URL after generation.
Future: bridge can serve EYES images for display in agent iframes.

**324 Ports and paths are changed ref data**
