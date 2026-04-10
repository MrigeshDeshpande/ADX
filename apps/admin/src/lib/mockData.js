export const mockFeeData = {
  student: {
    id: "1",
    name: "Mrigesh Deshpande",
  },
  fee: {
    id: "fee1",
    studentId: "1",
    courseId: "course1",
    basePrice: 20000,
    finalAmount: 15000,
    discount: 5000,
  },
  summary: {
    total: 15000,
    paid: 8000,
    pending: 7000,
    status: "active",
  },
  transactions: [
    {
      id: "txn1",
      amount: 5000,
      paymentMode: "upi",
      referenceId: "UPI123",
      paidAt: "2026-04-09T10:00:00Z",
      receiptNumber: "SKY-2026-0001",
    },
    {
      id: "txn2",
      amount: 3000,
      paymentMode: "cash",
      referenceId: "",
      paidAt: "2026-04-10T12:00:00Z",
      receiptNumber: "SKY-2026-0002",
    },
  ],
};