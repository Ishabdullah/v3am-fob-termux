'use strict';
/**
 * PHP Bridge — Node.js replacement for all PHP CGI execution
 *
 * The original services called exec('php api/bot.php') to handle all API logic.
 * This module provides the same REST endpoints in pure Node.js.
 *
 * Usage:
 *   const { createBotRoutes } = require('../../lib/php-bridge');
 *   createBotRoutes(app, config, __dirname);
 *
 * This attaches all bot API routes to the Express app.
 */

const fs   = require('fs');
const path = require('path');
const { Security }    = require('./security');
const { generateId, isoTimestamp } = require('./utils');

const LlamaCppProvider  = require('./providers/llamacpp');
const AnthropicProvider = require('./providers/anthropic');
const GeminiProvider    = require('./providers/gemini');

// ── Provider factory ──────────────────────────────────────────────────────

function getProvider(config) {
  const provider = (config.llm && config.llm.provider) || 'llamacpp';

  if (provider === 'llamacpp' || provider === 'ollama') {
    return new LlamaCppProvider(config.llm || config);
  }
  if (provider === 'anthropic') {
    return new AnthropicProvider(config.llm || config);
  }
  if (provider === 'gemini') {
    return new GeminiProvider(config.llm || config);
  }

  // Fallback
  return new LlamaCppProvider(config.llm || config);
}

async function getLLMResponse(messages, knowledgeContext, config) {
  const primary = getProvider(config);
  const result  = await primary.chat(messages, knowledgeContext);

  if (result.success) return result;

  // Try fallback provider if configured
  const fb = config.llm?.fallback;
  if (fb && fb.enabled && fb.provider) {
    const fbProvider = getProvider({ ...config, llm: { ...config.llm, provider: fb.provider } });
    return fbProvider.chat(messages, knowledgeContext);
  }

  return result;
}

// ── Knowledge base loader ──────────────────────────────────────────────────

function loadKnowledgeBase(serviceDir, config) {
  const kbPath = config.knowledge?.base_path || 'data/social-knowledge';
  const full   = path.resolve(serviceDir, kbPath);

  if (!fs.existsSync(full)) return '';

  const maxFiles = config.knowledge?.max_context_files || 10;
  const sec      = new Security();
  const files    = sec.listFiles(full);

  const parts = [];
  let   count = 0;

  for (const file of files) {
    if (count >= maxFiles) break;
    const content = sec.readFile(path.join(full, file.name));
    if (content !== null) {
      parts.push(`File: ${file.name}\n${content.trim()}`);
      count++;
    }
  }

  return parts.join('\n\n---\n\n');
}

// ── Conversation logging ───────────────────────────────────────────────────

function logConversation(serviceDir, config, userMsg, botMsg, identifier) {
  if (!config.conversation?.log_conversations) return;
  const logPath  = path.resolve(serviceDir, config.conversation.log_path || 'logs/conversations.txt');
  const logDir   = path.dirname(logPath);
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const entry = `[${isoTimestamp()}] IP: ${identifier}\nUser: ${userMsg}\nBot: ${botMsg}\n---\n\n`;
  try { fs.appendFileSync(logPath, entry, 'utf8'); } catch (_) {}
}

function logError(serviceDir, config, message) {
  if (!config.logging?.log_errors) return;
  const logPath = path.resolve(serviceDir, config.logging.error_log_path || 'logs/server-errors.txt');
  const logDir  = path.dirname(logPath);
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  try { fs.appendFileSync(logPath, `[${isoTimestamp()}] ${message}\n`, 'utf8'); } catch (_) {}
}

// ── Post-queue helpers ────────────────────────────────────────────────────

function getPostQueueFileList(serviceDir) {
  const queuePath = path.join(serviceDir, 'logs', 'post-queue');
  if (!fs.existsSync(queuePath)) return 'No files in post-queue yet.';

  const files = fs.readdirSync(queuePath)
    .filter(f => f !== 'README.txt' && f.endsWith('.txt'))
    .map(f => `- ${f}`);

  if (files.length === 0) return 'No posts in queue yet.';
  return files.join('\n') + '\n\nUse [READ_FILE: post-queue/filename.txt] to read each file.';
}

