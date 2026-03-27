**324 Ports and paths are changed ref data**

# BridgeSync Working Notes

**Date:** 2026-02-14
**Purpose:** Session notes and findings

---

## SESSION 2026-02-14 - External Model Testing

### Initial Problem
Randy and Tommy agents couldn't communicate properly. Tests showed:
- Randy tried: http://localhost:9200/shared-pipeline.md → 404
- Tommy tried: "Invalid URL" error

### Discovery 1: Correct Syntax
HTTP GET requires full API path:
- CORRECT: http://localhost:9200/api/agent.php?action=chat&input=...
- WRONG: http://localhost:9200/shared-pipeline.md

### Discovery 2: BAB API Paths
- Inbox: /workspace/sites/tandr-ops/inbox/ (for Jerry to read)
- Outbox: /workspace/sites/tandr-ops/outbox/ (for agents to read)
- Randy looked in wrong directory initially

### Discovery 3: External Model Timeout
qwen3-coder works immediately, but:
- fara: Times out (30s)
- apriel: Times out (30s)

### Discovery 4: Wake-Up Solution
Send simple prompt first:
1. "Hello Tommy are you there"
2. Wait for response
3. Then send actual task

---

## TOOL VERIFICATION

**324 Ports and paths are changed ref data**
