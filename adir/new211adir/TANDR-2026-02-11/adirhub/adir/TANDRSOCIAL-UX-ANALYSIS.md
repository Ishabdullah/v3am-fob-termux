**324 Ports and paths are changed ref data**

# TANDRSocial - User Experience Analysis

**Purpose:** Understand TANDRSocial so we can replicate it for DIY, Estimate, Food, and other knowledge bots

---

## 🎯 What TANDRSocial Does (User Perspective)

TANDRSocial is **an AI assistant that knows about your business and helps you make content decisions**.

### The User Experience

**User sits down with TANDRSocial and can:**
1. Ask: "What should we post about this week?"
   - AI suggests topics based on what's trending
2. Ask: "Draft a post about kitchen remodeling"
   - AI writes a professional post with hashtags
3. Ask: "What are competitors posting?"
   - AI researches and reports back
4. Ask: "Check the post-queue"
   - AI reviews pending content
5. Request: "Create a Facebook post about our summer special"
   - AI generates the exact post ready to use

**The AI knows:**
- Company voice (how you talk)
- What you offer (services/products)
- Who you're talking to (target audience)
- Industry trends (construction/home improvement)

---

## 📊 TANDRSocial's Capabilities

| Capability | What It Does | Example |
|-----------|-----------|---------|
| **Draft Content** | Writes posts in your brand voice | "Draft a post about deck building tips" |
| **Research Trends** | Finds what's popular in your industry | "What's trending in construction?" |
| **Analyze Competitors** | Sees what similar businesses post | "What are local contractors posting?" |
| **Review Content** | Checks posts in your queue | "Check the post-queue" |
| **Remember Context** | Knows your company details | Brand voice, services, audience |
| **Generate Ideas** | Suggests content topics | "What should we post this month?" |

---

## ⚠️ TANDRSocial's Limitations

| Limitation | Why | Impact |
|-----------|-----|--------|
| **No Direct Posting** | Requires human approval | User must copy/paste to Facebook |
| **No Real-Time Data** | Uses cached information | May not catch breaking news |
| **No Image Generation** | Focuses on text only | User finds images separately |
| **Single Industry Focus** | Trained on construction/home improvement | Works best for TANDR's business |
| **Facebook-only** | Designed for Facebook | Can't handle Instagram/TikTok |

---

## 🧠 How TANDRSocial "Knows" Things

TANDRSocial has a **Knowledge Base** - just 3 markdown files:

```
data/social-knowledge/
├── company-voice.md          "How we talk"
├── services-and-products.md  "What we offer"
└── target-audience.md        "Who we're talking to"
```

**Example: company-voice.md contains:**
```
- Professional but friendly tone
- Use local Oregon references
- Highlight quality and reliability
- Include customer success stories
- Focus on expertise
```

**Example: services-and-products.md contains:**
```
- Custom decks
- Pole barns
- Home additions
- Remodeling (kitchens, bathrooms)
- Siding, roofing, fencing
```

**That's it!** Just 3 simple files drive everything.

---

## 🔄 TANDRSocial's Workflow (Simple Version)

```
1. User opens TANDRSocial
2. Types request: "Draft a post about summer specials"
3. TANDRSocial reads its 3 knowledge files
4. AI thinks: "They do home improvement, summer special means seasonal"
5. AI generates post in their voice
6. Shows user the draft
7. User copies it, reviews, posts to Facebook manually
```

---

## 🎭 The "Personality" or "Role"

TANDRSocial acts as: **"Your social media content expert who knows your business inside and out"**

It has ONE job: **Help you create better Facebook content**

---

## 💡 How to Replicate This Pattern

### Template: Creating a New Knowledge Bot

**Step 1: Choose Your Domain**
- DIY Bot (home improvement how-tos)
- Estimate Bot (pricing & budget questions)
- Food Bot (restaurant/food business content)
- etc.

**Step 2: Create Knowledge Files (just like TANDRSocial)**
```
data/knowledge/
├── voice.md          "How does this bot talk?"
├── domain.md         "What is it about?"
└── examples.md       "What does good output look like?"
```

**Step 3: Define the Bot's Role**
- DIY Bot: "Your expert on DIY home projects"
- Estimate Bot: "Your pricing and cost expert"
- Food Bot: "Your food industry social media expert"

**Step 4: That's it!**
- Same architecture as TANDRSocial
- Same API (`?action=chat&input=MESSAGE`)
- Different knowledge files
- Different purpose

