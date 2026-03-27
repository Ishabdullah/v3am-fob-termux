**324 Ports and paths are changed ref data**

# Sentinel Agent - Bootstrap & Deployment Guide

**Agent Name:** Sentinel
**Port:** 9205
**Type:** Monitoring & Alerts
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

3. **Select Template:** Sentinel Agent (9205)

4. **Configure:**
   - Agent name: Sentinel
   - Role: Monitoring
   - Port: 9205

5. **Deploy:** Click "Create Agent"

---

## What is Sentinel?

Sentinel is a monitoring and alerting specialist that:
- Continuously tracks business and operational metrics
- Detects anomalies and deviations
- Generates alerts when thresholds are breached
- Reports on system health and performance
- Trends data to predict problems
- Works with Jerry (Operations) to catch issues before they become crises

**Key Differentiator:** Sentinel never sleeps—always watching, always tracking.

---

## Capabilities

✅ **Performance Monitoring** - Track all key metrics
✅ **Metrics Tracking** - Daily, weekly, monthly dashboards
✅ **Anomaly Detection** - Spot deviations automatically
✅ **Alert Generation** - Critical, warning, info alerts
✅ **Status Reporting** - System health reports
✅ **Health Checks** - Agent and system status
✅ **Trend Analysis** - Predict problems before they happen
✅ **Voice Support** - Hear alerts, get updates via TTS

---

## What Sentinel Monitors

### Sales Metrics
- Lead generation rate
- Lead quality
- Deal closure rate
- Average deal size
- Sales velocity
- Customer acquisition cost

### Operational Metrics
- System uptime
- Response times
- Error rates
- Processing times
- Resource utilization
- Data sync status

### Campaign Metrics
- Email open/click rates
- Conversion rates
- Cost per lead
- ROI by channel
- Engagement trends
- Audience growth

### Team Metrics
- Workload by agent
- Task completion rates
- Approval gate times
- Execution speed
- Quality metrics

---

## Integration Points

### Monitored Systems
- **Scout (9203)** - Track discovery rate, search performance
- **Architect (9204)** - Monitor plan execution adherence
- **Tommy (9202)** - Execution health and speed
- **Jerry (9200)** - Operations performance
- **CRM Data** - Lead and deal metrics
- **Campaign Data** - Marketing performance

### Alert Recipients
- **Jerry (9200)** - Gets operational alerts
- **You** - Via voice (TTS) and web UI
- **Dashboard** - Real-time status on ADIR Hub

---

## Alert System

### Alert Levels

**CRITICAL** (Red) - Immediate action needed
- System down
- Revenue at risk
- Data loss imminent
- Response: Immediate escalation

**WARNING** (Yellow) - Monitor closely
- Metric trending wrong direction
- Approaching critical threshold
- Requires attention within hours
- Response: Plan action

**INFO** (Green) - Good to know
- Metric improving
- All systems healthy
- Routine status updates
- Response: Log and track

---

## Example Alerts

### Alert 1: Sales Performance Warning
```
WARNING: Lead conversion rate dropped to 18% (target: 25%)
Trend: Declining 2% per week
Action: Review recent lead quality scoring from Scout
Recommendation: Adjust filtering criteria
```

### Alert 2: System Health Critical
```
CRITICAL: Response time exceeded 5 seconds (5.2s avg)
Affected: DocumentParser service on port 11109
Status: 85 requests queued, processing time: 1.2s per request
Action: Restart service or scale resources
```

### Alert 3: Campaign Performance Info
```
INFO: Email campaign 7 days in: 42% open rate (target: 35%)
CTR: 18% (excellent)
Conversions: 8 so far (on pace for 20% final rate)
Status: ✅ Exceeding expectations
```

---

## Voice Features

Sentinel supports voice for alerts and status:

### Alert Announcements
- Critical alerts spoken immediately
- Warning alerts queued for next check-in
- Info updates optional

### Status Updates
- Daily morning briefing (spoken)
- Weekly performance summary (spoken)
- On-demand status (voice query)

### Example Voice Interaction
```
You: "Sentinel, what's the status?"
Sentinel: "All systems healthy. Lead conversion at 26%, up from 24% yesterday.
   Email campaign exceeding expectations. No alerts. One thing to monitor:
   API response time trending toward warning threshold—keep an eye on it."
```

---

## API Endpoints

### Health Check
```bash
GET http://127.0.0.1:9205/health
```

### Get Current Metrics
```bash
GET http://127.0.0.1:9205/api/agent.php?action=chat&input=What_are_current_metrics
```

### Check for Alerts
```bash
GET http://127.0.0.1:9205/api/agent.php?action=chat&input=Any_critical_alerts
```

### Trend Analysis
```bash
GET http://127.0.0.1:9205/api/agent.php?action=chat&input=Analyze_[METRIC]_trends
```

### Set Alert Rule
```bash
POST http://127.0.0.1:9205/api/agent.php?action=chat&input=Alert_if_[METRIC]_drops_below_[VALUE]
```

