import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { submitTest } from "@/modules/test/test.service";
import { corsHeaders } from "@/utils/cors";

export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { sessionId, answers } = body;

    if (!sessionId || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid payload format." },
        { status: 400, headers: corsHeaders(req) }
      );
    }

    const result = await submitTest({ db, sessionId, answers });

    return NextResponse.json(
      {
        success: true,
        score: result.score,
        total: result.total,
        wrongAnswers: result.wrongAnswers,
      },
      { headers: corsHeaders(req) }
    );

  } catch (err) {
    console.error("SUBMIT TEST ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Server error during submission." },
      { status: 500, headers: corsHeaders(req) }
    );
  }
}