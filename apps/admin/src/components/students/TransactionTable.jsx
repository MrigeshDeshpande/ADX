"use client";

import { FileText, Send, Download, Loader2 } from "lucide-react";

import { API } from "@/lib/api";
import { waitForReceiptReady } from "@/lib/receipt-utils";

export function TransactionsTable({
  transactions = [],
  activePdfActions = {},
  onPdfAction,
}) {
  if (!transactions.length) {
    return (
      <div className="card p-10 text-center text-sm text-muted-foreground">
        No transactions found
      </div>
    );
  }

  const handleView = async (id) => {
    try {
      const result = await waitForReceiptReady(id, API);
      if (result.status === "ready") {
        window.open(result.url, "_blank");
      }
    } catch (err) {
      console.error("View PDF failed:", err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const result = await waitForReceiptReady(id, API, { isDownload: true });
      if (result.status === "ready") {
        window.open(result.url, "_blank");
      }
    } catch (err) {
      console.error("Download PDF failed:", err);
    }
  };

  return (
    <div className="card overflow-hidden">


      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Transactions
        </h3>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
            <tr>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-left">Amount</th>
              <th className="px-5 py-3 text-left">Mode</th>
              <th className="px-5 py-3 text-left">Allocated To</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-muted/30 transition-colors">


                <td className="px-5 py-4 text-muted-foreground">
                  {txn.date}
                </td>


                <td className="px-5 py-4 font-semibold text-foreground">
                  ₹{txn.amount.toLocaleString()}
                </td>


                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-muted text-foreground border border-border uppercase">
                    {txn.mode}
                  </span>
                </td>


                <td className="px-5 py-4 text-foreground">
                  {txn.allocatedTo || "—"}
                </td>


                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">


                    <button
                      onClick={() => handleView(txn.id)}
                      className="px-3 py-1.5 text-xs font-semibold border border-border rounded-md flex items-center gap-1.5 hover:bg-muted"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View
                    </button>


                    <button
                      onClick={() => handleDownload(txn.id)}
                      className="px-3 py-1.5 text-xs font-semibold border border-border rounded-md flex items-center gap-1.5 hover:bg-muted"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>


                    <button
                      onClick={() => onPdfAction?.(txn.id, "send")}
                      disabled={!!activePdfActions[txn.id]}
                      className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50"
                    >
                      {activePdfActions[txn.id] === "send" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      {activePdfActions[txn.id] === "send" ? "Sending..." : "Send"}
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