function processFileCommands(content, serviceDir) {
  const basePaths = {
    'post-queue/':       path.join(serviceDir, 'logs', 'post-queue'),
    'post-drafts/':      path.join(serviceDir, 'logs', 'post-drafts'),
    'fb-feeds/':         path.join(serviceDir, 'logs', 'fb-feeds'),
    'social-knowledge/': path.join(serviceDir, 'data', 'social-knowledge')
  };

  // [SAVE_FILE: path] content [END_FILE]
  content = content.replace(/\[SAVE_FILE:\s*([^\]]+)\]([\s\S]*?)\[END_FILE\]/gi, (_, filePath, fileContent) => {
    filePath    = filePath.trim();
    fileContent = fileContent.trim();

    let targetDir = path.join(serviceDir, 'logs');
    let fileName  = filePath;

    for (const [prefix, dir] of Object.entries(basePaths)) {
      if (filePath.startsWith(prefix)) {
        targetDir = dir;
        fileName  = filePath.slice(prefix.length);
        break;
      }
    }

    const fullPath = path.join(targetDir, path.basename(fileName));
    try {
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(fullPath, fileContent, 'utf8');
      const rel = path.relative(serviceDir, fullPath);
      return `✅ **File saved successfully!**\n📁 Location: \`${rel}\`\n📝 Size: ${fileContent.length} bytes`;
    } catch (e) {
      return `[❌ Error: ${e.message}]`;
    }
  });

  // [LIST_FILES: directory]
  content = content.replace(/\[LIST_FILES:\s*([^\]]+)\]/gi, (_, dir) => {
    dir = dir.trim();
    const dirMap = {
      'post-queue':  path.join(serviceDir, 'logs', 'post-queue'),
      'post-drafts': path.join(serviceDir, 'logs', 'post-drafts'),
      'fb-feeds':    path.join(serviceDir, 'logs', 'fb-feeds')
    };
    const targetDir = dirMap[dir];
    if (!targetDir || !fs.existsSync(targetDir)) return `[No files in ${dir} yet]`;
    const files = fs.readdirSync(targetDir).filter(f => f !== 'README.txt').map(f => `- ${f}`);
    return files.length ? `\n**Files in ${dir}:**\n${files.join('\n')}` : `[No files in ${dir}]`;
  });

  // [READ_FILE: path]
  content = content.replace(/\[READ_FILE:\s*([^\]]+)\]/gi, (_, filePath) => {
    filePath = filePath.trim();
    let fullPath = null;
    for (const [prefix, dir] of Object.entries(basePaths)) {
      if (filePath.startsWith(prefix)) {
        fullPath = path.join(dir, filePath.slice(prefix.length));
        break;
      }
    }
    if (!fullPath || !fs.existsSync(fullPath)) return `[Error: File not found - ${filePath}]`;
    try {
      return `\n**File: ${filePath}**\n\`\`\`\n${fs.readFileSync(fullPath, 'utf8')}\n\`\`\`\n`;
    } catch (e) {
      return `[Error: Failed to read file - ${filePath}]`;
    }
  });

  return content;
}

// ── Main: createBotRoutes ──────────────────────────────────────────────────

/**
 * Attach all bot API routes to an Express app.
 *
 * @param {import('express').Application} app
 * @param {object} config      - service config.json contents
 * @param {string} serviceDir  - absolute path to the service directory
 */
