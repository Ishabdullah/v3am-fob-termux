# Proxy25565 — Mobile Agent Gateway

**Type:** Transparent HTTP Proxy
**Port:** 25565 → Agent Four (11113)
**Dependencies:** None — pure Node.js built-ins only

## What It Does

Forwards all incoming HTTP traffic on port 25565 directly to Agent Four (11113). From any device it looks and behaves exactly like Agent Four — same UI, same API, same responses.

This is a pre-configured example for turning Agent Four into a mobile agent. If port 25565 is already forwarded on your router, it works immediately with no extra setup.

## Why Port 25565

25565 is the default Minecraft port — one of the most commonly pre-forwarded ports on home routers. If you've ever run a Minecraft server, that port is probably already open and ready to use.

## Quick Start

If 25565 is already forwarded on your router:
1. Launcher starts this automatically — nothing to do
2. Hit `http://YOUR_PUBLIC_IP:25565/index2.html` from your phone
3. You're talking to Agent Four from anywhere

## Using a Different Port

To use any other pre-forwarded port, edit two lines in `server.js`:

```js
const PROXY_PORT = 25565;   // ← change to your forwarded port
const TARGET_PORT = 11113;  // ← change target if proxying a different agent
```

Restart the proxy and it's live on the new port. An agent can make this change automatically if you tell it which port you have forwarded.

## Health Check

`GET /hello` returns `FOB is alive on 25565` — local ping only, not forwarded.

## Launcher

Included in Launcher4.bat. Starts automatically with the full stack and appears in the health check as `Proxy25565 :25565`.
