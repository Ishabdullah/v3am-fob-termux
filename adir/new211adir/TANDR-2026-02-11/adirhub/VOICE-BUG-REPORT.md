**324 Ports and paths are changed ref data**

# Voice Engine Bug Report — FOB System
**Date:** 2026-03-16
**Severity:** HIGH — affects all services except GGBOT
**Status:** Documented, not yet fixed

---

## Symptoms

1. Clicking the mic icon records speech and converts it to text (STT works)
2. Bot responses are NOT spoken out loud (TTS broken)
3. Mic icon does not change to a waiting/listening state when clicked
4. Affects ALL agents (Agent1-4) and bots (Bot1, ParserBot) and TANDRmgr-lab
5. GGBOT is NOT affected — its voice works correctly

---

## Root Cause

The templates (TEMPLATE-JERRY-CLEAN and TEMPLATE-TANDRSOCIAL-CLEAN) have an **incomplete voice engine**. STT (speech-to-text) is wired up, but TTS (text-to-speech) is never triggered when a bot response arrives.

### What's missing in the templates

**Problem 1: No call to speak after bot responds**
In `handleSend()`, when `data.success` is true:
```javascript
if (data.success) {
    addMessage('bot', data.data.message);  // Shows the message
    // ← NOTHING HERE calls voiceEngine to speak the response
}
```

**Problem 2: No `onBotResponse()` method**
The voiceEngine object has a `speak()` method defined but there is no `onBotResponse()` method to bridge the chat response to the TTS system.

**Problem 3: State machine incomplete**
`setState()` only handles:
- IDLE → regular mic icon
- RECORDING → red pulse icon
- PROCESSING → cyan spinner icon

Missing: **SPEAKING** state (icon should show TTS is active)

**Problem 4: State resets too early**
In `recognition.onend`:
```javascript
this.recognition.onend = () => {
    this.setState('PROCESSING');
    messageInput.value = this.transcript;
    setTimeout(() => {
        this.setState('IDLE');     // ← Goes back to IDLE before bot responds!
        handleSend();
    }, 100);
};
```

---

## Why GGBOT Works

GGBOT has a custom, complete voice implementation that was NOT from the template. Key differences:

**1. Calls `onBotResponse()` after chat response (around line 982):**
```javascript
if (voiceEngine && voiceEngine.state !== 'IDLE') {
    voiceEngine.onBotResponse(data.data.message);
}
```

**2. Has full `onBotResponse()` method (around line 1345):**
```javascript
onBotResponse(message) {
    if (!message || this.state === 'IDLE') return;
    this._speak(message);
}
```

**3. Has complete TTS with:**
- Markdown stripping before speaking
- Sentence chunking for Chrome compatibility (Chrome cuts off long utterances)
- Google voice preference selection
- `_onSpeakStart()` and `_onSpeakEnd()` state callbacks
- SPEAKING state in the state machine

---

## Fix Plan

To fix voice across all services, these changes are needed in every `index.html`:

### 1. Add `onBotResponse()` to voiceEngine
```javascript
onBotResponse(message) {
    if (!message || this.state === 'IDLE') return;
    this.speak(message);  // or this._speak(message)
}
```

### 2. Call it in handleSend() after addMessage
```javascript
if (data.success) {
    addMessage('bot', data.data.message);

    // Trigger TTS if voice is active
    if (voiceEngine && voiceEngine.state !== 'IDLE') {
        voiceEngine.onBotResponse(data.data.message);
    }
}
```

### 3. Add SPEAKING state to setState()
```javascript
case 'SPEAKING':
    // Change icon to show TTS is active (e.g., speaker icon or green pulse)
    break;
```

### 4. Keep PROCESSING state until bot responds
Don't reset to IDLE in `recognition.onend` — stay in PROCESSING until the response arrives and TTS finishes.

### 5. Implement proper speak() with sentence chunking
Use GGBOT's `_speak()` implementation as the reference. Key features:
- Strip markdown before speaking
- Chunk into sentences (Chrome TTS cuts off after ~200 chars)
- Use `speechSynthesis.speak()` with `SpeechSynthesisUtterance`
- Prefer Google voices when available
- Handle `onend` to transition back to IDLE

---

## Files That Need Fixing

### Templates (fix these first — new deployments will inherit the fix)
- `adirhub/TOOLS/Agent-Dropper-v2/templates/TEMPLATE-JERRY-CLEAN/index.html`
- `adirhub/TOOLS/KB-Maker-v2/templates/TEMPLATE-TANDRSOCIAL-CLEAN/index.html`

### Deployed Agents (Jerry template)
- `apps/Agent1/index.html`
- `apps/Agent2/agent/index.html`
- `apps/Agent3/index.html`
- `apps/Agent4/index.html`

### Deployed Bots (TANDRSocial template)
- `apps/Bot1/index.html`
- `adirhub/TOOLS/Parser/ParserBot/index.html`

### TANDRmgr-lab
- `apps/TANDRmgr-lab/index.html`

### Working Reference (DO NOT CHANGE)
- `adirhub/TOOLS/GGBOT/index.html` — has the complete working voice engine

---

## PHP Voice Module Note

There is a `VOICE-MODULE.php` at `adirhub/TOOLS/VOICE-MODULE.php` and copies at `Agent-Dropper-v2/api/voice.php` and `KB-Maker-v2/api/voice.php`. These provide a `VoiceResponder` JavaScript class via PHP. However, **none of the templates use this module** — they all have their own inline voiceEngine. The PHP module may be an older or alternative approach that was never integrated.

**324 Ports and paths are changed ref data**
