import { LedgerCards } from "@/components/students/LedgerCard";

import { API } from "@/lib/api";

async function fetchLedger(studentId) {
  const res = await fetch(`${API}/api/students/${studentId}/ledger`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

export async function LedgerSection({ ledger }) {
  return (
    <LedgerCards ledger={{
      total_due: ledger?.totalDue ?? 0,
      total_paid: ledger?.totalPaid ?? 0,
      pending: ledger?.pending ?? 0,
      credit: ledger?.credit ?? 0,
    }} />
  );
}
