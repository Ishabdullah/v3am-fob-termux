/**
 * V3AM FOB Dashboard — Browser App
 *
 * Replaces the Electron renderer (renderer/app.js).
 * All window.fob.* IPC calls replaced with fetch() to http://127.0.0.1:9399/
 * Connects to the launcher's SSE stream for live updates.
 */

'use strict';

// ── State ─────────────────────────────────────────────────────────────────

let services    = [];
let endpoints   = [];
let activeLog   = '_system';
let logPaused   = false;
let rackVisible = false;
let logVisible  = false;
let globalZoom  = 1.0;
let zoomHudTimer= null;
let skinConfig  = {};
let manualServices = new Set();

const API = 'http://127.0.0.1:9399';

// ── API helpers ───────────────────────────────────────────────────────────

async function api(method, path, body) {
  try {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(API + path, opts);
    return r.json();
  } catch (e) {
    console.error('[API]', method, path, e.message);
    return null;
  }
}

// ── SSE live updates ──────────────────────────────────────────────────────

function connectSSE() {
  const es = new EventSource(API + '/events');

  es.onmessage = (e) => {
    try {
      const msg = JSON.parse(e.data);

      if (msg.type === 'snapshot') {
        services  = msg.services  || [];
        endpoints = msg.endpoints || endpoints;
        buildEndpointTabs();
        buildRack();
        buildLogTabs();
        updateFleetSummary();
      }

      if (msg.type === 'status') {
        const svc = services.find(s => s.id === msg.id);
        if (svc) {
          svc.status = msg.status;
          updateCard(msg.id, msg.status);
          updateFleetSummary();
        }
      }

      if (msg.type === 'log') {
        if (msg.id === activeLog) appendLogLine(msg.line);
      }
    } catch (_) {}
  };

  es.onerror = () => {
    // Auto-reconnect after 3s
    es.close();
    setTimeout(connectSSE, 3000);
  };
}

// ── Status icons ──────────────────────────────────────────────────────────

const STATUS_ICON  = { up: '●', starting: '◌', down: '○' };
const STATUS_LABEL = { up: 'UP', starting: '...', down: 'DOWN' };

// ── Endpoint tabs ─────────────────────────────────────────────────────────

function buildEndpointTabs() {
  const nav = document.getElementById('endpoint-tabs');
  nav.innerHTML = '';

  endpoints.forEach((ep, i) => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;gap:2px;flex-shrink:0;';

    const btn = document.createElement('button');
    btn.className = 'ep-tab' + (i === 0 ? ' active' : '');
    btn.textContent = ep.label;
    btn.dataset.index = i;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ep-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadEndpoint(ep.url);
    });

    const ext = document.createElement('button');
    ext.className = 'icon-btn small';
    ext.textContent = '↗';
    ext.title = `Open ${ep.label} externally`;
    ext.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(ep.url, '_blank');
    });

    wrap.appendChild(btn);
    wrap.appendChild(ext);
    nav.appendChild(wrap);
  });
}

function loadEndpoint(url) {
  document.getElementById('main-frame').src = url;
}

// ── Server Rack ────────────────────────────────────────────────────────────

function buildRack() {
  const scroll = document.getElementById('rack-scroll');
  scroll.innerHTML = '';

  const groups = [...new Set(services.map(s => s.group))];
  for (const group of groups) {
    const groupEl = document.createElement('div');
    groupEl.className = 'rack-group';

    const label = document.createElement('div');
    label.className = 'rack-group-label';
    label.textContent = group;
    groupEl.appendChild(label);

    const row = document.createElement('div');
    row.className = 'rack-row';

    services.filter(s => s.group === group).forEach(svc => row.appendChild(buildCard(svc)));
    groupEl.appendChild(row);
    scroll.appendChild(groupEl);
  }
  updateRackCounts();
}

async function cardAction(id, action) {
  const btn = document.querySelector(`#card-${id} .card-btn-${action}`);
  if (btn) { btn.disabled = true; btn.textContent = '…'; }
  try {
    await fetch(`${API}/${action}/${id}`, { method: 'POST' });
  } catch (_) {}
}

