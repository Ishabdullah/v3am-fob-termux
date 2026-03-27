**324 Ports and paths are changed ref data**

# Crafter Agent - Bootstrap & Deployment Guide

**Agent Name:** Crafter
**Port:** 9206
**Type:** Content Creation
**Status:** Ready for Deployment
**Created:** 2026-03-04

---

## Quick Start

### Deploy via Agent-Dropper v2

1. **Open Agent-Dropper UI:**
   ```
   http://127.0.0.1:9210/
   ```

2. **Go to:** Agent Builder tab

3. **Select Template:** Crafter Agent (9206)

4. **Configure:**
   - Agent name: Crafter
   - Role: Content Creation
   - Port: 9206

5. **Deploy:** Click "Create Agent"

---

## What is Crafter?

Crafter is a content creation specialist that:
- Writes compelling copy for all channels
- Creates content calendars and strategies
- Generates prompts for Image Pal, video, and audio services
- Ensures all content aligns with brand voice
- Optimizes content for search and engagement
- Works with Architect (planning) and Randy (marketing)

**Key Differentiator:** Crafter turns ideas into compelling content.

---

## Capabilities

✅ **Copywriting** - Emails, social posts, sales copy, ads
✅ **Content Planning** - Multi-channel calendars
✅ **Brand Alignment** - Stay true to voice and tone
✅ **SEO Optimization** - Improve search visibility
✅ **Script Writing** - Video, voiceover, commercial dialogue
✅ **Prompt Generation** - Create briefs for design/video/audio services
✅ **Multimodal Content** - Text, visual, audio workflows
✅ **Voice Support** - Full STT + TTS

---

## Content Creation Pipeline

```
Architect creates plan (campaign workflow)
    ↓
Crafter generates copy, scripts, prompts
    ↓ (Layer 2 outputs: image prompts, video briefs, audio scripts)
External services create assets (Image Pal, video, audio)
    ↓ (Layer 3 outputs: final images, videos, audio files)
Crafter publishes and tracks
    ↓
Sentinel monitors performance
    ↓ (Learnings inform next campaign)
Cycle continues
```

---

## Integration Points

### Input from Architect
Architect sends campaign plan → Crafter creates content:

```bash
POST http://localhost:9206/api/agent.php?action=chat&input=Create_content_for_[PLAN]
```

### Input from Randy
Randy requests content → Crafter delivers:

```bash
POST http://localhost:9206/api/agent.php?action=chat&input=Write_[CONTENT_TYPE]_for_[CAMPAIGN]
```

### Output for Services
Crafter generates prompts for external services:
- **Image Pal** - Create visual assets
- **Video Services** - Produce videos
- **Audio Services** - Generate voiceovers
- **Social Services** - Publish content

---

## Content Types Crafter Handles

### Email Content
- Welcome series
- Nurture sequences
- Promotional campaigns
- Re-engagement campaigns
- Transactional emails

### Social Media
- LinkedIn posts (professional, thought leadership)
- Facebook posts (company updates, engagement)
- Instagram content (visual storytelling)
- Twitter/X posts (news, quick updates)

### Sales Copy
- Landing pages
- Sales emails
- Ad copy
- Product descriptions
- Value propositions

### Multimedia
- Video scripts (explainer, testimonial, commercial)
- Voiceover scripts (professional narration)
- Commercial dialogue (product pitch, demo)
- Audio descriptions

### SEO Content
- Blog posts
- How-to guides
- FAQ pages
- Resource guides

---

## Voice Features

Full voice support for creative sessions:

### Brainstorming
```
You: "Crafter, I need email copy for a lead nurture campaign"
Crafter: "Great! Let me ask a few creative questions:
  1. What's the main message? (product benefit, offer, story?)
  2. Audience tone: Professional? Casual? Friendly?
  3. Call-to-action: What do you want them to do?"
```

### Feedback Loop
```
You: "Make it more casual and add urgency"
Crafter: (Revises) "Here's the updated version..."
You: "Better! Can you add a customer testimonial?"
Crafter: (Adds testimonial) "How's this?"
```

### Content Read-Aloud
```
You: "Read that email copy so I can hear how it sounds"
Crafter: (Reads email aloud) "..."
You: "Good, but slow down the pace a bit"
```

---

## API Endpoints

### Health Check
```bash
GET http://127.0.0.1:9206/health
```

### Write Copy
```bash
POST http://127.0.0.1:9206/api/agent.php?action=chat&input=Write_[CONTENT_TYPE]_for_[PURPOSE]
```

### Create Content Calendar
```bash
POST http://127.0.0.1:9206/api/agent.php?action=chat&input=Create_content_calendar_for_[CAMPAIGN]
```

### Generate Service Prompts
```bash
POST http://127.0.0.1:9206/api/agent.php?action=chat&input=Generate_image_prompt_for_[DESCRIPTION]
```

### Brand Check
```bash
POST http://127.0.0.1:9206/api/agent.php?action=chat&input=Ensure_this_content_matches_brand_voice
```

---

## Example Tasks

