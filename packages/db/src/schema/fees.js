import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const fees = pgTable("fees", {
    id: uuid("id").defaultRandom().primaryKey(),
    studentId: text("student_id").notNull(),
    courseId: text("course_id").notNull(),
    basePrice: integer("base_price").notNull(),
    scholarship: integer("scholarship").default(0),
    finalAmount: integer("final_amount").notNull(),
    ledgerCode: text("ledger_code").notNull().unique(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const feeTransactions = pgTable("fee_transactions", {
    id: uuid("id").defaultRandom().primaryKey(),
    feeId: uuid("fee_id").references(() => fees.id).notNull(),
    amount: integer("amount").notNull(),
    paymentMode: text("payment_mode").notNull(), // 'upi', 'cash', 'card'
    referenceId: text("reference_id"),
    receiptNumber: text("receipt_number").notNull().unique(), // Format: SY-YYYY-NNNN
    paidAt: timestamp("paid_at", { withTimezone: true }).defaultNow()
});
