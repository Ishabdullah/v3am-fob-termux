**324 Ports and paths are changed ref data**

# SCREEN STREAM v1
Path: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\GGBOT\adir\stream.md
Tool: Live screen capture stream via browser camera API. Render HTML in reply to activate.

<div style="font-family:'Courier New',monospace;background:#090909;border:2px solid #ed1b2f;border-radius:6px;width:100%;max-width:700px;overflow:hidden;box-shadow:0 0 24px rgba(237,27,47,0.3);">

  <div style="background:#141414;padding:10px 14px;border-bottom:2px solid #ed1b2f;display:flex;align-items:center;justify-content:space-between;">
    <span style="color:#ed1b2f;font-size:13px;font-weight:bold;letter-spacing:2px;">[ SCREEN STREAM ]</span>
    <span id="ss-indicator" style="width:10px;height:10px;border-radius:50%;background:#333;display:inline-block;"></span>
  </div>

  <div style="padding:12px;background:#0d0d0d;display:flex;gap:10px;flex-wrap:wrap;border-bottom:1px solid #222;">
    <button onclick="ssStart()"
      style="background:#ed1b2f;color:#fff;border:none;padding:14px 28px;font-family:'Courier New',monospace;font-size:15px;font-weight:bold;border-radius:4px;cursor:pointer;letter-spacing:1px;"
      onmouseover="this.style.background='#c81024'" onmouseout="this.style.background='#ed1b2f'">
      &#9654; START
    </button>
    <button onclick="ssStop()"
      style="background:#1a1a1a;color:#ed1b2f;border:2px solid #ed1b2f;padding:14px 28px;font-family:'Courier New',monospace;font-size:15px;font-weight:bold;border-radius:4px;cursor:pointer;"
      onmouseover="this.style.background='#ed1b2f';this.style.color='#000'" onmouseout="this.style.background='#1a1a1a';this.style.color='#ed1b2f'">
      &#9632; STOP
    </button>
    <button onclick="ssSnap()"
      style="background:#1a1a1a;color:#ccc;border:2px solid #333;padding:14px 28px;font-family:'Courier New',monospace;font-size:15px;font-weight:bold;border-radius:4px;cursor:pointer;"
      onmouseover="this.style.borderColor='#ed1b2f';this.style.color='#ed1b2f'" onmouseout="this.style.borderColor='#333';this.style.color='#ccc'">
      &#128247; SNAP
    </button>
  </div>

  <div id="ss-status" style="padding:6px 14px;background:#0a0a0a;font-size:11px;color:#555;border-bottom:1px solid #1a1a1a;">
    IDLE — Click START to share your screen
  </div>

  <div style="background:#000;position:relative;">
    <video id="ss-video" autoplay muted playsinline
      style="width:100%;display:block;max-height:400px;background:#000;"></video>
    <canvas id="ss-canvas" style="display:none;"></canvas>
  </div>

  <div id="ss-snap-wrap" style="display:none;border-top:1px solid #222;">
    <div style="padding:6px 14px;background:#0a0a0a;font-size:11px;color:#22c55e;">SNAP CAPTURED</div>
    <img id="ss-snap-img" style="width:100%;display:block;" />
  </div>

</div>

<script>
var ssStream = null;
var ssVideo = document.getElementById('ss-video');
var ssCanvas = document.getElementById('ss-canvas');
var ssStatus = document.getElementById('ss-status');
var ssIndicator = document.getElementById('ss-indicator');

function ssSetStatus(msg, color) {
  ssStatus.textContent = msg;
  ssStatus.style.color = color || '#555';
}

function ssStart() {
  navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 15 } }, audio: false })
    .then(function(stream) {
      ssStream = stream;
      ssVideo.srcObject = stream;
      ssIndicator.style.background = '#22c55e';
      ssIndicator.style.boxShadow = '0 0 8px #22c55e';
      ssSetStatus('STREAMING LIVE', '#22c55e');
      stream.getVideoTracks()[0].addEventListener('ended', function() {
        ssStop();
      });
    })
    .catch(function(err) {
      ssSetStatus('ERROR: ' + err.message, '#ed1b2f');
    });
}

function ssStop() {
  if (ssStream) {
    ssStream.getTracks().forEach(function(t) { t.stop(); });
    ssStream = null;
  }
  ssVideo.srcObject = null;
  ssIndicator.style.background = '#333';
  ssIndicator.style.boxShadow = 'none';
  ssSetStatus('STOPPED', '#555');
}

function ssSnap() {
  if (!ssStream) { ssSetStatus('NO STREAM — start first', '#ed1b2f'); return; }
  ssCanvas.width = ssVideo.videoWidth;
  ssCanvas.height = ssVideo.videoHeight;
  ssCanvas.getContext('2d').drawImage(ssVideo, 0, 0);
  var img = document.getElementById('ss-snap-img');
  img.src = ssCanvas.toDataURL('image/jpeg', 0.85);
  var wrap = document.getElementById('ss-snap-wrap');
  wrap.style.display = 'block';
  ssSetStatus('SNAP SAVED \u2193', '#f59e0b');
}
</script>

**324 Ports and paths are changed ref data**
