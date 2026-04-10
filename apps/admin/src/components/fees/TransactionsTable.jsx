export default function TransactionsTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-5">
          Transactions
        </h2>
        <div className="py-12 flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-medium text-slate-500">
            No payments recorded yet
          </p>
          <p className="text-xs text-slate-400">
            Add the first payment using the form on the right
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Transactions</h2>
        <span className="text-xs text-slate-400 tabular-nums">
          {transactions.length} {transactions.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
              Mode
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide">
              Receipt
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((txn) => (
            <tr
              key={txn.id}
              className="hover:bg-slate-50 transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <span className="text-base font-semibold text-slate-900 tabular-nums">
                  ₹{txn.amount.toLocaleString("en-IN")}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-600">
                  {new Date(txn.paidAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md border ${modeStyles(txn.paymentMode)}`}
                >
                  {txn.paymentMode.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-medium text-slate-700">
                  {txn.receiptNumber}
                </span>
                {txn.referenceId && (
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {txn.referenceId}
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function modeStyles(mode) {
  switch (mode?.toLowerCase()) {
    case "cash":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "upi":
      return "bg-violet-50 text-violet-700 border-violet-200";
    case "card":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}