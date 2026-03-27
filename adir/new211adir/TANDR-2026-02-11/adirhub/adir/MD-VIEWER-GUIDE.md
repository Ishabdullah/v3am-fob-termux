**324 Ports and paths are changed ref data**

# MD Viewer & Log Browser - User Guide

**Created:** 2026-02-25
**Purpose:** Browse conversation logs, memory files, knowledge bases, and system documentation
**Tools:** Two complementary viewers for different use cases

---

## 🎯 Quick Start

### 1. PHP Viewer (Recommended - Full Access)

**Best for:** Accessing logs, memory files, knowledge bases

```bash
# Start a PHP server in the adir directory
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir
php -S localhost:8888

# Then open in browser
http://localhost:8888/md-viewer.php
```

### 2. HTML Viewer (Direct - Quick Access)

**Best for:** Documentation and quick reference

```bash
# Just open directly in browser
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\md-viewer.html

# Or serve via any web server
```

---

## 📚 What You Can Browse

### System Documentation
- 📝 **MEMORY.md** - Cross-session memory index
- 📊 **SESSION-SUMMARY** - Session accomplishments and metrics
- 🌐 **GET-REQUEST-MASTER-GUIDE** - API usage guide
- 📖 **API-INSTRUCTIONS** - GET request details

### Status Files (SOT - Statement of Truth)
- ✅ **System Status** - Current service health and metrics
- 🔗 **ngrok Config** - Tunnel configuration and status
- 🤖 **Agents Config** - Agent setup and models
- 📦 **File Inventory** - Complete file structure
- 🔄 **Sync Manifest** - What syncs to The Last

### Conversation Logs
- 🎨 **TANDRSocial Logs** - Social media content generation
- 💬 **TANDRbot Logs** - Customer chatbot conversations
- 👨 **Jerry Logs** - Operations and CRM interactions

### Knowledge Bases
- 🎨 **Social Knowledge** - TANDRSocial company guidelines
- 💬 **Bot Knowledge** - TANDRbot FAQ and service info

---

## 🖥️ Interface Layout

```
┌─────────────────────────────────────────────────────────────┐
│                   📖 TANDR System - MD Viewer                │
│ Select a file to view - Organized by category                │
└─────────────────────────────────────────────────────────────┘

┌────────────────┬──────────────────────────────────────────────┐
│                │                                              │
│  SIDEBAR       │  FILE BROWSER (when browsing directories)    │
│                │                                              │
│ • Doc Buttons  │  📄 file1.txt                               │
│ • Status Files │  📄 file2.md                                │
│ • Log Browsers │  📄 file3.json                              │
│ • Knowledge    │                                              │
│                │                                              │
│                ├──────────────────────────────────────────────┤
│                │                                              │
│                │  MARKDOWN VIEWER                             │
│                │  ═════════════════════════════════════       │
│                │                                              │
│                │  Formatted markdown with:                    │
│                │  • Syntax highlighting                       │
│                │  • Tables                                    │
│                │  • Code blocks                               │
│                │  • Lists and formatting                      │
│                │                                              │
│                │  (Scrollable, themed dark UI)                │
│                │                                              │
└────────────────┴──────────────────────────────────────────────┘
```

---

## 🎯 Common Tasks

### View Today's Session Summary
1. Click **"📊 Session Summary"** in sidebar
2. Read accomplishments and status updates

### Check System Status
1. Click **"✅ System Status"** in SOT section
2. Review 12/12 services, LLM status, ngrok tunnels

### Browse Conversation Logs
1. Click **"🎨 TANDRSocial Logs"** (or other system)
2. File browser appears on left
3. Click file name to view conversation
4. Scroll to see full conversation history

### Review Knowledge Base
1. Click **"🎨 Social Knowledge"** (or Bot Knowledge)
2. Browse company guidelines and response templates
3. Use for understanding AI behavior and company voice

### Find API Documentation
1. Click **"🌐 API Guide"** or **"📖 API Details"**
2. Search browser for specific system or port number

### Check Memory Files
1. Click **"📝 Memory Index"**
2. View cross-session learning and context

---

## 🔍 Features

### 1. Dark Theme UI
- ✅ Professional dark blue/cyan theme
- ✅ Easy on the eyes for extended viewing
- ✅ Color-coded headings and code blocks

### 2. Markdown Rendering
- ✅ Headers (H1-H6) with styling
- ✅ Code blocks with syntax highlighting
- ✅ Tables with hover effects
- ✅ Lists (ordered/unordered)
- ✅ Blockquotes
- ✅ Bold, italic, inline code
- ✅ Links

### 3. File Organization
- ✅ Sidebar navigation for quick access
- ✅ Breadcrumb trail showing current location
- ✅ File list with modification times
- ✅ Size indicators

### 4. File Support
- ✅ Markdown (.md) files
- ✅ Text (.txt) files
- ✅ JSON configuration files
- ✅ Log files

---

## 🛠️ Setting Up Viewers

### Option 1: PHP Server (Best)

```bash
# Navigate to adir directory
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir

# Start PHP server
php -S localhost:8888

# Open browser
http://localhost:8888/md-viewer.php

# Stop with Ctrl+C
```

### Option 2: Python Server

```bash
# Python 3
python -m http.server 8888

# Or Python 2
python -m SimpleHTTPServer 8888

# Open browser
http://localhost:8888/md-viewer.html
```

### Option 3: Node.js Server

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run from adir directory
http-server -p 8888

