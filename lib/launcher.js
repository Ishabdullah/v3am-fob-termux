'use strict';
/**
 * V3AM FOB Launcher — Termux Edition
 *
 * Replaces the Electron main.js.
 * - Spawns all services as child processes
 * - Port polling every 5s for health checks
 * - REST control API on port 9399
 * - Serves the browser dashboard at http://localhost:9399/
 * - Log collection per service
 * - WebSocket support for live log streaming
 *
 * NO Electron. NO Windows paths. NO PHP. NO .bat scripts.
 */

const { spawn, execSync } = require('child_process');
const net     = require('net');
const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');

// ── Paths ─────────────────────────────────────────────────────────────────

const HOME          = process.env.HOME || '/data/data/com.termux/files/home';
const FOB_ROOT      = process.env.FOB_ROOT      || path.join(HOME, 'fob');
const SERVICES_ROOT = process.env.SERVICES_ROOT || path.join(FOB_ROOT, 'adir', 'new211adir', 'TANDR-2026-02-11');
const CONFIG_PATH   = process.env.FOB_CONFIG    || path.join(FOB_ROOT, 'config', 'fob-config.json');
const DASHBOARD_DIR = path.join(__dirname, '..', 'dashboard');

// ── Services definition (mirrors main.js SERVICES array) ─────────────────

const SERVICES = [
  // ── Core ──────────────────────────────────────────────────────────────────
  { id: 'adir-hub',      name: 'ADIR Hub',         port: 9303,  group: 'Core',       cwd: `${SERVICES_ROOT}/adirhub`,                                      cmd: 'node', args: ['server.js'] },
  { id: 'kb-maker',      name: 'KB-Maker v2',       port: 9220,  group: 'Core',       cwd: `${SERVICES_ROOT}/adirhub/TOOLS/KB-Maker-v2`,                    cmd: 'node', args: ['server.js'] },
  { id: 'agent-dropper', name: 'Agent-Dropper',     port: 9210,  group: 'Core',       cwd: `${SERVICES_ROOT}/adirhub/TOOLS/Agent-Dropper-v2`,               cmd: 'node', args: ['server.js'] },
  { id: 'tandrmgr',      name: 'TANDRmgr-lab',      port: 8086,  group: 'Core',       cwd: `${SERVICES_ROOT}/apps/TANDRmgr-lab`,                            cmd: 'node', args: ['server.js'] },
  { id: 'fob-server',    name: 'FOB Server',        port: 8100,  group: 'Core',       cwd: FOB_ROOT,                                                         cmd: 'node', args: ['fob-server.js'] },
  // ── Agents ────────────────────────────────────────────────────────────────
  { id: 'agent-one',     name: 'Agent One',         port: 11111, group: 'Agents',     cwd: `${SERVICES_ROOT}/apps/Agent1`,                                  cmd: 'node', args: ['server.js'] },
  { id: 'agent-two',     name: 'Agent Two',         port: 11112, group: 'Agents',     cwd: `${SERVICES_ROOT}/apps/Agent2/agent`,                            cmd: 'node', args: ['server.js'] },
  { id: 'agent-four',    name: 'Agent Four',        port: 11113, group: 'Agents',     cwd: `${SERVICES_ROOT}/apps/Agent4`,                                  cmd: 'node', args: ['server.js'] },
  { id: 'bot-one',       name: 'Bot One',           port: 11114, group: 'Agents',     cwd: `${SERVICES_ROOT}/apps/Bot1`,                                    cmd: 'node', args: ['server.js'] },
  // ── Bots ──────────────────────────────────────────────────────────────────
  { id: 'ggbot',         name: 'GGBot',             port: 10336, group: 'Bots',       cwd: `${SERVICES_ROOT}/adirhub/TOOLS/GGBOT`,                          cmd: 'node', args: ['server.js'] },
  { id: 'ggbot-kb',      name: 'GGBot @KBMkr',      port: 10333, group: 'Bots',       cwd: `${SERVICES_ROOT}/adirhub/TOOLS/KB-Maker-v2/adir`,               cmd: 'node', args: ['server.js'] },
  { id: 'memorybot',     name: 'Memory Bot',        port: 8091,  group: 'Bots',       cwd: `${SERVICES_ROOT}/apps/TANDRmgr-lab/bot`,                        cmd: 'npm',  args: ['start'] },
  { id: 'visionbot',     name: 'VisionBot',         port: 10337, group: 'Bots',       cwd: `${SERVICES_ROOT}/apps/VisionBot`,                               cmd: 'node', args: ['server.js'] },
  { id: 'parserbot',     name: 'ParserBot',         port: 10108, group: 'Bots',       cwd: `${SERVICES_ROOT}/adirhub/TOOLS/Parser/ParserBot`,               cmd: 'node', args: ['server.js'] },
  // ── KB Agents ─────────────────────────────────────────────────────────────
  { id: 'startpower',    name: 'StartPower',        port: 57775, group: 'KB Agents',  cwd: `${SERVICES_ROOT}/adirhub/TOOLS/StartPower`,                     cmd: 'node', args: ['server.js'] },
  { id: 'librarian',     name: 'Librarian',         port: 57785, group: 'KB Agents',  cwd: `${SERVICES_ROOT}/adirhub/TOOLS/librarian/bot`,                  cmd: 'node', args: ['server.js'] },
  { id: 'tandrsocial',   name: 'TANDRSocial',       port: 57790, group: 'KB Agents',  cwd: `${SERVICES_ROOT}/adirhub/TOOLS/TEMPLATE-TANDRSOCIAL-v2`,        cmd: 'node', args: ['server.js'] },
  // ── Supporting ────────────────────────────────────────────────────────────
  { id: 'imagegen',      name: 'ImageGen',          port: 9230,  group: 'Supporting', cwd: `${SERVICES_ROOT}/apps/ImageGen`,                                cmd: 'node', args: ['server.js'] },
  { id: 'proxy',         name: 'Proxy25565',        port: 25565, group: 'Supporting', cwd: `${SERVICES_ROOT}/apps/Proxy25565`,                              cmd: 'node', args: ['server.js'] },
];

