import type {
  ConfidenceLevel,
  Observation,
  SourceType,
} from "@/lib/agent/types";

function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function createObservation(input: {
  claim: string;
  evidence: string;
  sourceUrl: string;
  sourceTitle?: string | null;
  sourceType?: SourceType;
  confidence?: ConfidenceLevel;
}): Observation {
  return {
    id: generateId("obs"),
    claim: input.claim,
    evidence: input.evidence,
    sourceUrl: input.sourceUrl,
    sourceTitle: input.sourceTitle ?? null,
    sourceType: input.sourceType ?? "other",
    confidence: input.confidence ?? "medium",
  };
}