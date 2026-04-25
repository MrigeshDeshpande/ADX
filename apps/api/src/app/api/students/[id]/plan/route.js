import { createPlanWithInstallments } from "@/modules/plans/plan.service";
import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { getPlanWithInstallments } from "@/modules/plans/plan.service";

export async function POST(req, { params }) {

    try {
        const { id: studentId } = await params;
         console.log("studentId:", studentId);

        const body = await req.json();
        console.log("body:", body);

        const plan = await createPlanWithInstallments(
            db,
            studentId,
            body
        );

        console.log("plan created:", plan);

        return NextResponse.json(
            {
                success: true,
                data: plan,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create plan error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Something went wrong",
            },
            { status: 400 }
        );
    }
}

export async function GET(req, { params }) {
  try {
    const { id: studentId } = await params;

    const data = await getPlanWithInstallments(db, studentId);

    return NextResponse.json({
      success: true,
      data,
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