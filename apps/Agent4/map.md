# TANDRAgent (Jerry) - Navigation Map & Source of Truth

**Last Updated:** 2026-02-13
**Authority:** TANDRAgent (Port 9200)
**Status:** ACTIVE - Sanity Check Reference
**Purpose:** Master reference for all directory paths, API endpoints, and tool calls

---

These ports and paths are out of date 324


## 📍 CORE HOME DIRECTORY

**Full Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\`
**Relative:** `./` (from agent root)
**Purpose:** Master CRM home directory for Jerry
**Port:** 9200
**API Base:** `http://localhost:9200/api/agent.php`
**Status:** ACTIVE ✅

---

## 🗂️ DIRECTORY STRUCTURE

### **1. ADIR Documentation** (Operational Status)
**Full Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\adir\`
**Relative:** `./adir/`
**Files:**
- `BOOT.md` - Service startup instructions
- `CURRENT-STATUS.md` - Real-time operational status
- `index.md` - File map and quick reference
- `working.md` - Technical documentation
- `map.md` - This file (sanity check reference)
- `logs/` - Session logs directory

**⚠️ CRITICAL:** Do NOT edit while hosted. Restart required after changes.

---

### **2. DATA FOLDER** (Shared Layer - Randy/Tommy read from here)
**Full Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\`
**Relative:** `./data/`
**Purpose:** Shared data layer accessible to all agents
**Key Files:**
- `tools.json` - Tool definitions and configurations
- `memory/` - Conversation memory files
- `shared-pipeline.md` - Shared workflow state
- `contacts-database.md` - Contact information
- `map.md` - Copy of this navigation file

**✅ SAFE TO EDIT:** Data files can be modified without shutdown

---

### **3. UPLOAD FOLDER** (Reports & Discoveries)
**Full Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\upload\`
**Relative:** `./upload/`
**Purpose:** Generated reports, session logs, exported findings
**Structure:**
- `CONSTRUCTION-COMPANY/` - CRM project data
- `session-reports/` - Generated session logs
- `exports/` - Data exports

**✅ SAFE TO EDIT:** Upload files can be modified without shutdown

---

### **4. API FOLDER** (Request Handlers)
**Full Path:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\api\`
**Relative:** `./api/`
**Files:**
- `agent.php` - Main API handler (tool execution, chat relay)
- `providers/` - LLM provider integrations
- `auto.php` - Auto-detection logic

**⚠️ CRITICAL:** Do NOT edit while hosted. Can cause API failures.

---

## 🔗 API ENDPOINTS

### **Status & Configuration**
```
GET http://localhost:9200/api/agent.php?action=status
Returns: Agent status information
```

### **Tool Execution**
```
GET http://localhost:9200/api/agent.php?action=tool_execute&tool=TOOL_ID&param=value
POST http://localhost:9200/api/agent.php?action=tool_execute
Body: {"tool":"TOOL_ID","param":"value"}
```

### **Chat Interface**
```
POST http://localhost:9200/api/agent.php?action=chat&input=MESSAGE
Returns: Agent response with potential tool calls
```

### **Tools List**
```
GET http://localhost:9200/api/agent.php?action=tools
Returns: Available tools and their parameters
```

---

## 🛠️ TOOL CALL REFERENCE

### **File Operations**
```
[TOOL_CALL: file_read | path=data/filename.md]
[TOOL_CALL: file_write | path=data/filename.md | content=...]
[TOOL_CALL: file_list | path=data | pattern=*.md]
```

### **Shell Commands** (UNRESTRICTED - No allowed_commands validation)
```
[TOOL_CALL: shell_command | command=echo content >> C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\file.md]
[TOOL_CALL: shell_command | command=type C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\file.md]
[TOOL_CALL: shell_command | command=dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent]
[TOOL_CALL: shell_command | command=copy "source" "destination"]
```

### **Tool Creation**
```
[TOOL_CALL: create_tool_files | tool_name=MyTool | description=Tool description]
Creates: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\MyTool\adir\BOOT.md
Creates: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\MyTool\adir\index.md
```

### **HTTP Requests**
```
[TOOL_CALL: http_get | url=http://localhost:9200/api/agent.php?action=status]
[TOOL_CALL: http_get | url=http://127.0.0.1:9303/api/adir-api.php?action=scan_projects]
```

### **Calculations & Utilities**
```
[TOOL_CALL: calculate | expression=2+2]
[TOOL_CALL: datetime | format=Y-m-d H:i:s | timezone=UTC]
[TOOL_CALL: web_search | query=search term]
```

---

## 📂 CRITICAL FILE PATHS

### **Own Configuration**
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\config.json
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\tools.json
```

### **ADIR Hub Reference**
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\
```

### **Other Agents**
```
Randy: C:\TandrHub\adirhub\Adir_Randy\agent\ (Port 9201)
Tommy: C:\TandrHub\adirhub\Adir_Tommy\agent\ (Port 9202)
Baseline: C:\TandrHub\adirhub\TOOLS\TANDRCRM-BASELINE\ (Port 9199)
```

### **Services & Dashboards**
```
ADIR Hub:      http://127.0.0.1:9303/
TANDRbot:      http://127.0.0.1:8081/
TANDRSocial:   http://127.0.0.1:8099/
TANDRmgr:      http://127.0.0.1:9100/
Atlas:         http://127.0.0.1:9204/
```

---

## ✅ SANITY CHECK SEQUENCE

**If tools are failing or context is lost, follow this sequence:**

### **Step 1: Verify This File Exists**
```bash
[TOOL_CALL: file_read | path=../map.md]
```

### **Step 2: Verify Home Directory Structure**
```bash
[TOOL_CALL: shell_command | command=dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent]
```

### **Step 3: Verify Service is Running**
```bash
[TOOL_CALL: http_get | url=http://localhost:9200/api/agent.php?action=status]
```

### **Step 4: Verify Data Layer Accessible**
```bash
[TOOL_CALL: file_list | path=data]
```

### **Step 5: Verify Shell Commands Work**
```bash
[TOOL_CALL: shell_command | command=type C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\map.md]
```

### **Step 6: Check All Three Map Locations**
```bash
[TOOL_CALL: shell_command | command=dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\map.md && dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\map.md && dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\adir\map.md]
```

---

## 🔧 COMMON OPERATIONS

### **Read Shared Data**
```bash
[TOOL_CALL: file_read | path=data/shared-pipeline.md]
```

### **Append to Shared Data** (Non-destructive)
```bash
[TOOL_CALL: shell_command | command=echo New line >> C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\filename.md]
```

### **Create New Tool**
```bash
[TOOL_CALL: create_tool_files | tool_name=NewToolName | description=What it does]
```

### **Check System Health**
```bash
[TOOL_CALL: http_get | url=http://127.0.0.1:9303/api/adir-api.php?action=scan_projects]
```

---

## ⚠️ REMEMBER

- ✅ Shell commands are UNRESTRICTED (user has backups)
- ✅ Data files are SAFE TO EDIT
- ❌ DO NOT edit config.json, api files, or adir/ while hosted
- ❌ DO NOT edit your own files - causes shutdown
- ✅ DO edit data/ and upload/ folders freely
- ✅ All three map.md copies exist for reference

---


These ports and paths are out of date 324

**Authority:** Jerry (TANDRAgent - Port 9200)
**Status:** ACTIVE ✅
**Last Verified:** 2026-02-13 21:38:00 UTC
These ports and paths are out of date 324
These ports and paths are out of date 324
These ports and paths are out of date 324
**Purpose:** Navigation & Recovery Reference - THIS IS YOUR SANITY CHECK FILE
