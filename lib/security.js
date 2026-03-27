'use strict';
/**
 * Security — rate limiting, input sanitization, path validation
 *
 * Ported from security.php (TANDRbot Security class).
 * Provides the same interface so php-bridge.js can use it identically.
 */

const fs   = require('fs');
const path = require('path');

// ── In-memory rate limiter ─────────────────────────────────────────────────

/**
 * Track {ip → [{timestamp}]} per minute window
 */
const _rateStore = new Map(); // ip → number[]

function checkRateLimit(identifier, maxRequests = 30, windowMs = 60000) {
  const now   = Date.now();
  const limit = maxRequests;

  let timestamps = _rateStore.get(identifier) || [];

  // Drop entries outside the window
  timestamps = timestamps.filter(t => now - t < windowMs);

  if (timestamps.length >= limit) {
    _rateStore.set(identifier, timestamps);
    return false; // rate limited
  }

  timestamps.push(now);
  _rateStore.set(identifier, timestamps);
  return true;
}

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const cutoff = Date.now() - 60000;
  for (const [ip, ts] of _rateStore) {
    const fresh = ts.filter(t => t > cutoff);
    if (fresh.length === 0) _rateStore.delete(ip);
    else _rateStore.set(ip, fresh);
  }
}, 5 * 60 * 1000);

// ── Input sanitization ─────────────────────────────────────────────────────

/**
 * Sanitize user input:
 * - Trim whitespace
 * - Strip control characters
 * - Limit length
 */
function sanitizeInput(input, maxLength = 10000) {
  if (typeof input !== 'string') return '';
  // Remove control chars (keep newlines/tabs)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  // Trim
  clean = clean.trim();
  // Enforce max length
  if (clean.length > maxLength) clean = clean.slice(0, maxLength);
  return clean;
}

// ── Path validation ────────────────────────────────────────────────────────

const ALLOWED_EXTENSIONS_READ  = new Set(['.md', '.txt', '.json', '.html', '.css', '.js', '.log']);
const ALLOWED_EXTENSIONS_WRITE = new Set(['.md', '.txt', '.json', '.log']);

/**
 * Validate that a file path is safe to read.
 * @param {string} filePath  - absolute path
 * @param {string} baseDir   - allowed base directory
 */
function validateReadPath(filePath, baseDir) {
  try {
    const resolved = path.resolve(filePath);
    if (baseDir && !resolved.startsWith(path.resolve(baseDir))) return false;
    const ext = path.extname(resolved).toLowerCase();
    return ALLOWED_EXTENSIONS_READ.has(ext) || ext === '';
  } catch (_) {
    return false;
  }
}

/**
 * Validate that a file path is safe to write.
 */
function validateWritePath(filePath, baseDir) {
  try {
    const resolved = path.resolve(filePath);
    if (baseDir && !resolved.startsWith(path.resolve(baseDir))) return false;
    const ext = path.extname(resolved).toLowerCase();
    return ALLOWED_EXTENSIONS_WRITE.has(ext) || ext === '';
  } catch (_) {
    return false;
  }
}

// ── File operations (mirrors PHP Security class methods) ──────────────────

/**
 * List files in a directory — returns array of {name, size, modified, extension}
 */
function listFiles(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
      .filter(f => {
        const full = path.join(dirPath, f);
        return fs.statSync(full).isFile();
      })
      .map(f => {
        const full  = path.join(dirPath, f);
        const stat  = fs.statSync(full);
        return {
          name:      f,
          size:      stat.size,
          modified:  Math.floor(stat.mtimeMs / 1000),
          extension: path.extname(f).slice(1)
        };
      })
      .sort((a, b) => b.modified - a.modified);
  } catch (_) {
    return [];
  }
}

/**
 * Read a file — returns content string or null on error
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (_) {
    return null;
  }
}

/**
 * Write a file (optionally append)
 */
function writeFile(filePath, content, append = false) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (append) {
      fs.appendFileSync(filePath, content, 'utf8');
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    return true;
  } catch (_) {
    return false;
  }
}

// ── Security class (PHP-compatible interface) ──────────────────────────────

/**
 * Security instance — wraps all the above as a stateful object,
 * matching the PHP Security class interface used in bot.php.
 */
class Security {
  constructor(configPathOrObj) {
    // We accept either a path or a config object (PHP version took a path)
    if (typeof configPathOrObj === 'string') {
      try {
        this._cfg = JSON.parse(fs.readFileSync(configPathOrObj, 'utf8'));
      } catch (_) {
        this._cfg = {};
      }
    } else {
      this._cfg = configPathOrObj || {};
    }

    this._maxRequests = this._cfg.security?.max_requests_per_minute || 30;
  }

  checkRateLimit(identifier) {
    return checkRateLimit(identifier, this._maxRequests);
  }

  sanitizeInput(input) {
    return sanitizeInput(input);
  }

  validateReadPath(filePath, baseDir) {
    return validateReadPath(filePath, baseDir);
  }

  validateWritePath(filePath, baseDir) {
    return validateWritePath(filePath, baseDir);
  }

  listFiles(dirPath) {
    return listFiles(dirPath);
  }

  readFile(filePath) {
    return readFile(filePath);
  }

  writeFile(filePath, content, append = false) {
    return writeFile(filePath, content, append);
  }
}

module.exports = {
  Security,
  checkRateLimit,
  sanitizeInput,
  validateReadPath,
  validateWritePath,
  listFiles,
  readFile,
  writeFile
};
