export interface PlatformAnalysis {
  name: string; // "ChatGPT" | "Gemini" | "Claude" | "Perplexity" | "Google AI Overviews"
  score: number; // 0-100
  status: "Strong" | "Moderate" | "Weak" | "Not Detected";
  explanation: string;
  reasons: string[];
}

export interface EntitySignals {
  isEntityRecognized: boolean;
  isBrandClearlyDefined: boolean;
  isOrganizationSchemaPresent: boolean;
  isAuthorEntitiesPresent: boolean;
  isSocialProfilesConnected: boolean;
  isKnowledgeGraphEligible: boolean;
}

export interface EntitySection {
  score: number;
  signals: EntitySignals;
  strengths: string[];
  missingSignals: string[];
  recommendedImprovements: string[];
}

export interface ContentSection {
  score: number;
  hasAIUtility: boolean;
  hasServiceExplaining: boolean;
  hasExpertiseSignals: boolean;
  hasFAQs: boolean;
  hasKeyTopics: boolean;
  topicsCovered: string[];
  topicsMissing: string[];
  potentialContentGaps: string[];
}

export interface AuthoritySection {
  score: number;
  mentionSources: string[];
  trustSignalsFound: string[];
  trustSignalsMissing: string[];
}

export interface RetrievalReadinessSection {
  score: number;
  semanticHTML: string;      // "Excellent" | "Good" | "Needs Improvement"
  structuredData: string;    // "Excellent" | "Good" | "Needs Improvement"
  pageHierarchy: string;     // "Excellent" | "Good" | "Needs Improvement"
  internalLinking: string;   // "Excellent" | "Good" | "Needs Improvement"
  crawlability: string;      // "Excellent" | "Good" | "Needs Improvement"
  contentClarity: string;    // "Excellent" | "Good" | "Needs Improvement"
  infoArchitecture: string;  // "Excellent" | "Good" | "Needs Improvement"
  details: string;           // Short contextual narrative
}

export interface TechnicalAISection {
  score: number;
  implemented: string[];
  missing: string[];
  errors: string[];
  warnings: string[];
}

export interface CompetitorData {
  name: string; // Domain name
  visibilityScore: number;
  entityScore: number;
  authorityScore: number;
  contentScore: number;
}

export interface CompetitorSection {
  you: CompetitorData;
  competitors: CompetitorData[];
  advantages: string[];
  disadvantages: string[];
  missedOpportunities: string[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  impact: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedGain: number; // e.g. 8 points
}

export interface TrendPoint {
  month: string; // e.g., "Jan", "Feb", ...
  score: number;
}

export interface MatrixItem {
  name: string; // Topic or Action name
  urgency: number; // 0-100
  influence: number; // 0-100
  category: "Quick Win" | "Strategic Focus" | "Fill Content Gap" | "Nice to Have";
}

export interface AuditReport {
  isDemo?: boolean;
  id: string;
  domain: string;
  brandName?: string;
  industry?: string;
  country?: string;
  timestamp: string;

  // Executive Scores
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];

  // Analytics components
  platforms: PlatformAnalysis[];
  entity: EntitySection;
  content: ContentSection;
  authority: AuthoritySection;
  retrieval: RetrievalReadinessSection;
  technical: TechnicalAISection;
  competitors: CompetitorSection;
  roadmap: RoadmapItem[];

  // Visualization Data
  historicalTrend: TrendPoint[];
  matrix: MatrixItem[];
}
