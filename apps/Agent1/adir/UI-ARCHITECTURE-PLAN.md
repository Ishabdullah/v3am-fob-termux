**324 Ports and paths are changed ref data**

# UI ARCHITECTURE PLAN - 5AI Desktop Integration

**Status:** Architecture Review Complete
**Date:** 2026-02-15
**Phase:** User Interface Implementation

---

## 📐 EXISTING 5AI DESKTOP STRUCTURE

### Location
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\5AIWP\ONLINESYNTAX3AIV2wpv3-2-FINAL\
```

### Components
**Backend (PHP - WordPress Plugin):**
- `class-rest-api.php` - REST API endpoints
- `class-assistant.php` - Assistant logic
- `class-file-manager.php` - File operations
- `class-admin.php` - Admin panel
- `class-shortcodes-simple.php` - WordPress shortcodes

**Frontend (React):**
- `dist/` - Compiled React build
- Tailwind CSS for styling
- WordPress data passed via `wpData` object

### Authentication
- ✅ WordPress login gate (checks `is_user_logged_in()`)
- ✅ User context available (user_id, user_login, display_name)

---

## 🔌 REST API ENDPOINTS (3ai/v1)

### File Management
```
GET  /files?path=/&action=read     → Read file
GET  /files?path=/                 → List directory
POST /files                         → Write file
DELETE /files                       → Delete file
POST /mkdir                         → Create directory
```

### Assistant/Chat
```
POST /assistant/chat                → Chat interface
```

### Permissions
- All endpoints require WordPress login
- Uses nonce for CSRF protection

---

## 🎯 INTEGRATION STRATEGY

### What Already Works
✅ React desktop environment
✅ WordPress authentication layer
✅ File management API
✅ Assistant endpoint exists (needs connection to agents)

### What Needs to Be Connected
1. **Relay Manager** - Route user queries to correct agent
2. **Agent API Gateway** - Connect to Jerry (9200), Randy (9201), Tommy (9202)
3. **Prompt Logic** - Modify reasoning engine prompting (→ Prompt Guide)
4. **User Desktop Clients** - Thin clients for Jerry, Randy, Tommy on desktop
5. **WP Website Client** - Thin client for wp-login users

---

## 🏗️ NEW ARCHITECTURE

### Flow: Desktop User → Agent

```
Desktop User (Jerry/Randy/Tommy)
    ↓ [5AI Desktop UI on http://localhost:PORT]
    ↓ WordPress login authentication
    ↓ React frontend (Tailwind UI)
    ↓ REST API call to /assistant/chat
    ↓
RELAY MANAGER
    ↓ Determines which agent (9200/9201/9202)
    ↓
AGENT API (Jerry/Randy/Tommy's agent)
    ↓ curl http://localhost:920X/api/agent.php?action=chat&input=...
    ↓
LLM RESPONSE
    ↓
Back to UI (formatted friendly response)
```

### Flow: WP Website User → Agent

```
WP Website User (via WordPress login)
    ↓ [5AI Desktop shortcode on wp page]
    ↓ WordPress authentication
    ↓ React frontend
    ↓ REST API /assistant/chat
    ↓
RELAY MANAGER
    ↓ Route to available agent
    ↓
AGENT API
    ↓
LLM RESPONSE
    ↓ Format as CRM-friendly output
```

---

## 🔧 WHAT NEEDS TO BE DONE

### 1. Create Relay Manager
**File:** `/includes/class-relay-manager.php`
```php
- Determine which agent to route to (Jerry/Randy/Tommy)
- Make curl request to agent API
- Format response for React display
- Handle errors gracefully
```

### 2. Modify Assistant Chat Endpoint
**File:** `/includes/class-rest-api.php`
```php
- Update /assistant/chat callback
- Call Relay Manager instead of local logic
- Pass user context to agent
```

### 3. Create Desktop Thin Clients
**For Desktop Users (Jerry/Randy/Tommy):**
- Simple HTML wrapper
- Points to 5AI Desktop UI
- Auto-routes to their specific agent
- ngrok tunnel for remote access

**Options:**
- Option A: Separate WordPress instances per user
- Option B: Single WordPress with role-based routing
- Option C: Standalone thin client (HTML/JS) that calls relay API

### 4. Prompt Guide Integration
**File:** Update Prompt Library with reasoning engine logic
- Document prompt building strategy
- Add templates for agent responses
- Version control as prompts evolve

### 5. ngrok Tunnel Setup
```
New tunnel needed for:
- WP website access (external users)
- Desktop thin client access (if remote)
- API gateway endpoint
```

---

## 📊 TECHNICAL DETAILS

### Shortcode Used
```
[3ai_desktop_v2]
```
*Renders full React desktop, gated by WordPress login*

### API Base URL (from React)
```
/wp-json/3ai/v1/
```

### WordPress Data Available to React
```javascript
window.wpData = {
  apiUrl: 'REST API endpoint',
  nonce: 'CSRF token',
  user_id: 'current user ID',
  user_login: 'username',
  user_display_name: 'display name',
  pluginUrl: 'plugin assets URL'
}
```

### File Structure
```
Users directory: /wp-content/uploads/3ai-v2-users/
Each user: /wp-content/uploads/3ai-v2-users/{user_id}/
.htaccess prevents direct access
```

---

## ⚙️ REQUIRED CONFIGURATIONS

### Agent Connection
Each agent needs to accept requests from relay manager:
```
curl http://localhost:920X/api/agent.php?action=chat&input=...
```
✅ Already working (tested)

### WordPress Setup
```
- User login required: ✅
- REST API enabled: ✅
- Shortcode registration: ✅
- File permissions: Need to verify
```

### LLM Connection
```
- Primary: Anthropic (configured)
- Fallback: External LLM (no fallback to paid)
- Already in code: ✅
```

---

## 📋 NEXT STEPS

**READY TO IMPLEMENT:**
1. Create `/includes/class-relay-manager.php` - Routes to correct agent
2. Modify `/includes/class-rest-api.php` - Connect /assistant/chat to relay
3. Test with desktop users (Jerry first)
4. Create desktop thin client wrapper
5. Test WP website integration

**LATER (API Gateway Phase):**
- Master dashboard for API management
- Reasoning engine prompt modification tools
- User interface enhancements based on usage

---

## 🎯 KEY POINTS

- ✅ No code changes to existing agents (9200/9201/9202)
- ✅ No fallbacks to paid APIs
- ✅ Use existing REST API structure
- ✅ WordPress authentication for access control
- ✅ Relay manager as new connector layer
- ✅ React UI already built and ready
- ✅ ngrok tunnel for external access

**Status:** Ready to build Relay Manager and connect to agents

---

**Authority:** TANDRAgent (Jerry)
**Last Updated:** 2026-02-15
**Next Phase:** Relay Manager Implementation

**324 Ports and paths are changed ref data**
