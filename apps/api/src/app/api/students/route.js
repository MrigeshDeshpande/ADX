import { db } from "@repo/db";
import { students } from "@repo/db"; 
import { validateCreateStudent } from "@/modules/students/student.schema";
import { getStudentList } from "@/modules/students/student.service";

export async function POST(req) {
    try {
        const body = await req.json();

        const result = validateCreateStudent(body);
        console.log(result);

        if (!result.success) {
            return Response.json(
                { error: result.error.flatten() },
                { status: 400 }
            );
        }

        const created = await db
            .insert(students)
            .values(result.data)
            .returning();

        return Response.json(created[0], { status: 201 });
    } catch (err) {
        return Response.json(
            { error: err.message },
            { status: 400 }
        );
    }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const data = await getStudentList(db, limit, offset);
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 400 }
    );
  }
}