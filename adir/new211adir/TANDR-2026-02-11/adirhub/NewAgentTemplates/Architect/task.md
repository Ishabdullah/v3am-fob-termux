**324 Ports and paths are changed ref data**

# Architect Agent - Task Templates

**Agent:** Architect (9204)
**Type:** Planning & System Design
**Created:** 2026-03-04

---

## Task Template 1: Campaign Design

### Objective
Design a complete marketing or sales campaign workflow.

### Input Requirements
- **Target audience:** Who are we reaching?
- **Campaign type:** Lead gen, nurture, reengagement, product launch?
- **Timeline:** How long (7, 14, 30, 60 days)?
- **Channels:** Email, social, direct mail, ads?
- **Budget:** How much can we spend?
- **Goal:** What's success? (leads, sales, conversions)

### Output
- **Campaign workflow** with daily/weekly tasks
- **Content calendar** with messaging
- **Approval gates** at key points
- **Success metrics** and tracking
- **Resource plan** (who does what)
- **Contingency plan** if metrics miss
- **Handoff to Tommy** for execution

### Example
```
Architect, design a 30-day lead nurturing campaign.
Target: Our 50 warm construction leads (Scout found them)
Channels: Email + LinkedIn
Goal: 20% conversion to sales meeting
Budget: $5K (mostly software, some ads)
Timeline: Start Monday

Please include daily/weekly tasks, decision points, and success metrics.
```

---

## Task Template 2: Sales Process Redesign

### Objective
Optimize an existing sales or operational process.

### Input Requirements
- **Current process:** What are we doing now?
- **Pain points:** What's broken or slow?
- **Metrics:** Where do we want improvement?
- **Constraints:** Budget, time, resources, tools?
- **Success criteria:** What does "better" look like?

