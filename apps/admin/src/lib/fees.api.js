const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function onboardStudent(data) {
  const res = await fetch(`${API_URL}/fees/onboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to onboard student");
  }
  return res.json();
}

export async function getAllFees() {
  const res = await fetch(`${API_URL}/fees`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch fees dashboard data");
  }
  return res.json();
}

export async function getLedger(studentId) {
  const res = await fetch(`${API_URL}/fees/${studentId}/ledger`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function addPayment(studentId, data) {
  const res = await fetch(`${API_URL}/fees/${studentId}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to add payment");
  }
  return res.json();
}
