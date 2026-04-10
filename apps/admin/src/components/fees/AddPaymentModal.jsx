"use client";
import { useState } from "react";

export default function AddPaymentModal({ onAdd, pendingAmount, studentFeeId }) {
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("upi");
  const [reference, setReference] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isOverpaid = Number(amount) > pendingAmount;

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) return;

    onAdd({
      studentFeeId,
      amount: Number(amount),
      paymentMode,
      referenceId: reference, // Spec uses referenceId in the backend contract but "reference" in the UI section
    });

    setAmount("");
    setReference("");
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className={`glass p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${isSuccess ? 'border-emerald-200 bg-emerald-50/20' : 'border-white/40 bg-white/40'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl shadow-lg transition-colors duration-500 ${isSuccess ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
            {isSuccess ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
            )}
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Add Payment</h2>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{isSuccess ? 'Reality Recorded' : 'Track Commitment Reality'}</p>
          </div>
        </div>
        
        {isOverpaid && (
          <div className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse">
            Overpayment Alert
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Amount</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
              <input
                type="number"
                placeholder="0.00"
                name="amount"
                className={`w-full pl-8 pr-4 py-3.5 bg-white/60 border rounded-2xl focus:ring-4 outline-none transition-all font-black text-xl tracking-tighter ${
                  isOverpaid 
                    ? 'border-amber-300 focus:ring-amber-100 text-amber-900' 
                    : 'border-white/60 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900'
                }`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center px-1">
               <span className="text-[9px] text-slate-400 font-bold uppercase">Balance: {formatCurrency(pendingAmount)}</span>
               {isOverpaid && <span className="text-[9px] text-amber-600 font-bold uppercase">Meta: Overpayment</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Mode</label>
                <select
                  name="paymentMode"
                  className="w-full px-4 py-3.5 bg-white/60 border border-white/60 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-black text-slate-700 text-xs tracking-widest appearance-none cursor-pointer"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="upi">UPI</option>
                  <option value="cash">CASH</option>
                  <option value="card">CARD</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reference</label>
                <input
                  type="text"
                  name="reference"
                  placeholder="ID / Notes"
                  className="w-full px-4 py-3.5 bg-white/60 border border-white/60 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-slate-900 text-xs"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
             </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!amount || Number(amount) <= 0}
          className={`w-full py-4 px-6 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 group font-black uppercase tracking-widest text-xs ${
            isSuccess 
              ? 'bg-emerald-500 text-white' 
              : 'bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-30 disabled:grayscale'
          }`}
        >
          {isSuccess ? (
            <>
              <span>Recorded Successfully</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </>
          ) : (
            <>
              <span>Verify & Add Payment</span>
              <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function formatCurrency(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}