**324 Ports and paths are changed ref data**

# FOB Capabilities

## AI Providers Supported

FOB bots can connect to any of these AI providers. Each deployment picks one as primary with a fallback for reliability:

- **Google Gemini** — Fast, capable, generous free tier. Good default for most bots.
- **Anthropic Claude** — Excellent reasoning and instruction following. Strong for complex tasks.
- **xAI Grok** — Access to Grok 3 and Grok Vision. Good for reasoning and live data.
- **OpenRouter** — One API key routes to 100+ models including free tiers. Best for flexibility.
- **Local Ollama** — Runs on your own hardware. No API costs, no data leaving your machine. Requires a GPU or strong CPU.
- **Custom endpoint** — Any OpenAI-compatible API. Point it at your own server or any compatible service.

Switching models does not require code changes. It is a config setting.

## Voice

- Push-to-talk or continuous listening mode
- Speaks responses aloud using browser text-to-speech
- Google voice preference with sentence-by-sentence chunking for natural delivery
- Can be interrupted mid-sentence
- Works in Chrome and Edge

## Vision

Agents with vision capability can:
- Accept screenshot uploads and reason about what they see
- Capture the screen in real time via the ScreenStream relay
- Analyze images, UI states, documents, and diagrams
- Use vision to guide actions or report on system state

Vision works with Gemini, Claude, Grok Vision, and local vision models like qwen3-vl.

## File and Knowledge Operations

- Read markdown and text files from a defined knowledge directory
- Answer questions grounded in that knowledge
- Save notes, SOT files, and logs to their own working directory
- Knowledge updates take effect immediately — no restart required

## Shell Command Execution (Agent Mode)

Full agents (as opposed to customer bots) can execute shell commands on the host machine. This enables:
- File system navigation and manipulation
- Running scripts and programs
- Checking system status
- Automating tasks on demand

## Cross-Agent Communication

Any agent can talk to any other agent in the fleet over HTTP. Standard pattern:
- Chat: POST to /api/agent.php or /api/bot.php with a message
- Status check: GET ?action=status
- Delegate a task to a specialist agent and return the result

## Web Search

Bots can perform web searches and include results in their responses. Useful for answering questions about current events or anything outside the knowledge base.

## Deployment and Scaling

- Each bot runs as its own Node.js process on its own port
- Multiple bots run simultaneously on the same machine
- New bots are created through KB-Maker in minutes
- Bots can be tunneled to the public internet via ngrok

**324 Ports and paths are changed ref data**
