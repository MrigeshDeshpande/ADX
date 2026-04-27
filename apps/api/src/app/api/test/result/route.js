import { db } from "@repo/db";
import { getSessionById } from "@/modules/test/test.repository";
import { createProtectedRoute } from "@/lib/middleware";
import { publicAllow } from "@/lib/permissions";

/**
 * PUBLIC ASSESSMENT RESULT HANDLER
 */
async function getHandler(req, { ctx }) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return Response.json({ error: "Missing sessionId" }, { status: 400 });
  }

  const session = await getSessionById(db, sessionId);

  if (!session || session.status !== "completed") {
    ctx.warn("RESULT_FETCH_INVALID_SESSION", { sessionId, status: session?.status });
    return Response.json({ error: "Test not finalized or missing" }, { status: 404 });
  }

  ctx.log("RESULT_FETCHED", { sessionId, score: session.score });

  return Response.json({
    success: true,
    score: session.score,
    total: session.questionsSnapshot?.length || 0,
    evaluationSnapshot: session.evaluationSnapshot || [],
  });
}

// ── STRUCTURAL ENFORCEMENT ──
export const GET = createProtectedRoute(getHandler, {
  policy: publicAllow,
  isPublic: true
});
