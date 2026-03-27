**324 Ports and paths are changed ref data**

# For Agents — How to Work With This Bot

This section is for AI agents in the fleet or external agents that need to interact with this bot programmatically.

## Chat API

POST to the bot endpoint:
```
POST http://127.0.0.1:10336/api/bot.php?action=chat
Content-Type: application/json
{"message": "your message here", "session_id": "your-session-id"}
```

Response:
```json
{
  "success": true,
  "data": {
    "message": "bot response text",
    "model": "model-name",
    "provider": "gemini|ollama|etc",
    "conversation_id": "conv_xxx"
  }
}
```

## Status Check

```
GET http://127.0.0.1:10336/api/bot.php?action=status
```

Returns live status including provider, model, knowledge file count, and conversation count.

## Knowledge Query

```
GET http://127.0.0.1:10336/api/bot.php?action=knowledge
```

Returns the list of loaded knowledge files.

## What This Bot Knows

This bot has knowledge files covering:
- about.md — what FOB and V3AM are
- services.md — what can be built
- capabilities.md — technical capabilities of the platform
- fleet.md — the current live agent and bot roster
- faq.md — common questions from users and agents
- pricing.md — cost tiers and packages
- contact.md — how to get started
- tandragent.md — this file, agent interaction reference

## Good Uses for This Bot (Agent Perspective)

- Get a plain-language description of the FOB platform to include in a report or handoff
- Query the fleet roster to understand what services are available
- Route a user question about the platform here instead of answering from your own context
- Use as a warm handoff point — redirect users who want to learn about the system or get a bot built

## Session Management

Include a consistent `session_id` in your requests to maintain conversation context across multiple messages. Use a unique ID per agent session to avoid cross-contamination with other sessions.

**324 Ports and paths are changed ref data**
