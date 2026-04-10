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
      referenceId: reference,
    });

    setAmount("");
    setReference("");
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
      <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        Add payment
      </h2>

      <div className="space-y-4">
        {/* Amount */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              ₹
            </span>
            <input
              type="number"
              placeholder="0"
              className={`input pl-7 text-base font-medium ${
                isOverpaid ? "border-amber-400 focus:border-amber-400" : ""
              }`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-400">
              Balance: ₹{pendingAmount.toLocaleString("en-IN")}
            </span>
            {isOverpaid && (
              <span className="text-xs text-amber-600">Overpayment</span>
            )}
          </div>
        </div>

        {/* Mode + Reference */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Mode</label>
            <select
              className="input"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">
              Reference
            </label>
            <input
              type="text"
              placeholder="ID / notes"
              className="input"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!amount || Number(amount) <= 0}
        className={`w-full py-2.5 text-sm font-medium rounded-lg transition-colors ${
          isSuccess
            ? "bg-emerald-500 text-white"
            : "bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40"
        }`}
      >
        {isSuccess ? "Recorded" : "Add payment"}
      </button>
    </div>
  );
}