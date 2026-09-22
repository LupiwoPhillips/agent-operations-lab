"use client";

import { useState } from "react";
import type {
  ConfidenceLevel,
  ResearchResult,
} from "@/lib/agent/types";

export default function Home() {
  const [objective, setObjective] = useState("");
  const [research, setResearch] = useState<ResearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runAgent() {
    if (!objective.trim()) {
      setError("Enter a research objective before running the agent.");
      return;
    }

    setLoading(true);
    setError("");
    setResearch(null);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objective: objective.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "The agent could not process the request."
        );
      }

      if (!data.research) {
        throw new Error(
          "The agent completed but returned no structured research."
        );
      }

      setResearch(data.research);
    } catch (error) {
      console.error("Frontend error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while running the agent."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080b12] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* HEADER */}
        <header className="mb-8 sm:mb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                  Agent Operations Lab
                </p>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
                Opportunity Discovery Agent
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Investigate a business objective using web evidence, AI
                analysis, and human review.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  loading
                    ? "animate-pulse bg-amber-400"
                    : "bg-emerald-400"
                }`}
              />

              <span className="text-xs font-medium text-slate-400">
                {loading ? "Agent running" : "System ready"}
              </span>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* OBJECTIVE PANEL */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 shadow-2xl shadow-black/20">
            <div className="border-b border-slate-800/80 px-5 py-5 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Research task
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-slate-100">
                    Define the objective
                  </h2>
                </div>

                <span className="hidden rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-[11px] font-medium text-slate-500 sm:block">
                  HUMAN CONTROLLED
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <label
                htmlFor="objective"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                What are you researching?
              </label>

              <textarea
                id="objective"
                value={objective}
                onChange={(event) => setObjective(event.target.value)}
                className="min-h-44 w-full resize-y rounded-xl border border-slate-800 bg-[#080b12] p-4 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-slate-600 focus:ring-2 focus:ring-slate-700/40"
                placeholder="Example: Identify South African businesses with observable public signals that their websites could be improved."
              />

              {error && (
                <div className="mt-4 rounded-xl border border-red-900/70 bg-red-950/30 p-4">
                  <p className="text-sm font-medium text-red-300">
                    Agent error
                  </p>

                  <p className="mt-1 text-sm leading-6 text-red-400/80">
                    {error}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    External research is performed only through the tools
                    available to the agent.
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Results are for human review and verification.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={runAgent}
                  disabled={loading}
                  className="w-full rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {loading ? "Researching..." : "Run Agent"}
                </button>
              </div>
            </div>
          </div>

          {/* AGENT PANEL */}
          <aside className="rounded-2xl border border-slate-800/80 bg-slate-900/50">
            <div className="border-b border-slate-800/80 px-5 py-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Agent runtime
              </p>

              <h2 className="mt-2 text-lg font-semibold text-slate-100">
                Operations
              </h2>
            </div>

            <div className="p-5">
              <div className="rounded-xl border border-slate-800 bg-[#080b12] p-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      loading
                        ? "animate-pulse bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {loading
                        ? "Research in progress"
                        : "Ready for task"}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-600">
                      {loading
                        ? "The agent is using its available tools."
                        : "No active operation."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
                  Execution flow
                </p>

                <ol className="mt-4 space-y-4">
                  {[
                    ["01", "Objective", "Human defines the task."],
                    ["02", "Reason", "Agent interprets the objective."],
                    ["03", "Research", "Agent can request web evidence."],
                    ["04", "Analyze", "Evidence is evaluated."],
                    ["05", "Report", "Findings are returned for review."],
                  ].map(([number, title, description]) => (
                    <li key={number} className="flex gap-3">
                      <span className="font-mono text-[10px] text-slate-600">
                        {number}
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-300">
                          {title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
        </section>

        {/* RESULTS */}
        {research && (
          <section className="mt-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-500/70">
                  Research complete
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">
                  Research Findings
                </h2>
              </div>

              <div className="text-xs text-slate-600">
                Human review required
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60">
              <div className="border-b border-slate-800/80 bg-slate-950/50 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    AI synthesis
                  </span>

                  <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    Web evidence
                  </span>

                  <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    Review required
                  </span>

                  <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    {research.researchType === "general_research"
                      ? "General research"
                      : "Opportunity discovery"}
                  </span>
                </div>
              </div>

              <article className="px-5 py-6 sm:px-8 sm:py-8">
                <ResearchOutput research={research} />
              </article>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="mt-8 border-t border-slate-900 pt-5">
          <div className="flex flex-col gap-2 text-xs text-slate-700 sm:flex-row sm:items-center sm:justify-between">
            <span>Agent Operations Lab</span>

            <span>
              Research → Evidence → Analysis → Human Review
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* RESEARCH OUTPUT                                                            */
/* -------------------------------------------------------------------------- */

function ResearchOutput({
  research,
}: {
  research: ResearchResult;
}) {
  if (research.researchType === "general_research") {
    return <GeneralResearchOutput research={research} />;
  }

  return <OpportunityResearchOutput research={research} />;
}

/* -------------------------------------------------------------------------- */
/* GENERAL RESEARCH                                                           */
/* -------------------------------------------------------------------------- */

function GeneralResearchOutput({
  research,
}: {
  research: Extract<
    ResearchResult,
    { researchType: "general_research" }
  >;
}) {
  return (
    <div className="space-y-10">
      {/* SUMMARY */}
      <section>
        <SectionHeading title="Research Summary" />

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-sm leading-7 text-slate-400">
            {research.summary}
          </p>
        </div>
      </section>

      {/* KEY FINDINGS */}
      <section>
        <SectionHeading title="Key Findings" />

        {research.keyFindings.length === 0 ? (
          <EmptyState message="No structured key findings were returned." />
        ) : (
          <div className="space-y-3">
            {research.keyFindings.map((finding, index) => (
              <div
                key={`${finding}-${index}`}
                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <span className="font-mono text-xs text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-7 text-slate-400">
                  {finding}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* EVIDENCE */}
      <section>
        <SectionHeading title="Evidence" />

        {research.evidence.length === 0 ? (
          <EmptyState message="No structured evidence was returned." />
        ) : (
          <div className="space-y-4">
            {research.evidence.map((item, index) => (
              <div
                key={`${item.sourceUrl}-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold leading-6 text-slate-200">
                    {item.claim}
                  </h4>

                  <ConfidenceBadge confidence={item.confidence} />
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.evidence}
                </p>

                <div className="mt-4">
                  {item.sourceTitle && (
                    <p className="text-xs text-slate-600">
                      {item.sourceTitle}
                    </p>
                  )}

                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block break-all text-xs text-slate-500 underline decoration-slate-700 underline-offset-4 transition hover:text-slate-300"
                  >
                    {item.sourceUrl}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SOURCES */}
      <section>
        <SectionHeading title="Sources" />

        {research.sources.length === 0 ? (
          <EmptyState message="No structured sources were returned." />
        ) : (
          <div className="space-y-2">
            {research.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-4 transition hover:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-300">
                    {source.title ?? source.url}
                  </p>

                  <p className="mt-1 break-all text-xs text-slate-600">
                    {source.url}
                  </p>
                </div>

                <span className="shrink-0 rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-600">
                  {source.sourceType}
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* LIMITATIONS */}
      <section>
        <SectionHeading title="Limitations" />

        {research.limitations.length === 0 ? (
          <EmptyState message="No limitations were reported." />
        ) : (
          <ul className="space-y-2">
            {research.limitations.map((limitation, index) => (
              <li
                key={`${limitation}-${index}`}
                className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-4"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />

                <p className="text-sm leading-7 text-slate-400">
                  {limitation}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* CONFIDENCE */}
      <section>
        <SectionHeading title="Research Confidence" />

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <ConfidenceBadge confidence={research.confidence} />

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Confidence describes the strength of the available evidence.
            It does not mean that every statement has been independently
            verified beyond the cited sources.
          </p>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OPPORTUNITY RESEARCH                                                       */
/* -------------------------------------------------------------------------- */

function OpportunityResearchOutput({
  research,
}: {
  research: Extract<
    ResearchResult,
    { researchType: "opportunity_discovery" }
  >;
}) {
  return (
    <div className="space-y-10">
      {/* BUSINESS */}
      <section>
        <SectionHeading title="Business Understanding" />

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard label="Business" value={research.business.name} />

          <InfoCard
            label="Location"
            value={research.business.location ?? "Unknown"}
          />

          <InfoCard
            label="Industry"
            value={research.business.industry ?? "Unknown"}
          />

          <InfoCard
            label="Website"
            value={research.business.website ?? "Not identified"}
          />

          <div className="md:col-span-2">
            <InfoCard
              label="What they do"
              value={research.business.whatTheyDo}
            />
          </div>

          <InfoCard
            label="Target customers"
            value={research.business.targetCustomers ?? "Unknown"}
          />

          <InfoCard
            label="Business model"
            value={research.business.businessModel ?? "Unknown"}
          />
        </div>
      </section>

      {/* OBSERVATIONS */}
      <section>
        <SectionHeading title="Observed Evidence" />

        {research.observations.length === 0 ? (
          <EmptyState message="No structured observations were returned." />
        ) : (
          <div className="space-y-4">
            {research.observations.map((observation) => (
              <div
                key={observation.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold leading-6 text-slate-200">
                    {observation.claim}
                  </h4>

                  <ConfidenceBadge
                    confidence={observation.confidence}
                  />
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {observation.evidence}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-600">
                    {observation.sourceType}
                  </span>

                  {observation.sourceTitle && (
                    <span className="text-xs text-slate-600">
                      {observation.sourceTitle}
                    </span>
                  )}
                </div>

                <a
                  href={observation.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block break-all text-xs text-slate-500 underline decoration-slate-700 underline-offset-4 transition hover:text-slate-300"
                >
                  {observation.sourceUrl}
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GAPS */}
      <section>
        <SectionHeading title="Potential Gaps" />

        {research.potentialGaps.length === 0 ? (
          <EmptyState message="No potential gaps were identified." />
        ) : (
          <div className="space-y-4">
            {research.potentialGaps.map((gap) => (
              <div
                key={gap.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold leading-6 text-slate-200">
                    {gap.description}
                  </h4>

                  <ConfidenceBadge confidence={gap.confidence} />
                </div>

                <div className="mt-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                    Potential business impact
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {gap.potentialBusinessImpact}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="rounded-md border border-amber-900/50 bg-amber-950/20 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-500/70">
                    Need not confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SERVICE MATCHES */}
      <section>
        <SectionHeading title="Potential Service Match" />

        {research.serviceMatches.length === 0 ? (
          <EmptyState message="No service match was identified." />
        ) : (
          <div className="space-y-4">
            {research.serviceMatches.map((match) => (
              <div
                key={`${match.gapId}-${match.service}`}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold text-slate-200">
                    {match.service}
                  </h4>

                  <ConfidenceBadge
                    confidence={match.matchStrength}
                  />
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {match.whyItMatches}
                </p>

                {match.requiredCapabilities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                      Required capabilities
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {match.requiredCapabilities.map(
                        (capability) => (
                          <span
                            key={capability}
                            className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-500"
                          >
                            {capability}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ENTRY PLAN */}
      <section>
        <SectionHeading title="Potential Way In" />

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <DetailBlock
            label="Suggested first engagement"
            value={research.entryPlan.suggestedFirstEngagement}
          />

          <DetailBlock
            label="Suggested scope"
            value={research.entryPlan.scope}
          />

          <DetailBlock
            label="Why this is a reasonable entry point"
            value={
              research.entryPlan.whyThisIsAReasonableEntryPoint
            }
          />

          <DetailBlock
            label="Suggested human action"
            value={research.entryPlan.suggestedHumanAction}
          />

          {research.entryPlan.publicContactRoute && (
            <div className="mt-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                Public contact route
              </p>

              <a
                href={research.entryPlan.publicContactRoute}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block break-all text-sm text-slate-400 underline decoration-slate-700 underline-offset-4 transition hover:text-slate-200"
              >
                {research.entryPlan.publicContactRoute}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* SOURCES */}
      <section>
        <SectionHeading title="Sources" />

        {research.sources.length === 0 ? (
          <EmptyState message="No structured sources were returned." />
        ) : (
          <div className="space-y-2">
            {research.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-4 transition hover:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-300">
                    {source.title ?? source.url}
                  </p>

                  <p className="mt-1 break-all text-xs text-slate-600">
                    {source.url}
                  </p>
                </div>

                <span className="shrink-0 rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-600">
                  {source.sourceType}
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* LIMITATIONS */}
      <section>
        <SectionHeading title="Limitations" />

        {research.limitations.length === 0 ? (
          <EmptyState message="No limitations were reported." />
        ) : (
          <ul className="space-y-2">
            {research.limitations.map((limitation, index) => (
              <li
                key={`${limitation}-${index}`}
                className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-4"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />

                <p className="text-sm leading-7 text-slate-400">
                  {limitation}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* OVERALL CONFIDENCE */}
      <section>
        <SectionHeading title="Research Confidence" />

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <ConfidenceBadge confidence={research.confidence} />

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Confidence describes the strength of the available evidence.
            It does not mean that a business need has been confirmed.
            Human verification is still required before taking action.
          </p>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SHARED UI COMPONENTS                                                       */
/* -------------------------------------------------------------------------- */

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h3 className="border-b border-slate-800 pb-3 text-lg font-semibold text-slate-100">
        {title}
      </h3>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-300">
        {value}
      </p>
    </div>
  );
}

function DetailBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-800 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-sm leading-7 text-slate-400">
        {value}
      </p>
    </div>
  );
}

function ConfidenceBadge({
  confidence,
}: {
  confidence: ConfidenceLevel;
}) {
  return (
    <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
      {confidence} confidence
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/30 p-5">
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  );
}