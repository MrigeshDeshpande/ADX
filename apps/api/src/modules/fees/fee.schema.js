import { z } from "zod";

export const onboardSchema = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    courseId: z.string().min(1, "Course ID is required"),
    basePrice: z.number().min(0, "Base price must be a non-negative number"),
    scholarship: z.number().min(0, "Scholarship must be a non-negative number"),
    notes: z.string().optional()
});

export const paymentSchema = z.object({
    amount: z.number().positive("Amount must be greater than zero"),
    paymentMode: z.enum(["upi", "cash", "card"], {
        errorMap: () => ({ message: "Payment mode must be 'upi', 'cash', or 'card'" })
    }),
    referenceId: z.string().optional()
});

export function validateOnboard(data) {
    return onboardSchema.safeParse(data);
}

export function validatePayment(data) {
    return paymentSchema.safeParse(data);
}
