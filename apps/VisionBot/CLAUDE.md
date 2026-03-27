**324 Ports and paths are changed ref data**

# CLAUDE.md - TANDRSocial Project

**Project:** TANDRSocial - Social Media Content Management AI
**Purpose:** Employee tool for Facebook content research, drafting, and (eventually) posting
**Status:** 🟡 IN DEVELOPMENT - Setup Complete, Testing Needed
**Type:** Employee-only application (local access, ngrok later with auth)

---

## PROJECT OVERVIEW

TANDRSocial is an **AI-powered social media content management assistant** designed for TANDR Builder employees. Unlike TANDRbot (public customer chatbot), this is an internal tool for:

1. **Monitoring** Facebook feeds and industry trends
2. **Researching** competitor content and successful strategies
3. **Drafting** social media posts based on company voice
4. **Analyzing** post performance and engagement metrics
5. **Eventually:** Posting to Facebook (with approval workflow)

**Key Difference from TANDRbot:**
- **TANDRbot:** Public-facing, responds to customer messages via Messenger webhook
- **TANDRSocial:** Employee-facing, reads feeds/drafts content via Graph API

---

## QUICK START FOR NEW SESSIONS

### 1. Read These Files First

**Essential Context:**
- `adir/CURRENT-STATUS.md` - Current status, what's done, what's next
- `config.json` - Complete configuration
- `api/graph-api.php` - Facebook Graph API wrapper

**Knowledge Base:**
- `data/social-knowledge/company-voice.md` - Brand guidelines
- `data/social-knowledge/services-and-products.md` - What TANDR Builder offers
- `data/social-knowledge/target-audience.md` - Who we're talking to

### 2. Start the Server

```bash
# From Desktop
C:\Users\tandradmin\Desktop\2026Start\START-TANDRSOCIAL.bat

# Manual start
cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial
node server.js
```

**Access:**
- Chat UI: http://localhost:8099/
- Dashboard: http://localhost:8099/dashboard.html
- API Status: http://localhost:8099/api/bot.php?action=status

### 3. Test Graph API (Once Token is Set)

```bash
# Test connection
php api/graph-api.php?test=graph

# Or via curl
curl "http://localhost:8099/api/graph-api.php?test=graph"
```

---

## ARCHITECTURE

### System Architecture

```
🧑 EMPLOYEE
    ↓
    ↓ [Browser: http://localhost:8099]
    ↓
🖥️ LOCAL SERVER (Port 8099)
    └── TANDRSocial Node.js Server
        ↓
        ↓ [Routes to PHP]
        ↓
    🤖 Bot API (api/bot.php)
        ├── Security Layer
        ├── LLM Provider (Ollama/Anthropic)
        ├── File Operations (sandboxed)
        └── Graph API Integration
            ↓
            ↓ [HTTPS to Facebook]
            ↓
        ☁️ Facebook Graph API
            ├── Read page feeds
            ├── Search posts
            ├── Get insights
            └── (Future) Post to page
```

**Benefits:**
- Same proven architecture as TANDRbot
- Completely separate instance (no cross-contamination)
- Sandboxed file access for security
- Can clone to other ports if needed

### Directory Structure

```
C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\
│
├── server.js                       Node.js server (Port 8099)
├── package.json                    Dependencies
├── config.json                     Complete configuration
├── index.html                      Chat UI
├── dashboard.html                  Admin panel
│
├── api/
│   ├── bot.php                     Main API router
│   ├── security.php                Path validation
│   ├── graph-api.php               Facebook Graph API wrapper (NEW)
│   └── providers/
│       ├── ollama.php              Local LLM
│       └── anthropic.php           Cloud LLM
│
├── data/
│   └── social-knowledge/           Knowledge base (READ by bot)
│       ├── company-voice.md        Brand guidelines
│       ├── services-and-products.md What we offer
│       └── target-audience.md      Who we're targeting
│
└── adir/                           Bot's workspace
    ├── CURRENT-STATUS.md           Current status
    └── logs/
        ├── conversations.txt       Chat logs
        ├── post-drafts/            Bot writes drafts here
        └── fb-feeds/               Cached feed data
```

---

## SECURITY ARCHITECTURE

### Sandboxing (Same as TANDRbot)

