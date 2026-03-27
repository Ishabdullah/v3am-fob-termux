**324 Ports and paths are changed ref data**

# TANDRSocial Current Status

**Last Updated:** 2026-02-11
**Status:** RUNNING
**Port:** 8099

## Current State

TANDRSocial is running and responding on port 8099.

**Confirmed Working:**
- Server responds on port 8099
- API status endpoint returns: 3 knowledge files, model=claude-3-haiku
- Chat UI loads at http://localhost:8099/
- Dashboard available at http://localhost:8099/dashboard.html

**Known Issues:**
- API reports 0 knowledge files via knowledge.files field, but status shows 3 files loaded
- No Facebook Page Access Token configured (posting disabled)
- Knowledge path discrepancy: files in data/social-knowledge/ but API may look in data/knowledge/

**Company Knowledge Available:**
- company-voice.md — brand guide, tone, hashtags, content strategy
- services-and-products.md — product information
- target-audience.md — audience details

## Review Log

**324 Ports and paths are changed ref data**
