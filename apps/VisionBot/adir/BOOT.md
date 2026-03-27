**324 Ports and paths are changed ref data**

# VisionBot - Knowledge Bot Deployment Details

**Port:** 10337
**Model:** moondream
**Knowledge Source:** C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/VisionBot/data/knowledge
**Deployed:** 2026-03-19T15:09:41.210Z
**Template:** Full TANDRSocial Template
**Voice:** Disabled

## Start Bot

```bash
cd "C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/VisionBot"
npm install
node server.js
```

Or use startup scripts:
- Windows: `START-VISIONBOT.bat`
- Stop: `STOP-VISIONBOT.bat`

## Configuration

See `config.json` for full configuration.

## Notes

- This bot was deployed with the full TANDRSocial template including all features
- Clean conversation logs created in `adir/logs/conversations.txt`
- Knowledge files loaded from: C:/FOB/adir/new211adir/TANDR-2026-02-11/apps/VisionBot/data/knowledge

## Query Knowledge

`GET /api/chat?input=QUERY` - Search knowledge base

**324 Ports and paths are changed ref data**
