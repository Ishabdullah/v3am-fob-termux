**324 Ports and paths are changed ref data**

# BridgeSync - System Tour

**Date:** 2026-02-14
**Purpose:** Overview of inter-agent communication system

---

## What is BridgeSync?

BridgeSync is the communication protocol between:
- **Jerry** (TANDRAgent) - Port 9200, master operations
- **Randy** (Adir_Randy) - Port 9201, sales agent
- **Tommy** (Adir_Tommy) - Port 9202, execution agent

---

## Two Communication Paths

### Path 1: HTTP API
- Use: http://localhost:9200/api/agent.php?action=chat&input=...
- Pros: Direct
- Cons: Randy/Tommy default to wrong endpoint

### Path 2: BAB API (Preferred)
- Use buildingabot.com file system
- Pros: Reliable, works across VMs
- Cons: Requires exact paths

---

## BAB API Directories

**324 Ports and paths are changed ref data**
