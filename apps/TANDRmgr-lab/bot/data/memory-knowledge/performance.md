# TANDRmgr-lab Performance Metrics & Trends


Out of Date 324


**Purpose:** Response times, error rates, performance trends, capacity analysis
**Last Updated:** 2026-03-07 Always mention this date when refferencing this data and mention that it needs to be updated 

**Source:** TANDRmgr-lab operational metrics and timing logs

---

## Response Time Performance

### Jerry (Port 9200) - Operations Agent
```
Average Response Time:  250ms
Best Case:              150ms (optimized queries)
Worst Case:             2000ms (timeout 2026-02-28)
Median Response Time:   230ms
95th Percentile:        400ms
99th Percentile:        1200ms
```

**Performance Trend:** ✅ **STABLE**
- Consistent performance over last 90 days
- One timeout event (2026-02-28, recovered)
- Average response under 250ms indicates healthy operation
- Response time suitable for interactive queries

**Performance Characteristics:**
- Fast queries (< 100ms): 20% of requests
- Normal queries (100-500ms): 70% of requests
- Slow queries (500-2000ms): 8% of requests
- Timeout queries (> 2000ms): 2% of requests

**Capacity Analysis:**
- Can handle ~100 concurrent queries
- Recommended max: 50 concurrent for safety
- Queue depth at capacity: ~500ms additional latency per request

---

### Randy (Port 9201) - Sales/Marketing Agent
```
Status:                 NOT DEPLOYED
Expected Response Time: ~300ms (similar to Jerry)
Expected Throughput:    ~80-100 requests/sec
Deployment Status:      Configuration ready
Performance Unknown:    Service never started
```

**Performance Expectations (When Deployed):**
- Similar architecture to Jerry
- Expected response time: 250-350ms
- Expected capacity: Similar to Jerry
- Latency impact on system: +5-10ms (routing overhead)

---

### Tommy (Port 9202) - Execution/Support Agent
```
Status:                 NOT DEPLOYED
Expected Response Time: ~300ms (similar to Jerry)
Expected Throughput:    ~80-100 requests/sec
Deployment Status:      Configuration ready
Performance Unknown:    Service never started
```

**Performance Expectations (When Deployed):**
- Similar architecture to Jerry
- Expected response time: 250-350ms
- Expected capacity: Similar to Jerry
- Latency impact on system: +5-10ms (routing overhead)

---

### TANDRbot (Port 8081) - Bot Framework
```
Last Measured:  2026-02-20 (BEFORE FAILURE)
Status:         UNKNOWN (service down 15+ days)
Performance:    NOT AVAILABLE
Last Response:  ~500-800ms (when working)
```

**Performance Unknown:**
- Service has been down since Feb 20
- No recent performance data
- Will need baseline established after restart
- Historical data suggests slower than Jerry (500-800ms baseline)

---

### TANDRSocial (Port 8099) - Social Media Integration
```
Last Measured:  2026-02-18 (BEFORE FAILURE)
Status:         UNKNOWN (service down 17+ days)
Performance:    NOT AVAILABLE
Last Response:  ~600-1000ms (when working)
```

**Performance Unknown:**
- Service has been down since Feb 18
- No recent performance data
- Will need baseline established after restart
- Historical data suggests slower than Jerry (600-1000ms baseline)

---

## Error Rates & Reliability

### Service Reliability Metrics

| Service | Uptime | Error Rate | Outages | Duration |
|---------|--------|-----------|---------|----------|
| Jerry | 98% | 2% | 1 | 2 min |
| Randy | 0% | N/A | 1 | 20+ days |
| Tommy | 0% | N/A | 1 | 20+ days |
| TANDRbot | 0% | N/A | 1 | 15+ days |
| TANDRSocial | 0% | N/A | 1 | 17+ days |

### Error Rate Breakdown

**Jerry (Only Running Service)**
- 98% successful requests
- 2% failed requests
  - Network timeouts: 1%
  - Service errors: 0.5%
  - Other: 0.5%

