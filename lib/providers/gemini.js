'use strict';
/**
 * Google Gemini Provider
 *
 * Ported from gemini.php — same interface as LlamaCppProvider and AnthropicProvider.
 */

const https = require('https');
const http  = require('http');

class GeminiProvider {
  constructor(config) {
    const gc      = config.gemini || {};
    this.apiKey   = gc.api_key || '';
    this.model    = gc.model   || 'gemini-2.0-flash';
    this.maxTokens    = gc.max_tokens   || 8192;
    this.temperature  = gc.temperature !== undefined ? gc.temperature : 0.7;
    this.systemPrompt = config.system_prompt || {};
  }

  async chat(messages, knowledgeContext = '') {
    try {
      if (!this.apiKey) throw new Error('Gemini API key not configured');

      const systemText = this._buildSystemPrompt(knowledgeContext);
      const url        = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

      const body = JSON.stringify({
        system_instruction: { parts: [{ text: systemText }] },
        contents:           this._formatMessages(messages),
        generationConfig: {
          temperature:     this.temperature,
          maxOutputTokens: this.maxTokens
        }
      });

      const data = await this._request(url, 'POST', body);

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        const reason = data?.candidates?.[0]?.finishReason || 'unknown';
        throw new Error(`No content in Gemini response (finishReason: ${reason})`);
      }

      return {
        success:  true,
        content:  text.trim(),
        model:    this.model,
        provider: 'gemini',
        tokens: {
          prompt:     data.usageMetadata?.promptTokenCount     || 0,
          completion: data.usageMetadata?.candidatesTokenCount || 0,
          total:      data.usageMetadata?.totalTokenCount      || 0
        },
        stop_reason: data.candidates?.[0]?.finishReason || 'STOP'
      };

    } catch (err) {
      return { success: false, error: err.message, provider: 'gemini' };
    }
  }

  isAvailable() { return !!this.apiKey; }

  async getModelInfo() {
    return {
      provider:  'gemini',
      model:     this.model,
      max_tokens: this.maxTokens,
      available: this.isAvailable()
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
      role:  m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
  }

  _request(url, method, body, timeoutMs = 60000) {
    return new Promise((resolve, reject) => {
      const parsed = new URL(url);
      const lib    = parsed.protocol === 'https:' ? https : http;
      const opts   = {
        hostname: parsed.hostname,
        port:     parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path:     parsed.pathname + parsed.search,
        method,
        headers: body
          ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
          : {}
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

module.exports = GeminiProvider;
