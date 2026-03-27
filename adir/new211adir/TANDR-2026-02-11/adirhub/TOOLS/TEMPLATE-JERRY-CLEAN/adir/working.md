**324 Ports and paths are changed ref data**

```
╔══════════════════════════════════════════════════════════════════════╗
║  ADIR SYSTEM - HOW THINGS WORK                                      ║
║  C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\             ║
║  TEMPLATE-JERRY-CLEAN\adir\working.md                               ║
║  Updated: 2026-03-16 | The blueprint — architecture and design.      ║
╠══════════════════════════════════════════════════════════════════════╣
║  AGENT: This explains how agents built from this template work.      ║
║  The routing, the tool system, the console protocol, and how a       ║
║  template becomes a running agent.                                   ║
║                                                                      ║
║  Parent: C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\     ║
║  Hub: http://127.0.0.1:9303                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

# How This Template Works

This is the architectural record for TEMPLATE-JERRY-CLEAN — the standard agent template. Every agent deployed with `"type": "jerry"` through Agent-Dropper v2 is a copy of this blueprint.

---

## The Dual Route Pattern

The JERRY template's server.js has a routing quirk that's important to understand. It handles API calls on TWO paths:

- `/api/:script` — Maps to `AGENT_DIR/api/:script`
- `/agent/api/:script` — Also maps to `AGENT_DIR/api/:script`

Both routes resolve to the same PHP scripts. This exists because the template was originally designed with an `agent/` subdirectory structure where all the application code lived inside `agent/`. The root directory was just the server wrapper.

When Agent-Dropper deploys a new agent, it fixes `AGENT_DIR` to point to `ROOT_DIR` instead of `ROOT_DIR/agent`. This means both `/api/agent.php` and `/agent/api/agent.php` will look for `agent.php` in the root `api/` directory. Both still work — the dual route just adds flexibility for callers.

---

## The Tool System

Agents built from this template have a structured tool system defined in config.json:

- **chat** — Conversational interaction with the LLM
- **scan** — Directory scanning, reads `.md` and `.txt` files
- **memory** — Conversation history management
- **context** — View what's currently loaded in the agent's context

Tools are invoked through the chat interface using a bracket pattern: `[TOOL_CALL: tool_id | param=value]`. The PHP API interprets these directives and executes them. This is the same pattern used in the system prompt — the LLM generates tool calls, and the PHP layer executes them.

Available tool calls include:
- `[TOOL_CALL: file_read | path=filename]` — Read a file
- `[TOOL_CALL: file_write | path=filename | content=...]` — Write a file
- `[TOOL_CALL: file_list | path=directory]` — List directory contents
- `[TOOL_CALL: http_get | url=...]` — HTTP GET request
- `[TOOL_CALL: shell_command | command=...]` — Execute a shell command
- `[TOOL_CALL: datetime]` — Get current timestamp
- `[TOOL_CALL: calculate | expression=...]` — Math evaluation

---

## The Console Protocol

The template's system prompt defines a structured output format that agents follow. Every response includes:

**Header:** Agent name, role, home path, model, current focus
**Progress tracker:** A table showing steps completed, in progress, and pending
**Footer:** Current status, next tool to call, awaiting user input

This protocol serves multiple purposes. It keeps the agent oriented across long conversations — the header grounds it in who it is and where it lives. The progress tracker prevents the agent from losing its place during multi-step tasks. And when multiple agents communicate in a chain, the console headers distinguish voices.

The protocol also includes **sanity checks** — explicit verification steps that the agent should follow when results seem wrong. The pattern is: verify the tool works with a known command, verify directory contents, verify file writes actually landed, and execute one tool per cycle to prevent cascading errors.

---

## Multi-Provider LLM Support

Unlike TANDRSOCIAL (which primarily uses Ollama), the JERRY template supports four LLM providers:

| Provider | Config Key | Notes |
|----------|-----------|-------|
| Ollama | `llm.local` | Local models, endpoint at 11434 |
| Anthropic | `llm.anthropic` | Claude models via API |
| Gemini | `llm.gemini` | Google's models via API |
| OpenAI | `llm.openai` | GPT models via API |

The active provider is set by `llm.provider` in config.json. The template defaults to `"gemini"` but this gets changed during deployment based on what's available. For the FOB system, Ollama is the standard since everything runs local.

There's also a Google Custom Search integration under `search` — the agent can search the web if configured with a CSE ID and API key.

---

## Template to Running Agent: The Transformation

When Agent-Dropper v2 deploys a jerry-type agent:

1. **Copy** — Entire template directory cloned to `apps/[AgentName]`
2. **Config** — New `config.json` with assigned port and name
3. **AGENT_DIR fix** — Line 34 of server.js changed from `path.join(ROOT_DIR, 'agent')` to `ROOT_DIR`
4. **Startup script** — `START-[AgentName].bat` generated
5. **Independence** — The deployed agent is fully self-contained

The key difference from the TANDRSOCIAL transformation: JERRY agents have more complex routing (dual `/api/` and `/agent/api/` paths) and a richer tool system. The AGENT_DIR fix is more critical here because the template's original routing assumed an `agent/` subdirectory that deployed copies don't always have.

---

## How JERRY Differs from TANDRSOCIAL

| Feature | JERRY (Agent) | TANDRSOCIAL (Bot) |
|---------|--------------|-------------------|
| Primary API | `agent.php` | `bot.php` |
| Routing | Dual (`/api/` + `/agent/api/`) | Single (`/api/`) |
| LLM Providers | 4 (Ollama, Anthropic, Gemini, OpenAI) | 2 (Ollama, Anthropic) |
| Tool system | Full (chat, scan, memory, context, shell, http) | Basic (chat, knowledge read, file write) |
| Facebook API | No | Yes |
| Knowledge base | General directory scanning | Structured `social-knowledge/` |
| Console protocol | Yes (header/footer/progress) | No |
| Web search | Yes (Google CSE) | No |
| Port config | Falls back to 9200 if missing | Requires port in config (exits if missing) |

JERRY is the general-purpose template — it can be configured to do almost anything. TANDRSOCIAL is specialized for content management. Choose JERRY when you need a flexible agent. Choose TANDRSOCIAL when you need a social media bot with a knowledge base and drafting pipeline.

---

## The System Prompt Architecture

The JERRY template's system prompt is extensive — it defines the agent's entire personality and operational protocol. Key components:

- **Identity block** — Name, role, home path
- **Console protocol** — How to format every response
- **Sanity check protocol** — Verification steps for uncertain results
- **Tool usage reference** — Every available tool with syntax
- **API reference** — How to call other services (though current references are stale)
- **Critical rules** — Tool ID naming, curl JSON handling, full paths, file formats
- **Key reference files** — Load order for grounding (BOOT → STATUS → map)

When deploying a new agent, this prompt should be customized to match the agent's specific role. The structure is reusable — the console protocol, sanity checks, and tool patterns work for any agent. The identity, API references, and knowledge file lists need to be updated per deployment.

---

## Design Decisions

**Why dual API routes?** Historical. The template was built when agents had a nested `agent/` subdirectory. Both routes were kept for backwards compatibility. It means callers can use either `/api/agent.php` or `/agent/api/agent.php` and reach the same handler.

**Why four LLM providers?** Flexibility. Different deployments may have different providers available. A local installation uses Ollama. A cloud deployment might use Anthropic or Gemini. The template supports all of them so it works anywhere without code changes — just config changes.

**Why console protocol in the system prompt?** Context management. When an agent runs through a 20-step task, the progress tracker keeps it oriented. When multiple agents talk to each other, the console headers distinguish voices. When the context window fills up, the structured format helps the LLM stay grounded in who it is and what it's doing.

**Why sanity checks?** Experience. Early testing revealed that agents would assume file writes succeeded without verifying, leading to cascading errors in multi-step tasks. The one-tool-per-cycle rule and explicit verification steps prevent this. It's slower but more reliable.

```
╔══════════════════════════════════════════════════════════════════════╗
║  END OF working.md                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  You understand the template architecture. Your next move:           ║
║                                                                      ║
║  → See the template's current status:                                ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\current.md                             ║
║                                                                      ║
║  → Back to this template's index:                                    ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-JERRY-CLEAN\adir\index.md                                ║
║                                                                      ║
║  → See the other template (TANDRSOCIAL):                             ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\TOOLS\           ║
║    TEMPLATE-TANDRSOCIAL-CLEAN\adir\                                  ║
║                                                                      ║
║  → Back to the hub:                                                  ║
║    C:\FOB\adir\new211adir\TANDR-2026-02-11\adirhub\index.md         ║
║                                                                      ║
║  To evolve this blueprint, create:                                   ║
║  SOT-[YYYYMMDD]-jerry-template-architecture.md                       ║
║  Place in this adir directory.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

**324 Ports and paths are changed ref data**
