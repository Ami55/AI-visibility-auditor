import { AuditReport } from "../types";

// Fictional demonstration data; no live audit or measurements were performed.
export const SAMPLE_REPORT: AuditReport = {
  id: "audit-example-travel",
  isDemo: true,
  domain: "example.com",
  brandName: "Example Travel",
  industry: "Travel & Private Tour Guide Services",
  country: "Worldwide",
  timestamp: new Date().toISOString(),
  overallScore: 78,
  grade: "B",
  strengths: [
    "High mention frequency in destination-specific queries across Gemini and ChatGPT.",
    "Strong entity association with 'vetted local tour guides' and 'private excursions'.",
    "Comprehensive service page hierarchy addressing localized trip-planning intent.",
    "Solid catalog of local guide profiles acting as mini-authority nodes.",
    "Zero indexability roadblocks; robots.txt leaves AI crawler access open."
  ],
  weaknesses: [
    "Low citation share in Perplexity general 'things to do' responses compared to Example Competitor One.",
    "Absence of organization-level sameAs markup referencing Wikidata and official social networks.",
    "FAQ content lacks micro-formatting schema on major destination category pages.",
    "Author person schemas are missing for local area expert guides in content hubs.",
    "Sparse news mentions and press signals inside standard AI pre-trained datasets."
  ],
  opportunities: [
    "Inject destination-level Organization and LocalBusiness schema to feed Google AI Overviews directly.",
    "Restructure FAQs to address conversational zero-search queries like 'is Example Travel safe'.",
    "Formulate an entity amplification initiative linking guide profiles to active external travel blogs."
  ],
  platforms: [
    {
      "name": "ChatGPT",
      "score": 82,
      "status": "Strong",
      "explanation": "Example Travel is frequently cited when prompts request highly localized, private, and customizable itineraries. GPT-4o retrieves travel records from established blogs mentioning the brand.",
      "reasons": [
        "Strong brand authority in destination travel forums.",
        "Positive sentiment across verified user reviews cited in datasets.",
        "Crawled successfully by GPTBot on key category listings.",
        "High affinity with organic long-tail search intents."
      ]
    },
    {
      "name": "Gemini",
      "score": 79,
      "status": "Strong",
      "explanation": "Thrives under Google Search Grounding due to excellent deep organic indexation. However, sometimes loses real estate to Example Competitor One in commercial intent summaries.",
      "reasons": [
        "Deep indexation indexes over 10,000+ tour detail pages.",
        "Strong brand entity recognition in Google's Knowledge Graph.",
        "Google Sheets/Maps grounding occasionally includes local guide endpoints.",
        "Sometimes bypassed for large aggregators with higher transaction densities."
      ]
    },
    {
      "name": "Claude",
      "score": 68,
      "status": "Moderate",
      "explanation": "Mentions depend heavily on historical snapshot weights. Highly recognized as an established brand but less real-time flexibility compared to Perplexity or Gemini.",
      "reasons": [
        "Strong foundation in travel guides written before training cutoffs.",
        "Clear core entity identity as a private tour pioneer.",
        "Lacks dynamic real-time catalog lookups for specific guides.",
        "Slightly lower topical authority density on niche modern destinations."
      ]
    },
    {
      "name": "Perplexity",
      "score": 72,
      "status": "Moderate",
      "explanation": "Citations are highly factual and map back to customer support or reviews. However, Perplexity Pro Search often selects larger hubs like Example Reviews or Example Competitor One for generic recommendations.",
      "reasons": [
        "Directly retrieves and displays domain pages as source links.",
        "Strong authority mapping on customer trust/safety FAQs.",
        "Falls behind multi-million listing portals on high-volume keywords.",
        "Attribution anchors could be improved with breadcrumb optimizations."
      ]
    },
    {
      "name": "Google AI Overviews",
      "score": 85,
      "status": "Strong",
      "explanation": "Google's SGE/AI Overviews frequently match Example Travel for local queries because of the high density of user-generated review components and granular pricing schema.",
      "reasons": [
        "Consistent structured pricing on individual tour layouts.",
        "Highly authoritative localized content matching searcher intent.",
        "Strong correlation with local maps packs and organic results.",
        "Excellent semantic depth in 'About our guides' pages."
      ]
    }
  ],
  entity: {
    "score": 74,
    "signals": {
      "isEntityRecognized": true,
      "isBrandClearlyDefined": true,
      "isOrganizationSchemaPresent": true,
      "isAuthorEntitiesPresent": false,
      "isSocialProfilesConnected": false,
      "isKnowledgeGraphEligible": true
    },
    "strengths": [
      "Explicit Google Knowledge Graph Entity ID exists.",
      "Uniform naming conventions across 90%+ of primary domains.",
      "Strong consistent category association with 'Private Tours'."
    ],
    "missingSignals": [
      "No Wikidata or Wikipedia page listings specifically for the exact corporate entity name.",
      "SameAs link markup is disjointed on homepage and footer nodes."
    ],
    "recommendedImprovements": [
      "Add structured 'sameAs' array referencing official YouTube, Facebook, and Crunchbase profiles.",
      "Pioneer a Wikidata submission using reputable secondary press citations to secure solid knowledge panels."
    ]
  },
  content: {
    "score": 83,
    "hasAIUtility": true,
    "hasServiceExplaining": true,
    "hasExpertiseSignals": true,
    "hasFAQs": false,
    "hasKeyTopics": true,
    "topicsCovered": [
      "Private local guides in Rome, Paris, London, and Tokyo",
      "Cruiseship shore excursions fully customizable alignments",
      "Vetting process, safety assurance, and cancelation terms",
      "Local guide bios and direct messaging interfaces"
    ],
    "topicsMissing": [
      "Comparison tables explaining pricing vs. standard pre-packaged group tours",
      "Explicit FAQ schema matching questions like 'how do local guides get paid'"
    ],
    "potentialContentGaps": [
      "Needs explicit content demonstrating destination safety tips, specifically authored by resident guides to capture the E-E-A-T vectors used by LLM retrieval crawlers."
    ]
  },
  authority: {
    "score": 75,
    "mentionSources": [
      "editorial.example",
      "business.example",
      "reviews.example (highly cited cluster)",
      "travel-forum.example forums",
      "ratings.example profile reviews"
    ],
    "trustSignalsFound": [
      "High density of positive consumer reviews on trusted platforms.",
      "Consistent domain age signals (registered 2008).",
      "Numerous external links from premium tourism editorial boards."
    ],
    "trustSignalsMissing": [
      "Wikidata links on major travel portals.",
      "Coordinated brand mentions in modern digital marketing podcasts and blogs."
    ]
  },
  retrieval: {
    "score": 80,
    "semanticHTML": "Good",
    "structuredData": "Needs Improvement",
    "pageHierarchy": "Excellent",
    "internalLinking": "Good",
    "crawlability": "Excellent",
    "contentClarity": "Excellent",
    "infoArchitecture": "Good",
    "details": "The site structure uses clear headers (H1-H3) and clean descriptive lists which make text easy to scrape. Crawlability is seamless because no excessive client-side JS hydration blocks AI agents."
  },
  technical: {
    "score": 77,
    "implemented": [
      "BreadcrumbList Schema",
      "JSON-LD Organization Schema",
      "Granular Product/Service markup"
    ],
    "missing": [
      "FAQPage Schema in destination listings",
      "Author/ProfilePage Schema for individual guides",
      "WebSite SearchAction schema"
    ],
    "errors": [
      "Duplicate Organization markup on subdomains creating entity parsing conflicts"
    ],
    "warnings": [
      "Missing logo attribute in primary Organization block.",
      "Missing postalAddress in local company profiles."
    ]
  },
  competitors: {
    "you": {
      "name": "example.com",
      "visibilityScore": 78,
      "entityScore": 74,
      "authorityScore": 75,
      "contentScore": 83
    },
    "competitors": [
      {
        "name": "competitor-one.example",
        "visibilityScore": 92,
        "entityScore": 88,
        "authorityScore": 93,
        "contentScore": 89
      },
      {
        "name": "competitor-two.example",
        "visibilityScore": 86,
        "entityScore": 82,
        "authorityScore": 85,
        "contentScore": 87
      }
    ],
    "advantages": [
      "Niche specialization: LLMs associate your brand explicitly with 'private', 'handpicked', and 'fully customizable local experience' query vectors.",
      "Stronger guide-to-customer direct relationship narratives."
    ],
    "disadvantages": [
      "Significantly smaller baseline authority mention volume globally compared to Example Competitor One's search indexing footprint.",
      "Less citation coverage in generic travel planning checklists."
    ],
    "missedOpportunities": [
      "Targeting travel prompts prioritizing smaller groups or senior-friendly custom accessibility tours."
    ]
  },
  roadmap: [
    {
      "id": "roadmap-1",
      "title": "Deploy sameAs and Knowledge Anchors",
      "description": "Align organization schema with Wikidata ID reference nodes, establishing a direct bridge for ChatGPT and Gemini to verify company information.",
      "priority": "High",
      "impact": "High",
      "difficulty": "Easy",
      "estimatedGain": 9
    },
    {
      "id": "roadmap-2",
      "title": "Implement FAQPage JSON-LD on high-value destinations",
      "description": "Translate high-frequency queries about private guides into schema blocks on landing pages, enabling Perplexity and Google Overviews to fetch direct answers.",
      "priority": "High",
      "impact": "High",
      "difficulty": "Medium",
      "estimatedGain": 8
    },
    {
      "id": "roadmap-3",
      "title": "Establish Guide Profile Schema (ProfilePage)",
      "description": "Inject Schema.org ProfilePage attributes for registered local guides. This converts plain bio text into rich structured entities matching authoritativeness parameters (E-E-A-T).",
      "priority": "Medium",
      "impact": "Medium",
      "difficulty": "Medium",
      "estimatedGain": 6
    },
    {
      "id": "roadmap-4",
      "title": "Fix Duplicate Organization Markup Blocks",
      "description": "Remove residual duplicate markup tags generated in older legacy server templates, consolidating entity identity into a single clean endpoint.",
      "priority": "High",
      "impact": "Medium",
      "difficulty": "Easy",
      "estimatedGain": 4
    },
    {
      "id": "roadmap-5",
      "title": "Generate AI-Optimized Destination Guides",
      "description": "Draft dense, QA-style travel guides centered around rare, local insights, explicitly satisfying deep neural search criteria used by RAG retrievers.",
      "priority": "Low",
      "impact": "High",
      "difficulty": "Hard",
      "estimatedGain": 7
    }
  ],
  historicalTrend: [
    { "month": "Dec", "score": 75 },
    { "month": "Jan", "score": 76 },
    { "month": "Feb", "score": 75 },
    { "month": "Mar", "score": 77 },
    { "month": "Apr", "score": 78 },
    { "month": "May", "score": 78 },
    { "month": "Jun", "score": 78 }
  ],
  matrix: [
    {
      "name": "Add sameAs Wikidata anchors",
      "urgency": 85,
      "influence": 90,
      "category": "Quick Win"
    },
    {
      "name": "FAQPage Schema rollout",
      "urgency": 80,
      "influence": 85,
      "category": "Quick Win"
    },
    {
      "name": "Guide ProfilePage schema integration",
      "urgency": 65,
      "influence": 70,
      "category": "Strategic Focus"
    },
    {
      "name": "Clean duplicate org codes",
      "urgency": 90,
      "influence": 45,
      "category": "Quick Win"
    },
    {
      "name": "Write Resident Guide Local Bio Posts",
      "urgency": 50,
      "influence": 80,
      "category": "Strategic Focus"
    }
  ]
};
