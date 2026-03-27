324 New Ports and Paths Read Recent SOT Files 
324 New Ports and Paths Read Recent SOT Files 
324 New Ports and Paths Read Recent SOT Files 




# TANDRSocial - adir

**Status:** PAUSED (awaiting FB page admin access)
**Port:** 8099 (Node.js/Express)
**Updated:** 2026-02-08

---

## Key Files

- [BOOT.md](./BOOT.md) - How to start and use TANDRSocial
- [CURRENT-STATUS.md](./CURRENT-STATUS.md) - Current state
- [logs/](./logs/) - Conversations, post drafts, FB feed cache

## Quick Links

| What | URL |
|------|-----|
| Chat UI | http://localhost:8099/ |
| Dashboard | http://localhost:8099/dashboard.html |
| Status API | http://localhost:8099/api/bot.php?action=status |

## Start

```
cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial && node server.js
```

## Key Code

| File | Purpose |
|------|---------|
| server.js | Node.js server |
| api/bot.php | Main API router |
| api/graph-api.php | Facebook Graph API wrapper |
| api/security.php | Path validation |
| config.json | Settings, FB token |
| data/social-knowledge/ | Brand voice, services, audience |

## What It Does

Employee tool for Facebook content management:
- Monitor FB feeds and trends
- Research competitor content
- Draft social media posts
- Analyze post performance
- (Future) Post to page with approval workflow

## Detailed Docs

- [../CLAUDE.md](../CLAUDE.md) - Full architecture, Graph API, security
- [BOOT.md](./BOOT.md) - Quick start reference

---

Authority: [ADIR Hub](../../../adirhub/index.md)


324 New Ports and Paths Read Recent SOT Files 
324 New Ports and Paths Read Recent SOT Files 
324 New Ports and Paths Read Recent SOT Files 
324 New Ports and Paths Read Recent SOT Files 