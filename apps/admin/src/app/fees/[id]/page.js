"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockFeeData } from "@/lib/mockData";
import SummaryCard from "@/components/fees/SummaryCard";
import TransactionsTable from "@/components/fees/TransactionsTable";
import AddPaymentModal from "@/components/fees/AddPaymentModal";
import FeeStructure from "@/components/fees/FeeStructure";

function LedgerContent() {
  const searchParams = useSearchParams();
  
  // Extract data from URL (Step 2 of Synchronicity Fix)
  const syncName = searchParams.get("name");
  const syncCourse = searchParams.get("course");
  
  // Rule: If param exists, use it (even if 0). If not, fallback to mock.
  const getParam = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const syncBase = getParam("base", mockFeeData.fee.basePrice);
  const syncScholarship = getParam("scholarship", mockFeeData.fee.discount);
  const syncNet = Math.max(0, syncBase - syncScholarship);

  // Section 9: Frontend State Initialized with Synced Data
  const [fee, setFee] = useState({
    ...mockFeeData.fee,
    basePrice: syncBase,
    discount: syncScholarship,
    finalAmount: syncNet,
  });

  const [transactions, setTransactions] = useState([]); // Empty reality for new ledger
  
  // Rule 1: pending = total - paid
  const initialPaid = 0; // Reset reality for new onboarding
  const initialPending = syncNet;

  const [summary, setSummary] = useState({
    total: syncNet,
    paid: initialPaid,
    pending: initialPending,
    status: initialPending === 0 ? "completed" : "active"
  });

  const studentName = syncName || mockFeeData.student.name;

  // Section 9: Update Logic (onPaymentSuccess)
  const handleAddPayment = (rawPaymentData) => {
    // Simulate Backend Response (since we don't have the real backend yet)
    const newTransaction = {
      id: "txn-" + Date.now(),
      amount: rawPaymentData.amount,
      paymentMode: rawPaymentData.paymentMode,
      referenceId: rawPaymentData.referenceId,
      paidAt: new Date().toISOString(),
      receiptNumber: "SKY-2026-" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
    };

    const updatedTransactions = [newTransaction, ...transactions];
    
    // Rule 1: pending = finalAmount - totalPaid
    const totalPaid = updatedTransactions.reduce((sum, t) => sum + t.amount, 0);
    const pending = fee.finalAmount - totalPaid;

    // Rule 2: Status Logic
    let status = "active";
    if (pending === 0) status = "completed";
    if (pending < 0) status = "overpaid";

    const updatedSummary = {
      total: fee.finalAmount,
      paid: totalPaid,
      pending: pending,
      status: status
    };

    // Update State
    setTransactions(updatedTransactions);
    setSummary(updatedSummary);
    
    // Rule 3: Overpayment Flag (Visualized in Modal/Notification)
    if (pending < 0) {
      console.log("Rule 3: Overpayment detected and flagged.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] selection:bg-brand-primary/10 selection:text-brand-primary pb-32">
      <div className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        {/* CTO Strategic Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                  <span>Finance</span>
                  <span className="opacity-30">/</span>
                  <span>Ledgers</span>
                  <span className="opacity-30">/</span>
                  <span className="text-brand-primary">View</span>
                </nav>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter mt-1">
                  Financial Ledger <span className="text-slate-200 mx-2">|</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-400">{studentName}</span>
                </h1>
              </div>
            </div>
            <p className="max-w-2xl text-slate-500 font-medium leading-relaxed">
              Section 1 Alignment: Tracking commitment vs reality for {studentName}'s financial journey.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="flex-1 lg:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-widest rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Export Ledger
             </button>
             <button className="flex-1 lg:flex-none px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)] hover:bg-slate-800 hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                Sync Reality
             </button>
          </div>
        </header>

        {/* Section 8: Summary Card (Top) */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
           <SummaryCard summary={summary} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           <div className="lg:col-span-8 space-y-12">
              {/* Section 1: Fee Structure (Commitment) */}
              <FeeStructure fee={fee} />
              
              {/* Section 8: Transactions Table */}
              <TransactionsTable transactions={transactions} />
           </div>
           
           <aside className="lg:col-span-4 space-y-8 sticky top-12">
              {/* Section 8: Add Payment Modal (Inlined) */}
              <AddPaymentModal 
                onAdd={handleAddPayment} 
                pendingAmount={summary.pending} 
                studentFeeId={fee.id}
              />
              
              <div className="glass p-8 rounded-3xl border border-slate-200 bg-white/40 shadow-xl overflow-hidden group">
                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors"></div>
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <svg className="text-brand-primary" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    V1 Compliance
                 </h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-bold">
                    Section 3 Adherence: Money records are immutable. Every payment generates a unique receipt `SKY-YYYY-NNNN`.
                 </p>
                 <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">V1 SPEC VERSION</span>
                    <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[8px] font-black tracking-widest">ENCRYPTED</span>
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
    <Suspense fallback={<div>Loading Ledger...</div>}>
      <LedgerContent />
    </Suspense>
  );
}