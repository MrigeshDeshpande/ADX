import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { getStudentLedger } from "@/modules/payments/ledger.service";

export async function GET(req, { params }) {
  try {
    const { id: studentId } = await params;

    const ledger = await getStudentLedger(db, studentId);

    return NextResponse.json({
      success: true,
      data: ledger,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}