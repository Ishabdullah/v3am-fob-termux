**324 Ports and paths are changed ref data**

# Knowledge Bot Replication Plan - Simple Version

**Goal:** Create 5-10 specialized knowledge bots based on TANDRSocial

---

## Phase 1: Understanding the Template

### What You're Cloning

TANDRSocial is 95% **unchangeable code** + 5% **knowledge files**

```
TANDRSocial/
├── api/bot.php                ← SAME FOR ALL BOTS (don't change)
├── config.json                ← SAME STRUCTURE (just change port)
├── index.html                 ← SAME UI (don't change)
├── server.js                  ← SAME SERVER (don't change)
│
└── data/knowledge/            ← CHANGE THIS!
    ├── company-voice.md       ← Domain-specific tone
    ├── domain-info.md         ← What the bot knows about
    └── examples.md            ← Sample outputs
```

**The magic:** Change 3 files, you get a completely different bot.

---

## Phase 2: Planning Your Bots

### Bot Categories (Pick 5-10)

| Bot | Purpose | Knowledge Focus |
|-----|---------|-----------------|
| **DIY Bot** | Home improvement how-tos | DIY projects, budget tips, safety |
| **Estimate Bot** | Pricing & budgets | Cost ranges, labor, materials |
| **Food Bot** | Restaurant/food content | Recipes, dining trends, local food |
| **Real Estate Bot** | Property content | Listings, market trends, neighborhoods |
| **Travel Bot** | Travel planning | Destinations, tips, experiences |
| **Finance Bot** | Money/budget advice | Saving, investing, budgeting |
| **Health Bot** | Wellness content | Tips, nutrition, exercise |
| **Tech Bot** | Technology advice | Gadgets, how-tos, reviews |
| **Pet Bot** | Pet care content | Training, health, fun posts |
| **Service Bot** | General service industry | Pricing, process, customer care |

---

## Phase 3: Setting Up Each Bot

### Step-by-Step: Creating DIY Bot (As Example)

**1. Folder Structure**
```
Copy: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\TANDRSocial

To: C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\DIYBot
    (Keep exact same internal structure)
```

**2. Update config.json**
```json
CHANGE ONLY:
- Port: 8099 → 8100
- App name: "TANDRSocial" → "DIY Bot"
- System prompt: Keep the general format, just update the role
```

**3. Create Knowledge Files**

**File: data/knowledge/company-voice.md**
```
# DIY Bot Voice

## How I Talk
- Encouraging and supportive (DIY people often nervous)
- Use simple, clear language
- Include "why" not just "what"
- Friendly expert tone
- Mix practical with inspirational

## Example Phrases
- "Here's an easy way to..."
- "Don't worry if you're a beginner, this is totally doable"
- "The key is to..."
- "You've got this!"
```

**File: data/knowledge/domain-info.md**
```
# DIY Knowledge

## What I Know About
- Home improvement projects
- Furniture building
- Yard projects
- Basic repairs
- Tool recommendations
- Safety tips
- Cost estimates for materials
- Time estimates for projects

## Common Projects
- Shelving
- Deck/patio building
- Garden beds
- Cabinet building
- Fence building
- Painting techniques
```

**File: data/knowledge/examples.md**
```
# Example DIY Posts

## Type 1: How-To Post
"Build a Simple Raised Garden Bed
Perfect for beginners! All you need:
- 2x6 lumber (cedar lasts longer)
- Nails or screws
- Soil
- 2-3 hours of time

Here's why raised beds are awesome:
✓ Better drainage
✓ Easier on your back
✓ Contain weeds
✓ Warm up faster in spring

Full instructions: [steps here]"

## Type 2: Idea Post
"5 DIY Projects for This Weekend
1. Paint an accent wall (4 hours)
2. Build floating shelves (3 hours)
3. Create a small herb garden (1 hour)
4. Refinish furniture (2 hours)
5. Install a new mirror (30 min)

Which sounds fun?"
```

**4. Test the Bot**
```bash
# Start DIY Bot on port 8100
cd C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\DIYBot
php -S localhost:8100

# Test it
curl "http://localhost:8100/api/bot.php?action=chat&input=Give+me+5+DIY+project+ideas"

# Should respond with DIY ideas!
```

---

## Phase 4: Wiring to Dashboard (localhost:8088)

### Dashboard Integration

**Add buttons to 3AI Mobile dashboard (localhost:8088):**

