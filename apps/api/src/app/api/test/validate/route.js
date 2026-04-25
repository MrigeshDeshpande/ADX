import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { testLeads } from "@repo/db";
import { eq } from "drizzle-orm";
import { corsHeaders } from "@/utils/cors";

export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const leadId = searchParams.get("leadId");

  console.log("VALIDATE API HIT:", leadId);

  if (!leadId) {
    return NextResponse.json(
      { error: "Missing leadId" },
      { status: 400, headers: corsHeaders(req) }
    );
  }

  try {
    const result = await db
      .select()
      .from(testLeads)
      .where(eq(testLeads.id, leadId))
      .limit(1);

    console.log("DB RESULT:", result);

    if (!result.length) {
      return NextResponse.json(
        { error: "Invalid lead" },
        { status: 404, headers: corsHeaders(req) }
      );
    }

    return NextResponse.json(
      { lead: result[0] },
      { headers: corsHeaders(req) }
    );

  } catch (err) {
    console.error("VALIDATE ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500, headers: corsHeaders(req) }
    );
  }
}