import * as studentRepo from "./student.repository.js";
import * as paymentRepo from "../payments/payment.repository.js";
import { getStudentLedger } from "../payments/ledger.service.js";
import { getPlanWithInstallments } from "../plans/plan.service.js";

export async function getStudentDetail(db, studentId) {
    const start = performance.now();
    
    // Parallelize EVERYTHING
    const [student, payments, ledger, plan] = await Promise.all([
        studentRepo.getStudentById(db, studentId),
        paymentRepo.getPaymentsByStudentId(db, studentId),
        getStudentLedger(db, studentId),
        getPlanWithInstallments(db, studentId)
    ]);

    if (!student) {
        throw new Error("Student not found");
    }

    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balance = student.finalFee - totalPaid;

    const result = {
        student,
        financials: { totalPaid, balance },
        transactions: payments,
        ledger,
        plan
    };

    console.log(`[PERF] Total getStudentDetail (Fully Parallel): ${(performance.now() - start).toFixed(2)}ms`);
    return result;
}

export async function getStudentList(db, limit = 100, offset = 0) {
  const rows = await studentRepo.getStudentsWithPayments(db, limit, offset);

  return rows.map((row) => {
    const totalPaid = Number(row.totalPaid);

    return {
      ...row,
      totalPaid,
      balance: row.finalFee - totalPaid,
    };
  });
}

export async function getDashboardStats(db) {
  return studentRepo.getStudentStats(db);
}