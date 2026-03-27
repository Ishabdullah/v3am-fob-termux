**324 Ports and paths are changed ref data**

# Architect Agent - Bootstrap & Deployment Guide

**Agent Name:** Architect
**Port:** 9204
**Type:** Planning & System Design
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

3. **Select Template:** Architect Agent (9204)

4. **Configure:**
   - Agent name: Architect
   - Role: Planning & Design
   - Port: 9204

5. **Deploy:** Click "Create Agent"

---

## What is Architect?

Architect is a strategic planning and system design specialist that:
- Creates detailed implementation plans
- Designs workflows and processes
- Develops project roadmaps
- Specifies system architecture
- Optimizes existing processes
- Works with Scout (intelligence) → Architect (planning) → Tommy (execution)

**Key Differentiator:** Architect turns vision into actionable plans.

---

## Capabilities

✅ **Workflow Design** - Create step-by-step workflows
✅ **System Architecture** - Design integrated solutions
✅ **Project Planning** - Build roadmaps and timelines
✅ **Process Optimization** - Improve existing workflows
✅ **Technical Specification** - Write detailed requirements
✅ **Integration Planning** - Connect multiple systems
✅ **Voice Support** - Full STT + TTS support

---

## Intelligence → Planning → Execution Pipeline

```
Scout (Intelligence)        ← Gathers insights
    ↓
Architect (Planning)        ← Designs solutions
    ↓
Tommy (Execution)          ← Implements
    ↓
Sentinel (Monitoring)      ← Tracks results
```

---

## Integration Points

### Input from Scout
Scout provides intelligence, Architect creates plans:

```bash
POST http://localhost:9204/api/agent.php?action=chat&input=Design_[SOLUTION]_based_on_[SCOUT_FINDINGS]
```

### Output to Tommy
Architect sends execution plans to Tommy:

```bash
POST http://localhost:9202/agent/api/agent.php?action=chat&input=Execute_[PLAN_FROM_ARCHITECT]
```

### Sibling Collaboration
- **Sentinel:** Architect designs monitoring into solutions
- **Crafter:** Architect provides content structure for Crafter

---

## Core Use Cases

### 1. Campaign Strategy
Scout finds opportunity → Architect designs campaign → Tommy executes

### 2. Sales Process Optimization
Scout analyzes pipeline → Architect redesigns sales process → Tommy implements

### 3. New Product Launch
Scout researches market → Architect plans rollout → Tommy manages implementation

### 4. System Integration
Scout identifies gaps → Architect designs integration → Tommy connects systems

---

## Voice Features

Full voice support for planning conversations:

### Input
- Speak planning requirements
- Ask "what if" scenarios
- Get immediate feedback

### Output
- Plans spoken aloud
- Detailed workflow walkthrough
- Interactive refinement

---

## API Endpoints

### Health Check
```bash
GET http://127.0.0.1:9204/health
```

### Create Workflow
```bash
POST http://127.0.0.1:9204/api/agent.php?action=chat&input=Design_workflow_for_[PROJECT]
```

### Build Roadmap
```bash
POST http://127.0.0.1:9204/api/agent.php?action=chat&input=Create_roadmap_for_[INITIATIVE]
```

### Optimize Process
```bash
POST http://127.0.0.1:9204/api/agent.php?action=chat&input=Optimize_[CURRENT_PROCESS]
```

---

## Example Tasks

### Task 1: Campaign Design
```
Architect, design a lead nurturing campaign.
Input: Scout found 50 warm leads in construction industry.
Requirements: 30-day campaign, multi-channel (email + social), conversion goal 20%
Output: Detailed campaign workflow with daily touchpoints
```

### Task 2: Sales Process Redesign
```
Architect, redesign our sales pipeline.
Input: Scout analysis shows bottleneck at proposal stage (avg 14 days vs 7 day target)
Requirements: Reduce time to 5 days, improve conversion by 10%
Output: New sales process with checkpoints and automation recommendations
```

### Task 3: System Architecture
```
Architect, design an integration between our CRM and DocumentParser.
Input: We need to auto-parse incoming customer documents
Requirements: Real-time processing, error handling, audit trail
Output: System architecture with data flow diagram and technical spec
```

