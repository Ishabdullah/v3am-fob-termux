**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  Remote\adir\working.md                                              ║
║  Updated: 2026-03-16 | How remote device control works.              ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: Agents with shell access can control network devices using   ║
║  curl commands documented here.                                      ║
║                                                                      ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How Remote Control Works

Agents with shell access (via `[TOOL_CALL: shell_command]` or similar) can control devices on the local network by sending HTTP requests to their APIs. The reference docs in this directory provide the exact curl commands.

---

## The Pattern

Most smart devices expose a local HTTP API:

1. **Discovery** — scan the network (ARP table or port scan) to find devices
2. **Identification** — query the device's info endpoint to confirm what it is
3. **Control** — send POST requests to action endpoints (power, navigate, play, etc.)
4. **Query** — send GET requests to status endpoints (what's playing, what's installed)

The Roku ECP (External Control Protocol) on port 8060 is the reference implementation of this pattern. Other devices (Chromecast, smart lights, etc.) follow similar patterns with different ports and endpoint structures.

---

## Agent Integration

An agent that reads `roku.md` gains the ability to:
- Find Roku TVs on the network
- Turn them on/off
- Navigate menus
- Launch apps (Netflix, YouTube, etc.)
- Type search queries
- Control volume and playback

This works because the agent has shell access to run curl commands. The Roku doesn't know or care that an AI is sending the commands — it just sees HTTP requests from the local network.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
