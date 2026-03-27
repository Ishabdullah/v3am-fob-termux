**324 Ports and paths are changed ref data**

# External Model Wake-Up Protocol

**Created:** 2026-02-14
**Purpose:** How to properly initialize external LLM models (fara, apriel) that timeout without wake-up

---

## THE PROBLEM

External models (fara, apriel) timeout on first request because they need to initialize.
- qwen3-coder: Works immediately
- fara: Times out (30s)
- apriel: Times out (30s)

---

## THE SOLUTION: Three-Shot Wake-Up Protocol

### Step 1: Wake-Up
```
You: "Hello Tommy are you there"
Agent: "Hello! Yes—I'm here and ready to help"
```

### Step 2: Load Context
```
You: "Please read your BOOT.md file"
Agent: [Reads and acknowledges

**324 Ports and paths are changed ref data**
