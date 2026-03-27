/* ============================================================
   override.js — Agent Live Script Override
   Edit this file. Refresh browser. Changes apply instantly.
   Loaded AFTER windows.js so window.WM is available here.

   Agent can call these from script blocks in responses:
     window.WM.pinLatest('tr')            — pin latest bubble top-right
     window.WM.pinTo('WINDOW_ID', 'tl')  — pin specific bubble top-left
     window.WM.newIframe('http://127.0.0.1:PORT/')   — open floating browser
     window.WM.closeAll()                — return all pinned to chat flow
     window.pinLatest()                  — shortcut for pinLatest
     window.openBrowser(url, opts)       — shortcut for newIframe

   opts for newIframe:
     { width: 520, height: 420, top: 8, left: 8, title: 'My Window' }

   Known ports:
     9303  ADIR Hub    9210  Agent Dropper   9220  KB-Maker
     40001 Bridge      48882 VisionBot
   ============================================================ */

// ── Put live overrides below this line ──
// Everything here runs on page load and refresh.
// No restart needed — just save and refresh.
