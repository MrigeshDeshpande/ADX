"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { API } from "@/lib/api";

export async function createStudent(studentData) {
  const res = await fetch(`${API}/api/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error?.fieldErrors
        ? Object.values(data.error.fieldErrors).flat().join(", ")
        : data?.error || "Something went wrong"
    );
  }

  revalidateTag("students");
  return data;
}

export async function createStudentPlan(studentId, planData) {
  const res = await fetch(`${API}/api/students/${studentId}/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create plan");
  }

  // Fetch the real plan with actual installment IDs from the DB
  const planRes = await fetch(`${API}/api/students/${studentId}/plan`, { cache: "no-store" });
  const planJson = await planRes.json();

  revalidateTag(`student-${studentId}`);
  revalidateTag("students");
  revalidatePath(`/students/${studentId}`);
  return planJson.data ?? data;
}

export async function addFlexibleInstallment(studentId, installmentData) {
  const res = await fetch(`${API}/api/students/${studentId}/plan/installments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(installmentData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add installment");
  }

  revalidatePath(`/students/${studentId}`);
  return data.data;
}

export async function addStudentPayment(studentId, paymentData) {
  const res = await fetch(`${API}/api/students/${studentId}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });

  const data = await res.json();

  if (!res.ok) {
    const errMsg =
      typeof data.error === "string"
        ? data.error
        : data.error?.fieldErrors
          ? Object.values(data.error.fieldErrors).flat().join(", ")
          : data.error?.formErrors?.join(", ")
          || data.message
          || "Failed to record payment";
    throw new Error(errMsg);
  }

  revalidateTag(`student-${studentId}`);
  revalidateTag("students");
  revalidatePath(`/students/${studentId}`);
  return data;
}
