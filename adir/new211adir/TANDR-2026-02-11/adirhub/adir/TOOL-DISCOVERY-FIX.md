**324 Ports and paths are changed ref data**

# Tool Discovery Fix - Complete Summary

**Date:** 2026-02-13
**Issue:** ADIR Hub showing TOOLS (0) despite having tools
**Status:** ✅ FIXED

---

## The Problem

**User Observation:**
- ADIR Hub was showing `TOOLS (0)` in the sidebar
- Admin panel correctly identified 3 tools (Prompt Library, StartPower, Atlas)
- Discrepancy between what existed and what was being discovered

**Root Cause:**
The ADIR Hub's tool discovery mechanism was looking in a specific location:
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\
```

But the tools were:
- Located in different directories
- Not structured with the required `/adir/` subdirectories
- Not accessible to the discovery scanner

---

## How Tool Discovery Works

### Discovery Scanner (adir-api.php)

The `scanProjects()` function in `api/adir-api.php` looks for:

**Apps:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\[AppName]\adir\`
- Scanned from line 68-95
- Shows in ADIR Hub as "APPS"
- Example: TANDRbot, TANDRCRM, TANDRSocial, TANDRmgr, PromptLibrary, Bridge

**Tools:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\[ToolName]\adir\`
- Scanned from line 98-121
- Shows in ADIR Hub as "TOOLS"
- Looks for: `[ToolName]/adir/` subdirectory with `.md` files

**Hub:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\`
- Single special entry
- Shows as "ADIR HUB" at top of sidebar

### What Gets Detected

For each project (app or tool), scanner checks:

```php
[
  'has_adir'   => is_dir($path/adir),          # ✓ Has /adir/ folder
  'has_boot'   => file_exists($path/adir/BOOT.md),  # ● Icon if yes
  'has_current'=> file_exists($path/adir/current.md), # Extra badge
  'files'      => [...all .md files...]         # Listed in sidebar
]
```

---

## The Solution

### Step 1: Created TOOLS Directory Structure

Created three tool discovery structures in `adirhub/TOOLS/`:

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\
├── PromptLibrary\
│   └── adir\
│       ├── BOOT.md (700 lines)
│       └── index.md (50 lines)
│
├── StartPower\
│   └── adir\
│       ├── BOOT.md (350 lines)
│       └── index.md (40 lines)
│
└── Atlas\
    └── adir\
        ├── BOOT.md (450 lines)
        └── index.md (45 lines)
```

### Step 2: Added Required Files

Each tool has:
- **BOOT.md:** Complete documentation on how to use the tool
  - What it is and its purpose
  - Quick start guide
  - API/command reference
  - Troubleshooting
  - See also links

- **index.md:** Quick navigation and summary
  - Short descriptions
  - Key commands/endpoints
  - Links to main documentation
  - Related resources

### Step 3: Verified Discovery

Tested the scanner API:
```bash
curl http://localhost:9303/api/adir-api.php?action=scan_projects
```

**Result:** All 3 tools now appear with:
- `"type": "tool"`
- `"has_boot": true` (shows [●] icon)
- `"files": ["BOOT.md", "index.md"]`

---

## What Changed

### Files Created

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\
├── PromptLibrary\adir\BOOT.md       (NEW)
├── PromptLibrary\adir\index.md      (NEW)
├── StartPower\adir\BOOT.md          (NEW)
├── StartPower\adir\index.md         (NEW)
├── Atlas\adir\BOOT.md               (NEW)
└── Atlas\adir\index.md              (NEW)
```

### Documentation Updated

- `SOURCE-OF-TRUTH.md` - Added Tool Discovery System section

---

## How to Add More Tools

To add a new tool to ADIR Hub:

### Step 1: Create Directory Structure
```
mkdir C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\[NewToolName]\adir
```

### Step 2: Create BOOT.md
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\[NewToolName]\adir\BOOT.md
```

Include:
- What the tool is
- How to start/use it
- Key commands or endpoints
- Troubleshooting
- See also links

### Step 3: Create index.md (Optional)
Quick navigation guide with key links.

### Step 4: Refresh ADIR Hub
- Close/reload browser tab at http://localhost:9303
- Tool appears automatically in sidebar under TOOLS

---

## Verification

### Check Discovery Works
```bash
# API endpoint shows tools
curl http://localhost:9303/api/adir-api.php?action=scan_projects | grep '"type":"tool"'

# Result: 3 tools (Atlas, PromptLibrary, StartPower)
```

### Check ADIR Hub Display
1. Open http://localhost:9303 in browser
2. Look at left sidebar
3. Expand "TOOLS (3)" section
4. Should see:
   - Atlas [●]
   - PromptLibrary [●]
   - StartPower [●]

All have [●] because each has BOOT.md.

