**324 Ports and paths are changed ref data**

# Sentinel Agent - Task Templates

**Agent:** Sentinel (9205)
**Type:** Monitoring & Alerts
**Created:** 2026-03-04

---

## Task Template 1: Sales Performance Monitoring

### Objective
Continuously track sales metrics and alert on deviations.

### Metrics to Monitor
- **Daily:** Lead generation count, conversion rate
- **Weekly:** Deal closure rate, average deal size, sales velocity
- **Monthly:** Customer acquisition cost, pipeline health

### Alert Rules
- Lead gen drops >10% from 7-day avg → WARNING
- Lead gen drops >20% from 7-day avg → CRITICAL
- Conversion <20% (target 25%) → WARNING
- Conversion <15% → CRITICAL
- Deal velocity >20 days → WARNING
- Deal velocity >30 days → CRITICAL

### Reporting
- Daily 9 AM: Morning sales briefing
- Weekly Friday: Weekly sales digest
- On-demand: Custom metric queries

### Example
```
Sentinel, monitor our sales pipeline.
Metrics: Daily leads, conversion rate, deal velocity, deal size
Targets: 20 leads/day, 25% conversion, 14-day average deal cycle
Alert me if any metric deviates >10% from 7-day average.
Report: Daily briefing at 9 AM, weekly digest Friday 5 PM
```

---

## Task Template 2: Campaign Performance Tracking

### Objective
Monitor marketing campaign metrics in real-time.

### Campaign Metrics
- **Email:** Open rate, click rate, conversion rate, unsubscribe rate
- **Social:** Engagement rate, click rate, share rate, reach
- **Ads:** Impression, click, conversion, cost per lead
- **Overall:** Total leads generated, conversion to sale

### Alert Rules
- Email open rate <20% (target 30%) → WARNING
- Email click rate <5% (target 8%) → WARNING
- Email unsubscribe >2% → CRITICAL
- Social engagement <2% → WARNING
- Ad cost per lead >$50 (budget-dependent) → WARNING
- Campaign conversion <3% (target 4%) → WARNING

### Reporting
- Daily: Campaign performance summary
- Real-time: Alert on threshold breaches
- Weekly: Campaign health dashboard

### Example
```
Sentinel, track our lead nurture email campaign performance.
Campaign: SOT-2026-03-04-LeadNurture-design.md
Metrics: Open rate, click rate, conversion, unsubscribe
Compare against: Baseline (35% open, 10% click, 4% conversion)
Alert if: Any metric drops 25% from baseline

Reports:
- Daily at noon: Campaign performance
- Real-time: Critical alerts only
- Weekly Friday: Campaign digest with insights
```

---

## Task Template 3: System Health Monitoring

### Objective
Ensure all agents and systems remain healthy and responsive.

### Health Metrics
- **Uptime:** Agent availability (target 99%+)
- **Performance:** Response time (target <2s avg)
- **Errors:** Error rate (target <1%)
- **Data Sync:** Data freshness (target real-time)
- **Connectivity:** Inter-agent communication

### Alert Rules
- Agent down or unresponsive → CRITICAL
- Response time >5s avg → CRITICAL
- Response time 2-5s → WARNING
- Error rate >5% → CRITICAL
- Error rate 1-5% → WARNING
- Data sync >15min stale → WARNING
- Data sync >1hr stale → CRITICAL

### Reporting
- Every 5 minutes: Health check
- Every hour: Health summary
- Daily: System health report

### Example
```
Sentinel, monitor system health.
Agents: Scout (9203), Architect (9204), Tommy (9202), Crafter (9206)
External services: DocumentParser (11109), ADIR Hub (9303)
Check: Uptime, response time, error rate, data freshness
Report: Hourly health summary, any alerts immediately
```

---

## Task Template 4: Business KPI Tracking

### Objective
Monitor key business metrics against targets and goals.

### Example KPIs
- **Revenue:** Monthly recurring revenue, average deal size
- **Growth:** Month-over-month growth rate
- **Efficiency:** Customer acquisition cost, sales cycle length
- **Quality:** Customer satisfaction, retention rate
- **Operational:** Team utilization, project completion rate

### Alert Rules
- MRR <$X (monthly target) → WARNING
- Growth rate <Y% month-over-month → WARNING
- CAC >$Z (threshold) → WARNING
- Deal cycle >target days → WARNING
- Churn rate >X% → WARNING

### Reporting
- Weekly: KPI scorecard
- Monthly: Comprehensive business review
- On-demand: Custom KPI queries

### Example
```
Sentinel, track our business KPIs.
KPIs:
- Monthly revenue (target: $50K)
- Customer count (target: grow 10%/month)
- Average deal size (target: $10K)
- Sales cycle (target: 14 days)
- Customer retention (target: 90%+)

Alert if any KPI deviates >10% from target.
Report: Weekly scorecard every Monday 9 AM, monthly review last Friday.
```

---

## Task Template 5: Project & Task Tracking

### Objective
Monitor project completion, task velocity, and team workload.

### Metrics
- **Completion Rate:** % of tasks completed on schedule
- **Velocity:** Tasks completed per week
- **Backlog Health:** Growing, stable, or shrinking?
- **Team Workload:** Avg tasks per person, burnout risk
- **Quality:** Task rework rate

### Alert Rules
- Completion rate <80% (target 90%) → WARNING
- Task velocity declining >10% week-over-week → WARNING
- Backlog growing without completion → WARNING
- Any person >15 active tasks → WARNING
- Rework rate >5% → WARNING

### Reporting
- Weekly: Project health report
- Daily: Task completion summary
- On-demand: Team workload analysis