**READ Permissions:**
- `data/social-knowledge/*.md` - Company knowledge
- `adir/logs/fb-feeds/*.txt` - Cached feed data (bot's own cache)
- `adir/logs/fb-feeds/*.json` - JSON feed data

**WRITE Permissions:**
- `adir/logs/*.txt` - General logs
- `adir/logs/post-drafts/*.txt` - Post drafts
- `adir/logs/fb-feeds/*.txt` - Feed cache

**BLOCKED:**
- ❌ System files
- ❌ Other V3AM apps
- ❌ TANDRbot directory
- ❌ Code execution
- ❌ Direct Facebook posting (requires approval workflow)

### Path Validation

Same strict validation as TANDRbot:
- `realpath()` checks for directory traversal
- Extension whitelist (.md, .txt, .json only)
- Directory whitelist (only allowed paths)

---

## FACEBOOK GRAPH API INTEGRATION

### Setup Requirements

**1. Create New Facebook App**
- Go to: https://developers.facebook.com
- Create new app (Business type)
- Name: "TANDRSocial Content Manager" (or similar)
- Purpose: Employee content management

**2. Get Access Token**
- Add "Facebook Login" product
- Tools → Access Token Tool
- Generate **Page Access Token** for T & R Builder LLC page
- Required permissions:
  - `pages_read_engagement` - Read posts, comments, insights
  - `pages_manage_posts` - Post to page (future)
  - `read_insights` - Analytics

**3. Update config.json**
```json
"facebook_graph_api": {
    "access_token": "YOUR_NEW_TOKEN_HERE"
}
```

### Available Functions (api/graph-api.php)

```php
$api = createGraphAPI();

// Read TANDR Builder's posts
$feed = $api->getPageFeed(25);

// Search Facebook for construction posts
$results = $api->searchPosts('kitchen remodeling', 'post', 25);

// Get analytics
$insights = $api->getPageInsights(['page_impressions', 'page_engaged_users']);

// Get post comments
$comments = $api->getPostComments($postId, 50);

// Get specific post details
$post = $api->getPost($postId);

// FUTURE: Post to page (requires approval=true)
$result = $api->postToPage($message, ['approved' => true]);
```

### Graph API Capabilities

**What the Bot Can Do:**
1. **Monitor Feeds**
   - Read TANDR Builder's posts
   - Track engagement metrics
   - Analyze what's working

2. **Research Trends**
   - Search for construction-related posts
   - Find trending hashtags
   - Discover competitor content

3. **Analyze Performance**
   - Get post insights (impressions, engagement, clicks)
   - Compare performance across posts
   - Identify best posting times

4. **Read Engagement**
   - Get comments on posts
   - Analyze customer questions
   - Understand audience interests

5. **FUTURE: Post Content**
   - Post to page (with approval)
   - Schedule posts
   - Share content

---

## CONFIGURATION

### config.json Structure

**Key Sections:**

```json
{
    "app": {
        "name": "TANDRSocial",
        "access": "employee-only"
    },

    "security": {
        "allowed_read_dirs": ["data/social-knowledge", "adir/logs/fb-feeds"],
        "allowed_write_dirs": ["adir/logs", "adir/logs/post-drafts", "adir/logs/fb-feeds"]
    },

    "knowledge": {
        "base_path": "data/social-knowledge"  // Different from TANDRbot!
    },

    "system_prompt": {
        "role": "Social media content strategist..."  // Completely different role
    },

    "facebook_graph_api": {
        "enabled": true,
        "access_token": "PLACEHOLDER_GET_NEW_TOKEN",
        "permissions": ["pages_read_engagement", "pages_manage_posts", "read_insights"],
        "feed_monitoring": {
            "enabled": false,  // Enable later for automated checks
            "check_interval_minutes": 60
        }
    }
}
```

---

## BOT CAPABILITIES

### File Writing Pattern

The bot can save drafts using the same pattern as TANDRbot:

**Bot writes:**
```
[SAVE_FILE: post-drafts/2026-02-05-kitchen-remodel-tips.txt]
Post Type: Facebook
Suggested Time: Wednesday 7:00 AM
Tone: Educational

--- POST CONTENT ---
🔨 Kitchen Remodel Tips from the Pros 🔨

Thinking about updating your kitchen? Here are 3 things to consider BEFORE you start:

1. Layout First, Finishes Later
   Your workflow matters more than granite colors...

--- HASHTAGS ---
#KitchenRemodel #TheDallesOregon #HomeImprovement

--- NOTES FOR TEAM ---
This addresses the #1 customer question from last week's consultations.
Suggest pairing with before/after photos from the Johnson project.
[END_FILE]

I've drafted a post about kitchen remodeling tips. Check post-drafts/ for the full version!
```

**Result:**
- File saved to: `adir/logs/post-drafts/2026-02-05-kitchen-remodel-tips.txt`
- Team reviews and approves
- Post manually or via future automation

### Example Workflows

**1. Trend Research:**
```
User: "What's trending in construction this week?"
Bot: [Uses searchPosts() to find trending content]
     [Analyzes patterns]
     [Drafts 2-3 post ideas based on findings]
     [Saves drafts to post-drafts/]
     [Presents summary to user]
```

**2. Performance Analysis:**
```
User: "How are our Facebook posts performing?"
Bot: [Uses getPagePosts() and getPageInsights()]
     [Analyzes engagement metrics]
     [Identifies top performers]
     [Suggests what to do more of]
     [Saves analysis to fb-feeds/analysis-YYYY-MM-DD.txt]
```

**3. Competitor Research:**
```
User: "What are competitors posting about?"
Bot: [Uses searchPosts() for local contractors]
     [Analyzes content themes]
     [Identifies gaps/opportunities]
     [Drafts differentiated content]
     [Saves research and drafts]
```

**4. Content Idea Generation:**
```
User: "Give me 5 post ideas for next week"
Bot: [Reads company-voice.md for tone]
     [Checks recent posts via getPageFeed()]
     [Analyzes target-audience.md]
     [Generates diverse content mix]
     [Saves all 5 drafts with timing suggestions]
```

---

## KNOWLEDGE BASE MANAGEMENT

### Current Files

**data/social-knowledge/company-voice.md:**
- Brand voice guidelines
- Tone and style
- Content mix (60/30/10 rule)
- Posting frequency and times
- Hashtag strategy
- Visual guidelines
- Engagement guidelines

**data/social-knowledge/services-and-products.md:**
- All services with price ranges
- Project timelines
- Popular add-ons
- Service area
- Project process
- Warranties

**data/social-knowledge/target-audience.md:**
- Primary audience profiles
- Demographics and psychographics
- Pain points and needs
- Social media behavior
- Content preferences
- Common questions

### Adding New Knowledge

1. Create .md file in `data/social-knowledge/`
2. Write content (markdown format)
3. Bot automatically includes in context
4. Test with relevant questions

**Examples to Add:**
- `past-successful-posts.md` - Archive of top performers
- `seasonal-calendar.md` - Monthly content themes
- `competitor-analysis.md` - Research on local contractors
- `faq-responses.md` - Approved answers to common questions

---

## DEVELOPMENT WORKFLOW

### Daily Use

1. **Start server:**
   ```bash
   C:\Users\tandradmin\Desktop\2026Start\START-TANDRSOCIAL.bat
   ```

2. **Chat with bot:**
   - Open http://localhost:8099/
   - Ask for content ideas
   - Request trend research
   - Draft posts collaboratively

3. **Review drafts:**
   ```bash
   dir C:\V3AM\COMMAND-CENTER\apps\TANDRSocial\adir\logs\post-drafts\
   ```

4. **Edit knowledge:**
   - Use dashboard: http://localhost:8099/dashboard.html
   - Or edit .md files directly
   - Changes apply immediately (no restart)

### Testing Graph API

**Before you have a token:**
```bash
# Bot will work for chat but can't access Facebook
# Test LLM and file writing first
```

**After token is set:**
```php
# Test connection
php api/graph-api.php?test=graph

# Test in chat
"Can you read our latest Facebook posts?"
"Search for construction posts about kitchens"
"How many likes did our last post get?"
```

---

## SYSTEM STATUS INTEGRATION

### Add to V3AM Dashboard

**File:** `C:\V3AM\COMMAND-CENTER\PRIMARY-HULL.html`

Add link:
```html
<a href="http://localhost:8099/">TANDRSocial</a>
```

### Monitor Health

**Status endpoint:**
```bash
curl "http://localhost:8099/api/bot.php?action=status"
```

**Returns:**
```json
{
    "status": "operational",
    "version": "1.0.0",
    "environment": "production",
    "llm": {
        "provider": "ollama",
        "available": true
    },
    "knowledge": {
        "files": 3
    },
    "graph_api": {
        "enabled": true,
        "connected": true  // (if token valid)
    }
}
```

---

## DEPLOYMENT

### Current Setup: Local Only

**Access:**
- Port: 8099
- URL: http://localhost:8099/
- Audience: Employees on local network only

### Future: ngrok with Authentication

**Plan:**
1. Set up ngrok static domain (like TANDRbot)
2. Add authentication layer (password or OAuth)
3. Allow remote employee access
4. Keep separate from public TANDRbot

**Why Later:**
- Test thoroughly first
- Build approval workflow
- Ensure security is tight

---

## FUTURE ENHANCEMENTS

### Phase 1: Current (Testing)
- Chat interface working
- Graph API reading feeds
- Draft posts to text files
- Basic research capabilities

### Phase 2: Automation
- Scheduled feed checks (hourly/daily)
- Automated trend detection
- Performance alerts
- Content calendar integration

### Phase 3: Posting
- Approval workflow (team reviews drafts)
- TANDR Agent clone for posting
- Scheduled posting
- Multi-platform (Instagram, LinkedIn)

### Phase 4: Analytics
- Visual dashboard
- Performance tracking
- Competitor benchmarking
- ROI analysis

---

## TROUBLESHOOTING

### Server Won't Start

1. Check port 8099 available:
   ```bash
   netstat -ano | findstr :8099
   ```

2. Check Node.js installed:
   ```bash
   node --version
   ```

3. Check dependencies:
   ```bash
   cd C:\V3AM\COMMAND-CENTER\apps\TANDRSocial
   npm install
   ```

### Graph API Errors

**"Invalid access token":**
- Token expired or invalid
- Generate new token in Facebook Developers
- Update config.json

**"Insufficient permissions":**
- Token doesn't have required permissions
- Regenerate with: pages_read_engagement, pages_manage_posts, read_insights

**"Rate limit exceeded":**
- Wait and retry
- Reduce request frequency
- Check config.json rate_limits

### Bot Not Drafting Posts

1. Check system prompt includes file writing instructions
2. Ask bot explicitly: "Draft a post about [topic] and save it"
3. Check write permissions on adir/logs/post-drafts/
4. View dashboard logs for errors

---

## BEST PRACTICES

### DO:
✅ Test on localhost before exposing publicly
✅ Review all drafts before posting
✅ Keep knowledge base updated
✅ Monitor Graph API rate limits
✅ Save research for future reference
✅ Track what content performs well

### DON'T:
❌ Post directly without team review
❌ Share access tokens publicly
❌ Bypass security restrictions
❌ Ignore rate limits
❌ Copy competitor content exactly
❌ Post during off-hours without scheduling

---

## SECURITY BEST PRACTICES

### Access Tokens
- Store in config.json (not in code)
- Never commit to public repos
- Rotate regularly (every 60 days)
- Use least-privilege permissions

### Content Review
- Always review bot-drafted posts
- Verify facts and figures
- Check brand voice compliance
- Ensure no sensitive data leaked

### Data Privacy
- Don't scrape personal data
- Only read public posts
- Follow Facebook ToS
- Respect copyright

---

## COMMON TASKS

### Draft a Post

**Via Chat:**
```
User: "Draft a post about kitchen remodeling tips"
Bot: [Reads company-voice.md and services.md]
     [Crafts post following guidelines]
     [Saves to post-drafts/]
     [Shows preview]
```

### Research Trends

**Via Chat:**
```
User: "What are people talking about in construction this week?"
Bot: [Searches Facebook for construction posts]
     [Analyzes trending topics]
     [Suggests post ideas]
```

### Analyze Performance

**Via Chat:**
```
User: "How are our posts doing this month?"
Bot: [Gets page insights and post data]
     [Calculates engagement metrics]
     [Identifies top performers]
     [Suggests optimization]
```

### Add Knowledge

**Via Dashboard:**
1. Open http://localhost:8099/dashboard.html
2. Knowledge Base tab
3. Create new .md file
4. Save and test

---

## CONTACT & SUPPORT

**This is a V3AM internal project.**

**For Issues:**
1. Check `adir/CURRENT-STATUS.md`
2. Review `adir/logs/errors.txt`
3. Test Graph API connection
4. Check Facebook Developers console

**For Features:**
1. Document use case
2. Consider Graph API capabilities
3. Plan approval workflow
4. Test thoroughly before deploying

---

## FINAL NOTES

TANDRSocial is a **powerful employee tool** for social media management.

**Key Principles:**
1. **Research, don't post blindly** - Use data to inform decisions
2. **Draft, don't publish** - Always review before posting
3. **Learn, don't copy** - Analyze what works, make it yours
4. **Collaborate, don't automate** - AI assists, humans decide

**Relationship with TANDRbot:**
- **Completely separate** systems
- **Different purposes** (employee vs. customer)
- **Different Facebook integration** (Graph API vs. Messenger)
- **Can run simultaneously** (different ports)

**This is your content strategist assistant - use it wisely!** 🚀

---

**Version:** 1.0.0 (In Development)
**Status:** 🟡 Setup Complete, Testing Needed
**Port:** 8099
**Access:** Employee-only (local for now)
**Last Updated:** 2026-02-05

**324 Ports and paths are changed ref data**
