**324 Ports and paths are changed ref data**

# FOB-PACKAGE — SOURCE OF TRUTH
*Build, Update & Ship the FOB Installer*
*Last updated: 2026-03-22*

---

## WHAT THIS IS

A single self-installing Windows exe (`FOB-Setup.exe`) built with Inno Setup 6.
It installs the entire FOB system to `C:\FOB`, runs `npm install` for all services,
and creates a desktop shortcut for V3AMFOB.

Current output: **~108 MB** · Target machine: Windows 10/11 · Requires: Node.js v18+

---

## FILE MAP

```
F:\Claude\
├── FOB-Setup.exe              ← THE INSTALLER (this is what you ship)
├── FOB-Setup.iss              ← Inno Setup source script (edit this to change installer)
├── FOB-PACKAGE\               ← Staging folder the installer pulls from
│   ├── V3AMFOB-portable\      ← Electron app (win-unpacked, updated asar inside)
│   ├── FOB-services\          ← C:\FOB snapshot (no node_modules, no backups)
│   └── INSTALL.md
├── FOB-PACKAGE.zip            ← Zip backup of staging folder
└── FOB-INSTALLER-NOTES.md     ← Extended technical notes + V2 todo
```

---

## THE BUILD PIPELINE

```
C:\FOB (live)
    ↓  [snapshot — exclude list below]
F:\Claude\FOB-PACKAGE\FOB-services\

C:\FOB\V3AMFOB\dist\win-unpacked\ (asar patched)
    ↓  [copy as-is]
F:\Claude\FOB-PACKAGE\V3AMFOB-portable\

FOB-PACKAGE\ + FOB-Setup.iss
    ↓  [ISCC.exe compiles ~90 sec]
F:\Claude\FOB-Setup.exe  ← DONE
```

---

## STEP 1 — UPDATE THE ELECTRON APP (V3AMFOB)

Do this any time `main.js`, `preload.js`, or any renderer file changes.
The app must be CLOSED before repacking.

```bash
# Kill the app
taskkill /F /IM V3AMFOB.exe

# In C:\FOB\V3AMFOB — extract current asar
node -e "require('@electron/asar').extractAll('dist/win-unpacked/resources/app.asar','dist/_asar_tmp')"

# Copy changed files into the extract
# (copy whichever files changed — at minimum these)
copy main.js dist\_asar_tmp\main.js
copy preload.js dist\_asar_tmp\preload.js
copy renderer\app.js dist\_asar_tmp\renderer\app.js
copy renderer\style.css dist\_asar_tmp\renderer\style.css
copy renderer\index.html dist\_asar_tmp\renderer\index.html

# Copy entire assets folder (icons, tray image, skin)
robocopy assets dist\_asar_tmp\assets /E

# Repack
node -e "require('@electron/asar').createPackage('dist/_asar_tmp','dist/win-unpacked/resources/app.asar').then(()=>console.log('done'))"

# Verify (should show asset files listed)
node -e "console.log(require('@electron/asar').listPackage('dist/win-unpacked/resources/app.asar').filter(f=>f.includes('assets')))"
```

> **WHY NOT npm run dist?**
> electron-builder needs symlink privileges (Developer Mode or admin terminal).
> Blocked on this machine. Asar patch is the permanent workaround until that's enabled.

---

## STEP 2 — SNAPSHOT C:\FOB → FOB-PACKAGE

Run this from Node.js or use the Package Builder app (see below).
Server should be DOWN before snapshot so no files are locked.

### What gets EXCLUDED from the snapshot

| Path / Pattern | Reason |
|---|---|
| `node_modules\` anywhere | Rebuilt by npm install on target |
| `dist\` anywhere | Build artifacts |
| `_asar_tmp\` | Temp extract folder |
| `Backupmoveup\` | 9.5GB old-version archive |
| `*-BACKUP-*\` folders | Deep paths break Windows 260-char limit in Inno Setup |
| `adirBK_B4_311\` | Old backup snapshot |
| `models\` | 121MB Ollama AI models — recipient pulls their own |
| `screen.png`, `a4resp.json`, `ss_raw.json` | Runtime capture files, not source |
| `ngrok.exe` / ngrok binaries | Licensed, cannot redistribute — user reacquires |

### What STAYS IN (notable inclusions)

- All `.bat` files — launchers, stop scripts, everything
- `php\` — bundled PHP 8.4, fully redistributable
- `Keys\` folder and all API key files — owner removes via brand consoles before upload
- All `TEMPLATE-*-CLEAN` folders — clean agent templates
- `TEMPLATE-TANDRSOCIAL-v2\` — staging template
- All agent source (Agent1-4, Bot1, VisionBot, etc.)
- All ADIR MD notes and SOT files
- `assets\` — icons, tray image, skin image

### PowerShell snapshot command

```powershell
$src = 'C:\FOB'
$dst = 'F:\Claude\FOB-PACKAGE\FOB-services'
$skipDirs = @('node_modules','dist','.git','__pycache__','V3AMFOB','_asar_tmp','Backupmoveup','adirBK_B4_311','models')
$skipPatterns = @('-BACKUP-')
$skipFiles = @('screen.png','a4resp.json','ss_raw.json','ngrok.exe')

