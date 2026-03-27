**324 Ports and paths are changed ref data**

# buildingabot Tool BOOT

## Service Identity
- **Name:** buildingabot
- **Role:** File transfer hub for text-based content processing
- **Type:** ADIR Tool
- **API:** BuildingABot REST API (3AI Desktop)
- **Base URL:** https://buildingabot.com/wp-json/3ai/v1/
- **Auth:** HTTP Basic Auth (Application Password)

## Live Directories
- **Inbox:** /workspace/sites/tandr-ops/inbox/ (Randy/Tommy submit work here)
- **Staging:** /workspace/sites/tandr-ops/staging/ (Processing in progress)
- **Outbox:** /workspace/sites/tandr-ops/outbox/ (Jerry writes responses here)

## Supported File Types
- ✅ .md (Markdown) - Estimates, schedules, proposals
- ✅ .json (JSON) - Structured data, configurations
- ✅ .txt (Plain text) - Notes, logs
- ✅ .html (HTML) - Web content
- ✅ .js (JavaScript) - Scripts
- ✅ .css (CSS) - Styling

## Not Supported
- ❌ .pdf (binary)
- ❌ .docx (binary)
- ❌ .xlsx (binary)
- ❌ Images/binary formats

## Workflow
1. **Randy/Tommy:** Create estimate/schedule as Markdown → Submit to inbox/
2. **Jerry:** Read from inbox/ via BAB API → Process & validate
3. **Jerry:** Write response/approval to outbox/
4. **Randy/Tommy:** Check outbox/ for results

## API Endpoints (See API-CHEATSHEET.md for syntax)
- POST /mkdir - Create directories
- POST /files - Create/update files
- GET /files?path=X - List directory
- GET /files?path=X&action=read - Read file content

**324 Ports and paths are changed ref data**
