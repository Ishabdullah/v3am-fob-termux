**324 Ports and paths are changed ref data**

# SOT-20260321 — OpenRouter + xAI Provider Integration
Date: 2026-03-21
Status: COMPLETE — applied to TEMPLATE-FOUR-CLEAN

---

## What Was Added

Two new LLM providers added to the agent template system:
- **OpenRouter** — routes to 100+ models via one API key (has free tier)
- **xAI (Grok)** — Grok 3, Grok 3 Mini, Grok 2 Vision

---

## Files Changed

### New provider PHP files
```
api/providers/openrouter.php   — openrouter_call(), openrouter_test(), openrouter_models()
api/providers/xai.php          — xai_call(), xai_test(), xai_models()
```

Both use OpenAI-compatible chat/completions format.
Both support vision via image_url content blocks.

### api/agent.php — 6 edits
1. `handleListProviders()` — added openrouter + xai entries
2. `handleSaveConfig()` — added 'openrouter', 'xai' to provider save loop
3. `handleTestProvider()` — added case 'openrouter' and case 'xai'
4. `callLLM()` switch — added case 'openrouter' → callOpenRouter(), case 'xai' → callXAI()
5. `callLLMWithImage()` switch — added case 'openrouter' → callOpenRouterWithImage(), case 'xai' → callXAIWithImage()
6. Added 4 helper functions after callAnthropicWithImage():
   - callOpenRouter()
   - callOpenRouterWithImage()
   - callXAI()
   - callXAIWithImage()

### config.json — added under llm block
```json
"openrouter": { "api_key": "", "model": "google/gemini-2.0-flash-exp:free" },
"xai":         { "api_key": "", "model": "grok-3-mini" }
```

---

## API Details

### OpenRouter
- Endpoint: https://openrouter.ai/api/v1/chat/completions
- Auth: Authorization: Bearer {key}
- Required headers: HTTP-Referer, X-Title (for rate limiting tier)
- Keys: https://openrouter.ai/keys
- Free models available — default is google/gemini-2.0-flash-exp:free

### xAI (Grok)
- Endpoint: https://api.x.ai/v1/chat/completions
- Auth: Authorization: Bearer {key}
- Keys: https://console.x.ai
- Vision model: grok-2-vision-1212 (auto-selected when image is passed and model lacks 'vision')
- Default text model: grok-3-mini

---

## Propagation Needed

This was applied to TEMPLATE-FOUR-CLEAN only.
Still needs to be applied to:
- [ ] TEMPLATE-JERRY-CLEAN
- [ ] TEMPLATE-TANDRSOCIAL-CLEAN
- [ ] All live deployed agents (Agent1, Agent2, Agent4, StartPower, Bot1, GGBot, etc.)

The UI settings tab (index.html) also needs provider dropdowns for openrouter + xai.
That work is tracked separately.

**324 Ports and paths are changed ref data**
