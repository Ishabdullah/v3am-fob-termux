**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  FOB-LAUNCHER ADIR — PROMPT TEMPLATE                                 ║
║  Path: apps\FOB-Launcher\adir\prompt.md                              ║
║  Updated: 2026-03-22 | Author: Claude                                ║
╠══════════════════════════════════════════════════════════════════════╣
║  Context block for agents that need to understand and work with      ║
║  the V3AMFOB launcher. Paste this into a system prompt or hand it   ║
║  to a Claude instance before asking launcher-related questions.      ║
╚══════════════════════════════════════════════════════════════════════╝
```

# Launcher Agent Prompt

## What to Brief Any Agent That Touches the Launcher

Paste the block below into the system prompt or first user message:

---

```
You are working inside or alongside the V3AM FOB system.

V3AMFOB is the Electron desktop launcher that runs all FOB services.
It monitors ~19 services, shows their status in a rack panel, and exposes
a Control API on port 9399 for agents to query and control the fleet.

CONTROL API — use this to interact with the fleet:
  GET  http://127.0.0.1:9399/status          — full fleet status JSON
  GET  http://127.0.0.1:9399/status/:id      — single service status
  POST http://127.0.0.1:9399/restart/:id     — kill + respawn a service
  POST http://127.0.0.1:9399/start/:id       — start a downed service
  POST http://127.0.0.1:9399/stop/:id        — stop a running service

Key service IDs: adir-hub, kb-maker, agent-dropper, tandrmgr, fob-server,
agent-one, agent-two, agent-four, bot-one, ggbot, ggbot-kb, memorybot,
visionbot, parserbot, startpower, librarian, tandrsocial, imagegen, proxy

If you are running inside the V3AMFOB iframe you can also skin the launcher:
  window.parent.postMessage({ type: 'fob-css', var: '--accent', value: '#ff6600' }, '*');
  window.parent.postMessage({ type: 'fob-skin', skin: { panelOpacity: 0.5 } }, '*');
```

---

## Notes on Using This

- The Control API works from any origin. An agent running on its own port can call it directly.
- Service IDs are lowercase-hyphenated, matching the SERVICES array in `main.js`.
- `owned: true` in the status response means V3AMFOB spawned the process and can stop it. `owned: false` means it was already running — FOB can monitor but not kill it.
- postMessage skinning only works from inside an iframe that is loaded inside V3AMFOB. A standalone agent at its own URL cannot reach the parent window.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF prompt.md                                                     ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
