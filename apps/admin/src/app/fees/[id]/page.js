"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockFeeData } from "@/lib/mockData";
import SummaryCard from "@/components/fees/SummaryCard";
import TransactionsTable from "@/components/fees/TransactionsTable";
import AddPaymentModal from "@/components/fees/AddPaymentModal";
import FeeStructure from "@/components/fees/FeeStructure";

function LedgerContent() {
  const searchParams = useSearchParams();

  const getParam = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const studentName = searchParams.get("name") || mockFeeData.student.name;
  const courseName = searchParams.get("course") || mockFeeData.fee.courseName;
  const syncBase = getParam("base", mockFeeData.fee.basePrice);
  const syncScholarship = getParam("scholarship", mockFeeData.fee.discount);
  const syncNet = Math.max(0, syncBase - syncScholarship);

  const [fee] = useState({
    ...mockFeeData.fee,
    basePrice: syncBase,
    discount: syncScholarship,
    finalAmount: syncNet,
  });

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total: syncNet,
    paid: 0,
    pending: syncNet,
    status: syncNet === 0 ? "completed" : "active",
  });

  const handleAddPayment = (rawPaymentData) => {
    const newTransaction = {
      id: "txn-" + Date.now(),
      amount: rawPaymentData.amount,
      paymentMode: rawPaymentData.paymentMode,
      referenceId: rawPaymentData.referenceId,
      paidAt: new Date().toISOString(),
      receiptNumber:
        "SY-2026-" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0"),
    };

    const updatedTransactions = [newTransaction, ...transactions];
    const totalPaid = updatedTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const pending = fee.finalAmount - totalPaid;

    let status = "active";
    if (pending === 0) status = "completed";
    if (pending < 0) status = "overpaid";

    setTransactions(updatedTransactions);
    setSummary({ total: fee.finalAmount, paid: totalPaid, pending, status });
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <header className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-slate-900">
              {studentName}
            </h1>
            <p className="text-sm text-slate-500">{courseName}</p>
          </div>

          <button className="mt-1 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Export
          </button>
        </header>

        {/* Summary */}
        <SummaryCard summary={summary} />

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <FeeStructure fee={fee} />
            <TransactionsTable transactions={transactions} />
          </div>

          <aside className="sticky top-6 space-y-4">
            <AddPaymentModal
              onAdd={handleAddPayment}
              pendingAmount={summary.pending}
              studentFeeId={fee.id}
            />

            {/* Quick info */}
            <div className="card px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Receipt format
                </span>
                <span className="text-xs font-mono text-slate-700">
                  SY-2026-NNNN
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Total transactions
                </span>
                <span className="text-xs font-medium text-slate-700 tabular-nums">
                  {transactions.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Last payment
                </span>
                <span className="text-xs text-slate-700">
                  {transactions.length > 0
                    ? new Date(transactions[0].paidAt).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short" }
                    )
                    : "—"}
                </span>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}

export default function FeesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      }
    >
      <LedgerContent />
    </Suspense>
  );
}