function createBotRoutes(app, config, serviceDir) {

  const sec = new Security(config);

  // ── GET/POST /api/bot.php?action=... ─────────────────────────────────────
  app.all('/api/bot.php', async (req, res) => {
    const action = req.query.action || req.body?.action || 'status';

    const send = (code, obj) => {
      if (!res.headersSent) res.status(code).json(obj);
    };
    const sendOk  = data => send(200, { success: true,  data });
    const sendErr = (msg, code = 400) => send(code, { success: false, error: msg, code });

    try {
      switch (action) {

        // ── status ────────────────────────────────────────────────────────
        case 'status': {
          const provider   = getProvider(config);
          const llmInfo    = await provider.getModelInfo();
          const kbPath     = path.resolve(serviceDir, config.knowledge?.base_path || 'data/social-knowledge');
          const kbFiles    = sec.listFiles(kbPath);
          const latest     = kbFiles.reduce((m, f) => Math.max(m, f.modified), 0);
          const convLog    = path.resolve(serviceDir, config.conversation?.log_path || 'logs/conversations.txt');
          let total = 0, today = 0;
          if (fs.existsSync(convLog)) {
            const raw   = fs.readFileSync(convLog, 'utf8');
            total       = (raw.match(/User:/g) || []).length;
            const d     = new Date().toISOString().slice(0, 10);
            today       = (raw.match(new RegExp(`\\[${d}`, 'g')) || []).length;
          }
          sendOk({
            status:       'operational',
            version:      config.app?.version    || '3.0.0',
            environment:  config.app?.environment || 'termux',
            llm:          llmInfo,
            knowledge:    { files: kbFiles.length, last_updated: latest ? new Date(latest * 1000).toISOString() : null },
            conversations:{ total, today },
            timestamp:    isoTimestamp()
          });
          break;
        }

        // ── chat ──────────────────────────────────────────────────────────
        case 'chat': {
          const identifier = req.ip || '127.0.0.1';

          if (!sec.checkRateLimit(identifier)) {
            return sendErr('Rate limit exceeded. Please try again later.', 429);
          }

          let userMessage = req.query.input || req.body?.message || req.body?.input || '';
          userMessage = sec.sanitizeInput(userMessage);
          if (!userMessage) return sendErr('Message cannot be empty.', 400);

          const history        = req.body?.history || [];
          const conversationId = req.body?.conversation_id || null;

          let knowledgeContext = loadKnowledgeBase(serviceDir, config);

          // Inject post-queue file list if requested
          if (/check.*post[- ]queue|what.*posts.*ready|review.*queue/i.test(userMessage)) {
            const fileList = getPostQueueFileList(serviceDir);
            if (fileList) knowledgeContext += '\n\n**POST-QUEUE FILES AVAILABLE:**\n' + fileList;
          }

          const messages = [...history, { role: 'user', content: userMessage }];
          const maxHist  = config.conversation?.max_history || 20;
          const trimmed  = messages.slice(-maxHist);

          const response = await getLLMResponse(trimmed, knowledgeContext, config);
          if (!response.success) throw new Error(response.error || 'LLM request failed');

          response.content = processFileCommands(response.content, serviceDir);
          logConversation(serviceDir, config, userMessage, response.content, identifier);

          sendOk({
            message:         response.content,
            model:           response.model    || 'unknown',
            provider:        response.provider || 'unknown',
            tokens:          response.tokens   || null,
            conversation_id: conversationId    || generateId('conv_'),
            timestamp:       isoTimestamp()
          });
          break;
        }

        // ── knowledge ─────────────────────────────────────────────────────
        case 'knowledge': {
          const kbPath  = path.resolve(serviceDir, config.knowledge?.base_path || 'data/social-knowledge');
          const files   = sec.listFiles(kbPath);
          const latest  = files.reduce((m, f) => Math.max(m, f.modified), 0);
          sendOk({
            files,
            count:        files.length,
            last_updated: latest ? new Date(latest * 1000).toISOString() : null
          });
          break;
        }

        // ── reload ────────────────────────────────────────────────────────
        case 'reload': {
          // Re-read config from disk
          const cfgPath = path.join(serviceDir, 'config.json');
          try {
            const fresh = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
            Object.assign(config, fresh);
            sendOk({ message: 'Configuration reloaded successfully' });
          } catch (e) {
            sendErr('Failed to reload configuration: ' + e.message, 500);
          }
          break;
        }

        // ── get_prompt ────────────────────────────────────────────────────
        case 'get_prompt': {
          sendOk({ prompt: config.system_prompt?.role || '' });
          break;
        }

        // ── update_prompt ─────────────────────────────────────────────────
        case 'update_prompt': {
          const prompt = req.body?.prompt || '';
          if (!prompt) return sendErr('Prompt cannot be empty', 400);
          if (!config.system_prompt) config.system_prompt = {};
          config.system_prompt.role = prompt;
          try {
            fs.writeFileSync(path.join(serviceDir, 'config.json'), JSON.stringify(config, null, 2));
            sendOk({ message: 'System prompt updated successfully' });
          } catch (e) {
            sendErr('Failed to update prompt: ' + e.message, 500);
          }
          break;
        }

        // ── get_knowledge ─────────────────────────────────────────────────
        case 'get_knowledge': {
          const filename = req.query.file || '';
          if (!filename) return sendErr('Filename required', 400);
          const filepath = path.join(serviceDir, 'data', 'social-knowledge', path.basename(filename));
          if (!fs.existsSync(filepath)) return sendErr('File not found', 404);
          sendOk({ filename, content: fs.readFileSync(filepath, 'utf8') });
          break;
        }

        // ── update_knowledge ──────────────────────────────────────────────
        case 'update_knowledge': {
          const { file, content: kbContent } = req.body || {};
          if (!file) return sendErr('Filename required', 400);
          const filepath = path.join(serviceDir, 'data', 'social-knowledge', path.basename(file));
          try {
            fs.writeFileSync(filepath, kbContent || '', 'utf8');
            sendOk({ message: 'Knowledge file updated successfully' });
          } catch (e) {
            sendErr('Failed to update file: ' + e.message, 500);
          }
          break;
        }

        // ── get_logs ──────────────────────────────────────────────────────
        case 'get_logs': {
          const type    = req.query.type || 'conversations';
          const logFile = path.join(serviceDir, 'logs', `${type}.txt`);
          if (!fs.existsSync(logFile)) return sendOk({ content: '' });
          sendOk({ content: fs.readFileSync(logFile, 'utf8') });
          break;
        }

        // ── get_config ────────────────────────────────────────────────────
        case 'get_config': {
          // Mask API keys
          const masked = JSON.parse(JSON.stringify(config));
          for (const provider of ['anthropic', 'gemini', 'openai']) {
            if (masked.llm?.[provider]?.api_key) {
              const k = masked.llm[provider].api_key;
              masked.llm[provider].api_key_masked = '***' + k.slice(-4);
              masked.llm[provider].api_key = '';
            }
          }
          sendOk({ config: masked });
          break;
        }

        // ── update_config / save_config ───────────────────────────────────
        case 'update_config':
        case 'save_config': {
          const newConfig = req.body?.config || req.body;
          if (!newConfig) return sendErr('Configuration required', 400);
          try {
            const json = JSON.stringify(newConfig, null, 2);
            fs.writeFileSync(path.join(serviceDir, 'config.json'), json, 'utf8');
            Object.assign(config, newConfig);
            sendOk({ message: 'Configuration updated successfully' });
          } catch (e) {
            sendErr('Failed to update configuration: ' + e.message, 500);
          }
          break;
        }

        // ── update_settings ───────────────────────────────────────────────
        case 'update_settings': {
          const updates = req.body;
          if (!updates || typeof updates !== 'object') return sendErr('Invalid JSON body', 400);
          if (updates.llm) {
            if (!config.llm) config.llm = {};
            if (updates.llm.provider) config.llm.provider = updates.llm.provider;
            for (const p of ['llamacpp', 'ollama', 'anthropic', 'gemini', 'openai']) {
              if (updates.llm[p]) {
                if (!config.llm[p]) config.llm[p] = {};
                if (updates.llm[p].api_key)  config.llm[p].api_key  = updates.llm[p].api_key;
                if (updates.llm[p].model)    config.llm[p].model    = updates.llm[p].model;
                if (updates.llm[p].endpoint) config.llm[p].endpoint = updates.llm[p].endpoint;
              }
            }
          }
          try {
            fs.writeFileSync(path.join(serviceDir, 'config.json'), JSON.stringify(config, null, 2), 'utf8');
            sendOk({ saved: true, provider: config.llm?.provider || 'llamacpp' });
          } catch (e) {
            sendErr('Failed to save settings: ' + e.message, 500);
          }
          break;
        }

        // ── write_file ────────────────────────────────────────────────────
        case 'write_file': {
          const { filename: wfn, content: wfc, append: wfa, directory: wfd } = req.body || {};
          if (!wfn) return sendErr('Filename required', 400);
          if (!wfc && wfc !== '') return sendErr('Content required', 400);

          const dirName  = wfd || 'logs';
          const filepath = path.join(serviceDir, dirName, path.basename(wfn));
          const dir      = path.dirname(filepath);

          try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            if (wfa) fs.appendFileSync(filepath, wfc, 'utf8');
            else     fs.writeFileSync(filepath, wfc, 'utf8');
            const rel = path.relative(serviceDir, filepath);
            sendOk({ message: 'File written successfully', filename: path.basename(wfn), path: rel });
          } catch (e) {
            sendErr('Error writing file: ' + e.message, 500);
          }
          break;
        }

        // ── read_file ─────────────────────────────────────────────────────
        case 'read_file': {
          const rfn = req.query.filename || req.body?.filename || '';
          if (!rfn) return sendErr('Filename required', 400);
          const rfp = path.join(serviceDir, rfn);
          if (!rfp.startsWith(serviceDir)) return sendErr('Forbidden', 403);
          if (!fs.existsSync(rfp)) return sendErr('File not found', 404);
          sendOk({ filename: rfn, content: fs.readFileSync(rfp, 'utf8') });
          break;
        }

        // ── list_files ────────────────────────────────────────────────────
        case 'list_files': {
          const directory = req.query.directory || 'post-queue';
          const dirMap = {
            'post-queue':  path.join(serviceDir, 'logs', 'post-queue'),
            'post-drafts': path.join(serviceDir, 'logs', 'post-drafts'),
            'fb-feeds':    path.join(serviceDir, 'logs', 'fb-feeds'),
            'knowledge':   path.join(serviceDir, 'data', 'social-knowledge')
          };
          const dirPath = dirMap[directory];
          if (!dirPath) return sendErr('Invalid directory', 400);
          const files = sec.listFiles(dirPath);
          sendOk({ files, directory, count: files.length });
          break;
        }

        // ── search_files ──────────────────────────────────────────────────
        case 'search_files': {
          const query   = req.query.q || req.body?.q || '';
          const dirName = req.query.directory || 'data/social-knowledge';
          const dirPath = path.resolve(serviceDir, dirName);

          if (!query) return sendErr('Query required', 400);

          const results = [];
          try {
            if (fs.existsSync(dirPath)) {
              const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') || f.endsWith('.txt'));
              for (const file of files) {
                const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
                if (content.toLowerCase().includes(query.toLowerCase())) {
                  // Find the snippet
                  const idx     = content.toLowerCase().indexOf(query.toLowerCase());
                  const snippet = content.slice(Math.max(0, idx - 80), idx + 200).replace(/\n/g, ' ');
                  results.push({ file, snippet });
                }
              }
            }
          } catch (e) {
            return sendErr('Search failed: ' + e.message, 500);
          }

          sendOk({ query, results, count: results.length });
          break;
        }

        default:
          sendErr('Invalid action', 400);
      }
    } catch (err) {
      logError(serviceDir, config, 'API error: ' + err.message);
      sendErr('Internal server error: ' + err.message, 500);
    }
  });

  // ── Convenience aliases ───────────────────────────────────────────────────
  // Some services call /api/bot directly (without .php)
  app.all('/api/bot', (req, res, next) => {
    req.url = '/api/bot.php' + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '');
    next();
  });
}

module.exports = { createBotRoutes };
