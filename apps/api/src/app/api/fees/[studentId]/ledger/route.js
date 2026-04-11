import { NextResponse } from "next/server";
import { getStudentLedger } from "../../../../../modules/fees/fee.service.js";

export async function GET(req, { params }) {
    try {
        const { studentId } = await params;

        const ledger = await getStudentLedger(studentId);
        if (!ledger) {
            return NextResponse.json({
                status: "error",
                message: "Ledger not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            status: "success",
            data: ledger
        });
    } catch (error) {
        console.error("Get Ledger Error:", error);
        return NextResponse.json({
            status: "error",
            message: "Failed to get ledger"
        }, { status: 500 });
    }
}
