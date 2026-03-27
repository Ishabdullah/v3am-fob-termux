**324 Ports and paths are changed ref data**

# Temporal Reasoning System

**Created:** 2026-02-12
**Status:** Living Document - Evolves with use
**Purpose:** Document how T&R Builders handles time, timezone mapping, and temporal coordination across distributed services

---

## 🌍 **The Problem We're Solving**

We have services running across multiple machines in different timezones:
- **Your local machine:** 7:44 AM (your clock, your reality)
- **Server VM:** 1:41 PM (TANDR-2026-02-11 system time)
- **Anthropic Claude:** Unknown regional server (varies by model/request)
- **TANDRbot, TANDRmgr, TANDRSocial:** Each logging in server timezone

**The challenge:** When a user reports "I sent this message this morning" and we see it timestamped at 7:41 PM in logs, we need to know if that's a problem or just timezone math.

---

## 📍 **Current Time Zone Observations**

### Confirmed Time Delta (2026-02-12, Session Start)
- **User's machine local time:** 7:44 AM
- **Server log time:** 1:41 PM (same clock moment)
- **Delta:** +6 hours (server ahead of user)
- **Likely timezone:** User in UTC-6 (Central), Server in UTC or UTC+1

### Method: Physical Clock Observation
This is the **gold standard** for timezone mapping in this system:
1. You look at the clock in front of you
2. You tell me what you see
3. We correlate with server logs at that same moment
4. We document the delta
5. **We trust your physical observation over calculated offsets**

Why? Because:
- No calculation errors
- No daylight saving time confusion
- No ambiguity about region
- Direct empirical data

---

## 🔄 **Three-Layer Time Strategy**

### Layer 1: UTC (The Anchor)
- **Where used:** Internal logging, API timestamps, cross-system synchronization
- **Format:** ISO 8601 (2026-02-12T13:41:00Z)
- **Why:** Machine-readable, unambiguous, global reference
- **Implementation:** Minimal code change—just use existing server time as UTC source

### Layer 2: Local Machine Time (The Reality)
- **Where used:** User reports, conversation context, "when did this happen?"
- **Format:** What you see on your clock (7:44 AM, etc.)
- **Why:** This is what the user actually experienced
- **Implementation:** Zero code—just ask you "what time do you see?"

### Layer 3: Service Timezone Map (The Fallback)
- **Where used:** When services fail, when we need to cross-reference logs
- **Format:** Documented mapping of each service to its observed timezone
- **Why:** Quick lookup, no calculation needed

---

## 📋 **Service Timezone Map (Live Document)**

Update this as we observe each service:

**324 Ports and paths are changed ref data**
