**324 Ports and paths are changed ref data**

# Roku TV Remote Control

You can control any Roku device on the local network using curl commands via your shell_command tool.

---

## Step 1: Find Roku Devices

Scan the network for devices, then check port 8060 on each one:

```
[TOOL_CALL: shell_command | command=arp -a]
```

For each IP that responds, check if it's a Roku:

```
[TOOL_CALL: shell_command | command=curl -s --connect-timeout 2 http://{IP}:8060/query/device-info]
```

If you get XML back with `<vendor-name>Roku</vendor-name>`, that's a Roku. Note the IP, device name, and location from the response.

Check if you have full control:
- `<ecp-setting-mode>enabled</ecp-setting-mode>` = Full control
- `<ecp-setting-mode>limited</ecp-setting-mode>` = Limited (device info only)

---

## Step 2: Get Device Info

Once you know a Roku IP, you can query it:

```
[TOOL_CALL: shell_command | command=curl -s http://{IP}:8060/query/device-info]
```

Returns: device name, model, location, software version, screen size, network info.

---

## Step 3: Check What's Playing

```
[TOOL_CALL: shell_command | command=curl -s http://{IP}:8060/query/active-app]
```

---

## Step 4: List Installed Apps

```
[TOOL_CALL: shell_command | command=curl -s http://{IP}:8060/query/apps]
```

Each app has an ID you'll need to launch it. Common app IDs:
- Netflix = 12
- Prime Video = 13
- Hulu = 2285
- Disney+ = 291097
- YouTube = 837
- HBO Max = 61322
- Apple TV = 551012
- Pluto TV = 74519
- Roku Channel = 151908

App IDs vary by device. Always check with query/apps first.

---

## Commands Reference

Replace `{IP}` with the Roku's IP address.

### Power
```
curl -d '' http://{IP}:8060/keypress/PowerOn
curl -d '' http://{IP}:8060/keypress/PowerOff
```

### Navigation
```
curl -d '' http://{IP}:8060/keypress/Home
curl -d '' http://{IP}:8060/keypress/Up
curl -d '' http://{IP}:8060/keypress/Down
curl -d '' http://{IP}:8060/keypress/Left
curl -d '' http://{IP}:8060/keypress/Right
curl -d '' http://{IP}:8060/keypress/Select
curl -d '' http://{IP}:8060/keypress/Back
curl -d '' http://{IP}:8060/keypress/Info
```

### Volume
```
curl -d '' http://{IP}:8060/keypress/VolumeUp
curl -d '' http://{IP}:8060/keypress/VolumeDown
curl -d '' http://{IP}:8060/keypress/VolumeMute
```

### Media Playback
```
curl -d '' http://{IP}:8060/keypress/Play
curl -d '' http://{IP}:8060/keypress/Pause
curl -d '' http://{IP}:8060/keypress/Fwd
curl -d '' http://{IP}:8060/keypress/Rev
curl -d '' http://{IP}:8060/keypress/InstantReplay
```

### Launch Apps
```
curl -d '' http://{IP}:8060/launch/{app_id}
```

Examples:
```
curl -d '' http://{IP}:8060/launch/837        # YouTube
curl -d '' http://{IP}:8060/launch/12         # Netflix
curl -d '' http://{IP}:8060/launch/2285       # Hulu
curl -d '' http://{IP}:8060/launch/291097     # Disney+
```

### Type Text (one character at a time)
```
curl -d '' http://{IP}:8060/keypress/Lit_H
curl -d '' http://{IP}:8060/keypress/Lit_e
curl -d '' http://{IP}:8060/keypress/Lit_l
curl -d '' http://{IP}:8060/keypress/Lit_l
curl -d '' http://{IP}:8060/keypress/Lit_o
```

Use `Lit_` followed by any character. For spaces use `Lit_%20`. For special characters use URL encoding.

### Search (launch search and type)
```
curl -d '' http://{IP}:8060/keypress/Home
curl -d '' http://{IP}:8060/search/browse?keyword=funny+cats
```

---

## Tips

- Always query device-info first to confirm the IP is still a Roku
- Check ecp-setting-mode before trying commands — limited mode blocks most actions
- Power commands work even when the TV screen is off
- There's a slight delay between commands — add a 1 second pause between rapid key presses
- All commands use POST (the `-d ''` flag) except queries which use GET
- If a command fails silently, the TV might be powered off at the wall

---

## Quick Discovery Script

To find all Rokus on a 10.0.0.x network in one shot:

```
[TOOL_CALL: shell_command | command=for /L %i in (1,1,254) do @curl -s --connect-timeout 1 http://10.0.0.%i:8060/query/device-info 2>nul | findstr "friendly-device-name" && echo  = 10.0.0.%i]
```

This scans every IP and prints the name of any Roku it finds.

**324 Ports and paths are changed ref data**
