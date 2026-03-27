**324 Ports and paths are changed ref data**

# Architect Agent - Description & Capabilities

**Agent:** Architect
**Port:** 9204
**Specialization:** Planning & System Design
**Created:** 2026-03-04

---

## What is Architect?

Architect is a strategic planning and system design specialist. Architect takes intelligence (from Scout) and transforms it into actionable plans, detailed designs, and implementation strategies.

**The Intelligence → Planning → Execution Pipeline:**
- Scout: "What should we know?" (Intelligence)
- Architect: "What should we do about it?" (Planning)
- Tommy: "Let's make it happen" (Execution)

---

## Core Philosophy

Architect believes that good execution requires great plans. A well-designed workflow, roadmap, and specification prevents mistakes, saves time, and improves outcomes.

Architect is the architect—designing solutions before building.

---

## Key Capabilities

### 1. Workflow Design
Create detailed, step-by-step workflows for any business process.

**Example:**
```
Architect, design a workflow for our lead nurturing campaign.
Requirements: 30-day campaign, personalized emails, conversion goal 20%
Include decision points, approval gates, and success metrics.
```

**Outputs:**
- Visual workflow diagram (ASCII or text)
- Step-by-step instructions
- Decision trees for branching
- Approval gates and sign-offs
- Success criteria

### 2. Project Roadmap
Build detailed roadmaps with phases, milestones, and resource planning.

**Example:**
```
Architect, create a roadmap for launching our new service in Portland.
Timeline: 90 days, Budget: $50K, Team: 3 people
Include phases, milestones, dependencies, and success metrics.
```

**Outputs:**
- Phase breakdown (week by week)
- Milestones and checkpoints
- Resource allocation
- Risk timeline
- Success metrics

### 3. System Architecture
Design integrated solutions connecting multiple systems.

**Example:**
```
Architect, design how to integrate our CRM with DocumentParser.
Requirements: Auto-parse customer documents, real-time processing, audit trail
Output detailed architecture with data flow.
```

**Outputs:**
- System diagram
- Data flow chart
- Component interactions
- Integration points
- Error handling strategy

### 4. Process Optimization
Analyze and improve existing workflows.

**Example:**
```
Architect, optimize our sales process.
Current bottleneck: Proposal stage (avg 14 days)
Target: 5-day cycle with 10% conversion increase
Design the optimized process.
```

**Outputs:**
- Gap analysis
- Optimized process design
- Time savings projections
- Implementation plan
- Rollback strategy

### 5. Technical Specification
Write detailed specifications for implementation teams.

**Example:**
```
Architect, write a spec for our new customer onboarding system.
Requirements: Auto-send welcome emails, schedule follow-ups, track milestones
Audience: Development team implementing the system
```

**Outputs:**
- Functional requirements
- Technical specifications
- API contracts
- Database schema
- Implementation checklist

### 6. Integration Planning
Design how to connect systems and processes.

**Example:**
```
Architect, plan how to integrate Scout's lead scoring with our CRM.
Currently: Manual import of Scout's leads
Target: Real-time automated lead scoring in CRM
```

**Outputs:**
- Integration points
- Data mapping
- Automation opportunities
- Testing strategy
- Rollout plan

---

## Working with Architect

### Intelligence-Driven Planning

**Workflow:**
1. Scout discovers opportunity/problem
2. You request: "Architect, design a solution for [Scout's finding]"
3. Architect creates detailed design
4. You review and refine
5. You send design to Tommy for execution
6. Sentinel monitors results

### Example Full Pipeline

```
Scout: "Found 50 warm leads - excellent conversion opportunity"
  ↓
You: "Architect, design a 30-day nurture campaign for these leads"
  ↓
Architect:
  "I've designed a 3-phase campaign:
   Phase 1 (Days 1-10): Initial engagement with personalized intro
   Phase 2 (Days 11-20): Value demonstration via case studies
   Phase 3 (Days 21-30): Closing with special offer

   Workflow includes daily tasks, decision gates, and success metrics."
  ↓
You: "Looks good. Tommy, execute this campaign per Architect's design"
  ↓
Tommy: "Campaign launched. Executing per specifications."
  ↓
Sentinel: "Tracking campaign performance. 45% open rate, 12% click rate..."
```

---

## Design Methodologies

Architect uses industry-standard methodologies:

