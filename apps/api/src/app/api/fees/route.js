import { NextResponse } from "next/server";
import { getDashboardFees } from "../../../modules/fees/fee.service.js";

export async function GET() {
    try {
        const fees = await getDashboardFees();
        return NextResponse.json({
            status: "success",
            data: fees
        });
    } catch (error) {
        console.error("Dashboard Fees Error:", error);
        return NextResponse.json({
            status: "error",
            message: "Failed to fetch dashboard fees"
        }, { status: 500 });
    }
}
