'use strict';
/**
 * llama.cpp LLM Provider
 *
 * Connects to a locally running llama-server (llama.cpp) instance.
 * llama-server exposes an OpenAI-compatible API at /v1/chat/completions
 * AND a direct /completion endpoint.
 *
 * We use the /completion endpoint for maximum compatibility with older builds
 * and to match the same prompt-building logic as the original Ollama provider.
 */

const http = require('http');
const https = require('https');

class LlamaCppProvider {
  /**
   * @param {object} config - LLM config block from config.json
   *   config.llamacpp.endpoint    - base URL of llama-server, e.g. http://127.0.0.1:8084
   *   config.llamacpp.model       - model name (informational only, server uses loaded model)
   *   config.llamacpp.temperature - sampling temperature (default 0.7)
   *   config.llamacpp.max_tokens  - max output tokens (default 4096)
   *   config.system_prompt        - system prompt section from config.json
   */
  constructor(config) {
    const llamaCfg = config.llamacpp || {};
    // Extract base URL - remove any path like /completion
    const endpoint = llamaCfg.endpoint || 'http://127.0.0.1:8084';
    const parsed = new URL(endpoint.replace(/\/completion.*$/, ''));
    const base = `${parsed.protocol}//${parsed.hostname}:${parsed.port}`.replace(/\/$/, '');
    
    // Use OpenAI-compatible endpoint
    this.completionUrl = `${base}/v1/chat/completions`;
    this.healthUrl     = `${base}/health`;
    this.model         = llamaCfg.model || 'default';
    this.temperature   = llamaCfg.temperature !== undefined ? llamaCfg.temperature : 0.7;
    this.maxTokens     = llamaCfg.max_tokens || 4096;
    this.systemPrompt  = config.system_prompt || {};
    
    // Debug logging
    console.log(`[LLAMACPP] endpoint=${endpoint}, base=${base}, completionUrl=${this.completionUrl}`);
  }

  /**
   * Send a chat request to llama.cpp using OpenAI-compatible API
   */
  async chat(messages, knowledgeContext = '') {
    try {
      // Build messages array with system prompt and knowledge context
      const apiMessages = [];
      
      // System message
      if (this.systemPrompt && this.systemPrompt.role) {
        apiMessages.push({ role: 'system', content: this.systemPrompt.role });
      }
      
      // Add knowledge context as a system message if present
      if (knowledgeContext && knowledgeContext.trim()) {
        apiMessages.push({ role: 'system', content: `Knowledge Base:\n${knowledgeContext.trim()}` });
      }
      
      // Add conversation messages
      apiMessages.push(...messages);

      const body = JSON.stringify({
        messages: apiMessages,
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        stream: false
      });

      const data = await this._request(this.completionUrl, 'POST', body);

      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response from llama.cpp: ' + JSON.stringify(data));
      }

      return {
        success:  true,
        content:  (data.choices[0].message.content || '').trim(),
        model:    data.model || this.model,
        provider: 'llamacpp',
        tokens: {
          prompt:     data.usage?.prompt_tokens || 0,
          completion: data.usage?.completion_tokens || 0,
          total:     (data.usage?.prompt_tokens || 0) + (data.usage?.completion_tokens || 0)
        }
      };

    } catch (err) {
      return {
        success:  false,
        error:    err.message,
        provider: 'llamacpp'
      };
    }
  }

  /**
   * Check whether llama-server is reachable
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    try {
      const data = await this._request(this.healthUrl, 'GET', null, 2000);
      return data && (data.status === 'ok' || data.status === 'loading model');
    } catch (_) {
      return false;
    }
  }

  /**
   * Return model/provider info (matches interface expected by php-bridge)
   */
  async getModelInfo() {
    const available = await this.isAvailable();
    return {
      provider:   'llamacpp',
      model:      this.model,
      max_tokens: this.maxTokens,
      endpoint:   this.completionUrl,
      available
    };
  }

  // ── Private ───────────────────────────────────────────────────────────────

  /**
   * Build the full prompt string from messages + knowledge context.
   * Mirrors the logic in the original OllamaProvider::buildPrompt()
   */
  _buildPrompt(messages, knowledgeContext) {
    let prompt = '';

    // System / role prompt
    if (this.systemPrompt && this.systemPrompt.role) {
      prompt += this.systemPrompt.role + '\n\n';
    }

    // Instructions
    if (this.systemPrompt && Array.isArray(this.systemPrompt.instructions)) {
      prompt += 'Instructions:\n';
      for (const instr of this.systemPrompt.instructions) {
        prompt += `- ${instr}\n`;
      }
      prompt += '\n';
    }

    // Knowledge base context
    if (knowledgeContext && knowledgeContext.trim()) {
      prompt += 'Knowledge Base:\n';
      prompt += '====================\n';
      prompt += knowledgeContext.trim() + '\n';
      prompt += '====================\n\n';
      prompt += 'Use the above knowledge base to answer questions accurately. If the information is not in the knowledge base, say so.\n\n';
    }

    // Conversation history
    prompt += 'Conversation:\n';
    for (const msg of messages) {
      const role = msg.role.charAt(0).toUpperCase() + msg.role.slice(1);
      prompt += `${role}: ${msg.content}\n`;
    }
    prompt += 'Assistant: ';

    return prompt;
  }

  /**
   * Minimal HTTP/HTTPS fetch wrapper (no external deps)
   */
  _request(url, method, body, timeoutMs = 60000) {
    return new Promise((resolve, reject) => {
      const parsed   = new URL(url);
      const lib      = parsed.protocol === 'https:' ? https : http;
      const options  = {
        hostname: parsed.hostname,
        port:     parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path:     parsed.pathname + parsed.search,
        method:   method || 'GET',
        headers:  body
          ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
          : {}
      };

      const req = lib.request(options, (res) => {
        let raw = '';
        res.on('data', d => { raw += d; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch (_) {
            resolve({ _raw: raw, _status: res.statusCode });
          }
        });
      });

      req.setTimeout(timeoutMs, () => {
        req.destroy();
        reject(new Error(`Request timed out after ${timeoutMs}ms`));
      });

      req.on('error', reject);
      if (body) req.write(body);
      req.end();
    });
  }
}

module.exports = LlamaCppProvider;
