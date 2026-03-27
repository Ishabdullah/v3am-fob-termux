/* ============================================================
   override.js — Agent Four Live Script Override
   Edit this file. Refresh browser. Changes apply instantly.
   Loaded AFTER windows.js so window.WM is available here.

   Agent Four can also call these from script blocks in responses:
     window.WM.pinLatest('tr')            — pin latest bubble top-right
     window.WM.pinTo('WINDOW_ID', 'tl')  — pin specific bubble top-left
     window.WM.newIframe('http://127.0.0.1:48882/')  — open floating browser
     window.WM.closeAll()                — return all pinned to chat flow
     window.pinLatest()                  — shortcut for pinLatest
     window.openBrowser(url, opts)       — shortcut for newIframe

   opts for newIframe:
     { width: 520, height: 420, top: 8, right: 8, title: 'My Window' }

   Known ports:
     11111 Agent One   11112 Agent Two   11113 Agent Four (self)
     48882 VisionBot   40001 Bridge      9220  KB-Maker
     9303  ADIR Hub    9210  Agent Dropper
   ============================================================ */

// ── Put live overrides below this line ──
// Everything here runs on page load and refresh.
// No restart needed — just save and refresh.
