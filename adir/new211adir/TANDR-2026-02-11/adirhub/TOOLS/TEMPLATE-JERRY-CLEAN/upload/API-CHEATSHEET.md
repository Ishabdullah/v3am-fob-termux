**324 Ports and paths are changed ref data**

# buildingabot API Cheatsheet

**Reference:** Full 3AI Desktop REST API documentation
**Base URL:** https://buildingabot.com/wp-json/3ai/v1/
**Authentication:** HTTP Basic Auth

---

## Authentication

**Header:** `Authorization: Basic BASE64(username:app_password)`

**In cURL:**
```bash
curl -u "username:app_password" https://buildingabot.com/wp-json/3ai/v1/mkdir
```

---

## Endpoints

### 1. CREATE DIRECTORY - POST /mkdir

**Purpose:** Create folder structure (parents auto-created)

**Request:**
```json
{
  "path": "/workspace/sites/tandr-ops/inbox/"
}
```

**cURL Example:**
```bash
curl -u "user:pass" -X POST \
  -H "Content-Type: application/json" \
  -d '{"path":"/workspace/sites/tandr-ops/inbox/"}' \
  https://buildingabot.com/wp-json/3ai/v1/mkdir
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Directory created",
  "path": "/workspace/sites/tandr-ops/inbox/"
}
```

---

### 2. WRITE FILE - POST /files

**Purpose:** Create or update a file

**Request:**
```json
{
  "path": "/workspace/sites/tandr-ops/inbox/randy-estimate-001.md",
  "content": "# Estimate for Project XYZ\n\n**Amount:** $5,000\n**Status:** Ready for approval"
}
```

**cURL Example:**
```bash
curl -u "user:pass" -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/workspace/sites/tandr-ops/inbox/randy-estimate-001.md",
    "content": "# Estimate\n\n**Amount:** $5,000"
  }' \
  https://buildingabot.com/wp-json/3ai/v1/files
```

**Response (Success):**
```json
{
  "success": true,
  "message": "File created/updated",
  "path": "/workspace/sites/tandr-ops/inbox/randy-estimate-001.md"
}
```

---

### 3. LIST FILES - GET /files

**Purpose:** List all files in a directory

**Request:**
```
GET /files?path=/workspace/sites/tandr-ops/inbox/
```

**cURL Example:**
```bash
curl -u "user:pass" \
  "https://buildingabot.com/wp-json/3ai/v1/files?path=/workspace/sites/tandr-ops/inbox/"
```

**Response (Success):**
```json
{
  "success": true,
  "path": "/workspace/sites/tandr-ops/inbox/",
  "items": [
    {
      "name": "randy-estimate-001.md",
      "type": "file",
      "size": 156,
      "modified": "2026-02-13T12:30:00Z"
    },
    {
      "name": "tommy-schedule.json",
      "type": "file",
      "size": 2048,
      "modified": "2026-02-13T12:25:00Z"
    }

**324 Ports and paths are changed ref data**