function buildCard(svc) {
  const card = document.createElement('div');
  const s    = svc.status || 'down';
  const isUp = s === 'up' || s === 'starting';
  card.className = `rack-card status-${s}`;
  card.id = `card-${svc.id}`;

  card.innerHTML = `
    <div class="card-name" title="${svc.name}">${svc.name}</div>
    <div class="card-port">:${svc.port}</div>
    <div class="card-status">
      <span class="status-dot">${STATUS_ICON[s] || '○'}</span>
      <span class="status-text">${STATUS_LABEL[s] || 'DOWN'}</span>
    </div>
    <div class="card-controls">
      <button class="card-btn card-btn-start"   title="Start"   ${isUp   ? 'disabled' : ''}>▶</button>
      <button class="card-btn card-btn-restart" title="Restart"                            >↺</button>
      <button class="card-btn card-btn-stop"    title="Stop"    ${!isUp  ? 'disabled' : ''}>■</button>
    </div>
  `;

  card.querySelector('.card-btn-start')  .addEventListener('click', e => { e.stopPropagation(); cardAction(svc.id, 'start');   });
  card.querySelector('.card-btn-restart').addEventListener('click', e => { e.stopPropagation(); cardAction(svc.id, 'restart'); });
  card.querySelector('.card-btn-stop')   .addEventListener('click', e => { e.stopPropagation(); cardAction(svc.id, 'stop');    });

  // Click card → load in iframe
  card.addEventListener('click', () => loadEndpoint(`http://127.0.0.1:${svc.port}/`));

  return card;
}

function updateCard(id, s) {
  const card = document.getElementById(`card-${id}`);
  if (!card) return;
  card.className = `rack-card status-${s}`;
  card.querySelector('.status-dot').textContent  = STATUS_ICON[s]  || '○';
  card.querySelector('.status-text').textContent = STATUS_LABEL[s] || 'DOWN';
  const isUp = s === 'up' || s === 'starting';
  const startBtn   = card.querySelector('.card-btn-start');
  const stopBtn    = card.querySelector('.card-btn-stop');
  const restartBtn = card.querySelector('.card-btn-restart');
  if (startBtn)   { startBtn.disabled   = isUp;  startBtn.textContent   = '▶'; }
  if (stopBtn)    { stopBtn.disabled    = !isUp; stopBtn.textContent    = '■'; }
  if (restartBtn) { restartBtn.disabled = false; restartBtn.textContent = '↺'; }
  updateRackCounts();
}

function updateRackCounts() {
  const up       = services.filter(s => s.status === 'up').length;
  const total    = services.length;
  const starting = services.filter(s => s.status === 'starting').length;
  const el = document.getElementById('rack-counts');
  if (el) el.textContent = `${up}/${total} UP${starting ? `  ${starting} starting` : ''}`;
}

function updateFleetSummary() {
  const up    = services.filter(s => s.status === 'up').length;
  const total = services.length;
  const el    = document.getElementById('fleet-summary');
  if (!el) return;
  el.textContent = `${up}/${total}`;
  el.className = up === total ? 'fleet-all-up' : up > total * 0.7 ? 'fleet-mostly-up' : 'fleet-degraded';
}

// ── Log viewer ────────────────────────────────────────────────────────────

function buildLogTabs() {
  const tabBar = document.getElementById('log-tabs');
  tabBar.innerHTML = '';

  const sysTab = buildLogTab({ id: '_system', name: 'System' });
  tabBar.appendChild(sysTab);
  services.forEach(svc => tabBar.appendChild(buildLogTab(svc)));

  if (!activeLog) selectLogTab('_system');
}

function buildLogTab(svc) {
  const btn = document.createElement('button');
  btn.className = 'log-tab' + (svc.id === activeLog ? ' active' : '');
  btn.dataset.id = svc.id;
  btn.textContent = svc.name || svc.id;
  btn.addEventListener('click', () => selectLogTab(svc.id));
  return btn;
}

function selectLogTab(id) {
  activeLog = id;
  document.querySelectorAll('.log-tab').forEach(b => b.classList.toggle('active', b.dataset.id === id));

  // Fetch existing logs
  api('GET', `/logs/${id}`).then(data => {
    const out = document.getElementById('log-output');
    out.innerHTML = '';
    if (data && data.logs) {
      for (const line of data.logs) appendLogLine(line);
    }
  });
}

