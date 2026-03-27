**324 Ports and paths are changed ref data**

# Scout Agent - Description & Capabilities

**Agent:** Scout
**Port:** 9203
**Specialization:** Intelligence & Research
**Created:** 2026-03-04

---

## What is Scout?

Scout is an intelligence and research specialist built into the TANDR agent network. Scout excels at:

1. **Discovery** - Finding valuable information in large datasets
2. **Analysis** - Identifying patterns, trends, and anomalies
3. **Research** - Synthesizing findings into actionable intelligence
4. **Synthesis** - Creating comprehensive reports from disparate sources

Scout works in tandem with **Jerry** (Operations) to turn raw data into strategic intelligence.

---

## Key Differentiator

**Jerry** answers "What should we do?"
**Scout** answers "What should we know?"

Scout is the deep-dive agent—where Jerry is tactical, Scout is strategic.

---

## Core Capabilities

### 1. Full-Text Search
Search across entire ADIR ecosystem with intelligent filtering.

**Example:**
```
Scout, find all contacts from January 2026 with "decision pending" status
```

**Returns:**
- List of matching files
- Snippet excerpts showing context
- Relevance scoring

### 2. Data Extraction
Pull structured data from unstructured sources.

**Example:**
```
Scout, extract all email addresses from the Contacts.docx file
```

**Returns:**
- Structured JSON/CSV format
- Deduplicated
- Validated

### 3. Pattern Recognition
Identify trends and anomalies in datasets.

**Example:**
```
Scout, analyze our sales pipeline—what's the pattern in deal sizes by region?
```

**Returns:**
- Statistical analysis
- Trend visualizations
- Anomaly alerts

### 4. Research Synthesis
Combine insights from multiple sources into comprehensive reports.

**Example:**
```
Scout, create a competitive analysis report comparing our services with T&R Builders
```

**Returns:**
- Multi-section report
- Data-backed findings
- Strategic recommendations

### 5. Lead Discovery
Identify high-potential prospects based on CRM data.

**Example:**
```
Scout, find warm leads—contacted in last 30 days with pending actions
```

**Returns:**
- Ranked lead list
- Contact info
- Recommended next actions

### 6. Market Intelligence
Analyze industry trends and competitive landscape.

**Example:**
```
Scout, what's happening in the construction industry? New regulations? Market size changes?
```

**Returns:**
- Industry trend summary
- Regulatory changes
- Market size & growth projections

---

## Integration Architecture

### Parent Agent
Scout reports to **Jerry (9200)** for operations decisions.

### Sibling Agents
- **Architect (9204)** - Uses Scout's findings to design solutions
- **Sentinel (9205)** - Monitors Scout's discovered patterns
- **Crafter (9206)** - Uses Scout research to create content

### Data Sources
1. **PromptLibrary** - Agentic prompt templates
2. **CRM Database** - Shared pipeline & contacts
3. **Company Files** - FRIEND.md, brand voice, company data
4. **External Files** - Docx, xlsx via DocumentParser

### Tools
- **DocumentParser** (port 11109) - Parse DOCX/XLSX
- **ADIR Hub** (port 9303) - Search indexed files
- **Web Speech API** - Voice input/output

---

## Use Cases

### Sales & Marketing
- **Lead Scoring:** Analyze which leads are most likely to convert
- **Campaign Analysis:** What messaging resonates with which segments?
- **Competitive Intelligence:** How are competitors marketing similar services?

### Operations
- **Pipeline Health:** Are deals progressing normally?
- **Resource Allocation:** Where should we focus efforts?
- **Performance Metrics:** Which services generate highest margins?

### Strategic Planning
- **Market Opportunity:** Which new markets should we target?
- **Product Strategy:** What services should we develop next?
- **Risk Assessment:** What external factors could impact business?

---

## Voice Features

Scout includes full voice support:

### Input (Speech-to-Text)
- Click mic button
- Speak your query
- Auto-filled into input box
- Send with Enter

### Output (Text-to-Speech)
- Scout's responses automatically speak
- Click "Speak" to replay response
- Adjustable speed/pitch/volume

---

## Working with Scout

### Example Workflow 1: Lead Discovery
```
1. You: "Scout, find high-priority leads"
2. Scout: Searches CRM, applies scoring, returns top leads
3. Scout: "Found 7 high-priority leads. Top prospect is A Kidz Dental Zone with $3,346 outstanding payment"
4. Scout: (Speaks response)
```

### Example Workflow 2: Market Analysis
```
1. You: "Scout, analyze construction industry trends"
2. Scout: Searches industry data, external sources
3. Scout: "Residential construction down 12% YoY. Commercial up 5%. New regulations in Oregon effective Q2..."
4. Scout: (Speaks detailed analysis)
```

### Example Workflow 3: Pattern Discovery
```
1. You: "Scout, what patterns do you see in our customer acquisition?"
2. Scout: Analyzes lead sources, conversion rates, deal stages
3. Scout: "Pattern detected: Referrals convert 3x better than cold outreach..."
4. Scout: (Speaks findings)
```

---

## Capabilities vs. Other Agents

| Capability | Scout | Jerry | Randy | Tommy |
|------------|-------|-------|-------|-------|
| Search | ⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐ |
| Analysis | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
| Research | ⭐⭐⭐ | ⭐ | ⭐⭐ | - |
| Synthesis | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | - |
| Reporting | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | - |
| Operations | ⭐ | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ |
| Sales/Marketing | ⭐⭐ | - | ⭐⭐⭐ | ⭐ |

---

## Output Formats

Scout can output findings in multiple formats:

- **Text Report** - Written summary with sections
- **JSON** - Structured data for tools
- **CSV** - Tabular data for spreadsheets
- **Markdown** - Formatted for documentation
- **Voice** - Spoken summary (TTS)

---

## Keywords & Triggers

Ask Scout to:
- **Find:** "Find all leads in..."
- **Search:** "Search for..."
- **Analyze:** "Analyze [dataset]..."
- **Discover:** "Discover patterns in..."
- **Report:** "Create a report on..."
- **Extract:** "Extract [data] from..."
- **Compare:** "Compare [item1] with [item2]..."

---

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| Simple search | <1s | Single keyword |
| Complex analysis | 5-15s | Large dataset |
| Pattern discovery | 10-30s | Full pipeline analysis |
| Report generation | 20-60s | Comprehensive synthesis |

---

## Data Privacy & Security

Scout operates entirely within the TANDR system:
- No external data access
- All searches local to ADIR
- Conversation logs stored locally
- Can be air-gapped if needed

---

## Known Limitations

- **Real-time Data:** Only sees data currently in ADIR (no live web scraping)
- **Large Files:** XLSX files >10MB may slow analysis
- **External APIs:** Requires DocumentParser integration for complex file parsing
- **Voice:** Requires modern browser with Web Speech API support

---

## Future Enhancements

Planned for Scout v2.0:
- Real-time data integration from APIs
- Automated report scheduling
- Advanced ML-based pattern detection
- Multi-language support
- Custom analysis templates

---

## Summary

Scout brings **intelligence and insight** to the TANDR agent network. While Jerry handles operations and Randy handles sales, Scout answers the strategic question: **"What should we know?"**

Deploy Scout today to unlock deeper insights into your business, market, and customers.

**Status:** ✅ Ready
**Version:** 1.0.0
**Port:** 9203

**324 Ports and paths are changed ref data**