### Click to View
- Click tool name to expand
- Click "BOOT" button to view full documentation
- Click file names to view other docs
- Uses markdown renderer in ADIR Hub

---

## Tool Documentation Quality

### PromptLibrary Tool
- **BOOT.md:** Complete Prompt Library guide
  - 24 prompts in 7 categories
  - Index system (Index 1 & Index 2)
  - How to add new prompts
  - Domain routing weights
  - Integration points

- **index.md:** Quick navigation
  - Links to all categories
  - Links to indexes
  - How to add prompts link

### StartPower Tool
- **BOOT.md:** Master startup system guide
  - How to start all services (15s wait, retry logic)
  - Diagnostic tools
  - Service control commands
  - Troubleshooting
  - Adding new services

- **index.md:** Quick commands
  - Copy-paste ready batch commands
  - Service list
  - Configuration files

### Atlas Tool
- **BOOT.md:** Complete verification system guide
  - 9 API endpoints with examples
  - Verification workflow
  - Index system explanation
  - Domain routing details
  - Troubleshooting

- **index.md:** Quick API reference
  - All 9 endpoints listed
  - Start instructions
  - Integration summary

---

## Impact

### Before Fix
```
ADIR Hub Sidebar:
├── ADIR HUB
├── APPS (6)
│   ├── Bridge
│   ├── PromptLibrary
│   ├── TANDRCRM
│   ├── TANDRSocial
│   ├── TANDRbot
│   └── TANDRmgr
└── TOOLS (0)           ← Empty!
```

### After Fix
```
ADIR Hub Sidebar:
├── ADIR HUB
├── APPS (6)
│   ├── Bridge
│   ├── PromptLibrary
│   ├── TANDRCRM
│   ├── TANDRSocial
│   ├── TANDRbot
│   └── TANDRmgr
└── TOOLS (3)           ← Now populated!
    ├● Atlas
    ├● PromptLibrary
    └● StartPower
```

---

## Next Steps

### Immediate
1. ✅ Refresh ADIR Hub: http://localhost:9303
2. ✅ Expand TOOLS section in sidebar
3. ✅ Click each tool to view BOOT.md documentation

### Recommended
1. Review each tool's BOOT.md for complete functionality
2. Update admin panel to pull from tool discovery instead of hardcoding
3. Add more `.md` files to each tool as needed (CURRENT-STATUS.md, etc.)
4. Consider adding current.md to tools to track status

### Future Enhancement
- Convert admin panel to dynamic tool management
- Add tool enable/disable toggle
- Add tool versioning
- Add tool dependency tracking

---

## Technical Details

### Scanner Logic (adir-api.php:98-121)
```php
// Scan adirhub/TOOLS
if (is_dir($toolDir)) {
    foreach (scandir($toolDir) as $tool) {
        if ($tool[0] === '.' || !is_dir("$toolDir/$tool")) continue;
        $adir = "$toolDir/$tool/adir";
        $project = [
            'name' => $tool,
            'type' => 'tool',                    // ← TYPE: 'tool'
            'path' => "$toolDir/$tool",
            'has_adir' => is_dir($adir),        // ← REQUIRES /adir/
            'has_boot' => file_exists("$adir/BOOT.md"),  // ← Checks for BOOT.md
            'has_current' => file_exists("$adir/current.md"),
            'files' => []                        // ← Populates with .md files
        ];
        if ($project['has_adir']) {
            foreach (scandir($adir) as $f) {
                if ($f[0] === '.' || is_dir("$adir/$f")) continue;
                if (pathinfo($f, PATHINFO_EXTENSION) === 'md') {
                    $project['files'][] = $f;   // ← Adds to files array
                }
            }
        }
        $projects[] = $project;
    }
}
```

### Display Logic (adirhub.js:124-133)
```javascript
// TOOLS section in sidebar
html += `<div class="nav-section">
    <div class="nav-header">TOOLS (${tools.length})</div>
    <div class="nav-items">`;

tools.forEach(p => {
    const icon = p.has_boot ? '●' : '○';
    html += `<div class="nav-group">
        <div class="nav-app">${icon} ${p.name}</div>
        <div class="nav-items" style="display:none">`;

    p.files.forEach(f => {
        html += `<div class="nav-item">
            ${f}</div>`;
    });
    html += `</div></div>`;
});
```

---

## Summary

✅ **Problem Identified:** Tool discovery looking in wrong location
✅ **Root Cause Found:** Tools not in `adirhub/TOOLS/` with `/adir/` subdirs
✅ **Solution Implemented:** Created proper tool directory structures
✅ **Verification Complete:** Scanner finds all 3 tools
✅ **Documentation Added:** Comprehensive BOOT.md + index.md for each tool
✅ **Ready for Use:** ADIR Hub now shows TOOLS (3) with full documentation

**Status:** ✅ PRODUCTION READY - Tool Discovery System Operational

**324 Ports and paths are changed ref data**