// ── State ──────────────────────────────────────────────────────────────────

const processes = new Map();  // id → ChildProcess
const logs      = new Map();  // id → string[]
const statusMap = new Map();  // id → 'up'|'down'|'starting'
const sseClients= new Set();  // Server-Sent Events clients

let config       = {};
let ENDPOINTS    = [];
let MANUAL_SERVICES = new Set();

// ── Config ─────────────────────────────────────────────────────────────────

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      if (Array.isArray(data.endpoints) && data.endpoints.length) {
        ENDPOINTS = data.endpoints;
      }
      if (Array.isArray(data.manualServices)) {
        MANUAL_SERVICES = new Set(data.manualServices);
      }
      config = data;
    }
  } catch (_) {}

  // Defaults
  if (!ENDPOINTS.length) {
    ENDPOINTS = [
      { label: 'Librarian',  url: 'http://127.0.0.1:57785/' },
      { label: 'ADIR Hub',   url: 'http://127.0.0.1:9303/'  }
    ];
  }
}

function saveConfig(data) {
  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (data.endpoints)     ENDPOINTS        = data.endpoints;
    if (data.manualServices) MANUAL_SERVICES = new Set(data.manualServices);
    let current = {};
    try { if (fs.existsSync(CONFIG_PATH)) current = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); } catch (_) {}
    const merged = { ...current, ...data };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(merged, null, 2));
    config = merged;
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ── Log helpers ────────────────────────────────────────────────────────────

function pushLog(id, line) {
  if (!logs.has(id)) logs.set(id, []);
  const buf  = logs.get(id);
  const ts   = new Date().toTimeString().slice(0, 8);
  const entry= `[${ts}] ${line}`;
  buf.push(entry);
  if (buf.length > 1000) buf.shift();

  // Broadcast to SSE clients
  const evt = JSON.stringify({ type: 'log', id, line: entry });
  for (const client of sseClients) {
    try { client.write(`data: ${evt}\n\n`); } catch (_) { sseClients.delete(client); }
  }
}

// ── Port check ─────────────────────────────────────────────────────────────

function checkPort(port) {
  return new Promise(resolve => {
    const sock = new net.Socket();
    sock.setTimeout(1000);
    sock.on('connect', () => { sock.destroy(); resolve(true); });
    sock.on('error',   () => resolve(false));
    sock.on('timeout', () => { sock.destroy(); resolve(false); });
    sock.connect(port, '127.0.0.1');
  });
}

// ── npm install guard ─────────────────────────────────────────────────────

function ensureModules(cwd) {
  const nm = path.join(cwd, 'node_modules');
  if (!fs.existsSync(nm)) {
    pushLog('_system', `[SETUP] npm install in ${cwd} ...`);
    try {
      execSync('npm install --silent', { cwd, timeout: 120000, stdio: 'ignore' });
    } catch (_) {
      pushLog('_system', `[WARN] npm install failed in ${cwd}`);
    }
  }
}

// ── Service spawning ───────────────────────────────────────────────────────

