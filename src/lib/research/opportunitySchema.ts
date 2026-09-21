import type {
  ConfidenceLevel,
  OpportunityResearch,
  SourceType,
  StructuredResearch,
} from "@/lib/agent/types";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isConfidenceLevel(
  value: unknown
): value is ConfidenceLevel {
  return (
    value === "low" ||
    value === "medium" ||
    value === "high"
  );
}

function isSourceType(value: unknown): value is SourceType {
  return (
    value === "official" ||
    value === "government" ||
    value === "news" ||
    value === "directory" ||
    value === "social" ||
    value === "search" ||
    value === "other"
  );
}

function isSource(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const source = value as Record<string, unknown>;

  return (
    isString(source.url) &&
    isNullableString(source.title) &&
    isSourceType(source.sourceType)
  );
}

function isObservation(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const observation = value as Record<string, unknown>;

  return (
    isString(observation.id) &&
    isString(observation.claim) &&
    isString(observation.evidence) &&
    isString(observation.sourceUrl) &&
    isNullableString(observation.sourceTitle) &&
    isSourceType(observation.sourceType) &&
    isConfidenceLevel(observation.confidence)
  );
}

function isPotentialGap(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const gap = value as Record<string, unknown>;

  return (
    isString(gap.id) &&
    isString(gap.description) &&
    Array.isArray(gap.supportingObservationIds) &&
    gap.supportingObservationIds.every(isString) &&
    isString(gap.potentialBusinessImpact) &&
    gap.confirmedNeed === false &&
    isConfidenceLevel(gap.confidence)
  );
}

function isServiceMatch(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const match = value as Record<string, unknown>;

  return (
    isString(match.gapId) &&
    isString(match.service) &&
    isString(match.whyItMatches) &&
    Array.isArray(match.requiredCapabilities) &&
    match.requiredCapabilities.every(isString) &&
    isConfidenceLevel(match.matchStrength)
  );
}

function isEntryPlan(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entryPlan = value as Record<string, unknown>;

  return (
    isString(entryPlan.suggestedFirstEngagement) &&
    isString(entryPlan.scope) &&
    isString(entryPlan.whyThisIsAReasonableEntryPoint) &&
    isNullableString(entryPlan.publicContactRoute) &&
    isString(entryPlan.suggestedHumanAction)
  );
}

function isOpportunityResearch(
  value: unknown
): value is OpportunityResearch {
  if (!value || typeof value !== "object") {
    return false;
  }

  const research = value as Record<string, unknown>;

  if (research.researchType !== "opportunity_discovery") {
    return false;
  }

  if (!research.business || typeof research.business !== "object") {
    return false;
  }

  const business =
    research.business as Record<string, unknown>;

  if (
    !isString(business.name) ||
    !isNullableString(business.location) ||
    !isNullableString(business.industry) ||
    !isNullableString(business.website) ||
    !isString(business.whatTheyDo) ||
    !isNullableString(business.targetCustomers) ||
    !isNullableString(business.businessModel)
  ) {
    return false;
  }

  if (
    !Array.isArray(research.observations) ||
    !research.observations.every(isObservation)
  ) {
    return false;
  }

  if (
    !Array.isArray(research.potentialGaps) ||
    !research.potentialGaps.every(isPotentialGap)
  ) {
    return false;
  }

  if (
    !Array.isArray(research.serviceMatches) ||
    !research.serviceMatches.every(isServiceMatch)
  ) {
    return false;
  }

  if (!isEntryPlan(research.entryPlan)) {
    return false;
  }

  if (
    !Array.isArray(research.sources) ||
    !research.sources.every(isSource)
  ) {
    return false;
  }

  if (
    !Array.isArray(research.limitations) ||
    !research.limitations.every(isString)
  ) {
    return false;
  }

  if (!isConfidenceLevel(research.confidence)) {
    return false;
  }

  return true;
}

function isGeneralResearch(
  value: unknown
): value is StructuredResearch {
  if (!value || typeof value !== "object") {
    return false;
  }

  const research = value as Record<string, unknown>;

  if (research.researchType !== "general_research") {
    return false;
  }

  if (!isString(research.summary)) {
    return false;
  }

  if (
    !Array.isArray(research.keyFindings) ||
    !research.keyFindings.every(isString)
  ) {
    return false;
  }

  if (
    !Array.isArray(research.evidence)
  ) {
    return false;
  }

  for (const item of research.evidence) {
    if (!item || typeof item !== "object") {
      return false;
    }

    const evidence = item as Record<string, unknown>;

    if (
      !isString(evidence.claim) ||
      !isString(evidence.evidence) ||
      !isString(evidence.sourceUrl) ||
      !isNullableString(evidence.sourceTitle) ||
      !isConfidenceLevel(evidence.confidence)
    ) {
      return false;
    }
  }

  if (
    !Array.isArray(research.limitations) ||
    !research.limitations.every(isString)
  ) {
    return false;
  }

  if (
    !Array.isArray(research.sources) ||
    !research.sources.every(isSource)
  ) {
    return false;
  }

  if (!isConfidenceLevel(research.confidence)) {
    return false;
  }

  return true;
}

export function validateStructuredResearch(
  value: unknown
): value is StructuredResearch {
  return (
    isOpportunityResearch(value) ||
    isGeneralResearch(value)
  );
}