---

## 📋 Knowledge Base Design Rules

### Rule 1: Keep It Simple
- 3-5 markdown files maximum
- Each file: 1-2 pages of text
- Clear, specific information

### Rule 2: Be Specific, Not Generic
```
❌ Bad: "Talk about food trends"
✅ Good: "Mediterranean and Asian fusion are trending. Local sourcing is important. Health-conscious options matter."
```

### Rule 3: Include Examples
```
Example tone: "That's a great question! Here's what I'd recommend..."
Example output: "Check out our deck project from last month - 500 sq ft, custom railings, $15k project"
```

---

## 🎬 Dashboard Integration (Your Next Step)

### What We're Building:

**3AI Mobile Dashboard (localhost:8088) will show:**
```
┌────────────────────────────────────────┐
│         CONTENT GENERATOR DASHBOARD     │
├────────────────────────────────────────┤
│                                        │
│  [DIY Ideas]  [Estimates]  [Food Tips] │
│      ↓             ↓            ↓      │
│   Calls         Calls          Calls   │
│   DIY Bot    Estimate Bot    Food Bot  │
│                                        │
│  Each button = GET request to bot      │
│  Bot responds with content idea        │
│  Dashboard displays the response       │
│                                        │
└────────────────────────────────────────┘
```

### How It Works:
1. User clicks "DIY Ideas" button
2. Dashboard sends: `http://localhost:8099/api/bot.php?action=chat&input=Generate+5+DIY+post+ideas`
3. DIY Bot (running on 8099) responds
4. Dashboard displays the 5 ideas
5. User clicks to copy them

---

## 🏗️ Replication Plan (Simple)

### Phase 1: Make TANDRSocial Your Template
- ✅ Copy TANDRSocial folder structure
- ✅ Copy bot.php (same code, works for any bot)
- ✅ Copy config.json (same structure)
- ✅ Replace knowledge files

### Phase 2: Create Domain-Specific Bots
- **DIY Bot** - Home improvement how-to expert
- **Estimate Bot** - Pricing and budget expert
- **Food Bot** - Restaurant/food content expert
- **Real Estate Bot** - Property/real estate expert
- **Service Bot** - General service industry expert

### Phase 3: Wire to Dashboard
- Each bot gets its own port (8099, 8100, 8101, etc.)
- Dashboard has buttons for each bot
- Each button = pre-written GET request
- Response displays on dashboard

### Phase 4: Test & Refine
- User tests each bot
- Adjust knowledge files based on output
- Improve prompts in dashboard buttons

---

## 📐 Technical Setup (Very Simple)

```
SAME FOR ALL BOTS:
├── api/bot.php              (Same code, all bots use it)
├── config.json              (Same structure)
└── index.html               (Same UI)

DIFFERENT FOR EACH BOT:
└── data/knowledge/
    ├── voice.md             (Different for each domain)
    ├── domain.md            (Different for each domain)
    └── examples.md          (Different for each domain)
```

**That's literally it.** The bot.php code doesn't care what domain it is - it just reads the knowledge files and responds.

---

## 🎯 Success Metrics

Once you have the bots running, you'll see if they work by asking:

1. **DIY Bot:** "Give me 3 DIY post ideas"
   - Does it suggest relevant home projects?

2. **Estimate Bot:** "What's a typical budget for X?"
   - Does it give realistic price ranges?

3. **Food Bot:** "Create a post about our special"
   - Does it sound like a restaurant?

---

## 📝 Next Steps

1. **Understand TANDRSocial fully**
   - Go to http://localhost:8099 (when running)
   - Ask it some questions
   - See what it can/can't do

2. **Plan your knowledge bots**
   - Decide: DIY, Estimate, Food, etc.
   - What domain would be useful?

3. **Create knowledge files**
   - Copy TANDRSocial structure
   - Replace with your domain info
   - Keep it simple!

4. **Wire to dashboard**
   - Add buttons on localhost:8088
   - Each button calls a bot
   - Display responses

---

## 🔑 Key Insight

**TANDRSocial works because:**
- It knows its ONE job (help create social content)
- It knows its domain (construction/home improvement)
- It has clear knowledge (3 files)
- It talks like a human (brand voice)

**To replicate it:** Just change what it knows, keep everything else the same.

---

**Ready to start? Let's make some bots!** 🚀

**324 Ports and paths are changed ref data**
