import { db } from "@repo/db";
import { createPlanWithInstallments, getPlanWithInstallments } from "@/modules/plans/plan.service";
import { getStudentById } from "@/modules/students/student.repository";
import { createProtectedRoute } from "@/lib/middleware";
import { canAccessStudent } from "@/lib/permissions";

/**
 * SECURED STUDENT PLAN LIST HANDLER
 */
async function getHandler(req, { context, ctx, resource: student }) {
  const { id: studentId } = await context.params;
  const data = await getPlanWithInstallments(db, studentId);

  return Response.json({
    success: true,
    data,
  });
}

/**
 * SECURED STUDENT PLAN CREATE HANDLER
 */
async function postHandler(req, { context, ctx, resource: student }) {
  const { id: studentId } = await context.params;
  const body = await req.json();

  const plan = await createPlanWithInstallments(db, studentId, body);

  ctx.log("PLAN_CREATED", { studentId, planId: plan.id });
  return Response.json({
    success: true,
    data: plan,
  }, { status: 201 });
}

// ── STRUCTURAL ENFORCEMENT ──
export const GET = createProtectedRoute(getHandler, {
  policy: canAccessStudent,
  resourceLoader: (id) => getStudentById(db, id)
});

export const POST = createProtectedRoute(postHandler, {
  policy: canAccessStudent,
  resourceLoader: (id) => getStudentById(db, id)
});