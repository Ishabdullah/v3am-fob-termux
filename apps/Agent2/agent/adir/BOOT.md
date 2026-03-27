# AgentTwo Agent - Deployment Details

**Type:** jerry
**Port:** 11112
**Home:** C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\agent
**Deployed:** 2026-03-23T16:29:24.100Z
**Template:** Full Jerry Agent Template
**Knowledge Bot:** Disabled (optional)
**Voice:** Enabled

## Quick Start

```bash
cd "C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\Agent2\agent"
npm install
node server.js
```

Or use the startup scripts:
- Windows: `START-AGENTTWO.bat`
- Stop: `STOP-AGENTTWO.bat`

## Configuration

See `config.json` for full configuration.

## Notes

- This agent was deployed with the full Jerry template including all features
- Knowledge Bot linking is optional - configure in config.json if needed
- Clean conversation logs created in `adir/logs/conversations.txt`
