"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { getLedger, addPayment } from "@/lib/fees.api";
import { toast } from "sonner";
import SummaryCard from "@/components/fees/SummaryCard";
import TransactionsTable from "@/components/fees/TransactionsTable";
import AddPaymentModal from "@/components/fees/AddPaymentModal";
import FeeStructure from "@/components/fees/FeeStructure";

function LedgerContent() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [fee, setFee] = useState(null);
  const [student, setStudent] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getLedger(id);
        if (res && res.data) {
          setFee(res.data.fee);
          setTransactions(res.data.transactions);
          setSummary(res.data.summary);
          setStudent(res.data.student);
        }
      } catch (e) {
        toast.error("Failed to load ledger");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  const handleAddPayment = async (rawPaymentData) => {
    toast.promise(
      addPayment(id, {
        amount: rawPaymentData.amount,
        paymentMode: rawPaymentData.paymentMode,
        referenceId: rawPaymentData.referenceId,
      }),
      {
        loading: "Adding payment...",
        success: (res) => {
          setTransactions((prev) => [
            {
              id: res.data.transactionId,
              amount: rawPaymentData.amount,
              paymentMode: rawPaymentData.paymentMode,
              referenceId: rawPaymentData.referenceId,
              paidAt: new Date().toISOString(),
              receiptNumber: res.data.receiptNumber,
            },
            ...prev,
          ]);

          setSummary((prev) => ({
            ...prev,
            paid: prev.paid + rawPaymentData.amount,
            pending: res.data.updatedPendingBalance,
            status:
              res.data.updatedPendingBalance <= 0
                ? res.data.updatedPendingBalance < 0
                  ? "overpaid"
                  : "completed"
                : "active",
          }));

          return `Payment successfully recorded.`;
        },
        error: (err) => err.message || "Failed to add payment",
      }
    );
  };

  if (loading) return <div className="p-10 text-slate-500">Loading ledger...</div>;
  if (!fee) return <div className="p-10 text-slate-500">Ledger not found or invalid ID.</div>;

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <header className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-slate-900">
              {student?.name || id}
            </h1>
            <p className="text-sm text-slate-500">Skillyards Program</p>
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
                  SY-YYYY-NNNN
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