'use strict';
/**
 * Shared Utilities for V3AM FOB Termux
 */

const net  = require('net');
const fs   = require('fs');
const path = require('path');

// ── Port checking ──────────────────────────────────────────────────────────

/**
 * Check if a port is accepting TCP connections.
 * @param {number} port
 * @param {string} host - default '127.0.0.1'
 * @param {number} timeoutMs
 * @returns {Promise<boolean>}
 */
function checkPort(port, host = '127.0.0.1', timeoutMs = 1000) {
  return new Promise(resolve => {
    const sock = new net.Socket();
    sock.setTimeout(timeoutMs);
    sock.on('connect', () => { sock.destroy(); resolve(true); });
    sock.on('error',   () => resolve(false));
    sock.on('timeout', () => { sock.destroy(); resolve(false); });
    sock.connect(port, host);
  });
}

// ── PID management ──────────────────────────────────────────────────────────

const HOME    = process.env.HOME || '/data/data/com.termux/files/home';
const PID_DIR = path.join(HOME, 'fob', 'run');

function ensurePidDir() {
  if (!fs.existsSync(PID_DIR)) fs.mkdirSync(PID_DIR, { recursive: true });
}

function writePid(name, pid) {
  ensurePidDir();
  fs.writeFileSync(path.join(PID_DIR, `${name}.pid`), String(pid));
}

function readPid(name) {
  try {
    return parseInt(fs.readFileSync(path.join(PID_DIR, `${name}.pid`), 'utf8').trim(), 10);
  } catch (_) {
    return null;
  }
}

function removePid(name) {
  try { fs.unlinkSync(path.join(PID_DIR, `${name}.pid`)); } catch (_) {}
}

function allPidFiles() {
  try {
    return fs.readdirSync(PID_DIR)
      .filter(f => f.endsWith('.pid'))
      .map(f => ({
        name: f.replace('.pid', ''),
        pid:  parseInt(fs.readFileSync(path.join(PID_DIR, f), 'utf8').trim(), 10)
      }));
  } catch (_) {
    return [];
  }
}

// ── Kill by port (Linux/Termux — uses lsof or ss) ─────────────────────────

const { execSync } = require('child_process');

function killByPort(port) {
  // Try lsof first, then ss
  try {
    const pids = new Set();

    // lsof approach
    try {
      const out = execSync(`lsof -ti :${port} 2>/dev/null`, { encoding: 'utf8', timeout: 3000 });
      for (const pid of out.trim().split('\n')) {
        const n = parseInt(pid.trim(), 10);
        if (n > 0) pids.add(n);
      }
    } catch (_) {}

    // ss approach (fallback)
    if (pids.size === 0) {
      try {
        const out = execSync(`ss -tlnp "sport = :${port}" 2>/dev/null`, { encoding: 'utf8', timeout: 3000 });
        const m = out.match(/pid=(\d+)/g);
        if (m) m.forEach(p => pids.add(parseInt(p.split('=')[1], 10)));
      } catch (_) {}
    }

    for (const pid of pids) {
      try { process.kill(pid, 'SIGKILL'); } catch (_) {}
    }
  } catch (_) {}
}

// ── Timestamp / logging ────────────────────────────────────────────────────

function timestamp() {
  return new Date().toTimeString().slice(0, 8);
}

function isoTimestamp() {
  return new Date().toISOString();
}

function generateId(prefix = 'id_') {
  return `${prefix}${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ── FOB root path ──────────────────────────────────────────────────────────

/**
 * Returns the resolved FOB root directory.
 * On Termux: $HOME/fob
 */
function getFobRoot() {
  return process.env.FOB_ROOT || path.join(HOME, 'fob');
}

/**
 * Returns the TANDR services root directory.
 */
function getServicesRoot() {
  return process.env.SERVICES_ROOT || path.join(getFobRoot(), 'adir', 'new211adir', 'TANDR-2026-02-11');
}

// ── Ensure directory ────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

module.exports = {
  checkPort,
  writePid,
  readPid,
  removePid,
  allPidFiles,
  killByPort,
  timestamp,
  isoTimestamp,
  generateId,
  getFobRoot,
  getServicesRoot,
  ensureDir,
  HOME,
  PID_DIR
};
