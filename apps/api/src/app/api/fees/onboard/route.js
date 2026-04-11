import { NextResponse } from "next/server";
import { validateOnboard } from "../../../../modules/fees/fee.schema.js";
import { onboardStudent } from "../../../../modules/fees/fee.service.js";

export async function POST(req) {
    try {
        const body = await req.json();
        
        const validation = validateOnboard(body);
        if (!validation.success) {
            return NextResponse.json({
                status: "error",
                message: validation.error.errors[0].message
            }, { status: 400 });
        }

        const data = await onboardStudent(validation.data);

        return NextResponse.json({
            status: "success",
            data: data
        }, { status: 201 });
    } catch (error) {
        console.error("Onboard Error:", error);
        return NextResponse.json({
            status: "error",
            message: "Failed to onboard student"
        }, { status: 500 });
    }
}
