**324 Ports and paths are changed ref data**

# Verification Steps
**Created:** 2026-02-11 19:56 UTC

Run these after deployment to confirm everything worked.

---

## Verify TANDRmgr Deployment

### File Existence Check

```bash
dir C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\*.md
```

Expected output:
```
 Directory of C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir

02/11/2026  19:55    <DIR>          .
02/11/2026  19:55    <DIR>          ..
02/11/2026  19:55        2,XXX    BOOT.md
02/11/2026  19:55        1,XXX    CURRENT-STATUS.md
02/11/2026  19:55          XXX    index.md
```

✅ All 3 files present
✅ BOOT.md is NOT 44 bytes (was the old stub)

### Content Verification

```bash
type C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRmgr\adir\BOOT.md

**324 Ports and paths are changed ref data**