---

## File Structure

```
Architect/
├── BOOT.md              (This file)
├── app.md               (Agent description)
├── task.md              (Task templates)
├── config.json          (Configuration)
├── server.js            (Node.js server)
├── package.json         (Dependencies)
├── api/
│   └── agent.php        (Agent API endpoint)
├── templates/
│   ├── workflow-template.md
│   ├── roadmap-template.md
│   └── spec-template.md
└── logs/
    └── (planning logs)
```

---

## Configuration

### Change Port
Edit `config.json`:
```json
"ports": {
  "http": 9204
}
```

### Change LLM Provider
```json
"llm": {
  "provider": "gemini"
}
```

### Disable Voice
```json
"voice": {
  "enabled": false
}
```

---

## Testing

### Test 1: Health Check
```bash
curl http://127.0.0.1:9204/health
# Expected: {"status": "healthy", "agent": "architect"}
```

### Test 2: Create Simple Workflow
```bash
curl -X POST http://127.0.0.1:9204/api/agent.php \
  -d 'action=chat&input=Design+a+simple+workflow+for+onboarding+new+customers'
```

### Test 3: Voice Planning
1. Open http://127.0.0.1:9204/ in browser
2. Click mic button
3. Say: "Create a roadmap for our Q2 marketing campaign"
4. Architect responds with detailed plan (spoken)

---

## Best Practices

### For Planning Sessions
1. Be specific about requirements
2. Include constraints (time, budget, resources)
3. Ask follow-up questions to refine
4. Request designs in specific formats

### For Workflow Design
1. Always include decision points
2. Specify error handling steps
3. Add review/approval gates
4. Include success metrics

### For Roadmaps
1. Define phases clearly
2. Include dependencies
3. Specify milestones
4. Include resource needs

---

## Workflow Template Format

Architect outputs workflows in standard format:

```markdown
# [Workflow Name]

## Overview
[Brief description]

## Participants
- [Role 1]
- [Role 2]

## Steps
1. [Step 1] → [Decision: Y/N]
   - If YES → [Next step]
   - If NO → [Alternate step]
2. [Step 2]
   ...

## Approval Gates
- Gate 1: [Who approves?]
- Gate 2: [Who approves?]

## Success Metrics
- Metric 1: [Target]
- Metric 2: [Target]
```

---

## Integration with ADIR System

Architect is the planning layer:

```
ADIR Hub (9303) - Central dashboard
    ├─ Agent-Dropper v2 (9210) - Deployment
    └─ Agent Network:
        ├─ Jerry (9200) - Operations
        ├─ Randy (9201) - Sales/Marketing
        ├─ Tommy (9202) - Execution
        ├─ Scout (9203) - Intelligence → INPUT
        ├─ Architect (9204) - Planning ← YOU ARE HERE
        ├─ Sentinel (9205) - Monitoring ← OUTPUT
        └─ Crafter (9206) - Content Creation
```

---

## Troubleshooting

### Server Won't Start
```bash
npm install
npm start
```

### Voice Not Working
1. Verify browser supports Web Speech API
2. Check microphone permissions
3. Check console for errors

### Can't Connect to Scout/Tommy
1. Verify port numbers in config
2. Check parent/sibling agent status
3. Verify network connectivity

---

## Next Steps

1. **Deploy Agent** - Use Agent-Dropper v2
2. **Test Voice** - Verify planning interactions work
3. **Plan a Campaign** - Work with Scout's findings
4. **Share Plans with Tommy** - Execute designs
5. **Monitor with Sentinel** - Track results

---

## Summary

Architect brings **strategic planning and system design** to the TANDR network. While Scout discovers insights, Architect creates actionable plans. While Tommy executes, Architect ensures execution follows the design.

Deploy Architect to turn intelligence into strategy and strategy into execution.

**Status:** ✅ Ready to Deploy
**Version:** 1.0.0
**Port:** 9204
**Next Agent:** Sentinel (9205)

**324 Ports and paths are changed ref data**
