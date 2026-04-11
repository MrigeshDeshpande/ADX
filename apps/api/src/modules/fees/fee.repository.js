import { db, fees, feeTransactions } from "../../../../../packages/db";
import { eq, sql } from "drizzle-orm";

export async function createFeeLedger(data) {
    const result = await db.insert(fees).values(data).returning();
    return result[0];
}

export async function getFeeLedgerByStudentId(studentId) {
    const result = await db.select().from(fees).where(eq(fees.studentId, studentId)).limit(1);
    return result[0] || null;
}

export async function getFeeTransactions(feeId) {
    return await db.select().from(feeTransactions).where(eq(feeTransactions.feeId, feeId));
}

export async function createTransaction(data) {
    const result = await db.insert(feeTransactions).values(data).returning();
    return result[0];
}

export async function getTotalTransactionsCount() {
    const result = await db.select({ count: sql`count(*)` }).from(feeTransactions);
    return parseInt(result[0].count, 10);
}

export async function getAllFeeLedgers() {
    return await db.select().from(fees);
}

export async function getAllFeeTransactions() {
    return await db.select().from(feeTransactions);
}
