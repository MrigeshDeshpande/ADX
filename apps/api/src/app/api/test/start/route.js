import { db } from "@repo/db";
import { startTest } from "@/modules/test/test.service";
import { createProtectedRoute } from "@/lib/middleware";
import { publicAllow } from "@/lib/permissions";

/**
 * PUBLIC ASSESSMENT START HANDLER
 */
async function postHandler(req, { ctx }) {
  const body = await req.json();
  const { leadId, topics } = body;

  if (!leadId || !Array.isArray(topics)) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = await startTest({ db, leadId, topics });

  if (result.alreadyCompleted) {
    ctx.log("ASSESSMENT_ALREADY_COMPLETED", { leadId, sessionId: result.sessionId });
    return Response.json({
      success: true,
      alreadyCompleted: true,
      sessionId: result.sessionId,
    });
  }

  ctx.log("ASSESSMENT_STARTED", { leadId, sessionId: result.sessionId });

  return Response.json({
    success: true,
    sessionId: result.sessionId,
    questions: result.questions,
    startedAt: result.startedAt,
  });
}

// ── STRUCTURAL ENFORCEMENT ──
export const POST = createProtectedRoute(postHandler, {
  policy: publicAllow,
  isPublic: true
});