# Clear old snapshot
Remove-Item $dst -Recurse -Force -ErrorAction SilentlyContinue

Get-ChildItem -Path $src -Recurse | Where-Object {
  $p = $_.FullName
  $skip = $false
  foreach ($d in $skipDirs) { if ($p -match [regex]::Escape('\'+$d)) { $skip=$true; break } }
  foreach ($pat in $skipPatterns) { if ($p -match [regex]::Escape($pat)) { $skip=$true; break } }
  if ($skipFiles -contains $_.Name) { $skip=$true }
  -not $skip -and -not $_.PSIsContainer
} | ForEach-Object {
  $rel = $_.FullName.Substring($src.Length)
  $target = Join-Path $dst $rel
  New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
  Copy-Item $_.FullName -Destination $target -Force
}
```

### Copy V3AMFOB portable

```powershell
$vSrc = 'C:\FOB\V3AMFOB\dist\win-unpacked'
$vDst = 'F:\Claude\FOB-PACKAGE\V3AMFOB-portable'
Remove-Item $vDst -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item $vSrc $vDst -Recurse -Force
```

---

## STEP 3 — REBUILD THE INSTALLER

```bash
"C:\Program Files (x86)\Inno Setup 6\ISCC.exe" "F:\Claude\FOB-Setup.iss"
# Takes ~90 seconds
# Output: F:\Claude\FOB-Setup.exe
```

Two expected warnings (harmless, ignore them):
- `PrivilegesRequired=admin` with per-user shortcuts
- Unused variable hint

---

## STEP 4 — SHIP IT

Copy `F:\Claude\FOB-Setup.exe` to USB or upload.
Recipient needs Node.js v18+ installed first — that's the only prerequisite.

---

## EDITING THE INSTALLER SCRIPT (FOB-Setup.iss)

### Change app name / version
```iss
#define MyAppName "V3AM FOB"
#define MyAppVersion "1.0"
#define MyAppPublisher "V3AM"
```

### Add custom branding
```iss
; In [Setup] section:
WizardImageFile=F:\Claude\banner.bmp        ; 760x57px BMP
WizardSmallImageFile=F:\Claude\logo.bmp     ; 55x55px BMP
SetupIconFile=F:\Claude\fob.ico
```

### Add/remove a service from npm install steps
```iss
[Run]
Filename: "{cmd}"; Parameters: "/c npm install"; WorkingDir: "{app}\path\to\service"; Flags: runhidden waituntilterminated; StatusMsg: "Installing ServiceName..."
```

### Add/remove files from the package
Edit the `Excludes=` parameter on the `[Files]` source lines.

### Unlock install path (currently hardcoded C:\FOB)
```iss
DisableDirPage=no   ; shows path picker
```
WARNING: Don't do this until all C:\FOB hardcodes are replaced with installer variables.
That's a full SETUP-VARS pass — see setup_vars_sot.md.

---

## THE PACKAGE BUILDER APP (V2 UPDATER)

A simple local web app planned to replace all the manual steps above.
Lives at: `C:\FOB\V3AMFOB\package-builder\` (to be built)

Planned features:
- Checklist UI — toggle what's in/out of the snapshot
- "Rebuild Package" button — runs snapshot + asar patch + ISCC in sequence
- Progress log window
- "Open output folder" when done
- Saves the include/exclude config to a JSON file

---

## KNOWN ISSUES / GOTCHAS

| Issue | Detail |
|---|---|
| Windows 260-char path limit | Deep BACKUP folders cause Inno Setup to fail with "path not found". Exclude them. |
| `nul` device files | Some old dirs contain a file named `nul` (Windows device). PowerShell snapshot skips it but Compress-Archive chokes on it. Delete any `nul` files before zipping. |
| asar missing assets | If `assets\` folder is not explicitly copied into `_asar_tmp` before repacking, tray icon falls back to a programmatic cyan/yellow square. Always copy assets. |
| Win 11 tray overflow | Win 11 hides tray icons in the ^ overflow by default. App shows a balloon tip "still running" on first hide so user knows where it went. |
| Icon doesn't update until restart | `assets\icon.ico` is read at app startup. Replace the file then restart V3AMFOB to see the new icon. |
| npm run dist blocked | electron-builder symlink privilege issue. Use asar patch workflow. See FOB-INSTALLER-NOTES.md. |

---

## QUICK REFERENCE — FULL REBUILD FROM SCRATCH

```
1. Close V3AMFOB
2. Update renderer files if needed → asar patch (Step 1)
3. Run PowerShell snapshot (Step 2)
4. ISCC.exe FOB-Setup.iss (Step 3)
5. Copy FOB-Setup.exe to USB
```

Total time: ~5 minutes if no code changes, ~10 if asar needs repacking.

**324 Ports and paths are changed ref data**