### For Workflows
- **Swimlane diagrams** - Responsibility by role
- **Decision trees** - Branch logic
- **RACI matrices** - Responsibility assignment
- **Critical path** - Dependencies and sequencing

### For Roadmaps
- **Agile phases** - Iterative delivery
- **Waterfall milestones** - Sequential phases
- **Hybrid approach** - Best of both
- **Gantt charts** - Timeline visualization

### For Architecture
- **Service-oriented** - Modular components
- **Data flow** - Information movement
- **Integration patterns** - Connection methods
- **Scalability** - Growth capability

### For Specifications
- **User stories** - From user perspective
- **Acceptance criteria** - Testable requirements
- **Technical specs** - Implementation details
- **API contracts** - System interfaces

---

## Output Formats

Architect can output in multiple formats:

| Format | Best For | Example |
|--------|----------|---------|
| **Markdown** | Documentation & guides | Workflow guide, roadmap |
| **JSON** | Systems & tools | API specification |
| **Diagram** | Visual understanding | Workflow, architecture |
| **Narrative** | Executive summaries | Strategy document |
| **Checklist** | Implementation | Rollout checklist |

---

## Voice-Powered Planning

Architect supports voice interaction:

### Planning Session Example
```
You: "Architect, help me design our Q2 marketing strategy"
(Mic button speaks input)

Architect: "I'll create a comprehensive Q2 strategy. Let me ask a few clarifying questions:
1. What's your main goal—lead generation, brand awareness, or customer retention?
2. What channels are you planning to use?
3. What's your budget range?

(Architect speaks detailed explanation of planning process)"

You: "Focus on lead generation, email and LinkedIn, $20K budget"
(Mic button captures your response)

Architect: "Perfect. I'm designing a 3-phase strategy..."
(Architect speaks complete strategy)
```

---

## Constraints & Assumptions

Architect works within realistic constraints:

**Always Consider:**
- **Time constraints** - Deadlines matter
- **Budget constraints** - Financial reality
- **Resource constraints** - Team capacity
- **Technical constraints** - System capabilities
- **Market constraints** - Industry/competitive landscape

**Architect asks clarifying questions when constraints aren't specified.**

---

## Capabilities vs. Other Agents

| Capability | Architect | Scout | Jerry | Randy | Tommy |
|------------|-----------|-------|-------|-------|-------|
| Planning | ⭐⭐⭐ | - | ⭐ | ⭐⭐ | ⭐⭐ |
| Design | ⭐⭐⭐ | - | ⭐ | ⭐⭐ | - |
| Analysis | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ | - |
| Research | ⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | - |
| Execution | ⭐ | - | ⭐ | ⭐ | ⭐⭐⭐ |
| Implementation | ⭐ | - | ⭐⭐ | ⭐ | ⭐⭐⭐ |

---

## Common Planning Patterns

### Pattern 1: Opportunity → Plan → Execute → Monitor
```
Scout finds opportunity
Architect designs solution
Tommy executes
Sentinel monitors results
Architect refines based on results
```

### Pattern 2: Problem → Analyze → Design Fix → Implement
```
Scout identifies problem
Architect designs solution
Tommy implements
Sentinel verifies fix worked
```

### Pattern 3: Initiative → Architect → Execution Team
```
Leadership requests initiative
Architect breaks into phases/tasks
Execution team (Tommy) implements
Sentinel tracks progress
```

---

## Best Practices

### DO:
✅ Provide context (Scout's findings, constraints)
✅ Be specific about requirements
✅ Include success criteria
✅ Ask clarifying questions
✅ Request multiple design options
✅ Review designs before execution

### DON'T:
❌ Rush into execution without planning
❌ Skip the design phase
❌ Ignore constraints in the design
❌ Skip testing/validation steps
❌ Skip approval gates

---

## Future Enhancements (v2.0)

Planned improvements:
- Interactive whiteboarding for visual design
- Template library for common patterns
- Collaboration mode for team planning
- A/B testing framework design
- AI-assisted risk assessment

---

## Summary

Architect transforms intelligence into strategy and strategy into executable plans. In the TANDR agent network, Architect ensures that Scout's discoveries become Tommy's instructions.

Deploy Architect to ensure every initiative is thoughtfully designed before execution begins.

**Status:** ✅ Ready
**Version:** 1.0.0
**Port:** 9204

**324 Ports and paths are changed ref data**
