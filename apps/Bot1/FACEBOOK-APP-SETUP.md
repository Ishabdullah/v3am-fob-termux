324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example


# TANDRSocial - Facebook App Setup Information

**Status:** ⏸️ PAUSED - Waiting for Page Admin Access
**Date Created:** 2026-02-05

---

## Facebook App Details

**App Name:** TANDRSocial Content Manager
**App ID:** 1
**Business:** T And R Builders
**Purpose:** Employee-only social media content management
**Status:** ✅ Created, ⏳ Awaiting Page Access Token

---

## Page Information

**Page Name:** T & R Builder LLC
**Page ID:** 1
**Current Issue:** Need admin access to generate Page Access Token

---

## Required Permissions

The app is configured with these permissions:
- ✅ `pages_read_engagement` - Read posts, comments, likes
- ✅ `pages_manage_posts` - Post to page (future use)
- ✅ `read_insights` - Analytics data
- ✅ `pages_show_list` - List pages

---

## How to Get Page Access Token (When Admin Access Available)

### Method 1: Access Token Tool (Recommended)

1. Log into Facebook Developers with **page admin account**
2. Go to: https://developers.facebook.com/tools/accesstoken/
3. Select app: **TANDRSocial Content Manager** (top-right dropdown)
4. Look for: **T & R Builder LLC** in pages list
5. Click to reveal Page Access Token
6. Copy full token (starts with `EAA...`, 100+ characters)

### Method 2: Graph API Explorer

1. Go to: https://developers.facebook.com/tools/explorer/
2. Select app: **TANDRSocial Content Manager**
3. Change: "User Token" → "Get Page Access Token"
4. Select: **T & R Builder LLC**
5. Click: Generate Access Token
6. Copy token

---

## Update Config After Getting Token

**File:** `C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\config.json`

**Update this section:**
```json
"facebook_graph_api": {
    "enabled": true,
    "api_version": "v21.0",
    "page_id": "1",
    "access_token": "PASTE_TOKEN_HERE"
}
```

---

## Test After Token Update

```bash
# Test Graph API connection
cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial
php api/graph-api.php

# Should see:
# - Token validation: SUCCESS
# - Page info: SUCCESS (not permission error)

# Test reading posts
curl "http://localhost:8099/api/graph-api.php?test=graph"

# Test in chat
# Browser: http://localhost:8099/
# Ask: "What are our latest Facebook posts?"
```

---

## Current Temporary Solution

**Using TANDRbot's token for testing:**
- Token from TANDR-live app (App ID: 1)
- Has `pages_messaging` permission
- Missing `pages_read_engagement`, `pages_manage_posts`, `read_insights`
- Works for token validation but can't read posts

**Why separate app?**
- TANDRbot: Public customer chat via Messenger webhook
- TANDRSocial: Employee content management via Graph API
- Keeps permissions isolated and secure

---

## When Resuming This Project

1. ✅ Get page admin access
2. ✅ Generate Page Access Token (methods above)
3. ✅ Update config.json
4. ✅ Test Graph API (php api/graph-api.php)
5. ✅ Test reading posts
6. ✅ Test drafting content
7. ✅ Build approval workflow
8. ✅ Set up ngrok with auth (optional)

---

## Links for Reference

**Facebook Developers:**
- App Dashboard: https://developers.facebook.com/apps/1
- Access Token Tool: https://developers.facebook.com/tools/accesstoken/
- Graph API Explorer: https://developers.facebook.com/tools/explorer/

**TANDRSocial:**
- Local: http://localhost:8099/
- Dashboard: http://localhost:8099/dashboard.html
- Status: http://localhost:8099/api/bot.php?action=status

**Documentation:**
- Setup: C:\Users\tandradmin\Desktop\2026Start\TANDRSOCIAL-SETUP-COMPLETE.md
- Full docs: C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\CLAUDE.md
- Status: C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\adir\CURRENT-STATUS.md

---

## Facebook App Creation Process (For Future Bots)

**Steps to create new Facebook app:**

1. Go to https://developers.facebook.com/apps
2. Click "Create App"
3. Select type: **Business**
4. Fill in:
   - App Name: [BotName] Content Manager
   - App Contact Email: [your email]
   - Business Account: T And R Builders
5. Click "Create App"
6. Add Product: **Facebook Login**
7. Configure permissions (Settings → Advanced → Permissions):
   - For Messenger bots: `pages_messaging`
   - For content management: `pages_read_engagement`, `pages_manage_posts`, `read_insights`
8. Generate token via Access Token Tool
9. Copy to bot's config.json

**Note:** Facebook UI changes frequently. Core process stays the same but navigation may differ.

---

## Troubleshooting

**"Object does not exist" error:**
- User account not admin of page
- Need to use page admin account

**Token validation fails:**
- Token expired (regenerate)
- Token for wrong page
- App permissions not configured

**Can't read posts:**
- Missing `pages_read_engagement` permission
- Need to add permission and regenerate token

---

**Last Updated:** 2026-02-05
**Next Action:** Get page admin access, generate token, complete setup
**Priority:** Medium (paused for other work, resume when ready)



324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example
324 Ports and paths have changed leaving this for syntax example