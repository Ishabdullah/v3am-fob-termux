**324 Ports and paths are changed ref data**

# Deployment Checklist
**Created:** 2026-02-11 19:55 UTC

---

## Step 1: Deploy TANDRmgr adir/ Files

**Target Directory:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\`

**Note:** BOOT.md currently has 44-byte stub. This will replace it.

### Copy Commands

```bash
copy C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\tandrmgr_boot_final.md C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\BOOT.md

copy C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\tandrmgr_index_final.md C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\index.md

copy C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\tandrmgr_status_final.md C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\CURRENT-STATUS.md
```

### Verification

After copying, verify files exist:

```bash
dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\*.md
```

Should show 3 files:
- BOOT.md
- CURRENT-STATUS.md
- index.md

Check file sizes are NOT 44 bytes (old stub):

```bash
dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\BOOT.md
```

Should be 2,000+ bytes (not 44)

---

## Step 2: Deploy TANDRSocial adir/ Files

**Target Directory:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\adir\`

**Note:** Directory currently empty. This creates 3 new files.

### Copy Commands

```bash
copy C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\tandrsocial_boot_final.md C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\adir\BOOT.md

copy C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\tandrsocial_index_final.md C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\adir\index.md

copy C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRCRM\agent\data\tandrsocial_status_final.md C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\adir\CURRENT-STATUS.md
```

### Verification

After copying, verify all 3 files created:

```bash
dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\adir\*.md
```

Should show:
- BOOT.md (new file)
- CURRENT-STATUS.md (new file)
- index.md (new file)

---

## Step 3: Fix TANDRSocial Knowledge API Bug

**File:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial\api\bot.php`

**The Bug:** Hardcoded path `data/knowledge` when code should use `data/social-knowledge`

### Required Changes

**In handleKnowledge() function (around line 230):**

```php
// OLD:
$files = $security->listFiles('data\/knowledge');

// NEW:
$files = $security->listFiles($config['knowledge'

**324 Ports and paths are changed ref data**