---

## Example Tasks

### Task 1: Sales Dashboard
```
Sentinel, create a daily sales dashboard.
Metrics: Lead gen rate, conversion rate, deal size, velocity
Format: Summary with good/bad indicators
Frequency: Morning briefing at 9 AM
Alert if: Any metric drops 10% from 7-day avg
```

### Task 2: Campaign Tracking
```
Sentinel, track our lead nurture campaign performance.
Campaign: SOT-2026-03-04-LeadCampaign-design.md
Metrics: Open rate, click rate, conversion rate, revenue
Compare against: Industry benchmarks
Alert if: Any metric drops below benchmark
```

### Task 3: System Health
```
Sentinel, monitor system health continuously.
Track: Agent uptime, response times, error rates
Monitored systems: Scout (9203), Architect (9204), DocumentParser (11109)
Alert if: Any system down or slow
Report: Hourly summary
```

---

## File Structure

```
Sentinel/
├── BOOT.md              (This file)
├── app.md               (Agent description)
├── task.md              (Task templates)
├── config.json          (Configuration)
├── server.js            (Node.js server)
├── package.json         (Dependencies)
├── api/
│   └── agent.php        (Agent API endpoint)
├── dashboards/
│   ├── sales-dashboard.json
│   ├── ops-dashboard.json
│   └── campaign-dashboard.json
├── alert-rules/
│   └── rules.json
└── logs/
    ├── alerts.log
    ├── metrics.log
    └── trends.log
```

---

## Configuration

### Alert Rules (config.json)
```json
"alert_rules": {
  "lead_conversion": {
    "target": "25%",
    "warning": "< 20%",
    "critical": "< 15%"
  }
}
```

### Monitoring Interval
Check metrics every 5 minutes (configurable):
```json
"monitoring": {
  "check_interval": 300
}
```

---

## Testing

### Test 1: Health Check
```bash
curl http://127.0.0.1:9205/health
# Expected: {"status": "healthy", "agent": "sentinel"}
```

### Test 2: Get Current Metrics
```bash
curl -X POST http://127.0.0.1:9205/api/agent.php \
  -d 'action=chat&input=Show+current+metrics'
```

### Test 3: Trigger Alert
```bash
curl -X POST http://127.0.0.1:9205/api/agent.php \
  -d 'action=chat&input=Alert+if+lead+conversion+below+15+percent'
```

---

## Troubleshooting

### Alerts Not Triggering
1. Check alert rules are configured
2. Verify metrics are being collected
3. Check notification settings
4. Review logs for errors

### Missing Metrics
1. Verify data sources are accessible
2. Check sync interval configuration
3. Validate metric names
4. Check agent connectivity

### Voice Not Working
1. Browser support for Web Speech API
2. Microphone permissions
3. Check volume settings
4. Review console for errors

---

## Best Practices

### DO:
✅ Set realistic alert thresholds
✅ Review alerts regularly
✅ Act on critical alerts immediately
✅ Adjust rules based on learnings
✅ Monitor trends, not just point-in-time
✅ Create dashboards for key metrics

### DON'T:
❌ Set thresholds so tight everything triggers
❌ Ignore warning alerts
❌ Forget to escalate critical alerts
❌ Skip trend analysis
❌ Alert without actionable recommendation

---

## Metrics You Should Track

### Always Monitor
- **System uptime** - Is it working?
- **Response times** - Is it fast?
- **Error rates** - Are things breaking?
- **Data sync status** - Is data current?

### By Role

**Sales Focus:**
- Lead generation rate
- Conversion rate
- Deal velocity
- Customer acquisition cost

**Operations Focus:**
- Task completion rate
- Approval gate times
- Resource utilization
- Cost per operation

**Marketing Focus:**
- Campaign open/click rates
- Conversion by channel
- Cost per lead
- Audience growth

---

## Integration with ADIR System

Sentinel watches over the whole network:

```
ADIR Hub (9303) - Central dashboard
    ├─ Agent-Dropper v2 (9210) - Deployment
    └─ Agent Network:
        ├─ Jerry (9200) - Operations (Receives alerts)
        ├─ Randy (9201) - Sales/Marketing
        ├─ Tommy (9202) - Execution (Monitored)
        ├─ Scout (9203) - Intelligence (Monitored)
        ├─ Architect (9204) - Planning (Monitored)
        ├─ Sentinel (9205) - Monitoring ← YOU ARE HERE
        └─ Crafter (9206) - Content Creation
```

---

## Summary

Sentinel is your 24/7 watchdog. While others are busy executing, Sentinel is watching. When thresholds are breached, anomalies detected, or problems brewing—Sentinel alerts you.

Deploy Sentinel to catch issues before they become crises.

**Status:** ✅ Ready to Deploy
**Version:** 1.0.0
**Port:** 9205
**Next Agent:** Crafter (9206)

**324 Ports and paths are changed ref data**