function appendLogLine(line) {
  if (logPaused) return;
  const out = document.getElementById('log-output');
  const div = document.createElement('div');
  div.className = 'log-line';
  if (/\[ERR\]|FATAL|error/i.test(line))  div.classList.add('log-line-err');
  if (/\[WARN\]|warning/i.test(line))     div.classList.add('log-line-warn');
  if (/\[START\]|RUNNING|UP/i.test(line)) div.classList.add('log-line-ok');
  div.textContent = line;
  out.appendChild(div);
  // Auto-scroll
  out.scrollTop = out.scrollHeight;
  // Limit visible lines
  while (out.children.length > 500) out.removeChild(out.firstChild);
}

// ── Zoom ──────────────────────────────────────────────────────────────────

function showZoomHud(label) {
  const hud = document.getElementById('zoom-hud');
  hud.textContent = label;
  hud.classList.add('visible');
  clearTimeout(zoomHudTimer);
  zoomHudTimer = setTimeout(() => hud.classList.remove('visible'), 1200);
}

function applyZoom() {
  document.getElementById('layout').style.fontSize = `${globalZoom}em`;
}

// ── Settings ──────────────────────────────────────────────────────────────

function openSettings() {
  // Build endpoint editor
  const editor = document.getElementById('endpoint-editor');
  editor.innerHTML = '';
  for (const ep of endpoints) {
    addEndpointRow(ep.label, ep.url, editor);
  }

  // Build service start list
  const list = document.getElementById('service-start-list');
  list.innerHTML = '';
  for (const svc of services) {
    const row = document.createElement('div');
    row.className = 'svc-start-row';
    row.innerHTML = `
      <span style="flex:1;font-size:0.85em;">${svc.name}</span>
      <select data-id="${svc.id}">
        <option value="auto"   ${!manualServices.has(svc.id) ? 'selected' : ''}>Auto</option>
        <option value="manual" ${manualServices.has(svc.id)  ? 'selected' : ''}>Manual</option>
      </select>
    `;
    list.appendChild(row);
  }

  document.getElementById('settings-overlay').classList.remove('hidden');
}

function addEndpointRow(label = '', url = '', container) {
  const c = container || document.getElementById('endpoint-editor');
  const row = document.createElement('div');
  row.className = 'endpoint-row';
  row.innerHTML = `
    <input class="label-input" type="text" placeholder="Label" value="${label}">
    <input class="url-input"   type="text" placeholder="http://127.0.0.1:PORT/" value="${url}">
    <button class="icon-btn small remove-ep" title="Remove">✕</button>
  `;
  row.querySelector('.remove-ep').addEventListener('click', () => row.remove());
  c.appendChild(row);
}

async function saveSettings() {
  // Read endpoints
  const newEndpoints = [];
  document.querySelectorAll('#endpoint-editor .endpoint-row').forEach(row => {
    const label = row.querySelector('.label-input').value.trim();
    const url   = row.querySelector('.url-input').value.trim();
    if (label && url) newEndpoints.push({ label, url });
  });

  // Read manual services
  const newManual = [];
  document.querySelectorAll('#service-start-list select').forEach(sel => {
    if (sel.value === 'manual') newManual.push(sel.dataset.id);
  });

  // Read skin
  const fontSize  = parseInt(document.getElementById('skin-fontsize').value, 10);
  const textColor = document.getElementById('skin-textcolor').value;

  skinConfig = { ...skinConfig, fontSize, textColor };
  applySkin(skinConfig);

  const result = await api('POST', '/config', {
    endpoints:      newEndpoints,
    manualServices: newManual,
    skin:           skinConfig
  });

  if (result && result.ok) {
    endpoints       = newEndpoints;
    manualServices  = new Set(newManual);
    buildEndpointTabs();
  }

  document.getElementById('settings-overlay').classList.add('hidden');
}

function applySkin(skin) {
  skinConfig = skin || {};
  const root = document.documentElement;
  if (skin.fontSize)  root.style.setProperty('--font-size-base', skin.fontSize  + 'px');
  if (skin.textColor) root.style.setProperty('--text',           skin.textColor);
}

// ── postMessage bridge (iframe → dashboard) ───────────────────────────────

window.addEventListener('message', (e) => {
  const d = e.data;
  if (!d || typeof d !== 'object') return;

  if (d.type === 'fob-css' && d.var && d.value !== undefined) {
    document.documentElement.style.setProperty(d.var, d.value);
  }

  if (d.type === 'fob-skin' && d.skin && typeof d.skin === 'object') {
    applySkin({ ...skinConfig, ...d.skin });
  }
});