### Output
- **As-is process** (current state)
- **To-be process** (optimized state)
- **Gap analysis** (what changes)
- **Transition plan** (how we move from current to new)
- **Training plan** (what people need to learn)
- **Rollback plan** (what if it doesn't work)
- **Success metrics** (how we measure improvement)

### Example
```
Architect, redesign our sales pipeline.
Current: Proposal stage takes 14 days on average
Target: 5 days with 10% conversion improvement

Current process:
1. Lead qualifies → 2 days
2. Proposal drafted → 5 days
3. Internal review → 3 days
4. Send to client → 1 day
5. Wait for response → 3 days

Please design an optimized pipeline with clear bottleneck fixes.
```

---

## Task Template 3: System Integration Design

### Objective
Design how to connect multiple systems or tools.

### Input Requirements
- **Systems to connect:** Which tools/systems?
- **Goal:** What do we want to achieve?
- **Data to sync:** What information needs to flow?
- **Frequency:** Real-time, daily, weekly?
- **Constraints:** Security, budget, technical limitations?
- **Users:** Who benefits from this integration?

### Output
- **System architecture diagram**
- **Data flow mapping** (what data goes where)
- **API specifications** (if needed)
- **Integration checklist**
- **Testing plan**
- **Rollout plan** (phased or big bang?)
- **Support plan** (who maintains it?)

### Example
```
Architect, design an integration between Scout and our CRM.
Goal: Auto-import Scout's discovered leads into CRM
Current state: Manual copy-paste from Scout reports
Desired: Real-time lead feed from Scout to CRM

Systems:
- Scout agent (9203) - generates lead discoveries
- CRM database - stores customer data
- Data format: JSON lead records

Please design the integration architecture and implementation plan.
```

---

## Task Template 4: Project Roadmap

### Objective
Create a detailed project timeline with phases and milestones.

### Input Requirements
- **Project objective:** What are we building/launching?
- **Timeline:** How long (weeks, months)?
- **Budget:** How much can we spend?
- **Team:** Who's involved, how many people?
- **Constraints:** Dependencies, blocking issues, risks?
- **Success criteria:** What does completion look like?

### Output
- **Phase breakdown** (Phase 1, 2, 3, etc.)
- **Milestones** (weekly, bi-weekly check-ins)
- **Task list** per phase
- **Resource allocation** (who does what)
- **Dependency map** (what blocks what)
- **Risk register** (what could go wrong)
- **Go/no-go criteria** per phase
- **Gantt chart** or timeline

### Example
```
Architect, create a 90-day roadmap for expanding to Portland market.
Goal: Launch services in Portland metro area
Budget: $50K
Team: You (planning), Tommy (execution), Randy (sales)
Success: 10 customers signed in Portland by day 90

Key phases needed:
1. Market research & setup
2. Team & operations buildout
3. Go-to-market launch
4. Customer acquisition

Please create detailed roadmap with weekly milestones.
```

---

## Task Template 5: Process Specification

### Objective
Write detailed technical or operational specifications.

### Input Requirements
- **What to specify:** Which process or system?
- **Audience:** Who will implement this? (technical, non-technical)
- **Level of detail:** High level or granular?
- **Format:** Markdown, JSON, diagram, narrative?
- **Special requirements:** Compliance, integration, testing?

### Output
- **Overview section** (what and why)
- **Detailed steps** (how-to, step by step)
- **Acceptance criteria** (how we know it's done)
- **Error handling** (what if something goes wrong)
- **Testing plan** (how we validate)
- **Rollback plan** (how to undo if needed)
- **Support guide** (how to maintain)

### Example
```
Architect, write a specification for our new customer onboarding process.
Audience: Operations team that will execute (non-technical)
Format: Step-by-step markdown guide with checklists
Goal: Every new customer has consistent, excellent first experience

Include:
- Day 1 welcome steps
- Day 7 check-in steps
- Week 2-4 onboarding flow
- Escalation procedures for issues
- Success criteria per stage
```

---

## Task Template 6: Strategic Initiative Plan

### Objective
Design a major strategic initiative from conception to execution.

### Input Requirements
- **Initiative:** What are we trying to do?
- **Why:** What's the business case?
- **Target outcome:** What success looks like
- **Timeline:** Scope (months)
- **Budget:** Available resources
- **Team:** Who's responsible
- **Constraints:** What we can't change

### Output
- **Executive summary** (one-pager)
- **Phase plan** (broken into stages)
- **Workstream breakdown** (who does what)
- **Timeline with milestones**
- **Resource plan** (people, budget, tools)
- **Success metrics** (how we measure)
- **Risk & mitigation** (what could go wrong)
- **Communication plan** (who needs updates)

### Example
```
Architect, design a "Customer Success Program" initiative.
Goal: Increase customer retention from 85% to 95%
Timeline: 6 months to full implementation
Budget: $100K
Success metric: Retention increases to 95% by month 6

Currently: Reactive support only
Desired: Proactive success team
Includes: Onboarding improvements, regular check-ins, success metrics

Please create a comprehensive implementation plan.
```

---

## Task Template 7: Workflow Optimization

### Objective
Improve an existing workflow for speed, quality, or cost.

### Input Requirements
- **Current workflow:** What are we doing?
- **Metrics:** Speed, cost, quality, error rate?
- **Improvement targets:** What's our goal?
- **Constraints:** What we can't change?
- **Tools available:** What systems can we use?

### Output
- **Current state analysis**
- **Bottleneck identification**
- **Optimization opportunities**
- **Redesigned workflow**
- **Before/after comparison**
- **Implementation steps**
- **Automation possibilities**
- **New metrics/targets**

### Example
```
Architect, optimize our lead qualification workflow.
Current: Sales team manually qualifies all leads (3 hours/week)
Goal: Reduce to 1 hour/week while maintaining quality
Pain point: Many unqualified leads waste sales time

Current process:
1. Lead comes in
2. Sales rep manually reviews
3. Decide: qualified or not qualified
4. Log decision

Please design optimized workflow with automation opportunities.
```

---

## Task Template 8: Risk & Mitigation Plan

### Objective
Identify risks in a plan and design mitigation strategies.

### Input Requirements
- **Plan to analyze:** What's the initiative?
- **Risk categories:** Market, technical, resource, timeline?
- **Risk tolerance:** How much risk can we accept?
- **Past history:** What's gone wrong before?

### Output
- **Risk register** (identified risks)
- **Risk assessment** (likelihood × impact)
- **Mitigation strategy** per risk
- **Contingency plans**
- **Monitoring plan** (how we watch for risks)
- **Escalation procedures**
- **Insurance/backup plans**

### Example
```
Architect, analyze risks in our Portland expansion plan.
Timeline: 90 days
Budget: $50K
Risks I'm worried about:
- Market adoption slower than expected
- Team doesn't scale fast enough
- Competitor response
- Technical integration issues

Please create a comprehensive risk register and mitigation plan.
```

---

## Running Architect Tasks

### Request Format
```
Architect, [task type]: [specific request with context]
```

### Examples
```
Architect, design: Create a campaign workflow for nurturing warm leads
Architect, roadmap: Build a 6-month product launch timeline
Architect, specification: Write detailed onboarding process guide
Architect, integration: Design how Scout and CRM connect
Architect, optimize: Make our sales process 50% faster
Architect, plan: Design a customer success program
```

### With Voice
1. Click mic
2. Say: "Architect, design a campaign for..."
3. Architect asks clarifying questions
4. Architect delivers plan (spoken)
5. You provide feedback (spoken)
6. Architect refines

---

## Output Locations

All plans saved to:
```
C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\1CRM\adir\03_MARKETING\03_Content\
```

Naming convention:
```
SOT-[DATE]-[Topic]-[Type].md

Examples:
SOT-2026-03-04-LeadCampaign-design.md
SOT-2026-03-04-SalesProcess-redesign.md
SOT-2026-03-04-PortlandExpansion-roadmap.md
SOT-2026-03-04-ScoutCRMIntegration-spec.md
```

---

## Handoff to Execution

When plan is ready, share with Tommy:

```
Tommy, execute the plan in: SOT-[DATE]-[Topic]-design.md

Reference points:
- Follow the workflow exactly
- Check in at each approval gate
- Report metrics weekly
- Flag any deviations
- Escalate blockers to Architect if needed
```

---

## Refinement & Iteration

Plans aren't set in stone. Refine as you learn:

```
Architect, I've started execution but found issues.
Here's what's not working: [issue]
Here's what's working great: [success]

Please refine the plan based on this feedback.
```

---

## Summary

Architect handles 8 core planning tasks:

1. ✅ **Campaign Design** - Marketing workflows
2. ✅ **Process Redesign** - Optimize operations
3. ✅ **System Integration** - Connect tools
4. ✅ **Project Roadmap** - Timeline planning
5. ✅ **Process Specification** - Detailed how-to
6. ✅ **Strategic Initiative** - Major programs
7. ✅ **Workflow Optimization** - Make things better
8. ✅ **Risk & Mitigation** - Plan for problems

Use these templates as starting points. Architect adapts to your specific needs.

**Status:** ✅ Ready
**Version:** 1.0.0

**324 Ports and paths are changed ref data**
