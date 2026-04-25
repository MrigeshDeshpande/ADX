import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { addFlexibleInstallment } from "@/modules/plans/plan.service";

export async function POST(req, { params }) {
  try {
    const { id: studentId } = await params;
    const body = await req.json();

    const installment = await addFlexibleInstallment(db, studentId, body);

    return NextResponse.json({ success: true, data: installment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