### Example
```
Sentinel, track project health.
Projects: Spring campaigns, system integrations
Metrics: Task completion %, velocity, backlog trend, team workload
Alert if: Completion <80%, velocity declining, anyone overloaded
Report: Weekly project health review every Monday 2 PM
```

---

## Task Template 6: Competitive Intelligence Monitoring

### Objective
Watch for competitive threats and market shifts.

### What to Monitor
- **Competitor activity:** New products, price changes, hiring
- **Market trends:** Industry news, regulation changes
- **Customer sentiment:** What do customers say about competitors?
- **Market size:** Growing, shrinking, consolidating?

### Alert Rules
- Competitor new service launch → INFO
- Market size shrinking >5% → WARNING
- Negative customer sentiment about us → CRITICAL
- Price war starting → WARNING
- Major regulation change → CRITICAL

### Reporting
- Weekly: Market intelligence digest
- Real-time: Critical competitive threats

### Example
```
Sentinel, monitor competitive landscape.
Competitors: [List 3-5 key competitors]
Track: New offerings, pricing, hiring, customer reviews
Deliver: Weekly competitive intelligence briefing
Alert on: New competitive threats, market shifts
```

---

## Task Template 7: Data Quality Monitoring

### Objective
Ensure data integrity and catch data issues early.

### Data Quality Metrics
- **Completeness:** % of required fields filled
- **Accuracy:** % of valid, non-duplicate records
- **Freshness:** How current is the data?
- **Consistency:** Does data match across systems?

### Alert Rules
- Duplicate records found → INFO
- >10% records missing key fields → WARNING
- Data sync failing → CRITICAL
- System outage preventing data updates → CRITICAL

### Reporting
- Weekly: Data quality score
- Real-time: Data integrity alerts

### Example
```
Sentinel, monitor data quality.
Data sources: CRM, lead database, customer files
Check: Completeness (all fields filled?), uniqueness (no dupes?), freshness (how old?), consistency (matches?)
Alert if: Quality score drops <90%
Report: Weekly data quality report
```

---

## Task Template 8: Custom Monitoring Dashboard

### Objective
Create a custom monitoring dashboard for specific needs.

### Steps
1. Identify what to monitor (metrics, systems, KPIs)
2. Define thresholds (targets, warnings, critical)
3. Choose reporting frequency and format
4. Set alert recipients and methods
5. Establish baseline and goals

### Output
- Real-time dashboard (if supported)
- Scheduled reports (daily, weekly, monthly)
- Triggered alerts (when thresholds breached)
- Historical analysis (trends over time)

### Example
```
Sentinel, create a custom dashboard for our Q1 campaign initiative.
Goals: 100 new leads, 25% conversion, $30K revenue

Monitor:
- Daily leads count (target: 7-10/day)
- Weekly conversion rate (target: 25%)
- Weekly revenue (running total toward $30K)
- Email performance (open/click rates)
- Team workload (no one >10 tasks)
- Campaign spend vs budget

Alerts:
- CRITICAL: Any day <5 new leads
- WARNING: Conversion <20%, spend >budget
- INFO: Daily summary

Reports:
- Daily morning briefing (voice)
- Weekly Friday (detailed)
- Executive dashboard (real-time web view)
```

---

## Running Sentinel Monitoring Tasks

### Request Format
```
Sentinel, [task type]: [specific requirements]
```

### Examples
```
Sentinel, monitor: Track sales pipeline daily
Sentinel, alert: Notify me if conversion drops below 20%
Sentinel, report: Weekly campaign performance digest
Sentinel, health: Check system status
Sentinel, trend: Analyze lead quality over last 30 days
```

### With Voice
1. Click mic
2. Say: "Sentinel, monitor our sales pipeline"
3. Sentinel confirms what it will track
4. Sentinel delivers daily briefing (spoken)
5. You receive real-time alerts (spoken) when thresholds breach

---

## Alert Configuration

### Alert Severity Levels
```
CRITICAL (Red)
- Action needed immediately
- Business impact is high
- Example: System down, revenue at risk

WARNING (Yellow)
- Action needed within hours
- Trend needs monitoring
- Example: Metric trending toward problem

INFO (Green)
- Just informational
- All good, confirming progress
- Example: Campaign exceeding targets
```

### Alert Delivery
- **Critical:** Immediate voice alert + dashboard
- **Warning:** Web notification + next hourly briefing
- **Info:** Daily/weekly summary (unless requested real-time)

---

## Integration Points

### Input from Other Agents
- Scout: Sends discovery findings to monitor
- Architect: Sends execution plans to track
- Tommy: Sends task progress to track
- Crafter: Sends campaign metrics to monitor

### Output Recipients
- Jerry (9200): Operational alerts and reports
- Dashboard: Real-time visualization
- You: Voice alerts and briefings

---

## Success Metrics

Sentinel's effectiveness measured by:
- ✅ Catches 95%+ of threshold breaches
- ✅ No false alerts (alert fatigue)
- ✅ Alerts timely (within 5 minutes of breach)
- ✅ Reports actionable (clear what to do)
- ✅ Reduces crisis response time by 50%+

---

## Summary

Sentinel handles 8 core monitoring tasks:

1. ✅ **Sales Performance** - Daily metrics, conversion tracking
2. ✅ **Campaign Tracking** - Email, social, ad performance
3. ✅ **System Health** - Uptime, performance, errors
4. ✅ **Business KPIs** - Revenue, growth, efficiency
5. ✅ **Project Tracking** - Task completion, velocity
6. ✅ **Competitive Intelligence** - Market threats
7. ✅ **Data Quality** - Integrity, completeness, freshness
8. ✅ **Custom Dashboards** - Tailored to your needs

Use these templates as starting points. Sentinel adapts to your monitoring needs.

**Status:** ✅ Ready
**Version:** 1.0.0

**324 Ports and paths are changed ref data**
