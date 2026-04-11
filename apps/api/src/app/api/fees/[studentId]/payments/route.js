import { NextResponse } from "next/server";
import { validatePayment } from "../../../../../modules/fees/fee.schema.js";
import { makePayment } from "../../../../../modules/fees/fee.service.js";

export async function POST(req, { params }) {
    try {
        const { studentId } = await params;
        const body = await req.json();
        
        const validation = validatePayment(body);
        if (!validation.success) {
            return NextResponse.json({
                status: "error",
                message: validation.error.errors[0].message
            }, { status: 400 });
        }

        const data = await makePayment(studentId, validation.data);

        return NextResponse.json({
            status: "success",
            data: data
        }, { status: 201 });
    } catch (error) {
        console.error("Payment Error:", error);
        const errMessage = error.message === "Student fee ledger not found" ? error.message : "Failed to process payment";
        const statusCode = errMessage === "Student fee ledger not found" ? 404 : 500;
        
        return NextResponse.json({
            status: "error",
            message: errMessage
        }, { status: statusCode });
    }
}
