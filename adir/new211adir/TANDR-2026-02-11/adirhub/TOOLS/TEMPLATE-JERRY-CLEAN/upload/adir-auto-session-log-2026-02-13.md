**324 Ports and paths are changed ref data**

# AUTO MODE SESSION LOG - 2026-02-13
**Updated:** 2026-02-13 06:15 UTC
**Status:** MODEL TRANSITION TEST 🔄

## 🤖 LLM TRANSITION: QWEN & FARA
- **TANDRbot (8081):** Jerry swapped model to `qwen2.5:7b`. Confirming status now. This should resolve the previous "model unavailable" error.
- **TANDRAgent (9200):** Preparing to test transition to `maternion/fara:latest` via Ollama for autonomous/overnight runs. 
- **Goal:** VRAM efficiency and API cost reduction.

## ✅ KNOWLEDGE RE-DEPLOYMENT
- **Action:** Re-pushed `models.md` to TANDRbot.
- **Purpose:** Provide the bot with the "Base Model ID" (TR-2026-ALPHA) and "Original Model Number" (TANDR-V2-CORE).
- **Verification:** Polling TANDRbot knowledge list in 60 seconds.

## 🔍 SYSTEM PATHS & CONFIG
- **Config Audit:** Reading `config.json` to identify the correct parameters for the `maternion/fara:latest` swap.
- **Randy/Tommy Prep:** Documentation ready to clone this configuration to ports 9201 and 9202 if the test is successful.

## 📋 NEXT STEPS
- Confirm TANDRbot is responding with the new Qwen brain.
- Execute the model swap for TANDRAgent and monitor for "hallucination" vs "performance" deltas.

**324 Ports and paths are changed ref data**
