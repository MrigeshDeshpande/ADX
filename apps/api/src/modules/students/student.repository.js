import { eq } from "drizzle-orm";
import { students,payments } from "@repo/db";
import { sql } from "drizzle-orm";

export  async function getStudentById(db, studentId) {
  const result = await db
    .select()
    .from(students)
    .where(eq(students.id, studentId))
    .limit(1);

  return result[0] || null;
};

export async function getStudentsWithPayments(db, limit = 100, offset = 0) {
  return db
    .select({
      id: students.id,
      name: students.name,
      email: students.email,
      phone: students.phone,
      courseName: students.courseName,
      finalFee: students.finalFee,
      totalPaid: sql`COALESCE(SUM(${payments.amount}), 0)`,
    })
    .from(students)
    .leftJoin(payments, sql`${payments.studentId} = ${students.id}`)
    .groupBy(students.id)
    .limit(limit)
    .offset(offset);
}

export async function getStudentStats(db) {
  const result = await db
    .select({
      totalCount: sql`COUNT(DISTINCT ${students.id})`,
      totalCollected: sql`COALESCE(SUM(${payments.amount}), 0)`,
    })
    .from(students)
    .leftJoin(payments, sql`${payments.studentId} = ${students.id}`);

  const pendingResult = await db
    .select({
      totalFinalFee: sql`SUM(${students.finalFee})`,
    })
    .from(students);

  const totalCollected = Number(result[0]?.totalCollected || 0);
  const totalCount = Number(result[0]?.totalCount || 0);
  const totalFinalFee = Number(pendingResult[0]?.totalFinalFee || 0);

  return {
    totalStudents: totalCount,
    totalCollected,
    totalPending: Math.max(0, totalFinalFee - totalCollected),
  };
}