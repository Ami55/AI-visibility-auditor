import { GoogleGenAI } from "@google/genai";
import { generateHeuristicAudit } from "../server/heuristicAuditor";

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  try {
    const { domain, brandName, competitors, industry, country } = req.body || {};

    if (!domain) {
      res.status(400).json({ error: "Domain URL is required." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.log(`[Vercel Serverless] No GEMINI_API_KEY found. Generating smart heuristic audit for ${domain}.`);
      const fallbackReport = generateHeuristicAudit({
        domain,
        brandName,
        competitors,
        industry,
        country,
      });
      res.status(200).json(fallbackReport);
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `Perform a comprehensive AI Search Visibility, Entity Status, and Content Retrieval readiness audit for the brand/website below:

Target Domain: ${domain}
Brand Name: ${brandName || "Extracted from domain name"}
Competitors: ${competitors && competitors.length > 0 ? competitors.join(", ") : "None provided"}
Industry: ${industry || "Detected of domain type"}
Country: ${country || "Global / Non-specific"}

Ensure the audit has deep analytical realism. Use real knowledge or strong heuristic inference of this domains and competitors. You MUST follow this EXACT JSON structure. Ensure that all ratings, scores, strengths, weaknesses, and roadmap steps are genuine, specific, and connected directly to how AI search systems (ChatGPT, Gemini, Claude, Perplexity, Copilot, Google AI Overviews) parse, synthesize, retrieve, and cite entities rather than pure standard legacy Google PageRank SEO concepts.

JSON structure:
{
  "id": "audit-unique-id",
  "domain": "${domain}",
  "brandName": "${brandName || 'Detected Brand'}",
  "industry": "${industry || 'Detected Industry'}",
  "country": "${country || 'Worldwide'}",
  "timestamp": "${new Date().toISOString()}",
  "overallScore": <integer, 0 to 100 based on weighted scores>,
  "grade": "A" | "B" | "C" | "D" | "F",
  "strengths": [
    "strength statement 1 (explicitly AI and brand entity search focused)",
    "strength statement 2",
    "strength statement 3",
    "strength statement 4",
    "strength statement 5"
  ],
  "weaknesses": [
    "weakness statement 1",
    "weakness statement 2",
    "weakness statement 3",
    "weakness statement 4",
    "weakness statement 5"
  ],
  "opportunities": [
    "opportunity statement 1",
    "opportunity statement 2",
    "opportunity statement 3"
  ],
  "platforms": [
    {
      "name": "ChatGPT",
      "score": <integer 0-100>,
      "status": "Strong" | "Moderate" | "Weak" | "Not Detected",
      "explanation": "Brief explanation concerning ChatGPT search, web-retrieval mechanisms, custom GPT citations, and OpenAI Web Crawler logs.",
      "reasons": ["Reason 1", "Reason 2", "Reason 3", "Reason 4"]
    },
    {
      "name": "Gemini",
      "score": <integer 0-100>,
      "status": "Strong" | "Moderate" | "Weak" | "Not Detected",
      "explanation": "Brief explanation concerning Google Gemini, Google Search Grounding integration, and Google knowledge graph references.",
      "reasons": ["Reason 1", "Reason 2", "Reason 3", "Reason 4"]
    },
    {
      "name": "Claude",
      "score": <integer 0-100>,
      "status": "Strong" | "Moderate" | "Weak" | "Not Detected",
      "explanation": "Brief explanation concerning Anthropic Claude's reliance on fixed datasets vs. search connectors, and documentation citation density.",
      "reasons": ["Reason 1", "Reason 2", "Reason 3", "Reason 4"]
    },
    {
      "name": "Perplexity",
      "score": <integer 0-100>,
      "status": "Strong" | "Moderate" | "Weak" | "Not Detected",
      "explanation": "Brief explanation regarding Perplexity AI, Pro Search routing, indexing speed, and attribution visibility.",
      "reasons": ["Reason 1", "Reason 2", "Reason 3", "Reason 4"]
    },
    {
      "name": "Google AI Overviews",
      "score": <integer 0-100>,
      "status": "Strong" | "Moderate" | "Weak" | "Not Detected",
      "explanation": "Brief explanation about Google's SGE/AI Overviews, merchant feed sync, structured schema parsing, and direct context panel links.",
      "reasons": ["Reason 1", "Reason 2", "Reason 3", "Reason 4"]
    }
  ],
  "entity": {
    "score": <integer 0-100>,
    "signals": {
      "isEntityRecognized": <boolean>,
      "isBrandClearlyDefined": <boolean>,
      "isOrganizationSchemaPresent": <boolean>,
      "isAuthorEntitiesPresent": <boolean>,
      "isSocialProfilesConnected": <boolean>,
      "isKnowledgeGraphEligible": <boolean>
    },
    "strengths": ["Entity strength 1", "Entity strength 2", "Entity strength 3"],
    "missingSignals": ["Missing signal 1", "Missing signal 2"],
    "recommendedImprovements": ["Improvement suggestion 1", "Improvement suggestion 2"]
  },
  "content": {
    "score": <integer 0-100>,
    "hasAIUtility": <boolean>,
    "hasServiceExplaining": <boolean>,
    "hasExpertiseSignals": <boolean>,
    "hasFAQs": <boolean>,
    "hasKeyTopics": <boolean>,
    "topicsCovered": ["Topic 1", "Topic 2", "Topic 3"],
    "topicsMissing": ["Missing topic 1", "Missing topic 2"],
    "potentialContentGaps": ["Content gap 1", "Content gap 2"]
  },
  "authority": {
    "score": <integer 0-100>,
    "mentionSources": ["Credible site citation 1", "Credible site citation 2", "Review platform", "Industry roster"],
    "trustSignalsFound": ["Trust signal 1", "Trust signal 2"],
    "trustSignalsMissing": ["Missing trust signal 1", "Missing trust signal 2"]
  },
  "retrieval": {
    "score": <integer 0-100>,
    "semanticHTML": "Excellent" | "Good" | "Needs Improvement",
    "structuredData": "Excellent" | "Good" | "Needs Improvement",
    "pageHierarchy": "Excellent" | "Good" | "Needs Improvement",
    "internalLinking": "Excellent" | "Good" | "Needs Improvement",
    "crawlability": "Excellent" | "Good" | "Needs Improvement",
    "contentClarity": "Excellent" | "Good" | "Needs Improvement",
    "infoArchitecture": "Excellent" | "Good" | "Needs Improvement",
    "details": "Explanation on retrieval readiness for vector and hybrid search engines."
  },
  "technical": {
    "score": <integer 0-100>,
    "implemented": ["Org Markup", "FAQ Schema", "Breadcrumbs"],
    "missing": ["Author Markup", "Article Schema"],
    "errors": ["Schema structure validation issue in secondary subpages"],
    "warnings": ["Missing optional sameAs link attributes"]
  },
  "competitors": {
    "you": {
      "name": "${domain}",
      "visibilityScore": <integer>,
      "entityScore": <integer>,
      "authorityScore": <integer>,
      "contentScore": <integer>
    },
    "competitors": [
      {
        "name": "Competitor 1 Domain",
        "visibilityScore": <integer>,
        "entityScore": <integer>,
        "authorityScore": <integer>,
        "contentScore": <integer>
      }
    ],
    "advantages": ["Competitor advantage 1", "Competitor advantage 2"],
    "disadvantages": ["Competitor disadvantage 1", "Competitor disadvantage 2"],
    "missedOpportunities": ["Missed opportunity 1", "Missed opportunity 2"]
  },
  "roadmap": [
    {
      "id": "item-1",
      "title": "Comprehensive Action Title",
      "description": "Specific instruction on how to execute to achieve AI indexation optimization.",
      "priority": "High" | "Medium" | "Low",
      "impact": "High" | "Medium" | "Low",
      "difficulty": "Easy" | "Medium" | "Hard",
      "estimatedGain": <integer points gain e.g. +8>
    }
  ],
  "historicalTrend": [
    {"month": "Dec", "score": <integer>},
    {"month": "Jan", "score": <integer>},
    {"month": "Feb", "score": <integer>},
    {"month": "Mar", "score": <integer>},
    {"month": "Apr", "score": <integer>},
    {"month": "May", "score": <integer>},
    {"month": "Jun", "score": <integer>}
  ],
  "matrix": [
    {
      "name": "Add Organization and sameAs schema markup",
      "urgency": <integer 0 to 100>,
      "influence": <integer 0 to 100>,
      "category": "Quick Win"
    },
    {
      "name": "Write FAQ sections for top authoritative services",
      "urgency": <integer 0 to 100>,
      "influence": <integer 0 to 100>,
      "category": "Quick Win" | "Strategic Focus" | "Fill Content Gap" | "Nice to Have"
    }
  ]
}

Strictly output raw, minified or well-formatted JSON without any conversational preamble or markdown code blocks (no \`\`\`json encapsulation). Just the final JSON object. Ensure scores obey the weighted overall formula:
Weighted Score = (AI Visibility * 0.25) + (Entity * 0.20) + (Content * 0.20) + (Authority * 0.20) + (Technical * 0.15). Return integer values for all score integers.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction:
          "You are an AI Search Visibility and Generative Engine Optimization (GEO) audit engine. Respond ONLY with a valid, clean JSON object matching the requested schema without markdown fences or extraneous text.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Unable to generate text response from Gemini API.");
    }

    const parseJSONSafely = (raw: string) => {
      let str = raw.trim();
      if (str.startsWith("```")) {
        str = str.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      }
      try {
        return JSON.parse(str);
      } catch {
        const first = str.indexOf("{");
        const last = str.lastIndexOf("}");
        if (first !== -1 && last !== -1 && last > first) {
          const candidate = str.slice(first, last + 1);
          try {
            return JSON.parse(candidate);
          } catch {
            const cleaned = candidate
              .replace(/,\s*([}\]])/g, "$1")
              .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");
            return JSON.parse(cleaned);
          }
        }
        throw new Error("Invalid JSON structure from model response.");
      }
    };

    const resultJson = parseJSONSafely(text);
    res.status(200).json(resultJson);
  } catch (error: any) {
    console.warn("[Vercel Serverless] Gemini call failed, returning heuristic fallback:", error?.message || error);
    try {
      const { domain, brandName, competitors, industry, country } = req.body || {};
      const fallbackReport = generateHeuristicAudit({
        domain: domain || "sampledomain.com",
        brandName,
        competitors,
        industry,
        country,
      });
      res.status(200).json(fallbackReport);
    } catch (fallbackError: any) {
      res.status(500).json({
        error: "Failed to generate AI Visibility Audit.",
        details: error?.message || String(error),
      });
    }
  }
}
