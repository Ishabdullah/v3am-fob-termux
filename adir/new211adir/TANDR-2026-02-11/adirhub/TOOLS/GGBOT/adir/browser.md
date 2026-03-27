**324 Ports and paths are changed ref data**

# BROWSER TOOL v1
Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\GGBOT\adir\browser.md
Tool: Iframe browser for internal IPs. Render this HTML in your reply to activate.

<div style="font-family:'Courier New',monospace;background:#090909;border:2px solid #ed1b2f;border-radius:6px;width:100%;max-width:700px;overflow:hidden;box-shadow:0 0 24px rgba(237,27,47,0.3);">

  <div style="background:#141414;padding:10px 14px;border-bottom:2px solid #ed1b2f;display:flex;align-items:center;gap:8px;">
    <span style="color:#ed1b2f;font-size:13px;font-weight:bold;letter-spacing:2px;">[ BROWSER ]</span>
    <span style="color:#444;font-size:11px;">PORT 40001 READY</span>
  </div>

  <div style="padding:12px;background:#0d0d0d;display:flex;gap:8px;align-items:center;border-bottom:1px solid #222;">
    <input id="br-url" type="text" value="http://127.0.0.1:9303"
      style="flex:1;background:#1a1a1a;border:2px solid #333;color:#fff;padding:10px 14px;font-family:'Courier New',monospace;font-size:13px;border-radius:4px;outline:none;"
      onfocus="this.style.borderColor='#ed1b2f'" onblur="this.style.borderColor='#333'" />
    <button onclick="brGo()"
      style="background:#ed1b2f;color:#fff;border:none;padding:12px 22px;font-family:'Courier New',monospace;font-size:14px;font-weight:bold;border-radius:4px;cursor:pointer;letter-spacing:1px;min-width:80px;"
      onmouseover="this.style.background='#c81024'" onmouseout="this.style.background='#ed1b2f'">
      GO
    </button>
    <button onclick="brRefresh()"
      style="background:#1a1a1a;color:#ed1b2f;border:2px solid #ed1b2f;padding:12px 18px;font-family:'Courier New',monospace;font-size:14px;font-weight:bold;border-radius:4px;cursor:pointer;"
      onmouseover="this.style.background='#ed1b2f';this.style.color='#000'" onmouseout="this.style.background='#1a1a1a';this.style.color='#ed1b2f'">
      &#8635;
    </button>
  </div>

  <div style="padding:8px 12px;background:#0a0a0a;display:flex;gap:8px;flex-wrap:wrap;border-bottom:1px solid #1a1a1a;">
    <button onclick="brLoad('http://127.0.0.1:9303')"
      style="background:#1a1a1a;color:#ccc;border:1px solid #333;padding:10px 16px;font-family:'Courier New',monospace;font-size:12px;border-radius:4px;cursor:pointer;font-weight:bold;"
      onmouseover="this.style.borderColor='#ed1b2f';this.style.color='#ed1b2f'" onmouseout="this.style.borderColor='#333';this.style.color='#ccc'">HUB :9303</button>
    <button onclick="brLoad('http://127.0.0.1:9210')"
      style="background:#1a1a1a;color:#ccc;border:1px solid #333;padding:10px 16px;font-family:'Courier New',monospace;font-size:12px;border-radius:4px;cursor:pointer;font-weight:bold;"
      onmouseover="this.style.borderColor='#ed1b2f';this.style.color='#ed1b2f'" onmouseout="this.style.borderColor='#333';this.style.color='#ccc'">DROPPER :9210</button>
    <button onclick="brLoad('http://127.0.0.1:9220')"
      style="background:#1a1a1a;color:#ccc;border:1px solid #333;padding:10px 16px;font-family:'Courier New',monospace;font-size:12px;border-radius:4px;cursor:pointer;font-weight:bold;"
      onmouseover="this.style.borderColor='#ed1b2f';this.style.color='#ed1b2f'" onmouseout="this.style.borderColor='#333';this.style.color='#ccc'">KB-MAKER :9220</button>
    <button onclick="brLoad('http://127.0.0.1:11113')"
      style="background:#1a1a1a;color:#ccc;border:1px solid #333;padding:10px 16px;font-family:'Courier New',monospace;font-size:12px;border-radius:4px;cursor:pointer;font-weight:bold;"
      onmouseover="this.style.borderColor='#ed1b2f';this.style.color='#ed1b2f'" onmouseout="this.style.borderColor='#333';this.style.color='#ccc'">AGENT FOUR :11113</button>
    <button onclick="brLoad('http://127.0.0.1:9230')"
      style="background:#1a1a1a;color:#ccc;border:1px solid #333;padding:10px 16px;font-family:'Courier New',monospace;font-size:12px;border-radius:4px;cursor:pointer;font-weight:bold;"
      onmouseover="this.style.borderColor='#ed1b2f';this.style.color='#ed1b2f'" onmouseout="this.style.borderColor='#333';this.style.color='#ccc'">IMAGEGEN :9230</button>
    <button onclick="brLoad('http://127.0.0.1:40001/health')"
      style="background:#1a1a1a;color:#ccc;border:1px solid #333;padding:10px 16px;font-family:'Courier New',monospace;font-size:12px;border-radius:4px;cursor:pointer;font-weight:bold;"
      onmouseover="this.style.borderColor='#ed1b2f';this.style.color='#ed1b2f'" onmouseout="this.style.borderColor='#333';this.style.color='#ccc'">BRIDGE :40001</button>
  </div>

  <div id="br-status" style="padding:6px 14px;background:#0d0d0d;font-size:11px;color:#555;border-bottom:1px solid #1a1a1a;min-height:24px;">READY</div>

  <iframe id="br-frame" src="http://127.0.0.1:9303" style="width:100%;height:480px;border:none;background:#111;display:block;" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>

</div>

<script>
function brLoad(url){document.getElementById('br-url').value=url;var s=document.getElementById('br-status');s.textContent='LOADING \u2192 '+url;s.style.color='#ed1b2f';document.getElementById('br-frame').src=url;setTimeout(function(){s.style.color='#22c55e';s.textContent='LOADED \u2192 '+url;},1200);}
function brGo(){brLoad(document.getElementById('br-url').value.trim());}
function brRefresh(){var f=document.getElementById('br-frame');var u=f.src;f.src='';var s=document.getElementById('br-status');s.textContent='REFRESHING...';s.style.color='#f59e0b';setTimeout(function(){f.src=u;s.textContent='REFRESHED';s.style.color='#22c55e';},200);}
document.getElementById('br-url').addEventListener('keydown',function(e){if(e.key==='Enter')brGo();});
</script>

**324 Ports and paths are changed ref data**
