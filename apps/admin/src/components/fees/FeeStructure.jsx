export default function FeeStructure({ fee }) {
  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-900 mb-5">
        Fee breakdown
      </h2>

      <div className="space-y-3">
        <Row label="Base fee" value={fee.basePrice} />
        <Row label="Scholarship" value={-fee.discount} muted />

        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-slate-700">
              Net payable
            </span>
            <span className="text-xl font-semibold text-slate-900 tabular-nums">
              ₹{fee.finalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted }) {
  const isNegative = value < 0;

  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={`text-sm tabular-nums ${
          muted ? "text-slate-400" : "text-slate-700"
        }`}
      >
        {isNegative ? "−" : ""}₹{Math.abs(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}