// ── Init ──────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', async () => {

  // Load config for skin/panels
  const configData = await api('GET', '/config');
  if (configData && configData.config) {
    const c = configData.config;
    if (c.globalZoom) { globalZoom = c.globalZoom; applyZoom(); }
    if (c.skin)       { skinConfig = c.skin; applySkin(c.skin); }
    if (Array.isArray(c.manualServices)) manualServices = new Set(c.manualServices);
    // Update skin controls
    if (c.skin) {
      if (c.skin.fontSize)  document.getElementById('skin-fontsize').value   = c.skin.fontSize;
      if (c.skin.textColor) document.getElementById('skin-textcolor').value  = c.skin.textColor;
    }
  }

  // Start SSE connection (populates services & endpoints via snapshot)
  connectSSE();

  // After initial snapshot, load default endpoint
  setTimeout(() => {
    if (endpoints.length > 0) {
      loadEndpoint(endpoints[0].url);
    }
  }, 2000);

  // ── Toggle buttons ─────────────────────────────────────────────────────
  document.getElementById('toggle-rack').addEventListener('click', () => {
    rackVisible = !rackVisible;
    const rack = document.getElementById('rack-panel');
    rack.classList.toggle('hidden', !rackVisible);
    document.getElementById('toggle-rack').classList.toggle('active', rackVisible);
  });

  document.getElementById('toggle-logs').addEventListener('click', () => {
    logVisible = !logVisible;
    const log  = document.getElementById('log-panel');
    log.classList.toggle('hidden', !logVisible);
    document.getElementById('toggle-logs').classList.toggle('active', logVisible);
    if (logVisible && !activeLog) selectLogTab('_system');
  });

  document.getElementById('toggle-fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  document.getElementById('clear-log').addEventListener('click', () => {
    document.getElementById('log-output').innerHTML = '';
  });

  // Start rack and log hidden
  document.getElementById('rack-panel').classList.add('hidden');
  document.getElementById('log-panel').classList.add('hidden');

  // ── Settings ───────────────────────────────────────────────────────────
  document.getElementById('open-settings').addEventListener('click', openSettings);
  document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('settings-overlay').classList.add('hidden');
  });
  document.getElementById('settings-cancel').addEventListener('click', () => {
    document.getElementById('settings-overlay').classList.add('hidden');
  });
  document.getElementById('settings-save').addEventListener('click', saveSettings);
  document.getElementById('add-endpoint').addEventListener('click', () => addEndpointRow());

  document.getElementById('settings-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('settings-overlay')) {
      document.getElementById('settings-overlay').classList.add('hidden');
    }
  });

  document.getElementById('copy-base-url').addEventListener('click', () => {
    navigator.clipboard.writeText('http://127.0.0.1:9399').catch(() => {});
  });

  // ── Font size slider ───────────────────────────────────────────────────
  const fsSlider = document.getElementById('skin-fontsize');
  const fsVal    = document.getElementById('skin-fontsize-val');
  fsSlider.addEventListener('input', () => {
    fsVal.textContent = fsSlider.value + 'px';
    document.documentElement.style.setProperty('--font-size-base', fsSlider.value + 'px');
  });

  // ── Text color ─────────────────────────────────────────────────────────
  document.getElementById('skin-textcolor').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--text', e.target.value);
  });

  document.querySelectorAll('.color-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const c = chip.dataset.color;
      document.getElementById('skin-textcolor').value = c;
      document.documentElement.style.setProperty('--text', c);
    });
  });

  // ── Ctrl+scroll global zoom ────────────────────────────────────────────
  window.addEventListener('wheel', (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const step = e.deltaY > 0 ? -0.05 : 0.05;
    globalZoom = Math.max(0.3, Math.min(3.0, globalZoom + step));
    applyZoom();
    showZoomHud(`ZOOM  ${Math.round(globalZoom * 100)}%`);
  }, { passive: false });

  // ── Pinch-to-zoom on touch (S24 Ultra) ────────────────────────────────
  let lastDist = null;
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastDist = Math.sqrt(dx*dx + dy*dy);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 2 || !lastDist) return;
    const dx   = e.touches[0].clientX - e.touches[1].clientX;
    const dy   = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const delta= (dist - lastDist) / 200;
    lastDist = dist;
    globalZoom = Math.max(0.3, Math.min(3.0, globalZoom + delta));
    applyZoom();
    showZoomHud(`ZOOM  ${Math.round(globalZoom * 100)}%`);
  }, { passive: true });

  window.addEventListener('touchend', () => { lastDist = null; });
});
