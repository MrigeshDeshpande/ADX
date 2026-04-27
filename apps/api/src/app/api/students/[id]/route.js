import { db } from "@repo/db";
import { getStudentDetail } from "@/modules/students/student.service";
import { getStudentById } from "@/modules/students/student.repository";
import { createProtectedRoute } from "@/lib/middleware";
import { canAccessStudent } from "@/lib/permissions";

/**
 * SECURED STUDENT DETAIL HANDLER
 * 
 * Structural enforcement ensures:
 * - Session is valid
 * - Student record is pre-loaded (req.resource)
 * - Access is verified via canAccessStudent policy
 * - Rate limiting and Request correlation active
 */
async function getHandler(req, { context, ctx, resource: student }) {
  const { id: studentId } = await context.params;
  const data = await getStudentDetail(db, studentId);
  return Response.json(data);
}

// ── STRUCTURAL ENFORCEMENT ──
export const GET = createProtectedRoute(getHandler, {
  policy: canAccessStudent,
  resourceLoader: (id) => getStudentById(db, id)
});