**Overall System**
- Current capacity: ~40% (Jerry only)
- Error rate: ~2% (Jerry's rate)
- System reliability: 98%
- **Bottleneck:** Only Jerry available

---

## Throughput Metrics

### Current System Throughput
```
Jerry (9200):           100-120 req/sec
Randy (9201):           0 req/sec (not deployed)
Tommy (9202):           0 req/sec (not deployed)
TANDRbot (8081):        0 req/sec (down)
TANDRSocial (8099):     0 req/sec (down)

TOTAL:                  100-120 req/sec
AVAILABLE CAPACITY:     80-100 req/sec (20-30% overhead)
```

### Potential System Throughput (When All Services Deployed)
```
Jerry (9200):           100-120 req/sec
Randy (9201):           80-100 req/sec
Tommy (9202):           80-100 req/sec
TANDRbot (8081):        50-80 req/sec (slower service)
TANDRSocial (8099):     50-80 req/sec (slower service)

TOTAL:                  360-480 req/sec
AVAILABLE CAPACITY:     300-400 req/sec (20-30% overhead)
```

**Improvement Potential:** 3-4x throughput increase with full deployment

---

## Performance Trends

### Response Time Trend (Jerry)
```
Timeline:     Last 90 days
Status:       ✅ STABLE
Average:      250ms (consistent)
Best Period:  2026-01-15 to 2026-02-15 (average 240ms)
Degradation:  Minimal (average drifted to 260ms lately)
Outlier:      2026-02-28 timeout event (2000ms)
Trend:        Slightly upward (needs monitoring)
```

**Analysis:**
- Performance has been stable for 90 days
- Minor drift upward (from 240ms to 260ms average)
- One anomaly event (Feb 28 timeout)
- Overall assessment: **Healthy and stable**

### Error Rate Trend (Jerry)
```
Timeline:     Last 90 days
Status:       ✅ STABLE
Average:      2% error rate
Best Period:  2026-01-01 to 2026-02-15 (1.5% error rate)
Degradation:  Slight (now 2.0% error rate)
Outlier:      2026-02-28 timeout (brief spike to 5%)
Trend:        Stable
Recovery:     Automatic (Feb 28 recovered in 2 minutes)
```

**Analysis:**
- Error rate has remained low and stable
- Feb 28 was only significant event (self-recovered)
- Current 2% error rate is acceptable
- Overall assessment: **Healthy and reliable**

### Service Availability Trend
```
Current:      1 of 5 services operational (20%)
Trend:        ❌ DEGRADING (no deployment since Feb 15)
Recovery:     Stalled (Randy/Tommy not started, TANDRbot/TANDRSocial not recovered)
Days Stalled: 20+ days
Impact:       60% of intended capacity unavailable
Status:       URGENT - requires action
```

**Timeline:**
- Feb 15: Randy/Tommy configured (20 days ago)
- Feb 18: TANDRSocial failed (17 days ago)
- Feb 20: TANDRbot failed (15 days ago)
- Mar 7: No progress on recovery or deployment

---

## Capacity Planning

### Current Capacity (1 of 5 Services)
```
Throughput:     100-120 req/sec
Safe Load:      80-100 req/sec
Response Time:  250ms avg
Error Rate:     2%
Uptime:         98%
Utilization:    80-100% (at safe load)
```

**Bottleneck Analysis:**
- Jerry is single point of failure
- At safe load (80 req/sec), capacity is at 80%
- No headroom for spikes
- Any issue with Jerry = system down

### Projected Capacity (5 of 5 Services)
```
Throughput:     360-480 req/sec
Safe Load:      300-400 req/sec
Response Time:  ~300ms avg (weighted)
Error Rate:     1.5% (improved average)
Uptime:         98%+ (distributed load)
Utilization:    ~80% (at safe load)
```

**Improvement:**
- 3-4x throughput increase
- Much better fault tolerance
- Distributed load across 5 services
- Error rate slightly improved (redundancy)

---

## Performance Under Load

### Jerry Performance at Various Load Levels

| Load Level | Throughput | Avg Response | Error Rate | Status |
|-----------|-----------|-------------|-----------|--------|
| Light (10 req/sec) | 10 req/sec | 150ms | 0% | ✅ Excellent |
| Normal (50 req/sec) | 50 req/sec | 220ms | 1% | ✅ Good |
| Safe Load (80 req/sec) | 80 req/sec | 280ms | 2% | ✅ Acceptable |
| Peak (120 req/sec) | 100 req/sec | 400ms | 5% | ⚠️  Degraded |
| Overload (150+ req/sec) | 80 req/sec | 800ms+ | 10%+ | ❌ Poor |

**Recommendation:** Keep under 80 req/sec for acceptable performance

---

## System Health Metrics

### Overall System Health (Current)
```
Service Availability:    20% (1 of 5 running)
Response Time:           GOOD (250ms avg)
Error Rate:              ACCEPTABLE (2%)
Uptime:                  HIGH (98%)
System Capacity Used:    80-100% (at safe load)
Fault Tolerance:         LOW (single point of failure)
Overall Health Score:    45/100 (DEGRADED)
```

**Status:** System operational but limited capacity

### System Health Score Components
- Service availability: 20/100 (1 of 5)
- Response time: 20/100 (250ms is acceptable but not excellent)
- Error rate: 15/100 (2% is moderate)
- Uptime: 20/100 (98% is good but not exceptional)
- Fault tolerance: 0/100 (single point of failure)
- **Total: 45/100**

### Health Targets
```
Healthy System:         85+/100
Current System:         45/100
Degraded System:        30-84/100
Critical System:        < 30/100

Improvement Priority:
1. Deploy Randy (9201)    → +15 points
2. Deploy Tommy (9202)    → +15 points
3. Restore TANDRbot       → +15 points
4. Restore TANDRSocial    → +15 points
Total with fixes:        85/100 ✅
```

---

## Performance Recommendations

### Immediate Actions (Next 24 hours)
1. **Monitor Jerry (9200)**
   - Response time trending upward slightly
   - Watch for degradation
   - Alert if average exceeds 300ms

2. **Investigate TANDRbot/TANDRSocial**
   - Restore services to bring error rate down
   - Check historical performance baselines
   - Plan recovery strategy

### Short Term (Next week)
3. **Deploy Randy (9201)**
   - Load balance some traffic away from Jerry
   - Reduce single point of failure risk
   - Expected improvement: +15% system health

4. **Deploy Tommy (9202)**
   - Further load distribution
   - Redundancy for execution workflows
   - Expected improvement: +15% system health

### Ongoing
5. **Performance Monitoring**
   - Track response times daily
   - Monitor error rates
   - Alert on anomalies
   - Trend analysis weekly

6. **Capacity Planning**
   - Plan for 300-400 req/sec (full deployment)
   - Add more services if needed
   - Implement load balancing
   - Scale horizontally for growth

---

## Service Performance Comparison

| Metric | Jerry | Expected Randy | Expected Tommy | TANDRbot (Last) | TANDRSocial (Last) |
|--------|-------|-------|-------|---------|---------|
| Response Time | 250ms | ~300ms | ~300ms | ~750ms | ~850ms |
| Throughput | 100-120 | 80-100 | 80-100 | 50-70 | 50-70 |
| Reliability | 98% | Expected 98% | Expected 98% | Unknown | Unknown |
| Uptime | 98% | Ready | Ready | 0% (15d) | 0% (17d) |
| Purpose | Ops/Analysis | Sales/Marketing | Execution | Bot Framework | Social API |

---

## Summary

### Current State
- **Healthy Service:** Jerry performing well (250ms, 2% error, 98% uptime)
- **Limited Capacity:** Only 1 of 5 services running
- **System Health:** 45/100 (degraded)
- **Bottleneck:** Single point of failure

### Projected Improvements
- Deploying Randy & Tommy: +30 points (75/100)
- Restoring TANDRbot & TANDRSocial: +10 points (85/100)
- Full 5-service operation: 85/100 (healthy)

### Timeline
- Deployment: 8-17 hours
- Full recovery: Achievable within 1 day
- Performance gain: 3-4x throughput increase

---

**Version:** 1.0.0
**Status:** Performance Analysis Complete
**Last Updated:** 2026-03-07
**Next Review:** After service deployments
