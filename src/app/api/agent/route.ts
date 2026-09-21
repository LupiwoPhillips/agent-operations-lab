import { NextResponse } from "next/server";

import { runAgent } from "@/lib/agent/runAgent";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const objective = body.objective;

    if (!objective || typeof objective !== "string") {
      return NextResponse.json(
        {
          error: "A research objective is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!objective.trim()) {
      return NextResponse.json(
        {
          error: "A research objective is required.",
        },
        {
          status: 400,
        }
      );
    }

    const research = await runAgent(objective.trim());

    return NextResponse.json({
      success: true,
      research,
    });
  } catch (error) {
    console.error("Agent error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The agent could not process the request.",
      },
      {
        status: 500,
      }
    );
  }
}