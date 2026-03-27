**324 Ports and paths are changed ref data**

# SD WebUI — ADIR BOOT
Path: adirhub/TOOLS/SDWebUI/adir/BOOT.md
Tool: Stable Diffusion image generation via AUTOMATIC1111 WebUI

---

## STATUS
- Source: https://github.com/AUTOMATIC1111/stable-diffusion-webui
- License: AGPL-3.0 (free for internal/personal use, open-source distribution OK)
- Engine location: [SETUP_VAR: SD_WEBUI_PATH] — default D:\AIScreen
- Relay (FOB): ImageGen service on :9230 — wraps the SD API
- Direct API: http://127.0.0.1:7860 (when SD WebUI is running)

## START
SD WebUI is external — must be started separately or via Launcher2 (optional step).

  Manual:   D:\AIScreen\webui-user.bat
  PowerShell: D:\AIScreen\Start-Image.ps1
  Launcher2: auto-starts if SD_WEBUI_PATH is set and webui-user.bat is found

## CHECK IF RUNNING
  curl http://127.0.0.1:7860/sdapi/v1/sd-models

Returns JSON list of loaded models. If connection refused — SD WebUI is not running.

---

## API REFERENCE (port 7860)

### Generate image
  POST http://127.0.0.1:7860/sdapi/v1/txt2img
  Content-Type: application/json

  {
    "prompt": "your prompt here",
    "negative_prompt": "blurry, bad quality",
    "steps": 20,
    "width": 512,
    "height": 512,
    "cfg_scale": 7,
    "sampler_name": "Euler a"
  }

  Returns: { "images": ["<base64 PNG>"], "info": "..." }

### List models
  GET http://127.0.0.1:7860/sdapi/v1/sd-models

### Switch model
  POST http://127.0.0.1:7860/sdapi/v1/options
  { "sd_model_checkpoint": "model_name.safetensors" }

### Interrogate (image -> prompt)
  POST http://127.0.0.1:7860/sdapi/v1/interrogate
  { "image": "<base64>", "model": "clip" }

### Image to image
  POST http://127.0.0.1:7860/sdapi/v1/img2img
  (same as txt2img + "init_images": ["<base64>"], "denoising_strength": 0.7)

---

## FOB RELAY (recommended for agents)

Use ImageGen on :9230 instead of hitting 7860 directly.
ImageGen handles CORS, saves output to F:\4\ME\EYES, returns clean JSON.

  POST http://127.0.0.1:9230/api/generate.php
  {
    "prompt": "...",
    "negative_prompt": "...",
    "steps": 20,
    "width": 512,
    "height": 512
  }

  Returns: { "ok": true, "filename": "gen_1234.png", "imageUrl": "http://127.0.0.1:9230/eyes/gen_1234.png" }

  GET  http://127.0.0.1:9230/eyes/          — list all generated images
  GET  http://127.0.0.1:9230/eyes/gen_X.png — fetch specific image

---

## SETUP VARIABLES (for installer)
  SD_WEBUI_PATH   = D:\AIScreen           (where webui-user.bat lives)
  SD_OUTPUT_PATH  = F:\4\ME\EYES          (where generated images are saved)
  SD_PORT         = 7860                  (SD WebUI port, rarely changed)
  IMAGEGEN_PORT   = 9230                  (FOB relay port)

**324 Ports and paths are changed ref data**
