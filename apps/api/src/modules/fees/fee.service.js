import { createFeeLedger, getFeeLedgerByStudentId, getFeeTransactions, createTransaction, getTotalTransactionsCount, getAllFeeLedgers, getAllFeeTransactions } from "./fee.repository.js";

export async function onboardStudent(data) {
    const finalAmount = data.basePrice - data.scholarship;
    
    // Ledger Code format: LGR-<STUDENTID-PREFIX>-<RANDOM>
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = data.studentId.substring(0, 4).toUpperCase();
    const ledgerCode = `LGR-${prefix}-${randomSuffix}`;

    const feeData = {
        studentId: data.studentId,
        courseId: data.courseId,
        basePrice: data.basePrice,
        scholarship: data.scholarship,
        finalAmount: finalAmount,
        notes: data.notes || null,
        ledgerCode
    };

    const fee = await createFeeLedger(feeData);

    return {
        feeId: fee.id,
        finalAmount: fee.finalAmount,
        ledgerCode: fee.ledgerCode
    };
}

export async function getStudentLedger(studentId) {
    const fee = await getFeeLedgerByStudentId(studentId);
    if (!fee) {
        return null;
    }

    const transactions = await getFeeTransactions(fee.id);

    const totalPaid = transactions.reduce((sum, t) => sum + t.amount, 0);
    const pending = fee.finalAmount - totalPaid;
    
    let status = "active";
    if (pending === 0) status = "completed";
    else if (pending < 0) status = "overpaid";

    return {
        student: {
            id: fee.studentId,
            name: fee.studentId
        },
        fee: {
            id: fee.id,
            basePrice: fee.basePrice,
            discount: fee.scholarship,
            finalAmount: fee.finalAmount
        },
        summary: {
            total: fee.finalAmount,
            paid: totalPaid,
            pending: pending,
            status: status
        },
        transactions: transactions.map(t => ({
            id: t.id,
            amount: t.amount,
            paymentMode: t.paymentMode,
            referenceId: t.referenceId,
            paidAt: t.paidAt,
            receiptNumber: t.receiptNumber
        }))
    };
}

export async function makePayment(studentId, data) {
    const fee = await getFeeLedgerByStudentId(studentId);
    if (!fee) {
        throw new Error("Student fee ledger not found");
    }

    const totalTransactions = await getTotalTransactionsCount();
    const sequenceNumber = String(totalTransactions + 1).padStart(4, '0');
    const currentYear = new Date().getFullYear();
    const receiptNumber = `SY-${currentYear}-${sequenceNumber}`;

    const transactionData = {
        feeId: fee.id,
        amount: data.amount,
        paymentMode: data.paymentMode,
        referenceId: data.referenceId || null,
        receiptNumber: receiptNumber
    };

    const transaction = await createTransaction(transactionData);

    const transactions = await getFeeTransactions(fee.id);
    const totalPaid = transactions.reduce((sum, t) => sum + t.amount, 0);
    const updatedPendingBalance = fee.finalAmount - totalPaid;

    return {
        transactionId: transaction.id,
        receiptNumber: transaction.receiptNumber,
        updatedPendingBalance: updatedPendingBalance
    };
}

export async function getDashboardFees() {
    const ledgers = await getAllFeeLedgers();
    const allTransactions = await getAllFeeTransactions();

    return ledgers.map((fee) => {
        const txns = allTransactions.filter(t => t.feeId === fee.id);
        const totalPaid = txns.reduce((sum, t) => sum + t.amount, 0);
        const pending = fee.finalAmount - totalPaid;
        
        let status = "Pending";
        if (pending === 0 && fee.finalAmount > 0) status = "Full Paid";
        else if (pending < fee.finalAmount && totalPaid > 0) status = "Partially Paid";
        else if (pending < 0) status = "Overpaid";

        return {
            id: fee.studentId,
            name: fee.studentId, 
            course: fee.courseId,
            total: fee.finalAmount,
            paid: totalPaid,
            balance: pending,
            status: status
        };
    });
}
