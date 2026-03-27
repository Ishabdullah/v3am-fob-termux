**324 Ports and paths are changed ref data**

# TANDRSocial - Social Media Content Management AI

## What is TANDRSocial?

TANDRSocial is an AI-powered employee tool for managing TANDR Builder's social media presence. It monitors Facebook, researches trends, drafts posts, and analyzes performance.

**This is NOT TANDRbot** (the public customer chatbot). This is an internal content management assistant.

---

## Quick Start

### 1. Start the Server

**Double-click:**
```
C:\Users\tandradmin\Desktop\2026Start\START-TANDRSOCIAL.bat
```

**Or manually:**
```bash
cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial
node server.js
```

### 2. Access the Interface

- **Chat UI:** http://localhost:8099/
- **Dashboard:** http://localhost:8099/dashboard.html
- **API Status:** http://localhost:8099/api/bot.php?action=status

### 3. Set Up Facebook Access (First Time)

1. Go to https://developers.facebook.com
2. Create new app: "TANDRSocial Content Manager"
3. Add Facebook Login product
4. Generate Page Access Token for "T & R Builder LLC"
5. Copy token to `config.json`:
   ```json
   "facebook_graph_api": {
       "access_token": "YOUR_TOKEN_HERE"
   }
   ```

**Required Permissions:**
- `pages_read_engagement`
- `pages_manage_posts`
- `read_insights`

---

## What Can It Do?

### Research & Monitoring
- ✅ Read TANDR Builder's Facebook posts
- ✅ Search Facebook for construction trends
- ✅ Analyze competitor content
- ✅ Track engagement metrics
- ✅ Identify trending topics

### Content Creation
- ✅ Draft social media posts following brand voice
- ✅ Generate content ideas based on research
- ✅ Suggest optimal posting times
- ✅ Create post variations for different platforms
- ✅ Save drafts for team review

### Analysis
- ✅ Get post performance metrics
- ✅ Identify top-performing content
- ✅ Analyze audience engagement
- ✅ Suggest content optimization
- ✅ Track trends over time

### Future (Not Yet Built)
- ⏳ Automated feed monitoring
- ⏳ Direct posting (with approval workflow)
- ⏳ Multi-platform support (Instagram, LinkedIn)
- ⏳ Content calendar integration
- ⏳ Visual analytics dashboard

---

## Example Usage

### Ask for Content Ideas
```
User: "Give me 3 post ideas for this week"
Bot: [Analyzes company voice and recent posts]
     [Drafts 3 posts with different themes]
     [Saves to adir/logs/post-drafts/]
     [Shows summary]
```

### Research Trends
```
User: "What's trending in kitchen remodeling this week?"
Bot: [Searches Facebook for relevant posts]
     [Analyzes engagement patterns]
     [Suggests post angles based on findings]
```

### Analyze Performance
```
User: "How are our Facebook posts performing?"
Bot: [Fetches page insights]
     [Calculates engagement metrics]
     [Identifies top performers]
     [Suggests what to do more of]
```

### Draft a Post
```
User: "Draft a post about our new project in Hood River"
Bot: [Reads company voice guidelines]
     [Crafts engaging post]
     [Adds appropriate hashtags]
     [Saves to post-drafts/2026-02-05-hood-river-project.txt]
```

---

## File Locations

### Knowledge Base
Where the bot learns about TANDR Builder:
```
C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\data\social-knowledge\
├── company-voice.md          Brand guidelines
├── services-and-products.md  What we offer
└── target-audience.md        Who we're targeting
```

### Post Drafts
Where the bot saves drafted posts:
```
C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\adir\logs\post-drafts\
├── 2026-02-05-kitchen-tips.txt
├── 2026-02-05-project-showcase.txt
└── 2026-02-06-seasonal-prep.txt
```

### Feed Cache
Where the bot caches Facebook data:
```
C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\adir\logs\fb-feeds\
├── feed-2026-02-05.json
└── trends-analysis-2026-02-05.txt
```

---

## Configuration

### Main Config
```
C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\config.json
```

**Key Settings:**
- `facebook_graph_api.access_token` - Your Facebook token
- `system_prompt.role` - Bot personality and instructions
- `knowledge.base_path` - Where knowledge files are stored
- `llm.provider` - Which AI to use (ollama or anthropic)

### Edit Knowledge
Use the dashboard to edit knowledge files:
```
http://localhost:8099/dashboard.html
→ Knowledge Base tab
→ Select file or create new
→ Edit and save
```

Changes apply immediately (no restart needed).

---

