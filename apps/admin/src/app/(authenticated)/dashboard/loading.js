export default function DashboardLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse">

      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-36 bg-muted rounded-lg" />
        <div className="h-4 w-72 bg-muted rounded-lg" />
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-5 sm:p-6 flex items-start justify-between">
            <div className="space-y-3">
              <div className="h-4 w-28 bg-muted rounded" />
              <div className="h-8 w-20 bg-muted rounded" />
            </div>
            <div className="w-11 h-11 bg-muted rounded-lg shrink-0" />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border flex items-center justify-between">
          <div className="h-5 w-44 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
        <div className="divide-y divide-border">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-4 sm:px-6 py-4 flex items-center gap-6">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-4 w-40 bg-muted rounded" />
              <div className="h-4 w-20 bg-muted rounded ml-auto" />
              <div className="h-4 w-20 bg-muted rounded" />
              <div className="h-6 w-20 bg-muted rounded-full" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
