"use client";

import { CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";

export function InstallmentsTable({ installments = [], onPay, onAddInstallment, unscheduled }) {
  const getStatus = (inst) => {
    if (inst.paid >= inst.amount) return "paid";
    if (new Date(inst.dueDate) < new Date()) return "overdue";
    return "pending";
  };

  const statusUI = {
    paid: {
      label: "Paid",
      icon: <CheckCircle className="w-4 h-4" />,
      className: "bg-primary/10 text-primary border border-primary/20",
    },
    pending: {
      label: "Pending",
      icon: <Clock className="w-4 h-4" />,
      className: "bg-muted text-foreground border border-border",
    },
    overdue: {
      label: "Overdue",
      icon: <AlertCircle className="w-4 h-4" />,
      className: "bg-destructive/10 text-destructive border border-destructive/20",
    },
  };

  const STATUS_ORDER = { overdue: 0, pending: 1, paid: 2 };
  const sorted = [...installments].sort(
    (a, b) => STATUS_ORDER[getStatus(a)] - STATUS_ORDER[getStatus(b)]
  );

  if (!installments.length) {
    return (
      <div className="card p-10 text-center text-sm text-muted-foreground">
        No installments found
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Installments</h3>
          {unscheduled > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              ₹{unscheduled.toLocaleString()} unscheduled
            </span>
          )}
        </div>
        {onAddInstallment && (
          <button
            onClick={onAddInstallment}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            <Plus className="w-3.5 h-3.5" /> Add Installment
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
            <tr>
              <th className="px-5 py-3 text-left">Due Date</th>
              <th className="px-5 py-3 text-left">Amount</th>
              <th className="px-5 py-3 text-left">Paid</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {sorted.map((inst) => {
              const status = getStatus(inst);
              const ui = statusUI[status];

              return (
                <tr key={inst.id} className="hover:bg-muted/30 transition-colors">
                  
                  {/* Due Date */}
                  <td className="px-5 py-4 text-muted-foreground">
                    {inst.dueDate}
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4 font-semibold text-foreground">
                    ₹{inst.amount.toLocaleString()}
                  </td>

                  {/* Paid */}
                  <td className="px-5 py-4 text-foreground">
                    ₹{inst.paid.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold ${ui.className}`}>
                      {ui.icon}
                      {ui.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">

                      {status !== "paid" && (
                        <button
                          onClick={() => onPay?.(inst.id)}
                          className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md hover:opacity-90"
                        >
                          Pay
                        </button>
                      )}

                      <button
                        disabled
                        className="px-3 py-1.5 text-xs font-semibold border border-border rounded-md opacity-40 cursor-not-allowed"
                      >
                        Waive
                      </button>

                      <button
                        disabled
                        className="px-3 py-1.5 text-xs font-semibold border border-border rounded-md opacity-40 cursor-not-allowed"
                      >
                        Write-off
                      </button>

                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}