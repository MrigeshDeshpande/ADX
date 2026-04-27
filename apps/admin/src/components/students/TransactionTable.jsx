"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { waitForReceiptReady } from "@/lib/receipt-utils";

export function TransactionsTable({ transactions = [] }) {
  const [loadingRows, setLoadingRows] = useState({});

  const setRowLoading = (id, action) =>
    setLoadingRows((prev) => ({ ...prev, [id]: action }));

  const clearRowLoading = (id) =>
    setLoadingRows((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const handleView = async (txn) => {
    setRowLoading(txn.id, "view");
    try {
      const result = await waitForReceiptReady(txn.id, API);
      if (result.status === "ready") window.open(result.url, "_blank");
    } catch (err) {
      toast.error(err?.message || "Failed to load receipt");
    } finally {
      clearRowLoading(txn.id);
    }
  };

  const handleDownload = async (txn) => {
    setRowLoading(txn.id, "download");
    try {
      const result = await waitForReceiptReady(txn.id, API);
      if (result.status !== "ready") return;

      const res = await fetch(result.url, { credentials: "include" });
      if (!res.ok) {
        toast.error(`Download failed (${res.status})`);
        return;
      }
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/pdf")) {
        toast.error("Unexpected response — session may have expired");
        return;
      }
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `receipt-${txn.id}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch (err) {
      toast.error(err?.message || "Download failed");
    } finally {
      clearRowLoading(txn.id);
    }
  };

  if (!transactions.length) {
    return (
      <div className="card p-10 text-center text-sm text-muted-foreground">
        No transactions found
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
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
            {transactions.map((txn) => {
              const loading = loadingRows[txn.id];
              return (
                <tr key={txn.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4 text-muted-foreground">{txn.date}</td>

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
                        onClick={() => handleView(txn)}
                        disabled={!!loading}
                        className="px-3 py-1.5 text-xs font-semibold border border-border rounded-md flex items-center gap-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading === "view" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FileText className="w-3.5 h-3.5" />
                        )}
                        {loading === "view" ? "Loading..." : "View"}
                      </button>

                      <button
                        onClick={() => handleDownload(txn)}
                        disabled={!!loading}
                        className="px-3 py-1.5 text-xs font-semibold border border-border rounded-md flex items-center gap-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading === "download" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        {loading === "download" ? "Downloading..." : "Download"}
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
