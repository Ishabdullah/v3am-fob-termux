**324 Ports and paths are changed ref data**

# Admin Panel - Easy Tool Creation

**Date:** 2026-02-13
**Feature:** One-click tool creation from admin panel
**Status:** ✅ Ready to use

---

## What Changed

### Before
- Admin form was just a simulation
- No actual files created
- Form would reset but nothing happened

### After
- Form actually creates the tool
- Automatically creates directory structure
- Automatically creates BOOT.md and index.md
- Tool appears in ADIR Hub immediately after refresh
- **No more reading MD files or remembering paths!**

---

## How to Use (Super Simple!)

### Step 1: Restart ADIR Hub

First, you need to restart the server to load the new API:

```batch
STOP-SERVICE.bat ADIR
timeout /t 2 /nobreak
START-SERVICE.bat ADIR
```

Or restart via master startup:
```batch
C:\STARTPOWER\NEWBATS\START-MASTER.bat
```

Wait for ADIR Hub to start on port 9303.

### Step 2: Open Admin Panel

```
http://127.0.0.1:9303/admin/
```

### Step 3: Click "Add Tool/App" Tab

You'll see a simple form with fields:
- **Tool/App Name** ← Just type the name
- **Category** ← Choose: Tool, App, Agent, Service, or Other
- **Description** ← Optional: What does it do?
- **Port/URL** ← Optional: For services with web interfaces

### Step 4: Fill Out & Click Submit

```
Example:
─────────────
Tool/App Name:  My Custom Tool
Category:       Tool
Description:    Does something awesome
───────────────────────────────────
[➕ Add Tool/App] [Clear Form]
```

### Step 5: Success! ✅

You'll see:
```
✅ Tool "My Custom Tool" created successfully!

📁 Location: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\MyCustomTool
📝 Files created: adir/BOOT.md, adir/index.md

⚡ Next: Refresh ADIR Hub to see your new tool!
```

### Step 6: Refresh ADIR Hub

```
http://127.0.0.1:9303/
```

Your new tool appears in the **TOOLS (N)** section in the left sidebar!

---

## What Gets Created Automatically

When you submit the form, the system:

✅ Creates directory: `TOOLS\YourToolName\adir\`
✅ Creates `BOOT.md` with professional template
✅ Creates `index.md` with quick reference
✅ Generates proper formatting
✅ Shows you the path so you know where it is

---

## Example Workflow

### Add "Database Manager" Tool

**Form Input:**
```
Name:        Database Manager
Category:    Tool
Description: Manage and configure databases
```

**What Happens:**
```
Directory created:
  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\DatabaseManager\adir\

Files created:
  - adir/BOOT.md (Professional guide template)
  - adir/index.md (Quick reference template)

Tool now appears in:
  ADIR Hub → Left sidebar → TOOLS → DatabaseManager [●]
```

**You can then:**
- Click "DatabaseManager" to expand it
- Click "BOOT" to view/edit the guide
- Customize BOOT.md with your actual instructions
- Add more .md files as needed

---

## Customizing Your New Tool

After creation, you can edit the files:

**Location:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\[YourToolName]\adir\`

**Files to Edit:**
1. **BOOT.md** - Full documentation (what it is, how to use, etc.)
2. **index.md** - Quick reference (short version)

**Edit in:**
- Any text editor (Notepad, VS Code, etc.)
- Or in ADIR Hub file viewer
- Changes appear immediately on refresh

---

## Tool Categories

| Category | Best For | Location |
|----------|----------|----------|
| **Tool** | Utilities, helpers, utilities | `TOOLS\` |
| **App** | Applications | `apps\` |
| **Agent** | AI agents | `TOOLS\` |
| **Service** | External services | `TOOLS\` |
| **Other** | Anything else | `TOOLS\` |

---

## Behind the Scenes

The admin panel now:

1. Receives form input
2. Sends to backend: `POST /api/create-tool`
3. Backend creates directory structure
4. Backend creates BOOT.md template
5. Backend creates index.md template
6. Returns success message with location
7. Shows you what was created
8. You refresh ADIR Hub to see it

**No cross-port issues** - Admin panel is on same server (port 9303) as ADIR Hub.

---

## Troubleshooting

### Form Resets But Tool Not Created

**Problem:** Did you restart ADIR Hub after code changes?
**Solution:** Restart the service:
```batch
STOP-SERVICE.bat ADIR
timeout /t 2
START-SERVICE.bat ADIR
```

### Tool Not Appearing in ADIR Hub

**Problem:** Created tool but doesn't show up
**Solution:** Refresh your browser
```
Press F5 or Ctrl+R
```

### Error Message in Admin Panel

**Check the error:**
- "Tool name required" → Fill in the name field
- "Invalid tool name" → Use alphanumeric characters (no special chars)
- "Internal server error" → Check ADIR Hub console for details

### Can't Access Admin Panel

**Check:** Is ADIR Hub running?
```
http://127.0.0.1:9303/ (should load)
http://127.0.0.1:9303/admin/ (should load admin panel)
```

---

## API Details (For Reference)

**Endpoint:** `POST /api/create-tool`

**Request:**
```json
{
  "name": "Tool Name",
  "category": "tool",
  "description": "What this tool does"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Tool \"Tool Name\" created successfully!",
  "path": "C:\\FOB\\adir\\...\\TOOLS\\ToolName",
  "files_created": ["adir/BOOT.md", "adir/index.md"],
  "next_steps": [
    "Edit BOOT.md with complete documentation",
    "Edit index.md with quick reference",
    "Refresh ADIR Hub to see the new tool"
  ]
}
```

---

## Quick Checklist

- [ ] Restart ADIR Hub (`STOP-SERVICE.bat ADIR` + `START-SERVICE.bat ADIR`)
- [ ] Open admin panel: `http://127.0.0.1:9303/admin/`
- [ ] Click "Add Tool/App" tab
- [ ] Fill out simple form (name required, others optional)
- [ ] Click "Add Tool/App" button
- [ ] See success message with location
- [ ] Refresh ADIR Hub: `http://127.0.0.1:9303/`
- [ ] Tool appears in TOOLS section
- [ ] Click tool name to expand
- [ ] Edit BOOT.md with your instructions
- [ ] Done! 🎉

---

## Next Steps

1. **Restart ADIR Hub** (see instructions above)
2. **Open Admin Panel:** http://127.0.0.1:9303/admin/
3. **Try it:** Create a test tool with a simple name
4. **Refresh:** Go back to ADIR Hub and see your new tool
5. **Customize:** Edit the BOOT.md file with your instructions
6. **Share:** Anyone can now use your tool from ADIR Hub!

---

**Status:** ✅ Ready to Use
**No More:** Reading documentation, remembering paths, manual file creation
**Just:** Fill form → Click button → Tool created!

**324 Ports and paths are changed ref data**
