**324 Ports and paths are changed ref data**

# TANDR Port Policy Framework
**Version:** 1.0
**Status:** Active
**Last Updated:** 2026-02-26

---

## Overview

This document establishes the official port allocation policy for all TANDR tools. It ensures:
- No port conflicts
- Consistent port naming across tools
- Easy identification of tools by port
- Room for expansion

---

## Standard Port Ranges

| Range | Purpose | Tools | Allocation |
|-------|---------|-------|-----------|
| **8081-8099** | **Core Services** | TANDRbot, TANDRSocial, etc. | Fixed (system services) |
| **8100-8199** | **Service Variants** | WordPress, development clones | Dynamic (as needed) |
| **9200-9209** | **Jerry/TANDRCRM Agents** | Jerry (9200), Randy (9201), Tommy (9202), etc. | Fixed (agents are stable) |
| **9210-9219** | **Agent-Dropper Instances** | Spawned agents from dropper | Dynamic (each gets unique) |
| **9220-9229** | **KB-Maker Instances** | Generated knowledge bots | Dynamic (each gets unique) |
| **9300-9399** | **Hub & Coordination** | ADIR Hub (9303), Atlas (9204), etc. | Fixed (infrastructure) |
| **11434** | **Ollama Service** | Local LLM provider | Fixed (external service) |

---

## Port Registry

**Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\PORT-REGISTRY.json`

**Purpose:** Track all active ports and assignments

**Format:**
```json
{
    "timestamp": "2026-02-26T10:30:00Z",
    "ports": {
        "8081": {
            "service": "TANDRbot",
            "status": "active",
            "type": "core",
            "ngrok": null
        },
        "9210": {
            "service": "Agent-Dropper",
            "status": "active",
            "type": "dynamic",
            "ngrok": {
                "domain": "agent-dropper.ngrok.app",
                "status": "configured",
                "enabled": true
            },
            "created": "2026-02-26T10:00:00Z",
            "config_file": "C:/FOB/.../Agent-Dropper-v2/config.json"
        },
        "9220": {
            "service": "KB-Maker-Bot-001",
            "status": "active",
            "type": "dynamic",
            "ngrok": {
                "domain": "kb-maker.ngrok.app",
                "status": "placeholder",
                "enabled": false
            },
            "created": "2026-02-26T10:15:00Z",
            "config_file": "C:/FOB/.../KB-Maker-v2/config.json"
        }
    }
}
```

---

## Port Assignment Rules

### For Fixed Ports (8081-8099, 9200-9209, 9300-9399)
- **Assigned at:** System configuration
- **Changed:** Only with major system updates
- **Owner:** System administrator
- **Verification:** Check PORT-REGISTRY.json
- **Conflict Resolution:** Error - do not override

### For Dynamic Ports (8100-8199, 9210-9219, 9220-9229)
- **Assigned by:** Tool's startup script or `get-next-port.php`
- **Changed:** Each instance can request different port
- **Owner:** Tool instance
- **Algorithm:**
  1. Check PORT-REGISTRY.json
  2. Find first available port in range
  3. Verify port is free with netstat
  4. Reserve port (add to registry)
  5. Update tool config

### Assignment Algorithm

```php
function getNextPort($range_start, $range_end) {
    // Read PORT-REGISTRY.json
    $registry = json_decode(file_get_contents('PORT-REGISTRY.json'));

    // Get taken ports in range
    $taken = array_filter(
        $registry->ports,
        fn($p) => $p->port >= $range_start && $p->port <= $range_end
    );

    // Find first available
    for ($port = $range_start; $port <= $range_end; $port++) {
        if (!isset($taken[$port])) {
            // Double-check with netstat
            if (!isPortInUse($port)) {
                return $port;
            }
        }
    }

    // No available ports
    return null;
}
```

---

## Tool-Specific Ports

### Agent-Dropper v2
- **Primary Port:** 9210
- **Range:** 9210-9219 (for multiple instances)
- **ngrok Domain:** agent-dropper.ngrok.app (or user's domain)
- **Startup:** `START-AGENT-DROPPER-V2.bat`
- **Registry Entry:** Auto-added on startup

**Example:**
```
Agent-Dropper Instance 1: 9210 → agent-dropper.ngrok.app
Agent-Dropper Instance 2: 9211 → agent-dropper.ngrok.app (same domain)
Agent-Dropper Instance 3: 9212 → agent-dropper.ngrok.app (same domain)
```

### KB-Maker v2
- **Primary Port:** 9220
- **Range:** 9220-9229 (each bot gets unique port)
- **ngrok Domain:** kb-maker.ngrok.app (or user's domain)
- **Startup:** `START-KB-MAKER-V2.bat`
- **Registry Entry:** Auto-added on each bot generation

**Example:**
```
KB-Maker Service: 9220 (generator interface)
Generated Bot 1: 9221 → kb-maker-bot-001.ngrok.app
Generated Bot 2: 9222 → kb-maker-bot-002.ngrok.app
Generated Bot 3: 9223 → kb-maker-bot-003.ngrok.app
```

---

## ngrok Configuration

### ngrok Domain Pattern

**Format:** `{tool-name}{-instance}.ngrok.app`

**Examples:**
```
agent-dropper.ngrok.app         (Agent-Dropper)
kb-maker.ngrok.app              (KB-Maker generator)
kb-maker-bot-001.ngrok.app      (Generated KB bot #1)
kb-maker-bot-002.ngrok.app      (Generated KB bot #2)
```

### ngrok Status Tracking

**Placeholder Status:** `"placeholder"`
- Domain not yet registered
- Shows placeholder URL in UI
- Startup shows instruction banner
- User enters real domain when ready
- Tool updates registry automatically

**Active Status:** `"configured"`
- Real ngrok domain in use
- Tunnel starts automatically
- URL shown in UI/startup console
- Can be accessed remotely

### ngrok Registry Fields

```json
"ngrok": {
    "domain": "agent-dropper.ngrok.app",     // Full domain
    "local_port": 9210,                       // Forwards to this port
    "status": "placeholder|configured",       // Current state
    "enabled": true|false,                    // Auto-start tunnel?
    "tunnel_pid": 12345,                      // Process ID if running
    "tunnel_url": "https://agent-dropper.ngrok.app",
    "auth_token": "placeholder_token_here",   // ngrok auth token
    "created": "2026-02-26T10:00:00Z",
    "updated": "2026-02-26T10:30:00Z"
}
```

---

## Startup Process

### Port Assignment on Startup

**Agent-Dropper v2 (`START-AGENT-DROPPER-V2.bat`):**
```batch
@echo off
REM 1. Check for pre-configured port in config.json
REM 2. If not set, call get-next-port.php for 9210-9219 range
REM 3. Update config.json with assigned port
REM 4. Display assigned port to user
REM 5. If ngrok enabled and configured, start tunnel
REM 6. Start server.js on assigned port
```

**KB-Maker v2 (`START-KB-MAKER-V2.bat`):**
```batch
@echo off
REM 1. If generating new bot, call get-next-port.php for 9220-9229
REM 2. Create new config for bot
REM 3. Update PORT-REGISTRY.json
REM 4. Display port assignment
REM 5. If ngrok configured, prepare tunnel (may not start automatically)
REM 6. Start server.js on assigned port
```

---

## ngrok Domain Setup Process

### For Agent-Dropper

1. **First Time Setup:**
   - Port assigned: 9210
   - ngrok placeholder: `agent-dropper.ngrok.app`
   - UI shows placeholder with message: "ngrok domain not configured"
   - Instruction button: "Add ngrok Domain"

2. **User Registers Domain:**
   - User gets ngrok auth token from ngrok.com
   - User gets static domain (ngrok.com → reserved domain)
   - User clicks "Add ngrok Domain" in UI
   - Enters auth token and domain
   - Tool updates config.json and PORT-REGISTRY.json
   - Tunnel starts automatically

3. **config.json ngrok Section:**
   ```json
   "ngrok": {
       "enabled": true,
       "auth_token": "user_enters_here",
       "domain": "agent-dropper.ngrok.app",
       "status": "placeholder"  // Changes to "active" when working
   }
   ```

### For KB-Maker

1. **Generator Interface (port 9220):**
   - Single ngrok domain: `kb-maker.ngrok.app`
   - User can configure once for all bots
   - Or each bot gets individual domain pattern

2. **Generated Bots (ports 9221-9229):**
   - Option A: Share parent domain with unique path
   - Option B: Each bot gets own ngrok domain
   - Decision: Store in KB-Maker-v2 main config

---

## Configuration File

### Agent-Dropper config.json (ngrok section)
```json
{
    "port": 9210,
    "ngrok": {
        "enabled": true,
        "auth_token": "placeholder_token_here",
        "domain": "agent-dropper.ngrok.app",
        "status": "placeholder",
        "instructions": "See NGROK-SETUP-GUIDE.md to configure",
        "auto_start": false
    }
}
```

### KB-Maker config.json (ngrok section)
```json
{
    "port": 9220,
    "bot_port_range": [9220, 9229],
    "ngrok": {
        "enabled": true,
        "auth_token": "placeholder_token_here",
        "domain": "kb-maker.ngrok.app",
        "bot_domain_pattern": "kb-maker-bot-{id}.ngrok.app",
        "status": "placeholder",
        "instructions": "See NGROK-SETUP-GUIDE.md to configure",
        "auto_start": false
    }
}
```

---

## Conflict Resolution

### If Port is Taken

**Scenario:** User tries to start Agent-Dropper on 9210, but port is busy

**Resolution:**
1. Startup script detects conflict
2. Calls get-next-port.php
3. Finds next available (9211)
4. Warns user: "Port 9210 in use, using 9211 instead"
5. Updates config.json
6. Updates PORT-REGISTRY.json
7. Starts on 9211

### If Port Range is Full

**Scenario:** All 10 ports in 9210-9219 are used

**Resolution:**
1. get-next-port.php returns null
2. Startup shows error: "No available ports in 9210-9219"
3. Suggests: "Stop running instance or use 8100-8199 range"
4. Does NOT start service

---

## Monitoring

### Check Current Ports

**Command:**
```bash
netstat -ano | findstr /R ":(80|82|91|93|94|11)"
```

**Output:** Shows all ports in use

### View Registry

**Location:** `PORT-REGISTRY.json`
**Purpose:** Source of truth for all tool ports
**Updated:** When tools start/stop
**Manual Check:**
```bash
type PORT-REGISTRY.json | more
```

---

## Best Practices

### DO:
✅ Assign ports from designated ranges
✅ Update PORT-REGISTRY.json when creating ports
✅ Use get-next-port.php for dynamic ports
✅ Document port assignment in config.json
✅ Use ngrok placeholders for future domains
✅ Test port availability before starting

### DON'T:
❌ Manually assign ports outside ranges
❌ Reuse ports without checking registry
❌ Skip port conflict checks
❌ Start services on random ports
❌ Forget to update PORT-REGISTRY.json
❌ Override ngrok domains without notification

---

## Future Expansion

### Additional Port Ranges (as needed)

```
10000-10099  - Advanced AI features
10100-10199  - Third-party integrations
10200-10299  - Experimental/testing
```

### Dynamic Port Scaling

If more than 10 instances of a tool are needed:
- Expand range (e.g., 9210-9249)
- Update this document
- Update get-next-port.php
- Update PORT-REGISTRY.json

---

## Reference

**Related Files:**
- `PORT-REGISTRY.json` - Active port assignments
- `NGROK-SETUP-GUIDE.md` - How to configure ngrok
- `Agent-Dropper-v2/config.json` - Tool config template
- `KB-Maker-v2/config.json` - Tool config template

**Key APIs:**
- `api/get-next-port.php` - Find available port
- `api/ngrok.php` - Manage ngrok tunnel
- Startup scripts - Implement port assignment

---

**Status:** Active and enforced
**Authority:** TANDR System Architecture
**Last Review:** 2026-02-26
**Next Review:** 2026-06-26 (or when new tools added)

**324 Ports and paths are changed ref data**