## Architecture

**Port:** 8099 (separate from TANDRbot 8081, main 8080)

**Stack:**
- Node.js/Express (handles concurrent connections)
- PHP (API logic, Graph API wrapper)
- Ollama (local AI) or Anthropic (cloud AI)
- Facebook Graph API (read feeds, post, get insights)

**Security:**
- Sandboxed file access (can only read/write approved directories)
- Employee-only (no public exposure)
- No direct posting without approval

**Cloned From:**
- TANDRbot (proven architecture)
- Completely separate instance
- Different purpose, different config, different knowledge

---

## Development Status

✅ **COMPLETED:**
- Server infrastructure (Node.js on port 8099)
- Configuration system
- Graph API wrapper
- Knowledge base (3 files created)
- File writing capability
- Security sandboxing
- LLM integration (Ollama + Anthropic)
- Startup scripts
- Documentation

⏳ **TODO:**
- Get Facebook access token
- Test Graph API connection
- Test post drafting
- Test feed reading
- Create approval workflow
- Set up ngrok (optional, for remote access)

---

## Testing Checklist

### Basic Functionality
- [x] Server starts on port 8099
- [x] Status endpoint responds
- [ ] Chat interface loads
- [ ] Can send messages to bot
- [ ] Bot responds correctly

### Facebook Integration
- [ ] Access token configured
- [ ] Token validation succeeds
- [ ] Can read TANDR Builder page feed
- [ ] Can search Facebook posts
- [ ] Can get post insights

### Content Creation
- [ ] Bot drafts posts following brand voice
- [ ] Files saved to post-drafts/ directory
- [ ] Drafts include hashtags and notes
- [ ] Can edit drafts via dashboard

### Knowledge Base
- [ ] Bot uses company voice guidelines
- [ ] References services and pricing
- [ ] Targets appropriate audiences
- [ ] Can add/edit knowledge files

---

## Troubleshooting

### Server Won't Start
```bash
# Check if port in use
netstat -ano | findstr :8099

# Kill if needed
taskkill /PID [PID] /F

# Reinstall dependencies
cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial
npm install
```

### Graph API Errors
- **Invalid token:** Regenerate in Facebook Developers
- **No permissions:** Add required permissions to token
- **Rate limited:** Wait 1 hour, reduce request frequency

### Bot Not Working
```bash
# Check logs
type C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\adir\logs\errors.txt

# Check Ollama running
curl http://localhost:11434/api/tags

# Test status
curl http://localhost:8099/api/bot.php?action=status
```

---

## Important Notes

### TANDRbot vs TANDRSocial

| Feature | TANDRbot | TANDRSocial |
|---------|----------|-------------|
| **Purpose** | Customer chat | Content management |
| **Access** | Public (ngrok) | Employee-only |
| **Facebook** | Messenger webhook | Graph API |
| **Port** | 8081 | 8099 |
| **Knowledge** | data/knowledge/ | data/social-knowledge/ |
| **Function** | Answer questions | Draft posts |

**Both can run simultaneously** - completely separate systems.

### Security

- ✅ Employee-only access (local for now)
- ✅ Sandboxed file operations
- ✅ No direct posting (requires approval)
- ✅ Access tokens in config (not code)
- ✅ Rate limiting enabled

### Best Practices

1. **Always review drafts** before posting
2. **Keep knowledge base updated** with latest info
3. **Monitor Graph API rate limits** (200/hour)
4. **Save successful posts** to knowledge base
5. **Track performance** to learn what works

---

## Next Steps

1. **Get Facebook token** (see setup instructions above)
2. **Test connection** with sample queries
3. **Draft first post** and review quality
4. **Refine knowledge base** based on results
5. **Build approval workflow** for posting
6. **Set up ngrok** for remote access (optional)

---

## Documentation

- **CLAUDE.md** - Complete technical documentation
- **CURRENT-STATUS.md** - Current state and progress
- **config.json** - All configuration settings
- **api/graph-api.php** - Graph API wrapper code

---

## Support

This is an internal V3AM project.

**For issues:**
- Check CURRENT-STATUS.md
- Review error logs
- Test Graph API connection
- Consult CLAUDE.md

**For features:**
- Document use case
- Plan implementation
- Test thoroughly
- Update documentation

---

**Version:** 1.0.0
**Status:** Setup Complete, Testing Needed
**Created:** 2026-02-05
**Port:** 8099
**Access:** Employee-only (local)

🚀 **Ready to help TANDR Builder create amazing social media content!**

**324 Ports and paths are changed ref data**
