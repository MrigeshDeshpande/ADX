import { db } from "@repo/db";
import { getStudentDetail } from "@/modules/students/student.service";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const studentId = params.id;

    const data = await getStudentDetail(db, studentId);

    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 400 }
    );
  }
}