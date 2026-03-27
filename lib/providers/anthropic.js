'use strict';
/**
 * Anthropic Claude Provider
 *
 * Ported from anthropic.php — same interface as LlamaCppProvider and GeminiProvider.
 * Supports claude-haiku-4-5-20251001 and other Claude models.
 */

const https = require('https');
const http  = require('http');

class AnthropicProvider {
  constructor(config) {
    const ac      = config.anthropic || {};
    this.apiKey   = ac.api_key  || '';
    this.endpoint = ac.endpoint || 'https://api.anthropic.com/v1/messages';
    this.model    = ac.model    || 'claude-haiku-4-5-20251001';
    this.maxTokens    = ac.max_tokens   || 4096;
    this.temperature  = ac.temperature !== undefined ? ac.temperature : 0.7;
    this.systemPrompt = config.system_prompt || {};
  }

  async chat(messages, knowledgeContext = '') {
    try {
      if (!this.apiKey) throw new Error('Anthropic API key not configured');

      const systemText = this._buildSystemPrompt(knowledgeContext);
      const body = JSON.stringify({
        model:       this.model,
        max_tokens:  this.maxTokens,
        temperature: this.temperature,
        system:      systemText,
        messages:    this._formatMessages(messages)
      });

      const data = await this._request(this.endpoint, 'POST', body, {
        'Content-Type':     'application/json',
        'X-API-Key':        this.apiKey,
        'anthropic-version':'2023-06-01'
      });

      if (!data || !data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response from Anthropic: ' + JSON.stringify(data));
      }

      return {
        success:  true,
        content:  data.content[0].text.trim(),
        model:    this.model,
        provider: 'anthropic',
        tokens: {
          prompt:     (data.usage || {}).input_tokens  || 0,
          completion: (data.usage || {}).output_tokens || 0,
          total:     ((data.usage || {}).input_tokens  || 0) + ((data.usage || {}).output_tokens || 0)
        },
        stop_reason: data.stop_reason || 'unknown'
      };

    } catch (err) {
      return { success: false, error: err.message, provider: 'anthropic' };
    }
  }

  isAvailable() { return !!this.apiKey; }

  async getModelInfo() {
    return {
      provider:    'anthropic',
      model:       this.model,
      max_tokens:  this.maxTokens,
      available:   this.isAvailable()
    };
  }

  // ── Private ───────────────────────────────────────────────────────────────

  _buildSystemPrompt(knowledgeContext) {
    let prompt = '';
    if (this.systemPrompt.role) prompt += this.systemPrompt.role + '\n\n';

    if (Array.isArray(this.systemPrompt.instructions)) {
      prompt += 'Instructions:\n';
      for (const i of this.systemPrompt.instructions) prompt += `- ${i}\n`;
      prompt += '\n';
    }

    if (Array.isArray(this.systemPrompt.restrictions)) {
      prompt += 'Important Restrictions:\n';
      for (const r of this.systemPrompt.restrictions) prompt += `- ${r}\n`;
      prompt += '\n';
    }

    if (knowledgeContext && knowledgeContext.trim()) {
      prompt += 'Knowledge Base:\n====================\n';
      prompt += knowledgeContext.trim() + '\n';
      prompt += '====================\n\n';
      prompt += "Use the above knowledge base to answer questions accurately. If the information isn't in the knowledge base, politely say so.\n\n";
    }

    prompt += 'Always be helpful, professional, and concise in your responses.';
    return prompt;
  }

  _formatMessages(messages) {
    return messages.map(m => ({
      role:    m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));
  }

  _request(url, method, body, headers = {}, timeoutMs = 60000) {
    return new Promise((resolve, reject) => {
      const parsed  = new URL(url);
      const lib     = parsed.protocol === 'https:' ? https : http;
      const opts    = {
        hostname: parsed.hostname,
        port:     parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path:     parsed.pathname + parsed.search,
        method,
        headers:  body
          ? { ...headers, 'Content-Length': Buffer.byteLength(body) }
          : headers
      };

      const req = lib.request(opts, (res) => {
        let raw = '';
        res.on('data', d => { raw += d; });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            try {
              const err = JSON.parse(raw);
              return reject(new Error(err.error?.message || `HTTP ${res.statusCode}`));
            } catch (_) {
              return reject(new Error(`HTTP ${res.statusCode}`));
            }
          }
          try { resolve(JSON.parse(raw)); } catch (_) { resolve({ _raw: raw }); }
        });
      });

      req.setTimeout(timeoutMs, () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms`)); });
      req.on('error', reject);
      if (body) req.write(body);
      req.end();
    });
  }
}

module.exports = AnthropicProvider;