```html
<!-- Add to the dashboard HTML -->

<div class="bot-cards">

  <div class="card">
    <h3>DIY Ideas</h3>
    <button onclick="callBot(8100, 'Give me 5 DIY post ideas')">
      Generate Ideas
    </button>
    <div id="diy-response"></div>
  </div>

  <div class="card">
    <h3>Estimate Templates</h3>
    <button onclick="callBot(8101, 'Create a sample estimate post')">
      Generate Template
    </button>
    <div id="estimate-response"></div>
  </div>

  <div class="card">
    <h3>Food Content</h3>
    <button onclick="callBot(8102, 'Give me a food content idea')">
      Generate Post
    </button>
    <div id="food-response"></div>
  </div>

</div>

<script>
function callBot(port, prompt) {
  const url = `http://localhost:${port}/api/bot.php?action=chat&input=${encodeURIComponent(prompt)}`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      // Display response
      console.log(data.data.message);
      // Show on dashboard
    });
}
</script>
```

---

## Phase 5: Bot Port Assignments

Reserve ports for your bots:

| Bot | Port | Status |
|-----|------|--------|
| TANDRSocial | 8099 | ✅ Exists |
| DIY Bot | 8100 | ⬜ To Create |
| Estimate Bot | 8101 | ⬜ To Create |
| Food Bot | 8102 | ⬜ To Create |
| Real Estate Bot | 8103 | ⬜ To Create |
| Travel Bot | 8104 | ⬜ To Create |
| Finance Bot | 8105 | ⬜ To Create |
| Health Bot | 8106 | ⬜ To Create |
| Tech Bot | 8107 | ⬜ To Create |
| Pet Bot | 8108 | ⬜ To Create |

---

## Implementation Timeline

### Week 1: Setup & Test
- [ ] Copy TANDRSocial folder for DIY Bot
- [ ] Update config.json for port 8100
- [ ] Create 3 knowledge files (voice, domain, examples)
- [ ] Test DIY Bot manually
- [ ] Verify it works on localhost:8100

### Week 2: Create 2nd & 3rd Bot
- [ ] Copy TANDRSocial for Estimate Bot (8101)
- [ ] Create knowledge files (domain-specific)
- [ ] Copy for Food Bot (8102)
- [ ] Create knowledge files (domain-specific)
- [ ] Test both manually

### Week 3: Dashboard Integration
- [ ] Add buttons to localhost:8088
- [ ] Write JavaScript to call bots
- [ ] Test each bot from dashboard
- [ ] Verify responses display correctly

### Week 4: Refinement & Scale
- [ ] User tests all bots
- [ ] Adjust knowledge files based on feedback
- [ ] Create remaining bots (4-10)
- [ ] Fine-tune prompts/examples

---

## Checklist: Making a New Bot

For each new bot, complete this checklist:

```
[ ] Copy TANDRSocial folder to new location
[ ] Rename folder to BotName
[ ] Update config.json:
    [ ] Port number (8100, 8101, etc.)
    [ ] App name
[ ] Create data/knowledge/company-voice.md
[ ] Create data/knowledge/domain-info.md
[ ] Create data/knowledge/examples.md
[ ] Test on http://localhost:PORT
[ ] Test API: http://localhost:PORT/api/bot.php?action=chat&input=test
[ ] Add button to dashboard (localhost:8088)
[ ] Test from dashboard
[ ] Document any quirks or limitations
```

---

## Knowledge File Template

Use this template for each bot:

**company-voice.md**
```
# [Bot Name] Voice

## How I Talk
- [Tone/personality trait 1]
- [Tone/personality trait 2]
- [Tone/personality trait 3]

## Example Phrases
- "..."
- "..."
- "..."
```

**domain-info.md**
```
# [Domain] Knowledge

## What I Know About
- Topic 1
- Topic 2
- Topic 3

## Common Requests
- Request type 1
- Request type 2
```

**examples.md**
```
# Example [Bot Name] Posts

## Type 1: [Post Type]
[Full example post here]

## Type 2: [Post Type]
[Full example post here]
```

---

## Troubleshooting

### "Bot doesn't respond"
- Check port is correct in config.json
- Check bot is running: `php -S localhost:PORT`
- Test API directly: `http://localhost:PORT/api/bot.php?action=chat&input=test`

### "Bot gives wrong answers"
- Check knowledge files for errors
- Reword the examples more clearly
- Add more specific domain information

### "Dashboard doesn't show response"
- Check JavaScript console for errors
- Verify bot is actually running
- Check URL is correct in button code
- Try direct curl test first

---

## Success = Simple Verification

Once everything works, you'll see:

1. **Click "DIY Ideas"** → Get home improvement suggestions ✅
2. **Click "Estimates"** → Get pricing templates ✅
3. **Click "Food"** → Get restaurant content ideas ✅
4. Each bot works independently on its own port ✅
5. Dashboard displays all responses cleanly ✅

---

## The Key Secret

All bots use identical code. The only difference is:
- **Port number** (8099, 8100, 8101...)
- **Knowledge files** (what they know about)

That's it. Everything else is the same.

---

**Ready to start building bots?** 🤖🚀

**324 Ports and paths are changed ref data**
