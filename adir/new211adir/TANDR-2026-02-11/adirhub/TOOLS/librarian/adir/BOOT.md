**324 Ports and paths are changed ref data**

# librarian - Knowledge Bot Deployment Details

**Port:** 57785
**Model:** glm-5:cloud
**Knowledge Source:** C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\librarian\adir
**Deployed:** 2026-03-22T00:07:23.761Z
**Template:** Full TANDRSocial Template
**Voice:** Enabled

## Start Bot

```bash
cd "C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\librarian\bot"
npm install
node server.js
```

Or use startup scripts:
- Windows: `START-LIBRARIAN.bat`
- Stop: `STOP-LIBRARIAN.bat`

## Configuration

See `config.json` for full configuration.

## Notes

- This bot was deployed with the full TANDRSocial template including all features
- Clean conversation logs created in `adir/logs/conversations.txt`
- Knowledge files loaded from: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\librarian\adir

## Query Knowledge

`GET /api/chat?input=QUERY` - Search knowledge base

**324 Ports and paths are changed ref data**
