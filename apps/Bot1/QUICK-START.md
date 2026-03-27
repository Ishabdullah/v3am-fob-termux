324 Ports and paths are changed ref data
324 Ports and paths are changed ref data
324 Ports and paths are changed ref data


# TANDRSocial - Quick Start Guide

## ✅ SYSTEM IS RUNNING!

**Server:** http://localhost:8099/
**Status:** Operational

---

## 🚀 HOW TO USE

### 1. Open the Chat Interface

Open your browser to: **http://localhost:8099/**

### 2. Talk to the AI

Try these commands:

**Check the queue:**
```
"What's in the post-queue?"
"Check the post-queue and tell me which posts are ready"
```

**Draft new posts:**
```
"Draft a post about bathroom remodeling tips"
"Create 3 post ideas for next week"
```

**Get advice:**
```
"Should I post the kitchen tips post?"
"When's the best time to post about winter prep?"
```

---

## 📁 POST QUEUE SYSTEM

### Adding Posts to Queue

1. Go to: `C:\v3am\COMMAND-CENTER\apps\TANDRSocial\adir\logs\post-queue\`
2. Create a `.txt` file with your post idea
3. Ask the AI: "Check the post-queue"
4. AI will review and suggest which to post

### Example Posts Already in Queue

- `example-post-kitchen-tips.txt` - Ready to post
- `example-post-winter-prep.txt` - Needs refinement

### Simple Format

```
Title: Your Post Title
Platform: Facebook
Priority: High/Medium/Low

Post Content:
[Your post text here]

Hashtags: #YourHashtags #Here

Notes for AI:
- Any context or suggestions
```

---

## 🔑 USING GRAPH EXPLORER TOKENS

Since we can't get a long-term token, use Facebook Graph Explorer tokens for testing:

### Getting a Temp Token

1. Go to: https://developers.facebook.com/tools/explorer/
2. Select "T & R Builder LLC" page
3. Click "Generate Access Token"
4. Permissions needed: `pages_read_engagement`, `pages_manage_posts`
5. Copy the token

### Using the Token in Chat

Tell the AI:
```
"Use this token: [paste token here]"
"Now check our recent Facebook posts"
"Post the kitchen tips post to Facebook"
```

**Token expires in 1-2 hours** - just get a new one when needed.

---

## 💡 EXAMPLE WORKFLOWS

### Review Queue and Post

```
You: "Check the post-queue"

AI: [Reads all posts in queue]
    "I found 2 posts:
    1. Kitchen tips - READY (good content, proper format)
    2. Winter prep - NEEDS WORK (too salesy)"

You: "Improve the winter prep post"

AI: [Rewrites with better educational focus]
    [Saves improved version]

You: "Post the kitchen tips post to Facebook"

AI: "I'll need a Graph Explorer token to post..."

You: "Use this token: EAAbc123..."

AI: [Posts to Facebook]
    "Posted successfully! Post ID: 123456789"
```

### Draft New Content

```
You: "Draft 3 posts for next week"

AI: [Analyzes company voice]
    [Creates 3 diverse posts]
    [Saves to post-queue/]
    "I've created 3 posts:
    1. Project showcase
    2. DIY tips
    3. Local community focus"

You: "Show me the project showcase post"

AI: [Displays full post]

You: "Perfect, post it now"

AI: [Posts with current token]
```

---

## 📊 FOLDERS

**Post Queue:**
`C:\v3am\COMMAND-CENTER\apps\TANDRSocial\adir\logs\post-queue\`
- Drop posts here for AI to review

**Post Drafts:**
`C:\v3am\COMMAND-CENTER\apps\TANDRSocial\adir\logs\post-drafts\`
- AI saves refined posts here

**Knowledge Base:**
`C:\v3am\COMMAND-CENTER\apps\TANDRSocial\data\social-knowledge\`
- Company voice, services, audience info

---

## 🔧 COMMANDS

**Start Server:**
```bash
cd C:\v3am\COMMAND-CENTER\apps\TANDRSocial
node server.js
```

**Check Status:**
```bash
curl http://localhost:8099/api/bot.php?action=status
```

**View Logs:**
```bash
type adir\logs\conversations.txt
type adir\logs\errors.txt
```

---

## ⚠️ IMPORTANT NOTES

**Tokens:**
- Use Graph Explorer tokens (they're temporary)
- Get new tokens when they expire (~1-2 hours)
- Never commit tokens to code

**Posting:**
- AI won't auto-post without being asked
- Always review before posting
- AI will confirm before posting

**Files:**
- AI can only read/write in approved folders
- Drop posts in post-queue for AI to review
- AI saves drafts to post-drafts

---

## 🎯 CURRENT STATUS

✅ Server running on port 8099
✅ Post queue system configured
✅ AI can read posts from queue
✅ AI can draft and save posts
✅ Ready for Graph Explorer tokens
✅ Knowledge base loaded

**Next Steps:**
1. Open http://localhost:8099/
2. Try: "Check the post-queue"
3. Add your own posts to the queue
4. Get Graph Explorer token when ready to post

---

**You're all set! Start chatting with your social media AI assistant!** 🚀



324 Ports and paths are changed ref data
324 Ports and paths are changed ref data
324 Ports and paths are changed ref data