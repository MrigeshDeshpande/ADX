export default function SummaryCard({ summary }) {
  const { total, paid, pending, status } = summary;
  const progress = total > 0 ? Math.min((paid / total) * 100, 100) : 0;

  return (
    <div className="card p-6 space-y-6">

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 border border-slate-200 rounded-lg overflow-hidden">
        <Metric
          label="Total fee"
          value={`₹${total.toLocaleString("en-IN")}`}
        />
        <Metric
          label="Paid"
          value={`₹${paid.toLocaleString("en-IN")}`}
        />
        <Metric
          label="Balance"
          value={`₹${Math.abs(pending).toLocaleString("en-IN")}`}
          accent={pending > 0}
          muted={pending === 0}
        />
        <Metric
          label="Status"
          value={status}
          isStatus
          status={status}
        />
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Payment progress</span>
          <span className="text-xs font-medium text-slate-600 tabular-nums">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}

function Metric({ label, value, accent, muted, isStatus, status }) {
  return (
    <div className="bg-white px-5 py-4 space-y-1.5">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      {isStatus ? (
        <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md border ${statusStyles(status)}`}>
          {value}
        </span>
      ) : (
        <p
          className={`text-2xl font-semibold tabular-nums tracking-tight ${
            accent
              ? "text-slate-900"
              : muted
              ? "text-emerald-600"
              : "text-slate-900"
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
}

function statusStyles(status) {
  switch (status) {
    case "active":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "overpaid":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}