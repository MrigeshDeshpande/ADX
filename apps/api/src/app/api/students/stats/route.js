import { db } from "@repo/db";
import { getDashboardStats } from "@/modules/students/student.service";

export async function GET() {
  try {
    const data = await getDashboardStats(db);
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