# Open browser
http://localhost:8888/md-viewer.html
```

### Option 4: Direct HTML

```bash
# Just open the HTML file directly (limited file access)
# Double-click: md-viewer.html
# Or open from browser: file:///C:/FOB/adir/new211adir/TANDR-2026-02-11/adirhub/adir/md-viewer.html
```

---

## 📋 Directory Structure Accessed

```
C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir\
├── MEMORY.md
├── SESSION-SUMMARY-20260225.md
├── SOT-20260225-*.md (5 files)
├── GET-REQUEST-MASTER-GUIDE.md
├── API-INSTRUCTIONS-GET-REQUESTS.md
└── ... (other documentation)

C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\
├── TANDRSocial\
│   ├── adir\logs\conversations.txt
│   ├── adir\logs\errors.txt
│   └── data\social-knowledge\*.md
├── TANDRbot\
│   ├── adir\logs\conversations.txt
│   ├── adir\logs\errors.txt
│   └── data\knowledge\*.md
└── TANDRCRM\
    └── agent\data\*.json (memory files)
```

---

## 🔑 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Scroll** | Navigate through long documents |
| **Ctrl+F** | Search within page (browser find) |
| **Click Link** | Open related documentation |

---

## 🐛 Troubleshooting

### Issue: "File Not Found" Error
**Problem:** File doesn't exist or path is wrong
**Solution:** Check file exists in directory, try different file

### Issue: No File List Appearing
**Problem:** Browser can't access local files
**Solution:** Use PHP server (md-viewer.php) instead of HTML version

### Issue: Markdown Not Rendering Properly
**Problem:** Complex markdown features not supported
**Solution:** Use simple markdown syntax; complex tables may not render

### Issue: Port Already in Use
**Problem:** Port 8888 already occupied
**Solution:** Use different port: `php -S localhost:9999`

### Issue: Permission Denied
**Problem:** Can't access certain directories
**Solution:** Run PHP server from correct directory

---

## 💡 Tips & Tricks

### 1. Find Specific Information
```
Ctrl+F in browser to search within document
Example: Search for "TANDRSocial" in GET-REQUEST-MASTER-GUIDE
```

### 2. Compare Multiple Files
```
Open viewer in multiple browser tabs
View different logs/docs side-by-side
```

### 3. Export/Print Documentation
```
Ctrl+P to print
Select "Save as PDF"
Great for creating documentation archives
```

### 4. Monitor Live Logs
```
Refresh browser to see updated logs
Logs update as systems generate new entries
```

### 5. Track Changes Over Time
```
Compare SOT files with different timestamps
Notice improvements and system evolution
```

---

## 🎓 Learning Path

### Beginner
1. Open **SESSION-SUMMARY** to understand what was accomplished
2. Browse **GET-REQUEST-MASTER-GUIDE** to learn API usage
3. Check **System Status** to see current health

### Intermediate
1. Review **API Details** for specific system information
2. Browse conversation logs to understand AI behavior
3. Check knowledge bases to see company guidelines

### Advanced
1. Monitor log files for real-time system activity
2. Compare SOT files over time to track improvements
3. Review memory files to understand cross-session learning

---

## 📊 Example Workflows

### Workflow 1: Understand TANDRSocial
1. Open **API-INSTRUCTIONS** (learn how it works)
2. View **TANDRSocial Logs** (see past conversations)
3. Browse **Social Knowledge** (understand guidelines)
4. Check **System Status** (verify it's operational)

### Workflow 2: Debug an Issue
1. Check **System Status** (what's failing?)
2. Review **Agents Config** (how are they set up?)
3. Browse **Error Logs** (what went wrong?)
4. Check **Memory** (any relevant context?)

### Workflow 3: Learn System Architecture
1. Read **GET-REQUEST-MASTER-GUIDE** (API overview)
2. Review **Agents Config** (agent setup)
3. Check **File Inventory** (system structure)
4. Browse **Sync Manifest** (how data flows)

---

## 🔐 Security & Privacy

### ✅ Safe
- ✅ View documentation
- ✅ Read conversation logs
- ✅ Browse knowledge bases
- ✅ Check system status

### ⚠️ Be Careful
- ⚠️ Logs may contain sensitive data
- ⚠️ API keys visible in config files
- ⚠️ Keep viewer URL private

### ❌ Don't
- ❌ Share viewer URL with external parties
- ❌ Expose on public networks
- ❌ Disable authentication if going public

---

## 🚀 Advanced Setup

### Multiple Viewers on Different Ports
```bash
# Terminal 1 - Port 8888
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\adir
php -S localhost:8888

# Terminal 2 - Port 9999 (different location)
cd C:\FOB\adir\new211adir
php -S localhost:9999

# Now access multiple viewers
http://localhost:8888/md-viewer.php  (adir view)
http://localhost:9999/md-viewer.php  (root view)
```

### Nginx Configuration (Production)
```nginx
server {
    listen 80;
    server_name tandr-logs.internal;
    root /path/to/adir;

    location / {
        try_files $uri $uri/ /md-viewer.php?file=$uri;
    }
}
```

---

## 📞 Support

### Check These Files First
1. This guide (md-viewer-guide.md)
2. **SESSION-SUMMARY** (what was built)
3. **System Status** (current health)
4. **API Guide** (how things work)

### If Still Stuck
1. Check file paths exist
2. Verify PHP/Python/Node installed
3. Try different server option
4. Check file permissions

---

**Version:** 1.0
**Last Updated:** 2026-02-25
**Status:** Ready to Use

**You now have:**
✅ PHP viewer (full file access)
✅ HTML viewer (quick reference)
✅ Access to all logs and documentation
✅ Beautiful markdown rendering
✅ Complete sidebar navigation

**Start browsing your system documentation now!** 📚

**324 Ports and paths are changed ref data**
