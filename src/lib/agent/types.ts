export type SourceType =
  | "official"
  | "government"
  | "news"
  | "directory"
  | "social"
  | "search"
  | "other";

export type ConfidenceLevel =
  | "low"
  | "medium"
  | "high";

export type ResearchType =
  | "general_research"
  | "opportunity_discovery";

export type Observation = {
  id: string;
  claim: string;
  evidence: string;
  sourceUrl: string;
  sourceTitle: string | null;
  sourceType: SourceType;
  confidence: ConfidenceLevel;
};

export type PotentialGap = {
  id: string;
  description: string;
  supportingObservationIds: string[];
  potentialBusinessImpact: string;
  confirmedNeed: false;
  confidence: ConfidenceLevel;
};

export type ServiceMatch = {
  gapId: string;
  service: string;
  whyItMatches: string;
  requiredCapabilities: string[];
  matchStrength: ConfidenceLevel;
};

export type EntryPlan = {
  suggestedFirstEngagement: string;
  scope: string;
  whyThisIsAReasonableEntryPoint: string;
  publicContactRoute: string | null;
  suggestedHumanAction: string;
};

export type Source = {
  url: string;
  title: string | null;
  sourceType: SourceType;
};

export type BusinessUnderstanding = {
  name: string;
  location: string | null;
  industry: string | null;
  website: string | null;
  whatTheyDo: string;
  targetCustomers: string | null;
  businessModel: string | null;
};

export type OpportunityResearch = {
  researchType: "opportunity_discovery";

  business: BusinessUnderstanding;

  observations: Observation[];

  potentialGaps: PotentialGap[];

  serviceMatches: ServiceMatch[];

  entryPlan: EntryPlan;

  sources: Source[];

  limitations: string[];

  confidence: ConfidenceLevel;
};

export type GeneralResearchEvidence = {
  claim: string;
  evidence: string;
  sourceUrl: string;
  sourceTitle: string | null;
  confidence: ConfidenceLevel;
};

export type GeneralResearch = {
  researchType: "general_research";

  summary: string;

  keyFindings: string[];

  evidence: GeneralResearchEvidence[];

  limitations: string[];

  sources: Source[];

  confidence: ConfidenceLevel;
};

export type ResearchResult =
  | OpportunityResearch
  | GeneralResearch;