**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - BOOT LOADER                                          ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Remote\adir\BOOT.md                                                 ║
║  Updated: 2026-03-16 | The manual — remote device control.           ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Remote is a reference tool directory for controlling         ║
║  devices on the local network. Not a service — no port, no server.   ║
║  Contains reference docs for Roku ECP (External Control Protocol).   ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Remote Device Control

This directory contains reference documentation for controlling devices on the local network via their APIs. Currently: Roku TVs via ECP (External Control Protocol).

---

## Roku TV Control

The `roku.md` file is a complete reference for controlling any Roku device on the local network using curl commands. An agent with shell access can:

1. **Discover** Roku devices by scanning the network on port 8060
2. **Query** device info, installed apps, and what's currently playing
3. **Control** power, navigation, volume, media playback
4. **Launch** apps by ID (Netflix, YouTube, Hulu, etc.)
5. **Type** text character by character using `Lit_` commands
6. **Search** content across the Roku ecosystem

All commands use curl to hit the Roku's ECP API at `http://{IP}:8060/`. GET for queries, POST (with `-d ''`) for actions.

→ Full reference: [roku.md](./roku.md) — `C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\Remote\adir\roku.md`

---

## Adding New Device Types

To add control for other network devices (smart lights, speakers, etc.), create a new `.md` file in this `adir/` directory with:
- Discovery method (how to find the device)
- API reference (endpoints, methods, payloads)
- Common commands with curl examples
- Tips and gotchas

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF BOOT.md                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  → Full Roku reference:                                              ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    Remote\adir\roku.md                                               ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this, create:                                             ║
║  SOT-[YYYYMMDD]-remote-boot.md                                      ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