async function spawnService(svc) {
  const alreadyUp = await checkPort(svc.port);
  if (alreadyUp) {
    pushLog(svc.id, `[ADOPT] ${svc.name} already running on :${svc.port}`);
    statusMap.set(svc.id, 'up');
    broadcastStatus(svc.id, 'up');
    return;
  }

  if (!fs.existsSync(svc.cwd)) {
    pushLog(svc.id, `[SKIP] Directory not found: ${svc.cwd}`);
    statusMap.set(svc.id, 'down');
    return;
  }

  if (svc.cmd === 'node') ensureModules(svc.cwd);

  statusMap.set(svc.id, 'starting');
  broadcastStatus(svc.id, 'starting');
  pushLog(svc.id, `[START] ${svc.name} on :${svc.port}`);

  const proc = spawn(svc.cmd, svc.args, {
    cwd:   svc.cwd,
    shell: false,
    env:   {
      ...process.env,
      FOB_ROOT,
      SERVICES_ROOT,
      NODE_ENV: 'production'
    }
  });

  proc.stdout.on('data', d => pushLog(svc.id, d.toString().trimEnd()));
  proc.stderr.on('data', d => pushLog(svc.id, `[ERR] ${d.toString().trimEnd()}`));

  proc.on('exit', code => {
    pushLog(svc.id, `[EXIT] code ${code ?? '?'}`);
    statusMap.set(svc.id, 'down');
    processes.delete(svc.id);
    broadcastStatus(svc.id, 'down');
  });

  processes.set(svc.id, proc);
}

function spawnAll() {
  logs.set('_system', []);
  for (const svc of SERVICES) {
    logs.set(svc.id, []);
    if (MANUAL_SERVICES.has(svc.id)) {
      statusMap.set(svc.id, 'down');
      pushLog(svc.id, `[MANUAL] ${svc.name} — click Start to launch`);
    } else {
      statusMap.set(svc.id, 'starting');
      spawnService(svc).catch(e => pushLog(svc.id, `[ERR] spawn failed: ${e.message}`));
    }
  }
}

function killAll() {
  for (const [, proc] of processes) {
    try { proc.kill('SIGTERM'); } catch (_) {}
  }
  processes.clear();
}

function killByPort(port) {
  try {
    const out = execSync(`lsof -ti :${port} 2>/dev/null`, { encoding: 'utf8', timeout: 3000 });
    for (const pid of out.trim().split('\n').filter(Boolean)) {
      try { process.kill(parseInt(pid, 10), 'SIGKILL'); } catch (_) {}
    }
  } catch (_) {}
}

async function restartService(id) {
  const svc = SERVICES.find(s => s.id === id);
  if (!svc) return { ok: false, error: 'unknown service' };

  const proc = processes.get(id);
  if (proc) {
    try { proc.kill('SIGTERM'); } catch (_) {}
    processes.delete(id);
  } else if (svc.port) {
    killByPort(svc.port);
  }

  await new Promise(r => setTimeout(r, 1500));
  statusMap.set(svc.id, 'starting');
  broadcastStatus(svc.id, 'starting');
  spawnService(svc).catch(e => pushLog(svc.id, `[ERR] restart failed: ${e.message}`));
  return { ok: true, id };
}

// ── SSE broadcast ──────────────────────────────────────────────────────────

function broadcastStatus(id, s) {
  const evt = JSON.stringify({ type: 'status', id, status: s });
  for (const client of sseClients) {
    try { client.write(`data: ${evt}\n\n`); } catch (_) { sseClients.delete(client); }
  }
}

// ── Port polling ───────────────────────────────────────────────────────────

async function pollPorts() {
  for (const svc of SERVICES) {
    const up   = await checkPort(svc.port);
    const prev = statusMap.get(svc.id);
    const next = up ? 'up' : (processes.has(svc.id) ? 'starting' : 'down');
    if (prev !== next) {
      statusMap.set(svc.id, next);
      broadcastStatus(svc.id, next);
    }
  }
}

// ── Control API + Dashboard (port 9399) ──────────────────────────────────

const CONTROL_PORT = 9399;

