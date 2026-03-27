'use strict';
/**
 * Universal Service Server Template
 *
 * All V3AM FOB services follow the same pattern:
 *   - Express server on a configured port
 *   - CORS, JSON parsing, request logging
 *   - Serves static files (index.html, dashboard.html, css/, js/)
 *   - Handles /api/bot.php routes via php-bridge.js
 *
 * Each service's server.js simply does:
 *   const { createServer } = require('../../lib/server-template');
 *   createServer(__dirname);
 */

const express = require('express');
const path    = require('path');
const fs      = require('fs');

const { createBotRoutes } = require('./php-bridge');

/**
 * Create and start an Express server for a service.
 *
 * @param {string} serviceDir - __dirname of the calling server.js
 * @param {object} [overrides] - optional config overrides
 */
function createServer(serviceDir, overrides = {}) {
  // ── Load config ───────────────────────────────────────────────────────────
  let config = {};
  const configPath = path.join(serviceDir, 'config.json');
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (_) {
    console.warn(`[WARN] No config.json found in ${serviceDir}, using defaults`);
  }
  Object.assign(config, overrides);

  // Port can be at root level or inside app object
  const PORT     = config.port || config.app?.port || 8080;
  const SVC_NAME = config.app?.name || path.basename(serviceDir);

  // ── Express app ───────────────────────────────────────────────────────────
  const app = express();

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',  '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Max-Age', '86400');
    if (req.method === 'OPTIONS') return res.status(200).end();
    next();
  });

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logging
  app.use((req, res, next) => {
    const ts = new Date().toTimeString().slice(0, 8);
    console.log(`[${ts}] ${req.method} ${req.url}`);
    next();
  });

  // ── Bot API routes (replaces PHP CGI) ─────────────────────────────────────
  createBotRoutes(app, config, serviceDir);

  // ── Static files ──────────────────────────────────────────────────────────
  // Serve any existing static content from the service directory
  // But NOT the api/ directory (security)
  app.use(express.static(serviceDir, {
    index: 'index.html',
    extensions: ['html'],
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js'))  res.setHeader('Content-Type', 'application/javascript');
      if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
    }
  }));

  // ── Explicit routes for common pages ─────────────────────────────────────
  app.get('/', (req, res) => {
    const idx = path.join(serviceDir, 'index.html');
    if (fs.existsSync(idx)) return res.sendFile(idx);
    res.json({ service: SVC_NAME, port: PORT, status: 'running' });
  });

  app.get('/dashboard.html', (req, res) => {
    const dash = path.join(serviceDir, 'dashboard.html');
    if (fs.existsSync(dash)) return res.sendFile(dash);
    res.status(404).send('Dashboard not found');
  });

  // ── 404 handler ───────────────────────────────────────────────────────────
  app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not found', path: req.url });
  });

  // ── Error handler ─────────────────────────────────────────────────────────
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error('[ERROR]', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  // ── Start server ──────────────────────────────────────────────────────────
  const server = app.listen(PORT, '0.0.0.0', () => {
    const line = '='.repeat(56);
    console.log(line);
    console.log(`  ${SVC_NAME}`);
    console.log(line);
    console.log(`  Status:  RUNNING`);
    console.log(`  Port:    ${PORT}`);
    console.log(`  URL:     http://127.0.0.1:${PORT}/`);
    console.log(`  Root:    ${serviceDir}`);
    console.log(line);

    // Log startup
    const logDir  = path.join(serviceDir, 'logs');
    const logPath = path.join(logDir, 'server-restarts.log');
    try {
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      const entry = `\n[${new Date().toISOString()}] SERVER STARTED - ${SVC_NAME}\n  Port: ${PORT}\n  PID:  ${process.pid}\n  Node: ${process.version}\n`;
      fs.appendFileSync(logPath, entry);
    } catch (_) {}
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[ERROR] Port ${PORT} is already in use. Is ${SVC_NAME} already running?`);
    } else {
      console.error('[ERROR] Server error:', err.message);
    }
    process.exit(1);
  });

  process.on('SIGINT',  () => { console.log('\n[SHUTDOWN] SIGINT received'); server.close(() => process.exit(0)); });
  process.on('SIGTERM', () => { console.log('\n[SHUTDOWN] SIGTERM received'); server.close(() => process.exit(0)); });

  process.on('uncaughtException',   err  => { console.error('[FATAL] Uncaught exception:', err.message); process.exit(1); });
  process.on('unhandledRejection',  reason => { console.error('[FATAL] Unhandled rejection:', reason); process.exit(1); });

  return { app, server, config };
}

module.exports = { createServer };
