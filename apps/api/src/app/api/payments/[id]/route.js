import { db } from "@repo/db";
import { validateCreatePayment } from "@/modules/payments/payment.schema";
import { addPayment } from "@/modules/payments/payment.service";

export async function POST(req, context) {
  try {
    const params = await context.params;
    const studentId = params.id;
    const body = await req.json();

    const result = validateCreatePayment(body);
    if (!result.success) {
      return Response.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    const payment = await addPayment(db, studentId, result.data);

    return Response.json(payment, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
