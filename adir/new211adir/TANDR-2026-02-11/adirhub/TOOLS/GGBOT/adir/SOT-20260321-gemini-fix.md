**324 Ports and paths are changed ref data**

# SOT-20260321 — GGBot Gemini Fix
Date: 2026-03-21
Status: COMPLETE

---

## What Was Broken

GGBot stopped responding to chat. Root cause chain:

1. config.json had `llm.provider = "ollama"` with model `qwen3-vl:235b-cloud`
   — this model does not exist in local Ollama, every call failed
2. Fallback was `anthropic` but `anthropic.api_key` was empty string ""
   — the dashboard masked and cleared the real key at some point
3. `gemini` had a working API key in config BUT:
   — no GeminiProvider class existed in api/providers/
   — no gemini case in getLLMResponse() or checkLLMStatus()
4. Result: both primary and fallback fail silently, every chat returns error

---

## What Was Fixed

1. Created `api/providers/gemini.php` — GeminiProvider class
   - Matches OOP interface of AnthropicProvider / OllamaProvider
   - Methods: chat(), isAvailable(), getModelInfo()
   - Uses Gemini REST API (system_instruction + contents format)
   - Gemini role mapping: "assistant" → "model" (Gemini's name for it)

2. api/bot.php changes:
   - Added `require_once 'providers/gemini.php'`
   - Added `gemini` case to getLLMResponse() with its own fallback chain
   - Added `gemini` case to checkLLMStatus()

3. config.json: switched `llm.provider` from `ollama` to `gemini`
   - Gemini key: YOUR_GEMINI_API_KEY (working)
   - Model: gemini-3-flash-preview

---

## Active Provider After Fix

provider = gemini → gemini-3-flash-preview
fallback = anthropic (will need key added to re-enable)

---

## Note for KB-Maker Template

GGBot is the reference deployment and template source for KB-Maker-v2.
After confirming GGBot is working, the TEMPLATE-TANDRSOCIAL-CLEAN should
receive the same GeminiProvider class and bot.php additions so future bots
deploy with gemini support from day one.

**324 Ports and paths are changed ref data**
