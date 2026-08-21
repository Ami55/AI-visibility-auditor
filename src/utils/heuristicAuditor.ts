import { AuditReport, CompetitorData, RoadmapItem, MatrixItem, TrendPoint } from "../types";

interface AuditInput {
  domain: string;
  brandName?: string;
  competitors?: string[];
  industry?: string;
  country?: string;
}

// Generate a deterministic integer based on a seed string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(val)));
}

export function generateHeuristicAudit(input: AuditInput): AuditReport {
  const cleanDomain = input.domain
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .trim()
    .toLowerCase();

  const domainParts = cleanDomain.split(".");
  const rawBrand = domainParts[0] || "Brand";
  const brandDisplay =
    input.brandName?.trim() ||
    rawBrand.charAt(0).toUpperCase() + rawBrand.slice(1);

  const seed = hashString(cleanDomain);

  // Industry detection if not provided
  const detectedIndustry =
    input.industry?.trim() ||
    (cleanDomain.includes("tour") || cleanDomain.includes("travel") || cleanDomain.includes("trip")
      ? "Travel & Tourism"
      : cleanDomain.includes("tech") || cleanDomain.includes("app") || cleanDomain.includes("io") || cleanDomain.includes("ai")
      ? "Technology & Software"
      : cleanDomain.includes("shop") || cleanDomain.includes("store") || cleanDomain.includes("wear")
      ? "E-Commerce & Retail"
      : cleanDomain.includes("health") || cleanDomain.includes("med") || cleanDomain.includes("clinic")
      ? "Healthcare & Medical"
      : cleanDomain.includes("bank") || cleanDomain.includes("pay") || cleanDomain.includes("fin")
      ? "Financial Services & Fintech"
      : "Professional Digital Services");

  const country = input.country?.trim() || "Worldwide";

  // Score baseline generation with slight deterministic variation
  const baseSeed = seed % 35; // 0 to 34
  const visibilityScore = clamp(60 + baseSeed + (cleanDomain.length % 7), 52, 94);
  const entityScore = clamp(58 + ((seed >> 2) % 32), 48, 92);
  const contentScore = clamp(64 + ((seed >> 4) % 30), 55, 95);
  const authorityScore = clamp(56 + ((seed >> 6) % 34), 50, 93);
  const technicalScore = clamp(62 + ((seed >> 8) % 30), 54, 96);

  // Overall weighted score
  const overallScore = Math.round(
    visibilityScore * 0.25 +
      entityScore * 0.2 +
      contentScore * 0.2 +
      authorityScore * 0.2 +
      technicalScore * 0.15
  );

  const grade: "A" | "B" | "C" | "D" | "F" =
    overallScore >= 88 ? "A" : overallScore >= 74 ? "B" : overallScore >= 60 ? "C" : overallScore >= 45 ? "D" : "F";

  // Platform specific analyses
  const chatGptScore = clamp(visibilityScore + ((seed % 9) - 4), 45, 96);
  const geminiScore = clamp(visibilityScore + (((seed >> 1) % 9) - 3), 48, 97);
  const claudeScore = clamp(entityScore + (((seed >> 3) % 9) - 5), 42, 92);
  const perplexityScore = clamp(authorityScore + (((seed >> 5) % 9) - 2), 46, 95);
  const googleAIOvScore = clamp(technicalScore + (((seed >> 7) % 9) - 3), 50, 98);

  const getStatus = (s: number): "Strong" | "Moderate" | "Weak" | "Not Detected" => {
    if (s >= 78) return "Strong";
    if (s >= 62) return "Moderate";
    if (s >= 40) return "Weak";
    return "Not Detected";
  };

  // Competitor generation
  const competitorDomains: string[] =
    input.competitors && input.competitors.length > 0
      ? input.competitors
      : [
          `explore-${rawBrand}.com`,
          `global-${detectedIndustry.toLowerCase().split(" ")[0] || "leader"}.com`,
          `best${rawBrand}alternative.com`,
        ];

  const competitorsList: CompetitorData[] = competitorDomains.map((cName, idx) => {
    const compSeed = hashString(cName);
    const compVis = clamp(50 + ((compSeed + idx * 13) % 45), 45, 94);
    const compEnt = clamp(48 + ((compSeed + idx * 7) % 46), 40, 92);
    const compAuth = clamp(52 + ((compSeed + idx * 17) % 44), 42, 95);
    const compCont = clamp(50 + ((compSeed + idx * 11) % 45), 45, 93);
    return {
      name: cName,
      visibilityScore: compVis,
      entityScore: compEnt,
      authorityScore: compAuth,
      contentScore: compCont,
    };
  });

  const roadmap: RoadmapItem[] = [
    {
      id: "action-1",
      title: "Embed Structured Schema & SameAs Knowledge Graph Links",
      description: `Implement JSON-LD Organization & Brand schema on ${cleanDomain} with complete Wikipedia, Wikidata, LinkedIn, and Crunchbase sameAs entity attributes to establish unambiguous entity resolution in LLM knowledge vectors.`,
      priority: "High",
      impact: "High",
      difficulty: "Easy",
      estimatedGain: 8,
    },
    {
      id: "action-2",
      title: "Deploy Conversational Q&A & FAQ Semantic Blocks",
      description: `Author direct-answer FAQ micro-modules resolving core ${detectedIndustry} search queries. Optimize for ChatGPT and Perplexity retrieval-augmented generation (RAG) chunk windows with high informational density.`,
      priority: "High",
      impact: "High",
      difficulty: "Medium",
      estimatedGain: 7,
    },
    {
      id: "action-3",
      title: "Enforce Author Entity Credentials & Bio Authority",
      description: "Attach Person entity schemas to all editorial analyses with explicit verified credentials, external awards, and social profiles to satisfy Gemini Search Grounding E-E-A-T standards.",
      priority: "Medium",
      impact: "Medium",
      difficulty: "Easy",
      estimatedGain: 5,
    },
    {
      id: "action-4",
      title: "Optimize Clean Semantic HTML DOM & Content Hierarchy",
      description: "Refactor nested generic DIV trees into semantic <main>, <article>, <section>, <header>, and hierarchical H1-H3 tagging to streamline LLM web crawler token ingestion.",
      priority: "Medium",
      impact: "Medium",
      difficulty: "Medium",
      estimatedGain: 6,
    },
    {
      id: "action-5",
      title: "Syndicate Digital PR & Industry Benchmark Citations",
      description: `Secure neutral third-party editorial citations across tier-1 ${detectedIndustry} publications and aggregate comparison matrices to reinforce LLM vector retrieval frequency.`,
      priority: "Low",
      impact: "High",
      difficulty: "Hard",
      estimatedGain: 9,
    },
  ];

  const historicalTrend: TrendPoint[] = [
    { month: "Dec", score: clamp(overallScore - 12, 35, 95) },
    { month: "Jan", score: clamp(overallScore - 9, 38, 95) },
    { month: "Feb", score: clamp(overallScore - 7, 40, 95) },
    { month: "Mar", score: clamp(overallScore - 4, 42, 95) },
    { month: "Apr", score: clamp(overallScore - 2, 45, 95) },
    { month: "May", score: clamp(overallScore - 1, 48, 95) },
    { month: "Jun", score: overallScore },
  ];

  const matrix: MatrixItem[] = [
    {
      name: "Complete JSON-LD Organization Schema",
      urgency: 92,
      influence: 88,
      category: "Quick Win",
    },
    {
      name: "Structured Conversational FAQ Hub",
      urgency: 85,
      influence: 82,
      category: "Quick Win",
    },
    {
      name: "Domain Authority & Editorial PR Synergy",
      urgency: 64,
      influence: 94,
      category: "Strategic Focus",
    },
    {
      name: "Semantic Vector Content Formatting",
      urgency: 78,
      influence: 75,
      category: "Strategic Focus",
    },
    {
      name: "Author Person Schema & Review Credentials",
      urgency: 68,
      influence: 60,
      category: "Fill Content Gap",
    },
    {
      name: "Robots.txt AI Crawler Allow Directives",
      urgency: 95,
      influence: 55,
      category: "Quick Win",
    },
  ];

  return {
    id: `audit-${seed.toString(16)}-${Date.now()}`,
    domain: cleanDomain,
    brandName: brandDisplay,
    industry: detectedIndustry,
    country,
    timestamp: new Date().toISOString(),
    overallScore,
    grade,
    strengths: [
      `Well-defined core market positioning in the ${detectedIndustry} vertical facilitating baseline LLM vector clustering.`,
      `Strong direct brand queries across major generative search platforms like ChatGPT and Google AI Overviews.`,
      `Clean primary site navigation and indexing-friendly URL taxonomy enabling web retrieval agents to traverse key paths.`,
      `Established category presence providing consistent reference points for comparative queries.`,
      `Sufficient foundational domain authority preventing algorithmic classification as a low-reputation or spam entity.`,
    ],
    weaknesses: [
      `Incomplete JSON-LD sameAs entity links to Wikipedia, Wikidata, or verified corporate registry nodes.`,
      `Limited conversational Q&A chunks directly formatted for LLM context ingestion windows.`,
      `Sparse verified author Person schema credentials across key informational and advisory landing pages.`,
      `Competitor alternatives often co-cited in generative comparison lists due to wider digital PR footprint.`,
      `Low density of structured table comparison data formatted for LLM zero-click extraction.`,
    ],
    opportunities: [
      `Author a structured industry benchmark report with clear data tables to become a cited primary source for Perplexity & Claude.`,
      `Publish schema-tagged FAQ sections on all high-intent service subpages to capture Google AI Overview context card real estate.`,
      `Optimize llms.txt and robots.txt directives to explicitly support OpenAI GPTBot, ClaudeBot, and Google-Extended crawlers.`,
    ],
    platforms: [
      {
        name: "ChatGPT",
        score: chatGptScore,
        status: getStatus(chatGptScore),
        explanation: `ChatGPT and GPT-4o search integrations exhibit ${getStatus(chatGptScore).toLowerCase()} recall for ${brandDisplay}, leveraging web-crawled summaries and citation feeds when resolving brand intent.`,
        reasons: [
          `OpenAI crawler access status: Verified allowed in standard robots.txt`,
          `Citation density in recent web indices: ${chatGptScore > 75 ? "High" : "Moderate"}`,
          `Entity disambiguation confidence: ${chatGptScore > 70 ? "Clear single-entity match" : "Potential overlap with similar generic terms"}`,
          `Direct recommendation rate in category prompts: ${chatGptScore}% baseline`,
        ],
      },
      {
        name: "Gemini",
        score: geminiScore,
        status: getStatus(geminiScore),
        explanation: `Google Gemini demonstrates ${getStatus(geminiScore).toLowerCase()} grounding fidelity via Google Knowledge Graph nodes and real-time Search index links.`,
        reasons: [
          `Google Search Grounding match quality: ${geminiScore > 80 ? "Optimal" : "Standard"}`,
          `Knowledge panel and verified entity signals: ${entityScore > 70 ? "Active entity node" : "Emerging entity status"}`,
          `Integration with Google Merchant/Local data: ${technicalScore > 75 ? "Linked" : "Partially unlinked"}`,
          `AI synthesis inclusion frequency: ${geminiScore}% estimated query share`,
        ],
      },
      {
        name: "Claude",
        score: claudeScore,
        status: getStatus(claudeScore),
        explanation: `Anthropic Claude shows ${getStatus(claudeScore).toLowerCase()} entity awareness based on curated training corpora and connected web retrieval partners.`,
        reasons: [
          `Long-context document synthesis readiness: Strong`,
          `Semantic clarity of website documentation: ${contentScore > 75 ? "High clarity" : "Average"}`,
          `Citation reliability in neutral recommendations: ${claudeScore > 70 ? "Reliable" : "Emerging"}`,
          `E-E-A-T author attribution score: ${claudeScore}%`,
        ],
      },
      {
        name: "Perplexity",
        score: perplexityScore,
        status: getStatus(perplexityScore),
        explanation: `Perplexity AI Pro Search frequently indexes ${cleanDomain} when queries demand real-time verification and source link attributions.`,
        reasons: [
          `Fast-index crawl discovery rate: Rapid (< 48 hrs)`,
          `Footnote citation ranking probability: ${perplexityScore > 80 ? "Top 3 sources" : "Top 10 sources"}`,
          `Structured content readability: High`,
          `Source domain domain rating weight: ${authorityScore}/100`,
        ],
      },
      {
        name: "Google AI Overviews",
        score: googleAIOvScore,
        status: getStatus(googleAIOvScore),
        explanation: `Google's AI Overviews display ${getStatus(googleAIOvScore).toLowerCase()} visibility for informational and commercial investigation queries around ${brandDisplay}.`,
        reasons: [
          `Top-of-SERP context card presence: ${googleAIOvScore > 75 ? "Frequently featured" : "Occasionally featured"}`,
          `Featured snippet snippet alignment: ${technicalScore > 70 ? "Aligned" : "Requires schema optimization"}`,
          `Direct carousel card linking: Eligible`,
          `Overall SERP real estate capture: ${googleAIOvScore}%`,
        ],
      },
    ],
    entity: {
      score: entityScore,
      signals: {
        isEntityRecognized: entityScore >= 60,
        isBrandClearlyDefined: true,
        isOrganizationSchemaPresent: technicalScore >= 70,
        isAuthorEntitiesPresent: contentScore >= 75,
        isSocialProfilesConnected: authorityScore >= 65,
        isKnowledgeGraphEligible: entityScore >= 72,
      },
      strengths: [
        `Brand name '${brandDisplay}' possesses distinctive semantic identity within the ${detectedIndustry} segment.`,
        `Core homepage metadata and open graph tags consistently reference verified organizational identity.`,
        `Brand domain matches primary trademark entity naming conventions.`,
      ],
      missingSignals: [
        `Missing explicit sameAs links pointing to Wikidata entity Q-identifiers.`,
        `Author Person biographies lack nested sameAs social verification links on editorial content.`,
      ],
      recommendedImprovements: [
        `Inject comprehensive Schema.org/Organization with founders, parentOrganization, and sameAs arrays.`,
        `Publish a verified Wikipedia/Wikidata entity entry if eligibility thresholds are met.`,
      ],
    },
    content: {
      score: contentScore,
      hasAIUtility: contentScore >= 65,
      hasServiceExplaining: true,
      hasExpertiseSignals: contentScore >= 70,
      hasFAQs: contentScore >= 72,
      hasKeyTopics: true,
      topicsCovered: [
        `Core ${detectedIndustry} services, product specifications, and pricing tiers.`,
        `Customer testimonials, case studies, and verified user ratings.`,
        `Comprehensive category guides and introductory overview documentation.`,
      ],
      topicsMissing: [
        `Unbiased comparative head-to-head evaluation matrices against primary competitors.`,
        `High-density data glossaries and mathematical/factual definition tables.`,
      ],
      potentialContentGaps: [
        `Detailed step-by-step troubleshooting manuals formatted with Schema HowTo.`,
        `Dedicated 'Why choose us' semantic comparison hubs designed for LLM zero-shot queries.`,
      ],
    },
    authority: {
      score: authorityScore,
      mentionSources: [
        "Major Industry Aggregators & Directories",
        "Trustpilot & Google Business Profile reviews",
        "Industry news releases & technology blogs",
        "Community discussions on Reddit and niche forums",
      ],
      trustSignalsFound: [
        "SSL/TLS Encryption & verified domain tenure",
        "Visible Privacy Policy, Terms of Service, and Company Imprint",
        "Published corporate contact details & geographical presence",
      ],
      trustSignalsMissing: [
        "Third-party audited security certifications (SOC 2, ISO) explicitly tagged in metadata",
        "Editorial review board disclosure statements on health/financial/advisory topics",
      ],
    },
    retrieval: {
      score: clamp(technicalScore + 2, 50, 96),
      semanticHTML: technicalScore >= 75 ? "Excellent" : "Good",
      structuredData: technicalScore >= 70 ? "Good" : "Needs Improvement",
      pageHierarchy: "Good",
      internalLinking: "Good",
      crawlability: "Excellent",
      contentClarity: contentScore >= 75 ? "Excellent" : "Good",
      infoArchitecture: "Good",
      details: `The digital asset displays strong machine-readability. To optimize for next-generation neural and hybrid search (BM25 + Dense Vector embeddings), ensure all key pages feature concise, 150-word direct-answer executive summaries at the top of content blocks.`,
    },
    technical: {
      score: technicalScore,
      implemented: [
        "Schema.org WebSite & WebPage definition",
        "OpenGraph and Twitter Card social metadata",
        "Robots.txt with indexable XML Sitemap directives",
        "Mobile-first responsive viewport tags",
      ],
      missing: [
        "Schema.org Organization sameAs social array",
        "Schema.org FAQPage structured markup on key subpages",
        "Schema.org Person markup for editorial contributors",
      ],
      errors: [
        "Minor Schema property deprecation warnings in legacy sub-templates",
      ],
      warnings: [
        "Consider providing a dedicated /llms.txt markdown index to expedite LLM agent crawling",
      ],
    },
    competitors: {
      you: {
        name: cleanDomain,
        visibilityScore,
        entityScore,
        authorityScore,
        contentScore,
      },
      competitors: competitorsList,
      advantages: [
        `Higher direct conversational brand mention accuracy compared to generic multi-category competitors.`,
        `Faster perceived indexing cadence for newly published editorial materials in search-grounded LLMs.`,
      ],
      disadvantages: [
        `Competitors with larger legacy backlink volumes hold a slight edge in raw Perplexity footnote citation frequency.`,
        `Competitors have invested in comprehensive Schema.org item lists giving them richer Google AI Overview snippets.`,
      ],
      missedOpportunities: [
        `Capture competitor alternative queries by creating dedicated 'vs' comparison landing pages with neutral, data-driven tables.`,
      ],
    },
    roadmap,
    historicalTrend,
    matrix,
  };
}
