**324 Ports and paths are changed ref data**

# SYSTEM PATHS - T&R BUILDERS COMPLETE INVENTORY
**Last Updated:** 2026-02-12 20:35 UTC
**Status:** CONFIRMED & VERIFIED
**Authority:** Master CRM (Jerry, Port 9200)

---

## 📍 **ROOT DIRECTORY**
```
C:\TandrHub\
├─ Configuration master
├─ Shared resources
└─ All services rooted here
```

---

## 🔗 **PORT-TO-PATH MAPPING (VERIFIED)**

### **FIELD SERVICES**

#### PORT 8081 - TANDRbot (Field Assistant)
```
Root:      C:\TandrHub\apps\TANDRbot\
ADIR:      C:\TandrHub\apps\TANDRbot\adir\
API:       http://localhost:8081/
Data:      C:\TandrHub\apps\TANDRbot\data\
Knowledge: C:\TandrHub\apps\TANDRbot\data\knowledge\
```
**Purpose:** Customer-facing field assistant (FB Messenger + web chat)
**Type:** Isolated service
**Access:** Read from shared master CRM via API

---

#### PORT 8085 - TANDRmgr (API Orchestrator & Relay)
```
Root:      C:\TandrHub\apps\TANDRmgr\
ADIR:      C:\TandrHub\apps\TANDRmgr\adir\
API:       http://localhost:8085/
Config:    C:\TandrHub\apps\TANDRmgr\config.json
```
**Purpose:** Chat relay, help system, service orchestrator
**Type:** Isolated service
**Access:** Routes between all agents via HTTP

---

#### PORT 8099 - TANDRSocial (Social Media Content)
```
Root:      C:\TandrHub\apps\TANDRSocial\
ADIR:      C:\TandrHub\apps\TANDRSocial\adir\
API:       http://localhost:8099/
Data:      C:\TandrHub\apps\TANDRSocial\data\
Knowledge: C:\TandrHub\apps\TANDRSocial\data\social-knowledge\
```
**Purpose:** Employee-only social media content management
**Type:** Isolated service
**Access:** Read from shared master CRM for context

---

### **CRM AGENTS (SHARED DATA LAYER)**

#### PORT 9199 - TANDRAgent BASELINE (Protected Reference)
```
Root:      C:\TandrHub\Adir_BASELINE\agent\
ADIR:      C:\TandrHub\Adir_BASELINE\agent\adir\
API:       http://localhost:9199/
Data:      C:\TandrHub\Adir_BASELINE\agent\data\ (ISOLATED)
```
**Purpose:** Backup/reference copy (read-only, no modifications)
**Type:** Protected reference
**Access:** Self-contained, no writes

---

#### PORT 9200 - TANDRAgent JERRY (MASTER CRM) ⭐ SOURCE OF TRUTH
```
Root:       C:\TandrHub\apps\TANDRCRM\agent\
ADIR:       C:\TandrHub\apps\TANDRCRM\agent\adir\
API:        http://localhost:9200/ (THIS AGENT)
Data:       C:\TandrHub\apps\TANDRCRM\agent\data\ (SHARED)
Upload:     C:\TandrHub\apps\TANDRCRM\agent\upload\ (SHARED)
Config:     C:\TandrHub\apps\TANDRCRM\agent\config.json
```
**Purpose:** Master CRM, source of truth, branch coordinator
**Type:** Authoritative service with shared resources
**Access:** 
  - Reads from all agents
  - Writes to /data/ and /upload/ (aggregates findings)
  - Randy & Tommy read from here
  - TANDRbot queries this for validated pipeline data

---

#### PORT 9201 - TANDRAgent RANDY (Sales & Estimates)
```
Root:       C:\TandrHub\Adir_Randy\agent\
ADIR:       C:\TandrHub\Adir_Randy\agent\adir\
API:        http://localhost:9201/
Data:       C:\TandrHub\Adir_Randy\agent\data\ (SHARED - reads/writes)
Upload:     C:\TandrHub\Adir_Randy\agent\upload\ (SHARED - reads/writes)
Config:     C:\TandrHub\Adir_Randy\agent\config.json
```
**Purpose:** Sales pipeline, estimates, customer follow-up
**Type:** Branch agent with shared data layer
**Access:**
  - Reads from master CRM /data/ and /upload/
  - Writes findings to /data/ (synced to master)
  - Own isolated /adir/ for Randy-specific work
  - Tommy can read shared findings

---

#### PORT 9202 - TANDRAgent TOMMY (Operations)
```
Root:       C:\TandrHub\Adir_Tommy\agent\
ADIR:       C:\TandrHub\Adir_Tommy\agent\adir\
API:        http://localhost:9202/
Data:       C:\TandrHub\Adir_Tommy\agent\data\ (SHARED - reads/writes)
Upload:     C:\TandrHub\Adir_Tommy\agent\upload\ (SHARED - reads/writes)
Config:     C:\TandrHub\Adir_Tommy\agent\config.json
```
**Purpose:** Project scheduling, crew coordination, equipment management
**Type:** Branch agent with shared data layer
**Access:**
  - Reads from master CRM /data/ and /upload/
  - Writes findings to /data/ (synced to master)
  - Own isolated /adir/ for Tommy-specific work
  - Randy can read shared findings

---

### **SYSTEM SERVICES**

#### PORT 9303 - ADIR Hub (Central Registry & Dashboard)
```
Root:      C:\TandrHub\adirhub\
ADIR:      C:\TandrHub\adirhub\adir\
API:       http://localhost:9303/api/adir-api.php
Registry:  C:\TandrHub\adirhub\adir\REGISTRY.md
```
**Purpose:** Central service registry, project scanning, monitoring dashboard
**Type:** Centralized coordination layer
**Access:** Read/write to all /adir/ directories for status updates

---

#### PORT 11434 - Ollama (Local LLM)
```
Endpoint:  http://127.0.0.1:11434/
Model:     gemma3:1b (resident)
Purpose:   Fallback LLM provider
Type:      External service (no local files)
```
**Purpose:** LLM fallback (if Anthropic unavailable)
**Type:** External service
**Access:** HTTP-only, no file access needed

---

## 🔄 **DATA SHARING ARCHITECTURE**

### **Shared Layer (All CRM Agents Read/Write)**
```
C:\TandrHub\apps\TANDRCRM\agent\data\
├─ shared-pipeline.md        (Project status across all agents)
├─ contacts-database.md      (Client & vendor contacts)
├─ sales-pipeline-update.md  (Randy's findings)
├─ operations-schedule.md    (Tommy's findings)
└─ temp files (for inter-agent communication)

C:\TandrHub\apps\TANDRCRM\agent\upload\
├─ CURRENT-STATUS.md        (Master CRM status log)
├─ adir-session-log-auto-*.md (Session tracking)
├─ crm-template-analysis.md  (Data structure docs)
└─ temporal.md               (Timezone mapping)
```

### **Isolated Layers (Each Agent's Own Work)**
```
C:\TandrHub\Adir_Randy\agent\adir\
├─ BOOT.md
├─ CURRENT-STATUS.md         (Randy's personal work log)
├─ index.md
└─ [Randy-specific work files

**324 Ports and paths are changed ref data**
