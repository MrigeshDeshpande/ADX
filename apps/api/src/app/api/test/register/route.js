import { db } from "@repo/db";
import { registerTestSchema } from "@/modules/test/test.schema";
import { registerTestLead } from "@/modules/test/test.service";
import { createProtectedRoute } from "@/lib/middleware";
import { publicAllow } from "@/lib/permissions";

/**
 * PUBLIC ASSESSMENT REGISTRATION HANDLER (Lead Generation)
 */
async function postHandler(req, { ctx }) {
  const body = await req.json();
  const parsed = registerTestSchema.safeParse(body);

  if (!parsed.success) {
    ctx.warn("ASSESSMENT_REG_VALIDATION_FAILURE", { errors: parsed.error.flatten() });
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await registerTestLead({ db, data: parsed.data });
  ctx.log("ASSESSMENT_LEAD_REGISTERED", { leadId: result.lead.id, alreadyExists: result.alreadyExists });

  return Response.json({
    success: true,
    leadId: result.lead.id,
    alreadyExists: result.alreadyExists,
  });
}

// ── STRUCTURAL ENFORCEMENT ──
export const POST = createProtectedRoute(postHandler, {
  policy: publicAllow,
  isPublic: true
});