### Task 1: Email Campaign
```
Crafter, write a 5-email nurture sequence for construction leads.
Subject: Warm leads (contacted in last 30 days)
Goal: 20% conversion to sales meeting
Tone: Professional but friendly
Include: Value prop, case study, special offer, urgency

Email sequence:
1. Welcome + intro (Day 1)
2. Success story (Day 3)
3. How-we-do-it (Day 7)
4. Limited offer (Day 14)
5. Last chance (Day 21)
```

### Task 2: Social Media Calendar
```
Crafter, create a 4-week LinkedIn content calendar.
Goal: Establish thought leadership, generate leads
Posting: 3x per week
Content mix: 40% industry insight, 30% company stories, 30% value tips
Tone: Professional, authoritative, helpful
Include: Call-to-action for each post
```

### Task 3: Landing Page Copy
```
Crafter, write landing page copy for our "Free Assessment" offer.
Headline: Compelling, benefit-driven
Subheading: Explain what they get
Body: 3-4 key benefits
CTA: Clear action button
Form fields: Keep minimal (3-5 fields)
```

---

## File Structure

```
Crafter/
├── BOOT.md              (This file)
├── app.md               (Agent description)
├── task.md              (Task templates)
├── config.json          (Configuration)
├── server.js            (Node.js server)
├── package.json         (Dependencies)
├── api/
│   └── agent.php        (Agent API endpoint)
├── templates/
│   ├── email-templates/
│   ├── social-templates/
│   └── copy-templates/
└── logs/
    └── (content creation logs)
```

---

## Configuration

### Brand Voice
Crafter loads brand voice from FRIEND.md:
```json
"brand_knowledge": {
  "brand_voice_file": "C:/FOB/.../FRIEND.md"
}
```

### Change Port
```json
"ports": {
  "http": 9206
}
```

### LLM Provider
```json
"llm": {
  "provider": "gemini"
}
```

---

## Testing

### Test 1: Health Check
```bash
curl http://127.0.0.1:9206/health
# Expected: {"status": "healthy", "agent": "crafter"}
```

### Test 2: Write Simple Copy
```bash
curl -X POST http://127.0.0.1:9206/api/agent.php \
  -d 'action=chat&input=Write+an+email+subject+line+for+construction+leads'
```

### Test 3: Voice Brainstorm
1. Open http://127.0.0.1:9206/ in browser
2. Click mic button
3. Say: "Create social media post about our new deck building service"
4. Crafter responds with post (spoken)

---

## Best Practices

### For Better Copy
✅ Provide context (who's the audience?)
✅ Include tone guidance (professional? casual? witty?)
✅ Give examples of what you like
✅ Specify call-to-action clearly
✅ Ask for multiple versions
✅ Iterate with feedback

### For Content Calendars
✅ Define theme for each week
✅ Specify posting frequency
✅ Include content mix (%) by type
✅ Plan CTAs
✅ Map to campaign goals

### For Service Prompts
✅ Be specific about style
✅ Mention emotional tone
✅ Include any required elements
✅ Specify dimensions/format
✅ Reference brand guidelines

---

## Output Locations

All content saved to:
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\1CRM\adir\03_MARKETING\03_Content\
```

With subfolders:
- `01_Audio/` - Voiceovers
- `02_Images/` - Final images from Image Pal
- `03_Videos/` - Final videos
- `04_Social_Posts/` - Social content by platform
- `05_Commercial_Dialogue/` - Scripts
- `06_Image_Prompts/` - Briefs for Image Pal
- `07_Video_Prompts/` - Production briefs

---

## Integration with ADIR System

Crafter is the creative engine:

```
ADIR Hub (9303) - Central dashboard
    ├─ Agent-Dropper v2 (9210) - Deployment
    └─ Agent Network:
        ├─ Jerry (9200) - Operations
        ├─ Randy (9201) - Sales/Marketing (Works with Crafter)
        ├─ Tommy (9202) - Execution
        ├─ Scout (9203) - Intelligence
        ├─ Architect (9204) - Planning (Sends plans to Crafter)
        ├─ Sentinel (9205) - Monitoring (Tracks Crafter output performance)
        └─ Crafter (9206) - Content Creation ← YOU ARE HERE
```

---

## Troubleshooting

### Voice Not Working
1. Browser support for Web Speech API
2. Microphone permissions
3. Check console for errors

### Brand Voice Not Loading
1. Verify FRIEND.md path is correct
2. Check file permissions
3. Check file format (markdown)

### Copy Quality Issues
1. Provide more context (audience, tone, goal)
2. Give examples of good copy
3. Use voice for interactive refinement
4. Ask for multiple versions to choose from

---

## Next Steps

1. **Deploy Agent** - Use Agent-Dropper v2
2. **Test Voice** - Verify creative collaboration works
3. **Create Sample Content** - Try writing an email or social post
4. **Check Brand Alignment** - Ensure voice matches FRIEND.md
5. **Plan First Campaign** - Create content calendar

---

## Summary

Crafter brings **creative excellence** to the TANDR network. While Architect designs the plan, Crafter makes it compelling. While Sentinel tracks results, Crafter learns and improves.

Deploy Crafter to transform your good ideas into great content.

**Status:** ✅ Ready to Deploy
**Version:** 1.0.0
**Port:** 9206
**Next:** Deploy all 4 agents and begin integrated workflows

**324 Ports and paths are changed ref data**
