# ADIR - AGENT DIRECTORY SYSTEM

**Purpose**: Navigation and coordination system for AI agents
**Version**: 1.0 (Universal, Brand-Agnostic)

---

## 🎯 CORE CONCEPT

Adir creates a "freeway" through your drive. As agents navigate, they:
- **Read** coordination files (works with read-only access)
- **Build** new adir stops when visiting new directories (if write access)
- **Log** all actions to a central action_log.txt

---

## 🛣️ THE FREEWAY PATTERN

Think of it like highway rest stops:

1. **You're here** → Current directory has adir/ (this folder)
2. **Read what to do** → adir/CURRENT.txt tells you tasks
3. **Navigate** → Move to another directory
4. **New stop?** → If adir/ doesn't exist there, create one
5. **Continue** → Each directory has independent coordination files
6. **Master log** → All actions logged at the root

---

## 📁 WHAT'S IN THIS DIRECTORY

```
adir/
├── 01_README.txt        ← You are here
├── 02_STRUCTURE.txt     ← Folder layout
├── 03_WORKFLOW.txt      ← How to work
├── 04_EXAMPLES.txt      ← Real examples
├── 05_TEMPLATES/        ← Templates to copy
├── LOGS/                ← Action logs
└── [coordination files created from templates]
```

---

## 📋 COORDINATION FILES

These files manage work:

- **CURRENT.txt** - What tasks are active right now
- **WORKING.txt** - Project context and decisions
- **FEED.txt** - Messages between agents (Wheel Protocol)
- **SESSION.txt** - Recovery info if interrupted

Copy these from 05_TEMPLATES/ when you first work here.

---

## 🎯 QUICK START

### What to do RIGHT NOW:

1. **Read these files (in order)**:
   - 02_STRUCTURE.txt (folder layout)
   - 03_WORKFLOW.txt (how to work)
   - 04_EXAMPLES.txt (see examples)

2. **Check for coordination files**:
   - If CURRENT.txt exists → Read it for tasks
   - If not → Copy from 05_TEMPLATES/CURRENT.txt

3. **If you need to navigate elsewhere**:
   - Go to that directory
   - Check if adir/ exists
   - If not → Create it and copy 01-04 files + templates
   - If yes → Read its CURRENT.txt, WORKING.txt, FEED.txt

4. **When you work**:
   - Update CURRENT.txt (mark tasks done)
   - Update WORKING.txt (document decisions)
   - Update FEED.txt (coordinate with other agents)
   - Append to LOGS/action_log.txt (every action)

---

## 🔧 PERMISSIONS

**Read-Only Access?**
- You can still navigate and understand the freeway
- Read CURRENT.txt to see what needs doing
- Read LOGS/action_log.txt to understand history
- Can't build new adir/ stops, but can follow existing ones

**Write Access?**
- Read and navigate (like read-only)
- PLUS create new adir/ in subdirectories you visit
- Build the freeway as you explore
- Update coordination files as you work

---

## 📖 NEXT STEPS

1. Read 02_STRUCTURE.txt (understand layout)
2. Read 03_WORKFLOW.txt (understand procedures)
3. Read 04_EXAMPLES.txt (see real scenarios)
4. Check if CURRENT.txt exists here
5. Read the coordination files relevant to your work

---

*Adir - Your navigation and coordination freeway*