function startControlAPI() {
  const app = express();

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',  '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    next();
  });

  app.use(express.json());

  // ── Dashboard (serves static files) ────────────────────────────────────
  if (fs.existsSync(DASHBOARD_DIR)) {
    app.use(express.static(DASHBOARD_DIR));
  }

  // ── SSE endpoint for live updates ──────────────────────────────────────
  app.get('/events', (req, res) => {
    res.setHeader('Content-Type',  'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection',    'keep-alive');
    res.flushHeaders();
    sseClients.add(res);

    // Send current state immediately
    const snapshot = JSON.stringify({
      type:     'snapshot',
      services: SERVICES.map(s => ({
        id:     s.id,
        name:   s.name,
        port:   s.port,
        group:  s.group,
        status: statusMap.get(s.id) || 'down',
        owned:  processes.has(s.id)
      })),
      endpoints: ENDPOINTS
    });
    res.write(`data: ${snapshot}\n\n`);

    req.on('close', () => { sseClients.delete(res); });
  });

  // ── GET /status ─────────────────────────────────────────────────────────
  app.get('/status', (req, res) => {
    res.json({
      ok: true,
      services: SERVICES.map(s => ({
        id:     s.id,
        name:   s.name,
        port:   s.port,
        group:  s.group,
        status: statusMap.get(s.id) || 'down',
        owned:  processes.has(s.id)
      }))
    });
  });

  // ── GET /logs/:id ───────────────────────────────────────────────────────
  app.get('/logs/:id', (req, res) => {
    const id = req.params.id;
    res.json({ ok: true, id, logs: logs.get(id) || [] });
  });

  // ── GET /endpoints ──────────────────────────────────────────────────────
  app.get('/endpoints', (req, res) => {
    res.json({ ok: true, endpoints: ENDPOINTS });
  });

  // ── GET /config ─────────────────────────────────────────────────────────
  app.get('/config', (req, res) => {
    res.json({ ok: true, config });
  });

  // ── POST /config ────────────────────────────────────────────────────────
  app.post('/config', (req, res) => {
    const result = saveConfig(req.body);
    res.json(result);
  });

  // ── POST /restart/:id ───────────────────────────────────────────────────
  app.post('/restart/:id', async (req, res) => {
    const result = await restartService(req.params.id);
    res.status(result.ok ? 200 : 404).json(result);
  });

  // ── POST /start/:id ─────────────────────────────────────────────────────
  app.post('/start/:id', (req, res) => {
    const svc = SERVICES.find(s => s.id === req.params.id);
    if (!svc) return res.status(404).json({ ok: false, error: 'unknown service' });
    spawnService(svc).catch(e => pushLog(svc.id, `[ERR] ${e.message}`));
    res.json({ ok: true, id: req.params.id, action: 'start' });
  });

  // ── POST /stop/:id ──────────────────────────────────────────────────────
  app.post('/stop/:id', (req, res) => {
    const id   = req.params.id;
    const proc = processes.get(id);
    if (!proc) return res.json({ ok: true, id, note: 'not owned by FOB launcher' });
    try { proc.kill('SIGTERM'); } catch (_) {}
    processes.delete(id);
    statusMap.set(id, 'down');
    broadcastStatus(id, 'down');
    res.json({ ok: true, id, action: 'stopped' });
  });

  // ── Fallback → dashboard index ──────────────────────────────────────────
  app.use((req, res) => {
    const idx = path.join(DASHBOARD_DIR, 'index.html');
    if (fs.existsSync(idx)) return res.sendFile(idx);
    res.json({ ok: false, error: 'Dashboard not found', hint: 'Build the dashboard/ directory' });
  });

  const server = http.createServer(app);

  server.listen(CONTROL_PORT, '0.0.0.0', () => {
    pushLog('_system', `[API] Launcher API  → http://127.0.0.1:${CONTROL_PORT}`);
    pushLog('_system', `[API] Dashboard UI  → http://127.0.0.1:${CONTROL_PORT}/`);
    console.log(`\n  Dashboard: http://127.0.0.1:${CONTROL_PORT}/`);
    console.log(`  API:       http://127.0.0.1:${CONTROL_PORT}/status\n`);
  });

  server.on('error', e => {
    console.error(`[WARN] Control API failed: ${e.message}`);
  });
}

// ── Startup ────────────────────────────────────────────────────────────────

console.log('\n' + '='.repeat(56));
console.log('  V3AM FOB — Termux Launcher');
console.log('='.repeat(56));
console.log(`  FOB_ROOT:   ${FOB_ROOT}`);
console.log(`  Services:   ${SERVICES_ROOT}`);
console.log('='.repeat(56) + '\n');

loadConfig();
startControlAPI();
spawnAll();

// Poll after initial delay, then every 5s
setTimeout(pollPorts, 15000);
setInterval(pollPorts, 5000);

// Graceful shutdown
process.on('SIGINT',  () => { console.log('\n[SHUTDOWN] Stopping all services...'); killAll(); process.exit(0); });
process.on('SIGTERM', () => { killAll(); process.exit(0); });
process.on('uncaughtException',  err => { console.error('[FATAL]', err.message); killAll(); process.exit(1); });
process.on('unhandledRejection', reason => { console.error('[FATAL] Unhandled rejection:', reason); });
